import React, { useState, useEffect } from "react"
import { Context } from "../Context"

import AssetInfo from "../components/UploadPage/AssetInfo/AssetInfo"
import FileUpload from "../components/UploadPage/FilesUpload/FileUpload"
import PlatformSelect from "../components/UploadPage/PlatformSelection/PlatformSelect"

import NextButton from "../components/UploadPage/NextButton"

import "../components/UploadPage/Upload.css"

import axios from "axios"
import { useParams, useNavigate } from "react-router"


const Upload = () => {
  const navigate = useNavigate();

  const { brand } = useParams()

  // GLOBAL STATE
  const brandName = brand


  const [assetName, setAssetName] = useState({
    name: "",
    isUnique: true,
    errorMsg: ""
  })
  const [description, setDescription] = useState("")
  const [thumbnailFile, setThumbnailFile] = useState([])


  const [selectedfile, SetSelectedFile] = useState([])


  const [platforms, selectPlatforms] = useState({
    decentraland: false,
    sandbox: false,
    zepeto: false,
    clonex: false,
    snapchat: false
  })
  const [cost, setCost] = useState(0)
  const [days, setDays] = useState(0)

  // UTILITY STATES
  const [page, setPage] = useState(1)
  const [submitting, setSubmitting] = useState(false)
  const [errorSubmitMsg, setErrorSubmitMsg] = useState("")


  const timer = useEffect(() => {
    setTimeout(() => {
      setErrorSubmitMsg("")
    }, 5000);

    return () => clearTimeout(timer);
  }, [errorSubmitMsg])


  useEffect(() => {
    if (page === 1) {
      document.getElementById("page1").classList.add("active")
    }

    else if (page === 2) {
      document.getElementById("page1").classList.add("completed")
      document.getElementById("page2").classList.add("active")
    }

    else {
      document.getElementById("page1").classList.add("completed")
      document.getElementById("page2").classList.add("completed")
      document.getElementById("page3").classList.add("active")
    }
  }, [page])



  const handleSumbit = async (event) => {

    event.preventDefault()

    if (page === 1) {

      if (!assetName.name.length) {
        setErrorSubmitMsg("Asset name cannot be empty")
        return
      }
      else if (!assetName.isUnique) {
        setErrorSubmitMsg("Asset name must be unique")
        return
      }

      setPage((prev) => prev + 1)
      setErrorSubmitMsg("")

      console.log(
        "NAME: " + assetName.name,
        "DESCRIPTION: " + description,
        "THMUBNAIL: " + thumbnailFile
      )

      return
    }

    if (page === 2) {
      var filesArray = []

      filesArray = selectedfile.map((item) => item.fileData)

      if (!filesArray.length) {
        setErrorSubmitMsg("Upload atleast 1 file to continue")
        return
      }

      setPage((prev) => prev + 1)

      console.log("FILES: ", filesArray)

      return
    }

    if (page === 3) {

      var platformsArray = []

      for (const [key, value] of Object.entries(platforms)) {
        value === true && platformsArray.push(key)
      }

      if (!platformsArray.length) {
        setErrorSubmitMsg("Please select atleast one platform")
        return
      }

      console.log("PLATFORMS", platformsArray)

    }

    setSubmitting(true)

    var formData = new FormData()

    formData.append('brand', brandName)
    formData.append("name", assetName.name)

    if (description.length) {

      for (let i = 0; i < thumbnailFile.length; i++) {
        formData.append('description', description)
      }
    }

    if (thumbnailFile.length) {

      for (let i = 0; i < thumbnailFile.length; i++) {
        formData.append('thumbnail', thumbnailFile[i])
      }
    }

    var filesArray = []
    filesArray = selectedfile.map((item) => item.fileData)

    for (let i = 0; i < filesArray.length; i++) {
      formData.append('assets', filesArray[i])
    }

    // formData.append('platform', "")
    for (let i = 0; i < platformsArray.length; i++) {
      formData.append('platform', platformsArray[i])
    }

    formData.append('approximatePrice', cost)
    formData.append('approximateTime', days)

    console.log(
      brandName,
      assetName.name,
      description,
      thumbnailFile,
      filesArray,
      platformsArray,
      cost,
      days,
      formData
    )

    axios
      .post("https://xrcdashboard.onrender.com/brands/create", formData
        , {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': "multipart/form-data"
          }
        })
      .then((response) => {
        console.log(response.data)
        setSubmitting(false)
        navigate(`/brands/${brandName}`);
      })
      .catch((err) => {
        console.log(err)
        setSubmitting(false)
      })

    console.log("Submitted")
  }

  const saveToDrafts = async (event) => {

    event.preventDefault()

    setSubmitting(true)

    var formData = new FormData()

    for (let pageNumber = 1; pageNumber <= page; pageNumber++) {

      if (pageNumber === 1) {
        console.log("gathered page 1 data")
        if (!assetName.name.length) {
          setErrorSubmitMsg("Asset name cannot be empty")
          return
        }
        else if (!assetName.isUnique) {
          setErrorSubmitMsg("Asset name must be unique")
          return
        }

      }

      if (pageNumber === 2) {

        console.log("gathered page 2 data")

        var filesArray = []

        filesArray = selectedfile.map((item) => item.fileData)

        if (filesArray.length) {

        }

      }

      if (pageNumber === 3) {

        console.log("gathered page 3 data")

        var platformsArray = []

        for (const [key, value] of Object.entries(platforms)) {
          value === true && platformsArray.push(key)
        }

        if (platformsArray.length) {

        }

      }
    }

    setSubmitting(true)


    // SAVING
    formData.append('brand', brandName)
    formData.append("name", assetName.name)

    if (description.length) {
      for (let i = 0; i < thumbnailFile.length; i++) {
        formData.append('description', description)
      }
    }

    if (thumbnailFile.length) {
      for (let i = 0; i < thumbnailFile.length; i++) {
        formData.append('thumbnail', thumbnailFile[i])
      }
    }

    if (filesArray && filesArray.length) {
      for (let i = 0; i < filesArray.length; i++) {
        formData.append('assets', filesArray[i])
      }
    }

    if (platformsArray && platformsArray.length) {
      // formData.append('platform', "")
      for (let i = 0; i < platformsArray.length; i++) {
        formData.append('platform', platformsArray[i])
      }
    }

    formData.append("draftPage", page)

    console.log(
      [...formData]
    )

    axios
      .post("https://xrcdashboard.onrender.com/brands/saveasdraft", formData
        , {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': "multipart/form-data"
          }
        })
      .then((response) => {
        console.log(response.data)
        setSubmitting(false)
        navigate(`/brands/${brandName}`);
      })
      .catch((err) => {
        console.log(err)
        setSubmitting(false)
      })

    console.log("Saved")
    setErrorSubmitMsg("Saved")
  }


  return (
    <Context.Provider
      value={{
        assetData: [assetName, setAssetName],
        thumbnailData: [thumbnailFile, setThumbnailFile],
        descriptionData: [description, setDescription],

        filesData: [selectedfile, SetSelectedFile],

        platformsData: [platforms, selectPlatforms],
        costData: [cost, setCost],
        daysData: [days, setDays],

        pager: [page, setPage],
        submittingState: [submitting, setSubmitting],
        errorData: [errorSubmitMsg, setErrorSubmitMsg]
      }}
    >

      <div className="upload-container">

        {page === 1 && <AssetInfo />}

        {page === 2 && <FileUpload />}

        {page === 3 && <PlatformSelect />}

        <NextButton handleSumbit={handleSumbit} saveToDrafts={saveToDrafts} errorMsg={errorSubmitMsg} />

        <div className="page-indicater">
          <div className="page-indicater-item" id="page1">1</div>
          <div className="page-indicater-line"></div>
          <div className="page-indicater-item" id="page2">2</div>
          <div className="page-indicater-line"></div>
          <div className="page-indicater-item" id="page3">3</div>
        </div>

      </div>

    </Context.Provider>
  )
}

export default Upload
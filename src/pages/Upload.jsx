import React, { useState } from "react";
import FileUpload from "../components/UploadPage/FilesUpload/FileUpload";
import PlatformSelect from "../components/UploadPage/PlatformSelection/PlatformSelect";
import { Context } from "../Context";

import axios from "axios";

const Comment = (props) => {

  const [selectedfile, SetSelectedFile] = useState([])
  const [platforms, selectPlatforms] = useState({
    decentraland: false,
    sandbox: false,
    zepeto: false,
    clonex: false,
    snapchat: false
  })
  const [assetName, setAssetName] = useState({
    name: "",
    isUnique: true,
    errorMsg: ""
  })

  const [thumbnailFile, setThumbnailFile] = useState([])


  const [submitting, setSubmitting] = useState(false)


  // const [errorSubmitMsg, setErrorSubmitMsg] = useState("")

  const brandName = "Zara"

  const handleSumbit = async (event) => {

    event.preventDefault()

    setSubmitting(true)

    let platformsArray = []

    for (const [key, value] of Object.entries(platforms)) {
      value === true && platformsArray.push(key)
    }

    let filesArray = []

    filesArray = selectedfile.map((item) => item.fileData)

    var formData = new FormData()

    for (let i = 0; i < filesArray.length; i++) {
      formData.append('assets', filesArray[i])
    }

    if (!assetName.name.length) {
      console.log("Asset name cannot be empty")
      // setErrorSubmitMsg("Asset name cannot be empty")
      setSubmitting(false)

      return
    }
    else if (!assetName.isUnique) {
      console.log("Asset name must be unique")
      // setErrorSubmitMsg("Asset name must be unique")
      setSubmitting(false)

      return
    }
    if (!filesArray.length) {
      console.log("Upload atleast 1 file to continue")
      // setErrorSubmitMsg("Upload atleast 1 file to continue")
      setSubmitting(false)

      return
    }
    else if (!platformsArray.length) {
      console.log("Please select atleast one platform")
      // setErrorSubmitMsg("Please select atleast one platform")
      setSubmitting(false)
      return
    }

    if (thumbnailFile.length) {

      for (let i = 0; i < thumbnailFile.length; i++) {
        formData.append('thumbnail', thumbnailFile[i])
      }
    }


    console.log(
      brandName,
      assetName.name,
      platformsArray,
      thumbnailFile,
      filesArray,
      formData
    )

    formData.append("name", assetName.name)
    formData.append('brand', brandName)
    formData.append('platform', "")
    for (let i = 0; i < platformsArray.length; i++) {
      formData.append('platform', platformsArray[i])
    }

    axios
      .post("http://localhost:5000/brands/upload", formData
        , {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': "multipart/form-data"
          }
        })
      .then((response) => {
        console.log(response.data)
        setSubmitting(false)
      })

  }


  return (
    <Context.Provider value={{ files: [selectedfile, SetSelectedFile], platform: [platforms, selectPlatforms], assetData: [assetName, setAssetName], thumbnailData: [thumbnailFile, setThumbnailFile] }}>
      <div>

        <FileUpload role={props.role} />

        {props.role === "brand" ? <PlatformSelect /> : ""}

        <div className="kb-buttons-box mt-5 text-center d-flex justify-content-left align-items-center">
          {/* <button type="submit" className="btn btn-primary form-submit">Save to drafts</button> */}
          <button type="submit" className="btn btn-primary form-submit" onClick={handleSumbit} style={{ marginRight: "1rem" }}>Submit</button>
          {submitting && <div class="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>}
          {/* <p className='text-danger' style={{ marginLeft: "1rem", marginBottom: "0rem" }}>{errorSubmitMsg}</p> */}
          <p>{assetName.errorMsg}</p>
        </div>

      </div>

    </Context.Provider>
  );
};

Comment.defaultProps = {
  role: "brand"
}

export default Comment;



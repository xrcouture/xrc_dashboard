import React, { useState, useEffect, useContext } from 'react'

import { Context } from '../../../Context'
import axios from 'axios'

import thumbnail from '../../../assets/thumbnail.png'

import "./AssetInfo.css"
import { useParams } from 'react-router'


const AssetInfo = () => {


  // STATES
  const { assetData, descriptionData, thumbnailData, errorData } = useContext(Context)

  const [assetName, setAssetName] = assetData
  const [description, setDescription] = descriptionData
  const [thumbnailFile, setThumbnailFile] = thumbnailData
  const [preview, setPreviw] = useState()


  const [assetTitle, setAssetTitle] = useState("")

  const [, setErrorSubmitMsg] = errorData

  const [prevAssets, setPrevAssets] = useState([])
  const [assetNameError, setAssetNameError] = useState("")

  // IMAGES
  const uploadIMG = "https://xrcouture-xrcie.s3.ap-south-1.amazonaws.com/XRC_Dashboard/Website_Contents/upload.webp"
  const deleteIMG = "https://xrcouture-xrcie.s3.ap-south-1.amazonaws.com/XRC_Dashboard/Website_Contents/delete.webp"

  const { brand } = useParams()

  // FETCHING PREVS ASSETS
  useEffect(() => {
    axios
      .post("https://xrcdashboard.onrender.com/brands/assetNames", {
        brand: brand
      }, {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
      .then((response) => {
        console.log("Fetched", response.data)
        setPrevAssets(response.data.assets)
      })
  }, [])

  // UPDATING GLOBAL STATE FOR ASSET NAME
  useEffect(() => {
    setErrorSubmitMsg("")
    setAssetName((prev) => {
      return { ...prev, name: assetTitle }
    })
  }, [assetTitle, setAssetName, setErrorSubmitMsg])

  // DYNAMIC CHECK FOR ASSET NAME
  useEffect(() => {

    const match = prevAssets.filter((item) => item === assetName.name)

    if (match.length) {
      setAssetNameError("Asset name already in use")
      setAssetName((prev) => {
        return { ...prev, isUnique: false }
      })
    } else {
      setAssetNameError("")
      setAssetName((prev) => {
        return { ...prev, isUnique: true }
      })
    }

  }, [assetName.name, prevAssets, setAssetName])

  // THUMBNAIL PREVIEW
  const previewFile = () => {

    var file = document.querySelector("input[type=file]").files[0]

    if (file) {

      const reader = new FileReader()

      reader.onload = function (e) {
        setThumbnailFile([file])
        setPreviw(e.target.result)
      }

      reader.readAsDataURL(file)
    }
  }


  return (
    <div className='d-flex flex-column'>
      <div className='upload-title'>Create Asset</div>

      <div className='d-flex upload-contents row'>

        <div className='d-flex flex-column col-7'>

          <div className=''>
            <div className='uc-items-title'>Thumbnail</div>
            <div className='uc-thumbnail-bg'>
              <div className='items-img-m mb-4'><img src={uploadIMG} alt=''></img></div>
              <div className='uc-items-title text-white'>Drag and drop here or
                <span className='uc-items-link'>
                  <label style={{ cursor: "pointer" }} for="profile-image-upload" className='uc-items-link'> &nbsp; Browse files</label>
                  <input style={{ display: "none" }} id="profile-image-upload" accept="image/png, image/jpeg, image/webp, image/jpg" type="file" onChange={previewFile}></input>
                </span>
              </div>
              <div className='uc-items-subtitle'>Max file size is 20 MB</div>
            </div>

            {
              thumbnailFile.length ?
                <div className='uc-thumbnail-bg-sm mt-4 d-flex'>
                  <div className='d-flex'>
                    <img style={{ width: "3rem", marginLeft: "0.5em", borderRadius: "0.6rem" }} src={preview} alt='' id='thumbnail' />
                    <div style={{ textAlign: "left", marginLeft: "1.2em" }}>
                      <div className='uc-items-title-thin text-white'>{thumbnailFile[0].name}</div>
                      <div className='uc-items-subtitle-thin'>10 MB</div>
                    </div>
                  </div>
                  <div>
                    <img style={{ width: "1rem" }} src={deleteIMG} alt=""></img>
                  </div>
                </div> : ""
            }
          </div>

        </div>

        <div className='d-flex flex-column col-5'>
          <label className=''>
            <div className='uc-items-title'> Asset name* </div>
            <input className='uc-items-input' type="text" name="name" value={assetTitle} onChange={e => setAssetTitle(e.target.value)} />
            <p className='text-danger' style={{ marginLeft: "1rem", marginBottom: "0rem" }}>{assetNameError}</p>
          </label>

          <label className='mt-5'>
            <div className='uc-items-title'> Description </div>
            <textarea rows="4" className='uc-items-input' type="text" name="name" value={description} maxLength={500} onChange={e => setDescription(e.target.value)} />
          </label>
        </div>

      </div>
    </div>
  )
}

export default AssetInfo
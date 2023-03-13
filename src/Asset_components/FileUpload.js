import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import shortid from "shortid"
import { Context } from '../../../Context'
import './FileUpload.css'
import thumbnail from '../../../assets/thumbnail.png'
import { useParams } from 'react-router'

const FileUpload = (props) => {

  const { files } = useContext(Context)
  const [selectedfile, SetSelectedFile] = files

  const { assetData } = useContext(Context)
  const [assetName, setAssetName] = assetData

  const { thumbnailData } = useContext(Context)
  const [thumbnailFile, setThumbnailFile] = thumbnailData

  const brandAssetFiles=[
  "https://xrcouture-xrcie.s3.ap-south-1.amazonaws.com/XRCIE/brandAssets/Zara/Vibrance%20Splash_Zepeto.png",
  "https://xrcouture-xrcie.s3.ap-south-1.amazonaws.com/XRCIE/brandAssets/Zara/Vibrance%20Splash_Decentraland.png",
  "https://xrcouture-xrcie.s3.ap-south-1.amazonaws.com/XRCIE/brandAssets/Zara/Vibrance%20Splash_MetaHUman.png"
]
  const [prevAssets, setPrevAssets] = useState([])
  const [assetNameError, setAssetNameError] = useState("")
  const {assetName1,brands} = useParams()
  const [dataAsset, setDataAsset] = useState()

  useEffect(() => {
    console.log("fectching data")
    axios
      .post("https://xrcdashboard.onrender.com/brands/assetNames", {
        brand: "Zara"
      }, {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
      .then((response) => {
        console.log(response.data)
        setPrevAssets(response.data.assets)
      })
      fetchAsset()
  }, [])

  const fetchAsset = async() =>{
    await axios.post('https://xrcdashboard.onrender.com/brands/asset',{
      brand:"Zara",
      name:assetName1
    }).then(res =>{
      setDataAsset(res.data.asset[0])
      console.log(res.data.asset[0])
  })
  }

  const handleChange = (e) => {
    e.preventDefault()
    const { value } = e.target
    setAssetName((prev) => {
      return { ...prev, name: value }
    })

    prevAssets.forEach((item) => {
      if (e.target.value === item) {
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
    })
  }

  const filesizes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  const isValidFileUploaded = (file) => {
    const validExtensions = ["png", "jpg", "jpeg", "webp", "mp4", "mov", "pdf", "blend", "glb", "gltf", "fbx", "obj", "usd", "c4d", "max", "mb", "unitypackage", "dae", "dwg"]
    return validExtensions.includes(file.name.substring(file.name.lastIndexOf('.') + 1, file.name.length) || file.name)
  }

  const isValidFileUploadedAdmin = (file) => {
    const validExtensions = ["blend", "glb", "gltf", "fbx", "obj", "usd", "c4d", "max", "mb", "unitypackage", "dae", "dwg"]
    return validExtensions.includes(file.name.substring(file.name.lastIndexOf('.') + 1, file.name.length) || file.name)
  }

  const InputChange = (e) => {


    // check the file quant should be less than or equals to 10 *done
    // check that already how many files are uploaded *done

    // console.log(e.target.files.length)

    if (e.target.files.length > 10 || selectedfile.length === 10 || e.target.files.length + selectedfile.length > 10) {

      alert("You can only upload upto 10 files!")
      return;
    }

    // --For Multiple File Input
    let images = [];
    for (let i = 0; i < e.target.files.length; i++) {
      images.push((e.target.files[i]));
      let reader = new FileReader();
      let file = e.target.files[i];
      reader.onloadend = () => {

        // check file type : e.target.files[i].type
        // check file size : e.target.files[i].size *done

        if (props.role === "admin") {
          if (!isValidFileUploadedAdmin(e.target.files[i])) {
            alert(file.name + "This file is not supported")
            return;
          }
        }
        else {
          if (!isValidFileUploaded(e.target.files[i])) {
            alert(file.name + "This file is not supported")
            return;
          }
        }


        if (e.target.files[i].size > 20971520) {
          alert("Please not this file: " + file.name);
          return
        }

        SetSelectedFile((preValue) => {
          return [
            ...preValue,
            {
              id: shortid.generate(),
              filename: e.target.files[i].name,
              filetype: e.target.files[i].type,
              fileimage: reader.result,
              datetime: e.target.files[i].lastModifiedDate.toLocaleString('en-IN'),
              filesize: filesizes(e.target.files[i].size),
              fileData: e.target.files[i]
            }
          ]
        });
      }
      if (e.target.files[i]) {
        reader.readAsDataURL(file);
      }
    }
  }

  const DeleteSelectFile = (id) => {
    if (window.confirm("Are you sure you want to delete this Image?")) {
      const result = selectedfile.filter((data) => data.id !== id);
      SetSelectedFile(result);
    } else {
      // alert('No');
    }

  }

  const previewFile = (e) => {
    var preview = document.querySelector("#thumbnail");
    var file = document.querySelector("input[type=file]").files[0];
    var reader = new FileReader();

    reader.addEventListener(
      "load",
      function () {
        preview.src = reader.result;
        setThumbnailFile([file])
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  return (

    <>
      <h1>{brands}</h1>

      <div className='d-flex align-items-center justify-content-between'>
        <label className='d-flex align-items-center'>
          <span><h4 className='m-0'> Asset Name </h4></span> &nbsp; &nbsp;
          <input type="text" name="name" value={assetName1} onChange={handleChange} disabled />
          <p className='text-danger' style={{ marginLeft: "1rem", marginBottom: "0rem" }}>{assetNameError}</p>
        </label>

        <div>
          <img style={{ width: "10rem", marginRight:"2rem" }} src={thumbnail} alt='' id='thumbnail' />
          <input id="profile-image-upload" accept="image/png, image/jpeg, image/webp, image/jpg" type="file" onChange={previewFile}></input>
        </div>
      </div>

      <div className="fileupload-view">
        <div className="row justify-content-center m-0">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <div className="kb-data-box">
                  <div className="kb-modal-data-title">
                    <div className="kb-data-title">
                      {/* <h6>Multiple File Upload With Preview</h6> */}
                    </div>
                  </div>
                  {/* <form onSubmit={FileUploadSubmit}> */}
                  <form>
                    {/* <div className="kb-file-upload">
                      <div className="file-upload-box">
                        <input type="file" id="fileupload" className="file-upload-input" onChange={InputChange} multiple />
                        <span>Drag and drop or <span className="file-link">Choose your files</span></span>
                      </div>
                    </div> */}
                    <div className="kb-attach-box mb-3" style={{display:"flex", flexDirection:"unset"}}>
                      {
                        brandAssetFiles.map((data, id) => {
                          return (
                            <div className="file-atc-box" key={id}>
                              {
                                  <div className="file-image"> <img src={data} alt="" /></div>
                              }
                              {/* <div className="file-detail">
                                <h6>{filename}</h6>
                                <p></p>
                                <p><span>Size : {filesize}</span><span className="ml-2">Modified Time : {datetime}</span></p>
                                <div className="file-actions">
                                  <button type="button" className="file-action-btn" onClick={() => DeleteSelectFile(id)}>Delete</button>
                                </div>
                              </div> */}
                            </div>
                          )
                        })
                      }
                    </div>
                    {/* <div className="kb-buttons-box">
                      <button type="submit" className="btn btn-primary form-submit">Submit</button>
                    </div> */}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  );
}

export default FileUpload
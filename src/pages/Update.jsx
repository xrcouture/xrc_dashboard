import React, { useState } from 'react'
import shortid from "shortid"
import axios from 'axios'

import '../components/UploadPage/FilesUpload/FileUpload.css'
import { useParams, useNavigate } from 'react-router'

const Update = () => {
  const navigate = useNavigate();

  const [selectedfile, SetSelectedFile] = useState([])

  const [submitting, setSubmitting] = useState(false)

  const { brandName, assetName } = useParams()

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

        // if (!isValidFileUploadedAdmin(e.target.files[i])) {
        //   alert(file.name + "This file is not supported")
        //   return;
        // }
        if (!isValidFileUploaded(e.target.files[i])) {
          alert(file.name + "This file is not supported")
          return;
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

  const handleClick = async (event) => {

    event.preventDefault()

    var filesArray = []

    filesArray = selectedfile.map((item) => item.fileData)

    if (!filesArray.length) {
      console("Upload atleast 1 file to continue")
      return
    }

    setSubmitting(true)

    console.log("FILES: ", filesArray)

    var formData = new FormData()

    formData.append('brand', brandName)
    formData.append("name", assetName)

    for (let i = 0; i < filesArray.length; i++) {
      formData.append('assets', filesArray[i])
    }

    console.log([...formData])

    axios
      .post("https://xrcdashboard.onrender.com/brands/update", formData
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


  return (

    <div className='d-flex flex-column' style={{ background: "#000", padding: "3em 5em", height: "100%" }}>
      <div className='upload-title'>Upload Requested Files</div>

      <div className="fileupload-view upload-contents">
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
                    <div className="kb-file-upload">
                      <div className="file-upload-box d-flex flex-column">
                        <input type="file" id="fileupload" className="file-upload-input" onChange={InputChange} multiple />
                        <span className='uc-items-title text-white'>Drag and drop or <span className="file-link uc-items-link">Choose your files</span></span>

                        <div className='uc-items-subtitle'>Max file size is 20 MB</div>

                      </div>
                    </div>
                    <div className="kb-attach-box mb-3">
                      {
                        selectedfile.map((data, index) => {
                          const { id, filename, filetype, fileimage, datetime, filesize } = data;
                          return (
                            <div className="file-atc-box" key={id}>
                              {
                                filename.match(/.(jpg|jpeg|png|gif|svg)$/i) ?
                                  <div className="file-image"> <img src={fileimage} alt="" /></div> :
                                  <div className="file-image"><i className="far fa-file-alt"></i></div>
                              }
                              <div className="file-detail">
                                <h6>{filename}</h6>
                                <p></p>
                                <p><span>Size : {filesize}</span><span className="ml-2">Modified Time : {datetime}</span></p>
                                <div className="file-actions">
                                  <button type="button" className="file-action-btn" onClick={() => DeleteSelectFile(id)}>Delete</button>
                                </div>
                              </div>
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

      <div className="kb-buttons-box mt-5 text-center d-flex justify-content-left align-items-center">
        <button disabled={submitting} type="submit" className="form-submit uc-buttons" onClick={handleClick} style={{ marginRight: "1rem" }}>Submit</button>
        {submitting ?
          <div class="spinner-border text-light" role="status" style={{ alignSelf: "end", marginBottom: "0.7em" }}>
            <span class="sr-only">Loading...</span>
          </div> : ""}
        {/* <p>{props.errorMsg}</p> */}
      </div>
    </div>

  );
}

export default Update
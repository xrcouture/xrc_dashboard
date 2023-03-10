import React, { useState } from 'react'
import './update-files.css'

const UpdateFiles = () => {
  const isValidFileUploadedAdmin = (file) => {
    const validExtensions = ["blend", "glb", "gltf", "fbx", "obj", "usd", "c4d", "max", "mb", "unitypackage", "dae", "dwg"]
    return validExtensions.includes(file.name.substring(file.name.lastIndexOf('.') + 1, file.name.length) || file.name)
  }
  const [files,setfiles] = useState({
    'zepeto': null,
    'sandbox': null,
    'clonex': null,
    'snapchat': null,
    'decentraland': null
  })
  const handleUpload = () => {
    let formdata = new FormData()
    platforms.map((p)=>{
      formdata.append('assets',files[p])
    })
    console.log(formdata.get('assets'))
  }
  let platforms = ['zepeto','clonex','sandbox','snapchat','decentraland']

  
  return (
    <div className='d-flex flex-column m-5 '>
      {platforms.map((i)=>(
        <div className='m-3'>
        <label className='d-flex align-items-center'>
          <span><h4 className='m-0 text-white' style={{ width: "15rem" }}> {i.toLocaleUpperCase()}: </h4></span> &nbsp; &nbsp;
           <input class="form-control form-control-lg" id="formFileLg" type="file" value={files[i]} onChange={e=>files[i] = e.target.files[0]}/>
          {/* <p className='text-danger' style={{ marginLeft: "1rem", marginBottom: "0rem" }}>{""}</p> */}
        </label>
      </div>
      ))}
      
      <div className='m-3 d-flex align-items-center justify-content-center'>
        <button type="submit" className="btn form-submit mt-4 text-center" style={{ marginRight: "1rem", background: "black", color: "white" }} onClick={handleUpload}>Upload</button>
      </div>


    </div>
  )
}

export default UpdateFiles
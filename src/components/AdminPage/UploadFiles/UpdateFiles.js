import React from 'react'
import './update-files.css'

const UpdateFiles = () => {
  return (
    <div className='d-flex flex-column m-5 '>

      <div className='m-3'>
        <label className='d-flex align-items-center'>
          <span><h4 className='m-0' style={{ width: "15rem" }}> Zepeto: </h4></span> &nbsp; &nbsp;
          <input className='input-style-alt' type="file" name="name" onChange={""} />
          {/* <p className='text-danger' style={{ marginLeft: "1rem", marginBottom: "0rem" }}>{""}</p> */}
        </label>
      </div>

      <div className='m-3'>
        <label className='d-flex align-items-center'>
          <span><h4 className='m-0' style={{ width: "15rem" }}> Sandbox: </h4></span> &nbsp; &nbsp;
          <input className='input-style-alt' type="file" name="name" onChange={""} />
          {/* <p className='text-danger' style={{ marginLeft: "1rem", marginBottom: "0rem" }}>{""}</p> */}
        </label>
      </div>

      <div className='m-3'>
        <label className='d-flex align-items-center'>
          <span><h4 className='m-0' style={{ width: "15rem" }}> CloneX: </h4></span> &nbsp; &nbsp;
          <input className='input-style-alt' type="file" name="name" onChange={""} />
          {/* <p className='text-danger' style={{ marginLeft: "1rem", marginBottom: "0rem" }}>{""}</p> */}
        </label>
      </div>


      <div className='m-3'>
        <label className='d-flex align-items-center'>
          <span><h4 className='m-0' style={{ width: "15rem" }}> Snapchat: </h4></span> &nbsp; &nbsp;
          <input className='input-style-alt' type="file" name="name" onChange={""} />
          {/* <p className='text-danger' style={{ marginLeft: "1rem", marginBottom: "0rem" }}>{""}</p> */}
        </label>
      </div>

      <div className='m-3'>
        <button type="submit" className="btn form-submit mt-4 text-center" style={{ marginRight: "1rem", background: "black", color: "white" }}>Upload</button>
      </div>


    </div>
  )
}

export default UpdateFiles
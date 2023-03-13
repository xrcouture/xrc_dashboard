import React from 'react'
import './update-info.css'

const UpdateInfo = () => {  

  return (
    <div className='d-flex flex-column m-5 '>

      <div className='m-3'>
        <label className='d-flex align-items-center' style={{ width: "fit-content" }}>
          <span><h4 className='m-0' style={{ width: "10rem" }}> Date: </h4></span> &nbsp; &nbsp;
          <input className='input-style' type="date" name="name" onChange={""} />
          {/* <p className='text-danger' style={{ marginLeft: "1rem", marginBottom: "0rem" }}>{""}</p> */}
        </label>
      </div>

      <div className='m-3'>
        <label className='d-flex align-items-center' style={{ width: "fit-content" }}>
          <span><h4 className='m-0' style={{ width: "10rem" }}> Status: </h4></span> &nbsp; &nbsp;
          <input className='input-style' type="text" name="name" onChange={""} />
          {/* <p className='text-danger' style={{ marginLeft: "1rem", marginBottom: "0rem" }}>{""}</p> */}
        </label>
      </div>

      <div className='m-3'>
        <label className='d-flex align-items-center' style={{ width: "fit-content" }}>
          <span><h4 className='m-0' style={{ width: "10rem" }}> Budget: </h4></span> &nbsp; &nbsp;
          <input className='input-style' type="number" name="name" onChange={""} />
          {/* <p className='text-danger' style={{ marginLeft: "1rem", marginBottom: "0rem" }}>{""}</p> */}
        </label>
      </div>


      <div className='m-3'>
        <label className='d-flex align-items-center' style={{ width: "fit-content" }}>
          <span><h4 className='m-0' style={{ width: "10rem" }}> Progress: </h4></span> &nbsp; &nbsp;
          <input className='input-style' type="text" name="name" onChange={""} />
          {/* <p className='text-danger' style={{ marginLeft: "1rem", marginBottom: "0rem" }}>{""}</p> */}
        </label>
      </div>


      <div className='m-3'>
        <button type="submit" className="btn form-submit mt-4 text-center" style={{ marginRight: "1rem", background: "black", color: "white" }}>Update</button>
      </div>


    </div>
  )
}

export default UpdateInfo
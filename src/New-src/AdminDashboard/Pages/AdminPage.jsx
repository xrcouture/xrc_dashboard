import React, { useState, useEffect } from 'react'
import axios from 'axios'

import UpdateInfo from './AdminPage/UpdateInfo/UpdateInfo'
import UpdateFiles from './AdminPage/UploadFiles/UpdateFiles'

const AdminPage = ({data}) => {

  const [pageToggle, setPageToggle] = useState(true)
  const [assetData, setAssetData] = useState()

  const [brandName] = useState("Zara")
  const [assetName] = useState("Polygon")

  useEffect(() => {
    axios
      .post("http://localhost:5000/brands/asset", {
        brand: brandName,
        name: assetName
      }, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        }
      })
      .then((response) => {
        console.log(response.data.asset)
        setAssetData(response.data.asset)
      })
  }, [])


  return (
    <div>
      <div className='d-flex justify-content-evenly' style={{ background: "black" }}>
        <div onClick={() => setPageToggle(true)} className='text-white' style={{ textDecoration: pageToggle ? "underline blueviolet" : "none", cursor: "pointer", padding: "1rem 2rem" }}><h3>Update Information</h3></div>
        <div onClick={() => setPageToggle(false)} className='text-white' style={{ textDecoration: pageToggle ? "none" : "underline blueviolet", cursor: "pointer", padding: "1rem 2rem" }}><h3>Upload 3D Assets</h3></div>
      </div>
      {pageToggle ?
        <UpdateInfo data={data} />
        :
        <UpdateFiles data={data} />
      }
    </div>
  )
}

export default AdminPage
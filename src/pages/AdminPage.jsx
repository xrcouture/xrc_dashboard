import React, { useState, useEffect } from 'react'
import axios from 'axios'

import UpdateInfo from '../components/AdminPage/UpdateInfo/UpdateInfo'
import UpdateFiles from '../components/AdminPage/UploadFiles/UpdateFiles'

const AdminPage = () => {

  const [pageToggle, setPageToggle] = useState(true)
  const [assetData, setAssetData] = useState()

  const [brandName] = useState("Zara")
  const [assetName] = useState("Polygon")

  useEffect(() => {
    axios
      .post("https://xrcdashboard.onrender.com/brands/asset", {
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

      <div className='text-center mb-5' style={{ fontSize: "3rem" }}>
        NIKE / SNEAKERS
      </div>

      <div className='d-flex justify-content-evenly' style={{ background: "black" }}>
        <div onClick={() => setPageToggle(true)} className='text-white' style={{ textDecoration: pageToggle ? "underline blueviolet" : "none", cursor: "pointer", padding: "1rem 2rem" }}><h3>Update Information</h3></div>
        <div onClick={() => setPageToggle(false)} className='text-white' style={{ textDecoration: pageToggle ? "none" : "underline blueviolet", cursor: "pointer", padding: "1rem 2rem" }}><h3>Upload 3D Assets</h3></div>
      </div>


      {pageToggle ?
        <UpdateInfo />
        :
        <UpdateFiles />
      }
    </div>
  )
}

export default AdminPage
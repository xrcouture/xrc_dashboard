import React, { useState, useEffect } from 'react'

import sandboxImg from '../assets/snapar.png'
import snapchatImg from '../assets/snap.png'
import zepetoImg from '../assets/zepeto.png'
import clonexImg from '../assets/clonex.png'
import decentralandImg from '../assets/decenterland.png'

import axios from 'axios'

const AssetView = () => {

  const [assetTitle, setAssetTitle] = useState("")
  const [description, setDescription] = useState("")

  const [files, setFiles] = useState([])

  const [platforms, selectPlatforms] = useState({
    decentraland: false,
    sandbox: false,
    zepeto: false,
    clonex: false,
    snapchat: false
  })

  const [status, setStatus] = useState("")

  const [progress, setProgress] = useState("")

  const [cost, setCost] = useState("")

  const [days, setDays] = useState("")

  const [fCost, setFCost] = useState("")

  const [fDays, setFDays] = useState("")



  useEffect(() => {
    axios
      .post("https://xrcdashboard.onrender.com/brands/asset", {
        brand: "Zara",
        name: "Coats"
      }
        , {
          headers: {
            'Access-Control-Allow-Origin': '*'
          }
        })
      .then((response) => {
        console.log(response.data.asset[0])
        const data = response.data.asset[0]


        setAssetTitle(!data.assetName ? "-" : data.assetName)
        setDescription(!data.description ? "-" : data.description)

        setFiles(data.brandAssetFiles)

        const newPlatforms = platforms

        data.platform.map((item) => {
          console.log(item)
          return newPlatforms[item] = true
        })

        selectPlatforms(newPlatforms)

        setStatus(!data.status ? "-" : data.status)

        setProgress(!data.progress ? "-" : data.progress)

        setCost(!data.approximatePrice ? "-" : data.approximatePrice)

        setDays(!data.approximateTime ? "-" : data.approximateTime)

        setFCost(!data.actualPrice ? "-" : data.actualPrice)

        setFDays(!data.actualTime ? "-" : data.actualTime)

      })
  }, [])


  return (
    <div style={{ background: "#000", padding: "3em 5em", height: "100%" }}>
      <div className='upload-title mb-5'>View Asset</div>

      <div className='d-flex flex-column'>
        <label className=''>
          <div className='uc-items-title'> Asset name </div>
          <input className='uc-items-input' type="text" name="name" value={assetTitle} onChange={e => setAssetTitle(e.target.value)} disabled />
        </label>

        <label className='mt-5'>
          <div className='uc-items-title'> Description </div>
          <textarea rows="4" className='uc-items-input' type="text" name="name" value={description} maxLength={500} onChange={e => setDescription(e.target.value)} disabled />
        </label>
      </div>

      <div className='uc-items-title mt-5'> Uploaded files </div>
      <div className='uc-thumbnail-bg-view' style={{textAlign: "left"}}>
        {files.map((item) => {
          return <img style={{ width: "15rem", margin: "1em" }} src={item}></img>
        })}
      </div>

      <div className='uc-items-title mt-5'> Selected platforms </div>

      <div className='d-flex'>

        <div className='platforms-checkbox-container' style={{ marginLeft: "0" }}>
          <label className='platforms-checkbox' htmlFor="customCheckbox1">
            <img src={sandboxImg} alt=''></img>
            <span className='uc-items-title text-white' style={{ marginLeft: "0.5em", marginBottom: "0" }}>Sandbox</span>
          </label>
          <div className={platforms.sandbox ? 'pl-checkboxes check' : 'pl-checkboxes'}></div>
          <input id='customCheckbox1' checked={platforms.sandbox} type="checkbox" style={{ cursor: "pointer", display: "none" }} name="sandbox" />
        </div>

        <div className='platforms-checkbox-container'>
          <label className='platforms-checkbox' htmlFor="customCheckbox2">
            <img src={snapchatImg} alt=''></img>
            <span className='uc-items-title text-white' style={{ marginLeft: "0.5em", marginBottom: "0" }}>Snapchat AR</span>
          </label>
          <div className={platforms.snapchat ? 'pl-checkboxes check' : 'pl-checkboxes'}></div>
          <input id='customCheckbox2' checked={platforms.sandbox} type="checkbox" style={{ cursor: "pointer", display: "none" }} name="snapchat" />
        </div>

        <div className='platforms-checkbox-container'>

          <label className='platforms-checkbox' htmlFor="customCheckbox3">
            <img src={zepetoImg} alt=''></img>
            <span className='uc-items-title text-white' style={{ marginLeft: "0.5em", marginBottom: "0" }}>Zepeto</span>
          </label>

          <div className={platforms.zepeto ? 'pl-checkboxes check' : 'pl-checkboxes'}></div>
          <input id='customCheckbox3' checked={platforms.zepeto} type="checkbox" style={{ cursor: "pointer", display: "none" }} name="zepeto" />
        </div>

        <div className='platforms-checkbox-container'>

          <label className='platforms-checkbox' htmlFor="customCheckbox4">
            <img src={clonexImg} alt=''></img>
            <span className='uc-items-title text-white' style={{ marginLeft: "0.5em", marginBottom: "0" }}>Clone X</span>
          </label>

          <div className={platforms.clonex ? 'pl-checkboxes check' : 'pl-checkboxes'}></div>
          <input id='customCheckbox4' checked={platforms.clonex} type="checkbox" style={{ cursor: "pointer", display: "none" }} name="clonex" />

        </div>

        <div className='platforms-checkbox-container'>

          <label className='platforms-checkbox' htmlFor="customCheckbox5">
            <img src={decentralandImg} alt=''></img>
            <span className='uc-items-title text-white' style={{ marginLeft: "0.5em", marginBottom: "0" }}>Decentraland</span>
          </label>

          <div className={platforms.decentraland ? 'pl-checkboxes check' : 'pl-checkboxes'}></div>
          <input id='customCheckbox5' checked={platforms.decentraland} type="checkbox" style={{ cursor: "pointer", display: "none" }} name="decentraland" />

        </div>

      </div>

      <div className='d-flex flex-column'>

        <label className='mt-4'>
          <div className='uc-items-title'> Status </div>
          <input className='uc-items-input' type="text" name="name" value={status} onChange={e => setAssetTitle(e.target.value)} disabled />
        </label>

        <label className='mt-5'>
          <div className='uc-items-title'> Progress </div>
          <input className='uc-items-input' type="text" name="name" value={progress} onChange={e => setAssetTitle(e.target.value)} disabled />
        </label>

        <label className='mt-5'>
          <div className='uc-items-title'> Approximate cost </div>
          <input className='uc-items-input' type="text" name="name" value={cost} onChange={e => setAssetTitle(e.target.value)} disabled />
        </label>

        <label className='mt-5'>
          <div className='uc-items-title'> Approximate days to complete </div>
          <input className='uc-items-input' type="text" name="name" value={days} onChange={e => setAssetTitle(e.target.value)} disabled />
        </label>

        <label className='mt-5'>
          <div className='uc-items-title'> Final Cost </div>
          <input className='uc-items-input' type="text" name="name" value={fCost} onChange={e => setAssetTitle(e.target.value)} disabled />
        </label>

        <label className='mt-5'>
          <div className='uc-items-title'> Actual time to complete </div>
          <input className='uc-items-input' type="text" name="name" value={fDays} onChange={e => setAssetTitle(e.target.value)} disabled />
        </label>
      </div>


    </div>
  )
}

export default AssetView
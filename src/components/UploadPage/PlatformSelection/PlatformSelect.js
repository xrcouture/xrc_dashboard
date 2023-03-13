import React, { useContext } from 'react'

import { Context } from '../../../Context'

import PriceEstimation from '../Estimation/PriceEstimation'

import sandboxImg from '../../../assets/snapar.png'
import snapchatImg from '../../../assets/snap.png'
import zepetoImg from '../../../assets/zepeto.png'
import clonexImg from '../../../assets/clonex.png'
import decentralandImg from '../../../assets/decenterland.png'

import './PlatformSelect.css'

const PlatformSelect = () => {

  // STATES
  const { platformsData } = useContext(Context)
  const [platforms, selectPlatforms] = platformsData

  const handleClick = (e) => {
    const { name } = e.target

    selectPlatforms((prev) => {
      const obj = { ...prev }
      obj[name] = !prev[name]
      return obj
    })
  }

  return (
    <div>

      <div className='upload-title'>Choose Platforms</div>

      <div className='d-flex flex-column align-items-center upload-contents'>

        <div className='d-flex'>
          <div className='platforms-checkbox-container'>
            <label className='platforms-checkbox' htmlFor="customCheckbox1">
              <img src={sandboxImg} alt=''></img>
              <span className='uc-items-title text-white' style={{ marginLeft: "0.5em", marginBottom: "0" }}>Sandbox</span>
            </label>
            <div className={platforms.sandbox ? 'pl-checkboxes check' : 'pl-checkboxes'}></div>
            <input id='customCheckbox1' checked={platforms.sandbox} onChange={handleClick} type="checkbox" style={{ cursor: "pointer", display: "none" }} name="sandbox" />
          </div>

          <div className='platforms-checkbox-container'>
            <label className='platforms-checkbox' htmlFor="customCheckbox2">
              <img src={snapchatImg} alt=''></img>
              <span className='uc-items-title text-white' style={{ marginLeft: "0.5em", marginBottom: "0" }}>Snapchat AR</span>
            </label>
            <div className={platforms.snapchat ? 'pl-checkboxes check' : 'pl-checkboxes'}></div>
            <input id='customCheckbox2' checked={platforms.sandbox} onChange={handleClick} type="checkbox" style={{ cursor: "pointer", display: "none" }} name="snapchat" />
          </div>

          <div className='platforms-checkbox-container'>

            <label className='platforms-checkbox' htmlFor="customCheckbox3">
              <img src={zepetoImg} alt=''></img>
              <span className='uc-items-title text-white' style={{ marginLeft: "0.5em", marginBottom: "0" }}>Zepeto</span>
            </label>

            <div className={platforms.zepeto ? 'pl-checkboxes check' : 'pl-checkboxes'}></div>
            <input id='customCheckbox3' checked={platforms.zepeto} onChange={handleClick} type="checkbox" style={{ cursor: "pointer", display: "none" }} name="zepeto" />
          </div>
        </div>

        <div className='d-flex'>
          <div className='platforms-checkbox-container'>

            <label className='platforms-checkbox' htmlFor="customCheckbox4">
              <img src={clonexImg} alt=''></img>
              <span className='uc-items-title text-white' style={{ marginLeft: "0.5em", marginBottom: "0" }}>Clone X</span>
            </label>

            <div className={platforms.clonex ? 'pl-checkboxes check' : 'pl-checkboxes'}></div>
            <input id='customCheckbox4' checked={platforms.clonex} onChange={handleClick} type="checkbox" style={{ cursor: "pointer", display: "none" }} name="clonex" />

          </div>

          <div className='platforms-checkbox-container'>

            <label className='platforms-checkbox' htmlFor="customCheckbox5">
              <img src={decentralandImg} alt=''></img>
              <span className='uc-items-title text-white' style={{ marginLeft: "0.5em", marginBottom: "0" }}>Decentraland</span>
            </label>

            <div className={platforms.decentraland ? 'pl-checkboxes check' : 'pl-checkboxes'}></div>
            <input id='customCheckbox5' checked={platforms.decentraland} onChange={handleClick} type="checkbox" style={{ cursor: "pointer", display: "none" }} name="decentraland" />

          </div>
        </div>
      </div>


      <PriceEstimation platforms={platforms} />
    </div>
  )
}

export default PlatformSelect
import React, { useContext, useState } from 'react'
import PriceEstimation from '../Estimation/PriceEstimation'
import './PlatformSelect.css'
import sandboxImg from '../../../assets/snapar.png'
import snapchatImg from '../../../assets/snap.png'
import zepetoImg from '../../../assets/zepeto.png'
import clonexImg from '../../../assets/clonex.png'
import decentralandImg from '../../../assets/decenterland.png'
import { Context } from '../../../Context'

const PlatformSelect = () => {

  // const [platforms, selectPlatforms] = useState({
  //   sandbox: false,
  //   snapchat: false,
  //   zepeto: false,
  //   clonex: false,
  //   decentraland: false
  // })

  const { platform } = useContext(Context)
  const [platforms, selectPlatforms] = platform

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

      <h4>
        Choose Platforms
      </h4>

      <div className='d-flex justify-content-around mt-5 mb-5'>
        <div className=''>
          <img src={sandboxImg} alt=''></img>
          <div>
            <input checked={platforms.sandbox} onChange={handleClick} type="checkbox" style={{cursor: "pointer"}} name="sandbox" /> Sandbox
          </div>
        </div>

        <div className=''>
          <img src={snapchatImg} alt=''></img>
          <div>
            <input checked={platforms.snapchat} onChange={handleClick} type="checkbox" style={{cursor: "pointer"}} name="snapchat" /> Snapchat AR
          </div>
        </div>

        <div className=''>
          <img src={zepetoImg} alt=''></img>
          <div>
            <input checked={platforms.zepeto} onChange={handleClick} type="checkbox" style={{cursor: "pointer"}} name="zepeto" /> Zepeto
          </div>
        </div>

        <div className=''>
          <img src={clonexImg} alt=''></img>
          <div>
            <input checked={platforms.clonex} onChange={handleClick} type="checkbox" style={{cursor: "pointer"}} name="clonex" /> Clone X
          </div>
        </div>

        <div className=''>
          <img src={decentralandImg} alt=''></img>
          <div>
            <input checked={platforms.decentraland} onChange={handleClick} type="checkbox" style={{cursor: "pointer"}} name="decentraland" /> Decentraland
          </div>
        </div>
      </div>


      {/* <PriceEstimation platforms={platforms} /> */}
    </div>
  )
}

export default PlatformSelect
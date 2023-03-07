import React, { useEffect,useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import ProgressBar1 from 'react-animated-progress-bar';
import {CiEdit} from 'react-icons/ci'

function Upload() {
  const {assetName1,brands} = useParams()
  const [dataAsset, setDataAsset] = useState()
  const [loading, setLoading] = useState(true)
  useEffect(()=>{

    fetchAsset()
  },[])

  const fetchAsset = async() =>{
    await axios.post('http://localhost:5000/brands/asset',{
      brand:"Zara",
      name:assetName1
    }).then(res =>{
      setDataAsset(res.data.asset[0])
      console.log(res.data.asset[0])
      setLoading(false)
  })
  }
  return (
    <div>
      {loading ? <h1>Loading...</h1> : 
       (
        <>
        <h1>Asset Name - ({dataAsset.assetName}) <Link to = {`/${brands}/${assetName1}/edit`} ><CiEdit size={35}/></Link></h1> 
        {dataAsset.thumbnail.length > 0 ? <img src={dataAsset.thumbnail[0]} /> : <h1>No Thumbnail</h1>}
        <h3>Selected Platforms - </h3> 
        {dataAsset.platform.length > 0 ? dataAsset.platform.map((p,index) => <li key={index}>{p}</li>) : <h1>No Platforms</h1>}
        <h3>Uploaded Files</h3>
        {dataAsset.brandAssetFiles.length > 0 ? dataAsset.brandAssetFiles.map((p,index) => <img style={{height:"100px", width:"100px", padding:"10px"}} key={index} src={p}  />) : <h1>No Files</h1>}
        <h3>Progress : </h3>
        {<ProgressBar1
                width="200px"
                height="15px"
                rect
                fontColor="white"
                percentage={dataAsset.progress}
                rectPadding="1px"
                rectBorderRadius="15px"
                trackPathColor="transparent"
                bgColor="#333333"
                trackBorderColor="white"
              />}
        
        <h3>Status - </h3>
        <p>{dataAsset.status}</p>
        </>)
        
      }

    </div>
  )
}

export default Upload
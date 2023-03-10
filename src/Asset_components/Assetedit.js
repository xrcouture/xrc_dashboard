import React, { useEffect,useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import ProgressBar1 from 'react-animated-progress-bar';
import {CiEdit} from 'react-icons/ci'
import '../components/UploadPage/FilesUpload/FileUpload'

function Assetedit() {
    const {assetName1,brands} = useParams()
    const [dataAsset, setDataAsset] = useState()
    const [loading, setLoading] = useState(true)
    const [assetName, setAssetName] = useState("")
    const [thumbnail, setThumbnail] = useState()
    const [platform, setPlatform] = useState()
    const [brandAssetFiles, setBrandAssetFiles] = useState()
    const [progress, setProgress] = useState()
    const [status, setStatus] = useState()
    
    useEffect(()=>{
      fetchAsset()
    },[])
  
    const fetchAsset = async() =>{
      await axios.post('http://localhost:5000/brands/asset',{
        brand:"Zara",
        name:assetName1
      }).then(res =>{
        setAssetName(res.data.asset[0].assetName)
        setThumbnail(res.data.asset[0].thumbnail)
        setPlatform(res.data.asset[0].platform)
        setBrandAssetFiles(res.data.asset[0].brandAssetFiles)
        setProgress(res.data.asset[0].progress)
        setStatus(res.data.asset[0].status)
        setDataAsset(res.data.asset[0])
        console.log(res.data.asset[0])
        setLoading(false)
    })
    }
    const previewFile = (e) => {
        var preview = document.querySelector("#thumbnail");
        var file = document.querySelector("input[type=file]").files[0];
        var reader = new FileReader();
    
        reader.addEventListener(
          "load",
          function () {
            preview.src = reader.result;
            setThumbnail([file])
          },
          false
        );
    
        if (file) {
          reader.readAsDataURL(file);
        }
      }
    
    const handleEdit = (e) =>{
        e.preventDefault()
        const {value} = e.target
        // setDataAsset((prev) =>{
        //     return {...prev, assetName:value}
        // })
        console.log(dataAsset)
    }
    return (
      <div>
        {loading ? <h1>Loading...</h1> : 
         (
          <>
          <div className='row'>
            <div className='col-md-6 row'>
                <div className='col-md-6'><h1>Asset Name</h1></div>
                <div className='col-md-6'>
                    <input type="text" value={assetName} name="assetname" onChange={(e)=>setAssetName(e.target.value)} disabled/> </div>
            </div>
            <div className='col-md-6'>
            <div>
          <img style={{ width: "10rem", marginRight:"2rem" }} src={thumbnail[0]} alt='' id='thumbnail' />
          <img style={{ width: "10rem", marginRight:"2rem" }} src={thumbnail[0]} alt='' id='thumbnail' />
          <input id="profile-image-upload" accept="image/png, image/jpeg, image/webp, image/jpg" type="file" onChange={previewFile}></input>
        </div>
            </div>
          </div>
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

export default Assetedit
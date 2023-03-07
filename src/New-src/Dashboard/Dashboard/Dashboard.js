import React from 'react'
import './Dashboard.css'
import {IoAddCircleOutline} from 'react-icons/io5'
import Recent from '../Recents/Recent'
import {IoIosNotificationsOutline} from 'react-icons/io'

function Dashboard() {
  return (
    <div>
        <div className='row container-dashboard'>
            <div className='col-6'>
                <h1 style={{color:"white"}}>Dashboard Overview</h1>
            </div>
            <div className='col-6 row d-flex align-items-center'>
                <div className='col-10 h-100 m-0 p-0'>
                <div class="input-icons">
                <i class="fa fa-search input-icon" >
              </i>
                <input class="input-field manage-asset-input" 
                      type="text"
                      placeholder="Search Assets"
                    //   value={filterText}
                    //   onChange={e => setFilterText(e.target.value)}
                       />
            </div>
                </div>
                <div className='col-1 p-1 d-flex justify-content-center'>
                    <div className='icons-dashboard'>
                <IoAddCircleOutline size={25}  color="white"/></div>
                </div>
                <div className='col-1 p-1 d-flex justify-content-center'>
                <div className='icons-dashboard'>
                <IoIosNotificationsOutline size={25} color="white" /></div>
                </div>
            </div>
        </div>
        <Recent />
    </div>
  )
}

export default Dashboard
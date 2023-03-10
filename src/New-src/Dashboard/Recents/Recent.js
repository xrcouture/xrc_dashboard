import React from 'react'
import './Recent.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import {GrUploadOption} from 'react-icons/gr'
import {VscOpenPreview} from 'react-icons/vsc'
import {AiOutlineExclamationCircle} from 'react-icons/ai'
import {MdOutlinePendingActions} from 'react-icons/md'
import {IoCheckmarkDone} from 'react-icons/io5'
import R1 from './R1.png'
import MyComponent from '../../../Asset_components/basic';
function Recent(props) {
  return (
    <div style={{position:"relative"}}>
      <h1 className='text-white mt-4 ml-4'>Recents</h1>
      <div className='row' style={{position:"relative",zIndex:-1}}>
        <div className='col-8 p-4 swiper-container-all'>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={20}
          slidesPerView={3}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
        >
          <SwiperSlide>
            <div className='card-recents'>
              <div className='image-container'>
                <div className='action-container under-review-border'>
                  <div className='action-icon-container '>
                  <GrUploadOption color='white' className='action-container-icon under-review-action-icon' style={{color:"white"}} />
                  </div>
                 <span className="under-review-text-color">Under review</span>
                </div>
                <div className='image-card'>
                  <img src={R1} alt='image' className='card-image' />
                </div>
              </div>
              <h5 className='text-white card-title'>
                A Girl in his dreams
              </h5>
              <div className='progress-container'>
              <div className='asset-progress'>
                <div className='progress-bar1'>
                <div className='progress-bar-ball'>
                  </div>
                </div>
              </div>
                <span className='text-white' style={{fontSize:"10px", fontWeight:"bolder", marginBottom:"5%"}}>50%</span>
              </div>
              <div className='button-card'>
                <button className='button-card-cancel'>
                  Cancel
                </button>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className='card-recents completed-border'>
              <div className='image-container'>
                <div className='action-container completed-border'>
                  <div className='action-icon-container completed-bg'>
                  <IoCheckmarkDone color='white' className='action-container-icon completed-action-icon' />
                  </div>
                 <span className='completed-text-color'>Completed</span>
                </div>
                <div className='image-card'>
                  <img src={R1} alt='image' className='card-image' />
                </div>
              </div>
              <h5 className='text-white card-title'>
                A Girl in his dreams
              </h5>
              <div className='progress-container'>
              <div className='asset-progress'>
                <div className='progress-bar1'>
                <div className='progress-bar-ball'>
                  </div>
                </div>
              </div>
                <span className='text-white' style={{fontSize:"10px", fontWeight:"bolder", marginBottom:"5%"}}>50%</span>
              </div>
              <div className='button-card'>
                <button className='button-card-cancel'>
                  Download
                </button>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className='card-recents action-needed-border'>
              <div className='image-container'>
                <div className='action-container action-needed-border action-needed-bg'>
                  <div className='action-icon-container'>
                  <GrUploadOption color='white'  className='action-container-icon pending-action-icon' style={{color:"white"}} />
                  </div>
                 <span className='pending-text-color'>Action Needed</span>
                </div>
                <div className='image-card'>
                  <img src={R1} alt='image' className='card-image' />
                </div>
              </div>
              <h5 className='text-white card-title'>
                A Girl in his dreams
              </h5>
              <div className='progress-container'>
              <div className='asset-progress'>
                <div className='progress-bar1'>
                <div className='progress-bar-ball'>
                  </div>
                </div>
              </div>
                <span className='text-white' style={{fontSize:"10px", fontWeight:"bolder", marginBottom:"5%"}}>50%</span>
              </div>
              <div className='button-card'>
                <button className='button-card-cancel'>
                  Pay
                </button>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className='card-recents'>
              <div className='image-container'>
                <div className='action-container'>
                  <div className='action-icon-container'>
                  <GrUploadOption color='white' className='action-container-icon' style={{color:"white"}} />
                  </div>
                 <span>Working</span>
                </div>
                <div className='image-card'>
                  <img src={R1} alt='image' className='card-image' />
                </div>
              </div>
              <h5 className='text-white card-title'>
                A Girl in his dreams
              </h5>
              <div className='progress-container'>
              <div className='asset-progress'>
                <div className='progress-bar1'>
                <div className='progress-bar-ball'>
                  </div>
                </div>
              </div>
                <span className='text-white' style={{fontSize:"10px", fontWeight:"bolder", marginBottom:"5%"}}>50%</span>
              </div>
              <div className='button-card'>
                <button className='button-card-cancel'>
                  Cancel
                </button>
              </div>
            </div>
          </SwiperSlide>
          
        </Swiper>
        </div>
        <div className='col-4 d-flex justify-content-center align-items-center position-relative'>
          <div className='overview-container'>
            <h3 className='text-white'>Overview</h3>
            <div className='under-review  av pt-4'>
              <div className='under-review-icon '>
              <VscOpenPreview />
              </div>
              <h4 className='under-review-text'>Under Review</h4> 
              <span className='under-review-percentage'>50</span>
            </div>
            <div className='under-review pt-4'>
              <div className='under-review-icon action-needed-icon'>
              <AiOutlineExclamationCircle />
              </div>
              <h4 className='under-review-text action-needed-icon'>Action Needed</h4> 
              <span className='under-review-percentage'>50</span>
            </div>
            <div className='under-review pt-4'>
              <div className='under-review-icon pending-icon'>
              <MdOutlinePendingActions />
              </div>
              <h4 className='under-review-text pending-icon'>Payment Pending</h4> 
              <span className='under-review-percentage'>50</span>
            </div>
            <div className='under-review pt-4'>
              <div className='under-review-icon completed-icon'>
              <IoCheckmarkDone />
              </div>
              <h4 className='under-review-text completed-icon'>Completed</h4> 
              <span className='under-review-percentage'>50</span>
            </div>
          </div>
        </div>
      </div>
      <MyComponent filterText = {props.filterText} />
    </div>
  )
}

export default Recent
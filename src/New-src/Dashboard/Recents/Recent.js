import React from 'react'
import './Recent.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import {GrUploadOption} from 'react-icons/gr'
import R1 from './R1.png'
function Recent() {
  return (
    <div>
      <h1 className='text-white mt-4 ml-4'>Recents</h1>
      <div className='row'>
        <div className='col-8 p-4'>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={20}
          slidesPerView={3}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log('slide change')}
        >
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
                  Download
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
        <div className='col-4'></div>

      </div>

    </div>
  )
}

export default Recent
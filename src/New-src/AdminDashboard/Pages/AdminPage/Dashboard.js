import React from 'react'
import './Dashboard.css'
import {IoAddCircleOutline} from 'react-icons/io5'
import {IoIosNotificationsOutline} from 'react-icons/io'
import MyComponent from '../components/AdminBrands'
import { useParams } from 'react-router'

function Dashboard() {
  const [filterText, setFilterText] = React.useState("");
  const {brand} = useParams()

  return (
    <div>
        <div className='row container-dashboard'>
            <div className='col-6'>
                <h1 style={{color:"white"}}>Dashboard Overview</h1>
            </div>
            <div className='col-6 row d-flex align-items-center justify-content-between'>
                <div className='col-10 h-100 m-0 p-0'>
                <div class="input-icons">
                <i class="fa fa-search input-icon" >
              </i>
                <input class="input-field manage-asset-input" 
                      type="text"
                      placeholder="Search Assets"
                      value={filterText}
                      onChange={e => setFilterText(e.target.value)}
                       />
            </div>
                </div>
                <div className='col-1 p-1 d-flex justify-content-center'>
                <div className='icons-dashboard'>
                <div class = "icons">
                    <div class = "notification">
                      <a href = "#">
                      <div class = "notBtn" href = "#">
                        <div class = "number">2</div>
                        <IoIosNotificationsOutline size={25} color="white" />
                          <div class = "notification-box">
                            <div class = "display">
                              <div class = "nothing"> 
                                <i class="fas fa-child stick"></i> 
                                <div class = "cent">Looks Like your all caught up!</div>
                              </div>
                              <div class = "cont-Notification">
                                <div class = "sec new">
                                  <a href = "https://codepen.io/Golez/">
                                  <div class = "profCont">
                                  <img class = "profile" src = "https://c1.staticflickr.com/5/4007/4626436851_5629a97f30_b.jpg" />
                                    </div>
                                  <div class = "txt">James liked your post: "Pure css notification box"</div>
                                  <div class = "txt sub">11/7 - 2:30 pm</div>
                                  </a>
                                </div>
                                <div class = "sec new">
                                  <a href = "https://codepen.io/Golez/">
                                  <div class = "profCont">
                                  <img class = "profile" src = "https://obamawhitehouse.archives.gov/sites/obamawhitehouse.archives.gov/files/styles/person_medium_photo/public/person-photo/amanda_lucidon22.jpg?itok=JFPi8OFJ" />
                                    </div>
                                  <div class = "txt">Annita liked your post: "Pure css notification box"</div>
                                  <div class = "txt sub">11/7 - 2:13 pm</div>
                                  </a>
                                </div>
                                <div class = "sec">
                                  <a href = "https://codepen.io/Golez/">
                                  <div class = "profCont">
                                  <img class = "profile" src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3O45RK9qyCrZJivYsY6PmeVEJH07l7bkoolJmscBsNjzump27" />
                                    </div>
                                  <div class = "txt">Brie liked your post: "Pure css notification box"</div>
                                  <div class = "txt sub">11/6 - 9:35 pm</div>
                                  </a>
                                </div>
                                <div class = "sec">
                                  <a href = "https://codepen.io/Golez/">
                                  <div class = "profCont">
                                  <img class = "profile" src = "https://c1.staticflickr.com/4/3725/10214643804_75c0b6eeab_b.jpg" />
                                    </div>
                                  <div class = "txt">Madison liked your post: "Pure css notification box"</div>
                                  <div class = "txt sub">11/6 - 4:04 pm</div>
                                  </a>
                                </div>
                                <div class = "sec">
                                  <a href = "https://codepen.io/Golez/">
                                  <div class = "profCont">
                                  <img class = "profile" src="https://upload.wikimedia.org/wikipedia/commons/5/52/NG_headshot_white_shirt_square_Jan18.jpg" />
                                    </div>
                                  <div class = "txt">Ted liked your post: "Pure css notification box"</div>
                                  <div class = "txt sub">11/6 - 10:37 am</div>
                                  </a>
                                </div>
                                <div class = "sec">
                                  <a href = "https://codepen.io/Golez/">
                                  <div class = "profCont">
                                  <img class = "profile" src = "https://upload.wikimedia.org/wikipedia/commons/d/dd/Pat-headshot-square.jpg" />
                                    </div>
                                  <div class = "txt">Tommas liked your post: "Pure css notification box"</div>
                                  <div class = "txt sub">11/5 - 7:30 pm</div>
                                  </a>
                                </div>
                                <div class = "sec">
                                  <a href = "https://codepen.io/Golez/">
                                  <div class = "profCont">
                                  <img class = "profile" src = "https://c1.staticflickr.com/8/7407/13785133614_6254abb8c4.jpg" />
                                    </div>
                                  <div class = "txt">Claire liked your post: "Pure css notification box"</div>
                                  <div class = "txt sub">11/5 - 2:30 pm</div>
                                  </a>
                                </div>
                                <div class = "sec">
                                  <a href = "https://codepen.io/Golez/">
                                  <div class = "profCont">
                                  <img class = "profile" src = "//c1.staticflickr.com/1/185/440890151_54c5b920b0_b.jpg" />
                                    </div>
                                  <div class = "txt">Jerimaiah liked your post: "Pure css notification box"</div>
                                  <div class = "txt sub">11/5 - 1:34 pm</div>
                                  </a>
                                </div>
                                <div class = "sec">
                                  <a href = "https://codepen.io/Golez/">
                                  <div class = "profCont">
                                  <img class = "profile" src = "//c2.staticflickr.com/4/3397/3585544855_28442029a5_z.jpg?zz=1" />
                                    </div>
                                  <div class = "txt">Debra liked your post: "Pure css notification box"</div>
                                  <div class = "txt sub">11/5 - 10:20 am</div>
                                  </a>
                                </div>
                            </div>
                            </div>
                        </div>
                      </div>
                        </a>
                    </div>
                </div>
                {/* 
                <div className='notification-box1'></div> */}
                </div>
                </div>
            </div>
        </div>
        <MyComponent filterText={filterText} brand={brand}/>
    </div>
  )
}

export default Dashboard
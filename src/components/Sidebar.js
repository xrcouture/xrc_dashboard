import React, { useState } from "react";
import {
  FaTh,
  FaBars,
  FaUserAlt,
  FaRegChartBar,
  FaCommentAlt,
  FaRegCommentDots,
  FaSignOutAlt
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import img_logo from "../assets/xr-white.png";
import { BiSupport } from "react-icons/bi";
import { TbDeviceAnalytics } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { RxHamburgerMenu } from "react-icons/rx";
import {
  AiOutlineFileAdd,
  AiOutlineFolderAdd,
  AiOutlineHome,
} from "react-icons/ai";
import axios from "axios";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    console.log(isOpen);
    setIsOpen(!isOpen);
  };
  const menuItem = [
    {
      path: "/",
      name: "Dashboard",
      icon: <AiOutlineHome />,
    },
    {
      path: "/asset",
      name: "Add Assets",
      icon: <AiOutlineFileAdd />,
    },
    {
      path: "/collections",
      name: "Add Collections",
      icon: <AiOutlineFolderAdd />,
    },
    {
      path: "/analytics",
      name: "Analytics",
      icon: <TbDeviceAnalytics />,
    },
    {
      path: "/product",
      name: "Support",
      icon: <BiSupport />,
    },
    {
      path: "/productList",
      name: "Profile",
      icon: <CgProfile />,
    },
  ];
  const handleLogout = () => {
    const brand = localStorage.getItem('brand')
    console.log(brand)
    // axios.delete(`https://xrcdashboard.onrender.com/auth/signout/`,{data:{
    //   brandName: brand
    // }}).then(res=>console.log(res)).catch((e)=>console.log(e))
    window.location.replace("/signin");
  }
  return (
    <div className="container-sidebar position-relative">
      <div style={{ width: isOpen ? "250px" : "50px" }} className="sidebar">
        <div className="top_section">
          <img
            src={img_logo}
            style={{ display: isOpen ? "block" : "none" }}
            alt="logo"
            className="logo-sidebar"
          />
          <div style={{ marginLeft: isOpen ? "55px" : "0px" }} className="bars">
            <RxHamburgerMenu
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            />
           
          </div>
        </div>
        <div className="top_section">
          <h6 style={{ display: isOpen ? "block" : "none" }}>Logout</h6>
          <div style={{ marginLeft: isOpen ? "55px" : "0px" }} className="bars">
          <FaSignOutAlt  onClick={handleLogout}/>
          </div>
        </div>
       
        
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link"
            activeclassName="active"
            style={{ paddingLeft: !isOpen ? "20px" : "40px" }}
          >
            <div className="icon">{item.icon}</div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="link_text"
            >
              {item.name}
            </div>
          </NavLink>
        ))}
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;

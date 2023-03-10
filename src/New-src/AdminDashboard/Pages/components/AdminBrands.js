import React,{useEffect, useState} from 'react'
import DataTable from './DataTable'
import ProgressBar from 'react-bootstrap/ProgressBar';
import differenceBy from 'lodash/differenceBy'
import { Button } from 'react-bootstrap';
import {SlOptionsVertical} from 'react-icons/sl'
import {RiDeleteBin6Line} from 'react-icons/ri'
import {GiWallet} from 'react-icons/gi'
import {BiEdit} from 'react-icons/bi'
import {FaTrashAlt} from 'react-icons/fa'
import {IoBagCheckOutline} from 'react-icons/io5'
import Swal from 'sweetalert2'
import Modal from 'react-bootstrap/Modal';
import ProgressBar1 from 'react-animated-progress-bar';
import styled, { keyframes } from 'styled-components'
import axios from 'axios';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { UncontrolledDropdown,DropdownItem,DropdownMenu,DropdownToggle } from 'reactstrap';
import AdminPage from '../AdminPage';
import UpdateFiles from '../AdminPage/UploadFiles/UpdateFiles';
import UpdateInfo from '../AdminPage/UpdateInfo/UpdateInfo';
import { Formik } from 'formik';

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

const Spinner = styled.div`
  margin: 16px;
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);
  border-top: 2px solid grey;
  border-right: 2px solid grey;
  border-bottom: 2px solid grey;
  border-left: 4px solid black;
  background: transparent;
  width: 80px;
  height: 80px;
  border-radius: 50%;
`
const CustomLoader = () => (
  <div style={{ padding: '24px' }}>
    <Spinner />
  </div>
)
export default function MyComponent(props) {

  const { brand } = useParams();

  const caseInsensitiveSort = (rowA, rowB) => {
    const a = rowA.status
    const b = rowB.status
    if (a > b) {
        return 1;
    }
    if (b > a) {
        return -1;
    }
    return 0;
  };
  const rowDisabledCriteria = row => row.status == "Paid";
  const conditionalRowStyles = [
    {
      when: row => row.status != "Under Review",
      style: {
        backgroundColor: '#C8CDD0   ',
              opacity:'.9',
        '&:hover': {
          cursor: 'pointer',
        },
      },
    },
    {
      when: row => row.payment == true,
      style: {
        backgroundColor: '#F2F2F3',
        '&:hover': {
          cursor: 'not-allowed',
        },
      },
    },
  ];
  const handlePay = (row)=>{
    Swal.fire({
      title: 'Are you sure?',
      text: `You want to pay $${row.price}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, pay it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Paid!',
          'Your payment has been paid.',
          'success'
        )
      }else{
        Swal.fire(
          'Cancelled',
          'Your payment has been cancelled.',
          'error'
        )
      }
    })
  }
  const handlePayTotal = (price) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `You want to checkout $${price}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, pay it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Paid!',
          'Your payment has been paid.',
          'success'
        )
      }else{
        Swal.fire(
          'Cancelled',
          'Your payment has been cancelled.',
          'error'
        )
      }
    })
  }
  const columns = [
      {
          name: 'Image',
          selector: 'thumbnail',
          cell:(row)=>(
            <>
            {row.thumbnail && (row.thumbnail != "") ? <img src={row.thumbnail} style={{width:"30px",height:"30px"}}/> : 
            <div style={{height:"30px", width:"30px", backgroundColor:"black",alignSelf:"center", justifySelf:"center",fontSize:"20px",fontWeight:"bolder",color:"gray", textAlign:"center"}}>{row.assetName.split(" ").slice(0,1).map((n)=>n[0]).join("").toUpperCase()}</div>
            }
              
            </>
          )
      },
      {
          name: 'Name',
          selector: 'assetName',
          sortable: true,
          cell:(row)=>(
            <Link to={`/Zara/${row.assetName}`}>{row.assetName}</Link>
          )
      },
      {
          name: 'Price',
          selector: 'actualPrice',
          sortable:true,
          cell:(row)=>(
            <>
            {
              row.status != "Under Review" ?<h6 className='text-white'>{row.actualPrice}</h6> : <h6 className='text-white'>---</h6>
            }
            
            </>
          )
      },
      {
          name: 'No of Days',
          selector: 'actualTime',
          sortable:true,
          cell:(row)=>(
            <>
            {
              row.status != "Under Review" ?<h6 className='text-white'>{row.actualTime}</h6> : <h6 className='text-white'>---</h6>
            }
            </>
          )
      },
      // {
      //     name: 'Platform',
      //     selector: 'platform',
      //     sortable:true,
      //     cell:(row)=> (
      //       <div>
      //         {row.platform.map((p)=>(<p>{p}</p>))}
      //       </div>
      //     )
      // },
      {
          name: 'Progress',
          selector: row => (
              <>
              <ProgressBar now={row.progress} variant="success" label={`${row.progress}%`} style={{width:"100px"}} />
           </>
  
        ),
          sortable:true,
          sortFunction: caseInsensitiveSort
      },
      {
        name: 'Status',
        selector: 'status',
        sortable:true,
        cell:(row)=>( 
          <>
         <p style={{color:`${row.status === 'Under Review' ? 'violet' : row.status === 'Draft' ? "gray" : row.status === "Action Required" ? 'red' : row.status === "Pending payment" ? 'yellow' : row.status === "In Progress" ? 'blue' : 'green'}`}}>{row.status}</p>
         {/* <p style={{color: `${row.status ==== "Under Review" ? "violet" : row.status ==== "Draft" ? "gray" : "green"}`}}>{row.status}</p> */}
          </>
        )
      },
      {
          name: 'Edit',
          selector: row => (
            <>
            <h6 className='text-white' onClick={() => handleView(row)}>
            <BiEdit />
            </h6>
            </>
        ),
      },
      // {
      //     name: 'Options',
      //     // selector: "",
      //     cell:(row) =>(
      //        <UncontrolledDropdown direction="end">
      //         <DropdownToggle
      //           color="transparent"
      //           className="action-toggle"
      //           direction="end"
      //         >
      //         <SlOptionsVertical className='action-container-icon ' />
      //         </DropdownToggle>
      //       <DropdownMenu dark>
      //         <DropdownItem onClick={()=>(alert(`Are you ready to pay: ${row.budget}`))}>
      //         <GiWallet /> Pay Now 
      //         </DropdownItem>
      //         <DropdownItem divider />
      //         <DropdownItem> 
      //          <BiEdit /> Edit
      //         </DropdownItem>

      //         <DropdownItem divider />
      //         <DropdownItem onClick={()=>handleDelete(row)}> 
      //          <RiDeleteBin6Line /> Delete
      //         </DropdownItem>
            
      //       </DropdownMenu>
      //     </UncontrolledDropdown>
      //     )
      // },
  ];
  const d = [{
    "id": 1,
    "assetName": "Asparagus - White, Canned",
    "budget": 276,
    "estimatedTime": "2/11/2023",
    "progress": 41,
    "status": "Completed"
  }, {
    "id": 2,
    "assetName": "Beans - Long, Chinese",
    "budget": 294,
    "estimatedTime": "3/15/2022",
    "progress": 59,
    "status": "Under Review"
  }, {
    "id": 3,
    "assetName": "Tuna - Fresh",
    "budget": 8,
    "estimatedTime": "1/28/2024",
    "progress": 80,
    "status": "Pending payment"
  }, {
    "id": 4,
    "assetName": "Raisin - Golden",
    "budget": 79,
    "estimatedTime": "2/13/2024",
    "progress": 27,
    "status": "In Progress"
  }, {
    "id": 5,
    "assetName": "Quail - Whole, Boneless",
    "budget": 45,
    "estimatedTime": "6/22/2024",
    "progress": 94,
    "status": "Action Required"
  }, {
    "id": 6,
    "assetName": "Sausage - Breakfast",
    "budget": 156,
    "estimatedTime": "12/20/2022",
    "progress": 69,
    "status": "Pending payment"
  }, {
    "id": 7,
    "assetName": "Absolut Citron",
    "budget": 813,
    "estimatedTime": "6/6/2022",
    "progress": 6,
    "status": "Completed"
  }, {
    "id": 8,
    "assetName": "Garbag Bags - Black",
    "budget": 208,
    "estimatedTime": "4/22/2023",
    "progress": 95,
    "status": "In Progress"
  }, {
    "id": 9,
    "assetName": "Pastry - Cheese Baked Scones",
    "budget": 314,
    "estimatedTime": "3/24/2023",
    "progress": 55,
    "status": "Action Required"
  }, {
    "id": 10,
    "assetName": "Cheese - St. Andre",
    "budget": 178,
    "estimatedTime": "8/21/2024",
    "progress": 34,
    "status": "Pending payment"
  }, {
    "id": 11,
    "assetName": "Veal - Leg, Provimi - 50 Lb Max",
    "budget": 52,
    "estimatedTime": "4/11/2022",
    "progress": 80,
    "status": "Under Review"
  }, {
    "id": 12,
    "assetName": "Food Colouring - Blue",
    "budget": 29,
    "estimatedTime": "11/14/2022",
    "progress": 17,
    "status": "Draft"
  }, {
    "id": 13,
    "assetName": "Chutney Sauce",
    "budget": 72,
    "estimatedTime": "11/21/2023",
    "progress": 89,
    "status": "Under Review"
  }, {
    "id": 14,
    "assetName": "Pepper - Sorrano",
    "budget": 243,
    "estimatedTime": "12/2/2024",
    "progress": 38,
    "status": "In Progress"
  }, {
    "id": 15,
    "assetName": "Tart - Raisin And Pecan",
    "budget": 85,
    "estimatedTime": "11/19/2022",
    "progress": 21,
    "status": "Completed"
  }, {
    "id": 16,
    "assetName": "Wine - Beringer Founders Estate",
    "budget": 247,
    "estimatedTime": "12/30/2024",
    "progress": 38,
    "status": "In Progress"
  }, {
    "id": 17,
    "assetName": "Tea - Apple Green Tea",
    "budget": 109,
    "estimatedTime": "10/4/2022",
    "progress": 56,
    "status": "Pending payment"
  }, {
    "id": 18,
    "assetName": "Bread - Sour Sticks With Onion",
    "budget": 274,
    "estimatedTime": "11/28/2024",
    "progress": 4,
    "status": "Pending payment"
  }, {
    "id": 19,
    "assetName": "Pecan Raisin - Tarts",
    "budget": 628,
    "estimatedTime": "5/5/2022",
    "progress": 47,
    "status": "Pending payment"
  }, {
    "id": 20,
    "assetName": "Coffee - Decaffeinato Coffee",
    "budget": 893,
    "estimatedTime": "11/16/2022",
    "progress": 11,
    "status": "Under Review"
  }, {
    "id": 21,
    "assetName": "Dill Weed - Fresh",
    "budget": 757,
    "estimatedTime": "9/6/2022",
    "progress": 71,
    "status": "Under Review"
  }, {
    "id": 22,
    "assetName": "Onion - Dried",
    "budget": 401,
    "estimatedTime": "9/5/2022",
    "progress": 8,
    "status": "In Progress"
  }, {
    "id": 23,
    "assetName": "Muffin Batt - Ban Dream Zero",
    "budget": 699,
    "estimatedTime": "2/19/2023",
    "progress": 65,
    "status": "In Progress"
  }, {
    "id": 24,
    "assetName": "Pepper - Black, Whole",
    "budget": 925,
    "estimatedTime": "1/10/2023",
    "progress": 37,
    "status": "Completed"
  }, {
    "id": 25,
    "assetName": "Grapes - Red",
    "budget": 794,
    "estimatedTime": "3/23/2024",
    "progress": 33,
    "status": "Pending payment"
  }, {
    "id": 26,
    "assetName": "Beer - Upper Canada Lager",
    "budget": 945,
    "estimatedTime": "11/23/2022",
    "progress": 58,
    "status": "Pending payment"
  }, {
    "id": 27,
    "assetName": "Wine - Magnotta - Belpaese",
    "budget": 256,
    "estimatedTime": "12/23/2023",
    "progress": 50,
    "status": "Draft"
  }, {
    "id": 28,
    "assetName": "Compound - Passion Fruit",
    "budget": 12,
    "estimatedTime": "12/2/2023",
    "progress": 80,
    "status": "In Progress"
  }, {
    "id": 29,
    "assetName": "Plasticspoonblack",
    "budget": 860,
    "estimatedTime": "3/6/2023",
    "progress": 29,
    "status": "Draft"
  }, {
    "id": 30,
    "assetName": "Syrup - Monin - Granny Smith",
    "budget": 761,
    "estimatedTime": "5/3/2022",
    "progress": 57,
    "status": "Draft"
  }, {
    "id": 31,
    "assetName": "Ecolab - Hobart Washarm End Cap",
    "budget": 527,
    "estimatedTime": "6/17/2022",
    "progress": 34,
    "status": "In Progress"
  }, {
    "id": 32,
    "assetName": "Cheese Cheddar Processed",
    "budget": 652,
    "estimatedTime": "1/3/2023",
    "progress": 42,
    "status": "Draft"
  }, {
    "id": 33,
    "assetName": "Honey - Comb",
    "budget": 548,
    "estimatedTime": "1/13/2024",
    "progress": 47,
    "status": "Completed"
  }, {
    "id": 34,
    "assetName": "Soup Knorr Chili With Beans",
    "budget": 159,
    "estimatedTime": "1/27/2024",
    "progress": 88,
    "status": "In Progress"
  }, {
    "id": 35,
    "assetName": "Jagermeister",
    "budget": 527,
    "estimatedTime": "5/19/2022",
    "progress": 8,
    "status": "Action Required"
  }, {
    "id": 36,
    "assetName": "Asparagus - White, Canned",
    "budget": 550,
    "estimatedTime": "7/12/2024",
    "progress": 69,
    "status": "Completed"
  }, {
    "id": 37,
    "assetName": "Veal - Eye Of Round",
    "budget": 27,
    "estimatedTime": "9/18/2023",
    "progress": 63,
    "status": "Under Review"
  }, {
    "id": 38,
    "assetName": "Triple Sec - Mcguinness",
    "budget": 620,
    "estimatedTime": "6/27/2023",
    "progress": 43,
    "status": "Draft"
  }, {
    "id": 39,
    "assetName": "Daves Island Stinger",
    "budget": 651,
    "estimatedTime": "1/16/2023",
    "progress": 33,
    "status": "Under Review"
  }, {
    "id": 40,
    "assetName": "Catfish - Fillets",
    "budget": 580,
    "estimatedTime": "11/18/2023",
    "progress": 47,
    "status": "Under Review"
  }, {
    "id": 41,
    "assetName": "Turnip - Wax",
    "budget": 661,
    "estimatedTime": "7/21/2022",
    "progress": 34,
    "status": "Draft"
  }, {
    "id": 42,
    "assetName": "Coffee Cup 8oz 5338cd",
    "budget": 156,
    "estimatedTime": "9/16/2022",
    "progress": 5,
    "status": "Completed"
  }, {
    "id": 43,
    "assetName": "Veal - Striploin",
    "budget": 418,
    "estimatedTime": "4/27/2024",
    "progress": 38,
    "status": "Pending payment"
  }, {
    "id": 44,
    "assetName": "Beef Cheek Fresh",
    "budget": 19,
    "estimatedTime": "3/23/2022",
    "progress": 29,
    "status": "Pending payment"
  }, {
    "id": 45,
    "assetName": "Chicken - Wieners",
    "budget": 641,
    "estimatedTime": "3/7/2023",
    "progress": 97,
    "status": "Draft"
  }, {
    "id": 46,
    "assetName": "Bread - Pumpernickel",
    "budget": 410,
    "estimatedTime": "5/29/2023",
    "progress": 9,
    "status": "Action Required"
  }, {
    "id": 47,
    "assetName": "Wine - Magnotta - Cab Sauv",
    "budget": 375,
    "estimatedTime": "10/3/2022",
    "progress": 17,
    "status": "Under Review"
  }, {
    "id": 48,
    "assetName": "Truffle Cups - Red",
    "budget": 627,
    "estimatedTime": "8/8/2022",
    "progress": 58,
    "status": "Pending payment"
  }, {
    "id": 49,
    "assetName": "Food Colouring - Orange",
    "budget": 753,
    "estimatedTime": "9/7/2022",
    "progress": 23,
    "status": "Pending payment"
  }, {
    "id": 50,
    "assetName": "Vinegar - White Wine",
    "budget": 221,
    "estimatedTime": "3/23/2022",
    "progress": 26,
    "status": "Action Required"
  }, {
    "id": 51,
    "assetName": "Puree - Mocha",
    "budget": 637,
    "estimatedTime": "12/16/2023",
    "progress": 98,
    "status": "Pending payment"
  }, {
    "id": 52,
    "assetName": "Flour - Chickpea",
    "budget": 232,
    "estimatedTime": "5/14/2023",
    "progress": 61,
    "status": "In Progress"
  }, {
    "id": 53,
    "assetName": "Wine - Red, Marechal Foch",
    "budget": 511,
    "estimatedTime": "9/14/2024",
    "progress": 42,
    "status": "Action Required"
  }, {
    "id": 54,
    "assetName": "Wine - Red, Mosaic Zweigelt",
    "budget": 684,
    "estimatedTime": "5/16/2024",
    "progress": 47,
    "status": "Draft"
  }, {
    "id": 55,
    "assetName": "Dried Apple",
    "budget": 426,
    "estimatedTime": "9/28/2022",
    "progress": 51,
    "status": "Action Required"
  }, {
    "id": 56,
    "assetName": "Plate Foam Laminated 9in Blk",
    "budget": 798,
    "estimatedTime": "11/4/2023",
    "progress": 66,
    "status": "Action Required"
  }, {
    "id": 57,
    "assetName": "Appetizer - Mango Chevre",
    "budget": 285,
    "estimatedTime": "11/24/2022",
    "progress": 34,
    "status": "Pending payment"
  }, {
    "id": 58,
    "assetName": "Crab - Dungeness, Whole, live",
    "budget": 43,
    "estimatedTime": "4/14/2023",
    "progress": 81,
    "status": "Pending payment"
  }, {
    "id": 59,
    "assetName": "Wine - White, Antinore Orvieto",
    "budget": 808,
    "estimatedTime": "9/9/2023",
    "progress": 22,
    "status": "Action Required"
  }, {
    "id": 60,
    "assetName": "Oranges - Navel, 72",
    "budget": 685,
    "estimatedTime": "7/15/2024",
    "progress": 62,
    "status": "Draft"
  }, {
    "id": 61,
    "assetName": "Sugar - Cubes",
    "budget": 283,
    "estimatedTime": "4/9/2023",
    "progress": 83,
    "status": "Pending payment"
  }, {
    "id": 62,
    "assetName": "Apples - Spartan",
    "budget": 223,
    "estimatedTime": "1/25/2023",
    "progress": 1,
    "status": "Pending payment"
  }, {
    "id": 63,
    "assetName": "Burger Veggie",
    "budget": 210,
    "estimatedTime": "12/6/2023",
    "progress": 35,
    "status": "Under Review"
  }, {
    "id": 64,
    "assetName": "Beer - Sleemans Cream Ale",
    "budget": 750,
    "estimatedTime": "9/21/2023",
    "progress": 39,
    "status": "In Progress"
  }, {
    "id": 65,
    "assetName": "Sauce - Thousand Island",
    "budget": 978,
    "estimatedTime": "3/27/2022",
    "progress": 88,
    "status": "In Progress"
  }, {
    "id": 66,
    "assetName": "Sauce - White, Mix",
    "budget": 156,
    "estimatedTime": "6/14/2023",
    "progress": 97,
    "status": "In Progress"
  }, {
    "id": 67,
    "assetName": "Absolut Citron",
    "budget": 166,
    "estimatedTime": "10/21/2023",
    "progress": 68,
    "status": "Draft"
  }, {
    "id": 68,
    "assetName": "Garam Marsala",
    "budget": 763,
    "estimatedTime": "11/6/2024",
    "progress": 23,
    "status": "Under Review"
  }, {
    "id": 69,
    "assetName": "Beer - Camerons Auburn",
    "budget": 884,
    "estimatedTime": "7/26/2022",
    "progress": 11,
    "status": "Pending payment"
  }, {
    "id": 70,
    "assetName": "Energy Drink",
    "budget": 303,
    "estimatedTime": "4/22/2024",
    "progress": 84,
    "status": "Pending payment"
  }, {
    "id": 71,
    "assetName": "Cookies Oatmeal Raisin",
    "budget": 751,
    "estimatedTime": "12/15/2024",
    "progress": 34,
    "status": "Completed"
  }, {
    "id": 72,
    "assetName": "Potatoes - Pei 10 Oz",
    "budget": 433,
    "estimatedTime": "2/9/2023",
    "progress": 38,
    "status": "Under Review"
  }, {
    "id": 73,
    "assetName": "Cheese - Cream Cheese",
    "budget": 271,
    "estimatedTime": "10/7/2024",
    "progress": 47,
    "status": "Completed"
  }, {
    "id": 74,
    "assetName": "Sobe - Berry Energy",
    "budget": 612,
    "estimatedTime": "11/18/2024",
    "progress": 5,
    "status": "Action Required"
  }, {
    "id": 75,
    "assetName": "Bouillion - Fish",
    "budget": 754,
    "estimatedTime": "5/23/2022",
    "progress": 55,
    "status": "Action Required"
  }, {
    "id": 76,
    "assetName": "Flower - Carnations",
    "budget": 837,
    "estimatedTime": "3/21/2024",
    "progress": 87,
    "status": "In Progress"
  }, {
    "id": 77,
    "assetName": "Pork - European Side Bacon",
    "budget": 388,
    "estimatedTime": "8/22/2024",
    "progress": 76,
    "status": "Under Review"
  }, {
    "id": 78,
    "assetName": "Crush - Grape, 355 Ml",
    "budget": 715,
    "estimatedTime": "1/8/2023",
    "progress": 82,
    "status": "Under Review"
  }, {
    "id": 79,
    "assetName": "Wine - Masi Valpolocell",
    "budget": 340,
    "estimatedTime": "6/13/2023",
    "progress": 87,
    "status": "Pending payment"
  }, {
    "id": 80,
    "assetName": "Napkin - Beverge, White 2 - Ply",
    "budget": 100,
    "estimatedTime": "5/31/2022",
    "progress": 39,
    "status": "In Progress"
  }, {
    "id": 81,
    "assetName": "Wine - Chablis 2003 Champs",
    "budget": 635,
    "estimatedTime": "5/21/2022",
    "progress": 35,
    "status": "Completed"
  }, {
    "id": 82,
    "assetName": "Seabream Whole Farmed",
    "budget": 941,
    "estimatedTime": "6/8/2023",
    "progress": 21,
    "status": "Completed"
  }, {
    "id": 83,
    "assetName": "Raspberries - Frozen",
    "budget": 530,
    "estimatedTime": "4/29/2024",
    "progress": 58,
    "status": "Draft"
  }, {
    "id": 84,
    "assetName": "Chick Peas - Canned",
    "budget": 217,
    "estimatedTime": "5/18/2024",
    "progress": 39,
    "status": "Action Required"
  }, {
    "id": 85,
    "assetName": "Calypso - Black Cherry Lemonade",
    "budget": 321,
    "estimatedTime": "12/31/2022",
    "progress": 75,
    "status": "In Progress"
  }, {
    "id": 86,
    "assetName": "Cheese - Brie, Triple Creme",
    "budget": 433,
    "estimatedTime": "5/24/2024",
    "progress": 51,
    "status": "Draft"
  }, {
    "id": 87,
    "assetName": "Nut - Pumpkin Seeds",
    "budget": 658,
    "estimatedTime": "6/14/2022",
    "progress": 34,
    "status": "Completed"
  }, {
    "id": 88,
    "assetName": "Cheese - Gouda Smoked",
    "budget": 907,
    "estimatedTime": "7/17/2023",
    "progress": 43,
    "status": "Under Review"
  }, {
    "id": 89,
    "assetName": "Wine - Montecillo Rioja Crianza",
    "budget": 488,
    "estimatedTime": "11/10/2023",
    "progress": 86,
    "status": "Action Required"
  }, {
    "id": 90,
    "assetName": "Cheese - Comtomme",
    "budget": 527,
    "estimatedTime": "3/27/2024",
    "progress": 11,
    "status": "Under Review"
  }, {
    "id": 91,
    "assetName": "Water - Perrier",
    "budget": 286,
    "estimatedTime": "6/21/2024",
    "progress": 74,
    "status": "Pending payment"
  }, {
    "id": 92,
    "assetName": "Laundry - Bag Cloth",
    "budget": 353,
    "estimatedTime": "3/8/2024",
    "progress": 65,
    "status": "Under Review"
  }, {
    "id": 93,
    "assetName": "Chocolate - Pistoles, Lactee, Milk",
    "budget": 617,
    "estimatedTime": "8/6/2024",
    "progress": 38,
    "status": "In Progress"
  }, {
    "id": 94,
    "assetName": "Soup - Campbells Chicken",
    "budget": 606,
    "estimatedTime": "3/15/2024",
    "progress": 27,
    "status": "Action Required"
  }, {
    "id": 95,
    "assetName": "Syrup - Monin, Irish Cream",
    "budget": 645,
    "estimatedTime": "8/14/2024",
    "progress": 35,
    "status": "Action Required"
  }, {
    "id": 96,
    "assetName": "Filter - Coffee",
    "budget": 892,
    "estimatedTime": "9/28/2024",
    "progress": 32,
    "status": "Action Required"
  }, {
    "id": 97,
    "assetName": "Sobe - Lizard Fuel",
    "budget": 226,
    "estimatedTime": "2/17/2023",
    "progress": 68,
    "status": "In Progress"
  }, {
    "id": 98,
    "assetName": "Wine - White, Concha Y Toro",
    "budget": 78,
    "estimatedTime": "9/30/2022",
    "progress": 61,
    "status": "In Progress"
  }, {
    "id": 99,
    "assetName": "Lamb Rack - Ontario",
    "budget": 927,
    "estimatedTime": "6/8/2024",
    "progress": 4,
    "status": "Pending payment"
  }, {
    "id": 100,
    "assetName": "Coriander - Seed",
    "budget": 598,
    "estimatedTime": "1/9/2023",
    "progress": 79,
    "status": "Pending payment"
  }]
  

	const [pending, setPending] = useState(true);
	const [selectedRows, setSelectedRows] = React.useState([]);
	const [toggleCleared, setToggleCleared] = React.useState(false);
	const [data, setData] = React.useState([]);
  const [viewModal, setViewModal] = useState(false)
  const [image, setimage] = useState("")
  const [name, setname] = useState("")
  const [payment, setpayment] = useState(false)
  const [platform, setplatform] = useState("")
  const [date, setdate] = useState("")
  const [status, setstatus] = useState(0)
  const [filterText, setFilterText] = React.useState('');
	const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
  const [asset, setasset] = React.useState()

  const handleView =(row) => {
    console.log(row)
    setasset(row)
    setViewModal(true)
    setimage(row.image)
    setname(row.name)
    setpayment(row.payment)
    setplatform(row.platform)
    setdate(row.date)
    setstatus(row.status)
    console.log(viewModal)
  }
  const [assetList,setAssetList] = useState([])
	const filteredItems = data.filter(
		item => item.assetName && item.assetName.toLowerCase().includes(props.filterText.toLowerCase()),
	);

  const fetchAsset = async() =>{
    await axios.post('https://xrcdashboard.onrender.com/brands/assets',{
      brand:brand
    }).then(res =>{
      setData(res.data.assets)
  })
  }
  
	useEffect(() => {
    setPending(true)
    console.log(props.filterText)
    fetchAsset()
    console.log(data)
    console.log(filteredItems)
		const timeout = setTimeout(() => {
      setPending(false);
		}, 1000);
    data.map(r=>{
      if(r.status == "Pending Payment"){
        r['selected'] = true
      }
    })
		return () => clearTimeout(timeout);
	}, []);

  useEffect(()=>{
    console.log(data, filteredItems)
    setAssetList(filteredItems)
  },[data])

  const [filterState,setFilterState] = useState("all")

  const filteredItemsByState = data.filter(function(item) {
    return item.status == filterState });

  useEffect(() => {
    console.log("changed")
    if(filterState != "all"){
      setAssetList(filteredItemsByState)
    }else{
      setAssetList(data)
    }
  },[filterState])

  useEffect(()=>{
    setAssetList(filteredItems)
  },[props.filterText])


  const handleRowSelected = React.useCallback(state => {
    		setSelectedRows(state.selectedRows);
    }, []);

  // const ale = (a,row) => {
  //     const swalWithBootstrapButtons = Swal.mixin({
  //       customClass: {
  //         confirmButton: 'btn btn-success',
  //         cancelButton: 'btn btn-danger',
  //       },
  //       buttonsStyling: true,
  //     })
  
  //     swalWithBootstrapButtons
  //       .fire({
  //         title: 'Are you sure?',
  //         text: `You want to delete this `,
  //         icon: 'warning',
  //         showCancelButton: true,
  //         confirmButtonText: 'Yes',
  //         cancelButtonText: 'No, cancel!',
  //         reverseButtons: true,
  //       })
  //       .then(async(result) => {
  //         if (result.isConfirmed) {
  //           var name = []
  //           selectedRows.map(row => {
  //             name.push(row.assetName)
  //           })
  //           console.log({
  //             brand:brand,
  //             name:[row.assetName]
  //           })
  //           await axios.delete("http://localhost:5000/brands/delete",{data:{
  //             brand:brand,
  //             name:[row.assetName]
  //           }}).then(res => {
  //             setPending(true)
  //             fetchAsset()
  //             setAssetList(filteredItems)
  //             const timeout = setTimeout(() => {
  //               setPending(false);
  //             }, 1000);
  //             swalWithBootstrapButtons.fire('Deleted!', 'Your file has been deleted.', 'success')
  //             return () => clearTimeout(timeout);
  //           }).catch(()=>alert('Something Went Wrong'))

  //           setData(differenceBy(data, [row], 'id'));
  //           swalWithBootstrapButtons.fire('Deleted!', 'Your file has been deleted.', 'success')
  //         } else if (
  //           /* Read more about handling dismissals below */
  //           result.dismiss === Swal.DismissReason.cancel
  //         ) {
  //           this.successalt('error', 'Cancelled')
  //         }
  //       })
  //   }

  const update = (values) => {
    const successalt = (a, x) => {
      Swal.fire({
        position: 'center',
        icon: a,
        title: x,
        showConfirmButton: false,
        timer: 1500,
      })
    }
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: true,
    })

    swalWithBootstrapButtons
      .fire({
        title: 'Are you sure?',
        text: `You want to Update this `,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true,
      })
      .then(async(result) => {
        if (result.isConfirmed) {
          console.log({...values,name:asset.assetName,brand:data.brandName})
          axios.post("https://xrcdashboard.onrender.com/admin/update", 
                    {...values,name:asset.assetName,brand:asset.brandName}).then(res=>{
                      setPending(true)
                      fetchAsset()
                      setAssetList(filteredItems)
                      setPending(false);
                      // const timeout = setTimeout(() => {
                      //   setPending(false);
                      // }, 1000);
                      swalWithBootstrapButtons.fire('Update!', 'Asset has been Updated.', 'success')
                      setViewModal(false);
                      // return () => clearTimeout(timeout);
                  }).catch((e)=>alert(e))
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          successalt('error', 'Cancelled')
        }
      })
  }

  // const handleDelete = (row) => {
  //   console.log("elo")
  //   ale("Delete",row)
  // }
  
  const TextField = styled.input`
	height: 32px;
	width: 200px;
	border-radius: 3px;
	border-top-left-radius: 5px;
	border-bottom-left-radius: 5px;
	border-top-right-radius: 0;
	border-bottom-right-radius: 0;
	border: 1px solid #e5e5e5;
	padding: 0 32px 0 16px;

	&:hover {
		cursor: pointer;
	}
`;

const ClearButton = styled(Button)`
	border-top-left-radius: 0;
	border-bottom-left-radius: 0;
	border-top-right-radius: 5px;
	border-bottom-right-radius: 5px;
	height: 34px;
	width: 32px;
	text-align: center;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const FilterComponent = ({ filterText, onFilter, onClear }) => (
    	<>
    		<TextField
    			id="search"
    			type="text"
    			placeholder="Filter By Name"
    			aria-label="Search Input"
    			value={filterText}
    			onChange={onFilter}
    		/>
    		<ClearButton type="button" onClick={onClear}>
    			X
    		</ClearButton>
    	</>
    );
  // const contextActions = React.useMemo(() => {
    		
  //       var price = 0;
  //       selectedRows.map(r=>{
  //         if(Number(r.budget)){
  //           price += r.budget
  //         }
  //       })
  //   		return (
  //         <>
  //         <div>
  //         <h6 className='p-4 h-100' >${price}</h6>
  //         </div>
  //         <IoBagCheckOutline onClick={() => handlePayTotal(price)} />
  //         <FaTrashAlt key="delete" onClick={handleDelete} className="m-4" icon/>
  //         </>
  //   		);
  //   	}, [data, selectedRows, toggleCleared]);
      // const handleDeleteAll = () => {
      //   const swalWithBootstrapButtons = Swal.mixin({
      //     customClass: {
      //       confirmButton: 'btn btn-success',
      //       cancelButton: 'btn btn-danger',
      //     },
      //     buttonsStyling: true,
      //   })

      //   swalWithBootstrapButtons
      // .fire({
      //   title: 'Are you sure?',
      //   text: `Are you sure you want to delete:\r ${selectedRows.map(r => r.name)}?`,
      //   icon: 'warning',
      //   showCancelButton: true,
      //   confirmButtonText: 'Yes',
      //   cancelButtonText: 'No, cancel!',
      //   reverseButtons: true,
      // })
      // .then(async(result) => {
      //   if (result.isConfirmed) {
      //     setToggleCleared(!toggleCleared);
      //     var name = []
      //     selectedRows.map(row => {
      //       name.push(row.assetName)
      //     })
      //     console.log({
      //       brand:"Zara",
      //       name:name
      //     })
      //     await axios.delete("http://localhost:5000/brands/delete",{data:{
      //       brand:"Zara",
      //       name:name
      //     }}).then(res => {
      //       setPending(true)
      //       fetchAsset()
      //       setAssetList(filteredItems)
      //       const timeout = setTimeout(() => {
      //         setPending(false);
      //       }, 1000);
      //       swalWithBootstrapButtons.fire('Deleted!', 'Your file has been deleted.', 'success')
      //       return () => clearTimeout(timeout);
      //     }).catch(()=>alert('Something Went Wrong'))

          
      //   } else if (
      //     /* Read more about handling dismissals below */
      //     result.dismiss === Swal.DismissReason.cancel
      //   ) {
      //     this.successalt('error', 'Cancelled')
      //   }
      // })
      // };


      const [pageToggle, setPageToggle] = useState(true)

      const [files,setfiles] = useState({
        'zepeto': null,
        'sandbox': null,
        'clonex': null,
        'snapchat': null,
        'decentraland': null
      })
      const updateFiles = (formdata) => {

        const successalt = (a, x) => {
          Swal.fire({
            position: 'center',
            icon: a,
            title: x,
            showConfirmButton: false,
            timer: 1500,
          })
        }
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger',
          },
          buttonsStyling: true,
        })
    
        swalWithBootstrapButtons
          .fire({
            title: 'Are you sure?',
            text: `You want to Upload this files`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true,
          })
          .then(async(result) => {
            if (result.isConfirmed) {
              let formdata = new FormData()
              formdata.append('name',asset.assetName)
              formdata.append('brand',asset.brandName)
              formdata.append('platform',asset.platform)
              asset.platform.map((p)=>{
                console.log(files[p])
                formdata.append('assets',files[p])
              })
              await axios.post("http://localhost:5000/admin/upload",formdata).then(res=>{
                          setPending(true)
                          fetchAsset()
                          setAssetList(filteredItems)
                          setPending(false);
                          swalWithBootstrapButtons.fire('Updated!', 'Asset has been Updated.', 'success')
                          setViewModal(false);
                      }).catch((e)=>alert(e))
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              successalt('error', 'Cancelled')
            }
          })
      }
      const handleUpload = async() => {
        console.log(files)
        let formdata = new FormData()
        formdata.append('name',asset.assetName)
        formdata.append('brand',asset.brandName)
        formdata.append('platform',asset.platform)
        asset.platform.map((p)=>{
          console.log(files[p])
          formdata.append('assets',files[p])
        })
        await axios.post("http://localhost:5000/admin/upload",formdata).then(res => {
          
        })
        console.log([...formdata])
      }

    return (
      <div className='p-2 mb-4' style={{zIndex:"-5"}}>
      <h1 style={{color:"white"}}>All Assets - Brand Name</h1>
      <div className='tabs-container'>
      <div className='tabs-menu'>
        <button className={filterState=="all" ?"active-filter":""} onClick={()=>setFilterState("all")} >All</button>
        <button className={filterState=="Draft" ?"active-filter":""} onClick={()=>setFilterState("Draft")} >Draft</button>
        <button className={filterState=="Under Review" ?"active-filter":""} onClick={()=>setFilterState("Under Review")}>Under Review</button>
        <button className={filterState=="Action Required" ?"active-filter":""} onClick={()=>setFilterState("Action Required")}>Action Required</button>
        <button className={filterState=="Pending payment" ?"active-filter":""} onClick={()=>setFilterState("Pending payment")}>Payment Pendiing</button>
        <button className={filterState=="In Progress" ?"active-filter":""} onClick={()=>setFilterState("In Progress")}>In Progress</button>
        <button className={filterState=="Completed" ?"active-filter":""} onClick={()=>setFilterState("Completed")}>Completed</button>
      </div>
      </div>
    <div className='tables mt-4' style={{position:"relative"}}>
        <DataTable 
        columns={columns} 
        className='data-table'
        data={assetList} 
        // selectableRows
        // contextActions={contextActions}
        // onSelectedRowsChange={handleRowSelected}
        progressPending={pending}
        paginationPerPage={5}
        paginationRowsPerPageOptions={[5,10, 25, 50, 100]}
        paginationResetDefaultPage={resetPaginationToggle}
			  // clearSelectedRows={toggleCleared}
        pagination
        // selectableRowDisabled={rowDisabledCriteria}
        // persistTableHead
        progressComponent={
          <CustomLoader />
        }
        // conditionalRowStyles={conditionalRowStyles}
         />
    </div>
    {/* {selectedRows.length > 0 && <button className='btn btn-primary m-4' style={{float:"right",marginBottom:"150px", zIndex:"1000000000"}} onClick={e=>alert("Pay")}> Pay
    </button>}
    {selectedRows.length > 0 && <button className='btn btn-danger m-4' style={{float:"right",marginBottom:"150px", zIndex:"1000000000"}} onClick={e=>handleDeleteAll()}> Delete
    </button>} */}
    <Modal
        size="lg"
        show={viewModal}
        onHide={() => setViewModal(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg text-white">
            Asset Name
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <div className='row'>
            <div className='col-md-6'>
            <img src={image} alt="image" style={{width:"80%", height:"auto"}} />
            </div>
            <div className='col-md-6'>
              <div className='row'><div className='col-md-6'>Name - </div><div className='col-md-6'>{name}</div></div>
              <div className='row'><div className='col-md-6'>Payment - </div><div className='col-md-6'>{payment ? "Paid" : "Not Paid"}</div></div>
              <div className='row'><div className='col-md-6'>Platform - </div><div className='col-md-6'>{platform}</div></div>
              <div className='row'><div className='col-md-6'>EDD - </div><div className='col-md-6'>{date}</div></div>
              <div className='row'><div className='col-md-6'>Progress - </div><div className='col-md-6'><ProgressBar1
                width="100px"
                height="8px"
                rect
                fontColor="gray"
                percentage={status}
                rectPadding="1px"
                rectBorderRadius="15px"
                trackPathColor="transparent"
                bgColor="#333333"
                trackBorderColor="grey"
              /></div></div>
            </div>
          </div> */}
           <div>
          <div className='d-flex justify-content-evenly' style={{ background: "black" }}>
            <div onClick={() => setPageToggle(true)} className='text-white' style={{ textDecoration: pageToggle ? "underline blueviolet" : "none", cursor: "pointer", padding: "1rem 2rem" }}><h3>Update Information</h3></div>
            <div onClick={() => setPageToggle(false)} className='text-white' style={{ textDecoration: pageToggle ? "none" : "underline blueviolet", cursor: "pointer", padding: "1rem 2rem" }}><h3>Upload 3D Assets</h3></div>
          </div>
          {pageToggle ?
                <div className="d-flex flex-column m-5 ">
                <Formik
                  initialValues={{ date:null,status:null,budget:null,progress:null }}
                  // validate={(values) => {
                  //   const errors = {};
                  //   if (!values.email) {
                  //     errors.email = "Required";
                  //   } else if (
                  //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                  //   ) {
                  //     errors.email = "Invalid email address";
                  //   }
                  //   return errors;
                  // }}
                  onSubmit={(values, { setSubmitting }) => {
                    console.log(values,asset)
                    update(values)
                  }}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    /* and other goodies */
                  }) => (
                    <form onSubmit={handleSubmit}>
                      <div className="m-3">
                        <label className="d-flex align-items-center">
                          <span>
                            <h4 className="m-0" style={{ width: "10rem",color:"white" }}>
                              {" "}
                              Date:{" "}
                            </h4>
                          </span>{" "}
                          &nbsp; &nbsp;
                          {/* <input className='input-style' type="date" name="name" onChange={""} /> */}
                          <input
                            class="form-control form-control-lg"
                            type="date"
                            placeholder=".form-control-lg"
                            aria-label=""
                            name="date"
                            value={values.date}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {/* <p className='text-danger' style={{ marginLeft: "1rem", marginBottom: "0rem" }}>{""}</p> */}
                        </label>
                      </div>
          
                      <div className="m-3">
                        <label className="d-flex align-items-center">
                          <span>
                            <h4 className="m-0" style={{ width: "10rem",color:"white" }}>
                              {" "}
                              Status:{" "}
                            </h4>
                          </span>{" "}
                          &nbsp; &nbsp;
                          {/* <input className='input-style' type="text" name="name" onChange={""} /> */}
                          <select
                            class="form-select form-select-lg mb-3"
                            aria-label=".form-select-lg example"
                            name="status"
                            value={values.status}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          >
                            <option selected>Select the status</option>
                            <option value="Under Review">Under Review</option>
                            <option value="Action Required">Action Required</option>
                            <option value="Pending payment">Pending payment</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                          </select>
                          {/* <p className='text-danger' style={{ marginLeft: "1rem", marginBottom: "0rem" }}>{""}</p> */}
                        </label>
                      </div>
          
                      <div className="m-3">
                        <label className="d-flex align-items-center">
                          <span>
                            <h4 className="m-0" style={{ width: "10rem",color:"white" }}>
                              {" "}
                              Budget:{" "}
                            </h4>
                          </span>{" "}
                          &nbsp; &nbsp;
                          {/* <input className='input-style' type="number" name="name" onChange={""} /> */}
                          <input
                            class="form-control form-control-lg"
                            type="number"
                            aria-label=""
                            name="budget"
                            value={values.budget}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {/* <p className='text-danger' style={{ marginLeft: "1rem", marginBottom: "0rem" }}>{""}</p> */}
                        </label>
                      </div>
          
                      <div className="m-3">
                        <label className="d-flex align-items-center">
                          <span>
                            <h4 className="m-0" style={{ width: "10rem",color:"white" }}>
                              {" "}
                              Progress:{" "}
                            </h4>
                          </span>{" "}
                          &nbsp; &nbsp;
                          <input
                            class="form-control form-control-lg"
                            type="number"
                            aria-label=""
                            name="progress"
                            value={values.progress}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {/* <input className='input-style' type="number" name="name" onChange={""} /> */}
                          {/* <p className='text-danger' style={{ marginLeft: "1rem", marginBottom: "0rem" }}>{""}</p> */}
                        </label>
                      </div>
                      <div className="m-3 d-flex align-items-center justify-content-center">
                        <button
                          type="submit"
                          disabled={pending}
                          className="btn form-submit mt-4 text-center"
                          style={{
                            marginRight: "1rem",
                            background: "black",
                            color: "white",
                          }}
                        >
                         {pending ? 'Update' : "Loading"}
                        </button>
                      </div>
                    </form>
                  )}
                </Formik>
              </div>
            :
            <div className='d-flex flex-column m-5 '>
            {asset.platform.map((i)=>(
              <div className='m-3'>
              <label className='d-flex align-items-center'>
                <span><h4 className='m-0 text-white' style={{ width: "15rem" }}> {i.toLocaleUpperCase()}: </h4></span> &nbsp; &nbsp;
                 <input class="form-control form-control-lg" id="formFileLg" type="file" value={files[i]} onChange={e=>files[i] = e.target.files[0]}/>
                {/* <p className='text-danger' style={{ marginLeft: "1rem", marginBottom: "0rem" }}>{""}</p> */}
              </label>
            </div>
            ))}
            
            <div className='m-3 d-flex align-items-center justify-content-center'>
              <button type="submit" className="btn form-submit mt-4 text-center" style={{ marginRight: "1rem", background: "black", color: "white" }} onClick={updateFiles}>Upload</button>
            </div>
      
      
          </div>
          }
        </div>
          {/* <AdminPage data={asset} /> */}
        </Modal.Body>
      </Modal>
    </div>)
};
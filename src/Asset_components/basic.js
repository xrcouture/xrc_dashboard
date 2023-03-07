// import DataTable from 'react-data-table-component';
import DataTable from './DataTable'
import image from './asset-1.png'
import React,{ useEffect,useState,CSSProperties } from 'react';
import FilterComponent from 'react-data-table-component-with-filter';
// import DataTable from 'react-data-table-component';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { Audio } from 'react-loader-spinner'
import differenceBy from 'lodash/differenceBy'
import { Button } from 'react-bootstrap';
import ListPage from '../components/common/ListPage';
import {IoCheckmarkDoneCircle} from 'react-icons/io5'
import {FaTrashAlt} from 'react-icons/fa'
import {IoBagCheckOutline} from 'react-icons/io5'
import {ImCross} from 'react-icons/im'
import {CiViewBoard} from 'react-icons/ci'
import Swal from 'sweetalert2'
import Modal from 'react-bootstrap/Modal';
import ProgressBar1 from 'react-animated-progress-bar';
import styled, { keyframes } from 'styled-components'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { faker } from '@faker-js/faker';
import axios from 'axios';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
// A super simple expandable component.

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
export default function MyComponent() {


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
            {row.thumbnail && (row.thumbnail != "") ? <img src={row.thumbnail} style={{width:"100px",height:"100px"}}/> : 
            <div style={{height:"100px", width:"100px", backgroundColor:"black",alignSelf:"center", justifySelf:"center",fontSize:"80px",fontWeight:"bolder",color:"gray", textAlign:"center"}}>{row.assetName.split(" ").slice(0,1).map((n)=>n[0]).join("").toUpperCase()}</div>
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
          selector: 'budget',
          sortable:true,
          cell:(row)=>(
            <>
            {
              row.status != "Under Review" ?<h6>{row.budget}</h6> : <h6>---</h6>
            }
            
            </>
          )
      },
      {
          name: 'EDD',
          selector: 'estimatedTime',
          sortable:true,
          cell:(row)=>(
            <>
            {
              row.status != "Under Review" ?<h6>{row.estimatedTime}</h6> : <h6>---</h6>
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
          {(row.status == "Under Review") ?
            <p className='text-primary'>Under Review</p> : (row.status == "Pending payment") ? <p className='text-danger'>Pending Payment</p> : <p className='text-success'>Paid</p>
          }
          </>
        )
      },
      // {
      //     name: 'Action Needed',
      //     selector: row => (
      //       row.payment ?
      //         <button className='btn btn-success' disabled>
      //           Paid
      //         </button>:
      //         <button className='btn btn-danger' onClick={()=>handlePay(row)}>Pay</button>
      //   ),
      //     sortable:true,
      //     sortType:'basic'
      // },
      // {
      //     name: 'Update',
      //     selector: row => (
      //       row.status < 100 ?
      //       <i class="fa fa-pencil-square-o" style={{fontSize:"20px"}} aria-hidden="true" onClick={() => console.log(row)}></i>:
      //       <i class="fa fa-pencil-square-o" style={{fontSize:"20px"}} aria-hidden="true" ></i>
      //   ),
      // },
      // {
      //     name: 'Delete',
      //     selector: row => (
      //       row.payment ?
      //       <i class="fa fa-ban" style={{fontSize:"20px"}} aria-hidden="true"></i>:
      //       <i class="fa fa-trash-o" aria-hidden="true" style={{fontSize:"20px"}} onClick={()=>handleDelete(row)}></i>
      //   ),
      // },
      // {
      //     name: 'View',
      //     selector: row => (
      //       <i class="fa fa-eye" aria-hidden="true"style={{fontSize:"20px"}} onClick={() => handleView(row)}></i>
      //   ),
      // },
      {
          name: 'Feedback',
          selector: row => (
            row.status < 100 ?
            <div style={{padding:"5px"}}>
              <i class="far fa-comment-alt" style={{fontSize:"20px"}} aria-hidden="true"></i>
            </div> :  <i class="far fa-comment-alt" style={{fontSize:"20px"}} aria-hidden="true"></i>
        ),
      },
  ];
  const d = [{
    "id": 1,
    "name": "Dal Creedland",
    "price": 36,
    "platform": "Monahan-Padberg",
    "status": 80,
    "payment": false,
    "date": "24/01/2024"
  }]
const l = [
    // {
  //   "id": 2,
  //   "name": "Andeee Weedon",
  //   "price": 44,
  //   "platform": "Lakin and Sons",
  //   "status": 57,
  //   "payment": true,
  //   "date": "16/03/2023"
  // }, {
  //   "id": 3,
  //   "name": "Marlon Cordel",
  //   "price": 77,
  //   "platform": "Padberg-Ratke",
  //   "status": 31,
  //   "payment": false,
  //   "date": "28/03/2024"
  // }, {
  //   "id": 4,
  //   "name": "Ramon Deluce",
  //   "price": 12,
  //   "platform": "Runolfsdottir, Hintz and Tremblay",
  //   "status": 9,
  //   "payment": false,
  //   "date": "13/07/2023"
  // }, {
  //   "id": 5,
  //   "name": "Albertina Glascott",
  //   "price": 87,
  //   "platform": "Nikolaus Group",
  //   "status": 4,
  //   "payment": false,
  //   "date": "03/08/2023"
  // }, {
  //   "id": 6,
  //   "name": "Katharine Paulich",
  //   "price": 31,
  //   "platform": "Hintz, O'Keefe and Mohr",
  //   "status": 92,
  //   "payment": false,
  //   "date": "26/05/2023"
  // }, {
  //   "id": 7,
  //   "name": "Kenny Hum",
  //   "price": 32,
  //   "platform": "Aufderhar Group",
  //   "status": 14,
  //   "payment": true,
  //   "date": "12/12/2023"
  // }, {
  //   "id": 8,
  //   "name": "Fancy Money",
  //   "price": 92,
  //   "platform": "Cremin, Sawayn and Ernser",
  //   "status": 87,
  //   "payment": false,
  //   "date": "21/06/2023"
  // }, {
  //   "id": 9,
  //   "name": "Hildagarde Stapele",
  //   "price": 93,
  //   "platform": "Goodwin LLC",
  //   "status": 75,
  //   "payment": false,
  //   "date": "24/04/2024"
  // }, {
  //   "id": 10,
  //   "name": "Yankee McCarthy",
  //   "price": 78,
  //   "platform": "Ratke, Kerluke and Hamill",
  //   "status": 89,
  //   "payment": false,
  //   "date": "26/03/2024"
  // }, {
  //   "id": 11,
  //   "name": "Cathee Lipson",
  //   "price": 65,
  //   "platform": "Kutch, Roob and Hickle",
  //   "status": 33,
  //   "payment": true,
  //   "date": "03/05/2023"
  // }, {
  //   "id": 12,
  //   "name": "Kaine Bolderson",
  //   "price": 28,
  //   "platform": "Murray Group",
  //   "status": 99,
  //   "payment": true,
  //   "date": "12/07/2023"
  // }, {
  //   "id": 13,
  //   "name": "Adrianna Radwell",
  //   "price": 11,
  //   "platform": "Greenholt, Barton and Boyle",
  //   "status": 62,
  //   "payment": true,
  //   "date": "09/01/2024"
  // }, {
  //   "id": 14,
  //   "name": "Gabi Paybody",
  //   "price": 45,
  //   "platform": "Romaguera-Rath",
  //   "status": 31,
  //   "payment": true,
  //   "date": "26/06/2023"
  // }, {
  //   "id": 15,
  //   "name": "Claudius Rivenzon",
  //   "price": 76,
  //   "platform": "Rogahn, Pfannerstill and Rath",
  //   "status": 75,
  //   "payment": false,
  //   "date": "20/04/2023"
  // }, {
  //   "id": 16,
  //   "name": "Fin Bakhrushin",
  //   "price": 92,
  //   "platform": "Lind, Cummerata and Turner",
  //   "status": 14,
  //   "payment": false,
  //   "date": "17/07/2023"
  // }, {
  //   "id": 17,
  //   "name": "Sherri Fassam",
  //   "price": 55,
  //   "platform": "Lueilwitz, Bartell and Senger",
  //   "status": 14,
  //   "payment": true,
  //   "date": "10/12/2023"
  // }, {
  //   "id": 18,
  //   "name": "Anitra Hintze",
  //   "price": 93,
  //   "platform": "Schuppe Inc",
  //   "status": 83,
  //   "payment": true,
  //   "date": "09/02/2024"
  // }, {
  //   "id": 19,
  //   "name": "Gale Meier",
  //   "price": 74,
  //   "platform": "Lemke, Deckow and Gutkowski",
  //   "status": 75,
  //   "payment": true,
  //   "date": "24/03/2024"
  // }, {
  //   "id": 20,
  //   "name": "Allis Bretland",
  //   "price": 34,
  //   "platform": "Kihn-Franecki",
  //   "status": 40,
  //   "payment": true,
  //   "date": "26/08/2023"
  // }, {
  //   "id": 21,
  //   "name": "Parnell Wealleans",
  //   "price": 66,
  //   "platform": "Glover-Kessler",
  //   "status": 36,
  //   "payment": false,
  //   "date": "13/07/2023"
  // }, {
  //   "id": 22,
  //   "name": "Pietrek Stather",
  //   "price": 92,
  //   "platform": "Grimes LLC",
  //   "status": 80,
  //   "payment": true,
  //   "date": "14/08/2023"
  // }, {
  //   "id": 23,
  //   "name": "Tammy Viger",
  //   "price": 99,
  //   "platform": "Crona LLC",
  //   "status": 69,
  //   "payment": true,
  //   "date": "19/05/2023"
  // }, {
  //   "id": 24,
  //   "name": "Bianca Sondland",
  //   "price": 74,
  //   "platform": "Bashirian-Leuschke",
  //   "status": 74,
  //   "payment": true,
  //   "date": "15/10/2023"
  // }, {
  //   "id": 25,
  //   "name": "Shaylynn Kermit",
  //   "price": 75,
  //   "platform": "Lehner, Ward and Harber",
  //   "status": 35,
  //   "payment": false,
  //   "date": "31/08/2023"
  // }, {
  //   "id": 26,
  //   "name": "Asher Delcastel",
  //   "price": 57,
  //   "platform": "Hartmann-Torphy",
  //   "status": 41,
  //   "payment": true,
  //   "date": "30/07/2023"
  // }, {
  //   "id": 27,
  //   "name": "Vally Delamere",
  //   "price": 22,
  //   "platform": "Mann LLC",
  //   "status": 74,
  //   "payment": true,
  //   "date": "22/05/2023"
  // }, {
  //   "id": 28,
  //   "name": "Hewie Pawelek",
  //   "price": 76,
  //   "platform": "Klein-Runte",
  //   "status": 10,
  //   "payment": false,
  //   "date": "25/03/2023"
  // }, {
  //   "id": 29,
  //   "name": "Arlina Castiglio",
  //   "price": 78,
  //   "platform": "Bednar-Halvorson",
  //   "status": 12,
  //   "payment": true,
  //   "date": "02/05/2024"
  // }, {
  //   "id": 30,
  //   "name": "Darby Weakley",
  //   "price": 73,
  //   "platform": "Streich, Bogisich and Lindgren",
  //   "status": 94,
  //   "payment": false,
  //   "date": "03/04/2024"
  // }, {
  //   "id": 31,
  //   "name": "Kyle Duquesnay",
  //   "price": 72,
  //   "platform": "Jacobs, Marquardt and Dickinson",
  //   "status": 4,
  //   "payment": true,
  //   "date": "01/09/2023"
  // }, {
  //   "id": 32,
  //   "name": "Pegeen Depke",
  //   "price": 25,
  //   "platform": "Russel-Johns",
  //   "status": 51,
  //   "payment": true,
  //   "date": "31/03/2024"
  // }, {
  //   "id": 33,
  //   "name": "Ethelred Dedman",
  //   "price": 29,
  //   "platform": "Olson Group",
  //   "status": 96,
  //   "payment": true,
  //   "date": "25/03/2024"
  // }, {
  //   "id": 34,
  //   "name": "Corinne Goodson",
  //   "price": 55,
  //   "platform": "Deckow LLC",
  //   "status": 32,
  //   "payment": false,
  //   "date": "09/09/2023"
  // }, {
  //   "id": 35,
  //   "name": "Philip Wrefford",
  //   "price": 84,
  //   "platform": "Williamson and Sons",
  //   "status": 74,
  //   "payment": false,
  //   "date": "19/06/2023"
  // }, {
  //   "id": 36,
  //   "name": "Udell Borland",
  //   "price": 88,
  //   "platform": "Ferry, Prosacco and Rowe",
  //   "status": 89,
  //   "payment": false,
  //   "date": "31/03/2024"
  // }, {
  //   "id": 37,
  //   "name": "Deonne Kilmary",
  //   "price": 43,
  //   "platform": "Dickens-Kub",
  //   "status": 38,
  //   "payment": false,
  //   "date": "19/04/2023"
  // }, {
  //   "id": 38,
  //   "name": "Nicola Hughf",
  //   "price": 69,
  //   "platform": "Bednar Inc",
  //   "status": 90,
  //   "payment": true,
  //   "date": "02/05/2024"
  // }, {
  //   "id": 39,
  //   "name": "Renae Tomasik",
  //   "price": 64,
  //   "platform": "Medhurst and Sons",
  //   "status": 51,
  //   "payment": true,
  //   "date": "18/01/2024"
  // }, {
  //   "id": 40,
  //   "name": "Gabie Ector",
  //   "price": 24,
  //   "platform": "Funk-Reynolds",
  //   "status": 8,
  //   "payment": false,
  //   "date": "27/02/2024"
  // }, {
  //   "id": 41,
  //   "name": "Patten Vasishchev",
  //   "price": 56,
  //   "platform": "Wolff-Lindgren",
  //   "status": 81,
  //   "payment": false,
  //   "date": "14/03/2024"
  // }, {
  //   "id": 42,
  //   "name": "Mirabella Blazy",
  //   "price": 34,
  //   "platform": "Dickens-Keebler",
  //   "status": 62,
  //   "payment": true,
  //   "date": "29/12/2023"
  // }, {
  //   "id": 43,
  //   "name": "Aymer Rabier",
  //   "price": 79,
  //   "platform": "Pfeffer, Koch and Braun",
  //   "status": 96,
  //   "payment": true,
  //   "date": "23/04/2023"
  // }, {
  //   "id": 44,
  //   "name": "Wood Van der Daal",
  //   "price": 67,
  //   "platform": "Koss LLC",
  //   "status": 85,
  //   "payment": true,
  //   "date": "11/05/2023"
  // }, {
  //   "id": 45,
  //   "name": "Teddi Sancias",
  //   "price": 32,
  //   "platform": "Halvorson, McClure and Robel",
  //   "status": 41,
  //   "payment": true,
  //   "date": "23/11/2023"
  // }, {
  //   "id": 46,
  //   "name": "Evonne Skellon",
  //   "price": 24,
  //   "platform": "Romaguera and Sons",
  //   "status": 32,
  //   "payment": true,
  //   "date": "02/03/2024"
  // }, {
  //   "id": 47,
  //   "name": "Sergent Reedy",
  //   "price": 44,
  //   "platform": "MacGyver-Stamm",
  //   "status": 29,
  //   "payment": false,
  //   "date": "09/05/2024"
  // }, {
  //   "id": 48,
  //   "name": "Vanna Drains",
  //   "price": 19,
  //   "platform": "Hickle, Shanahan and Bailey",
  //   "status": 59,
  //   "payment": false,
  //   "date": "25/12/2023"
  // }, {
  //   "id": 49,
  //   "name": "Saunders Greetham",
  //   "price": 84,
  //   "platform": "Deckow-Dickinson",
  //   "status": 44,
  //   "payment": false,
  //   "date": "09/01/2024"
  // }, {
  //   "id": 50,
  //   "name": "Deb Hubbock",
  //   "price": 74,
  //   "platform": "Wolff, Luettgen and Dicki",
  //   "status": 25,
  //   "payment": false,
  //   "date": "20/09/2023"
  // }, {
  //   "id": 51,
  //   "name": "Aldrich Patriche",
  //   "price": 64,
  //   "platform": "Schamberger Group",
  //   "status": 20,
  //   "payment": true,
  //   "date": "23/04/2023"
  // }, {
  //   "id": 52,
  //   "name": "Hernando Lothlorien",
  //   "price": 86,
  //   "platform": "Koepp, Satterfield and McCullough",
  //   "status": 51,
  //   "payment": false,
  //   "date": "13/08/2023"
  // }, {
  //   "id": 53,
  //   "name": "Helli Munkley",
  //   "price": 58,
  //   "platform": "Schmidt, Terry and Leffler",
  //   "status": 1,
  //   "payment": true,
  //   "date": "23/06/2023"
  // }, {
  //   "id": 54,
  //   "name": "Glynn Babon",
  //   "price": 86,
  //   "platform": "Goldner, Buckridge and Legros",
  //   "status": 98,
  //   "payment": true,
  //   "date": "15/03/2023"
  // }, {
  //   "id": 55,
  //   "name": "Othello Andersch",
  //   "price": 50,
  //   "platform": "Schinner-Kiehn",
  //   "status": 95,
  //   "payment": false,
  //   "date": "09/03/2024"
  // }, {
  //   "id": 56,
  //   "name": "Claybourne Jakoubec",
  //   "price": 11,
  //   "platform": "Larkin Group",
  //   "status": 9,
  //   "payment": false,
  //   "date": "09/10/2023"
  // }, {
  //   "id": 57,
  //   "name": "Garnette Pietersma",
  //   "price": 90,
  //   "platform": "Sawayn-Oberbrunner",
  //   "status": 56,
  //   "payment": true,
  //   "date": "20/08/2023"
  // }, {
  //   "id": 58,
  //   "name": "Bettine Piesold",
  //   "price": 10,
  //   "platform": "VonRueden LLC",
  //   "status": 20,
  //   "payment": true,
  //   "date": "22/02/2024"
  // }, {
  //   "id": 59,
  //   "name": "Coop Cordeux",
  //   "price": 56,
  //   "platform": "Heidenreich and Sons",
  //   "status": 2,
  //   "payment": true,
  //   "date": "05/10/2023"
  // }, {
  //   "id": 60,
  //   "name": "Deborah Oda",
  //   "price": 44,
  //   "platform": "Lockman Inc",
  //   "status": 87,
  //   "payment": false,
  //   "date": "23/04/2023"
  // }, {
  //   "id": 61,
  //   "name": "Letti Mellor",
  //   "price": 89,
  //   "platform": "Huels, Nitzsche and Bradtke",
  //   "status": 40,
  //   "payment": true,
  //   "date": "27/05/2024"
  // }, {
  //   "id": 62,
  //   "name": "Raquela Swinerd",
  //   "price": 51,
  //   "platform": "Mayert-Lehner",
  //   "status": 46,
  //   "payment": true,
  //   "date": "18/10/2023"
  // }, {
  //   "id": 63,
  //   "name": "Whitney Ellinor",
  //   "price": 14,
  //   "platform": "Rath Inc",
  //   "status": 51,
  //   "payment": false,
  //   "date": "07/08/2023"
  // }, {
  //   "id": 64,
  //   "name": "Gamaliel Stringer",
  //   "price": 22,
  //   "platform": "Ruecker-Bednar",
  //   "status": 90,
  //   "payment": false,
  //   "date": "20/08/2023"
  // }, {
  //   "id": 65,
  //   "name": "Padgett Flintoft",
  //   "price": 90,
  //   "platform": "Boyle, Mitchell and Franecki",
  //   "status": 6,
  //   "payment": true,
  //   "date": "14/05/2024"
  // }, {
  //   "id": 66,
  //   "name": "Eolande Ormerod",
  //   "price": 28,
  //   "platform": "Collins, Mertz and Moore",
  //   "status": 12,
  //   "payment": true,
  //   "date": "31/08/2023"
  // }, {
  //   "id": 67,
  //   "name": "Loleta Fishley",
  //   "price": 100,
  //   "platform": "Ward and Sons",
  //   "status": 75,
  //   "payment": false,
  //   "date": "01/03/2024"
  // }, {
  //   "id": 68,
  //   "name": "Maud Drayson",
  //   "price": 27,
  //   "platform": "Bauch-Swaniawski",
  //   "status": 40,
  //   "payment": true,
  //   "date": "03/05/2024"
  // }, {
  //   "id": 69,
  //   "name": "Marti Fetherston",
  //   "price": 10,
  //   "platform": "Bartoletti-Mraz",
  //   "status": 12,
  //   "payment": false,
  //   "date": "27/05/2024"
  // }, {
  //   "id": 70,
  //   "name": "Maggy Treece",
  //   "price": 17,
  //   "platform": "O'Connell, Bergstrom and Sanford",
  //   "status": 87,
  //   "payment": true,
  //   "date": "21/01/2024"
  // }, {
  //   "id": 71,
  //   "name": "Zara Bellay",
  //   "price": 46,
  //   "platform": "Ondricka and Sons",
  //   "status": 92,
  //   "payment": true,
  //   "date": "07/02/2024"
  // }, {
  //   "id": 72,
  //   "name": "Clarisse O' Cloney",
  //   "price": 27,
  //   "platform": "Walter-Muller",
  //   "status": 41,
  //   "payment": false,
  //   "date": "29/06/2023"
  // }, {
  //   "id": 73,
  //   "name": "Sallee Hannan",
  //   "price": 66,
  //   "platform": "Schimmel LLC",
  //   "status": 79,
  //   "payment": true,
  //   "date": "16/10/2023"
  // }, {
  //   "id": 74,
  //   "name": "Calhoun Suarez",
  //   "price": 16,
  //   "platform": "Pfeffer Inc",
  //   "status": 78,
  //   "payment": true,
  //   "date": "15/10/2023"
  // }, {
  //   "id": 75,
  //   "name": "Tammi Verdey",
  //   "price": 48,
  //   "platform": "Mante Inc",
  //   "status": 96,
  //   "payment": false,
  //   "date": "25/05/2024"
  // }, {
  //   "id": 76,
  //   "name": "Maxwell Voase",
  //   "price": 10,
  //   "platform": "Parisian, Bechtelar and Kohler",
  //   "status": 10,
  //   "payment": true,
  //   "date": "02/12/2023"
  // }, {
  //   "id": 77,
  //   "name": "Jerrie Sothcott",
  //   "price": 57,
  //   "platform": "Gaylord-Howe",
  //   "status": 24,
  //   "payment": false,
  //   "date": "22/05/2024"
  // }, {
  //   "id": 78,
  //   "name": "Verena Heinicke",
  //   "price": 37,
  //   "platform": "Watsica Group",
  //   "status": 92,
  //   "payment": false,
  //   "date": "12/09/2023"
  // }, {
  //   "id": 79,
  //   "name": "Ronnie Monteaux",
  //   "price": 41,
  //   "platform": "Dickens Inc",
  //   "status": 58,
  //   "payment": false,
  //   "date": "05/09/2023"
  // }, {
  //   "id": 80,
  //   "name": "Marietta Clamp",
  //   "price": 5,
  //   "platform": "Mueller-O'Hara",
  //   "status": 20,
  //   "payment": true,
  //   "date": "04/11/2023"
  // }, {
  //   "id": 81,
  //   "name": "Bevan Rubinfeld",
  //   "price": 25,
  //   "platform": "Wilderman Group",
  //   "status": 13,
  //   "payment": false,
  //   "date": "17/04/2024"
  // }, {
  //   "id": 82,
  //   "name": "Marget Winwright",
  //   "price": 93,
  //   "platform": "Parker and Sons",
  //   "status": 18,
  //   "payment": false,
  //   "date": "03/11/2023"
  // }, {
  //   "id": 83,
  //   "name": "Matti Presland",
  //   "price": 56,
  //   "platform": "Erdman LLC",
  //   "status": 55,
  //   "payment": true,
  //   "date": "21/02/2024"
  // }, {
  //   "id": 84,
  //   "name": "Alan Ballister",
  //   "price": 45,
  //   "platform": "Ryan, Kuhic and Conroy",
  //   "status": 49,
  //   "payment": false,
  //   "date": "05/02/2024"
  // }, {
  //   "id": 85,
  //   "name": "Merilee Burnip",
  //   "price": 83,
  //   "platform": "Bartell-Kshlerin",
  //   "status": 87,
  //   "payment": false,
  //   "date": "08/01/2024"
  // }, {
  //   "id": 86,
  //   "name": "Penni Entwisle",
  //   "price": 32,
  //   "platform": "Morissette, Christiansen and Sporer",
  //   "status": 15,
  //   "payment": false,
  //   "date": "25/05/2024"
  // }, {
  //   "id": 87,
  //   "name": "Florina Hanssmann",
  //   "price": 90,
  //   "platform": "Schamberger LLC",
  //   "status": 79,
  //   "payment": true,
  //   "date": "23/06/2023"
  // }, {
  //   "id": 88,
  //   "name": "Brannon Dael",
  //   "price": 27,
  //   "platform": "Wyman-Koelpin",
  //   "status": 13,
  //   "payment": false,
  //   "date": "03/10/2023"
  // }, {
  //   "id": 89,
  //   "name": "Rustin Granham",
  //   "price": 8,
  //   "platform": "Robel-Tromp",
  //   "status": 95,
  //   "payment": false,
  //   "date": "07/10/2023"
  // }, {
  //   "id": 90,
  //   "name": "Shurlock Erskin",
  //   "price": 9,
  //   "platform": "Flatley-Simonis",
  //   "status": 81,
  //   "payment": true,
  //   "date": "26/06/2023"
  // }, {
  //   "id": 91,
  //   "name": "Darcey Quogan",
  //   "price": 92,
  //   "platform": "Boehm, Jerde and Torp",
  //   "status": 89,
  //   "payment": false,
  //   "date": "24/09/2023"
  // }, {
  //   "id": 92,
  //   "name": "Jerrold Leyden",
  //   "price": 33,
  //   "platform": "Bernhard-Oberbrunner",
  //   "status": 1,
  //   "payment": false,
  //   "date": "09/05/2023"
  // }, {
  //   "id": 93,
  //   "name": "Bud Duffit",
  //   "price": 31,
  //   "platform": "Stokes, Crona and Schimmel",
  //   "status": 96,
  //   "payment": false,
  //   "date": "15/10/2023"
  // }, {
  //   "id": 94,
  //   "name": "Zackariah Yakovitch",
  //   "price": 68,
  //   "platform": "Dare, Johnston and Dach",
  //   "status": 40,
  //   "payment": false,
  //   "date": "23/12/2023"
  // }, {
  //   "id": 95,
  //   "name": "Jason Littleover",
  //   "price": 74,
  //   "platform": "Prosacco Group",
  //   "status": 25,
  //   "payment": true,
  //   "date": "19/09/2023"
  // }, {
  //   "id": 96,
  //   "name": "Lorens Saladine",
  //   "price": 66,
  //   "platform": "Miller-Goodwin",
  //   "status": 95,
  //   "payment": true,
  //   "date": "12/06/2023"
  // }, {
  //   "id": 97,
  //   "name": "Hansiain Jarad",
  //   "price": 70,
  //   "platform": "Rippin Group",
  //   "status": 98,
  //   "payment": true,
  //   "date": "11/11/2023"
  // }, {
  //   "id": 98,
  //   "name": "Arliene Konke",
  //   "price": 65,
  //   "platform": "O'Hara, Boyle and Boyle",
  //   "status": 95,
  //   "payment": true,
  //   "date": "17/05/2024"
  // }, {
  //   "id": 99,
  //   "name": "Koo Kahn",
  //   "price": 42,
  //   "platform": "Kulas-White",
  //   "status": 2,
  //   "payment": true,
  //   "date": "11/03/2023"
  // }, {
  //   "id": 100,
  //   "name": "Paulie Castagneto",
  //   "price": 36,
  //   "platform": "Nikolaus LLC",
  //   "status": 18,
  //   "payment": true,
  //   "date": "19/07/2023"
  // }
]


  
	const [pending, setPending] = useState(true);
	const [selectedRows, setSelectedRows] = React.useState([]);
	const [toggleCleared, setToggleCleared] = React.useState(false);
	const [data, setData] = React.useState(d);
  const [viewModal, setViewModal] = useState(false)
  const [image, setimage] = useState("")
  const [name, setname] = useState("")
  const [payment, setpayment] = useState(false)
  const [platform, setplatform] = useState("")
  const [date, setdate] = useState("")
  const [status, setstatus] = useState(0)
  const [filterText, setFilterText] = React.useState('');
	const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);


  const handleView =(row) => {
    console.log(row)
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
		item => item.assetName && item.assetName.toLowerCase().includes(filterText.toLowerCase()),
	);

  const fetchAsset = async() =>{
    await axios.post('http://localhost:5000/brands/assets',{
      brand:"Zara"
    }).then(res =>{
      setData(res.data.assets)
  })
  }
  console.log(data)

	useEffect(() => {
    setPending(true)
    fetchAsset()
    setAssetList(filteredItems)
		const timeout = setTimeout(() => {
      setPending(false);
		}, 2000);
    data.map(r=>{
      if(r.status == "Pending Payment"){
        r['selected'] = true
      }
    })
		return () => clearTimeout(timeout);
	}, []);
  useEffect(()=>{
    setAssetList(filteredItems)
  },[filterText])


  const handleRowSelected = React.useCallback(state => {
    		setSelectedRows(state.selectedRows);
    }, []);

  const ale = (a,row) => {
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
          text: `You want to delete this `,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No, cancel!',
          reverseButtons: true,
        })
        .then(async(result) => {
          if (result.isConfirmed) {
            var name = []
            selectedRows.map(row => {
              name.push(row.assetName)
            })
            console.log(row)
            console.log({
              brand:"Zara",
              name:name
            })
            await axios.delete("http://localhost:5000/brands/delete",{
              brand:"Zara",
              name:name
            })
            // setData(differenceBy(data, [row], 'id'));
            swalWithBootstrapButtons.fire('Deleted!', 'Your file has been deleted.', 'success')
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            this.successalt('error', 'Cancelled')
          }
        })
    }

  const handleDelete = (row) => {
    console.log("elo")
    ale("Delete",row)
  }
  
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
  const contextActions = React.useMemo(() => {
    		const handleDelete = () => {
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
          text: `Are you sure you want to delete:\r ${selectedRows.map(r => r.name)}?`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No, cancel!',
          reverseButtons: true,
        })
        .then(async(result) => {
          if (result.isConfirmed) {
            setToggleCleared(!toggleCleared);
            var name = []
            selectedRows.map(row => {
              name.push(row.assetName)
            })
            console.log({
              brand:"Zara",
              name:name
            })
            await axios.delete("http://localhost:5000/brands/delete",{data:{
              brand:"Zara",
              name:name
            }}).then(res => console.log(res))
    				setData(differenceBy(data, selectedRows, '_id'));
            swalWithBootstrapButtons.fire('Deleted!', 'Your file has been deleted.', 'success')
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            this.successalt('error', 'Cancelled')
          }
        })
    		};
        var price = 0;
        selectedRows.map(r=>{
          if(Number(r.budget)){
            price += r.budget
          }
        })
    		return (
          <>
          <div>
          <h6 className='p-4 h-100' >${price}</h6>
          </div>
          <IoBagCheckOutline onClick={() => handlePayTotal(price)} />
          <FaTrashAlt key="delete" onClick={handleDelete} className="m-4" icon/>
          </>
    		);
    	}, [data, selectedRows, toggleCleared]);

      // const subHeaderComponentMemo = React.useMemo(() => {
      //   const handleClear = () => {
      //     if (filterText) {
      //       setResetPaginationToggle(!resetPaginationToggle);
      //       setFilterText('');
      //     }
      //   };
    
      //   return (
      //     <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
      //   );
      // }, [filterText, resetPaginationToggle]);
      const {brand} = useParams()
      console.log(brand)

    return (
      <div className='p-2 mb-4'>
      <Breadcrumb>
            <BreadcrumbItem>
            <a href="#">
                Assets
            </a>
            </BreadcrumbItem>
            <BreadcrumbItem active> 
            Manage Assets
            </BreadcrumbItem>
        </Breadcrumb>
        <h1>Assets</h1>
        <div class="input-icons">
                <i class="fa fa-search input-icon">
              </i>
                <input class="input-field manage-asset-input" 
                      type="text"
                      placeholder="Search Assets"
                      value={filterText}
                      onChange={e => setFilterText(e.target.value)}
                       />
                <i class="fa fa-times input-icon-after" onClick={()=>{
                  setFilterText("")
                  setData(filteredItems)
                }}>
              </i>
            </div>
        <button className='btn-create'>
          <Link to={'/upload'}>
            Create New 3d Asset +
          </Link>
        </button>
    <div className='tables mt-4' style={{position:"relative"}}>
        <DataTable 
        columns={columns} 
        className='data-table'
        data={filteredItems} 
        selectableRows
        contextActions={contextActions}
        onSelectedRowsChange={handleRowSelected}
        progressPending={pending}
        paginationPerPage={5}
        paginationRowsPerPageOptions={[5,10, 25, 50, 100]}
        paginationResetDefaultPage={resetPaginationToggle}
			  clearSelectedRows={toggleCleared}
        pagination
        selectableRowDisabled={rowDisabledCriteria}
        persistTableHead
        progressComponent={
          <CustomLoader />
        }
        conditionalRowStyles={conditionalRowStyles}
         />
    </div>

    <Modal
        size="lg"
        show={viewModal}
        onHide={() => setViewModal(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            {name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row'>
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
          </div>
        </Modal.Body>
      </Modal>
    </div>)
};
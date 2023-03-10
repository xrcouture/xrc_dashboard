import React, { useEffect, useState } from "react";
import DataTable from "./DataTable";
import ProgressBar from "react-bootstrap/ProgressBar";
import differenceBy from "lodash/differenceBy";
import { Button } from "react-bootstrap";
import { SlOptionsVertical } from "react-icons/sl";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GiWallet } from "react-icons/gi";
import { BiEdit } from "react-icons/bi";
import { FaTrashAlt } from "react-icons/fa";
import { IoBagCheckOutline } from "react-icons/io5";
import Swal from "sweetalert2";
import Modal from "react-bootstrap/Modal";
import ProgressBar1 from "react-animated-progress-bar";
import styled, { keyframes } from "styled-components";
import axios from "axios";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import {
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

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
`;
const CustomLoader = () => (
  <div style={{ padding: "24px" }}>
    <Spinner />
  </div>
);
export default function MyComponent(props) {
  const caseInsensitiveSort = (rowA, rowB) => {
    const a = rowA.status;
    const b = rowB.status;
    if (a > b) {
      return 1;
    }
    if (b > a) {
      return -1;
    }
    return 0;
  };
  const rowDisabledCriteria = (row) => row.status == "Paid";
  const conditionalRowStyles = [
    {
      when: (row) => row.status != "Under Review",
      style: {
        backgroundColor: "#C8CDD0   ",
        opacity: ".9",
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
    {
      when: (row) => row.payment == true,
      style: {
        backgroundColor: "#F2F2F3",
        "&:hover": {
          cursor: "not-allowed",
        },
      },
    },
  ];
  const handlePay = (row) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to pay $${row.price}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, pay it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Paid!", "Your payment has been paid.", "success");
      } else {
        Swal.fire("Cancelled", "Your payment has been cancelled.", "error");
      }
    });
  };
  const handlePayTotal = (price) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to checkout $${price}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, pay it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Paid!", "Your payment has been paid.", "success");
      } else {
        Swal.fire("Cancelled", "Your payment has been cancelled.", "error");
      }
    });
  };
  const columns = [
    {
      name: "Brand Logo",
      selector: "thumbnail",
      cell: (row) => (
        <>
          {row.thumbnail && row.thumbnail != "" ? (
            <img
              src={row.thumbnail}
              style={{ width: "30px", height: "30px" }}
            />
          ) : (
            <div
              style={{
                height: "30px",
                width: "30px",
                backgroundColor: "black",
                alignSelf: "center",
                justifySelf: "center",
                fontSize: "20px",
                fontWeight: "bolder",
                color: "gray",
                textAlign: "center",
              }}
            >
              {row.brand
                .split(" ")
                .slice(0, 1)
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </div>
          )}
        </>
      ),
    },
    {
      name: "Name",
      selector: (row) =>  row.brand,
      sortable: true,
      cell: (row) => <Link to={`/admin/${row.brand}/assets`}>{row.brand}</Link>,
    },
    {
      name: "Draft",
      selector: (row) => row['Draft'],
      sortable: true,
      cell: (row) => (
        <> {row.Draft ? <h6 className="text-white">{row.Draft}</h6> : <h6 className="text-white">0</h6>}
        </>
      ),
    },
    {
      name: "Under Review",
      selector: "Under Review",
      sortable: true,
      cell: (row) => (
        <>
          {row['Under Review'] ? (
            <h6 style={{color:"violet"}}>{row['Under Review']}</h6>
          ) : (
            <h6 style={{color:"violet"}}>0</h6>
          )}
        </>
      ),
    },

    {
      name: "Action Needed",
      selector: "Action Needed",
      sortable: true,
      cell: (row) => (
        <>
            {row['Action Needed'] ? (
            <h6 style={{color:"red"}}>{row['Under Review']}</h6>
          ) : (
            <h6 style={{color:"red"}}>0</h6>
          )}
        </>
      ),

    },
    {
      name: "Payment Pending",
      selector:"Pending payment",
      cell: (row) => (
        <>
             {row['Pending payment'] ? (
            <h6 style={{color:"yellow"}}>{row['Pending payment']}</h6>
          ) : (
            <h6 style={{color:"yellow"}}>0</h6>
          )}
        </>
      ),
      sortable: true,
    },
    {
      name: "In Progress",
      selectable:"In Progress",
      cell: (row) => (
        <>
              {row['In Progress'] ? (
            <h6 style={{color:"blue"}}>{row['In Progress']}</h6>
          ) : (
            <h6 style={{color:"blue"}}>0</h6>
          )}
        </>
      ),
      sortable: true,
    },
    {
      name: "Completed",
      selectable:"Completed",
      cell: (row) => (
        <>
              {row['Completed'] ? (
            <h6 style={{color:"blue"}}>{row['Completed']}</h6>
          ) : (
            <h6 style={{color:"blue"}}>0</h6>
          )}
        </>
      ),
      sortable: true,
    },
    {
      name: "Total Count",
      selector: (row) => (
        <>
            <h6 style={{color:"green"}}>{row.totalCount}</h6>
        </>
      ),
      sortable: true,
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
    // {
    //   name: "Feedback",
    //   selector: (row) =>
    //     row.status < 100 ? (
    //       <div style={{ padding: "5px" }}>
    //         <i
    //           class="far fa-comment-alt"
    //           style={{ fontSize: "20px", color: "white" }}
    //           aria-hidden="true"
    //         ></i>
    //       </div>
    //     ) : (
    //       <i
    //         class="far fa-comment-alt"
    //         style={{ fontSize: "20px", color: "white" }}
    //         aria-hidden="true"
    //       ></i>
    //     ),
    // },
    // {
    //   name: "Options",
    //   // selector: "",
    //   cell: (row) => (
    //     <UncontrolledDropdown direction="end">
    //       <DropdownToggle
    //         color="transparent"
    //         className="action-toggle"
    //         direction="end"
    //       >
    //         <SlOptionsVertical className="action-container-icon " />
    //       </DropdownToggle>
    //       <DropdownMenu dark>
    //         <DropdownItem
    //           onClick={() => alert(`Are you ready to pay: ${row.budget}`)}
    //         >
    //           <GiWallet /> Pay Now
    //         </DropdownItem>
    //         <DropdownItem divider />
    //         <DropdownItem>
    //           <BiEdit /> Edit
    //         </DropdownItem>

    //         <DropdownItem divider />
    //         <DropdownItem onClick={() => handleDelete(row)}>
    //           <RiDeleteBin6Line /> Delete
    //         </DropdownItem>
    //       </DropdownMenu>
    //     </UncontrolledDropdown>
    //   ),
    // },
  ];
  const d = [{
    "id": 1,
    "brand_name": "Acid Free-Flux",
    "draft": 25,
    "under_review": 327,
    "action_needed": 341,
    "payment_pending": 757,
    "in_progress": 617,
    "completed": 126,
    "total_price": 21125
  }, {
    "id": 2,
    "brand_name": "ibandronate sodium",
    "draft": 506,
    "under_review": 515,
    "action_needed": 736,
    "payment_pending": 767,
    "in_progress": 651,
    "completed": 660,
    "total_price": 72823
  }, {
    "id": 3,
    "brand_name": "GAS",
    "draft": 566,
    "under_review": 952,
    "action_needed": 102,
    "payment_pending": 676,
    "in_progress": 255,
    "completed": 583,
    "total_price": 25363
  }, {
    "id": 4,
    "brand_name": "DEXTROAMPHETAMINE SULFATE",
    "draft": 720,
    "under_review": 372,
    "action_needed": 691,
    "payment_pending": 491,
    "in_progress": 512,
    "completed": 491,
    "total_price": 85102
  }, {
    "id": 5,
    "brand_name": "ShopRite Adult Tussin",
    "draft": 401,
    "under_review": 564,
    "action_needed": 30,
    "payment_pending": 295,
    "in_progress": 603,
    "completed": 5,
    "total_price": 27611
  }, {
    "id": 6,
    "brand_name": "Tums",
    "draft": 704,
    "under_review": 588,
    "action_needed": 553,
    "payment_pending": 183,
    "in_progress": 305,
    "completed": 180,
    "total_price": 80138
  }, {
    "id": 7,
    "brand_name": "promethazine hydrochloride and codeine phosphate",
    "draft": 558,
    "under_review": 218,
    "action_needed": 530,
    "payment_pending": 322,
    "in_progress": 757,
    "completed": 251,
    "total_price": 14312
  }, {
    "id": 8,
    "brand_name": "Neomycin and Polymyxin B Sulfates and Hydrocortisone",
    "draft": 902,
    "under_review": 244,
    "action_needed": 6,
    "payment_pending": 416,
    "in_progress": 794,
    "completed": 628,
    "total_price": 59393
  }, {
    "id": 9,
    "brand_name": "Foaming Hand Wash",
    "draft": 720,
    "under_review": 150,
    "action_needed": 505,
    "payment_pending": 773,
    "in_progress": 938,
    "completed": 677,
    "total_price": 35326
  }, {
    "id": 10,
    "brand_name": "LypSyl Vanilla Plum",
    "draft": 450,
    "under_review": 522,
    "action_needed": 97,
    "payment_pending": 356,
    "in_progress": 313,
    "completed": 510,
    "total_price": 98725
  }, {
    "id": 11,
    "brand_name": "HYDROCODONE BITARTRATE AND ACETAMINOPHEN",
    "draft": 252,
    "under_review": 997,
    "action_needed": 202,
    "payment_pending": 826,
    "in_progress": 307,
    "completed": 975,
    "total_price": 8102
  }, {
    "id": 12,
    "brand_name": "Anestacon",
    "draft": 490,
    "under_review": 753,
    "action_needed": 859,
    "payment_pending": 692,
    "in_progress": 655,
    "completed": 181,
    "total_price": 31864
  }, {
    "id": 13,
    "brand_name": "Foundation Primer Plus SPF 15",
    "draft": 260,
    "under_review": 324,
    "action_needed": 588,
    "payment_pending": 997,
    "in_progress": 130,
    "completed": 226,
    "total_price": 12098
  }, {
    "id": 14,
    "brand_name": "Chewable Adult Low Dose Aspirin",
    "draft": 564,
    "under_review": 345,
    "action_needed": 739,
    "payment_pending": 439,
    "in_progress": 645,
    "completed": 235,
    "total_price": 89119
  }, {
    "id": 15,
    "brand_name": "WHITE PINE POLLEN",
    "draft": 828,
    "under_review": 515,
    "action_needed": 931,
    "payment_pending": 202,
    "in_progress": 60,
    "completed": 765,
    "total_price": 34842
  }, {
    "id": 16,
    "brand_name": "TRICLOSAN",
    "draft": 95,
    "under_review": 467,
    "action_needed": 66,
    "payment_pending": 13,
    "in_progress": 251,
    "completed": 922,
    "total_price": 1257
  }, {
    "id": 17,
    "brand_name": "HOLCUS LANATUS POLLEN",
    "draft": 311,
    "under_review": 440,
    "action_needed": 25,
    "payment_pending": 465,
    "in_progress": 367,
    "completed": 270,
    "total_price": 10692
  }, {
    "id": 18,
    "brand_name": "IT RADIANT CC CUSHION",
    "draft": 64,
    "under_review": 282,
    "action_needed": 548,
    "payment_pending": 829,
    "in_progress": 210,
    "completed": 897,
    "total_price": 22572
  }, {
    "id": 19,
    "brand_name": "good neighbor pharmacy sinus",
    "draft": 860,
    "under_review": 831,
    "action_needed": 78,
    "payment_pending": 355,
    "in_progress": 82,
    "completed": 117,
    "total_price": 54202
  }, {
    "id": 20,
    "brand_name": "ROPINIROLE HYDROCHLORIDE",
    "draft": 374,
    "under_review": 76,
    "action_needed": 249,
    "payment_pending": 195,
    "in_progress": 608,
    "completed": 17,
    "total_price": 68938
  }, {
    "id": 21,
    "brand_name": "HYPERICUM PERF",
    "draft": 778,
    "under_review": 563,
    "action_needed": 937,
    "payment_pending": 597,
    "in_progress": 597,
    "completed": 233,
    "total_price": 43566
  }, {
    "id": 22,
    "brand_name": "Levofloxacin",
    "draft": 597,
    "under_review": 766,
    "action_needed": 168,
    "payment_pending": 594,
    "in_progress": 716,
    "completed": 801,
    "total_price": 88544
  }, {
    "id": 23,
    "brand_name": "Green Apple Hand Sanitizer",
    "draft": 358,
    "under_review": 802,
    "action_needed": 477,
    "payment_pending": 574,
    "in_progress": 475,
    "completed": 407,
    "total_price": 23887
  }, {
    "id": 24,
    "brand_name": "Yves Saint Laurent Forever Youth Liberator Broad Spectrum SPF 15 Sunscreen Fluid",
    "draft": 959,
    "under_review": 589,
    "action_needed": 332,
    "payment_pending": 156,
    "in_progress": 247,
    "completed": 736,
    "total_price": 99637
  }, {
    "id": 25,
    "brand_name": "Lamotrigine",
    "draft": 154,
    "under_review": 229,
    "action_needed": 594,
    "payment_pending": 686,
    "in_progress": 732,
    "completed": 756,
    "total_price": 11977
  }, {
    "id": 26,
    "brand_name": "Ferrum 5",
    "draft": 881,
    "under_review": 888,
    "action_needed": 626,
    "payment_pending": 678,
    "in_progress": 304,
    "completed": 917,
    "total_price": 60856
  }, {
    "id": 27,
    "brand_name": "L-Dopa",
    "draft": 15,
    "under_review": 769,
    "action_needed": 747,
    "payment_pending": 354,
    "in_progress": 767,
    "completed": 14,
    "total_price": 99450
  }, {
    "id": 28,
    "brand_name": "Protopic",
    "draft": 241,
    "under_review": 592,
    "action_needed": 729,
    "payment_pending": 283,
    "in_progress": 863,
    "completed": 259,
    "total_price": 22100
  }, {
    "id": 29,
    "brand_name": "Acyclovir",
    "draft": 957,
    "under_review": 231,
    "action_needed": 893,
    "payment_pending": 198,
    "in_progress": 431,
    "completed": 900,
    "total_price": 74272
  }, {
    "id": 30,
    "brand_name": "Hoarse Cough",
    "draft": 894,
    "under_review": 553,
    "action_needed": 605,
    "payment_pending": 656,
    "in_progress": 898,
    "completed": 159,
    "total_price": 44706
  }, {
    "id": 31,
    "brand_name": "Retin-A MICRO",
    "draft": 493,
    "under_review": 40,
    "action_needed": 798,
    "payment_pending": 895,
    "in_progress": 866,
    "completed": 240,
    "total_price": 38217
  }, {
    "id": 32,
    "brand_name": "Digoxin",
    "draft": 917,
    "under_review": 189,
    "action_needed": 235,
    "payment_pending": 906,
    "in_progress": 226,
    "completed": 889,
    "total_price": 49845
  }, {
    "id": 33,
    "brand_name": "Ranitidine",
    "draft": 611,
    "under_review": 209,
    "action_needed": 917,
    "payment_pending": 68,
    "in_progress": 301,
    "completed": 457,
    "total_price": 10148
  }, {
    "id": 34,
    "brand_name": "Lubricant Eye",
    "draft": 523,
    "under_review": 633,
    "action_needed": 561,
    "payment_pending": 335,
    "in_progress": 627,
    "completed": 687,
    "total_price": 8837
  }, {
    "id": 35,
    "brand_name": "Headache",
    "draft": 911,
    "under_review": 572,
    "action_needed": 865,
    "payment_pending": 670,
    "in_progress": 989,
    "completed": 373,
    "total_price": 23012
  }, {
    "id": 36,
    "brand_name": "St. Ives",
    "draft": 336,
    "under_review": 784,
    "action_needed": 954,
    "payment_pending": 749,
    "in_progress": 65,
    "completed": 508,
    "total_price": 65323
  }, {
    "id": 37,
    "brand_name": "Lorazepam",
    "draft": 805,
    "under_review": 475,
    "action_needed": 291,
    "payment_pending": 121,
    "in_progress": 421,
    "completed": 415,
    "total_price": 77083
  }, {
    "id": 38,
    "brand_name": "Losartan Potassium and Hydrochlorothiazide",
    "draft": 372,
    "under_review": 447,
    "action_needed": 41,
    "payment_pending": 655,
    "in_progress": 374,
    "completed": 420,
    "total_price": 81484
  }, {
    "id": 39,
    "brand_name": "Ludent",
    "draft": 74,
    "under_review": 248,
    "action_needed": 369,
    "payment_pending": 906,
    "in_progress": 826,
    "completed": 939,
    "total_price": 81996
  }, {
    "id": 40,
    "brand_name": "Methocarbamol",
    "draft": 269,
    "under_review": 75,
    "action_needed": 35,
    "payment_pending": 441,
    "in_progress": 251,
    "completed": 479,
    "total_price": 87121
  }, {
    "id": 41,
    "brand_name": "Urea",
    "draft": 880,
    "under_review": 743,
    "action_needed": 693,
    "payment_pending": 461,
    "in_progress": 815,
    "completed": 670,
    "total_price": 79733
  }, {
    "id": 42,
    "brand_name": "Fluoxetine",
    "draft": 10,
    "under_review": 930,
    "action_needed": 607,
    "payment_pending": 41,
    "in_progress": 739,
    "completed": 760,
    "total_price": 56530
  }, {
    "id": 43,
    "brand_name": "SEROQUEL",
    "draft": 23,
    "under_review": 988,
    "action_needed": 198,
    "payment_pending": 179,
    "in_progress": 600,
    "completed": 675,
    "total_price": 53151
  }, {
    "id": 44,
    "brand_name": "Luxury Cell Performance",
    "draft": 464,
    "under_review": 882,
    "action_needed": 834,
    "payment_pending": 28,
    "in_progress": 391,
    "completed": 897,
    "total_price": 6812
  }, {
    "id": 45,
    "brand_name": "Donepezil Hydrochloride",
    "draft": 380,
    "under_review": 391,
    "action_needed": 14,
    "payment_pending": 534,
    "in_progress": 705,
    "completed": 307,
    "total_price": 79322
  }, {
    "id": 46,
    "brand_name": "Velphoro",
    "draft": 76,
    "under_review": 503,
    "action_needed": 213,
    "payment_pending": 863,
    "in_progress": 869,
    "completed": 613,
    "total_price": 69871
  }, {
    "id": 47,
    "brand_name": "Axe Sharp Focus Invisible Solid",
    "draft": 818,
    "under_review": 383,
    "action_needed": 308,
    "payment_pending": 331,
    "in_progress": 214,
    "completed": 981,
    "total_price": 93267
  }, {
    "id": 48,
    "brand_name": "Risperidone",
    "draft": 565,
    "under_review": 248,
    "action_needed": 226,
    "payment_pending": 284,
    "in_progress": 419,
    "completed": 964,
    "total_price": 24297
  }, {
    "id": 49,
    "brand_name": "Arnica e pl. tota 30",
    "draft": 228,
    "under_review": 148,
    "action_needed": 560,
    "payment_pending": 604,
    "in_progress": 100,
    "completed": 215,
    "total_price": 18147
  }, {
    "id": 50,
    "brand_name": "MEDIQUE APAP Extra Strength",
    "draft": 950,
    "under_review": 323,
    "action_needed": 855,
    "payment_pending": 258,
    "in_progress": 223,
    "completed": 689,
    "total_price": 78771
  }, {
    "id": 51,
    "brand_name": "ACNE AND OIL CONTROL",
    "draft": 712,
    "under_review": 522,
    "action_needed": 948,
    "payment_pending": 37,
    "in_progress": 569,
    "completed": 930,
    "total_price": 57612
  }, {
    "id": 52,
    "brand_name": "Prednisolone Sodium Phosphate",
    "draft": 339,
    "under_review": 169,
    "action_needed": 715,
    "payment_pending": 565,
    "in_progress": 982,
    "completed": 663,
    "total_price": 61861
  }, {
    "id": 53,
    "brand_name": "Theophylline",
    "draft": 982,
    "under_review": 237,
    "action_needed": 989,
    "payment_pending": 944,
    "in_progress": 209,
    "completed": 457,
    "total_price": 69432
  }, {
    "id": 54,
    "brand_name": "Oxygen",
    "draft": 773,
    "under_review": 730,
    "action_needed": 927,
    "payment_pending": 17,
    "in_progress": 230,
    "completed": 958,
    "total_price": 35849
  }, {
    "id": 55,
    "brand_name": "English Walnut",
    "draft": 157,
    "under_review": 215,
    "action_needed": 809,
    "payment_pending": 104,
    "in_progress": 277,
    "completed": 927,
    "total_price": 31182
  }, {
    "id": 56,
    "brand_name": "Clonazepam",
    "draft": 693,
    "under_review": 33,
    "action_needed": 811,
    "payment_pending": 614,
    "in_progress": 465,
    "completed": 873,
    "total_price": 14546
  }, {
    "id": 57,
    "brand_name": "GABAPENTIN",
    "draft": 544,
    "under_review": 413,
    "action_needed": 324,
    "payment_pending": 146,
    "in_progress": 819,
    "completed": 392,
    "total_price": 22576
  }, {
    "id": 58,
    "brand_name": "Eve Lom Radiance Perfected Tinted Moisturiser Broad Spectrum SPF 15 Sunscreen",
    "draft": 955,
    "under_review": 675,
    "action_needed": 464,
    "payment_pending": 921,
    "in_progress": 292,
    "completed": 193,
    "total_price": 87748
  }, {
    "id": 59,
    "brand_name": "Dermamine",
    "draft": 373,
    "under_review": 49,
    "action_needed": 665,
    "payment_pending": 151,
    "in_progress": 741,
    "completed": 635,
    "total_price": 6602
  }, {
    "id": 60,
    "brand_name": "FACE VALUES",
    "draft": 28,
    "under_review": 884,
    "action_needed": 875,
    "payment_pending": 363,
    "in_progress": 388,
    "completed": 660,
    "total_price": 4294
  }, {
    "id": 61,
    "brand_name": "Nateglinide",
    "draft": 58,
    "under_review": 893,
    "action_needed": 252,
    "payment_pending": 258,
    "in_progress": 168,
    "completed": 383,
    "total_price": 10500
  }, {
    "id": 62,
    "brand_name": "Axe",
    "draft": 948,
    "under_review": 607,
    "action_needed": 177,
    "payment_pending": 107,
    "in_progress": 834,
    "completed": 464,
    "total_price": 57073
  }, {
    "id": 63,
    "brand_name": "Lysol",
    "draft": 763,
    "under_review": 178,
    "action_needed": 490,
    "payment_pending": 699,
    "in_progress": 373,
    "completed": 744,
    "total_price": 15973
  }, {
    "id": 64,
    "brand_name": "NAPROXEN",
    "draft": 904,
    "under_review": 829,
    "action_needed": 216,
    "payment_pending": 866,
    "in_progress": 343,
    "completed": 506,
    "total_price": 40296
  }, {
    "id": 65,
    "brand_name": "Megestrol Acetate",
    "draft": 1000,
    "under_review": 770,
    "action_needed": 395,
    "payment_pending": 726,
    "in_progress": 357,
    "completed": 910,
    "total_price": 8458
  }, {
    "id": 66,
    "brand_name": "Smart Sense Cold Remedy",
    "draft": 397,
    "under_review": 447,
    "action_needed": 970,
    "payment_pending": 112,
    "in_progress": 327,
    "completed": 251,
    "total_price": 62993
  }, {
    "id": 67,
    "brand_name": "Vasopressin",
    "draft": 97,
    "under_review": 419,
    "action_needed": 8,
    "payment_pending": 306,
    "in_progress": 291,
    "completed": 109,
    "total_price": 42815
  }, {
    "id": 68,
    "brand_name": "Colgate",
    "draft": 531,
    "under_review": 108,
    "action_needed": 751,
    "payment_pending": 824,
    "in_progress": 195,
    "completed": 412,
    "total_price": 68875
  }, {
    "id": 69,
    "brand_name": "Saccharomyces cerevisiae",
    "draft": 870,
    "under_review": 478,
    "action_needed": 575,
    "payment_pending": 132,
    "in_progress": 790,
    "completed": 615,
    "total_price": 61149
  }, {
    "id": 70,
    "brand_name": "Fexofenadine",
    "draft": 60,
    "under_review": 585,
    "action_needed": 414,
    "payment_pending": 503,
    "in_progress": 963,
    "completed": 375,
    "total_price": 66250
  }, {
    "id": 71,
    "brand_name": "Aspirin",
    "draft": 517,
    "under_review": 347,
    "action_needed": 364,
    "payment_pending": 925,
    "in_progress": 123,
    "completed": 89,
    "total_price": 60813
  }, {
    "id": 72,
    "brand_name": "HUMCO Strong Iodine Solution",
    "draft": 171,
    "under_review": 657,
    "action_needed": 678,
    "payment_pending": 322,
    "in_progress": 877,
    "completed": 766,
    "total_price": 3236
  }, {
    "id": 73,
    "brand_name": "Red Maple",
    "draft": 436,
    "under_review": 390,
    "action_needed": 722,
    "payment_pending": 429,
    "in_progress": 889,
    "completed": 570,
    "total_price": 72713
  }, {
    "id": 74,
    "brand_name": "Glister Multi-Action Fluoride Toothpaste",
    "draft": 834,
    "under_review": 471,
    "action_needed": 679,
    "payment_pending": 584,
    "in_progress": 710,
    "completed": 632,
    "total_price": 79011
  }, {
    "id": 75,
    "brand_name": "PROVIGIL",
    "draft": 93,
    "under_review": 75,
    "action_needed": 78,
    "payment_pending": 212,
    "in_progress": 86,
    "completed": 928,
    "total_price": 8869
  }, {
    "id": 76,
    "brand_name": "Healing Waters White Tea Pear Hand Sanitizer",
    "draft": 666,
    "under_review": 765,
    "action_needed": 834,
    "payment_pending": 75,
    "in_progress": 145,
    "completed": 112,
    "total_price": 63340
  }, {
    "id": 77,
    "brand_name": "Potassium Chloride in Dextrose and Sodium Chloride",
    "draft": 374,
    "under_review": 114,
    "action_needed": 776,
    "payment_pending": 301,
    "in_progress": 930,
    "completed": 369,
    "total_price": 73347
  }, {
    "id": 78,
    "brand_name": "Aspirin",
    "draft": 515,
    "under_review": 174,
    "action_needed": 992,
    "payment_pending": 761,
    "in_progress": 870,
    "completed": 195,
    "total_price": 83916
  }, {
    "id": 79,
    "brand_name": "SEROQUEL",
    "draft": 414,
    "under_review": 624,
    "action_needed": 922,
    "payment_pending": 742,
    "in_progress": 791,
    "completed": 41,
    "total_price": 28658
  }, {
    "id": 80,
    "brand_name": "NITROGEN",
    "draft": 529,
    "under_review": 324,
    "action_needed": 862,
    "payment_pending": 199,
    "in_progress": 326,
    "completed": 609,
    "total_price": 83767
  }, {
    "id": 81,
    "brand_name": "Zep Anti-Bacterial Foaming Hand Cleaner",
    "draft": 488,
    "under_review": 448,
    "action_needed": 906,
    "payment_pending": 998,
    "in_progress": 868,
    "completed": 408,
    "total_price": 72516
  }, {
    "id": 82,
    "brand_name": "FACE IT RADIANCE POWDER PACT SPF25 MOISTURE VEIL NB21",
    "draft": 653,
    "under_review": 50,
    "action_needed": 365,
    "payment_pending": 301,
    "in_progress": 173,
    "completed": 764,
    "total_price": 97048
  }, {
    "id": 83,
    "brand_name": "Pantoprazole Sodium",
    "draft": 897,
    "under_review": 690,
    "action_needed": 358,
    "payment_pending": 344,
    "in_progress": 74,
    "completed": 554,
    "total_price": 30977
  }, {
    "id": 84,
    "brand_name": "Salt Grass Pollen",
    "draft": 705,
    "under_review": 465,
    "action_needed": 110,
    "payment_pending": 72,
    "in_progress": 329,
    "completed": 822,
    "total_price": 55841
  }, {
    "id": 85,
    "brand_name": "YS Solution Ac control Skin Regular Mild",
    "draft": 165,
    "under_review": 287,
    "action_needed": 517,
    "payment_pending": 402,
    "in_progress": 544,
    "completed": 436,
    "total_price": 50375
  }, {
    "id": 86,
    "brand_name": "Hydrochlorothiazide",
    "draft": 843,
    "under_review": 617,
    "action_needed": 841,
    "payment_pending": 722,
    "in_progress": 590,
    "completed": 350,
    "total_price": 40578
  }, {
    "id": 87,
    "brand_name": "Sertraline",
    "draft": 713,
    "under_review": 806,
    "action_needed": 219,
    "payment_pending": 77,
    "in_progress": 147,
    "completed": 354,
    "total_price": 4025
  }, {
    "id": 88,
    "brand_name": "Pediatric Earache Remedy",
    "draft": 430,
    "under_review": 785,
    "action_needed": 921,
    "payment_pending": 678,
    "in_progress": 539,
    "completed": 411,
    "total_price": 80063
  }, {
    "id": 89,
    "brand_name": "Home Health Psoriasis Medicated Scalp and Body Wash",
    "draft": 113,
    "under_review": 293,
    "action_needed": 219,
    "payment_pending": 815,
    "in_progress": 694,
    "completed": 479,
    "total_price": 30192
  }, {
    "id": 90,
    "brand_name": "Aspergillus repens",
    "draft": 921,
    "under_review": 336,
    "action_needed": 266,
    "payment_pending": 748,
    "in_progress": 44,
    "completed": 676,
    "total_price": 3039
  }, {
    "id": 91,
    "brand_name": "Senna Laxative",
    "draft": 751,
    "under_review": 918,
    "action_needed": 69,
    "payment_pending": 682,
    "in_progress": 795,
    "completed": 437,
    "total_price": 2937
  }, {
    "id": 92,
    "brand_name": "ShopRite Nasal Decongestant",
    "draft": 88,
    "under_review": 606,
    "action_needed": 750,
    "payment_pending": 602,
    "in_progress": 956,
    "completed": 228,
    "total_price": 49882
  }, {
    "id": 93,
    "brand_name": "Castellani Paint",
    "draft": 842,
    "under_review": 381,
    "action_needed": 390,
    "payment_pending": 548,
    "in_progress": 502,
    "completed": 940,
    "total_price": 64329
  }, {
    "id": 94,
    "brand_name": "Allure Ice Cold Analgesic",
    "draft": 131,
    "under_review": 713,
    "action_needed": 300,
    "payment_pending": 678,
    "in_progress": 355,
    "completed": 993,
    "total_price": 4746
  }, {
    "id": 95,
    "brand_name": "SERTRALINE",
    "draft": 763,
    "under_review": 452,
    "action_needed": 646,
    "payment_pending": 989,
    "in_progress": 913,
    "completed": 57,
    "total_price": 37384
  }, {
    "id": 96,
    "brand_name": "Helium Oxygen",
    "draft": 118,
    "under_review": 929,
    "action_needed": 392,
    "payment_pending": 459,
    "in_progress": 656,
    "completed": 375,
    "total_price": 22428
  }, {
    "id": 97,
    "brand_name": "Up and Up Stomach Relief",
    "draft": 9,
    "under_review": 166,
    "action_needed": 706,
    "payment_pending": 70,
    "in_progress": 411,
    "completed": 1000,
    "total_price": 4052
  }, {
    "id": 98,
    "brand_name": "Hand-E XL",
    "draft": 919,
    "under_review": 858,
    "action_needed": 904,
    "payment_pending": 939,
    "in_progress": 549,
    "completed": 26,
    "total_price": 65408
  }, {
    "id": 99,
    "brand_name": "Total Active Dual BB",
    "draft": 211,
    "under_review": 609,
    "action_needed": 408,
    "payment_pending": 557,
    "in_progress": 128,
    "completed": 605,
    "total_price": 10645
  }, {
    "id": 100,
    "brand_name": "Halobetasol Propionate",
    "draft": 761,
    "under_review": 594,
    "action_needed": 323,
    "payment_pending": 20,
    "in_progress": 120,
    "completed": 319,
    "total_price": 97259
  }]

  const [pending, setPending] = useState(true);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);
  const [data, setData] = React.useState();
  const [viewModal, setViewModal] = useState(false);
  const [image, setimage] = useState("");
  const [name, setname] = useState("");
  const [payment, setpayment] = useState(false);
  const [platform, setplatform] = useState("");
  const [date, setdate] = useState("");
  const [status, setstatus] = useState(0);
  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);

  const [assetList, setAssetList] = useState([]);
  const fetchAsset = async() =>{
    await axios.get('https://xrcdashboard.onrender.com/admin/getAssets').then(res =>{
      setData(res.data.assets)
      console.log(res.data.assets)
  }).catch(e=>console.log(e))
  setPending(false)
  }

  useEffect(() => {
    setPending(true);
    fetchAsset()
    // setPending(false);  
  }, []);


  const handleRowSelected = React.useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  const ale = (a, row) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: true,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: `You want to delete this `,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          var name = [];
          selectedRows.map((row) => {
            name.push(row.assetName);
          });
          console.log({
            brand: row.brandName,
            name: [row.assetName],
          });
          await axios
            .delete("http://localhost:5000/brands/delete", {
              data: {
                brand: row.brandName,
                name: [row.assetName],
              },
            })
            .then((res) => {
              setPending(true);
              fetchAsset();
              setAssetList(data);
              const timeout = setTimeout(() => {
                setPending(false);
              }, 1000);
              swalWithBootstrapButtons.fire(
                "Deleted!",
                "Your file has been deleted.",
                "success"
              );
              return () => clearTimeout(timeout);
            })
            .catch(() => alert("Something Went Wrong"));

          setData(differenceBy(data, [row], "id"));
          swalWithBootstrapButtons.fire(
            "Deleted!",
            "Your file has been deleted.",
            "success"
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          this.successalt("error", "Cancelled");
        }
      });
  };

  const handleDelete = (row) => {
    console.log("elo");
    ale("Delete", row);
  };

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
    var price = 0;
    selectedRows.map((r) => {
      if (Number(r.budget)) {
        price += r.budget;
      }
    });
    return (
      <>
        <div>
          <h6 className="p-4 h-100">${price}</h6>
        </div>
        <IoBagCheckOutline onClick={() => handlePayTotal(price)} />
        <FaTrashAlt key="delete" onClick={handleDelete} className="m-4" icon />
      </>
    );
  }, [data, selectedRows, toggleCleared]);
  const { brand } = useParams();
  const handleDeleteAll = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: true,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: `Are you sure you want to delete:\r ${selectedRows.map(
          (r) => r.name
        )}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          setToggleCleared(!toggleCleared);
          var name = [];
          selectedRows.map((row) => {
            name.push(row.assetName);
          });
          console.log({
            brand: brand,
            name: name,
          });
          await axios
            .delete("http://localhost:5000/brands/delete", {
              data: {
                brand: brand,
                name: name,
              },
            })
            .then((res) => {
              setPending(true);
              fetchAsset();
              setAssetList(data);
              const timeout = setTimeout(() => {
                setPending(false);
              }, 1000);
              swalWithBootstrapButtons.fire(
                "Deleted!",
                "Your file has been deleted.",
                "success"
              );
              return () => clearTimeout(timeout);
            })
            .catch(() => alert("Something Went Wrong"));
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          this.successalt("error", "Cancelled");
        }
      });
  };
  return (
    <div className="p-2 mb-4">
      <h1 style={{ color: "white" }}>All Brands</h1>
      <div className="tables mt-4" style={{ position: "relative" }}>
        <DataTable
          columns={columns}
          className="data-table"
          data={data}
          // selectableRows
          // contextActions={contextActions}
          // onSelectedRowsChange={handleRowSelected}
          progressPending={pending}
          paginationPerPage={5}
          paginationRowsPerPageOptions={[5, 10, 25, 50, 100]}
          paginationResetDefaultPage={resetPaginationToggle}
          // clearSelectedRows={toggleCleared}
          pagination
          // selectableRowDisabled={rowDisabledCriteria}
          // persistTableHead
          progressComponent={<CustomLoader />}
          // conditionalRowStyles={conditionalRowStyles}
        />
      </div>
      {selectedRows.length > 0 && (
        <button
          className="btn btn-primary m-4"
          style={{
            float: "right",
            marginBottom: "150px",
            zIndex: "1000000000",
          }}
          onClick={(e) => alert("Pay")}
        >
          {" "}
          Pay
        </button>
      )}
      {selectedRows.length > 0 && (
        <button
          className="btn btn-danger m-4"
          style={{
            float: "right",
            marginBottom: "150px",
            zIndex: "1000000000",
          }}
          onClick={(e) => handleDeleteAll()}
        >
          {" "}
          Delete
        </button>
      )}
      <Modal
        size="lg"
        show={viewModal}
        onHide={() => setViewModal(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">{name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
              <img
                src={image}
                alt="image"
                style={{ width: "80%", height: "auto" }}
              />
            </div>
            <div className="col-md-6">
              <div className="row">
                <div className="col-md-6">Name - </div>
                <div className="col-md-6">{name}</div>
              </div>
              <div className="row">
                <div className="col-md-6">Payment - </div>
                <div className="col-md-6">{payment ? "Paid" : "Not Paid"}</div>
              </div>
              <div className="row">
                <div className="col-md-6">Platform - </div>
                <div className="col-md-6">{platform}</div>
              </div>
              <div className="row">
                <div className="col-md-6">EDD - </div>
                <div className="col-md-6">{date}</div>
              </div>
              <div className="row">
                <div className="col-md-6">Progress - </div>
                <div className="col-md-6">
                  <ProgressBar1
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
                  />
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

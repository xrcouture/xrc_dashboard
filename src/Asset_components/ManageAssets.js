import React from 'react'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import './ManageAssets.css'
import MyComponent from './basic';
import ListPage from '../components/common/ListPage'
import Notification from '../components/Notificatoin/Notification';
function ManageAssets() {
  // const columns = [
  //   {
  //     name: 'Candidate',
  //     selector: 'name',
  //     sortable: true,
  //     cell: (row) => (
  //       <div>
  //         <span>{row?.student?.studentname}</span>
  //         <br />
  //         <span>{row?.rollno}</span>
  //       </div>
  //     ),
  //   },

  //   {
  //     name: 'Mobile Number',
  //     selector: 'departmentLogoURL',
  //     sortable: true,
  //     cell: (row) => (
  //       <div>
  //         <span>{row?.student?.phone_number}</span>
  //         <br />
  //         <span>{row?.phone_number2}</span>
  //       </div>
  //     ),
  //   },
  //   {
  //     name: 'Hostel',
  //     selector: 'departmentLogoURL',
  //     sortable: true,
  //     cell: (row) => (
  //       <div>
  //         <span>{row?.student?.hostel}</span>
  //         <br />
  //         <span>{row?.student?.roomno}</span>
  //       </div>
  //     ),
  //   },
  //   {
  //     name: 'Submitted on',
  //     selector: 'submitted_on',
  //     sortable: true,
  //     cell: (row) => <span>{row?.submitted_on}</span>,
  //   },
  //   {
  //     name: 'Last Updated On',
  //     selector: 'updated_on',
  //     sortable: true,
  //     cell: (row) => <span>{row?.updated_on}</span>,
  //   },
  //   {
  //     name: 'Complaint Type',
  //     selector: 'complaint_type',
  //     sortable: true,
  //     cell: (row) => <span>{row?.complaint_type}</span>,
  //   },
  //   {
  //     name: 'Complaint',
  //     selector: 'Complaint',
  //     sortable: true,
  //     cell: (row) => <span>{row?.complaint}</span>,
  //   },
  //   {
  //     name: 'Status',
  //     selector: 'complaint_status',
  //     sortable: true,
  //     cell: (row) => (
  //       <div>
  //         {row?.complaint_status == 'On Hold' && (
  //           <b style={{ color: 'red' }}>{row?.complaint_status}</b>
  //         )}
  //         {row?.complaint_status == 'On Progress' && (
  //           <b style={{ color: 'orange' }}>{row?.complaint_status}</b>
  //         )}
  //         {row?.complaint_status == 'Completed' && (
  //           <b style={{ color: 'green' }}>{row?.complaint_status}</b>
  //         )}
  //         {row?.complaint_status == 'Open' && (
  //           <b style={{ color: 'blue' }}>{row?.complaint_status}</b>
  //         )}
  //         {row?.complaint_status == 'Resolved' && (
  //           <b style={{ color: 'black' }}>{row?.complaint_status}</b>
  //         )}
  //       </div>
  //     ),
  //   },
  //   {
  //     name: 'Worker',
  //     selector: 'departmentLogoURL',
  //     sortable: true,
  //     cell: (row) => (
  //       <div>
  //         {row?.worker == null ? (
  //           <b style={{ color: 'orange' }}>Not Assigned</b>
  //         ) : (
  //           <div>
  //             <span>{row?.worker?.name}</span>
  //             <br />
  //             <span>{row?.worker?.phone_number}</span>
  //           </div>
  //         )}
  //       </div>
  //     ),
  //   },
  //   {
  //     name: 'Action',
  //     selector: 'action',
  //     sortable: false,
  //     cell: (row) => (
  //       <Row>
  //         <span onClick={() => this.addBtnClick(row)}>
  //           {' '}
  //           <i className="fas fas fa-edit text-success" />
  //           {/* <i className="fas fa-pencil-alt text-success mr-1" /> */}
  //         </span>
  //         {/* <Button
  //             outline
  //             color="danger"
  //             className="mobileViewFonts pl-1 pr-1 ml-2"
  //             onClick={() => this.toggleDeleteModal(row)}
  //           >
  //             Delete
  //           </Button> */}
  //         {/* </ButtonGroup> */}
  //         {/* <UncontrolledDropdown>
  //           <DropdownToggle className="card-drop" tag="i">
  //             <i className="fas fa-list text-danger mr-1" />
  //           </DropdownToggle>
  //           <DropdownMenu>
  //             <DropdownItem
  //               onClick={() => {
  //                 this.handleEdit(row)
  //               }}
  //             >
  //               <i className="fas fa-pencil-alt text-success mr-1" />
  //               <span> Edit</span>
  //             </DropdownItem>

  //             <DropdownItem onClick={() => this.toggleDeleteModal(row)}>
  //               <i className="fas fa-trash-alt text-danger mr-1" />
  //               <span> Delete</span>
  //             </DropdownItem>
  //           </DropdownMenu>
  //         </UncontrolledDropdown> */}
  //       </Row>
  //     ),
  //   },
  // ]

  return (
    <div className='manage-assets container'>
        <Notification />
        <MyComponent />
    </div>
  )
}

export default ManageAssets
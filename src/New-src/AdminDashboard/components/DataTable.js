import React,{useState} from 'react';
import DataTable from 'react-data-table-component';
import FilterComponent from 'react-data-table-component-with-filter';
import Swal from 'sweetalert2'
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import axios from 'axios';
import ProgressBar from 'react-bootstrap/ProgressBar';
import differenceBy from 'lodash/differenceBy'
const sortIcon = <ArrowDownward />;
const selectProps = { indeterminate: isIndeterminate => isIndeterminate };

function DataTableBase(props){
	const [filterText, setFilterText] = React.useState('');

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
	// const filteredItems = props.data.filter(
	// 	item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()),
	// );
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
		  .then((result) => {
			if (result.isConfirmed) {
			  console.log(row)
			  swalWithBootstrapButtons.fire('Deleted!', 'Your file has been deleted.', 'success')
			} else if (
			  /* Read more about handling dismissals below */
			  result.dismiss === Swal.DismissReason.cancel
			) {
			  this.successalt('error', 'Cancelled')
			}
		  })
	  }
	const columns = [
		{
			name: 'Image',
			selector: 'image',
			sortable: true,
			cell:(row)=>(
			  <div>
				<img src={row.image} style={{width:"100px",height:"100px"}}/>
			  </div>
			)
		},
		{
			name: 'Name',
			selector: 'assetName',
			sortable: true,
			cell:(row)=>(
			  <p>{row.assetName}</p>
			)
		},
		{
			name: 'Price',
			selector: 'budget',
			sortable:true,
			cell:(row)=>(
			  <h6>{row.budget}</h6>
			)
		},
		{
			name: 'EDD',
			selector: row => row.estimatedTime,
			sortable:true
		},
		{
			name: 'Platform',
			selector: row => row.platform,
			sortable:true
		},
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
		{
			name: 'Update',
			selector: row => (
			  row.status < 100 ?
			  <i class="fa fa-pencil-square-o" style={{fontSize:"20px"}} aria-hidden="true" onClick={() => console.log(row)}></i>:
			  <i class="fa fa-pencil-square-o" style={{fontSize:"20px"}} aria-hidden="true" ></i>
		  ),
		},
		{
			name: 'Delete',
			selector: row => (
			  row.payment ?
			  <i class="fa fa-ban" style={{fontSize:"20px"}} aria-hidden="true"></i>:
			  <i class="fa fa-trash-o" aria-hidden="true" style={{fontSize:"20px"}} onClick={()=>handleDelete(row)}></i>
		  ),
		},
		{
			name: 'View',
			selector: row => (
			  <i class="fa fa-eye" aria-hidden="true"style={{fontSize:"20px"}} onClick={() => handleView(row)}></i>
		  ),
		},
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
	const [assetList,setAssetList] = useState()
	const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
	const [image, setimage] = useState("")
	const [name, setname] = useState("")
	const [payment, setpayment] = useState(false)
	const [platform, setplatform] = useState("")
	const [date, setdate] = useState("")
	const [status, setstatus] = useState(0)
	const [viewModal, setViewModal] = useState(false)
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
	  const handleDelete = (row) => {
		console.log("elo")
		ale("Delete",row)
	  }
	  const fetchAsset = async() =>{
		await axios.post('http://localhost:5000/brands/assets',{
		  brand:"Zara"
		}).then(res =>{
		setAssetList(res.data.assets)})
	  }
	const subHeaderComponentMemo = React.useMemo(() => {
		const handleClear = () => {
			if (filterText) {
				setResetPaginationToggle(!resetPaginationToggle);
				setFilterText('');
			}
		};

		return (
			<FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
		);
	}, [filterText, resetPaginationToggle]);

	return (
		<DataTable
			title="Asset Lists"
            className='data-table'
			pagination
			paginationResetDefaultPage={resetPaginationToggle}
			persistTableHead
            {...props}
		/>
	);
}

export default DataTableBase;
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
	// const ale = (a,row) => {
	// 	const swalWithBootstrapButtons = Swal.mixin({
	// 	  customClass: {
	// 		confirmButton: 'btn btn-success',
	// 		cancelButton: 'btn btn-danger',
	// 	  },
	// 	  buttonsStyling: true,
	// 	})
	
	// 	swalWithBootstrapButtons
	// 	  .fire({
	// 		title: 'Are you sure?',
	// 		text: `You want to delete this `,
	// 		icon: 'warning',
	// 		showCancelButton: true,
	// 		confirmButtonText: 'Yes',
	// 		cancelButtonText: 'No, cancel!',
	// 		reverseButtons: true,
	// 	  })
	// 	  .then((result) => {
	// 		if (result.isConfirmed) {
	// 		  console.log(row)
	// 		  setData(differenceBy(data, [row], 'id'));
	// 		  swalWithBootstrapButtons.fire('Deleted!', 'Your file has been deleted.', 'success')
	// 		} else if (
	// 		  /* Read more about handling dismissals below */
	// 		  result.dismiss === Swal.DismissReason.cancel
	// 		) {
	// 		  this.successalt('error', 'Cancelled')
	// 		}
	// 	  })
	//   }
	// }

	const [assetList,setAssetList] = useState()
	const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
	const [image, setimage] = useState("")
	const [name, setname] = useState("")
	const [payment, setpayment] = useState(false)
	const [platform, setplatform] = useState("")
	const [date, setdate] = useState("")
	const [status, setstatus] = useState(0)
	const [viewModal, setViewModal] = useState(false)

	return (
		<DataTable
			// title="Asset Lists"
            className='data-table'
			pagination
			paginationResetDefaultPage={resetPaginationToggle}
			persistTableHead
            {...props}
		/>
	);
}

export default DataTableBase;
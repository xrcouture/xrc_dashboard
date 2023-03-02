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
	const filteredItems = props.data.filter(
		item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()),
	);
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
			  setData(differenceBy(data, [row], 'id'));
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
	const d = [{
	  "id": 1,
	  "name": "Dal Creedland",
	  "price": 36,
	  "platform": "Monahan-Padberg",
	  "status": 80,
	  "payment": false,
	  "date": "24/01/2024"
	}, {
	  "id": 2,
	  "name": "Andeee Weedon",
	  "price": 44,
	  "platform": "Lakin and Sons",
	  "status": 57,
	  "payment": true,
	  "date": "16/03/2023"
	}, {
	  "id": 3,
	  "name": "Marlon Cordel",
	  "price": 77,
	  "platform": "Padberg-Ratke",
	  "status": 31,
	  "payment": false,
	  "date": "28/03/2024"
	}, {
	  "id": 4,
	  "name": "Ramon Deluce",
	  "price": 12,
	  "platform": "Runolfsdottir, Hintz and Tremblay",
	  "status": 9,
	  "payment": false,
	  "date": "13/07/2023"
	}, {
	  "id": 5,
	  "name": "Albertina Glascott",
	  "price": 87,
	  "platform": "Nikolaus Group",
	  "status": 4,
	  "payment": false,
	  "date": "03/08/2023"
	}, {
	  "id": 6,
	  "name": "Katharine Paulich",
	  "price": 31,
	  "platform": "Hintz, O'Keefe and Mohr",
	  "status": 92,
	  "payment": false,
	  "date": "26/05/2023"
	}, {
	  "id": 7,
	  "name": "Kenny Hum",
	  "price": 32,
	  "platform": "Aufderhar Group",
	  "status": 14,
	  "payment": true,
	  "date": "12/12/2023"
	}, {
	  "id": 8,
	  "name": "Fancy Money",
	  "price": 92,
	  "platform": "Cremin, Sawayn and Ernser",
	  "status": 87,
	  "payment": false,
	  "date": "21/06/2023"
	}, {
	  "id": 9,
	  "name": "Hildagarde Stapele",
	  "price": 93,
	  "platform": "Goodwin LLC",
	  "status": 75,
	  "payment": false,
	  "date": "24/04/2024"
	}, {
	  "id": 10,
	  "name": "Yankee McCarthy",
	  "price": 78,
	  "platform": "Ratke, Kerluke and Hamill",
	  "status": 89,
	  "payment": false,
	  "date": "26/03/2024"
	}, {
	  "id": 11,
	  "name": "Cathee Lipson",
	  "price": 65,
	  "platform": "Kutch, Roob and Hickle",
	  "status": 33,
	  "payment": true,
	  "date": "03/05/2023"
	}, {
	  "id": 12,
	  "name": "Kaine Bolderson",
	  "price": 28,
	  "platform": "Murray Group",
	  "status": 99,
	  "payment": true,
	  "date": "12/07/2023"
	}, {
	  "id": 13,
	  "name": "Adrianna Radwell",
	  "price": 11,
	  "platform": "Greenholt, Barton and Boyle",
	  "status": 62,
	  "payment": true,
	  "date": "09/01/2024"
	}, {
	  "id": 14,
	  "name": "Gabi Paybody",
	  "price": 45,
	  "platform": "Romaguera-Rath",
	  "status": 31,
	  "payment": true,
	  "date": "26/06/2023"
	}, {
	  "id": 15,
	  "name": "Claudius Rivenzon",
	  "price": 76,
	  "platform": "Rogahn, Pfannerstill and Rath",
	  "status": 75,
	  "payment": false,
	  "date": "20/04/2023"
	}, {
	  "id": 16,
	  "name": "Fin Bakhrushin",
	  "price": 92,
	  "platform": "Lind, Cummerata and Turner",
	  "status": 14,
	  "payment": false,
	  "date": "17/07/2023"
	}, {
	  "id": 17,
	  "name": "Sherri Fassam",
	  "price": 55,
	  "platform": "Lueilwitz, Bartell and Senger",
	  "status": 14,
	  "payment": true,
	  "date": "10/12/2023"
	}, {
	  "id": 18,
	  "name": "Anitra Hintze",
	  "price": 93,
	  "platform": "Schuppe Inc",
	  "status": 83,
	  "payment": true,
	  "date": "09/02/2024"
	}, {
	  "id": 19,
	  "name": "Gale Meier",
	  "price": 74,
	  "platform": "Lemke, Deckow and Gutkowski",
	  "status": 75,
	  "payment": true,
	  "date": "24/03/2024"
	}, {
	  "id": 20,
	  "name": "Allis Bretland",
	  "price": 34,
	  "platform": "Kihn-Franecki",
	  "status": 40,
	  "payment": true,
	  "date": "26/08/2023"
	}, {
	  "id": 21,
	  "name": "Parnell Wealleans",
	  "price": 66,
	  "platform": "Glover-Kessler",
	  "status": 36,
	  "payment": false,
	  "date": "13/07/2023"
	}, {
	  "id": 22,
	  "name": "Pietrek Stather",
	  "price": 92,
	  "platform": "Grimes LLC",
	  "status": 80,
	  "payment": true,
	  "date": "14/08/2023"
	}, {
	  "id": 23,
	  "name": "Tammy Viger",
	  "price": 99,
	  "platform": "Crona LLC",
	  "status": 69,
	  "payment": true,
	  "date": "19/05/2023"
	}, {
	  "id": 24,
	  "name": "Bianca Sondland",
	  "price": 74,
	  "platform": "Bashirian-Leuschke",
	  "status": 74,
	  "payment": true,
	  "date": "15/10/2023"
	}, {
	  "id": 25,
	  "name": "Shaylynn Kermit",
	  "price": 75,
	  "platform": "Lehner, Ward and Harber",
	  "status": 35,
	  "payment": false,
	  "date": "31/08/2023"
	}, {
	  "id": 26,
	  "name": "Asher Delcastel",
	  "price": 57,
	  "platform": "Hartmann-Torphy",
	  "status": 41,
	  "payment": true,
	  "date": "30/07/2023"
	}, {
	  "id": 27,
	  "name": "Vally Delamere",
	  "price": 22,
	  "platform": "Mann LLC",
	  "status": 74,
	  "payment": true,
	  "date": "22/05/2023"
	}, {
	  "id": 28,
	  "name": "Hewie Pawelek",
	  "price": 76,
	  "platform": "Klein-Runte",
	  "status": 10,
	  "payment": false,
	  "date": "25/03/2023"
	}, {
	  "id": 29,
	  "name": "Arlina Castiglio",
	  "price": 78,
	  "platform": "Bednar-Halvorson",
	  "status": 12,
	  "payment": true,
	  "date": "02/05/2024"
	}, {
	  "id": 30,
	  "name": "Darby Weakley",
	  "price": 73,
	  "platform": "Streich, Bogisich and Lindgren",
	  "status": 94,
	  "payment": false,
	  "date": "03/04/2024"
	}, {
	  "id": 31,
	  "name": "Kyle Duquesnay",
	  "price": 72,
	  "platform": "Jacobs, Marquardt and Dickinson",
	  "status": 4,
	  "payment": true,
	  "date": "01/09/2023"
	}, {
	  "id": 32,
	  "name": "Pegeen Depke",
	  "price": 25,
	  "platform": "Russel-Johns",
	  "status": 51,
	  "payment": true,
	  "date": "31/03/2024"
	}, {
	  "id": 33,
	  "name": "Ethelred Dedman",
	  "price": 29,
	  "platform": "Olson Group",
	  "status": 96,
	  "payment": true,
	  "date": "25/03/2024"
	}, {
	  "id": 34,
	  "name": "Corinne Goodson",
	  "price": 55,
	  "platform": "Deckow LLC",
	  "status": 32,
	  "payment": false,
	  "date": "09/09/2023"
	}, {
	  "id": 35,
	  "name": "Philip Wrefford",
	  "price": 84,
	  "platform": "Williamson and Sons",
	  "status": 74,
	  "payment": false,
	  "date": "19/06/2023"
	}, {
	  "id": 36,
	  "name": "Udell Borland",
	  "price": 88,
	  "platform": "Ferry, Prosacco and Rowe",
	  "status": 89,
	  "payment": false,
	  "date": "31/03/2024"
	}, {
	  "id": 37,
	  "name": "Deonne Kilmary",
	  "price": 43,
	  "platform": "Dickens-Kub",
	  "status": 38,
	  "payment": false,
	  "date": "19/04/2023"
	}, {
	  "id": 38,
	  "name": "Nicola Hughf",
	  "price": 69,
	  "platform": "Bednar Inc",
	  "status": 90,
	  "payment": true,
	  "date": "02/05/2024"
	}, {
	  "id": 39,
	  "name": "Renae Tomasik",
	  "price": 64,
	  "platform": "Medhurst and Sons",
	  "status": 51,
	  "payment": true,
	  "date": "18/01/2024"
	}, {
	  "id": 40,
	  "name": "Gabie Ector",
	  "price": 24,
	  "platform": "Funk-Reynolds",
	  "status": 8,
	  "payment": false,
	  "date": "27/02/2024"
	}, {
	  "id": 41,
	  "name": "Patten Vasishchev",
	  "price": 56,
	  "platform": "Wolff-Lindgren",
	  "status": 81,
	  "payment": false,
	  "date": "14/03/2024"
	}, {
	  "id": 42,
	  "name": "Mirabella Blazy",
	  "price": 34,
	  "platform": "Dickens-Keebler",
	  "status": 62,
	  "payment": true,
	  "date": "29/12/2023"
	}, {
	  "id": 43,
	  "name": "Aymer Rabier",
	  "price": 79,
	  "platform": "Pfeffer, Koch and Braun",
	  "status": 96,
	  "payment": true,
	  "date": "23/04/2023"
	}, {
	  "id": 44,
	  "name": "Wood Van der Daal",
	  "price": 67,
	  "platform": "Koss LLC",
	  "status": 85,
	  "payment": true,
	  "date": "11/05/2023"
	}, {
	  "id": 45,
	  "name": "Teddi Sancias",
	  "price": 32,
	  "platform": "Halvorson, McClure and Robel",
	  "status": 41,
	  "payment": true,
	  "date": "23/11/2023"
	}, {
	  "id": 46,
	  "name": "Evonne Skellon",
	  "price": 24,
	  "platform": "Romaguera and Sons",
	  "status": 32,
	  "payment": true,
	  "date": "02/03/2024"
	}, {
	  "id": 47,
	  "name": "Sergent Reedy",
	  "price": 44,
	  "platform": "MacGyver-Stamm",
	  "status": 29,
	  "payment": false,
	  "date": "09/05/2024"
	}, {
	  "id": 48,
	  "name": "Vanna Drains",
	  "price": 19,
	  "platform": "Hickle, Shanahan and Bailey",
	  "status": 59,
	  "payment": false,
	  "date": "25/12/2023"
	}, {
	  "id": 49,
	  "name": "Saunders Greetham",
	  "price": 84,
	  "platform": "Deckow-Dickinson",
	  "status": 44,
	  "payment": false,
	  "date": "09/01/2024"
	}, {
	  "id": 50,
	  "name": "Deb Hubbock",
	  "price": 74,
	  "platform": "Wolff, Luettgen and Dicki",
	  "status": 25,
	  "payment": false,
	  "date": "20/09/2023"
	}, {
	  "id": 51,
	  "name": "Aldrich Patriche",
	  "price": 64,
	  "platform": "Schamberger Group",
	  "status": 20,
	  "payment": true,
	  "date": "23/04/2023"
	}, {
	  "id": 52,
	  "name": "Hernando Lothlorien",
	  "price": 86,
	  "platform": "Koepp, Satterfield and McCullough",
	  "status": 51,
	  "payment": false,
	  "date": "13/08/2023"
	}, {
	  "id": 53,
	  "name": "Helli Munkley",
	  "price": 58,
	  "platform": "Schmidt, Terry and Leffler",
	  "status": 1,
	  "payment": true,
	  "date": "23/06/2023"
	}, {
	  "id": 54,
	  "name": "Glynn Babon",
	  "price": 86,
	  "platform": "Goldner, Buckridge and Legros",
	  "status": 98,
	  "payment": true,
	  "date": "15/03/2023"
	}, {
	  "id": 55,
	  "name": "Othello Andersch",
	  "price": 50,
	  "platform": "Schinner-Kiehn",
	  "status": 95,
	  "payment": false,
	  "date": "09/03/2024"
	}, {
	  "id": 56,
	  "name": "Claybourne Jakoubec",
	  "price": 11,
	  "platform": "Larkin Group",
	  "status": 9,
	  "payment": false,
	  "date": "09/10/2023"
	}, {
	  "id": 57,
	  "name": "Garnette Pietersma",
	  "price": 90,
	  "platform": "Sawayn-Oberbrunner",
	  "status": 56,
	  "payment": true,
	  "date": "20/08/2023"
	}, {
	  "id": 58,
	  "name": "Bettine Piesold",
	  "price": 10,
	  "platform": "VonRueden LLC",
	  "status": 20,
	  "payment": true,
	  "date": "22/02/2024"
	}, {
	  "id": 59,
	  "name": "Coop Cordeux",
	  "price": 56,
	  "platform": "Heidenreich and Sons",
	  "status": 2,
	  "payment": true,
	  "date": "05/10/2023"
	}, {
	  "id": 60,
	  "name": "Deborah Oda",
	  "price": 44,
	  "platform": "Lockman Inc",
	  "status": 87,
	  "payment": false,
	  "date": "23/04/2023"
	}, {
	  "id": 61,
	  "name": "Letti Mellor",
	  "price": 89,
	  "platform": "Huels, Nitzsche and Bradtke",
	  "status": 40,
	  "payment": true,
	  "date": "27/05/2024"
	}, {
	  "id": 62,
	  "name": "Raquela Swinerd",
	  "price": 51,
	  "platform": "Mayert-Lehner",
	  "status": 46,
	  "payment": true,
	  "date": "18/10/2023"
	}, {
	  "id": 63,
	  "name": "Whitney Ellinor",
	  "price": 14,
	  "platform": "Rath Inc",
	  "status": 51,
	  "payment": false,
	  "date": "07/08/2023"
	}, {
	  "id": 64,
	  "name": "Gamaliel Stringer",
	  "price": 22,
	  "platform": "Ruecker-Bednar",
	  "status": 90,
	  "payment": false,
	  "date": "20/08/2023"
	}, {
	  "id": 65,
	  "name": "Padgett Flintoft",
	  "price": 90,
	  "platform": "Boyle, Mitchell and Franecki",
	  "status": 6,
	  "payment": true,
	  "date": "14/05/2024"
	}, {
	  "id": 66,
	  "name": "Eolande Ormerod",
	  "price": 28,
	  "platform": "Collins, Mertz and Moore",
	  "status": 12,
	  "payment": true,
	  "date": "31/08/2023"
	}, {
	  "id": 67,
	  "name": "Loleta Fishley",
	  "price": 100,
	  "platform": "Ward and Sons",
	  "status": 75,
	  "payment": false,
	  "date": "01/03/2024"
	}, {
	  "id": 68,
	  "name": "Maud Drayson",
	  "price": 27,
	  "platform": "Bauch-Swaniawski",
	  "status": 40,
	  "payment": true,
	  "date": "03/05/2024"
	}, {
	  "id": 69,
	  "name": "Marti Fetherston",
	  "price": 10,
	  "platform": "Bartoletti-Mraz",
	  "status": 12,
	  "payment": false,
	  "date": "27/05/2024"
	}, {
	  "id": 70,
	  "name": "Maggy Treece",
	  "price": 17,
	  "platform": "O'Connell, Bergstrom and Sanford",
	  "status": 87,
	  "payment": true,
	  "date": "21/01/2024"
	}, {
	  "id": 71,
	  "name": "Zara Bellay",
	  "price": 46,
	  "platform": "Ondricka and Sons",
	  "status": 92,
	  "payment": true,
	  "date": "07/02/2024"
	}, {
	  "id": 72,
	  "name": "Clarisse O' Cloney",
	  "price": 27,
	  "platform": "Walter-Muller",
	  "status": 41,
	  "payment": false,
	  "date": "29/06/2023"
	}, {
	  "id": 73,
	  "name": "Sallee Hannan",
	  "price": 66,
	  "platform": "Schimmel LLC",
	  "status": 79,
	  "payment": true,
	  "date": "16/10/2023"
	}, {
	  "id": 74,
	  "name": "Calhoun Suarez",
	  "price": 16,
	  "platform": "Pfeffer Inc",
	  "status": 78,
	  "payment": true,
	  "date": "15/10/2023"
	}, {
	  "id": 75,
	  "name": "Tammi Verdey",
	  "price": 48,
	  "platform": "Mante Inc",
	  "status": 96,
	  "payment": false,
	  "date": "25/05/2024"
	}, {
	  "id": 76,
	  "name": "Maxwell Voase",
	  "price": 10,
	  "platform": "Parisian, Bechtelar and Kohler",
	  "status": 10,
	  "payment": true,
	  "date": "02/12/2023"
	}, {
	  "id": 77,
	  "name": "Jerrie Sothcott",
	  "price": 57,
	  "platform": "Gaylord-Howe",
	  "status": 24,
	  "payment": false,
	  "date": "22/05/2024"
	}, {
	  "id": 78,
	  "name": "Verena Heinicke",
	  "price": 37,
	  "platform": "Watsica Group",
	  "status": 92,
	  "payment": false,
	  "date": "12/09/2023"
	}, {
	  "id": 79,
	  "name": "Ronnie Monteaux",
	  "price": 41,
	  "platform": "Dickens Inc",
	  "status": 58,
	  "payment": false,
	  "date": "05/09/2023"
	}, {
	  "id": 80,
	  "name": "Marietta Clamp",
	  "price": 5,
	  "platform": "Mueller-O'Hara",
	  "status": 20,
	  "payment": true,
	  "date": "04/11/2023"
	}, {
	  "id": 81,
	  "name": "Bevan Rubinfeld",
	  "price": 25,
	  "platform": "Wilderman Group",
	  "status": 13,
	  "payment": false,
	  "date": "17/04/2024"
	}, {
	  "id": 82,
	  "name": "Marget Winwright",
	  "price": 93,
	  "platform": "Parker and Sons",
	  "status": 18,
	  "payment": false,
	  "date": "03/11/2023"
	}, {
	  "id": 83,
	  "name": "Matti Presland",
	  "price": 56,
	  "platform": "Erdman LLC",
	  "status": 55,
	  "payment": true,
	  "date": "21/02/2024"
	}, {
	  "id": 84,
	  "name": "Alan Ballister",
	  "price": 45,
	  "platform": "Ryan, Kuhic and Conroy",
	  "status": 49,
	  "payment": false,
	  "date": "05/02/2024"
	}, {
	  "id": 85,
	  "name": "Merilee Burnip",
	  "price": 83,
	  "platform": "Bartell-Kshlerin",
	  "status": 87,
	  "payment": false,
	  "date": "08/01/2024"
	}, {
	  "id": 86,
	  "name": "Penni Entwisle",
	  "price": 32,
	  "platform": "Morissette, Christiansen and Sporer",
	  "status": 15,
	  "payment": false,
	  "date": "25/05/2024"
	}, {
	  "id": 87,
	  "name": "Florina Hanssmann",
	  "price": 90,
	  "platform": "Schamberger LLC",
	  "status": 79,
	  "payment": true,
	  "date": "23/06/2023"
	}, {
	  "id": 88,
	  "name": "Brannon Dael",
	  "price": 27,
	  "platform": "Wyman-Koelpin",
	  "status": 13,
	  "payment": false,
	  "date": "03/10/2023"
	}, {
	  "id": 89,
	  "name": "Rustin Granham",
	  "price": 8,
	  "platform": "Robel-Tromp",
	  "status": 95,
	  "payment": false,
	  "date": "07/10/2023"
	}, {
	  "id": 90,
	  "name": "Shurlock Erskin",
	  "price": 9,
	  "platform": "Flatley-Simonis",
	  "status": 81,
	  "payment": true,
	  "date": "26/06/2023"
	}, {
	  "id": 91,
	  "name": "Darcey Quogan",
	  "price": 92,
	  "platform": "Boehm, Jerde and Torp",
	  "status": 89,
	  "payment": false,
	  "date": "24/09/2023"
	}, {
	  "id": 92,
	  "name": "Jerrold Leyden",
	  "price": 33,
	  "platform": "Bernhard-Oberbrunner",
	  "status": 1,
	  "payment": false,
	  "date": "09/05/2023"
	}, {
	  "id": 93,
	  "name": "Bud Duffit",
	  "price": 31,
	  "platform": "Stokes, Crona and Schimmel",
	  "status": 96,
	  "payment": false,
	  "date": "15/10/2023"
	}, {
	  "id": 94,
	  "name": "Zackariah Yakovitch",
	  "price": 68,
	  "platform": "Dare, Johnston and Dach",
	  "status": 40,
	  "payment": false,
	  "date": "23/12/2023"
	}, {
	  "id": 95,
	  "name": "Jason Littleover",
	  "price": 74,
	  "platform": "Prosacco Group",
	  "status": 25,
	  "payment": true,
	  "date": "19/09/2023"
	}, {
	  "id": 96,
	  "name": "Lorens Saladine",
	  "price": 66,
	  "platform": "Miller-Goodwin",
	  "status": 95,
	  "payment": true,
	  "date": "12/06/2023"
	}, {
	  "id": 97,
	  "name": "Hansiain Jarad",
	  "price": 70,
	  "platform": "Rippin Group",
	  "status": 98,
	  "payment": true,
	  "date": "11/11/2023"
	}, {
	  "id": 98,
	  "name": "Arliene Konke",
	  "price": 65,
	  "platform": "O'Hara, Boyle and Boyle",
	  "status": 95,
	  "payment": true,
	  "date": "17/05/2024"
	}, {
	  "id": 99,
	  "name": "Koo Kahn",
	  "price": 42,
	  "platform": "Kulas-White",
	  "status": 2,
	  "payment": true,
	  "date": "11/03/2023"
	}, {
	  "id": 100,
	  "name": "Paulie Castagneto",
	  "price": 36,
	  "platform": "Nikolaus LLC",
	  "status": 18,
	  "payment": true,
	  "date": "19/07/2023"
	}]
	const [assetList,setAssetList] = useState()
	const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
	const [data, setData] = React.useState(d);
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
            // data={filteredItems}
			pagination
			paginationResetDefaultPage={resetPaginationToggle}
			// subHeaderComponent={subHeaderComponentMemo}
			selectableRows
			persistTableHead
            {...props}
		/>
	);
}

export default DataTableBase;
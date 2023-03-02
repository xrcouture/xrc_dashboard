import React from 'react'
import { DropdownMenu, DropdownItem, Row, Col } from 'reactstrap'
import PropTypes from 'prop-types'
import { cilBell, cilEnvelopeOpen, cilList, cilMenu } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { envss } from '../../../envs'
// import { getItemFromLocalStorage } from '../loacls'
import axios from 'axios'
import Swal from 'sweetalert2'

class Notification extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      datas: [],
    }
  }

  componentDidMount() {
    // const a = getItemFromLocalStorage('key')

    if (a != '') {
      this.getAllDepartments()
    } else {
      // localStorage.clear()
      window.location.href = '/login'
    }
  }
  successalt = (a, x) => {
    Swal.fire({
      position: 'center',
      icon: a,
      title: x,
      showConfirmButton: false,
      timer: 1500,
    })
  }

  ale = (b, a, t) => {
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
        text: t,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          if (b == 'n') {
            this.handlecross(a)
          } else {
            this.handleSubmit(a)
          }

          // swalWithBootstrapButtons.fire('Deleted!', 'Your file has been deleted.', 'success')
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          this.successalt('error', 'Cancelled')
        }
      })
  }

  getAllDepartments = async () => {
    const a = JSON.parse(getItemFromLocalStorage('key'))
    this.setState({ datas: [] })
    await axios
      .get(`${envss}/complaint/byrollno/${a.rollno}`)
      .then((data) => {
        console.log(data)
        data.data.map((u) => {
          if (
            u.complaint_status == 'Completed' &&
            u.submitted_by_student === false &&
            u.submitted_by_admin === false &&
            u.submitted_by_worker === true
          ) {
            this.state.datas.push(u)
            // setData([...datas, u])
          }
        })
        // alert('sj')
      })
      .catch((err) => console.log(err))
    console.log(this.state.datas)
  }

  handleSubmit = async (data) => {
    await axios.put(`${envss}/complaint/update`, {
      id: data.id,
      status: 'Resolved',
    })
    await axios.put(`${envss}/complaint/submit`, {
      id: data.id,
      submitted_by_admin: true,
      submitted_by_student: true,
    })
    this.successalt('success', 'Complaint Is Closed')
    this.getAllDepartments()
    window.location.reload()
  }
  handlecross = async (data) => {
    await axios.put(`${envss}/complaint/submit`, {
      id: data.id,
      submitted_by_student: true,
    })
    this.successalt('error', 'Will Notify To Admin')
    this.getAllDepartments()
    window.location.reload()
  }

  render() {
    return (
      <DropdownMenu>
        {this.state.datas.length == 0 && (
          <DropdownItem tag="a" key={i}>
            <h5>No Notifications</h5>
          </DropdownItem>
        )}
        {this.state.datas.map((u, i) => (
          <DropdownItem tag="a" key={i}>
            {/* data-status={this.props.notifications[i].status} */}
            <div className="notify-icon">
              {/* <i className={'i-' + this.props.notifications[i].icon}></i> */}
            </div>
            <div className="notify-info">
              <span className="title">
                <h6>
                  <b>{u.complaint_type}</b> complaint is completted successfully
                </h6>
                <Row>
                  <Col lg={9} sm={9} xs={9}>
                    <span className="time small">
                      {u.updated_on} {'    '}
                    </span>
                  </Col>
                  {u.submitted_by_student === false && (
                    <Col sm={3} xs={3}>
                      <button
                        style={{
                          cursor: 'pointer',
                          borderColor: 'green',
                          borderRadius: '5px',
                          border: '2px',
                          marginRight: '5px',
                        }}
                        onClick={(e) => this.ale('s', u, 'The work is done ?')}
                      >
                        <i className="fa fa-check" style={{ color: 'green' }}></i>
                      </button>
                      <button
                        style={{
                          cursor: 'pointer',
                          borderColor: 'red',
                          borderRadius: '5px',
                          border: '2px',
                          marginRight: '5px',
                        }}
                        onClick={(e) => this.ale('n', u, 'Work Is Not Done Yet ?')}
                      >
                        <i className="fas fa-times" style={{ color: 'red' }}></i>
                      </button>
                    </Col>
                  )}
                </Row>
                {/* <span className="time small">
                   {'this'} {'    '}
                 </span> */}

                <span
                  // data-status={this.props.notifications[i].status}
                  className="profile-status float-right"
                ></span>
              </span>
            </div>
          </DropdownItem>
        ))}
      </DropdownMenu>
    )

    var notificationsList = []
    // alert('djj')
    for (var i = 0; i < this.state.datas.length; i++) {
      notificationsList.push(
        // className={this.props.notifications[i].type}
        <DropdownItem tag="a" key={i}>
          {/* data-status={this.props.notifications[i].status} */}
          <div className="notify-icon">
            {/* <i className={'i-' + this.props.notifications[i].icon}></i> */}
          </div>
          <div className="notify-info">
            <span className="title">
              <h5>
                <b>{this.state.datas[i].complaint_type}</b> complaint is completted successfully
              </h5>
              <Row>
                <Col lg={9} sm={9} xs={9}>
                  <span className="time small">
                    {this.state.datas[i].updated_on} {'    '}
                  </span>
                </Col>
                {this.state.datas[i].submitted_by_student === false && (
                  <Col sm={3} xs={3}>
                    <button
                      style={{
                        cursor: 'pointer',
                        borderColor: 'green',
                        borderRadius: '5px',
                        border: '2px',
                        marginRight: '5px',
                      }}
                      onClick={(e) => this.handleSubmit(this.state.datas[i])}
                    >
                      <i className="fa fa-check" style={{ color: 'green' }}></i>
                    </button>
                    <button
                      style={{
                        cursor: 'pointer',
                        borderColor: 'red',
                        borderRadius: '5px',
                        border: '2px',
                        marginRight: '5px',
                      }}
                      onClick={() => alert('dj')}
                    >
                      <i className="fas fa-times" style={{ color: 'red' }}></i>
                    </button>
                  </Col>
                )}
              </Row>
              {/* <span className="time small">
                {'this'} {'    '}
              </span> */}

              <span
                // data-status={this.props.notifications[i].status}
                className="profile-status float-right"
              ></span>
            </span>
          </div>
        </DropdownItem>,
      )
    }
    return <DropdownMenu>{notificationsList}</DropdownMenu>
  }
}

// Notification.propTypes = {
//   notifications: PropTypes.arrayOf(PropTypes.object),
// }

export default Notification

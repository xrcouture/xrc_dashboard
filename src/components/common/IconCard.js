import React, { Component } from 'react'
import { Card, CardBody, Media } from 'reactstrap'
export default class IconCard extends Component {
  render() {
    const { icon, value, title } = this.props
    return (
      // <Card className="">
      //   <CardBody
      //     className="text-center radius shadow"
      //     style={{ minHeight: "135px", background: this.props.color }}
      //   >
      //     <i className={icon} />
      //     <p className="card-text font-weight-semibold mb-0">{title}</p>
      //     {HearingDate ? <p>{HearingDate}</p> : <br />}
      //     <p>{HearingDateInEnglish}</p>
      //     <p className="lead text-center">{value}</p>
      //   </CardBody>
      // </Card>
      <Card
        className="mini-stats-wid task-box"
        style={{ boxShadow: 'rgb(204, 204, 204) 5px 5px 10px 2px' }}
      >
        <CardBody>
          <Media style={{ paddingBottom: '50px', cursor: 'pointer' }}>
            <Media body>
              <p className="text-muted font-weight-medium">{title}</p>
              <h4 className="mb-0">{value}</h4>
            </Media>

            <div className="mini-stat-icon avatar-sm align-self-center rounded-circle bg-primary">
              <span className="avatar-title" style={{ background: this.props.color }}>
                <i className={'bx ' + icon + ' font-size-24'}></i>
              </span>
            </div>
          </Media>
        </CardBody>
      </Card>
    )
  }
}

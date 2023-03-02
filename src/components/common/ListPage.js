import React, { Component } from 'react'
import DataTable from 'react-data-table-component'
import { Card, CardBody } from 'reactstrap'
import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'
//import { masterListPageTableTheme } from "../../constants/defaultValues";
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
class ListPage extends Component {
  render() {
    var pageLimit = this.props.pageLimit ? this.props.pageLimit : 10
    return (
      <Card style={{ paddingBottom: '32px' }}>
        <CardBody>
          <DataTable
            style={{ cursor: 'pointer' }}
            // customTheme={masterListPageTableTheme}
            striped
            className={'overFlowXRemoval table-responsive overFlowXMobile'}
            columns={this.props.columns}
            progressComponent={
              <CustomLoader />
              // <div className="spinner-border text-primary m-1" role="status">
              //   {/* <span className="sr-only">Loading...</span> */}
              // </div>
            }
            data={this.props.data}
            progressPending={this.props.progressPending}
            // keyField={this.props.keyField}
            highlightOnHover={true}
            // noHeader
            // onSort={this.props.onSort}
            // onRowClicked={this.props.rowClicked}
            pagination={this.props.pagination === 'empty' ? null : true}
            paginationServer
            paginationResetDefaultPage={this.props.resetPage ? this.props.resetPage : false}
            // paginationPerPage={10}
            paginationRowsPerPageOptions={
              this.props.pageSizeOptions ? this.props.pageSizeOptions : [5,10, 25, 50, 100]
            }
            paginationTotalRows={this.props.totalCount}
            onChangeRowsPerPage={this.props.rowsPerPageOnChange}
            // onChangePage={this.props.pageChange}
            conditionalRowStyles={this.props.conditionalRowStyles}
          />
        </CardBody>
      </Card>
    )
  }
}

export default ListPage

ListPage.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  isDataLoading: PropTypes.bool.isRequired,
  conditionalRowStyles: PropTypes.array.isRequired,
}

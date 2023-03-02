import React, { Component } from 'react'
import { Row, Button, Col } from 'reactstrap'
import { INVALID_CHARS, INVALID_CHARS_REGEX } from '../../helpers/utils'
class ListPageHeader extends Component {
  constructor() {
    super()
    this.state = {
      dropdownSplitOpen: false,
      displayOptionsIsOpen: false,
    }
  }

  toggleDisplayOptions = () => {
    this.setState((prevState) => ({
      displayOptionsIsOpen: !prevState.displayOptionsIsOpen,
    }))
  }
  toggleSplit = () => {
    this.setState((prevState) => ({
      dropdownSplitOpen: !prevState.dropdownSplitOpen,
    }))
  }
  enterPressed = (event) => {
    if (INVALID_CHARS.includes(event.key)) {
      event.preventDefault()
    }
    var code = event.keyCode || event.which
    if (code === 13) {
      //13 is the enter keycode
      this.props.buttonClick()
    }
  }
  render() {
    const { onTextChange, buttonClick, buttonText, showSearch, showButton, searchValue } =
      this.props
    return (
      <Row>
        <Col xxs="12">
          <div className="mb-2">
            <div className="text-zero float-right mt-2">
              {showSearch === false ? (
                ''
              ) : (
                <div
                  style={{ marginTop: '-4%' }}
                  className="app-search mr-2 d-none float-left d-lg-block"
                >
                  <div className="position-relative">
                    <input
                      autoComplete="off"
                      type="text"
                      name="keyword"
                      onKeyPress={this.enterPressed.bind(this)}
                      onChange={(e) => onTextChange(e)}
                      className="form-control"
                      placeholder="Search..."
                      value={searchValue}
                    />
                    <span className="bx bx-search-alt"></span>
                  </div>
                </div>
              )}

              {showButton === false ? (
                ''
              ) : (
                <Button
                  color="primary"
                  size="md"
                  className="float-right"
                  onClick={() => buttonClick()}
                >
                  {buttonText ? buttonText : 'Add New'}
                </Button>
              )}
            </div>
          </div>
        </Col>
      </Row>
    )
  }
}

export default ListPageHeader

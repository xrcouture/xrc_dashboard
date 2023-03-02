import React from 'react'
import { Label, FormGroup, Col } from 'reactstrap'
import Select from 'react-select'
import PropTypes from 'prop-types'
import { components } from 'react-select'

const CustomSelectInput = (props) => {
  var customProps = Object.assign({}, props)
  delete customProps.autoCorrect
  delete customProps.autoCapitalize
  return <components.Input {...customProps} />
}

class DropDown extends React.Component {
  render() {
    return this.props.colSplit ? (
      <Col xs={this.props.MobcolSplit} sm={this.props.colSplit}>
        <FormGroup className={this.props.formClassName ? this.props.formClassName : 'form-group'}>
          <Label className={this.props.labelClassName}>{this.props.label}</Label>
          <Select
            styles={{
              // Fixes the overlapping problem of the component
              menu: (provided) => ({ ...provided, zIndex: 9999 }),
            }}
            components={{ Input: CustomSelectInput }}
            className="react-select"
            classNamePrefix="react-select"
            name="form-field-name"
            isMulti={this.props.isMulti}
            options={this.props.options}
            isDisabled={this.props.isDisabled}
            isClearable={this.props.isClearable}
            isSearchable={this.props.isSearchable ? true : false}
            value={this.props.value}
            onChange={(entity, action) => {
              if (action === 'clear') {
                this.props.ClearAction()
              } else {
                this.props.Action(entity)
              }
            }}
            onInputChange={(e) => {
              this.props.onInputChange && this.props.onInputChange(e)
            }}
            placeholder={this.props.placeholderText}
            noOptionsMessage={() => this.props.emptyText}
          />
          <span className="text-semi-muted">{this.props.grayText}</span>
          {this.props.errors && <div className="invalid-feedback d-block">{this.props.errors}</div>}
        </FormGroup>
      </Col>
    ) : (
      <FormGroup className={this.props.formClassName ? this.props.formClassName : 'form-group'}>
        <Label className={this.props.labelClassName}>{this.props.label}</Label>
        <Select
          styles={{
            // Fixes the overlapping problem of the component
            menu: (provided) => ({ ...provided, zIndex: 9999 }),
          }}
          components={{ Input: CustomSelectInput }}
          className="react-select"
          classNamePrefix="react-select"
          name="form-field-name"
          isMulti={this.props.isMulti}
          options={this.props.options}
          isDisabled={this.props.isDisabled}
          isClearable={this.props.isClearable}
          isSearchable={this.props.isSearchable ? true : false}
          value={this.props.value}
          onChange={(entity, action) => {
            if (action === 'clear') {
              this.props.ClearAction()
            } else {
              this.props.Action(entity)
            }
          }}
          onInputChange={(e) => {
            this.props.onInputChange && this.props.onInputChange(e)
          }}
          placeholder={this.props.placeholderText}
          noOptionsMessage={() => this.props.emptyText}
        />
        <span className="text-semi-muted">{this.props.grayText}</span>
        {this.props.errors && <div className="invalid-feedback d-block">{this.props.errors}</div>}
      </FormGroup>
    )
  }
}

export default DropDown

DropDown.propTypes = {
  grayText: PropTypes.array,
  colSplit: PropTypes.string,
  isDisabled: PropTypes.bool,
  isClearable: PropTypes.bool.isRequired,
  isSearchable: PropTypes.bool.isRequired,
  isMulti: PropTypes.bool.isRequired,
  formClassName: PropTypes.string,
  onInputChange: PropTypes.string,
  placeholderText: PropTypes.string,
  ClearAction: PropTypes.array.isRequired,
  Action: PropTypes.array.isRequired,
  emptyText: PropTypes.string,
  errors: PropTypes.string,
  labelClassName: PropTypes.string,
  MobcolSplit: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
}

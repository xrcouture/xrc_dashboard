import React from 'react'
import "./Upload.css"

const NextButton = (props) => {

  return (
    <div className='d-flex'>
      <div className="kb-buttons-box mt-5 text-center d-flex justify-content-left align-items-center">
        <button type="submit" className="form-submit uc-buttons" onClick={props.saveToDrafts} style={{ marginRight: "1rem" }}>Save to drafts</button>
        {/* <p>{props.errorMsg}</p> */}
      </div>
      <div className="kb-buttons-box mt-5 text-center d-flex justify-content-left align-items-center">
        <button type="submit" className="form-submit uc-buttons" onClick={props.handleSumbit} style={{ marginRight: "1rem" }}>Next step</button>
        <p>{props.errorMsg}</p>
      </div>
    </div>
  )
}

export default NextButton
import React, { useContext } from 'react'
import { Context } from '../../Context'
import "./Upload.css"

const NextButton = (props) => {

  const { submittingState } = useContext(Context)
  const [submitting, setSubmitting] = submittingState

  return (
    <div className='d-flex'>
      <div className="kb-buttons-box mt-5 text-center d-flex justify-content-left align-items-center">
        <button disabled={submitting} type="submit" className="form-submit uc-buttons" onClick={props.saveToDrafts} style={{ marginRight: "1rem" }}>Save to drafts</button>
        {/* <p>{props.errorMsg}</p> */}
      </div>
      <div className="kb-buttons-box mt-5 text-center d-flex justify-content-left align-items-center">
        <button disabled={submitting} type="submit" className="form-submit uc-buttons" onClick={props.handleSumbit} style={{ marginRight: "1rem" }}>Next step</button>
        <p className='text-danger' style={{ marginBottom: "0.7em" }}>{props.errorMsg}</p>
      </div>
      {submitting ?
        <div class="spinner-border text-light" role="status" style={{ alignSelf: "end", marginBottom: "0.7em" }}>
          <span class="sr-only">Loading...</span>
        </div> : ""}
    </div>
  )
}

export default NextButton
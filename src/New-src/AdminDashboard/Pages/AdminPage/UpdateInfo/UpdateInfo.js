import React from "react";
import "./update-info.css";
import { Formik } from "formik";
import axios from "axios";

const UpdateInfo = ({data}) => {
  console.log(data)
  return (
    <div className="d-flex flex-column m-5 ">
      <Formik
        initialValues={{ date:null,status:null,budget:null,progress:null,name:data.asssetName,brand:data.brandName }}
        // validate={(values) => {
        //   const errors = {};
        //   if (!values.email) {
        //     errors.email = "Required";
        //   } else if (
        //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        //   ) {
        //     errors.email = "Invalid email address";
        //   }
        //   return errors;
        // }}
        onSubmit={(values, { setSubmitting }) => {
          axios.post("http://localhost:5000/admin/update", {...values,name:data.assetName,brand:data.brandName}).then(res=>console.log(res)).catch(e => console.log(e))
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="m-3">
              <label className="d-flex align-items-center">
                <span>
                  <h4 className="m-0" style={{ width: "10rem",color:"white" }}>
                    {" "}
                    Date:{" "}
                  </h4>
                </span>{" "}
                &nbsp; &nbsp;
                {/* <input className='input-style' type="date" name="name" onChange={""} /> */}
                <input
                  class="form-control form-control-lg"
                  type="date"
                  placeholder=".form-control-lg"
                  aria-label=""
                  name="date"
                  value={values.date}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {/* <p className='text-danger' style={{ marginLeft: "1rem", marginBottom: "0rem" }}>{""}</p> */}
              </label>
            </div>

            <div className="m-3">
              <label className="d-flex align-items-center">
                <span>
                  <h4 className="m-0" style={{ width: "10rem",color:"white" }}>
                    {" "}
                    Status:{" "}
                  </h4>
                </span>{" "}
                &nbsp; &nbsp;
                {/* <input className='input-style' type="text" name="name" onChange={""} /> */}
                <select
                  class="form-select form-select-lg mb-3"
                  aria-label=".form-select-lg example"
                  name="status"
                  value={values.status}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option selected>Select the status</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Action Required">Action Required</option>
                  <option value="Pending payment">Pending payment</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
                {/* <p className='text-danger' style={{ marginLeft: "1rem", marginBottom: "0rem" }}>{""}</p> */}
              </label>
            </div>

            <div className="m-3">
              <label className="d-flex align-items-center">
                <span>
                  <h4 className="m-0" style={{ width: "10rem",color:"white" }}>
                    {" "}
                    Budget:{" "}
                  </h4>
                </span>{" "}
                &nbsp; &nbsp;
                {/* <input className='input-style' type="number" name="name" onChange={""} /> */}
                <input
                  class="form-control form-control-lg"
                  type="number"
                  aria-label=""
                  name="budget"
                  value={values.budget}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {/* <p className='text-danger' style={{ marginLeft: "1rem", marginBottom: "0rem" }}>{""}</p> */}
              </label>
            </div>

            <div className="m-3">
              <label className="d-flex align-items-center">
                <span>
                  <h4 className="m-0" style={{ width: "10rem",color:"white" }}>
                    {" "}
                    Progress:{" "}
                  </h4>
                </span>{" "}
                &nbsp; &nbsp;
                <input
                  class="form-control form-control-lg"
                  type="number"
                  aria-label=""
                  name="progress"
                  value={values.progress}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {/* <input className='input-style' type="number" name="name" onChange={""} /> */}
                {/* <p className='text-danger' style={{ marginLeft: "1rem", marginBottom: "0rem" }}>{""}</p> */}
              </label>
            </div>
            <div className="m-3 d-flex align-items-center justify-content-center">
              <button
                type="submit"
                className="btn form-submit mt-4 text-center"
                style={{
                  marginRight: "1rem",
                  background: "black",
                  color: "white",
                }}
              >
                Update
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default UpdateInfo;

import React from "react";
import { Row, Col } from "reactstrap";
import logo from "../assets/XR_R3.png";
import { FormGroup, Input, Label } from "reactstrap";
import * as Yup from "yup";
import "./register.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { redirect } from "react-router";
import axios from "axios";
function Data() {
  const SignupSchema = Yup.object().shape({
    firstname: Yup.string().required("First Name is required"),
    lastname: Yup.string().required("Last Name is required"),
    brandname: Yup.string().required("Brand Name is required"),
    productname: Yup.string().required("Product Name is required"),
    brandlink: Yup.string().required("Brand Link is required"),
    subdomain: Yup.string().required("Sub Domain is required"),
  });

  //   const errorPass = toast("Must Contain 8 Characters, 1 Uppercase, 1 Lowercase, 1 Number and 1 Special Case")

  return (
    <div className="main-signup">
      <img src={logo} alt="" className="logo" />
      <Row className="-hv cont-row">
        <Col className="col-md-12 cont cont-data -hv">
          <div className="box box-data w-100">
            <div className="box-header">
              <h1 className="box-header-text">Tell us a bit about yourself</h1>
              <hr></hr>
            </div>
            <Formik
              initialValues={{
                firstname: "",
                lastname: "",
                brandName: "",
                brandlink: "",
                productname: "",
                subdomain: "",
                email:localStorage.getItem("email")
              }}  
              // validationSchema={SignupSchema}
              onSubmit={(values) => {
                console.log("called")
                console.log({...values,email:localStorage.getItem('email')})
                axios
                  .post("https://xrcdashboard.onrender.com/auth/form", {...values,email:localStorage.getItem('email')})
                  .then((res) => {
                    console.log(res);
                    window.location.replace(`/brands/${values.brandName}`)
                  });
                console.log(values);
                localStorage.setItem("brand", values.brandName);
                values.password.match(
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
                ) == null
                  ? toast.error(
                      "Password Must Contain 8 Characters, 1 Uppercase, 1 Lowercase, 1 Number and 1 Special Case",
                      {
                        position: toast.POSITION.TOP_RIGHT,
                        toastId: "passerror",
                      }
                    )
                  : toast.success(
                      "Registered Successfully, check the email verify the email",
                      {
                        position: toast.POSITION.TOP_RIGHT,
                        toastId: "passerror",
                      }
                    );
                setTimeout(function () {
                  window.location.replace("/signin");
                }, 3000);
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
              }) => (
                <Form>
                  <Row>
                    <Col>
                      <Label for="firstname">First Name</Label>
                      <Field type="text" name="firstname" />
                      <ErrorMessage
                        name="firstname"
                        className="error"
                        component="div"
                      />
                    </Col>
                    <Col>
                      <Label for="lastname">Last Name</Label>
                      <Field type="text" name="lastname" />
                      <ErrorMessage
                        name="lastname"
                        className="error"
                        component="div"
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Label for="brandname">Brand Leagal Name</Label>
                      <Field type="text" name="brandName" />
                      <ErrorMessage
                        name="brandName"
                        className="error"
                        component="div"
                      />
                    </Col>
                    {/* <Col>
                      <Label for="productname">Product Name</Label>
                      <Field type="text" name="productname" />
                      <ErrorMessage
                        name="productname"
                        className="error"
                        component="div"
                      />
                    </Col> */}
                  </Row>

                  <Row>
                    <Col>
                      <Label for="brandlink">Website</Label>
                      <Field type="text" name="brandlink" />
                      <ErrorMessage
                        name="brandlink"
                        className="error"
                        component="div"
                      />
                    </Col>
                  </Row>
                  {/* <Label for="subdomain">Sub Domain</Label>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control w-50 border-right"
                      name="subdomain"
                      value={values.subdomain}
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <div className="input-group-append">
                      <span className="input-group-text" id="basic-addon2">
                        .xrcouture.com
                      </span>
                    </div>
                  </div>
                  <ErrorMessage
                    name="subdomain"
                    className="error"
                    component="div"
                  /> */}
                  <label>
                    <Field
                      type="checkbox"
                      className="form-check-input mr-2"
                      name="toggle"
                    />
                    <span className="ml-2 position-relative">
                      By checking this box you confirm that you have read and
                      agree to be bound by the Studio
                      <a href="/terms"> Terms of Use and Privacy Policy.</a>
                    </span>
                  </label>
                  <div className="button-submit mt-2">
                    <button type="submit" className="button" >
                      Submit
                    </button>
                  </div>
                </Form>
              )}
            </Formik>

            <ToastContainer />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Data;

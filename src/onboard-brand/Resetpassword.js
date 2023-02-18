import React from "react";
import { Row, Col } from "reactstrap";
import logo from "../assets/XR_R3.png";
import { Label } from "reactstrap";
import * as Yup from "yup";
import "./register.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

function Resetpassword() {
  const SigninSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email")
      .required("Please Enter Your Valid Email"),
  });

  return (
    <div className="main-signup">
      <img src={logo} alt="" className="logo" />
      <Row className="-hv cont-row">
        <Col className="col-md-12 cont -hv">
          <div className="box">
            <div className="box-header">
              <h1 className="box-header-text">Reset Your Password</h1>
              <hr></hr>
            </div>
            <Formik
              initialValues={{
                email: "",
              }}
              validationSchema={SigninSchema}
              onSubmit={(values) => {
                console.log(values);
                toast.success(
                  "An email has been sent to your email address with instructions on how to reset your password",
                  {
                    position: toast.POSITION.TOP_RIGHT,
                    toastId: "passerror",
                  }
                );
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <Label for="email">Email</Label>
                  <Field type="email" name="email" />
                  <ErrorMessage
                    name="email"
                    className="error"
                    component="div"
                  />
                  <div className="button-submit">
                    <button type="submit" className="button mt-2">
                      Send
                    </button>
                  </div>
                </Form>
              )}
            </Formik>

            <ToastContainer />
            <p className="signup">
              Don't have an account? <a href="/signup"> Sign Up</a> here{" "}
            </p>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Resetpassword;

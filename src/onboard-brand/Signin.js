import React, { useState,useEffect } from "react";
import axios from "axios";
import { Row, Col } from "reactstrap";
import logo from "../assets/XR_R3.png";
import { Label } from "reactstrap";
import * as Yup from "yup";
import "./register.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, Navigate, redirect } from "react-router-dom";
import "./signup.css";
import Cookies from "universal-cookie";
import useFetch from "../hooks/useFetch";
import GoogleLogin from "react-google-login";

function Signin() {
  const CLIENT_ID = "502666256532-09c3r3cfdh8028t1n3lrl69hpeaq000v.apps.googleusercontent.com"
  const [show, setShow] = useState("");

  const onSuccess = (res) => {
    console.log("Register successfulyyy",res)
    setShow(res.profileObj.imageUrl)
    toast.success("Login Successful")
  }
  const onFailure = res => {
    console.log("Register failed",res)
  }

  const [signup, setSignup] = useState(false);

  const SigninSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email")
      .required("Please Enter Your Valid Email"),
    password: Yup.string().required("Please Enter your password"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
  });

  return (
    <div className="main-signup">
      <img src="https://xrcouture-xrcie.s3.ap-south-1.amazonaws.com/XRC_Homepage/homepage_contents/xrcnew.webp" alt="" className="logo" />
      <Row className="-hv cont-row">
        <Col className="col-md-12 cont -hv">
          <div className="box">
            <div className="box-header">
              <h1 className="box-header-text">Sign In to XR COUTURE</h1>
              <hr></hr>
            </div>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={SigninSchema}
              onSubmit={(values) => {
                axios
                  .post("http://localhost:5000/auth/signin", values, {withCredentials:true})
                  .then((res) => {
                    setSignup(res.data.signUpCompleted);
                    console.log(res.data.signUpCompleted);
                    if (signup === true) {
                      setTimeout(function () {
                        window.location.replace("/");
                      }, 1000);
                    } else {
                      setTimeout(function () {
                        window.location.replace("/brand-data");
                      }, 2000);
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                    toast.error(`Oops, ${err.response.data.msg}`, {
                      position: toast.POSITION.TOP_RIGHT,
                      toastId: "passerror",
                    });
                  });
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
                  <Label for="password">Password</Label>

                  <Field type="password" name="password" />
                  <ErrorMessage
                    name="password"
                    className="error"
                    component="div"
                  />
                  <p className="forgot-pass">
                    <Link to="/forget-password" className="forgot-pass">
                      {" "}
                      Forget Password?
                    </Link>
                  </p>
                  <div className="button-submit">
                    <button type="submit" className="button">
                      Login
                    </button>
                  </div>
                </Form>
              )}
            </Formik>

            <ToastContainer />
            <p className="signup mt-2">
              Don't have an account? <Link to="/signup"> Sign Up</Link> here{" "}
            </p>
            <div className="google-signup">
              <GoogleLogin
              clientId={CLIENT_ID}
              buttonText=""
              onSuccess={onSuccess}
              onFailure={onFailure}
              cookiePolicy={"single_host_origin"}
              isSignedIn={true}
              />
              {/* <img src={show} alt="" className="google-img"/> */}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Signin;

import React, { useState,useEffect } from "react";
import { useCookies } from 'react-cookie';
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
import { CListGroup } from "@coreui/react";

function Signin() {
  const [loading, setLoading] = useState(false);
  const CLIENT_ID = "502666256532-09c3r3cfdh8028t1n3lrl69hpeaq000v.apps.googleusercontent.com"
  const [show, setShow] = useState("");

  const onSuccess = (res) => {
    console.log("Register successfulyyy",res)
    setShow(res.profileObj.imageUrl)
    window.location.replace("/")
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
  });
  const [cookies, setCookie] = useCookies(['refreshToken','accessToken']);

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
                console.log("called")
                setLoading(true)

                
                
                axios
                  .post("https://xrcdashboard.onrender.com/auth/signin", values)
                  .then((res) => {
                    setCookie('refreshToken', res.data.refreshToken, { path: '/' });
                    setCookie('accessToken', res.data.accessToken, { path: '/' });
                    localStorage.setItem('email', res.data.mail);
                    localStorage.setItem('role', res.data.role);
                    localStorage.setItem('brand', res.data.brand);
                    setSignup(res.data.signUpCompleted);
                    
                    console.log(res.data.brand)
                    if(res.data.role === "admin"){
                      setTimeout(function () {
                            window.location.replace("/admin/brands");
                          }, 500);
                    }


                    if (res.data.signUpCompleted === true) {
                      setTimeout(function () {
                        window.location.replace(`/brands/${res.data.brand}`)
                      }, 500);
                    } else {
                      setTimeout(function () {
                        window.location.replace("/brand-data");
                      }, 500);
                    }
                    setLoading(false)

                  })
                  .catch((err) => {
                      setLoading(false)

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
                    <button type="submit" className="button" disabled={loading}>
                      {loading ? "Loading..." : "Sign In"}
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
              // isSignedIn={true}
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

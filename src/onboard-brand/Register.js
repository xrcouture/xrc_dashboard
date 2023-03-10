import React,{useEffect} from "react";
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
import { Link } from "react-router-dom";
import useFetch from '../hooks/useFetch'
import GoogleLogin from "react-google-login";

function RegisterBrand() {

  const [loading,setLoading] = React.useState(false);
  const CLIENT_ID = "502666256532-09c3r3cfdh8028t1n3lrl69hpeaq000v.apps.googleusercontent.com"


  const onSuccess = (res) => {
    console.log("Register successfulyyy",res)
  }
  const onFailure = res => {
    console.log("Register failed",res)
  }

  const SignupSchema = Yup.object().shape({
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
              <h1 className="box-header-text">Sign Up to XR COUTURE</h1>
              <hr></hr>
            </div>
            <Formik
              initialValues={{
                email: "",
                password: "",
                confirmpassword: "",
              }}
              validationSchema={SignupSchema}
              onSubmit={async(values,actions) => {
                setLoading(true)
                console.log(values);
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
                  : await axios
                      .post("http://localhost:5000/auth/signup", {...values,role:"brands"})
                      .then((res) => {
                        console.log(res);
                        if (res.status == 201) {
                          toast.success(res.data.msg, {
                            position: toast.POSITION.TOP_CENTER,
                            toastId: "passerror",
                          });
                        } else {
                          toast.error(res.data.msg, {
                            position: toast.POSITION.TOP_RIGHT,
                            toastId: "passerror",
                          });
                        }
                      }).catch(err =>{
                        toast.error(err.response.data.msg, {
                          position: toast.POSITION.TOP_RIGHT,
                          toastId: "passerror",
                        });
                      });
                    setLoading(false)
                    actions.resetForm()
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
                  <Label for="confirmpassword">Confirm Password</Label>
                  <Field type="password" name="confirmpassword" />
                  <ErrorMessage
                    name="password"
                    className="error"
                    component="div"
                  />
                  {/* {errors.password && errorPass} */}
                  <div className="button-submit">
                    <button type="submit" className="button" disabled={loading}>
                      {!loading ? "Sign Up" : " Loading..."}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>

            <ToastContainer />
            <p className="signup">
              I already have an account? <Link to="/signin"> Sign In</Link> here{" "}
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
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default RegisterBrand;

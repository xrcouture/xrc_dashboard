import React from 'react'
import { Row, Col } from 'reactstrap'
import logo from '../assets/XR_R3.png'
import { FormGroup, Input, Label } from 'reactstrap'
import * as Yup from 'yup';
import './register.css'
import { Formik,Form,Field,ErrorMessage } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Updatepassword() {


    const SignupSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Please Enter Your Valid Email'),
        password:Yup.string()
        .required('Please Enter your password'),
        confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
      });

      

    //   const errorPass = toast("Must Contain 8 Characters, 1 Uppercase, 1 Lowercase, 1 Number and 1 Special Case")


  return (
    <div className='main-signup'>
        <img src={logo} alt="" className='logo'/>
        <Row className='-hv cont-row'>
            <Col className='col-md-12 cont -hv'>
            <div className='box'>
                <div className='box-header'>
                 <h1 className='box-header-text'>Update Password</h1>
                 <hr></hr>
                </div>
                <Formik
                        initialValues={{
                            password: '',
                            confirmPassword:''
                        }}
                        validationSchema={SignupSchema}
                        onSubmit={values => {
                            console.log(values);
                            values.password.match( /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/) == null ? toast.error("Password Must Contain 8 Characters, 1 Uppercase, 1 Lowercase, 1 Number and 1 Special Case", {
                                position: toast.POSITION.TOP_RIGHT,
                                toastId:'passerror'
                              }):toast.success("Password Updated Successfully", {
                                position: toast.POSITION.TOP_RIGHT,
                                toastId:'passerror'
                              })
                        }}
                        >
                        {({ errors, touched }) => (
                            <Form>
                            <Label for="password">
                              Password
                                 </Label>
                            <Field type="password" name="password" />
                            <ErrorMessage name="password" className='error' component="div" />
                            <Label for="confirmpassword">
                              Confirm Password
                                 </Label>
                            <Field type="password" name="confirmpassword" />
                            <ErrorMessage name="password" className='error' component="div" />
                            {/* {errors.password && errorPass} */}
                             <div className='button-submit'>
                             <button type='submit' className='button'>Update</button>
                        </div>
                             </Form>
                        )}
                        </Formik>

                        
                        <ToastContainer />
                    {/* <p className="signup">I already have an account? <a href='/signin' > Sign In</a> here </p> */}
                     
                    </div>
            </Col>
        </Row>

    </div>
  )
}

export default Updatepassword
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import ModalSuccess from "../components/ModalSuccess";
import "./verify.css";
import { MdVerified, MdError } from "react-icons/md";

function VerifyEmail() {
  // console.log("called")
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState();
  const [load, setLoad] = useState(true);
  const [msg, setMsg] = useState("");
  const [called, setCalled] = useState(false)

  const verifyEmail = () =>{
    if (!called) {
      setCalled(true)
      let search = window.location.search;
      let params = new URLSearchParams(search);
      let token = params.get("token");
      let email = params.get("email");
      console.log(token, email);
      axios
        .post("https://xrcdashboard.onrender.com/auth/verify-email", {
          email: email,
          verificationToken: token,
        })
        .then((res) => {
          setLoad(false);
          setStatus(res.status);
          setMsg(res.data.msg);
          console.log(res.data.msg)
        })
        .catch((err) => {
          setMsg(err.response.data.msg);
          setStatus(err.response.status);
          setLoad(false);
        });
    }
  }


  useEffect(() => {
    
    verifyEmail()
    
  },[]);

  return (
    <>
      {load ? (
          <h1>Loading</h1>
      ) : (
        <div className='min-vh-100 d-inline-block"'>
          {/* Email Verification Page */}
          <ToastContainer />
          {status === 200 ? (
            <ModalSuccess text={`Congratulations,${msg}`}>
              <MdVerified size={65} className="modal-icon-success" />
            </ModalSuccess>
          ) : (
            <ModalSuccess text={`Oops, ${msg}`}>
              <MdError size={65} className="modal-icon-error" />
            </ModalSuccess>
          )}
        </div>
      )}
    </>
  );
}

export default VerifyEmail;

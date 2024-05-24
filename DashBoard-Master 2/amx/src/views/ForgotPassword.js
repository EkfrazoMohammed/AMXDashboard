import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { faEye, faEyeSlash } from "react-icons/fa";

import { Spinner } from "reactstrap";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

import "./assets/images/favicon.ico";
import "./assets/fonts/fontawesome/css/fontawesome-all.min.css";
import "./assets/plugins/animation/css/animate.min.css";
import "./assets/css/style.css";
import amxlogin from "../assets/img/amx_login_icon.png";
import { Link, useHistory } from "react-router-dom";

import drone from "../assets/drone.png";

const ForgotPassword = () => {

  const [sendLoading,setSendLoading]=useState(false)
  
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    mail: "",
  
  });
  const [errors, setErrors] = useState({
  

    mail: false,
  });
  const history = useHistory();

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false });
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const ForgotPasswordClick = async (e) => {
    e.preventDefault();
    if ( !data.mail) {
      setErrors({
        mail: !data.mail,
      });
      return;
    }
    try {
      setSendLoading(true)
      let payload = {
        mail: data.mail,
      };

      let data1 = await axios
        .post("https://fibregrid.amxdrones.com/dronecount/forgot/", payload)
        .then((res) => {
          const data2 = res.data;
          console.log(res.data);
          setSendLoading(false)
          toast.success(
            "OTP send to the Mobile Number " ,
            {
              position: "top-right",
              autoClose: 50000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              icon: <img src={drone} alt="" />,
            }
          );
          history.push("/resetpassword");
        
        })
        .catch((err) => {
          if (err.response) {
            setSendLoading(false)
            toast.error("Email does not exist!", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              icon: <img src={drone} alt="" />,
            });

            console.log(err.response.status);
            console.log(err.response.statusText);
            console.log(err.message);
            console.log(err.response.headers);
            console.log(err.response.data);
          }
        });
    } catch (error) {
      console.log(error);
      setSendLoading(false)
    }
  };

  const LoginClick = (name) => {
    console.log("Login Clicked !!!!");
    history.push("/login");
  };

  return (
    <>
      <ToastContainer />
      <div className="auth-wrapper">
        <div className="auth-content">
          {/* <div className="auth-bg">
            <span className="r"></span>
            <span className="r s"></span>
            <span className="r s"></span>
            <span className="r"></span>
          </div> */}
          <div className="">
            <div className="card card-body text-center">
              <div className="mb-4">
                <img style={{ maxWidth: "66px" }} src={amxlogin} alt="" />
              </div>
              <h3 className="mb-4">Forgot Password</h3>
              <span className="form-labels"><span className="asterisk-symbol">*</span>Email </span>
            
                <input
                  onChange={changeHandler}
                  name="mail"
                  value={data.mail}
                  type="text"
                  className="form-control"
                  placeholder="Enter Email"
                />  {errors.mail && (
                  <span className="error-message">Email is required</span>
                )}
          

             
              
              {sendLoading ? <> 
                <button disabled
                className="btn btn-primary shadow-2 mb-4"
                style={{display:'flex',justifyContent:'center',alignItems:'center',gap:'5px'}}
              >
                <Spinner
                          size="md"
                          color="secondary"
                          style={{
                            height: "12px",
                            width: "12px",
                          }}
                        ></Spinner>
                        <span >
                          {" "}
                Sending OTP 
                      </span>
              </button>
              </> : <>
              <button
                onClick={ForgotPasswordClick}
                className="btn btn-primary shadow-2 mb-4"
              >
                Send OTP
              </button>
              
              </>}
              
              <p className="mb-0 text-muted">
              Already have an account? {" "}
              {/* <a href="auth-signin.html"> Log in</a> */}
              <b onClick={LoginClick}>Log in</b>
            </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;

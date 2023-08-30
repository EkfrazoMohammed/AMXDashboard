import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { faEye, faEyeSlash } from "react-icons/fa";

import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

import "./assets/images/favicon.ico";
import "./assets/fonts/fontawesome/css/fontawesome-all.min.css";
import "./assets/plugins/animation/css/animate.min.css";
import "./assets/css/style.css";
import amxlogin from "../assets/img/amx_login_icon.png";
import { Link, useHistory } from "react-router-dom";

import drone from "../assets/drone.png";

const ResetPassword = () => {
  const [data, setData] = useState({
    "mail" : "",
"otp" : "",
"password" : "",
"cpassword" : ""
  });
  const [errors, setErrors] = useState({
    mail: false,
    otp: false,

    password: false,
    cpassword: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  

  const [showPassword2, setShowPassword2] = useState(false);


  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false });
  };

  
  const history = useHistory();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };
  const ResetPasswordClick = async (e) => {
    e.preventDefault();
    if (!data.mail || !data.otp || !data.password || !data.cpassword) {
      setErrors({
        mail: !data.mail,
        otp: !data.otp,
        password: !data.password,
        cpassword: !data.cpassword,
      });
      return;
    }
    try {
      let payload = {
        "mail" : data.mail,
"otp" : parseInt(data.otp, 10),
"password" : data.password,
"cpassword" : data.cpassword
      };

      let data1 = await axios
        .post("https://fibregrid.amxdrones.com/dronecount/changepassword/", payload)
        .then((res) => {
          const data2 = res.data;
          console.log(res.data);
          
          history.push("/login");
          toast.success(
            "Welcome !",
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              icon: <img src={drone} alt="" />,
            }
          );
        })
        .catch((err) => {
          if (err.response) {
            toast.error("Please check your credentials!", {
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
    }
  };
  const LoginClick = (name) => {
    console.log("Login Clicked !!!!");
    history.push("/login");
  };

  const ForgotPasswordClick = (name) => {
    console.log("forgotpassword Clicked !!!!");
    history.push("/forgotpassword");
  };
  
  return (
    <>
      <ToastContainer />
      <div className="auth-wrapper">
        <div className="auth-content">
          <div className="auth-bg">
            <span className="r"></span>
            <span className="r s"></span>
            <span className="r s"></span>
            <span className="r"></span>
          </div>
          <div className="">
            <div className="card card-body text-center">
              <div className="mb-4">
                <img style={{ maxWidth: "66px" }} src={amxlogin} alt="" />
              </div>
              <h3 className="mb-4">ResetPassword</h3>
              <div className="mb-3">
              <span className="form-labels"><span className="asterisk-symbol">*</span>    Email </span>
             
                <input
                  onChange={changeHandler}
                  name="mail"
                  value={data.mail}
                  type="text"
                  className="form-control"
                  placeholder="Enter Email"
                /> {errors.mail && (
                  <span className="error-message">Email is required</span>
                )}
              </div>

             
              <div className="mb-3">
              <span className="form-labels"><span className="asterisk-symbol">*</span>    OTP </span>
              
                <input
                  onChange={changeHandler}
                  name="otp"
                  value={data.otp}
                  type="text"
                  className="form-control"
                  placeholder="Enter OTP"
                />
                {errors.otp && (
          <span className="error-message">OTP is required</span>
        )}
              </div>

              <div className="mb-3">
              <span className="form-labels"><span className="asterisk-symbol">*</span>    New Password </span>
              <div className="password-input-wrapper">
          <input
            type={showPassword ? 'text' : 'password'}
            onChange={changeHandler}
            name="password"
            value={data.password}
            className="form-control mb-1 password-input"
            placeholder="Enter Password"
            required
            style={{paddingRight:'1.8rem'}}
          />
          <div
            className={`password-toggle ${showPassword ? 'show' : ''}`}
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
          </div>
        </div>
                {/* <input
                  onChange={changeHandler}
                  name="password"
                  value={data.password}
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Enter Password"
                /> */}
                {errors.password && (
          <span className="error-message">Password is required</span>
        )}
              </div>

             
              <div className="mb-3">
              <span className="form-labels"><span className="asterisk-symbol">*</span>Confirm Password </span>
             
                {/* <input
                  onChange={changeHandler}
                  name="cpassword"
                  value={data.cpassword}
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Enter Confirm Password"
                /> */}
                 <div className="password-input-wrapper">
          <input
            type={showPassword2 ? 'text' : 'password'}
            onChange={changeHandler}
            name="cpassword"
            value={data.cpassword}
            className="form-control mb-1 password-input"
            placeholder=" Enter Confirm Password"
            required
            style={{paddingRight:'1.8rem'}}
          />
          <div
            className={`password-toggle ${showPassword2 ? 'show' : ''}`}
            onClick={togglePasswordVisibility2}
          >
            {showPassword2 ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
          </div>
        </div>
                 {errors.cpassword && (
          <span className="error-message">Confirm Password is required</span>
        )}
              </div>
              {/* <div className="checkbox checkbox-fill d-inline d-flex align-item-center">
                  <input
                    type="checkbox"
                    name="checkbox1-fill-2"
                    id="checkbox-fill-2"
                    onChange={togglePasswordVisibility}
                  />
                  <label htmlFor="checkbox-fill-2" className="cr d-flex align-item-center m-0" >
                  &nbsp; Show Password
                  </label>
                </div> */}
              
              <button
                onClick={ResetPasswordClick}
                className="btn btn-primary shadow-2 mb-4"
              >
                ResetPassword
              </button>
              <p className="mb-0 text-muted">
              Didn't receive otp? {" "}
              {/* <a href="auth-signin.html"> Log in</a> */}
              <b onClick={ForgotPasswordClick}>Forgot Password</b>
            </p> 
              <p className="mb-0 text-muted">
              Allready have an account? {" "}
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

export default ResetPassword;

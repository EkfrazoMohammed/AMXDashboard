import React, { useState } from "react";
// import './styles/Login.css'

// import '/Users/apple/Documents/DashBoard-Master/black-dashboard-react-master/src/views/assets/images/favicon.ico'
import "../../../amx/src/assets/img/favicon.png";

// import '/Users/apple/Documents/DashBoard-Master/black-dashboard-react-master/src/views/assets/fonts/fontawesome/css/fontawesome-all.min.css'
import "./../../src/views/assets/fonts/fontawesome/css/fontawesome-all.min.css";

// import '/Users/apple/Documents/DashBoard-Master/black-dashboard-react-master/src/views/assets/plugins/animation/css/animate.min.css'

// import '/Users/apple/Documents/DashBoard-Master/black-dashboard-react-master/src/views/assets/css/style.css'
// import amxlogin from "/Users/apple/Documents/DashBoard-Master/black-dashboard-react-master/src/assets/img/amx_login_icon.png";
import amxlogin from "../assets/img/amx_login_icon.png";
import { useHistory } from "react-router-dom";

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { faEye, faEyeSlash } from "react-icons/fa";

import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

import "./assets/images/favicon.ico";
import "./assets/fonts/fontawesome/css/fontawesome-all.min.css";
import "./assets/plugins/animation/css/animate.min.css";
import "./assets/css/style.css";
// import amxlogin from "../assets/img/amx_login_icon.png";
import { Link } from "react-router-dom";

import drone from "../assets/drone.png";

const Login = () => {
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: false,
    password: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory();

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const LoginClick = async (e) => {
    e.preventDefault();
    if (!data.username || !data.password) {
      setErrors({
        username: !data.username,
        password: !data.password,
      });
      return;
    }
  
    try {
      let payload = {
        user_name: data.username,
        password: data.password,
      };

      let data1 = await axios
        .post("https://fibregrid.amxdrones.com/dronecount/login/", payload)
        .then((res) => {
          const data2 = res.data;
          console.log(res.data);
          localStorage.setItem(
            "user_id",
            JSON.stringify(res.data.result.user_info.user_id)
          );
          localStorage.setItem(
            "user_name",
            JSON.stringify(res.data.result.user_info.username)
          );
          localStorage.setItem(
            "amxtoken",
            JSON.stringify(res.data.result.user_info.token)
          );
         
          localStorage.setItem("consumed_data", (JSON.stringify(res.data.result.Bytes)).replace(/"/g, ""));
          
          // localStorage.setItem("profile_photo", res.data.result.pathofphoto);
          const pathOfPhoto = res.data.result.photo;
if (pathOfPhoto !== undefined && pathOfPhoto !== null) {
  localStorage.setItem("profile_photo", pathOfPhoto);
} else {
  localStorage.setItem("profile_photo", null);
}
          localStorage.setItem("old_profile_photo", res.data.result.photo);
          history.push("/amx");
          toast.success(
            "Welcome " +
              localStorage.getItem("user_name").split('"').join("") +
              "!",
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

            // let data1 = await axios.post(
            //   "https://fibregrid.amxdrones.com/dronecount/login/",
            //   payload
            // ).then(res => {
            //   console.log("999999999999====",res)
            //   localStorage.setItem('user_id',res.data.user_id)
            //   const data2 = res.data;
            //   history.push('/amx');
            // })
            // .catch(err => {
            //   if (err.response) {
            //       toast.error('Please check your credentials !', {
            //           position: "top-right",
            //           autoClose: 5000,
            //           hideProgressBar: false,
            //           closeOnClick: true,
            //           pauseOnHover: true,
            //           draggable: true,
            //           progress: undefined,
            //           theme: "light",
            //           icon: <img src={drone}/>
            //           });
            //     console.log(err.response.status);
            //     console.log(err.response.statusText);
            //     console.log(err.message);
            //     console.log(err.response.headers); // 👉️ {... response headers here}
            //     console.log(err.response.data); // 👉️ {... response data here}
            //   }
            // });
            //   console.log(data1,"projectdata====>");
            //   console.log(data1.message,"projectdata====>statuys");

            //  if data1.code
            //   history.push('/admin');
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
  
  const SignUpClick = () => {
    console.log("SignUpClick Clicked !!!!");
    history.push("/register");
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
              <h3 className="mb-4">Login</h3>
              <div className="mb-3">
              <span className="form-labels"><span className="asterisk-symbol">*</span>  Username </span>
            
        <input
          onChange={changeHandler}
          name="username"
          value={data.username}
          type="text"
          className="form-control"
          placeholder="Enter Username"
          required
        />
         {errors.username && (
          <span className="error-message">Username is required</span>
        )}
      </div>
      <div className="mb-3">
        <span className="form-labels"><span className="asterisk-symbol">*</span>  Password </span>
      
        {/* <input
          type={showPassword ? "text" : "password"}
          onChange={changeHandler}
          name="password"
          value={data.password}
          className="form-control mb-1"
          placeholder="Password"
          required
        /> */}
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
        {errors.password && (
          <span className="error-message">Password is required</span>
        )}
        {/* <label
      className={`password-toggle ${showPassword ? 'show' : ''}`}
      onClick={togglePasswordVisibility}
     
    >
      {showPassword ? (
        <BsFillEyeFill />
      ) : (
        <BsFillEyeSlashFill />
      )}
    </label> */}
      
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
      </div>

             

              {/* <div className="input-group mb-3 ">
   
    <input
      type={showPassword ? "text" : "password"}
      onChange={changeHandler}
      name="password"
      value={data.password}
      className="form-control"
      placeholder="Password"
    />
     
  
  </div> */}

              {/* <div className="form-group text-left">
              <div className="checkbox checkbox-fill d-inline d-flex align-item-center">
                  <input
                    type="checkbox"
                    name="checkbox1-fill-2"
                    id="checkbox-fill-2"
                    onChange={togglePasswordVisibility}
                  />
                  <label htmlFor="checkbox-fill-2" className="cr d-flex align-item-center m-0" >
                  &nbsp; Show Password
                  </label>
                </div>
                
              </div> */}

              <button
                onClick={LoginClick}
                className="btn btn-primary shadow-2 mb-4"
              >
                Login
              </button>
              <p className="mb-2 text-muted">
                Forgot password? <Link to="/forgotpassword">Reset</Link>
              </p>
              {/* <p className="mb-2 text-muted">
                Forgot password? <a href="auth-reset-password.html">Reset</a>
              </p> */}
              <p className="mb-0 text-muted">
                Don't have an account? <b onClick={SignUpClick}>Signup</b>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "./assets/images/favicon.ico";
import "./assets/fonts/fontawesome/css/fontawesome-all.min.css";
import "./assets/plugins/animation/css/animate.min.css";
import "./assets/css/style.css";
import { useHistory } from "react-router-dom";

import Dropzone from 'react-dropzone';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import amxregister from "../../src/assets/img/amx_login_icon.png";

// import './styles/Login.css'

import drone from "../assets/drone.png";
import storage from "../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
const Register = () => {


  const history = useHistory();
 
  const LoginClick = (name) => {
    console.log("Login Clicked !!!!");
    history.push("/login");
  };

  
  const [data, setData] = useState({
    user_name: "",
    mail: "",
    password: "",
    amtoken: "",

    first_name:"",
    last_name:"",
    company_name:"",
    photo:"",
  });
  const [errors, setErrors] = useState({
    user_name: false,
    password: false,

    mail: false,
    amtoken: false,


  });
  const [showPassword, setShowPassword] = useState(false);
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showPreview, setShowPreview] = useState(true);

  const handleFileDrop = (acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    setFile(selectedFile);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };


  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    console.log(file)
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        console.log(imagePreview)

      };
      reader.readAsDataURL(selectedFile);
      console.log(reader.readAsDataURL)
      setData({
        ...data,
        photo: selectedFile,
      });
    } else {
      setImagePreview(null);
    }
  };
  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    setErrors({ ...errors, [name]: false });
    if (name === 'mail') {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setErrors({
        ...errors,
        [name]: !emailPattern.test(value) || value.trim() === '',
      });
    } else {
      setErrors({ ...errors, [name]: false });
    }
  };
  

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  let SignUpbutton = async (e) => {
    e.preventDefault();
    if (!data.user_name || !data.password || !data.mail || !data.amtoken || !data.first_name) {
      setErrors({
        user_name: !data.user_name,
        password: !data.password,
        mail: !data.mail,
        amtoken: !data.amtoken,
        first_name: !data.first_name,
      });
      return;
    }
    if (!isValidEmail(data.mail)) {
      toast.error("Invalid email format", {
        // Display an error toast
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    try {
      let payload = {
        user_name: data.user_name,
        mail: data.mail,
        password: data.password,
        amtoken: data.amtoken,

        first_name:data.first_name,
    last_name:data.last_name,
    company_name:data.company_name,
    photo:data.photo
      };

      // console.log(payload, "payload=====>");

      let data1 = await axios
        .post("https://fibregrid.amxdrones.com/dronecount/signup/", payload,{
          headers:{
            'Content-Type': 'multipart/form-data',
          }
        })
        .then((res) => {
          const data2 = res.data;

          console.log(res.data);

          if (res.data.Error == res.data.Error) {
            toast.error(res.data.Error, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              icon: <img src={drone} />,
            });
          }

          if (res.data.result.Data == "User Successfully Registered") {
            toast.success("User Successfully Registered", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              icon: <img src={drone} />,
            });

            setTimeout(() => {
              history.push("/login");
            }, 5000);
          }

          if (res.data.result.Data) {
            console.log("no error");
          }
          console.log(res.data.result);
          // history.push("/login");
        })
        .catch((err) => {
          if (err.response) {
            toast.error("Please check your credentials !"+err.response, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              icon: <img src={drone} />,
            });
            console.log(err.response.status);
            console.log(err.response.statusText);
            console.log(err.message);
            console.log(err.response.headers); // 👉️ {... response headers here}
            console.log(err.response.data); // 👉️ {... response data here}
          }
        });
      //   console.log(data1,"projectdata====>");
      //   console.log(data1.message,"projectdata====>statuys");

      //  if data1.code
      //   history.push('/admin');
    } catch (error) {
      console.log(error);
    }
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
                <img style={{ maxWidth: "66px" }} src={amxregister} alt="" />
                {/* <i className="feather icon-user-plus auth-icon"></i> */}
              </div>
              <h3 className="mb-4">Sign up</h3>
              
              <div className="row">
              <div className="col-md-6"  >
              <div className="mb-3">
            
            <span className="form-labels"><span className="asterisk-symbol">*</span>Username </span>
         

              <input
                 style={{padding:".5rem .2rem"}}
                onChange={changeHandler}
                name="user_name"
                value={data.user_name}
                type="text"
                className="form-control"
                placeholder="Enter Username"
                required
              />
               {errors.user_name && (
      <span className="error-message">Username is required</span>
    )}
          </div>
              </div> 
              <div className="col-md-6"  >
              <div className="mb-2">
              <span className="form-labels"><span className="asterisk-symbol">*</span>   Email </span>
             
                <input
                   style={{padding:".5rem .2rem"}}
                  type="email"
                  onChange={changeHandler}
                  name="mail"
                  value={data.mail}
                  className="form-control"
                  placeholder="Enter Email"
                  required
                />
                  {errors.mail && (
    <span className="error-message">
      {data.mail.trim() === '' ? 'Email is required' : 'Please enter valid email'}
    </span>
  )}
              </div>
              </div> 
              </div>

              <div className="row">
              <div className="col-md-6"  >
              <div className="mb-2">
              <span className="form-labels"><span className="asterisk-symbol">*</span>   Amxtoken </span>
             
                <input
                   style={{padding:".5rem .2rem"}}
                  type="text"
                  onChange={changeHandler}
                  name="amtoken"
                  value={data.amtoken}
                  className="form-control"
                  placeholder="Enter Amxtoken"
                  required
                />
                 {errors.amtoken && (
          <span className="error-message">Amxtoken is required</span>
        )}
              </div>
              </div> 
              

              <div className="col-md-6"  >
      <div className="mb-3">
        <span className="form-labels">
          <span className="asterisk-symbol">*</span> Password{' '}
        </span>

        <div className="password-input-wrapper">
          <input
            type={showPassword ? 'text' : 'password'}
            onChange={changeHandler}
            name="password"
            value={data.password}
            className="form-control mb-1 password-input"
            placeholder="Enter Password"
            required
            style={{padding:'.5rem 1.8rem .5rem .2rem'}}
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
      </div>
    </div>
              </div>



         

               <div className="row">
              
               <div className="col-md-6"  >
               <div className="mb-3">
            
               <span className="form-labels"><span className="asterisk-symbol">*</span>First Name </span>
           
         

              <input
                 style={{padding:".5rem .2rem"}}
                onChange={changeHandler}
                name="first_name"
                value={data.first_name}
                type="text"
                className="form-control"
                placeholder="Enter First Name"
                required
              />
              {errors.first_name && (
          <span className="error-message">First Name is required</span>
        )}
          </div>
               <div className="mb-3">
            
            <span className="form-labels">
              Last Name </span>
         

              <input
                 style={{padding:".5rem .2rem"}}
                onChange={changeHandler}
                name="last_name"
                value={data.last_name}
                type="text"
                className="form-control"
                placeholder="Enter Last Name"
                required
              />
             
          </div>

              <div className="mb-3">
            
            <span className="form-labels">
              {/* <span className="asterisk-symbol">*</span> */}
              Company Name </span>
         

              <input
              style={{padding:".5rem .2rem"}}
                onChange={changeHandler}
                name="company_name"
                value={data.company_name}
                type="text"
                className="form-control"
                placeholder="Enter Company Name"
                required
              />
              
          </div>
              </div> 
              <div className="col-md-6" style={{ padding: "0px 8px" }}>
        {imagePreview ? ( 
          <div
            className="image-preview"
            style={{
              border: '2px dashed #ccc',
              borderRadius: '50%',
              width: '150px',
              height: '150px',
              margin: '0 auto',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <img
              src={imagePreview}
              alt="Preview"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
        
          </div>
        ) : (
          <div 
            className="image-preview"
            style={{
              border: '2px dashed #ccc',
              borderRadius: '50%',
              width: '150px',
              height: '150px',
              margin: '0 auto',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <p style={{ textAlign: 'center', marginTop: '70px' }}>Upload Photo</p>
          </div>
        )}
        <div className="file-input-container">
        <label htmlFor="photo" className="file-input-label">
    
          
          <button type="button"  className="btn btn-secondary shadow-2 mb-4" style={{padding:".5rem 1rem"}} onClick={() => document.getElementById("photo").click()}>     
           {file ? "Change Photo" : "Upload Photo"}
           </button>
    
          </label>
        <input
          type="file"
          accept="image/*"
          id="photo"
          name="photo"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </div>
       
      </div>
     


              </div>
             

              
              <button
                className="btn btn-primary shadow-2 mb-4"
                onClick={SignUpbutton}
              >
                Sign up
              </button>
              <p className="mb-0 text-muted">
                Already have an account?{" "}
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

export default Register;

         {/* <div className="col-md-6" style={{ padding: "0px 8px" }}>
      <Dropzone onDrop={handleFileDrop} accept="image/*">
        {({ getRootProps, getInputProps }) => (
          <div
            className="dropzone"
            {...getRootProps()}
            style={{
              border: '2px dashed #ccc',
              borderRadius: '50%',
              width: '150px',
              height: '150px',
              margin: '0 auto',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <input {...getInputProps()} />
            {file && (
              <img
                src={imagePreview}
                alt="Preview"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: showPreview ? 'block' : 'none',
                }}
              />
            )}
            {file && (
              <button
                type="button"
                onClick={togglePreview}
                style={{
                  position: 'absolute',
                  bottom: '10px',
                  right: '10px',
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  cursor: 'pointer',
                }}
              >
                {showPreview ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
              </button>
            )}
          </div>
        )}
      </Dropzone>
      {file && (
        <button onClick={handleUploadPhoto} style={{ marginTop: '10px' }}>
          Confirm Upload
        </button>
      )}
    </div> */}
              {/* <div className="col-md-6"  >
              <div className="mb-2">
              <span className="form-labels"><span className="asterisk-symbol">*</span>   Mail: </span>
             
                <input
                  type="email"
                  onChange={changeHandler}
                  name="mail"
                  value={data.mail}
                  className="form-control"
                  placeholder="Enter Mail"
                  required
                />
                 {errors.mail && (
          <span className="error-message">mail is required</span>
        )}
              </div>
              </div>  */}
{/* <div className="mb-3">
            
                <span className="form-labels"><span className="asterisk-symbol">*</span>Username: </span>
             

                  <input
                    onChange={changeHandler}
                    name="user_name"
                    value={data.user_name}
                    type="text"
                    className="form-control"
                    placeholder="Enter Username"
                    required
                  />
                   {errors.user_name && (
          <span className="error-message">Username is required</span>
        )}
              </div>
              <div className="mb-2">
              <span className="form-labels"><span className="asterisk-symbol">*</span>   Mail: </span>
             
                <input
                  type="email"
                  onChange={changeHandler}
                  name="mail"
                  value={data.mail}
                  className="form-control"
                  placeholder="Enter Mail"
                  required
                />
                 {errors.mail && (
          <span className="error-message">mail is required</span>
        )}
              </div> */}

             
              {/* <div className="mb-2">
              <span className="form-labels"><span className="asterisk-symbol">*</span>   Amxtoken: </span>
             
                <input
                  type="password"
                  onChange={changeHandler}
                  name="amtoken"
                  value={data.amtoken}
                  className="form-control"
                  placeholder="Enter Amxtoken"
                  required
                />
                 {errors.amtoken && (
          <span className="error-message">Amxtoken is required</span>
        )}
              </div>

               <div className="mb-3">
        <span className="form-labels"><span className="asterisk-symbol">*</span>   Password: </span>
      
        <input
          type={showPassword ? "text" : "password"}
          onChange={changeHandler}
          name="password"
          value={data.password}
          className="form-control mb-1"
          placeholder="Enter Password"
          required
        />
        {errors.password && (
          <span className="error-message">Password is required</span>
        )} */}
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
      {/* </div> */}
      {/* <div className="mb-1">
              <span className="form-labels"><span className="asterisk-symbol">* required fileds</span></span>
          
              </div> */}
              {/* <div className="mb-3">
              <span className="form-labels">Enter Password: </span>
              {errors.password && (
          <span className="error-message">Missing required field</span>
        )}
                <input
                  onChange={changeHandler}
                  name="password"
                  value={data.password}
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  required
                />
              </div> */}
              {/* <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Username"
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="password"
              />
              
            </div>
            <div className="mb-1">
              <input
                type="text"
                className="form-control"
                placeholder="amxtoken"
              />
              
            </div> */}
              {/* <div className="form-group text-left">
                <div className="checkbox checkbox-fill d-inline">
                  <input
                    type="checkbox"
                    name="checkbox-fill-2"
                    id="checkbox-fill-2"
                  />
                  <label
                    for="checkbox-fill-2"
                    className="cr"
                    style={{ top: "10px" }}
                  >
                    {" "}
                    &nbsp; Save Details
                  </label>
                </div>
              </div> */}
              {/* <div className="form-group text-left">
                    <div className="checkbox checkbox-fill d-inline">
                        <input type="checkbox" name="checkbox-fill-2" id="checkbox-fill-2"/>
                        <label for="checkbox-fill-2" className="cr">Send me the <a href="#!"> Newsletter</a> weekly.</label>
                    </div>
                </div> */}
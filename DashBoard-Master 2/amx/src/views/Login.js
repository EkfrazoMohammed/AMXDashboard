import React, { useState } from 'react'
// import './styles/Login.css'

// import '/Users/apple/Documents/DashBoard-Master/black-dashboard-react-master/src/views/assets/images/favicon.ico'
import '../../../amx/src/assets/img/favicon.png'

// import '/Users/apple/Documents/DashBoard-Master/black-dashboard-react-master/src/views/assets/fonts/fontawesome/css/fontawesome-all.min.css'
import './../../src/views/assets/fonts/fontawesome/css/fontawesome-all.min.css'

// import '/Users/apple/Documents/DashBoard-Master/black-dashboard-react-master/src/views/assets/plugins/animation/css/animate.min.css'

// import '/Users/apple/Documents/DashBoard-Master/black-dashboard-react-master/src/views/assets/css/style.css'
// import amxlogin from "/Users/apple/Documents/DashBoard-Master/black-dashboard-react-master/src/assets/img/amx_login_icon.png";
import amxlogin from '../assets/img/amx_login_icon.png'
import { useHistory } from "react-router-dom";
import axios from "axios";
import {ToastContainer, toast} from 'react-toastify';
import drone from '../assets/drone.png'

const Login = () => {
    // const [phonenumber, setPhonenumber] = React.useState('');
    const [password, setPassword] = React.useState('');
    // let [phonenumber, setPhonenumber] = useState({
    //     phonenumber: "",
    //   });
    // let [state, setState] = useState({
    //     phonenumber: "",
    //   });

    
    const [data, setData] = useState({
        phonenumber: '',
        password: ''
    });
const changeHandler = (e) => {
    console.log(e.target.value,'e.target.name')
    setData({...data, [e.target.name]: e.target.value})
}
    const history = useHistory();


    // const LoginClick = (name) => {
    //    console.log("Login Clicked !!!!")
    //    history.push('/admin');
    //   };
  let LoginClick = async (e) => {
    e.preventDefault();

    try {
      let payload = {
        'user_name':data.phonenumber,
        'password':data.password
      };

      console.log(payload,'payload=====>');

      let data1 = await axios.post(
        "https://fibregrid.amxdrones.com/dronecount/login/",
        payload
      ).then(res => {
        console.log("999999999999====",res)
        localStorage.setItem('user_id',res.data.user_id)
        const data2 = res.data;
        history.push('/amx');
      })
      .catch(err => {
        if (err.response) {
            toast.error('Please check your credentials !', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                icon: <img src={drone}/>
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
      const SignUpClick = (name) => {
        console.log("SignUpClick Clicked !!!!")
        history.push('/register');
       };
    //    let { phonenumber } = state;
    // //    let { phonenumber } = phonenumber;

    //    let handleChange = (e) => {
    //     console.log("handleChange",e.target.value);
    //      let { phonenumber, value } = e.target;
    //      setState({ ...state, [phonenumber]: value });
        
    //    };


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
                    <img  style={{maxWidth:"66px"}} src={amxlogin} alt="" />
                    {/* <i className="feather icon-unlock auth-icon"></i> */}
                </div>
                <h3 className="mb-4">Login</h3>
                <div className="mb-3">
                    <input  onChange={changeHandler} name="phonenumber"
                                value={data.phonenumber}
                                
                                    type="text" className="form-control" placeholder="Username" />
                </div>
                <div className="mb-2">
                    <input type="password" onChange={changeHandler} name="password"
                                value={data.password}
                                  className="form-control" placeholder="password" />
                </div>
               
{/* 
                <div className="form-group text-left">
                    <div className="checkbox checkbox-fill d-inline">
                        <input type="checkbox" name="checkbox1-fill-2" id="checkbox-fill-2" />
                        <label for="checkbox-fill-2" className="cr">&nbsp;  Save Details</label>
                    </div>
                </div> */}



                {/* <div className="form-group text-left">
                    <div className="checkbox1 checkbox1-fill d-inline">
                        <input type="checkbox1" name="checkbox1-fill-1" id="checkbox1-fill-a1" />
                        <label for="checkbox1-fill-a1" className="cr"> Save Details</label>
                    </div>
                </div> */}
                <button onClick={LoginClick} className="btn btn-primary shadow-2 mb-4">Login</button>
                {/* <p className="mb-2 text-muted">Forgot password? <a href="auth-reset-password.html">Reset</a></p> */}
                {/* <p className="mb-0 text-muted">Don’t have an account? <b  onClick={SignUpClick}>Signup</b></p> */}
            </div>
        </div>
    </div>
</div>
    </>
   
  )
}

export default Login

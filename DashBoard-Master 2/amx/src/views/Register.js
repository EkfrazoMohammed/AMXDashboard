import React from 'react'
import '/Users/apple/Documents/DashBoard-Master/black-dashboard-react-master/src/views/assets/images/favicon.ico'
import '/Users/apple/Documents/DashBoard-Master/black-dashboard-react-master/src/views/assets/fonts/fontawesome/css/fontawesome-all.min.css'
import '/Users/apple/Documents/DashBoard-Master/black-dashboard-react-master/src/views/assets/plugins/animation/css/animate.min.css'
import '/Users/apple/Documents/DashBoard-Master/black-dashboard-react-master/src/views/assets/css/style.css'
import { useHistory } from "react-router-dom";

import amxregister from "/Users/apple/Documents/DashBoard-Master/black-dashboard-react-master/src/assets/img/amx_login_icon.png"

const Register = () => {
    const history = useHistory();
    const SignUpbutton = (name) => {
        console.log("SignUpbutton Clicked !!!!")
        history.push('/amx');
       };
  return (
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
                <img  style={{maxWidth:"66px"}} src={amxregister} alt="" />
                    {/* <i className="feather icon-user-plus auth-icon"></i> */}
                </div>
                <h3 className="mb-4"  >Sign up</h3>
                <div className="mb-3">
                    <input type="text" className="form-control" placeholder="Username"/>
                </div>
                <div className="mb-3">
                    <input type="email" className="form-control" placeholder="Email"/>
                </div>
                <div className="mb-2">
                    <input type="password" className="form-control" placeholder="password"/>
                </div>
                <div className="form-group text-left">
                    <div className="checkbox checkbox-fill d-inline">
                        <input type="checkbox" name="checkbox-fill-2" id="checkbox-fill-2" />
                        <label for="checkbox-fill-2" className="cr" style={{top
                            :"10px"}}> &nbsp; Save Details</label>
                    </div>
                </div>
                {/* <div className="form-group text-left">
                    <div className="checkbox checkbox-fill d-inline">
                        <input type="checkbox" name="checkbox-fill-2" id="checkbox-fill-2"/>
                        <label for="checkbox-fill-2" className="cr">Send me the <a href="#!"> Newsletter</a> weekly.</label>
                    </div>
                </div> */}
                <button className="btn btn-primary shadow-2 mb-4"  onClick={SignUpbutton}>Sign up</button>
                <p className="mb-0 text-muted">Allready have an account? <a href="auth-signin.html"> Log in</a></p>
            </div>
        </div>
    </div>
</div>
  )
}

export default Register

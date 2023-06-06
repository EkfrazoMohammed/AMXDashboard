
import React from "react";
import ReactDOM from 'react-dom';

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import AdminLayout from "layouts/Admin/Admin.js";
import RTLLayout from "layouts/RTL/RTL.js";
import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import ThemeContextWrapper from "./components/ThemeWrapper/ThemeWrapper";
import BackgroundColorWrapper from "./components/BackgroundColorWrapper/BackgroundColorWrapper";
import Register from "views/Register";
import Login from "views/Login.js";
import Child from "views/projects/Child";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// toast.configure()

ReactDOM.render(
  <React.StrictMode>
     <ThemeContextWrapper>
    <BackgroundColorWrapper>
      <BrowserRouter>
        <Switch>
        <Route from="/register" render={() => <Register/>} />
        <Route from="/login" render={() => <Login/>} />
        <Route from="/child" render={(props) => <Child {...props} />} />
        {/* <Route from="/adddrone" render={() => <AddDrone/>} /> */}
        {/* <Route from="/admin/processdata" render={() => <ProcessData/>} /> */}
       
          <Route path="/amx" render={(props) => <AdminLayout {...props} />} />
          {/* <Route path="/rtl" render={(props) => <RTLLayout {...props} />} /> */}
          <Redirect from="/" to="/login" />
          
          {/* <Redirect path="/login" to={Login} /> */}
          <ToastContainer />
        </Switch>
      </BrowserRouter>
    </BackgroundColorWrapper>
  </ThemeContextWrapper>
  </React.StrictMode>,
  document.getElementById('root')
);

// const root = ReactDOM.createRoot(document.getElementById("root"));

// root.render(
//   <ThemeContextWrapper>
//     <BackgroundColorWrapper>
//       <BrowserRouter>
//         <Switch>
//         <Route from="/register" render={() => <Register/>} />
//         <Route from="/login" render={() => <Login/>} />
//         <Route from="/createproject" render={() => <CreateProject/>} />
//         {/* <Route from="/adddrone" render={() => <AddDrone/>} /> */}
//         {/* <Route from="/admin/processdata" render={() => <ProcessData/>} /> */}
       
//           <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
//           {/* <Route path="/rtl" render={(props) => <RTLLayout {...props} />} /> */}
//           <Redirect from="/" to="/admin/dashboard" />
          
//           {/* <Redirect path="/login" to={Login} /> */}
//         </Switch>
//       </BrowserRouter>
//     </BackgroundColorWrapper>
//   </ThemeContextWrapper>
// );

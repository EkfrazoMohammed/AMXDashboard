/*!

=========================================================
* Black Dashboard React v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

/*eslint-disable*/
import React from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";

// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

// reactstrap components
import { Nav, NavLink as ReactstrapNavLink } from "reactstrap";
import {
  BackgroundColorContext,
  backgroundColors
} from "contexts/BackgroundColorContext";

var ps;

function Sidebar(props) {
  const location = useLocation();
  const sidebarRef = React.useRef(null);
  const [activenavlink, Setactivenavlink] = React.useState(true);

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    // console.log(location.pathname,'location.pathname',routeName,'routeName')
    if (location.pathname === "/amx"+routeName){
      Setactivenavlink(false)
    }
    else{
      Setactivenavlink(true)
    }
    return location.pathname === "/amx"+routeName ? "" : "active";
  };
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(sidebarRef.current, {
        suppressScrollX: true,
        suppressScrollY: false
      });
    }
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
    };
  });
  const linkOnClick = () => {
    // console.log('is active')
    // document.documentElement.classList.remove("nav-open");
  };
  const { routes, rtlActive, logo } = props;
  let logoImg = null;
  let logoText = null;
  if (logo !== undefined) {
    if (logo.outterLink !== undefined) {
      logoImg = (
        <a
          href={logo.outterLink}
          className="simple-text logo-mini"
          target="_blank"
          onClick={props.toggleSidebar}
        >
          <div className="logo-img" >
            <img src={logo.imgSrc} alt="react-logo" style={{ width: "100px", height: "100px" }} />
          </div>
        </a>
      );
      logoText = (
        <a
          href={logo.outterLink}
          className="simple-text logo-normal"
          target="_blank"
          onClick={props.toggleSidebar}
        >
          {logo.text}
        </a>
      );
    } else {
      logoImg = (
        // <Link
        //   to={logo.innerLink}
        //   className="simple-text logo-mini"
        //   onClick={props.toggleSidebar}
        // >
        //   <div className="logo-img">
        //     {/* <img src={logo.imgSrc} alt="react-logo" style={{width:"70px", height:"40px"}}  /> */}
        //   </div>
        // </Link>
        null
      );
      logoText = (
        <Link
          to={logo.innerLink}
          className=""
          onClick={props.toggleSidebar}
        >
          <img src={logo.imgSrc} alt="react-logo" style={{}} />

        </Link>
      );
    }
  }
  return (
    <BackgroundColorContext.Consumer>
      {({ color }) => (
        <div className="sidebar" data={color}>
          <div className="sidebar-wrapper" ref={sidebarRef}>
            {logoImg !== null || logoText !== null ? (
              <div className="logo" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                // width: '70px',
                height: ' 70px',
                // backgroundColor: '#f2f2f2'

              }}>
                {/* {logoImg} */}
                {/* {logoText} */}
                <Link
                  // to={logo.innerLink}
                  to={'/amx'}
                  className=""
                  onClick={props.toggleSidebar}
                >
                  <img src={logo.imgSrc} alt="react-logo" style={{

                    width: '70px',
                    height: '40px',
                  }} />

                </Link>
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: '50%',
                    width: '80%',
                    height: '2px',
                    // backgroundColor: '#4CAF50'
                }}></div>
              </div>
            ) : null}
            <Nav>
              {routes.map((prop, key) => {
                // console.log(prop.path,'prop========>')
                if (prop.redirect) return null;
                return (
                  <li
                    className={
                      activeRoute(prop.path) + (prop.pro ? " active-pro" : "active")
                    }
                    key={key}
                  >
                    <NavLink
                  
                    
                      to={prop.layout + prop.path}
                      // className="nav-link"
                      // activeClassName="active"
                    
                      onClick={props.toggleSidebar}
                    >
                      <i style={{color:'white'}} className={prop.icon} />
                      <p style={{color:'white'}}>{prop.name}</p>
                    </NavLink>
                  </li>
                );
              })}

            </Nav>
          </div>
        </div>
      )}
    </BackgroundColorContext.Consumer>
  );
}

Sidebar.propTypes = {
  // if true, then instead of the routes[i].name, routes[i].rtlName will be rendered
  // insde the links of this component
  rtlActive: PropTypes.bool,
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the text of the logo
    text: PropTypes.node,
    // the image src of the logo
    imgSrc: PropTypes.string
  })
};

export default Sidebar;

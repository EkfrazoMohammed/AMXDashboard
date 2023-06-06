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
import React from "react";

// reactstrap components
import { Button, Dropdown, DropdownToggle, Badge } from "reactstrap";
import { ThemeContext, themes } from "contexts/ThemeContext";
import { backgroundColors } from "contexts/BackgroundColorContext";

function FixedPlugin(props) {
  const [dropDownIsOpen, setdropDownIsOpen] = React.useState(false);
  const handleClick = () => {
    setdropDownIsOpen(!dropDownIsOpen);
  };
  return (
    <div className="fixed-plugin" >
      <Dropdown isOpen={dropDownIsOpen} toggle={handleClick}>
        <DropdownToggle tag="div">
          <i className="fa fa-cog fa-2x" />
        </DropdownToggle>
        <ul style={{ height:'170px', borderRadius: '1rem' }} className="dropdown-menu show">
          <li className="header-title">SIDEBAR BACKGROUND</li>
          <li style={{padding:'0px 0px'}} className="adjustments-line">
            <div className="badge-colors text-center">
              <Badge
                style={{ marginTop: '5px', borderRadius: '3px' }}
                color="primary"
                className={
                  props.bgColor === backgroundColors.primary ? "" : "active"
                }
                onClick={() => {
                  props.handleBgClick(backgroundColors.primary);
                }}
              />{" "}
              <Badge
                style={{ marginTop: '5px', borderRadius: '3px' }}
                color="info"
                className={
                  props.bgColor === backgroundColors.blue ? "" : "active"
                }
                onClick={() => {
                  props.handleBgClick(backgroundColors.blue);
                }}
              />{" "}
              <Badge
                style={{ marginTop: '5px', borderRadius: '3px' }}
                color="success"
                className={
                  props.bgColor === backgroundColors.green ? "" : "active"
                }
                onClick={() => {
                  props.handleBgClick(backgroundColors.green);
                }}
              />{" "}
            </div>
          </li>
          <li style={{height:'auto',marginTop:'30px',padding:'0px 0px'}} className="adjustments-line text-center color-change">
            <ThemeContext.Consumer>
              {({ changeTheme }) => (
                <>
                  <span style={{marginRight:'10px'}} className="color-label">LIGHT MODE</span>{" "}
                  <Badge
                    style={{ marginTop: '5px', borderRadius: '3px' }}
                    className="light-badge mr-2"
                    onClick={() => changeTheme(themes.light)}
                  />{" "}
                  {/* <Badge
                    style={{ marginTop: '5px', borderRadius: '3px' }}
                    className="dark-badge ml-2"
                    onClick={() => changeTheme(themes.dark)}
                  />{" "}
                  <span style={{marginLeft:'10px'}} className="color-label">DARK MODE</span>{" "} */}
                </>
              )}
            </ThemeContext.Consumer>
          </li>

        </ul>
      </Dropdown>
    </div>
  );
}

export default FixedPlugin;

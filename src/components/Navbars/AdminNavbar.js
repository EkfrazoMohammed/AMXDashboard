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
import React,{useState} from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
import avatarimage from "../../assets/img/anime3.png"
import { ToastContainer, toast } from "react-toastify";
// reactstrap components
import {
  Button,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Input,
  InputGroup,
  NavbarBrand,
  Navbar,
  NavLink,
  Nav,
  Container,
  Modal,
  NavbarToggler,
  ModalHeader,
} from "reactstrap";
import { useHistory } from "react-router-dom";
import defaultProfilePhoto from "assets/img/anime3.png"


const ConfirmBox = ({ message, onConfirm }) => {
  const handleConfirm = () => {
    toast.dismiss(); // Close the toast notification
    onConfirm({
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    }); // Call the callback function passed as a prop
  };

  const handleCancel = () => {
    toast.dismiss(); // Close the toast notification
  };

  return (
    <div>
      <div>{message}</div>
      <div style={{display:"flex",gap:"5px"}}>

      <Button onClick={handleConfirm} style={{padding:"10px"}}>Confirm</Button>
      <Button onClick={handleCancel}  style={{padding:"10px"}}>Cancel</Button>
      </div>
    </div>
  );
};


function AdminNavbar(props) {

  const handleConfirm = () => {
    // Handle the confirm action here
   
  console.log("LogOutClick Clicked !!!!");
  toast.success("User Logged out Successfuly!", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
  setTimeout(()=>{

    history.push("/login");
   
  },1000)
  localStorage.clear();


   
  };

  const openConfirmBox = () => {
    toast.info(
 
    <ConfirmBox message="Are you sure to Logout?" onConfirm={handleConfirm} />, {
      closeOnClick: false,
      closeButton: false,
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };


  const [collapseOpen, setcollapseOpen] = React.useState(false);
  const [modalSearch, setmodalSearch] = React.useState(false);
  const [color, setcolor] = React.useState("navbar-transparent");

  const [photo, setPhoto] = useState("");
  // const local_profile_photo = localStorage.getItem('profile_photo');

  React.useEffect(() => {
    // Save the 'photo' state into 'local_profile_photo' in localStorage
    setPhoto(localStorage.getItem('profile_photo'))
  }, []);

  console.log('local_profile_photo =>',photo);

  React.useEffect(() => {
    window.addEventListener("resize", updateColor);
    // Specify how to clean up after this effect:
    return function cleanup() {
      window.removeEventListener("resize", updateColor);
    };
  });
  // function that adds color white/transparent to the navbar on resize (this is for the collapse)
  const updateColor = () => {
    if (window.innerWidth < 993 && collapseOpen) {
      setcolor("bg-white");
    } else {
      setcolor("navbar-transparent");
    }
  };
  // this function opens and closes the collapse on small devices
  const toggleCollapse = () => {
    if (collapseOpen) {
      setcolor("navbar-transparent");
    } else {
      setcolor("bg-white");
    }
    setcollapseOpen(!collapseOpen);
  };
  // this function is to open the Search modal
  const toggleModalSearch = () => {
    setmodalSearch(!modalSearch);
  };
  const history = useHistory();


  const LogOutClick = (name) => {
    console.log("LogOutClick Clicked !!!!");
    localStorage.clear();

    // toast.success("User Logged out Successfuly!", {
    //   position: "top-right",
    //   autoClose: 5000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    //   theme: "light",
    // });
    history.push("/login");
  };

  const UserProfileClick = (name) => {
    console.log("UserProfileClick Clicked !!!!");
    history.push("/amx/userprofile");
  };
  return (
    <>
      <ToastContainer />
      <Navbar className={classNames("navbar-absolute", color)} expand="lg">
        <Container fluid>
          <div className="navbar-wrapper">
            <div
              className={classNames("navbar-toggle d-inline", {
                toggled: props.sidebarOpened,
              })}
            >
              <NavbarToggler onClick={props.toggleSidebar}>
                <span className="navbar-toggler-bar bar1" />
                <span className="navbar-toggler-bar bar2" />
                <span className="navbar-toggler-bar bar3" />
              </NavbarToggler>
            </div>
            <NavbarBrand href="#pablo" onClick={(e) => e.preventDefault()}>
              {props.brandText}
            </NavbarBrand>
          </div>
          <NavbarToggler onClick={toggleCollapse}>
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
          </NavbarToggler>
          <Collapse navbar isOpen={collapseOpen}>
            <Nav className="ml-auto" navbar>
              {/* <InputGroup className="search-bar">
                <Button color="link" onClick={toggleModalSearch}>
                  <i className="tim-icons icon-zoom-split" />
                  <span className="d-lg-none d-md-block">Search</span>
                </Button>
              </InputGroup> */}
              {/* <UncontrolledDropdown nav> */}
              {/* <DropdownToggle
                  caret
                  color="default"
                  data-toggle="dropdown"
                  nav
                > */}
              {/* <div className="notification d-none d-lg-block d-xl-block" /> */}
              {/* <i className="tim-icons icon-sound-wave" /> */}
              {/* <i className="tim-icons icon-bell-55" />  */}

              {/* <p className="d-lg-none">Notifications</p> */}
              {/* </DropdownToggle> */}
              {/* <DropdownMenu className="dropdown-navbar" right tag="ul"> */}
              {/* <NavLink tag="li">
                    <DropdownItem className="nav-item">
                      New drone is added
                    </DropdownItem>
                  </NavLink> */}
              {/* <NavLink tag="li">
                    <DropdownItem className="nav-item">
                      New project is created
                    </DropdownItem>
                  </NavLink> */}
              {/* <NavLink tag="li">
                    <DropdownItem className="nav-item">
                      Your friend Michael is in town
                    </DropdownItem>
                  </NavLink>
                  <NavLink tag="li">
                    <DropdownItem className="nav-item">
                      Another notification
                    </DropdownItem>
                  </NavLink>
                  <NavLink tag="li">
                    <DropdownItem className="nav-item">
                      Another one
                    </DropdownItem>
                  </NavLink> */}
              {/* </DropdownMenu> */}
              {/* </UncontrolledDropdown> */}
              <UncontrolledDropdown nav>
                <DropdownToggle
                  caret
                  color="default"
                  nav
                  onClick={(e) => e.preventDefault()}
                >
                  <div className="photo">
                  {/* <img alt="..." src={defaultProfilePhoto} /> */}
                  {photo === null || photo === undefined || photo === "undefined" || photo === ''? (
  <>
    <img alt="..." src={avatarimage} className="avatar" />
  </>
) : (
  <>
    <img alt="..." src={photo} className="avatar" />
  </>
)}
                  {/* {
  !photo || photo === null || photo === '' ? (
    <>
      <img alt="..." src={require("assets/img/anime3.png")} className="avatar" />
    </>
  ) : (
    <>
      <img alt="..." src={photo} className="avatar" />
    </>
  )
} */}
    {/* {
                    
                    photo==null?<>
                    
                    <img alt="..." src={require("assets/img/anime3.png")} className="avatar"/>
                    </>:<>
                    <img alt="..." src={photo} className="avatar"/>
                    </>
                    
                  } */}
                  </div>
                  {/* <b className="caret d-none d-lg-block d-xl-block" /> */}
                  {/* <p onClick={LogOutClick} className="d-lg-none">
                    Log out
                  </p>
                  <p onClick={LogOutClick} className="d-lg-none">
                    Log out
                  </p> */}
                  
                </DropdownToggle>
                <DropdownMenu className="dropdown-navbar" right tag="ul">
                  {/* <DropdownItem divider tag="li" /> */}
                  <NavLink tag="li">
                  <DropdownItem
                      
                      className="nav-item text-info"
                      onClick={UserProfileClick}
                    >
                      Profile
                    </DropdownItem>
                    <DropdownItem
                      // onClick={LogOutClick}
                      className="nav-item text-danger"
                      onClick={openConfirmBox}
                      style={{color:"red"}}
                    >
                       {/* <button onClick={openConfirmBox}>Open Confirm Box</button> */}
                      Log out
                    </DropdownItem>

                  </NavLink>
                </DropdownMenu>
              </UncontrolledDropdown>
              <li className="separator d-lg-none" />
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
      <Modal
        modalClassName="modal-search"
        isOpen={modalSearch}
        toggle={toggleModalSearch}
      >
        <ModalHeader>
          <Input placeholder="SEARCH" type="text" />
          <button
            aria-label="Close"
            className="close"
            onClick={toggleModalSearch}
          >
            <i className="tim-icons icon-simple-remove" />
          </button>
        </ModalHeader>
      </Modal>
    </>
  );
}

export default AdminNavbar;

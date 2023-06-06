
import NotificationAlert from "react-notification-alert";


import React, { useEffect, useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
import './styles/dashboard.css'
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";


import { Link } from "react-router-dom/cjs/react-router-dom.min";
// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip,
  Alert,
  UncontrolledAlert,


} from "reactstrap";




import { PieChart, Pie } from "recharts";
// import { faCheckSquare, faCoffee } from '@fortawesome/fontawesome-free-solid'


import { faBoxArchive, faBriefcase, faCamera, faClose, faDrum, faDrumstickBite, faEllipsis, faFileAudio, faFileInvoice, faGraduationCap, faMicrophone, faPlug, faPlus, faShareNodes, faUser, faVideo } from '@fortawesome/free-solid-svg-icons'

import dronelogo from "/Users/apple/Documents/DashBoard-Master/black-dashboard-react-master/src/views/assets/images/drone-icon.png"
import projectfolder from "/Users/apple/Documents/DashBoard-Master/black-dashboard-react-master/src/views/assets/images/project-folder-black.png"
import projectblue from "/Users/apple/Documents/DashBoard-Master/black-dashboard-react-master/src/views/assets/images/project-folder-blue.png"
import drone from "../assets/drone.png"
import dronecamera from "../assets/camera-drone.png"

// core components
import {
  chartExample1,
  chartExample2,
  chartExample3,
  chartExample4
} from "variables/charts.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BackgroundColorContext, backgroundColors } from "contexts/BackgroundColorContext";
import ProgressBar from "components/ProgressBar/progress_bar";
import DropFileInput from "./DropFileInput/DropFileInput";
// import {icon1} from "../../src/assets/img/anime3.png"



function Dashboard(props) {
  // Notification starts
  const notificationAlertRef = React.useRef(null);
  const [project_list, setfolder_list] = React.useState([]);

  const notify = (place) => {
    var color = Math.floor(Math.random() * 5 + 1);
    var type;
    switch (color) {
      case 1:
        type = "primary";
        break;
      case 2:
        type = "success";
        break;
      case 3:
        type = "danger";
        break;
      case 4:
        type = "warning";
        break;
      case 5:
        type = "info";
        break;
      default:
        break;
    }
    var options = {};
    options = {
      place: place,
      message: (
        <div>
          <div>
            Welcome to <b>Black Dashboard React</b> - a beautiful freebie for
            every web developer.
          </div>
        </div>
      ),
      type: type,
      icon: "tim-icons icon-bell-55",
      autoDismiss: 7
    };
    notificationAlertRef.current.notificationAlert(options);
  };

  // notifications ends




  const [imageData, setImageData] = useState(null);

  function handleFileUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const fileData = reader.result;
      setImageData(fileData);
    };
  }


  const onFileChange = (files) => {
    console.log(files);
  }

  const drone_list = [
    {
      'drone_name': 'DJI Mavic Pro1',
      'folder_color': '#e66037',
      'link': '/'
    },
    {
      'drone_name': 'DJI Mavic Pro2',
      'folder_color': '#55a6bd',
      'link': '/amx/processdata'

    },
    {
      'drone_name': 'DJI Mavic Pro3',
      'folder_color': '#de9646',
      'link': '/amx/processdata'


    },
    {
      'drone_name': 'DJI Mavic Pro4',
      'folder_color': 'rgb(55,109,236)',
      'link': '/amx/processdata'

    },

  ]

  // const project_list = [
  //   {
  //     'project_name': 'Project 1',
  //     'project_folder_color': 'rgb(255,255,255)',
  //     'numberoffile': "340 files",
  //     'link': '/'
  //   },
  //   {
  //     'project_name': 'Project 2',
  //     'project_folder_color': 'rgb(255,255,255)',
  //     'numberoffile': "215 files",
  //     'link': '/amx/processdata'

  //   },
  //   {
  //     'project_name': 'Project 3',
  //     'project_folder_color': 'rgb(255,255,255)',
  //     'numberoffile': "75 files",
  //     'link': '/amx/processdata'


  //   },
  //   {
  //     'project_name': 'Project 4',
  //     'project_folder_color': 'rgb(255,255,255)',
  //     'numberoffile': "51 files",
  //     'link': '/amx/processdata'

  //   },


  // ]

  const recent_project_list = [
    {
      'project_name': 'Project 1',
      'folder_color': '#D65A47',
      'numberoffile': "340 files",
      'size': '30 MB',
      'link': '/'
    },
    {
      'project_name': 'Project 2',
      'folder_color': 'rgb(64,153,173',
      'numberoffile': "215 files",
      'size': '30 MB',
      'link': '/amx/processdata'

    },
    {
      'project_name': 'Project 3',
      'folder_color': 'rgb(239,185,93)',
      'numberoffile': "75 files",
      'size': '30 MB',
      'link': '/amx/processdata'


    },
    {
      'project_name': 'Project 4',
      'folder_color': 'rgb(55,109,236)',
      'numberoffile': "51 files",
      'size': '30 MB',
      'link': '/amx/processdata'

    },


  ]



  const data01 = [
    {
      name: "Group A",
      value: 400,
    },
    {
      name: "Group B",
      value: 300,
    },
  ];
  const data02 = [
    {
      name: "Group A",
      value: 200,
    },
    {
      name: "Group B",
      value: 90,
    }
  ];
  const [bigChartData, setbigChartData] = React.useState("data1");

  const [addprojectopen, setaddprojectopen] = React.useState(false);



  const setBgChartData = (name) => {
    setbigChartData(name);
  };

  const AddProject = (name) => {
    console.log("AddProject======")
    setaddprojectopen(true)
  };
  const CloseProject = (name) => {
    setaddprojectopen(false)
  };

  const SendProject = () => {
    setaddprojectopen(false)
    toast.info('This feature in dashboad is under development !', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      icon: <img src={drone} />
    });
  };

  const BuyNow = () => {
    setaddprojectopen(false)
    toast.info('Buy functionality is under development!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      icon: <img src={drone} />
    });
  };

  const OKProject = (name) => {
    setaddprojectopen(false)
  };

  let GetAllProjects = async () => {
    
    try {
      let data = await axios.get(
        "https://fibregrid.amxdrones.com/dronecount/projects/"
      );
      console.log(data,"projectdata====>");
      setfolder_list(data.data)
      toast.success('Your project folder updated !', {
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
      // toast(`Successfully ${project_name}  project data was created`);
      // navigate("/");
      // CloseProject()
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetAllProjects()
    toast.success('Wellcome to dasboad ADMIN !', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      icon: <img src={drone} />
    });
  },[])

  let [state, setState] = useState({
    name: "",
  });
  let { name } = state;
  let handleChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  let handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let payload = state;
      console.log(payload,'payload=====>');
      let data = await axios.post(
        "https://fibregrid.amxdrones.com/dronecount/projects/",
        payload
      ).then(res => {
        // const data2 = res.data;
        toast.success('New project added !', {
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
     
      CloseProject()
      GetAllProjects()
      })
      .catch(err => {
        if (err.response) {
            toast.error('Server down, Please try agin later !', {
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
                GetAllProjects()
                CloseProject()
          console.log(err.response.status);
          console.log(err.response.statusText);
          console.log(err.message);
          console.log(err.response.headers); // 👉️ {... response headers here}
          console.log(err.response.data); // 👉️ {... response data here}
        }
      });
      
    } catch (error) {
      console.log(error);
    }
  };


  console.log(addprojectopen, 'addprojectopen====>')
  return (
    <BackgroundColorContext.Consumer>
      {({ color }) => (


        <>
          <ToastContainer />

          <div className="react-notification-alert-container">
            <NotificationAlert ref={notificationAlertRef} />
          </div>


          <div className={addprojectopen == true ? "overlay show" : "overlay"}>

            {/* <!-- popup box start --> */}
            <div className="popup-outer" >
              <div className="popup-box">
                {/* <i id="close" className="bx bx-x close"></i> */}
                <FontAwesomeIcon onClick={CloseProject} className="close" icon={faClose} />
                <div className="profile-text" >
                  {/* <img src="profile.jpg" alt="" />  */}
                  <div className="text">
                    <span className="name">Create Projects</span>
                    {/* <span className="profession">Web & Web Designer</span> */}
                  </div>
                </div>
                {/* <form action="#"> */}
                {/* <div className="wraper-dashboard"  >
                    <div className="wraper-card-content-dashboard" >
                      <header>Upload files </header>
                      <DropFileInput
                        onFileChange={(files) => onFileChange(files)}
                      />

                    </div>


                  </div> */}
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  name="name"
                  placeholder="Name"
                  value={name}
                  onChange={handleChange}
                />
                {/* <textarea spellcheck="false" placeholder="Enter your message"></textarea> */}
                <div className="button">
                  <button id="close" onClick={CloseProject} className="cancel">Cancel</button>
                  <button className="send" onClick={handleSubmit}>Create</button>
                </div>
                {/* </form> */}
              </div>
            </div>
          </div>


          {/* Dashboard */}

          <div className="content" style={{ backgroundColor: color == 'green' ? 'rgba(255,140,49,.05)' : color == 'primary' ? 'rgba(253,101,113,.05)' : "rgba(65, 195, 199,.03)" }} >


            {/* <div className={addprojectopen == true ? "overlay show" : "overlay"} id="overlay">
  <div data={color} className="popup show" id="popup">
    <h2>Create Projects</h2>
    <input type="file" placeholder="Choose File" />
    <input type="text" placeholder="Enter Text" />
    <button onClick={CloseProject}>Close</button>
    <button onClick={OKProject}>Ok</button>
  </div>
</div> */}





            <div className="container-fluid">


              <div className="row">
                {/* Left section */}

                <div className="col-md-8 col-sm-8 left-section">
                  {/* <h2>Left Section</h2> */}
                  <>
                    {/* Drone List */}
                    {/* <Row > */}
                    {/* {drone_list.map((item) =>
                        <Col md="3" sm='3' >
                          <div className="card1" onClick={() => notify("tc")}>
                            <div className="content" style={{ backgroundColor: item.folder_color, marginLeft: "10px" }}>
                             
                              <img src={dronelogo} style={{ width: "30px", height: "30px" }} />
                              <h4 style={{ marginBottom: "5px", fontSize: "12px", fontWeight: "400", color: "white" }}>{item.drone_name}</h4>
                            
                            </div>
                          </div>
                        </Col>
                      )} */}
                    {/* <Col md="2">
      <div className="card1">
        <div className="content">
        
          <img src={dronelogo}   style={{width:"30px", height:"30px"}}  />
          <h4 style={{ marginBottom: "5px", fontSize: "13px", fontWeight: "bold" }}>Drone-two</h4>
          <h5 style={{ marginBottom: "5px", fontSize: "13px" }}> 30 files</h5>

         
        </div>
      </div>
    </Col> */}
                    {/* <Col md="2">
      <div className="card1">
        <div className="content">
          
          <img src={dronelogo}   style={{width:"30px", height:"30px"}}  />

          <h4 style={{ marginBottom: "5px", fontSize: "13px", fontWeight: "bold" }}>Drone-three</h4>
          <h5 style={{ marginBottom: "5px", fontSize: "13px" }}> 90 files</h5>

         
        </div>
      </div>
    </Col> */}



                    {/* </Row> */}

                    <Row>
                      <Col className="text-left" md="6">
                        <CardTitle tag="h4" style={{}}>
                          Active Projects

                        </CardTitle>
                      </Col>

                    </Row>


                    <Row>
                      {project_list.map((item) =>
                        <Col md="3">
                          <div className="card2">
                            <div className="content" style={{ backgroundColor: 'white', marginLeft: "10px" }}>
                              {/* <FontAwesomeIcon icon={faBriefcase} style={{ color: "#ffffff", width: "20px", height: "20px" }} /> */}
                              <img src={projectblue} style={{ width: "20px", height: "20px", }} />

                              <h4 style={{ marginBottom: "5px", fontSize: "13px", fontWeight: "400" }}>{item.name}</h4>
                              <h5 style={{ marginBottom: "5px", fontSize: "13px", fontWeight: "200" }}>-</h5>

                              {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
                            </div>
                          </div>
                        </Col>
                      )}


                      {/* <Col md="2">
      <div className="card2">
        <div className="content">
          <FontAwesomeIcon icon={faUser} style={{ color: "#ffffff", width: "20px", height: "20px" }} />

          <h4 style={{ marginBottom: "5px", fontSize: "13px", fontWeight: "bold" }}>Personal</h4>
          <h5 style={{ marginBottom: "5px", fontSize: "13px" }}> 215 files</h5>

       
        </div>
      </div>
    </Col> */}
                      {/* <Col md="2">
      <div className="card2">
        <div className="content">
          <FontAwesomeIcon icon={faGraduationCap} style={{ color: "#ffffff", width: "20px", height: "20px" }} />

          <h4 style={{ marginBottom: "5px", fontSize: "13px", fontWeight: "bold" }}>School</h4>
          <h5 style={{ marginBottom: "5px", fontSize: "13px" }}> 75 files</h5>

          
        </div>
      </div>
    </Col> */}
                      {/* <Col md="2">
      <div className="card2">
        <div className="content">
          <FontAwesomeIcon icon={faBoxArchive} style={{ color: "#ffffff", width: "20px", height: "20px" }} />

          <h4 style={{ marginBottom: "5px", fontSize: "13px", fontWeight: "bold" }}>Archive</h4>
          <h5 style={{ marginBottom: "5px", fontSize: "13px" }}> 51 files</h5>

         
        </div>
      </div>
    </Col> */}



                      <Col md="3">
                        <div onClick={AddProject} className=""  >
                          <div className="content mt-3" >
                            <button
                              type="file"
                              className="header-content-btn2"
                            // onClick={handleClickOpen}
                            >
                              +
                            </button>

                            {/* <FontAwesomeIcon icon={faPlus} style={{ color: "black", width: "20px", height: "20px" }} />
          <h4 style={{ marginBottom: "5px", fontSize: "13px", fontWeight: "bold", }}>Add </h4> */}
                            {/* <h5 style={{ marginBottom: "5px", fontSize: "13px" }}> Number</h5> */}

                            {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
                          </div>
                        </div>
                      </Col>
                    </Row>


                    <Row>
                      <Col className="text-left" md="6">
                        <CardTitle tag="h4" style={{ marginTop: "20px" }}>
                          Recent Projects

                        </CardTitle>
                      </Col>

                    </Row>

                    <Row>


                      <Col md="12" style={{ marginTop: "20px" }}>

                        {/* <Card>
              <CardHeader>
                <CardTitle tag="h4">Recent Projects</CardTitle>
              </CardHeader> */}
                        {/* <CardBody> */}

                        {/* <UncontrolledAlert > */}
                        {project_list.map((item) =>
                          <div className="card4">

                            <div className="icon-container1" style={{ backgroundColor: 'rgb(239,185,93)' }}>

                              <i className="fa-solid icon1 fa-sheet-plastic"></i>
                            </div>


                            {/* <p>{item.project_name}</p>
                            <p>{item.numberoffile}</p>
                            <p>{item.size}</p> */}

                            <p>{item.name}</p>
                            {/* <p>-</p>
                            <p>-</p> */}
                          </div>
                        )}

                        {/* <div className="card5" >
                  <FontAwesomeIcon icon={faUser} style={{ color: "white", width: "25px", height: "25px", marginLeft: "10px" }} />
                  <p>IMG_1000</p>
                  <p>PNG file</p>
                  <p>5 MB</p>
                </div>

                <div className="card6" >
                  <FontAwesomeIcon icon={faMicrophone} style={{ color: "white", width: "25px", height: "25px", marginLeft: "10px" }} />
                  <p>IMG_1000</p>
                  <p>PNG file</p>
                  <p>5 MB</p>
                </div>

                <div className="card7" >
                  <FontAwesomeIcon icon={faFileInvoice} style={{ color: "white", width: "25px", height: "25px", marginLeft: "10px" }} />
                  <p>IMG_1000</p>
                  <p>PNG file</p>
                  <p>5 MB</p>
                </div> */}


                        {/* </UncontrolledAlert> */}




                        {/* <UncontrolledAlert className="alert-with-icon" color="info">
        <span className="tim-icons icon-bell-55" data-notify="icon" />
        <span data-notify="message">
          This is a notification with close button and icon and have
          many lines. You can see that the icon and the close button
          are always vertically aligned. This is a beautiful
          notification. So you don't have to worry about the style.
        </span>
        
      </UncontrolledAlert> */}
                        {/* </CardBody> */}
                        {/* </Card> */}
                      </Col>
                    </Row>


                  </>

                </div>


                {/* Right Section */}
                <div className=" col-md-4 ">
                  {/* <h2>Right Section</h2> */}
                  <>
                    <div style={{
                      // background: "red",
                      // borderRadius: "1rem",
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingLeft: "25px",
                      paddingRight: "25px"

                    }}>
                      <div

                        className="container"
                        style={{
                          background: "white",
                          borderRadius: "1rem",
                          justifyContent: 'center',
                          alignItems: 'center',
                          padding: "10px",
                          width: "300px"


                        }}
                      >
                        <h3 style={{ textAlign: "center", }} className="Storage-chart">Storage</h3>
                        <div style={{ textAlign: "center", marginBottom: 'auto' }}>
                          <PieChart width={240} height={270} >
                            {/* <Pie
      <h1></h1>
        /> */}

                            <Pie
                              data={data02}
                              dataKey="value"
                              nameKey="name"
                              cx="60%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={90}
                              fill={color == 'green' ? "#ff8c31" : color == 'primary' ? '#fd6585' : "rgb(65, 195, 199)"}
                              label

                            />
                          </PieChart>
                        </div>

                        <div style={{ textAlign: "center" }} className="center">

                          {/* <div style={{textAlign:"center"}}className="">
          <div className="">
            <div
              className=""
              style={{
                background: "rgba(18, 212, 255, 0.1)",
                borderRadius: "1rem",
                textAlign:"center"
              }}
            >
              <div style={{textAlign:"center"}} className="storage-text">
                <span style={{textAlign:"center"}} >storage</span> 
                40% left
              </div>
              <sub style={{textAlign:"center"}}>3 GB of 5 GB are used</sub>

              <div
                className="w3-light-blue"
                style={{ borderRadius: "1rem" }}
              >
                <div
                  className="w3-blue"
                  style={{
                    height: "8px",
                    width: "60%",
                    borderRadius: "1rem",
                  }}
                ></div>
              </div>
              <br />
            </div>
          </div>
        </div> */}
                          <div >
                            <ProgressBar color={color} />
                          </div>

                          <div onClick={BuyNow} className="container-storage">
                            <a  data={color} className="buynow" title="Buy storage"><i style={{color:'white'}} className="tim-icons icon-key-25"></i>
                              <span style={{ marginLeft: '10px',color:'white' }}>
                                Buy now
                              </span>

                            </a>
                            {/* <button style={{textAlign:"center"}} className="Storage-btn">BUY STORAGE</button> */}
                          </div>
                          {/* <span style={{textAlign:"center"}} className="storage-part-recent-projects">
          Recent Projects
        </span>
        <div className="card card-recent-prjects-list">
          <i className="bi bi-folder2-open">
            <span style={{textAlign:"center"}} className="project-lists-file"> project 1</span>
          </i>
        </div>
        <div className="card card-recent-prjects-list">
          <i className="bi bi-folder2-open">
            <span style={{textAlign:"center"}} className="project-lists-file"> project 2</span>
          </i>{" "}
        </div> */}

                        </div>
                      </div>
                    </div>

                  </>

                </div>
              </div>
            </div>


          </div>

        </>

      )}
    </BackgroundColorContext.Consumer>
  );
}

export default Dashboard;




{/* </Col> */ }

{/* <Col  lg="2">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Daily Sales</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-delivery-fast text-primary" />{" "}
                  3,500€
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Bar
                    data={chartExample3.data}
                    options={chartExample3.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col  lg="2">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Completed Tasks</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-send text-success" /> 12,100K
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={chartExample4.data}
                    options={chartExample4.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col  lg="2">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Completed Tasks</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-send text-success" /> 12,100K
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={chartExample4.data}
                    options={chartExample4.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col> */}

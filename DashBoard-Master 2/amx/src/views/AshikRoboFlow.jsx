import React, { useState, useEffect, useRef } from "react";

import { Line, Pie, Doughnut, Bar, PolarArea, Bubble } from "react-chartjs-2"; // Import Line component
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  BarElement,
  ArcElement,
} from "chart.js";
import Droneimage from "../../src/views/assets/images/drone-dashboardICON.png";
import MissioIcon from "../../src/views/assets/images/png/missonLogo_dashboard.png";
import "../../src/views/assets/css/style.css";
import { faker } from "@faker-js/faker"; // Updated import
// import {
//   chartExample1,
//   chartExample2,
//   chartExample3,
//   chartExample4,
// } from "variables/charts.js";
import NotificationAlert from "react-notification-alert";

// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import "./styles/dashboard.css";
import { ToastContainer, toast } from "react-toastify";
import {
  CircularProgressbar,
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import axios from "axios";
import { useHistory } from "react-router-dom";

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
  UncontrolledPopover,
  Dropdown,
} from "reactstrap";

import { Circles } from 'react-loader-spinner'

function AshikRoboFlow() {
  const myurl = process.env.PUBLIC_URL + "/roboflow.html";
  const [socket, setSocket] = useState(null);

const [annotatedFrame, setAnnotatedFrame] = useState(null);
const [file, setFile] = useState(null);
const [loader,setLoader] = useState(false)

useEffect(() => {
    return () => {
        if (socket) {
            socket.close();
        }
    };
}, [socket]);

useEffect(() => {
  if (file) {
      handleFileUpload();
  }
}, [file]);

const handleFileUpload = () => {
    if (!file)  return alert("NO file");
setLoader(true)
    const reader = new FileReader();
    reader.onload = () => {
        const base64File = reader.result.split(',')[1];

        const newSocket = new WebSocket('wss://fibregrid.amxdrones.com/ws/videos/');
        setSocket(newSocket);

        newSocket.addEventListener('open', () => {
            console.log("websocket connected");
            newSocket.send(JSON.stringify({ file: base64File }));
        });

        newSocket.addEventListener('message', (event) => {
            const data = JSON.parse(event.data);
            console.log(data);
            if (data.annotated_frame) {
              setLoader(false)
                setAnnotatedFrame(`data:image/jpeg;base64,${data.annotated_frame}`);
            } else if (data.message === 'Video processing completed') {
                console.log('Video processing completed');
                newSocket.close();
                setSocket(null);
            }
        });

        newSocket.addEventListener('close', () => {
            console.log('websocket disconnected');
        });
    };
    reader.readAsDataURL(file);
};
const handleFileChange = async(event) => {
    setFile(event.target.files[0]);
};
const handleStop = () => {
    if (socket) {
        socket.close();
        setSocket(null);
        console.log('websocket manually closed');
        setAnnotatedFrame(false)
        setLoader(false)
    }

};


 



  return (
    <>
      <div className="content">
        <Row style={{justifyContent:'center'}}>
        {/* <div>
            <input type="file" id="fileInput" />
            <button onClick={handleFileUpload}>Upload</button>

            {annotatedFrame && (
                <div>
                    <img
                        id="annotatedImage"
                        src={annotatedFrame}
                        alt="Annotated Frame"
                        style={{ width: '100%', height: '400px' }}
                    />
                </div>
            )}
        </div> */}
{
loader ? 
<Col lg="6" md="12" style={{display:"flex",justifyContent:'center',alignItems:'center'}}>
<Circles
  height="80"
  width="80"
  color="#5a5ce5"
  ariaLabel="circles-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  />
</Col>
:
          <Col lg="6" md="12" style={{height:'90vh'}}>
            {
              !annotatedFrame ?
              <>       
          <iframe
          title="iframe"
          style={{
            width: "100%",
            height: "87%",
            border: "none",
            outline: "none",
            overflow:'hidden'
          }}
          src={myurl}
          id="iframeId"
          ></iframe>

<div>
            <div className="file-input">
                <input
                    type="file"
                    id="file-input"
                    className="file-input__input"
                    onChange={handleFileChange}
                    accept="video/*"
                />
                <label className="file-input__label" htmlFor="file-input">
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="upload" className="svg-inline--fa fa-upload fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path fill="currentColor" d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"></path>
                    </svg>
                    <span>Upload files</span>
                </label>
            {/* <button onClick={handleFileUpload}>Upload</button> */}
            </div>
            {annotatedFrame && (
                <div>
                    <img
                        id="annotatedImage"
                        src={annotatedFrame}
                        alt="Annotated Frame"
                        style={{ width: '100%', height: '400px' }}
                    />
                </div>
            )}
        </div>

              </>
            :
          <>
            <div onClick={handleStop} className="" style={{backgroundImage: 'linear-gradient(to bottom left, #FD6585, #FA742B, #FD6585)',
  boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)',color:'#fff',textAlign:'center',padding:'0.5rem',width:'80px',borderRadius:'5px',cursor:'pointer',fontWeight:'600'}}>BACK</div>
  <div className="" style={{marginTop:"2rem"}}>
                    <img
                        id="annotatedImage"
                        src={annotatedFrame}
                        alt="Annotated Frame"
                        style={{ width: '100%', height: '400px' }}
                    />
                </div>
          </>
          }
          </Col>
}
                            
        

        <Col lg="6" md="12">
            <Card className="card-tasks" style={{height:"auto"}}>
              <CardHeader>
                <h6 className="title d-inline">Plugins (4)</h6>
                <p className="card-category d-inline"> </p>
                <UncontrolledDropdown>
                  <DropdownToggle
                    caret
                    className="btn-icon"
                    color="link"
                    data-toggle="dropdown"
                    type="button"
                  >
                    <i className="tim-icons icon-settings-gear-63" />
                  </DropdownToggle>
                  <DropdownMenu aria-labelledby="dropdownMenuLink" right>
                    <DropdownItem
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      Action
                    </DropdownItem>
                    <DropdownItem
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      Another action
                    </DropdownItem>
                    <DropdownItem
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      Something else
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </CardHeader>
              <CardBody>
                <div className="table-full-width table-responsive">
                  <Table>
                    <tbody>
                      <tr>
                        <td>
                          <FormGroup check>
                            <Label check>
                              <Input defaultValue="" type="checkbox" />
                              <span className="form-check-sign">
                                <span className="check" />
                              </span>
                            </Label>
                          </FormGroup>
                        </td>
                        <td>
                          <p className="title">Plugin 1</p>
                        </td>
                        <td className="td-actions text-right">
                          <Button
                            color="link"
                            id="tooltip636901683"
                            title=""
                            type="button"
                          >
                            <i className="tim-icons icon-pencil" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip636901683"
                            placement="right"
                          >
                            Edit Task
                          </UncontrolledTooltip>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <FormGroup check>
                            <Label check>
                              <Input
                                defaultChecked
                                defaultValue=""
                                type="checkbox"
                              />
                              <span className="form-check-sign">
                                <span className="check" />
                              </span>
                            </Label>
                          </FormGroup>
                        </td>
                        <td>
                          <p className="title">Plugin 2</p>
                        </td>
                        <td className="td-actions text-right">
                          <Button
                            color="link"
                            id="tooltip457194718"
                            title=""
                            type="button"
                          >
                            <i className="tim-icons icon-pencil" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip457194718"
                            placement="right"
                          >
                            Edit Task
                          </UncontrolledTooltip>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <FormGroup check>
                            <Label check>
                              <Input defaultValue="" type="checkbox" />
                              <span className="form-check-sign">
                                <span className="check" />
                              </span>
                            </Label>
                          </FormGroup>
                        </td>
                        <td>
                          <p className="title">Plugin 3</p>
                        </td>
                        <td className="td-actions text-right">
                          <Button
                            color="link"
                            id="tooltip636901683"
                            title=""
                            type="button"
                          >
                            <i className="tim-icons icon-pencil" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip636901683"
                            placement="right"
                          >
                            Edit Task
                          </UncontrolledTooltip>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <FormGroup check>
                            <Label check>
                              <Input
                                defaultChecked
                                defaultValue=""
                                type="checkbox"
                              />
                              <span className="form-check-sign">
                                <span className="check" />
                              </span>
                            </Label>
                          </FormGroup>
                        </td>
                        <td>
                          <p className="title">Plugin 4</p>
                        </td>
                        <td className="td-actions text-right">
                          <Button
                            color="link"
                            id="tooltip457194718"
                            title=""
                            type="button"
                          >
                            <i className="tim-icons icon-pencil" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip457194718"
                            placement="right"
                          >
                            Edit Task
                          </UncontrolledTooltip>
                        </td>
                      </tr>
                    
                    </tbody>
                  </Table>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle tag="h4">Analysis</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                <thead className="text-primary">
                    <tr>
                      <th>Objects</th>
                      <th className="text-center">Counts</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Monuments</td>
                  
                      <td className="text-center">2</td>
                    </tr>
                    <tr>
                      <td>Trees/Plants</td>
                  
                      <td className="text-center">78</td>
                    </tr>
                    <tr>
                      <td>Red objects</td>
                  
                      <td className="text-center">3</td>
                    </tr>    <tr>
                      <td>Blue Objects</td>
                  
                      <td className="text-center">5</td>
                    </tr>

                    <tr> <td></td></tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
            </Col>
        </Row>
      </div>
    </>
  );
}

export default AshikRoboFlow;

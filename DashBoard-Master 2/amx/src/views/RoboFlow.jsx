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

// import { faCheckSquare, faCoffee } from '@fortawesome/fontawesome-free-solid'

import {
  faBoxArchive,
  faBriefcase,
  faCamera,
  faClose,
  faDrum,
  faDrumstickBite,
  faEllipsis,
  faFileAudio,
  faFileInvoice,
  faGraduationCap,
  faMicrophone,
  faPlug,
  faPlus,
  faShareNodes,
  faUser,
  faVideo,
  faFolder,
  faDroneAlt,
  faDatabase,
  faDrone,
} from "@fortawesome/free-solid-svg-icons";

// import dronelogo from "/Users/apple/Documents/DashBoard-Master/black-dashboard-react-master/src/views/assets/images/drone-icon.png"
import "./assets/images/drone-icon.png";
// import projectfolder from "/Users/apple/Documents/DashBoard-Master/black-dashboard-react-master/src/views/assets/images/project-folder-black.png"
import "./assets/images/project-folder-black.png";
// import projectblue from "/Users/apple/Documents/DashBoard-Master/black-dashboard-react-master/src/views/assets/images/project-folder-blue.png"
import projectblue from "./assets/images/project-folder-blue.png";

import drone from "../assets/drone.png";
import dronecamera from "../assets/camera-drone.png";

// core components
import {
  chartExample1,
  chartExample2,
  chartExample3,
  chartExample4,
} from "variables/charts.js";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  BackgroundColorContext,
  backgroundColors,
} from "contexts/BackgroundColorContext";
import ProgressBar from "components/ProgressBar/progress_bar";
import DropFileInput from "./DropFileInput/DropFileInput";
import { PieChart } from "recharts";
// import {icon1} from "../../src/assets/img/anime3.png"

import Frame from "react-frame-component";
function RoboFlow() {
  const myurl = process.env.PUBLIC_URL + "/roboflow.html";

  return (
    <>
      <div className="content">
        <Row>
          <Col lg="6" md="12">
            <div
              id="map"
              className="map"
              style={{
                position: "relative",
                overflow: "hidden",
                width: "100%",
                height: "calc(88vh)",
              }}
            >
              <iframe
                style={{
                  width: "100%",
                  height: "100%",
                  border: "none",
                  outline: "none",
                }}
                src={myurl}
                id="iframeId"
              ></iframe>
            </div>
          </Col>
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

export default RoboFlow;

import React, { useEffect, useState } from "react";
import { Line, Pie, Doughnut, Bar,PolarArea, Bubble } from "react-chartjs-2"; // Import Line component
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
import Droneimage from '../../src/views/assets/images/drone-dashboardICON.png'
import MissioIcon from '../../src/views/assets/images/png/missonLogo_dashboard.png'
import '../../src/views/assets/css/style.css'
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
  faDrone
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

function RoundProgressBar(props) {
  const size = props.size;
  const radius = (props.size - props.strokeWidth) / 2;
  const viewBox = `0 0 ${size} ${size}`;
  const dashArray = radius * Math.PI * 2;
  const dashOffset = dashArray - (dashArray * props.value) / props.max;
  const percentage = ((props.value / props.max) * 100).toFixed();
  return (
    <svg width={props.size} height={props.size} viewBox={viewBox}>
      <circle
        fill={"none"}
        stroke={"#ddd"}
        cx={props.size / 2}
        cy={props.size / 2}
        r={radius}
        strokeWidth={`${props.strokeWidth}px`}
      />
      <circle
        fill={"none"}
        stroke={props.stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={dashArray}
        strokeDashoffset={dashOffset}
        cx={props.size / 2}
        cy={props.size / 2}
        r={radius}
        strokeWidth={`${props.strokeWidth}px`}
        transform={`rotate(-90 ${props.size / 2} ${props.size / 2})`}
      />
      <text
        x="65%"
        y="45%"
        dy="0.4rem"
        textAnchor="end"
        fill={props.stroke}
        style={{
          fontSize: "1rem",
        }}
      >
        {`${props.value.toFixed(2)}GB`}
      </text>

      <text
        x="50%"
        y="45%"
        dy="1.5rem"
        textAnchor="middle"
        fill={props.stroke}
        style={{
          fontSize: "0.55rem",
          fontWeight: "bold",
          color:'RGB(74 101 255)'
        }}
      >
        {props.text}
      </text>
      {/* <text
        x="50%"
        y="50%"
        dy="2.7rem"
        textAnchor="middle"
        fill={props.stroke}
        style={{
          fontSize: '1rem',
        }}
      >
        {`${percentage}%`}
      </text> */}
    </svg>
  );
}
RoundProgressBar.defaultProps = {
  size: 160,
  value: 25,
  max: 100,
  strokeWidth: 20,
  stroke: "#3e98c7",
  text: "",
  fontSize:'10px',
  color:'RGB(74 101 255)'
};
function Dashboard(props) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarElement,
    ArcElement
  );
  const [bigChartData, setbigChartData] = React.useState("data1");
  const setBgChartData = (name) => {
    setbigChartData(name);
  };
  const [hovered, setHovered] = useState(false);
  const percentage = hovered ? 75 : 0; // Change the percentage as needed

  const userIdO = localStorage.getItem("user_id");

  const amxtokenO = localStorage.getItem("amxtoken").replace(/"/g, "");

  const consumed_data = localStorage.getItem("consumed_data").replace(/"/g, "");

  const Maxstorage = 5; //15 GB

  const totalGBused = (consumed_data / (1024 * 1024 * 1024)).toFixed(2);
  // console.log('Total Gigabytes Used:', totalGBused);

  const config = {
    params: {
      user_id: userIdO,
    },
    headers: {
      Authorization: amxtokenO,
    },
  };

  const config2 = {
    params: {
      user_id: userIdO,
      latest: true,
    },
    headers: {
      Authorization: amxtokenO,
    },
  };

  // const [barChartData, setBarChartData] = useState([
  //   {
  //     name: "August",
  //     Drones_Added: 0,
  //     Projects_Added: 0,
  //     amt: 2400,
  //   },
  //   {
  //     name: "September",
  //     Drones_Added: 0,
  //     Projects_Added: 0,
  //     amt: 2400,
  //   },
  //   {
  //     name: "October",
  //     Drones_Added: 0,
  //     Projects_Added: 0,
  //     amt: 2400,
  //   },
  //   {
  //     name: "November",
  //     Drones_Added: 0,
  //     Projects_Added: 0,
  //     amt: 2400,
  //   },
  //   {
  //     name: "December",
  //     Drones_Added: 0,
  //     Projects_Added: 0,
  //     amt: 2400,
  //   },
  //   {
  //     name: "January",
  //     Drones_Added: 0,
  //     Projects_Added: 0,
  //     amt: 2400,
  //   },
  // ]);

  const [barChartData, setBarChartData] = useState([
    { name: "Apr 2023", year: 2023, Projects_Added: 0, Drones_Added: 0 },
    { name: "May 2023", year: 2023, Projects_Added: 0, Drones_Added: 0 },
    { name: "Jun 2023", year: 2023, Projects_Added: 0, Drones_Added: 0 },
    { name: "Jul 2023", year: 2023, Projects_Added: 0, Drones_Added: 0 },
    { name: "Aug 2023", year: 2023, Projects_Added: 0, Drones_Added: 0 },
    { name: "Sep 2023", year: 2023, Projects_Added: 0, Drones_Added: 0 },
    { name: "Oct 2023", year: 2023, Projects_Added: 0, Drones_Added: 0 },
  ]);
  const [remainingStorage, setRemainingStorage] = useState(15.0);
  const [userid, setUserid] = useState("");
  const [usertoken, setUsertoken] = useState("");
  const [gbData, setGbData] = useState("");
  // Notification starts
  const notificationAlertRef = React.useRef(null);
  const [project_list, setProject_list] = React.useState([]);
  const [recent_project_list, recent_setProject_list] = React.useState([]);

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
      autoDismiss: 7,
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
  };

  const [addprojectopen, setaddprojectopen] = React.useState(false);

  const AddProject = (name) => {
    // console.log("AddProject======");
    setaddprojectopen(true);
  };
  const CloseProject = (name) => {
    setaddprojectopen(false);
  };

  const SendProject = () => {
    setaddprojectopen(false);
    toast.info("This feature in dashboad is under development !", {
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
  };

  const BuyNow = () => {
    setaddprojectopen(false);
    toast.info("Contact Admin to Buy more Storage!", {
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
  };

  const OKProject = (name) => {
    setaddprojectopen(false);
  };
  // const Maxstorage = 16106127360;
  const [user, setUser] = useState(null);

  const getDetails = () => {
    setUserid(localStorage.getItem("user_id"));
    setUsertoken(localStorage.getItem("amxtoken"));
  };

  const cardBackgroundColors = [
    "#55d392",
    "#05daff",
    "#23efe2",
    "#e75b8fbf",
    "#ffeeff",
  ]; // Add more colors as needed
  const [selectedTimeRange, setSelectedTimeRange] = useState("last3months");

  const GetAllProjects = async () => {
    try {
      // https://fibregrid.amxdrones.com/dronecount/projects/
      const response = await axios.get(
        "https://fibregrid.amxdrones.com/dronecount/v2/get-folders/",
        config
      );
      // console.log(response.data.map(item => item.folder_structure), "projectdata====>")
      const allProjectData = response.data[0].folder_structure;
      setProject_list(allProjectData);

      setRemainingStorage(response.data[1].total_size.toFixed(2));
      // const consumed_data = localStorage.setItem("consumed_data");
    } catch (error) {
      console.log(error);
    }
  };

  const GetAllChartData = async () => {
    try {
      // https://fibregrid.amxdrones.com/dronecount/projects/
      const response = await axios.get(
        "https://fibregrid.amxdrones.com/dronecount/v2/get-folders/",
        config
      );
   console.log("github");
      // console.log(response.data.map(item => item.folder_structure), "projectdata====>")
      // console.log(response.data[0].folder_structure, "All Projects Charts====>");
      const allProjectData = response.data[0].folder_structure;

//       const allProjectData =  [{
//         "id": 194,
//         "model_name": "1",
//         "UIN": "2",
//         "time_in_service": "2023-10-26T18:30:00Z",
//         "Next_maintainance": "2023-10-26T18:30:00Z",
//         "purchase_year": "2023-09-29T18:30:00Z",
//         "aircraft_type": "1",
//         "connection_id": "1",
//         "created_timestamp": "2023-09-20T05:55:55.122376Z",
//         "last_update_timestamp": "2023-09-20T05:55:55.122398Z",
//         "Status": true,
//         "ip_address": null,
//         "owner_id": 99,
//         "latitude": "12.9733963",
//         "longitude": "77.5950736",
//         "location": "HDFC Bank, 24/3, 51, Kasturba Road, D'Souza Layout, Shantala Nagar, East Zone, Bengaluru, Bangalore North, Bengaluru Urban District, Karnataka, 560001, India"
//     },
//     {
//         "id": 199,
//         "model_name": "2",
//         "UIN": "2",
//         "time_in_service": "2023-09-21T18:30:00Z",
//         "Next_maintainance": "2023-10-21T18:30:00Z",
//         "purchase_year": "2023-09-21T18:30:00Z",
//         "aircraft_type": "2",
//         "connection_id": "2",
//         "created_timestamp": "2023-09-21T05:09:07.615921Z",
//         "last_update_timestamp": "2023-09-21T05:09:07.615939Z",
//         "Status": false,
//         "ip_address": null,
//         "owner_id": 99,
//         "latitude": "13.0660548",
//         "longitude": "77.5797483",
//         "location": "Rajiv Gandhi Nagar road, Canara Bank Layout, Vidyaranyapura, Yelahanka Zone, Bengaluru, Yelahanka taluku, Bengaluru Urban District, Karnataka, 560065, India"
//     },
//     {
//         "id": 214,
//         "model_name": "3",
//         "UIN": "3",
//         "time_in_service": "2023-09-25T18:30:00Z",
//         "Next_maintainance": "2023-09-25T18:30:00Z",
//         "purchase_year": "2023-09-25T18:30:00Z",
//         "aircraft_type": "3",
//         "connection_id": "3",
//         "created_timestamp": "2023-09-25T06:05:18.356621Z",
//         "last_update_timestamp": "2023-09-25T06:05:18.356640Z",
//         "Status": true,
//         "ip_address": null,
//         "owner_id": 99,
//         "latitude": "13.0660606",
//         "longitude": "77.5797477",
//         "location": "Rajiv Gandhi Nagar road, Canara Bank Layout, Vidyaranyapura, Yelahanka Zone, Bengaluru, Yelahanka taluku, Bengaluru Urban District, Karnataka, 560065, India"
//     },
//     {
//         "id": 231,
//         "model_name": "10",
//         "UIN": "10",
//         "time_in_service": "2023-10-16T18:30:00Z",
//         "Next_maintainance": "2023-10-09T18:30:00Z",
//         "purchase_year": "2023-10-08T18:30:00Z",
//         "aircraft_type": "10",
//         "connection_id": "10",
//         "created_timestamp": "2023-10-06T05:30:52.780468Z",
//         "last_update_timestamp": "2023-10-06T05:30:52.780494Z",
//         "Status": true,
//         "ip_address": null,
//         "owner_id": 99,
//         "latitude": null,
//         "longitude": null,
//         "location": ""
//     },
//     {
//         "id": 237,
//         "model_name": "3",
//         "UIN": "5",
//         "time_in_service": "2023-10-21T18:30:00Z",
//         "Next_maintainance": "2023-10-29T18:30:00Z",
//         "purchase_year": "2023-10-15T18:30:00Z",
//         "aircraft_type": "3",
//         "connection_id": "3",
//         "created_timestamp": "2023-10-09T05:42:32.534214Z",
//         "last_update_timestamp": "2023-10-09T05:42:32.534249Z",
//         "Status": true,
//         "ip_address": null,
//         "owner_id": 99,
//         "latitude": null,
//         "longitude": null,
//         "location": ""
//     }
// ]

      let response2 = await axios.get(
        "https://fibregrid.amxdrones.com/dronecount/addDrone/",
        config
      );
      const droneChartData = response2.data;


      // Calculate the number of active drones
      const numberOfActiveDrones = response2.data.reduce((count, drone) => {
        if (drone.Status === true) {
          return count + 1;
        }
        return count;
      }, 0);

      console.log("Number of active drones:", numberOfActiveDrones);

      // Process data for the selected time range
      const processedChartData = processDataForTimeRange(
        allProjectData,
        droneChartData || 0,
        selectedTimeRange
      );
      console.log(processedChartData,'<====before')
      setBarChartData(processedChartData);

      let chart1_2_options = {
        maintainAspectRatio: false,
        legend: {
          display: false,

        },
        tooltips: {
          backgroundColor: "#f5f5f5",
          titleFontColor: "#333",
          bodyFontColor: "#666",
          bodySpacing: 4,
          xPadding: 12,
          mode: "nearest",
          intersect: 0,
          position: "nearest",
        },
        responsive: true,
        maintainAspectRatio: false, 
        scales: {
          yAxes: {
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: "rgba(29,140,248,0.0)",
              zeroLineColor: "transparent",
            },
            ticks: {
              suggestedMin: 60,
              suggestedMax: 125,
              padding: 20,
              fontColor: "#9a9a9a",
            },
          },
          xAxes: {
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: "rgba(29,140,248,0.1)",
              zeroLineColor: "transparent",
            },
            ticks: {
              padding: 20,
              fontColor: "#9a9a9a",
            },
          },
        },
      };

      function convertData(dynamicData, datasetType) {
        const labels = dynamicData.map((item) => `${item.name}`);
        const data = dynamicData.map((item) => item[datasetType]);
      
        // Create a linear gradient for the background color
        const gradientStroke = {
          canvas: null,
          context: null,
          gradient: null,
        };
      
        gradientStroke.canvas = document.createElement("canvas");
        gradientStroke.context = gradientStroke.canvas.getContext("2d");
        gradientStroke.gradient = gradientStroke.context.createLinearGradient(
          0,
          230,
          0,
          50
        );
      
        gradientStroke.gradient.addColorStop(1, "rgba(29,140,248,0.2)");
        gradientStroke.gradient.addColorStop(0.4, "rgba(29,140,248,0.0)");
        gradientStroke.gradient.addColorStop(0, "rgba(29,140,248,0)"); // blue colors
      
        const dataset = {
          label:datasetType,
          fill: true,
          height: 200,
          backgroundColor: gradientStroke.gradient,
          borderColor: "#1f8ef1",
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: "#1f8ef1",
          pointBorderColor: "rgba(255,255,255,0)",
          pointHoverBackgroundColor: "#1f8ef1",
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: data,
        };
      
        return {
          labels: labels,
          datasets: [dataset],
          options: chart1_2_options, // Add the options object here
        };
      }
      

  //   function convertData(dynamicData, datasetType) {
  //     const labels = dynamicData.map((item) => `${item.name}`);
  //     const data = dynamicData.map((item) => item[datasetType]);
  
  //     const options = {
  //         scales: {
  //             x: {
  //                 grid: {
  //                     display: false // This removes the x-axis grid lines
  //                 }
  //             },
  //             y: {
  //                 grid: {
  //                     display: false // This removes the y-axis grid lines
  //                 }
  //             }
  //         }
  //     };
  
  //     const dataset = {
  //         fill: true,
  //         label: datasetType,
  //         data: data,
  //         height: 50, // Increase the height (adjust the value as needed)
  //         borderColor:
  //             datasetType === "Projects_Added"
  //                 ? "rgb(255, 99, 132)"
  //                 : "rgb(75, 192, 192)",
  //         backgroundColor:
  //             datasetType === "Projects_Added"
  //                 ? "rgba(255, 99, 132, 0.5),rgba(255, 255, 0, 0.7),rgba(0, 0, 255, 0.7)"
  //                 : "rgba(75, 192, 192, 0.5)",
  //     };
  
  //     return {
  //         type: 'line', // Specify the chart type (e.g., line chart)
  //         data: {
  //             labels: labels,
  //             datasets: [dataset],
  //         },
  //         options: options // Add the options object here
  //     };
  // }
  
    

      const projectsData = convertData(processedChartData, "Projects_Added");
      const dronesData = convertData(processedChartData, "Drones_Added");
      setProjectdataChart(projectsData);
console.log(dronesData,'<=====dronesData')

      setDronedataChart(dronesData);
      const options123 = {
        responsive: true,
        plugins: {
          legend: {
            fill: true,
            position: "bottom",
          },
          title: {
            display: true,
            text: "Projects Added",
          },
        },
      };

      const f1 = (str) => {
        let s1 = {
          responsive: true,
          plugins: {
            legend: {
              fill: true,
              position: "bottom",
            },
            title: {
              display: true,
              text: str,
            },
          },
        };
      };
      let pf1 = f1("Project Added");
      setOptionChart(pf1);
    } catch (error) {
      console.log(error);
    }
  };
  const [optionChart, setOptionChart] = useState([]);
  const [optiondataChart, setdataOptionChart] = useState([]);

  const [projectdataChart, setProjectdataChart] = useState({
    labels: [],
    datasets: [
      {
        labels: [
          'Red',
          'Yellow',
          'Blue'
      ],
              data: [],
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 2,
      },
    ],
    options: {
      scales: {
          x: {
              grid: {
                  display: false // This removes the x-axis grid lines
              }
          },
          y: {
              grid: {
                  display: false // This removes the y-axis grid lines
              }
          }
      }
  }
});
  const [dronedataChart, setDronedataChart] = useState(
    {
      labels: [],
      datasets: [
        {
          labels: [
            'Red',
            'Yellow',
            'Blue'
        ],
                data: [],
          fill: false,
          borderColor: 'rgba(75,192,192,1)',
          borderWidth: 2,
        },
      ],
      options: {
        scales: {
            x: {
                grid: {
                    display: false // This removes the x-axis grid lines
                }
            },
            y: {
                grid: {
                    display: false // This removes the y-axis grid lines
                }
            }
        }
    }
    }
  );

console.log(dronedataChart,"<<<<<========fronechartdata761")

  const [missiondata, setMissionData] = useState({
    datasets: [{
      data: [10, 20, 30],
      backgroundColor: ['rgba(255, 0, 0, 0.7)', 'rgba(255, 255, 0, 0.7)', 'rgba(0, 0, 255, 0.7)'],
      borderWidth: 2,
    }],
    labels: ['Red', 'Yellow', 'Blue'],
  });
  

  useEffect(() => {
    const labels = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
    ];
    const data123 = {
      labels: ["Aug 2023", "Sep 2023", "Oct 2023"],
      datasets: [
        {
          fill: true,
          label: "Projects Added",
          data: [1, 4, 5],
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          height: 50, // Increase the height (adjust the value as needed)
        },
      ],
    };
    // setdataOptionChart(data123);

    const dynamicData = [
      { name: "Apr 2023", year: 2023, Projects_Added: 1, Drones_Added: 0 },
      { name: "May 2023", year: 2023, Projects_Added: 3, Drones_Added: 0 },
      { name: "Jun 2023", year: 2023, Projects_Added: 0, Drones_Added: 0 },
      { name: "Jul 2023", year: 2023, Projects_Added: 0, Drones_Added: 0 },
      { name: "Aug 2023", year: 2023, Projects_Added: 0, Drones_Added: 0 },
      { name: "Sep 2023", year: 2023, Projects_Added: 0, Drones_Added: 3 },
      { name: "Oct 2023", year: 2023, Projects_Added: 5, Drones_Added: 2 },
    ];
  }, []);
  const processDataForTimeRange = (data, data2, timeRange) => {
    // Check if data is provided; if not, use an empty array

    const today = new Date();
    const sixMonthsAgo = new Date(today);
    sixMonthsAgo.setMonth(today.getMonth() - 6);

    const threeMonthsAgo = new Date(today);
    threeMonthsAgo.setMonth(today.getMonth() - 2);

    const monthsInTimeRange = [];

    let startDate, endDate;

    if (timeRange === "last3months") {
      startDate = threeMonthsAgo;
      endDate = new Date(today);
    } else if (timeRange === "last6months") {
      startDate = sixMonthsAgo;
      endDate = new Date(today);
    } else if (timeRange === "present6months") {
      startDate = new Date(today);
      startDate.setMonth(today.getMonth());
      endDate = new Date(today);
      endDate.setMonth(today.getMonth() + 6);
    } else if (timeRange === "future6months") {
      startDate = new Date(today);
      startDate.setMonth(today.getMonth() + 6);
      endDate = new Date(today);
      endDate.setMonth(today.getMonth() + 12);
    } else if (timeRange === "currentYear") {
      startDate = new Date(today.getFullYear(), 0, 1);
      endDate = new Date(today.getFullYear() + 1, 0, 1);
    } else if (timeRange === "previousYear") {
      startDate = new Date(today.getFullYear() - 1, 0, 1);
      endDate = new Date(today.getFullYear(), 0, 1);
    }

    // Special handling for current year to ensure month names are visible
    if (timeRange === "currentYear") {
      while (currentDate <= endDate) {
        const monthName = currentDate.toLocaleString("default", {
          month: "long",
          year: "numeric",
        });
        monthsInTimeRange.push({ name: monthName });
        currentDate.setMonth(currentDate.getMonth() + 1);
      }
    } else {
      while (currentDate <= endDate) {
        const monthName = currentDate.toLocaleString("default", {
          month: "long",
        });
        monthsInTimeRange.push({
          name: monthName,
          year: currentDate.getFullYear(),
        });
        currentDate.setMonth(currentDate.getMonth() + 1);
      }
    }

    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const monthName = currentDate.toLocaleString("default", {
        month: "long",
      });
      const year = currentDate.getFullYear();

      monthsInTimeRange.push({ name: monthName, year });

      currentDate.setMonth(currentDate.getMonth() + 1);
    }
    // Check if data is provided; if not, use data2
    const projectsData = data || data2;

    const chartData = monthsInTimeRange.map((monthData) => {
      const projectsForMonth = projectsData
        ? projectsData.filter(
            (entry) =>
              new Date(entry.datetime).toLocaleString("default", {
                month: "long",
              }) === monthData.name &&
              new Date(entry.datetime).getFullYear() === monthData.year
          )
        : [];
      // Only filter drones if data2 is provided
      const dronesForMonth =
        data2 && data2.length > 0
          ? data2.filter(
              (entry) =>
                new Date(entry.purchase_year).toLocaleString("default", {
                  month: "long",
                }) === monthData.name &&
                new Date(entry.purchase_year).getFullYear() === monthData.year
            )
          : [];
      const monthYear = `${monthData.name.slice(0, 3)} ${monthData.year}`;


      return {
        ...monthData,
        name: monthYear,
        Projects_Added: projectsForMonth.length,
        Drones_Added: dronesForMonth.length,
      };
    });

    // const chartData = monthsInTimeRange.map(monthData => {
    //   // console.log(data)
    //   const projectsForMonth = data.filter(
    //     entry =>
    //       new Date(entry.datetime).toLocaleString('default', { month: 'long' }) === monthData.name &&
    //       new Date(entry.datetime).getFullYear() === monthData.year
    //   );
    //   // console.log(data2)
    //   // const dronesForMonth = data2.filter(
    //   //   entry =>
    //   //   new Date(entry.purchase_year).toLocaleString('default', { month: 'long' }) === monthData.name &&
    //   //   new Date(entry.purchase_year).getFullYear() === monthData.year
    //   //     // new Date(entry.created_timestamp).toLocaleString('default', { month: 'long' }) === monthData.name &&
    //   //     // new Date(entry.created_timestamp).getFullYear() === monthData.year
    //   // );

    //   // Only filter drones if data2 is provided
    // const dronesForMonth = data2.length > 0
    // ? data2.filter(
    //     (entry) =>
    //       new Date(entry.purchase_year).toLocaleString('default', { month: 'long' }) === monthData.name &&
    //       new Date(entry.purchase_year).getFullYear() === monthData.year
    //   )
    // : [];

    //   const monthYear = `${monthData.name.slice(0, 3)} ${monthData.year}`; // Combine month and year

    //   return {
    //     ...monthData,
    //     name:monthYear,
    //     Projects_Added: projectsForMonth.length, // Number of projects added for that month
    //     Drones_Added: dronesForMonth.length,// Number of drones added for that month
    //   };
    // });
    return chartData;
  };

  const timeRangeOptions = [
    { value: "last3months", label: "Last 3 Months" },
    { value: "last6months", label: "Last 6 Months" },
    { value: "present6months", label: "Present 6 Months" },
    { value: "currentYear", label: "Current Year" },
    { value: "previousYear", label: "Previous Year" },
  ];
  const GetRecentProjects = async () => {
    try {
      // https://fibregrid.amxdrones.com/dronecount/projects/
      const response = await axios.get(
        "https://fibregrid.amxdrones.com/dronecount/v2/get-folders/",
        config2
      );

      const sortedData = response.data[0].folder_structure.sort((a, b) => {
        // Sort in descending order (latest datetime first)
        return new Date(b.datetime) - new Date(a.datetime);
      });

      // Get the top 5 latest records
      const top5Latest = sortedData.slice(0, 5);

      // console.log(top5Latest, "Top 5 latest projects");

      // recent_setProject_list(response.data);
      recent_setProject_list(top5Latest);
    } catch (error) {
      console.log(error);
    }
  };

  const [droneData, setDroneData] = useState([]);
  const [activeDrones, setActiveDrones] = useState([]);
  let GetAllDrone = async () => {
    try {
      let data = await axios.get(
        "https://fibregrid.amxdrones.com/dronecount/addDrone/",
        config
      );
      console.log(data.data, "dronedata====>");
      setDroneData(data.data);
      // Calculate the number of active drones
      const numberOfActiveDrones = data.data.reduce((count, drone) => {
        if (drone.Status === true) {
          return count + 1;
        }
        return count;
      }, 0);

      setActiveDrones(numberOfActiveDrones);
      // toast(`Successfully ${project_name}  project data was created`);
      // navigate("/");
      // CloseProject()
    } catch (error) {
      console.log(error);
    }
  };
  // // console.log(activeDrones)

  useEffect(() => {
    GetAllChartData();
  }, [selectedTimeRange]);

  useEffect(() => {
    getDetails();
    GetAllProjects();
    GetRecentProjects();
    GetAllDrone();
    GetAllChartData();
  }, []);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // const chartData = [
  //   {
  //     name: "August",
  //     Drones_Added: 0,
  //     Projects_Added: 0,
  //     amt: 2400,
  //   },
  //   {
  //     name: "August",
  //     Drones_Added: 0,
  //     Projects_Added: 0,
  //     amt: 2400,
  //   },
  //   {
  //     name: "August",
  //     Drones_Added: 0,
  //     Projects_Added: 0,
  //     amt: 2400,
  //   },
  //   {
  //     name: "August",
  //     Drones_Added: 0,
  //     Projects_Added: 0,
  //     amt: 2400,
  //   },
  //   {
  //     name: "August",
  //     Drones_Added: 0,
  //     Projects_Added: 0,
  //     amt: 2400,
  //   },
  //   {
  //     name: "August",
  //     Drones_Added: 5,
  //     Projects_Added: 2,
  //     amt: 2400,
  //   },
  // ];

  const demoData = [
    {
      name: "amx1 (9f806eb7-e583-4912-b091-9efecbbc74d9)",
      datetime: "2023-08-25T10:45:45.190000Z",
    },
    {
      name: "amx2 (9f806eb7-e583-4912-b091-9efecbbc74d9)",
      datetime: "2023-10-25T10:45:45.190000Z",
    },
    {
      name: "amx3 (9f806eb7-e583-4912-b091-9efecbbc74d9)",
      datetime: "2023-07-25T10:45:45.190000Z",
    },
    {
      name: "amx4 (9f806eb7-e583-4912-b091-9efecbbc74d9)",
      datetime: "2023-08-24T10:45:45.190000Z",
    },
    {
      name: "amx5 (9f806eb7-e583-4912-b091-9efecbbc74d9)",
      datetime: "2023-07-25T10:45:45.190000Z",
    },
  ];
  
let totalMissions = droneData.length
let activeMissions = droneData.filter((drone) => drone.Status === true).length
let remainSTorage = (remainingStorage - 10).toFixed(2)
  const datas = {
    labels: ['Total Missions ' ,'Active Missions'],
    datasets: [
      {
        data: [totalMissions, activeMissions], // values for each section
        backgroundColor: [ '#208ef1','#5cd1df', '#FFCE56'], // colors for each section
        // hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], // hover colors
      },
    ],
  };

  // Options for the pie chart
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    
  };

  console.log(remainingStorage - 10,"",Maxstorage,'=<<<<<<<<')
  const storagedata = {
    labels: ["Max Storage","Remaining Storage"],
    datasets: [
      {
        data: [Maxstorage, remainingStorage - 10, ], // values for each section
        backgroundColor: [ '#208ef1','#5cd1df', '#FFCE56'], // colors for each section
        // hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], // hover colors
      },
    ],
  };
  const dougnutoptions = {
    responsive: true,
    maintainAspectRatio: false, 
  };
 



  useEffect(() => {
    // Separate active and inactive drones
    const active = droneData.filter((drone) => drone.Status === true);
    const inactive = droneData.filter((drone) => drone.Status === false);

  }, [droneData]);



  const overviewdata = [
    {
      icon:      <FontAwesomeIcon icon={faFolder} style={{ color: "#1f8ef1", width: "20px", height: "20px" }} />      ,

      title: "total projects",
      count: project_list.length,
      item: "projects",
      chart:  <Line
      data={projectdataChart}

    />
    },
    {
      icon: <img src={Droneimage} alt="" srcset="" width='30px' height='30px' />
      ,
      title: "total Drones",
      count: droneData.length,
      item: "drones",
      chart:<Bar    data={dronedataChart} />  
    },
  
    {
      icon:<img src={MissioIcon} alt="" srcset="" width='30px' height='30px' />
      ,
      title: "Total Missions",
      count: droneData.filter((drone) => drone.Status === true).length,
      item: "missions",
      chart:  
      <Pie data={datas} options={options} />
     
    },
    {
      icon:       <FontAwesomeIcon icon={faDatabase} style={{ color: "#1f8ef1", width: "20px", height: "20px" }} />
      ,
      title: `Max Storage: ${Maxstorage} GB `,
      item: `Available Storage: ${remainSTorage} GB`,
      chart:  
      <Doughnut data={storagedata} options={dougnutoptions} />
    //   <RoundProgressBar
                              
    //   value={remainingStorage - 10}
    //   max={Maxstorage}
    //   text="STORAGE AVAILABLE"
    //   className="w-25"
    //   style={{color:'RGB(74 101 255)'}}
    // />
    
    }
  ];
  const [data, setData] = useState({
    name: "",
    user_id: userIdO,
  });
  const [percentage1, setPercentage1] = useState(25);

  const handleChangeEvent = (event) => {
    setPercentage1(event.target.value);
  };
  const handleChange = (e) =>
    setData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let payload = data;
      let data1 = await axios
        .post(
          "https://fibregrid.amxdrones.com/dronecount/projects/",
          data,
          config
        )
        .then((res) => {
          const data2 = res.data;
          toast.success("New project added !", {
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

          CloseProject();
          GetAllProjects();
          GetRecentProjects();
        })
        .catch((err) => {
          if (err.response) {
            toast.error("Server down, Please try agin later !", {
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
            GetAllProjects();
            GetRecentProjects();
            CloseProject();
            // console.log(err.response.status);
            // console.log(err.response.statusText);
            // console.log(err.message);
            // console.log(err.response.headers); 
            // console.log(err.response.data); 
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const history = useHistory();


  

  const EventCalendar = require('react-event-calendar');
 
const events = [
    {
        start: '2015-07-20',
        end: '2015-07-02',
        eventClasses: 'optionalEvent',
        title: 'test event',
        description: 'This is a test description of an event',
    },
    {
        start: '2015-07-19',
        end: '2015-07-25',
        title: 'test event',
        description: 'This is a test description of an event',
        data: 'you can add what ever random data you may want to use later',
    },
];



  return (
    <BackgroundColorContext.Consumer>
      {({ color }) => (
        <>
          {/* <ToastContainer /> */}

          <div className="react-notification-alert-container">
            <NotificationAlert ref={notificationAlertRef} />
          </div>
    
  

          <div className={addprojectopen == true ? "overlay show" : "overlay"}>
            {/* <!-- popup box start --> */}
            <div className="popup-outer">
              <div className="popup-box">
                {/* <i id="close" className="bx bx-x close"></i> */}
                <FontAwesomeIcon
                  onClick={CloseProject}
                  className="close"
                  icon={faClose}
                />
                <div className="profile-text">
                  {/* <img src="profile.jpg" alt="" />  */}
                  <div className="text">
                    <span className="name">Create Projects</span>
                    {/* <span className="profession">Web & Web Designer</span> */}
                  </div>
                </div>

                <input
                  type="text"
                  class="form-control"
                  id="name"
                  name="name"
                  placeholder="Name"
                  onChange={handleChange}
                />
                <input
                  type="hidden"
                  class="form-control"
                  id="user_id"
                  name="user_id"
                  value={userIdO}
                  placeholder="user_id"
                  onChange={handleChange}
                />

                <div className="button">
                  <button id="close" onClick={CloseProject} className="cancel">
                    Cancel
                  </button>
                  <button className="send" onClick={handleSubmit}>
                    Create
                  </button>
                </div>
                {/* </form> */}
              </div>
            </div>
          </div>

          {/* Dashboard */}

          <div
            className="content"
            style={{
              backgroundColor:
                color == "green"
                  ? "rgba(255,140,49,.05)"
                  : color == "primary"
                  ? "rgba(253,101,113,.05)"
                  : "rgba(65, 195, 199,.03)",
            }}
          >
            <div className="container-fluid">
              <div className="row">
                {/* Left section */}

                <div className="col-md-12 col-sm-12 left-section">
                  {/* <h2>Left Section</h2> */}
                  <>
                    {/* <Row>
                      <Col className="text-left" md="6">
                        <CardTitle tag="h4" style={{}}>
                          Dashboard Overview
                        </CardTitle>
                      </Col>
                    </Row> */}
                    {/* <Row>
                      {overviewdata.map((v,index)=>{
    return(
      <>
      <Col md="3" sm="6">
      <div className="card2" key={index}>
          <div
            className="content"
            style={{ backgroundColor: cardBackgroundColors[index % cardBackgroundColors.length] }}
          >
            <FontAwesomeIcon icon={v.icon} style={{ color: "#ffffff", width: "20px", height: "20px" }} />
            <h4 style={{ marginBottom: "5px", fontSize: "12px", fontWeight: "bold" }}>{v.title}</h4>
            <h5 style={{ marginBottom: "5px", fontSize: "12px" }}>{v.count} {v.item}</h5>
          </div>
        </div>
    </Col> 
      </>
    ) })}
                     
                    </Row> */}

                    <Row>

                      <Col className="text-left" md="6">
                        <CardTitle tag="h4" >
                          Overview
                        </CardTitle>
                      </Col>
                    </Row>
                 
                  <Row>
   
                  </Row>
                  <Row>
     
{
  overviewdata.map((v,index)=>{
    return(
          <Col lg="3" md='6' sm='12'>
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">{v.title}</h5>

      <CardTitle className="cartd_item" tag="h4">
                  {v.icon}
                 {v.count} {v.item}
                </CardTitle>
  

              </CardHeader>
              <CardBody>
                <div className="chart-area" style={{display:'flex',justifyContent:'center'}}>
                {/* {barChartData.some(
                          (item) => item.Projects_Added > 0
                        ) && (
                          // <Line options={options} data={projectdataChart} />
   <>
   </>
              
                        )} */}
                               {v.chart}

          
                </div>
              </CardBody>
            </Card>
          </Col>
    )
  })
}

         


          {/* duplicate */}
{/* 
          <Col lg="3">
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
                {barChartData.some(
                          (item) => item.Projects_Added > 0
                        ) && (
                          // <Line options={options} data={projectdataChart} />
   <Line
                    data={projectdataChart}
                  
                  />
                        )}
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="3">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Completed Tasks</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-send text-success" /> 12,100K
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area" style={{display:'flex',justifyContent:'center'}}>
                <RoundProgressBar
                              
                              value={remainingStorage - 10}
                              max={Maxstorage}
                              text="STORAGE AVAILABLE"
                              className="w-25"
                              style={{color:'RGB(74 101 255)'}}
                            />
                </div>
              </CardBody>
            </Card>
          </Col> */}
        </Row>
                   
                    <Row>
                      <Col md="3">
                      <div>
                        <FormGroup
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "2rem",
                          }}
                        >
                          <Label htmlFor="timeRange" style={{ margin: 0 }}>
                            Select Duration
                          </Label>
                          <Input
                          style={{backgroundColor:'#ffff'}}
                            name="select"
                            type="select"
                            id="timeRange"
                            onChange={(e) =>
                              setSelectedTimeRange(e.target.value)
                            }
                            value={selectedTimeRange}
                          >
                            {timeRangeOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </Input>
                        </FormGroup>
                      </div>
                      </Col>
                   
                    </Row>
                    <Row>
                      <Col className="text-left" md="6">
                        <CardTitle tag="h4" style={{ marginTop: "10px" }}>
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
                        {recent_project_list.map((item) => (
                          <div
                            className="card4"
                            onClick={() =>
                              history.push(
                                "/amx/folders?project_id=" + item.name
                              )
                            }
                          >
                            <div
                              className="icon-container1"
                              style={{ backgroundColor: "rgb(239,185,93)" }}
                            >
                              <i className="fa-solid icon1 fa-sheet-plastic"></i>
                            </div>

                            {/* <p>{item.project_name}</p>
                            <p>{item.numberoffile}</p>
                            <p>{item.size}</p> */}

                            <p>{item.name.split("(")[0].trim()}</p>
                            {/* <p>-</p>
                            <p>-</p> */}
                          </div>
                        ))}
                      </Col>
                    </Row>
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



{
  /* <Col  lg="2">
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
          </Col> */
}

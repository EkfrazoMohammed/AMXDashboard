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

import NotificationAlert from "react-notification-alert";
import classNames from "classnames";
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
     const allProjectData = response.data[0].folder_structure;

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
          height: 50,
        },
      ],
    };


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
  
        return new Date(b.datetime) - new Date(a.datetime);
      });

      const top5Latest = sortedData.slice(0, 5);

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
      const numberOfActiveDrones = data.data.reduce((count, drone) => {
        if (drone.Status === true) {
          return count + 1;
        }
        return count;
      }, 0);

      setActiveDrones(numberOfActiveDrones);

    } catch (error) {
      console.log(error);
    }
  };
 
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

let totalMissions = droneData.length
let activeMissions = droneData.filter((drone) => drone.Status === true).length
let inactiveMissions = droneData.filter((drone) => drone.Status === false).length
let remainSTorage = (remainingStorage - 10).toFixed(2)
  const datas = {
    labels: ['Active Missions ' ,'Inactive Missions'],
    datasets: [
      {
        data: [activeMissions,inactiveMissions], // values for each section
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
  let usedStorage=Maxstorage-(remainingStorage - 10);
  const storagedata = {
    labels: ["Used Storage","Remaining Storage"],
    datasets: [
      {
        data: [usedStorage, remainingStorage - 10, ], // values for each section
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
      title: "Active Missions",
      // count: droneData.filter((drone) => drone.Status === true).length,
      count: totalMissions,
      item: "missions",
      chart:  
      <Pie data={datas} options={options} />
     
    },
    {
      icon:<FontAwesomeIcon icon={faDatabase} style={{ color: "#1f8ef1", width: "20px", height: "20px" }} />
      ,
      title: `Max Storage: ${Maxstorage} GB `,
      item: `Available: ${remainSTorage} GB`,
      chart:<Doughnut data={storagedata} options={dougnutoptions} />
    }
  ];
  console.log("Added Changes")
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
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const history = useHistory();

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
              
                               {v.chart}

          
                </div>
              </CardBody>
            </Card>
          </Col>
    )
  })
}

         


     
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
                      <Col md="6" style={{ marginTop: "20px" }}>
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


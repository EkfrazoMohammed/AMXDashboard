import React, { useEffect, useState } from "react";
import { Line, Bar, Pie, Doughnut } from "react-chartjs-2"; // Import Line component
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

import { faker } from "@faker-js/faker"; // Updated import

import NotificationAlert from "react-notification-alert";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

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
        x="75%"
        y="48%"
        dy="0.4rem"
        textAnchor="end"
        fill={props.stroke}
        style={{
          fontSize: "2rem",
        }}
      >
        {`${props.value.toFixed(2)}GB`}
      </text>

      <text
        x="50%"
        y="50%"
        dy="1.5rem"
        textAnchor="middle"
        fill={props.stroke}
        style={{
          fontSize: "1rem",
          fontWeight: "bold",
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
  size: 210,
  value: 25,
  max: 100,
  strokeWidth: 20,
  stroke: "#3e98c7",
  text: "",
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
    console.log(files);
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
  const [selectedTimeRange, setSelectedTimeRange] = useState("last6months");

  const GetAllProjects = async () => {
    try {
      // https://fibregrid.amxdrones.com/dronecount/projects/
      const response = await axios.get(
        "https://fibregrid.amxdrones.com/dronecount/v2/get-folders/",
        config
      );
      // console.log(response.data.map(item => item.folder_structure), "projectdata====>")
      console.log(response.data[0].folder_structure, "All Projects====>");
      const allProjectData = response.data[0].folder_structure;
      setProject_list(allProjectData);

      console.log(response.data[1].total_size.toFixed(2), "storage remaining");
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

      // console.log(response.data.map(item => item.folder_structure), "projectdata====>")
      // console.log(response.data[0].folder_structure, "All Projects Charts====>");
      const allProjectData = response.data[0].folder_structure;

      let response2 = await axios.get(
        "https://fibregrid.amxdrones.com/dronecount/addDrone/",
        config
      );
      console.log(response2.data, "dronedata charts====>");
      const droneChartData = response2.data;

      console.log(droneChartData);

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

      console.log("processedChartData=>", processedChartData);
      setBarChartData(processedChartData);

      function convertData(dynamicData, datasetType) {
        const labels = dynamicData.map((item) => `${item.name}`);
        const data = dynamicData.map((item) => item[datasetType]);

        const dataset = {
          fill: true,
          label: datasetType,
          data: data,
          height: 50, // Increase the height (adjust the value as needed)
          borderColor:
            datasetType === "Projects_Added"
              ? "rgb(255, 99, 132)"
              : "rgb(75, 192, 192)",
          backgroundColor:
            datasetType === "Projects_Added"
              ? "rgba(255, 99, 132, 0.5)"
              : "rgba(75, 192, 192, 0.5)",
        };

        return {
          labels: labels,
          datasets: [dataset],
        };
      }

      const projectsData = convertData(processedChartData, "Projects_Added");
      const dronesData = convertData(processedChartData, "Drones_Added");

      console.log("Projects Data:");
      console.log(projectsData);
      setProjectdataChart(projectsData);

      console.log("Drones Data:");
      console.log(dronesData);
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
      console.log(pf1);
      setOptionChart(pf1);
    } catch (error) {
      console.log(error);
    }
  };
  const [optionChart, setOptionChart] = useState([]);
  const [optiondataChart, setdataOptionChart] = useState([]);

  const [projectdataChart, setProjectdataChart] = useState([]);
  const [dronedataChart, setDronedataChart] = useState([]);

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

    const monthsInTimeRange = [];

    let startDate, endDate;

    if (timeRange === "last6months") {
      startDate = sixMonthsAgo;
      endDate = new Date(today);
    } else if (timeRange === "present6months") {
      startDate = new Date(today);
      startDate.setDate(1);
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
    } else if (timeRange === "upcomingYear") {
      startDate = new Date(today.getFullYear() + 1, 0, 1);
      endDate = new Date(today.getFullYear() + 2, 0, 1);
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
    console.log(projectsData);

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
      // console.log(dronesForMonth);
      const monthYear = `${monthData.name.slice(0, 3)} ${monthData.year}`;

      // console.log(monthYear);

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

      console.log("Number of active drones:", numberOfActiveDrones);
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

  const chartData = [
    {
      name: "August",
      Drones_Added: 0,
      Projects_Added: 0,
      amt: 2400,
    },
    {
      name: "August",
      Drones_Added: 0,
      Projects_Added: 0,
      amt: 2400,
    },
    {
      name: "August",
      Drones_Added: 0,
      Projects_Added: 0,
      amt: 2400,
    },
    {
      name: "August",
      Drones_Added: 0,
      Projects_Added: 0,
      amt: 2400,
    },
    {
      name: "August",
      Drones_Added: 0,
      Projects_Added: 0,
      amt: 2400,
    },
    {
      name: "August",
      Drones_Added: 5,
      Projects_Added: 2,
      amt: 2400,
    },
  ];

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

  useEffect(() => {
    // Separate active and inactive drones
    const active = droneData.filter((drone) => drone.Status === true);
    const inactive = droneData.filter((drone) => drone.Status === false);

    console.log(active);
  }, [droneData]);
  const overviewdata = [
    {
      icon: faUser,
      title: "total projects",
      count: project_list.length,
      item: "projects",
    },
    {
      icon: faFileInvoice,
      title: "total Drones",
      count: droneData.length,
      item: "drones",
    },
    {
      icon: faDatabase,
      title: "Max Storage",
      count: "5",
      item: "GB",
    },
    {
      icon: faFolder,
      title: "Total Missions",
      count: droneData.filter((drone) => drone.Status === true).length,
      item: "missions",
    },
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
      console.log(payload, "payload=====>");
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

                <div className="col-md-8 col-sm-8 left-section">
                  {/* <h2>Left Section</h2> */}
                  <>
                    <Row>
                      <Col className="text-left" md="6">
                        <CardTitle tag="h4" style={{}}>
                          Dashboard Overview
                        </CardTitle>
                      </Col>
                    </Row>
                    <Row>
                      {/* {overviewdata.map((v,index)=>{
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
    ) })} */}
                      <Col md="3" sm="6">
                        <div className="card2">
                          <div
                            className="content"
                            style={{ backgroundColor: "#55d392" }}
                          >
                            <FontAwesomeIcon
                              icon={faUser}
                              style={{
                                color: "#ffffff",
                                width: "20px",
                                height: "20px",
                              }}
                            />
                            <h4
                              style={{
                                marginBottom: "5px",
                                fontSize: "12px",
                                fontWeight: "bold",
                              }}
                            >
                              total projects
                            </h4>
                            <h5
                              style={{ marginBottom: "5px", fontSize: "12px" }}
                            >
                              {project_list.length} projects
                            </h5>
                          </div>
                        </div>
                      </Col>

                      <Col md="3" sm="6">
                        <div className="card2">
                          <div
                            className="content"
                            style={{ backgroundColor: "#05daff" }}
                          >
                            <FontAwesomeIcon
                              icon={faFileInvoice}
                              style={{
                                color: "#ffffff",
                                width: "20px",
                                height: "20px",
                              }}
                            />
                            <h4
                              style={{
                                marginBottom: "5px",
                                fontSize: "12px",
                                fontWeight: "bold",
                              }}
                            >
                              total Drones
                            </h4>
                            <h5
                              style={{ marginBottom: "5px", fontSize: "12px" }}
                            >
                              {droneData.length} drones
                            </h5>
                          </div>
                        </div>
                      </Col>
                      <Col md="3" sm="6">
                        <div
                          style={{
                            overflow: "visible",
                          }}
                        >
                          <Dropdown
                            isOpen={dropdownOpen}
                            toggle={() => {
                              toggle(); // Call the 'toggle' function
                            }}
                          >
                            <DropdownToggle tag="span">
                              <div className="card2">
                                <div
                                  className="content"
                                  style={{
                                    backgroundColor: "#23efe2",
                                    overflow: "visible",
                                  }}
                                >
                                  <FontAwesomeIcon
                                    icon={faDatabase}
                                    style={{
                                      color: "#ffffff",
                                      width: "20px",
                                      height: "20px",
                                    }}
                                  />
                                  <h4
                                    style={{
                                      marginBottom: "5px",
                                      fontSize: "12px",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    max storage
                                  </h4>
                                  <h5
                                    style={{
                                      marginBottom: "5px",
                                      fontSize: "12px",
                                    }}
                                  >
                                    5 GB
                                  </h5>
                                  {/* <Dropdown isOpen={dropdownOpen} toggle={toggle} >
        <DropdownToggle caret tag="span">Dropdown</DropdownToggle>
        <DropdownMenu>
      
          
          <DropdownItem>Buy Now</DropdownItem>
        </DropdownMenu>
      </Dropdown> */}
                                </div>{" "}
                              </div>
                            </DropdownToggle>
                            <DropdownMenu container="body">
                              <DropdownItem
                                onClick={BuyNow}
                                className="container-storage"
                              >
                                <div>
                                  <a
                                    data={color}
                                    className="buynow"
                                    title="Buy storage"
                                  >
                                    <i
                                      style={{ color: "white" }}
                                      className="tim-icons icon-key-25"
                                    ></i>
                                    <span
                                      style={{
                                        marginLeft: "10px",
                                        color: "white",
                                      }}
                                    >
                                      Buy now
                                    </span>
                                  </a>
                                </div>
                              </DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </div>
                      </Col>

                      <Col md="3" sm="6">
                        <div className="card2">
                          <div
                            className="content"
                            style={{ backgroundColor: "#e75b8fbf" }}
                          >
                            <FontAwesomeIcon
                              icon={faFolder}
                              style={{
                                color: "#ffffff",
                                width: "20px",
                                height: "20px",
                              }}
                            />
                            <h4
                              style={{
                                marginBottom: "5px",
                                fontSize: "12px",
                                fontWeight: "bold",
                              }}
                            >
                              Total Missions
                            </h4>
                            <h5
                              style={{ marginBottom: "5px", fontSize: "12px" }}
                            >
                              {
                                droneData.filter(
                                  (drone) => drone.Status === true
                                ).length
                              }{" "}
                              missions
                            </h5>
                          </div>
                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col className="text-left" md="6">
                        <CardTitle tag="h4" style={{ marginTop: "20px" }}>
                          Overview
                        </CardTitle>
                      </Col>
                    </Row>

                    <Row>
                      {/* <Col md="12" style={{ marginTop: "20px" }}> */}
                      <div style={{ width: "50%", height: "100%" }}>
                        {barChartData.some(
                          (item) => item.Projects_Added > 0
                        ) && (
                          <Line options={optionChart} data={projectdataChart} />
                        )}
                      </div>
                      <div style={{ width: "50%", height: "100%" }}>
                        {barChartData.some(
                          (item) => item.Projects_Added > 0
                        ) && (
                          <Bar options={optionChart} data={dronedataChart} />
                        )}
                      </div>

                      {/* <ResponsiveContainer
                          width="100%"
                          height={400}
                          cursor="pointer"
                        >
                          <BarChart
                            className="barChartStyles"
                            data={barChartData}
                          >
                            <CartesianGrid strokeDasharray="2 2" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            {/* {barChartData.some(item => item.Projects_Added > 0) && ( 
                            <Bar
                              dataKey="Projects_Added"
                              fill="#3e98c7"
                              minPointSize={1}
                            />
                            {/* )} */}
                      {/* {barChartData.some(item => item.Drones_Added > 0) && ( 
                            <Bar
                              dataKey="Drones_Added"
                              fill="#55d392"
                              minPointSize={1}
                            />
                            {/* )} 
                          </BarChart>
                        </ResponsiveContainer> */}
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
                      {/* </Col> */}
                      {/* <p>{JSON.stringify(barChartData)}</p> */}
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

                {/* Right Section */}
                <div className=" col-md-4 ">
                  {/* <h2>Right Section</h2> */}
                  <>
                    <div
                      style={{
                        // background: "red",
                        // borderRadius: "1rem",
                        justifyContent: "center",
                        alignItems: "center",
                        paddingLeft: "25px",
                        paddingRight: "25px",
                      }}
                    >
                      <div
                        className="container"
                        style={{
                          background: "white",
                          borderRadius: "1rem",
                          justifyContent: "center",
                          alignItems: "center",
                          padding: "10px",
                          // width: "300px",
                        }}
                      >
                        <h3
                          style={{ textAlign: "center" }}
                          className="Storage-chart"
                        >
                          Storage
                        </h3>
                        <div
                          style={{ textAlign: "center", marginBottom: "auto" }}
                        >
                          <div
                            className="row"
                            // style={{ height: "500px", width: "500px" }}
                          >
                            <div className="col-12">
                              <RoundProgressBar
                                value={remainingStorage - 10}
                                max={Maxstorage}
                                text="AVAILABLE"
                                className="w-75"
                              />
                              {/* <CircularProgressbar
  className="w-75"
  value={remainingStorage - 10}
  maxValue={Maxstorage}
  text={`${remainingStorage - 10} GB`}
  
 >
  </CircularProgressbar> */}

                              {/* <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ textAlign: 'center' }}
    >
      <CircularProgressbar
        value={percentage}
        text={`${hovered ? 0 : percentage}%`}
        styles={buildStyles({
          textSize: '16px',
          pathTransitionDuration: 0.5,
          pathColor: `#3498db`,
          textColor: '#3498db',
        })}
      />
    </div> */}
                            </div>
                          </div>
                        </div>

                        {/* <div style={{ textAlign: "center" }} className="center">
                    
                                <div onClick={BuyNow} className="container-storage">
                            <a
                              data={color}
                              className="buynow"
                              title="Buy storage"
                            >
                              <i
                                style={{ color: "white" }}
                                className="tim-icons icon-key-25"
                              ></i>
                              <span
                                style={{ marginLeft: "10px", color: "white" }}
                              >
                                Buy now
                              </span>
                            </a>
                          </div>
                     
                        </div> */}
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

{
  /* </Col> */
}

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

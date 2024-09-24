import React, { useEffect, useState } from "react";
import { Line, Pie, Doughnut, Bar } from "react-chartjs-2"; // Import Line component
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
} from "chart.js";
import Droneimage from '../../src/views/assets/images/drone-dashboardICON.png'
import MissioIcon from '../../src/views/assets/images/png/missonLogo_dashboard.png'
import '../../src/views/assets/css/style.css'
import NotificationAlert from "react-notification-alert";
import "./styles/dashboard.css";
import { toast } from "react-toastify";
import axios from "axios";
import { useHistory } from "react-router-dom";

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Label,
  FormGroup,
  Input,
  Row,
  Col,
} from "reactstrap";

import {
  faClose,
  faFolder,
  faDatabase,
} from "@fortawesome/free-solid-svg-icons";

import "./assets/images/drone-icon.png";
import "./assets/images/project-folder-black.png";
import drone from "../assets/drone.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  BackgroundColorContext,
} from "contexts/BackgroundColorContext";

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
  const userIdO = localStorage.getItem("user_id");
  const amxtokenO = localStorage.getItem("amxtoken").replace(/"/g, "");
  const Maxstorage = 5; //15 GB

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

  const [remainingStorage, setRemainingStorage] = useState(15.0);
  const notificationAlertRef = React.useRef(null);
  const [project_list, setProject_list] = React.useState([]);
  const [recent_project_list, recent_setProject_list] = React.useState([]);

  const [addprojectopen, setaddprojectopen] = React.useState(false);
  const CloseProject = (name) => {
    setaddprojectopen(false);
  };

  const [selectedTimeRange, setSelectedTimeRange] = useState("last3months");

  const GetAllProjects = async () => {
    try {
      const response = await axios.get(
        "https://fibregrid.amxdrones.com/dronecount/v2/get-folders/",
        config
      );
      const allProjectData = response.data[0].folder_structure;
      setProject_list(allProjectData);
      setRemainingStorage(response.data[1].total_size.toFixed(2));
    } catch (error) {
      console.log(error);
    }
  };

  const GetAllChartData = async () => {
    try {
      const response = await axios.get(
        "https://fibregrid.amxdrones.com/dronecount/v2/get-folders/",
        config
      );
      const allProjectData = response.data[0].folder_structure;
      let response2 = await axios.get(
        "https://fibregrid.amxdrones.com/dronecount/addDrone/",
        config
      );
      const droneChartData = response2.data;
      const processedChartData = processDataForTimeRange(
        allProjectData,
        droneChartData || 0,
        selectedTimeRange
      );
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
        const gradientStroke = {
          canvas: null,
          context: null,
          gradient: null,
        };

        gradientStroke.canvas = document.createElement("canvas");
        gradientStroke.context = gradientStroke.canvas.getContext("2d");
        gradientStroke.gradient = gradientStroke.context.createLinearGradient(0, 230, 0, 50);
        gradientStroke.gradient.addColorStop(1, "rgba(29,140,248,0.2)");
        gradientStroke.gradient.addColorStop(0.4, "rgba(29,140,248,0.0)");
        gradientStroke.gradient.addColorStop(0, "rgba(29,140,248,0)"); // blue colors
        const dataset = {
          label: datasetType,
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
      setDronedataChart(dronesData);
    } catch (error) {
      console.log(error);
    }
  };

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        await Promise.all([GetAllChartData(), GetAllProjects(), GetRecentProjects(), GetAllDrone()]);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);


  let totalMissions = droneData.length
  let activeMissions = droneData.filter((drone) => drone.Status === true).length
  let inactiveMissions = droneData.filter((drone) => drone.Status === false).length
  let remainSTorage = (remainingStorage - 10).toFixed(2)
  const datas = {
    labels: ['Active Missions ', 'Inactive Missions'],
    datasets: [
      {
        data: [activeMissions, inactiveMissions], // values for each section
        backgroundColor: ['#208ef1', '#5cd1df', '#FFCE56'], // colors for each section
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  let usedStorage = Maxstorage - (remainingStorage - 10);
  const storagedata = {
    labels: ["Used Storage", "Remaining Storage"],
    datasets: [
      {
        data: [usedStorage, remainingStorage - 10,], // values for each section
        backgroundColor: ['#208ef1', '#5cd1df', '#FFCE56'], // colors for each section
      },
    ],
  };
  const dougnutoptions = {
    responsive: true,
    maintainAspectRatio: false,
  };
  const [data, setData] = useState({
    name: "",
    user_id: userIdO,
  });
  const handleChange = (e) =>
    setData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let data1 = await axios
        .post(
          "https://fibregrid.amxdrones.com/dronecount/projects/",
          data,
          config
        )
        .then((res) => {
          toast.success("New project added !", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            icon: <img src={drone} alt="drone-img" />,
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
              icon: <img src={drone} alt="drone-img" />,
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
  const history = useHistory();
  const lineChartOptions = {
    scales: {
      x: {
        ticks: {
          stepSize: 1, // ensures steps of 1 on the x-axis
          callback: function (value) {
            return Math.floor(value); // show whole numbers only
          }
        }
      },
      y: {
        ticks: {
          stepSize: 1, // ensures steps of 1 on the y-axis
          callback: function (value) {
            return Math.floor(value); // show whole numbers only
          }
        }
      }
    }
  };

  const barChartOptions = {
    scales: {
      x: {
        ticks: {
          stepSize: 1, // ensures steps of 1 on the x-axis
          callback: function (value) {
            return Math.floor(value); // show whole numbers only
          }
        }
      },
      y: {
        ticks: {
          stepSize: 1, // ensures steps of 1 on the y-axis
          callback: function (value) {
            return Math.floor(value); // show whole numbers only
          }
        }
      }
    }
  };

  const overviewdata = [
    {
      icon: <FontAwesomeIcon icon={faFolder} style={{ color: "#1f8ef1", width: "20px", height: "20px" }} />,
      title: "total projects",
      count: project_list.length,
      item: "projects",
      chart:
        <Line
          data={projectdataChart}
          options={lineChartOptions} // Apply options here
          style={{ minHeight: "150px", maxHeight: "220px" }}
        />
    },
    {
      icon: <img src={Droneimage} alt="" srcset="" width='30px' height='30px' />
      ,
      title: "total Drones",
      count: droneData.length,
      item: "drones",
      chart:
        <Bar
          data={dronedataChart}
          options={barChartOptions} // Apply options here
          style={{ minHeight: "150px", maxHeight: "220px" }}
        />
    },

    {
      icon: <img src={MissioIcon} alt="" srcset="" width='30px' height='30px' />
      ,
      title: "Active Missions",
      count: totalMissions,
      item: "missions",
      chart:
        <Pie data={datas} options={options} style={{ minHeight: "150px", maxHeight: "220px" }} />

    },
    {
      icon: <FontAwesomeIcon icon={faDatabase} style={{ color: "#1f8ef1", width: "20px", height: "20px" }} />
      ,
      title: `Max Storage: ${Maxstorage} GB `,
      item: `Available:${remainSTorage} GB`,
      chart: <Doughnut data={storagedata} options={dougnutoptions} style={{ minHeight: "150px", maxHeight: "220px" }} />
    }
  ];

  return (
    <BackgroundColorContext.Consumer>
      {({ color }) => (
        <>
          <div className="react-notification-alert-container">
            <NotificationAlert ref={notificationAlertRef} />
          </div>
          <div className={addprojectopen === true ? "overlay show" : "overlay"}>
            <div className="popup-outer">
              <div className="popup-box">
                <FontAwesomeIcon
                  onClick={CloseProject}
                  className="close"
                  icon={faClose}
                />
                <div className="profile-text">
                  <div className="text">
                    <span className="name">Create Projects</span>
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
              </div>
            </div>
          </div>

          <div className="content"
            style={{
              backgroundColor:
                color === "green"
                  ? "rgba(255,140,49,.05)"
                  : color === "primary"
                    ? "rgba(253,101,113,.05)"
                    : "rgba(65, 195, 199,.03)",
            }}
          >
            {isLoading ? <>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '75vh', width: '100%', justifyContent: 'center', overflow: 'hidden' }}>
                <img src="https://cdnl.iconscout.com/lottie/premium/thumb/loading-5966360-4958661.gif" width='60px' alt="" />
                <span style={{ fontSize: "20px" }}>
                  {" "}
                  Fetching Data please wait...
                </span>
              </div>
            </> : <>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-12 col-sm-12 left-section">
                    <>
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
                          overviewdata.map((v, index) => {
                            return (
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
                                    <div className="chart-area" style={{ display: 'flex', justifyContent: 'center', minHeight: "220px" }}>
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
                                gap: ".5rem",
                              }}
                            >
                              <Label htmlFor="timeRange" style={{ margin: 0 }}>
                                Select Duration
                              </Label>
                              <Input
                                style={{ backgroundColor: '#ffff', padding: "4px" }}
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
                              <p>{item.name.split("(")[0].trim()}</p>
                            </div>
                          ))}
                        </Col>
                      </Row>
                    </>
                  </div>
                </div>
              </div>
            </>}
          </div>
        </>
      )}
    </BackgroundColorContext.Consumer>
  );
}

export default Dashboard;
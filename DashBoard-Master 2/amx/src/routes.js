import Dashboard from "views/Dashboard.js";

// import Dashboard2 from "views/Dashboard2.js";

// import Dashboard3 from "views/Dashboard3.js";
import Icons from "views/Icons.js";
import Login from "views/Login";

import Map from "views/Map.js";
import Notifications from "views/Notifications.js";
import AddDrone from "views/AddDrone/AddDrone";
import Mission from "views/Mission/Mission";
import ParentProject from "views/projects/ParentProject";
import Parent from "views/projects/Parent";
import ViewerWrapper from "views/Viewer";
import Folder from "views/Home/Folders";
import VideoViewer from "views/VideoViewer/VideoViewer";
import NewMap from "views/NewMap";
import MapWithSearch from "views/MapWithSearch";
import UserProfile from "views/UserProfile";
import FolderModal from "views/FolderModal";
import NM2 from "views/NM2";
import LatestNewMap from "views/LatestNewMap";
import NewViewer from "views/NewViewer";
import DemoVideoViewer from "views/VideoViewer/DemoVideoViewer";
import VideoParentProject from "views/VideoViewer/VideoParentProject";
import RoboFlow from "views/RoboFlow";
import Yulu from "./views/Yulu"
import NewMapWithArea from "./views/NewMapWithArea"
import AshikRoboFlow from "views/AshikRoboFlow";
var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    // rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/amx",
  },
  {
    path: "/parentproject",
    name: "Project List",
    // rtlName: "طباعة",
    icon: "tim-icons icon-support-17",
    component: Parent,
    layout: "/amx",
  },

  {
    path: "/dronelist",
    name: "Drone List ",
    // rtlName: "الرموز",
    icon: "tim-icons icon-controller",
    component: Icons,
    layout: "/amx",
  },
  {
    path: "/map",
    name: "Drone Locations",
    // rtlName: "خرائط",
    // icon: "tim-icons icon-pin",
    icon: "tim-icons icon-square-pin",
    component: Map,
    layout: "/amx",
  },
  
  {
    path: "/roboflow",
    name: "Analytics",
    // rtlName: "إخطارات",
    icon: "tim-icons icon-support-17",
    component: RoboFlow,
    layout: "/amx",
  },
  // {
  //   path: "/roboflow",
  //   name: "Analytics",
  //   // rtlName: "إخطارات",
  //   icon: "tim-icons icon-support-17",
  //   component: AshikRoboFlow,
  //   layout: "/amx",
  // },
  {
    path: "/mission",
    name: "Mission",
    // rtlName: "طباعة",
    icon: "tim-icons icon-planet",
    component:NewMapWithArea,
    layout: "/amx",
  },
  // {
  //   path: "/mission",
  //   name: "Mission",
  //   // rtlName: "طباعة",
  //   icon: "tim-icons icon-planet",
  //   component:LatestNewMap,
  //   layout: "/amx",
  // },
  {
    path: "/viewer",
    name: "Viewer",
    // rtlName: "إخطارات",
    icon: "tim-icons icon-world",
    component: NewViewer,
    layout: "/amx",
  },

];
export default routes;

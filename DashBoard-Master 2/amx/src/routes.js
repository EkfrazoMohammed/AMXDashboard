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

  // {
  //   path: "/parentproject",
  //   name: "Project List",
  //   // rtlName: "طباعة",
  //   icon: "tim-icons icon-support-17",
  //   component: ParentProject,
  //   layout: "/amx"
  // },
  // {
  //   path: "/parentproject",
  //   name: "Project List",
  //   // rtlName: "طباعة",
  //   icon: "tim-icons icon-support-17",
  //   component: ParentProject,
  //   layout: "/amx",
  // },
  // {
  //   path: "/adddrone",
  //   name: "Add Drone",
  //   // rtlName: "طباعة",
  //   icon: "tim-icons icon-spaceship",
  //   component: AddDrone,
  //   layout: "/amx",
  // },

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
  
  // {
  //   path: "/folders",
  //   name: "Folders",
  //   // rtlName: "خرائط",
  //   // icon: "tim-icons icon-pin",
  //   icon: "tim-icons icon-support-17",
    
  //   component: Folder,
  //   layout: "/amx",
  //   hidden:true,
  // },
  ,
  //  {
  //   path: "/VideoViewer",
  //   name: "Analytics",
  //   // rtlName: "خرائط",
  //   // icon: "tim-icons icon-pin",
  //   icon: "tim-icons icon-support-17",
    
  //   component: VideoViewer,
  //   layout: "/amx"
  // },

  // {
  //   path: "/VideoViewer",
  //   name: "Analytics",
  //   // rtlName: "خرائط",
  //   // icon: "tim-icons icon-pin",
  //   icon: "tim-icons icon-support-17",
    
  //   component: DemoVideoViewer,
  //   layout: "/amx"
  // },
  // {
  //   path: "/videoparentproject",
  //   name: "New Analytics",
  //   // rtlName: "خرائط",
  //   // icon: "tim-icons icon-pin",
  //   icon: "tim-icons icon-support-17",
    
  //   component: VideoParentProject,
  //   layout: "/amx"
  // },
  

  {
    path: "/roboflow",
    name: "Analytics",
    // rtlName: "إخطارات",
    icon: "tim-icons icon-support-17",
    component: Yulu,
    layout: "/amx",
  },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   // rtlName: "إخطارات",
  //   icon: "tim-icons icon-bell-55",
  //   component: Notifications,
  //   layout: "/amx"
  // },
  // {
  //   path: "/user-profile",
  //   name: "User Profile",
  //   // rtlName: "ملف تعريفي للمستخدم",
  //   icon: "tim-icons icon-single-02",
  //   component: UserProfile,
  //   layout: "/amx"
  // },
  // {
  //   path: "/tables",
  //   name: "Table List",
  //   // rtlName: "قائمة الجدول",
  //   icon: "tim-icons icon-puzzle-10",
  //   component: TableList,
  //   layout: "/amx"
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   // rtlName: "طباعة",
  //   icon: "tim-icons icon-align-center",
  //   component: Typography,
  //   layout: "/amx"
  // },

  // {
  //   path: "/login",
  //   name: "Login",
  //   // rtlName: "طباعة",
  //   icon: "tim-icons icon-button-power",
  //   component: Login,
  //   layout: ""
  // },
  // {
  //   path: "/addproject",
  //   name: "Add Project",
  //   // rtlName: "طباعة",
  //   icon: "tim-icons icon-support-17",
  //   component: AddProject,
  //   layout: "/amx"
  // },

  // {
  //   path: "/mission",
  //   name: "Mission",
  //   // rtlName: "طباعة",
  //   icon: "tim-icons icon-planet",
  //   component: Mission,
  //   layout: "/amx",
  // },
  {
    path: "/mission",
    name: "Mission",
    // rtlName: "طباعة",
    icon: "tim-icons icon-planet",
    component:LatestNewMap,
    layout: "/amx",
  },
  // {
  //   path: "/mission",
  //   name: "Mission",
  //   // rtlName: "طباعة",
  //   icon: "tim-icons icon-planet",
  //   component:NewMap,
  //   layout: "/amx",
  // },
  // {
  //   path: "/mission1",
  //   name: "Mission1",
  //   // rtlName: "طباعة",
  //   icon: "tim-icons icon-planet",
  //   component:MapWithSearch,
  //   layout: "/amx",
  // },
  // {
  //   path: "/userprofile",
  //   name: "user profile",
  //   // rtlName: "طباعة",
  //   icon: "tim-icons icon-single-02",
  //   component:UserProfile,
  //   layout: "/amx",
  // },
  // {
  //     path: "/notifications",
  //     name: "Notifications",
  //     // rtlName: "إخطارات",
  //     icon: "tim-icons icon-bell-55",
  //     component: Notifications,
  //     layout: "/amx"
  //   },

  {
    path: "/viewer",
    name: "Viewer",
    // rtlName: "إخطارات",
    icon: "tim-icons icon-world",
    component: NewViewer,
    layout: "/amx",
  },
  // component: ViewerWrapper,
  // {
  //   path: "/newviewer",
  //   name: "NewViewer",
  //   // rtlName: "إخطارات",
  //   icon: "tim-icons icon-world",
  //   component: NewViewer,
  //   layout: "/amx",
  // },

  // {
  //   path: "/processdata",
  //   // name: "ProcessData",
  //   // rtlName: "طباعة",
  //   // icon: "tim-icons icon-align-center",
  //   // component: CreateProject,
  //   layout: "/threedview"
  // },

  // {
  //   path: "/threedview",
  //   // name: "ThreeDViewer",
  //   // rtlName: "طباعة",
  //   // icon: "tim-icons icon-align-center",
  //   // component: CreateProject,
  //   layout: "/twodview"
  // },

  // {
  //   path: "/twodview",
  //   // name: "TwoDview",
  //   // rtlName: "طباعة",
  //   // icon: "tim-icons icon-align-center",
  //   // component: CreateProject,
  //   layout: "/amx"
  // }
  // {
  //   path: "/rtl-support",
  //   name: "RTL Support",
  //   // rtlName: "ار تي ال",
  //   icon: "tim-icons icon-world",
  //   component: Rtl,
  //   layout: "/rtl"
  // }

  // {
  //   path: "/foldermodal",
  //   name: "foldermodal",
  //   // rtlName: "طباعة",
  //   icon: "tim-icons icon-support-17",
  //   component: NM2,
  //   layout: "/amx",
  // },
  // {
  //   path: "/latestmission",
  //   name: "latestmission",
  //   // rtlName: "طباعة",
  //   icon: "tim-icons icon-support-17",
  //   component: LatestNewMap,
  //   layout: "/amx",
  // },
];
export default routes;

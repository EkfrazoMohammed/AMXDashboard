
import Dashboard from "views/Dashboard.js";
import Icons from "views/Icons.js";
import Login from "views/Login";
import Map from "views/Map.js";
import Notifications from "views/Notifications.js";
import AddDrone from "views/AddDrone/AddDrone";
import Mission from "views/Mission/Mission";
import ParentProject from "views/projects/ParentProject";
import ViewerWrapper from "views/Viewer";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    // rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/amx"
  },

  {
    path: "/parentproject",
    name: "Project List",
    // rtlName: "طباعة",
    icon: "tim-icons icon-support-17",
    component: ParentProject,
    layout: "/amx"
  },
  {
    path: "/adddrone",
    name: "Add Drone",
    // rtlName: "طباعة",
    icon: "tim-icons icon-spaceship",
    component: AddDrone,
    layout: "/amx"
  },

  {
    path: "/dronelist",
    name: "Drone List ",
    // rtlName: "الرموز",
    icon: "tim-icons icon-controller",
    component: Icons,
    layout: "/amx"
  },
  {
    path: "/map",
    name: "Drone Locations",
    // rtlName: "خرائط",
    // icon: "tim-icons icon-pin",
    icon: "tim-icons icon-square-pin",
    
    component: Map,
    layout: "/amx"
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







  {
    path: "/mission",
    name: "Mission",
    // rtlName: "طباعة",
    icon: "tim-icons icon-planet",
    component: Mission,
    layout: "/amx"
  },

  
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
      icon: "tim-icons icon-tag",
      component: ViewerWrapper,
      layout: "/amx"
    },




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
];
export default routes;

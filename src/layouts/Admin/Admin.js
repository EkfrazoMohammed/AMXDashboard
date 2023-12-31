
import React from "react";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";

import routes from "routes.js";

// import amx from "/Users/apple/Documents/DashBoard-Master/black-dashboard-react-master/src/views/assets/images/amx.png";
import '../../../src/views/assets/images/amx.png'
import amx_white from '../../../src/views/assets/images/amx_white.png'
// import amx_white from "/Users/apple/Documents/DashBoard-Master/black-dashboard-react-master/src/views/assets/images/amx_white.png";

import { BackgroundColorContext } from "contexts/BackgroundColorContext";
import ProcessData from "views/projects/ProcessData";
import ThreeDViewer from "views/projects/ThreeDview";
import TwoDview from "views/projects/TwoDview";
import AddDrone from "views/AddDrone/AddDrone";
import UserProfile from "views/UserProfile";
import SubChild from "views/projects/SubChild";
import ParentProject from "views/projects/ParentProject";
import Child from "views/projects/Child";
import ViewerWrapper from "views/Viewer";
import Folders from "views/Home/Folders";
import NewMap from "views/NewMap";
import FolderModal from "views/FolderModal";
import NM2 from "views/NM2";
import ModalFolders from "views/Home/ModalFolders";
import NewViewer from "views/NewViewer";
import FolderFolders from "views/Home/FolderFolders";
import DemoVideoViewer from "views/VideoViewer/DemoVideoViewer";
import VideoAnalytics from "views/VideoViewer/VideoAnalytics";
import VideoParentProject from "views/projects/ParentProject";

var ps;

function Admin(props) {
  const location = useLocation();
  const mainPanelRef = React.useRef(null);
  const [sidebarOpened, setsidebarOpened] = React.useState(
    document.documentElement.className.indexOf("nav-open") !== -1
  );
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
      ps = new PerfectScrollbar(mainPanelRef.current, {
        suppressScrollX: true
      });
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.documentElement.classList.add("perfect-scrollbar-off");
        document.documentElement.classList.remove("perfect-scrollbar-on");
      }
    };
  });
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    if (mainPanelRef.current) {
      mainPanelRef.current.scrollTop = 0;
    }
  }, [location]);
  // this function opens and closes the sidebar on small devices
  const toggleSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    setsidebarOpened(!sidebarOpened);
  };
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/amx") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  const getBrandText = (path) => {
    console.log('\nlocation.pathname====>\t'+location.pathname)
    for (let i = 0; i < routes.length; i++) {
      console.log('routess=====>'+(location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1))

      if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        console.log("routes[i].name ->"+routes[i].name+'index\t->',i)
        return routes[i].name;
      }
      else{
        console.log("routes[i].name=="+routes[i].name+'\tindex==',i)
        var routename = location.pathname
        const split_route = routename.split('/')
        console.log('split_route====>\t'+split_route[2])
        return split_route[2]
      }
    }
    return "Brand";
  };
  return (
    <BackgroundColorContext.Consumer>
      {({ color, changeColor }) => (
        <React.Fragment>
          <div className="wrapper">
            <Sidebar
              routes={routes}
              logo={{
                // outterLink: "https://www.creative-tim.com/",
                text: "AMX",
                imgSrc: amx_white,
                
              }}
              toggleSidebar={toggleSidebar}
            />
            <div className="main-panel" ref={mainPanelRef} data={color}>
              <AdminNavbar
                // brandText={getBrandText(location.pathname)}
                toggleSidebar={toggleSidebar}
                sidebarOpened={sidebarOpened}
              />
              <Switch>
                {getRoutes(routes)}
                <Route from="/amx/processdata" render={() => <ProcessData/>} />
                <Route from="/amx/threedview" render={() => <ThreeDViewer/>} />
                <Route from="/amx/twodview" render={() => <TwoDview/>} />
                <Route from="/amx/adddrone" render={() => <AddDrone/>} />
                <Route from="/amx/userprofile" render={() => <UserProfile/>} />
                <Route from="/amx/parentproject" render={() => <ParentProject/>} />
                <Route from="/amx/child" render={() => <Child/>} />
                {/* <Route from="/amx/subchild" render={() => <Folders/>} /> */}
                <Route from="/amx/subchild" render={() => <SubChild/>} />

              {/* analytics */}
                <Route from="/amx/newVideoViewer" render={() =><DemoVideoViewer />} />
              {/* analytics */}

                <Route from="/amx/viewer" render={() => <ViewerWrapper/>} />
                
                <Route from="/amx/newviewer" render={() =><NewViewer />} />
                <Route from="/amx/folders" render={() => <Folders/>} />

                
                <Route from="/amx/videoparentproject" render={() => <VideoParentProject />} />
                <Route from="/amx/vfolders" render={() => <VideoAnalytics />} />

                {/* <Route from="/amx/folders" render={() => <FolderFolders />} /> */}
                
                <Route from="/amx/savefolders" render={() => <ModalFolders/>} />
                
                <Route from="/amx/newmap" render={() => <NewMap />} />

                <Route from="/amx/foldermodal" render={() => <NM2 />} />
                <Redirect from="*" to="/amx/dashboard" />
              </Switch>
              {/* {
                // we don't want the Footer to be rendered on map page
                location.pathname === "/amx/maps" ? null : <Footer fluid />
              } */}
            </div>
          </div>
          {/* <FixedPlugin bgColor={color} handleBgClick={changeColor} /> */}
        </React.Fragment>
      )}
    </BackgroundColorContext.Consumer>
  );
}

export default Admin;

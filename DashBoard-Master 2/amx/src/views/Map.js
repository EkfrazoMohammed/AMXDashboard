
import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  useLoadScript,
  InfoWindow,
} from "@react-google-maps/api";
import { DoneRounded } from "@material-ui/icons";

import dronelogo from "../assets/drone.png";
import { ToastContainer, toast } from "react-toastify";
const map_data = [
  {
    id: 1,
    modelId: "qq123",
    lat: 12.972442,
    lng: 77.580643,
    isActive: true,
  },
  {
    id: 2,
    modelId: "qq456",
    lat: 12.772442,
    lng: 77.540643,
    isActive: false,
  },
];

const center = {
  lat: 12.772442,
  lng: 77.540643,
};

function DroneMap(props) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyD-ww6ewKJkrhAZNRQRwITZRpSMnziHdc0",
  });

  // const [mapStatus, setMapStatus] = useState({
  //   latitude: 0, // Set your desired initial latitude value here
  //   longitude: 0, // Set your desired initial longitude value here
  // });
  const [mapStatus, setMapStatus] = useState([]);
  const userIdO = localStorage.getItem("user_id");
  const amxtokenO = localStorage.getItem("amxtoken").replace(/"/g, "");
  const config = {
    params: {
      user_id: userIdO,
    },
    headers: {
      Authorization: amxtokenO,
    },
  };
  // const [tableData, setTableData] = useState([]);
  let GetAllDrone = async () => {
    try {
      let data = await axios.get(
        "https://fibregrid.amxdrones.com/dronecount/addDrone/",
        config
      );
      console.log(data.data.length, "dronedata====>");
      console.log(data.data)
      setMapStatus(data.data)
     
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Call GetAllDrone initially when the component mounts
    GetAllDrone();

    // Set up a recurring interval to update data every 2 seconds
    const intervalId = setInterval(GetAllDrone, 2000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to run this effect only once on mount

  // const url = "https://fibregrid.amxdrones.com/dronecount/drone/";

  // useEffect(() => {
  //   const getAllDroneStatus = async () => {
  //     const response = await axios.get(url);
  //     console.table(response.data);
  //     console.log(Object.keys(response.data).length)
  //     setMapStatus(response.data);
      
  //   };
  //   getAllDroneStatus();
  // }, []);
  const [clickedMarkerInfo, setClickedMarkerInfo] = useState(null);
  const [isInfoWindowOpen, setIsInfoWindowOpen] = useState(false);
  
  const handleMarkerClick = (drone) => {
    // alert(drone.model_name)
    toast.info("Model : "+drone.model_name, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      icon: <img src={dronelogo} />,
    });
    if (clickedMarkerInfo === drone) {
      // If the marker is already clicked, close the InfoWindow
      setClickedMarkerInfo(drone);
    } else {
      // If a different marker is clicked, open the InfoWindow
      setClickedMarkerInfo(null);
    }
  };
  
  
  
  
  // [{
  //   aircraft_type:"",
  //   connection_id:"",
  //   model_name:"",
  //   purchase_year:"",
  //   UIN:"",
  //   time_in_service:"",
  //   Next_maintainance:"",
  //   user_id:"",
  //   drone_id: "",
  //   latitude: "",
  //   longitude: ""
  // }]
  const dron_state_icon = {
    red: "https://img.icons8.com/color/48/marker--v1.png",
    green: "https://img.icons8.com/color/48/000000/marker--v1.png",
    one:"https://aactxg.stripocdn.email/content/guids/CABINET_f37167ea2322984dfeb6a0a05e92d2480b49356b15fb055bb2ce2e84131a12e4/images/icons8drone64.png",
    two:"https://aactxg.stripocdn.email/content/guids/CABINET_f37167ea2322984dfeb6a0a05e92d2480b49356b15fb055bb2ce2e84131a12e4/images/icons8drone64_1.png",
    active:"https://aactxg.stripocdn.email/content/guids/CABINET_f37167ea2322984dfeb6a0a05e92d2480b49356b15fb055bb2ce2e84131a12e4/images/icons8drone50.png",
    inactive:"https://aactxg.stripocdn.email/content/guids/CABINET_f37167ea2322984dfeb6a0a05e92d2480b49356b15fb055bb2ce2e84131a12e4/images/icons8drone50_1.png"
  };

  useEffect(() => {
    // Close the InfoWindow when clickedMarkerInfo changes to null
    if (!clickedMarkerInfo) {
      setIsInfoWindowOpen(false);
    }
  }, [clickedMarkerInfo]);
  
  const renderMap = () => {
    if (!isLoaded) {
      return <div>Loading map...</div>;
    }
    const mapOptions = {
      // Basic options
      mapTypeId: "hybrid",     // Set the map type (e.g., "roadmap", "terrain", "satellite", "hybrid")
      // zoomControl: true,          // Display zoom control
      streetViewControl: false,   // Display street view control
      // fullscreenControl: true,    // Display fullscreen control

      mapTypeControl: false,   // Disable map type control
    
      // Display options
      backgroundColor: "#f2f2f2", // Background color of the map
      disableDefaultUI: false,    // Disable default UI components (zoom, map type, etc.)
      draggable: true,            // Make the map draggable
      scrollwheel: true,          // Enable zoom via mouse scrollwheel
      disableDoubleClickZoom: false, // Disable zoom on double click
    
      // Interaction options
      gestureHandling: "auto",    // Define how the map responds to user gestures ("cooperative", "greedy", "auto")
      draggableCursor: "pointer", // Set the cursor type when dragging the map
      draggingCursor: "grabbing", // Set the cursor type when the map is being dragged
      minZoom: 2, // Set the minimum zoom level to show the whole world map
  // maxZoom: 6, 
      // Custom map styles
      styles: [
        // Define custom map styles as an array of objects
        // Refer to the Google Maps Styling Wizard for generating styles: https://mapstyle.withgoogle.com/
      ],
    
      // ... other map options
    };
    
    return (
      <GoogleMap
        center={center}
        zoom={10}
        mapContainerStyle={{ width: "100%", height: "97vh",position:"relative",zIndex:"2000" }}
        options={mapOptions}
      >
     

{mapStatus.map((drone) => (
        <Marker
          key={drone.id}
          position={{ lat: parseFloat(drone.latitude), lng: parseFloat(drone.longitude) }}
          onClick={() => handleMarkerClick(drone)}
          icon={drone.Status ? dron_state_icon.one : dron_state_icon.two}
        >
          {clickedMarkerInfo===drone?
        <>
          <InfoWindow
           
           position={{ lat: parseFloat(drone.latitude), lng: parseFloat(drone.longitude) }}
           onCloseClick={() => {
             setClickedMarkerInfo(null);
           }}
         >
           {<div>
             <p>{drone.id}</p>
           </div>}
         </InfoWindow>
        </>  
        :
        <>
        
        </>}
          
        
        </Marker>
      ))}


      </GoogleMap>
    );
  };
  
  const renderedMap = useMemo(() => {
    return isLoaded ? renderMap() : <div>Map loading...</div>;
  }, [isLoaded, mapStatus]);

  return renderedMap;
};

const defaultProps = {
  center: {
    lat: 12.772442,
    lng: 77.540643,
  },
  zoom: 11,
};

function Maps() {
  return (
    <>
     <ToastContainer />
      <div className="content mycustompadding">
        <Row>
          <Col md="12">
            <Card className="card-plain">
              <CardBody>
                {/* <div
                  id="map"
                  className="map"
                  style={{ position: "relative", overflow: "hidden" }}
                > */}
                 <div
                  id="map"
                  className="map"
                  style={{ position: "relative"}}
                >
                  <DroneMap />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Maps;

/*!

=========================================================
* Black Dashboard React v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React,{useState,useEffect,useMemo} from "react";

// reactstrap components
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import { GoogleMap, useJsApiLoader, Marker,useLoadScript } from "@react-google-maps/api";


const map_data = [
    {
      id: 1,
      modelId: "qq123",
      lat: 12.972442,
      lng: 77.580643,
      isActive: true
    },
    {
      id: 2,
      modelId: "qq456",
      lat: 12.772442,
      lng: 77.540643,
      isActive: false
    }
  ];
  
  const center = {
    lat: 12.772442,
    lng: 77.540643
  };

  

  function DroneMap(props) {
    const { isLoaded } = useLoadScript({
      googleMapsApiKey: "AIzaSyD-ww6ewKJkrhAZNRQRwITZRpSMnziHdc0"
    });

    const [mapStatus, setMapStatus] = useState([]);
    const url = "https://fibregrid.amxdrones.com/dronecount/drone/";
    const getAllDroneStatus = async () => {
      const response = await fetch(url);
      response.json().then((res) => {
        setMapStatus(res);
     
       
        
      });
    };
  
    useEffect(() => {
  
        getAllDroneStatus();
     
    }, []);
  
    const dron_state_icon = {
      red: "https://img.icons8.com/color/48/marker--v1.png",
      green: "https://img.icons8.com/color/48/000000/marker--v1.png",
    };
  
   
    const handleMarkerClick = (prop) => {
      alert(prop);
    };
  
    const renderMap = () => {
      return (
        <div style={{ width: "100%", height: "80vh" }}>
        <GoogleMap
          center={center}
          zoom={10}
          mapContainerStyle={{ width: "100%", height: "100%" }}
        >
          {/* <Marker
            position={{
              lat: mapStatus.latitude,
              lng: mapStatus.longitude
            }}
            // icon={data.isActive ? dron_state_icon.green : dron_state_icon.red}
            // icon={dron_state_icon.red}
            // onClick={() => handleMarkerClick(data.modelId)}
          /> */}
          {map_data.map((data, i) => {
            return (
              <Marker
                key={i}
                position={{
                  lat: data.lat,
                  lng: data.lng
                }}
                icon={data.isActive ? dron_state_icon.green : dron_state_icon.red}
                // icon={dron_state_icon.green}
                onClick={() => handleMarkerClick(data.modelId)}
              />
            );
          })}
        </GoogleMap>
        </div>
      );
    };
  
    const renderedMap = useMemo(() => {
      return isLoaded ? renderMap() : <div>Map loading...</div>;
    }, [isLoaded]);
  
    return renderedMap;
  }


  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627
    },
    zoom: 11
  };

  


function Maps() {
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card className="card-plain">
            
              <CardBody>
              <div
                  id="map"
                  className="map"
                  style={{ position: "relative", overflow: "hidden" }}
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
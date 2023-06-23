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
import { GoogleMap, useJsApiLoader, Marker,useLoadScript, InfoWindow } from "@react-google-maps/api";


// const map_data = [
//     {
//       id: 1,
//       modelId: "qq123",
//       lat: 12.972442,
//       lng: 77.580643,
//       isActive: true
//     },
//     {
//       id: 2,
//       modelId: "qq456",
//       lat: 12.772442,
//       lng: 77.540643,
//       isActive: false
//     }
//   ];
  
  const center = {
    lat: 12.772442,
    lng: 77.540643
  };

  function DroneMap() {
    const { isLoaded } = useLoadScript({
      googleMapsApiKey: "AIzaSyD-ww6ewKJkrhAZNRQRwITZRpSMnziHdc0",
    });
  
    const [markers, setMarkers] = useState([]);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const handleMapClick = (event) => {
      const clickedLat = event.latLng.lat();
      const clickedLng = event.latLng.lng();
      const newMarker = {
        id: markers.length + 1,
        lat: clickedLat,
        lng: clickedLng,
      };
      setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
    };
    console.log(markers)
    const handleMarkerClick = (marker) => {
      setSelectedMarker(marker);
    };
    const renderMap = () => {
      return (
        <div style={{ width: "100%", height: "80vh" }}>
          <GoogleMap
            center={center}
            zoom={10}
            mapContainerStyle={{ width: "100%", height: "100%" }}
            onClick={handleMapClick}
          >
            {markers.map((marker) => (
              <Marker
                key={marker.id}
                position={{ lat: marker.lat, lng: marker.lng }}
                onClick={() => handleMarkerClick(marker)}
                >{selectedMarker === marker && (
                  <InfoWindow onCloseClick={() => setSelectedMarker(null)}>
                    <div>Latitude: {marker.lat} Longitude: {marker.lng}</div>
                    
                  </InfoWindow>
                )}</Marker>
              
            ))}
          </GoogleMap>
        </div>
      );
    };
  
    return isLoaded ? renderMap() : <div>Loading map...</div>;
  }
  

  // function DroneMap(props) {
  //   const { isLoaded } = useLoadScript({
  //     googleMapsApiKey: "AIzaSyD-ww6ewKJkrhAZNRQRwITZRpSMnziHdc0",
  //   });
  
  //   const [mapStatus, setMapStatus] = useState([]);
  //   const url = "https://fibregrid.amxdrones.com/dronecount/drone/";
  //   const getAllDroneStatus = async () => {
  //     const response = await fetch(url);
  //     response.json().then((res) => {
  //       setMapStatus(res);
  //     });
  //   };
  
  //   useEffect(() => {
  //     getAllDroneStatus();
  //   }, []);
  
  //   const dron_state_icon = {
  //     red: "https://img.icons8.com/color/48/marker--v1.png",
  //     green: "https://img.icons8.com/color/48/000000/marker--v1.png",
  //   };
  
  //   const [markers, setMarkers] = useState([]);
  
  //   const handleMarkerClick = (marker) => {
  //     console.log(marker.modelId);
  //   };
  
  //   // const handleMapClick = (event) => {
  //   //   const newMarker = {
  //   //     id: markers.length + 1,
  //   //     modelId: `new_marker_${markers.length + 1}`,
  //   //     lat: event.latLng.lat(),
  //   //     lng: event.latLng.lng(),
  //   //     isActive: true,
  //   //   };
  //   //   setMarkers([...markers, newMarker]);
  //   // };
  //   // const handleMapClick = (event) => {
  //   //   const clickedLat = event.latLng.lat();
  //   //   const clickedLng = event.latLng.lng();
  //   //   alert(`Latitude: ${clickedLat}, Longitude: ${clickedLng}`);
    
  //   //   const newMarker = {
  //   //     id: markers.length + 1,
  //   //     modelId: `new_marker_${markers.length + 1}`,
  //   //     lat: clickedLat,
  //   //     lng: clickedLng,
  //   //     isActive: true,
  //   //   };
  //   //   setMarkers([...markers, newMarker]);
  //   // };

    
  //   // const handleMapClick = (event) => {
  //   //   const clickedLat = event.latLng.lat();
  //   //   const clickedLng = event.latLng.lng();
  //   //   // alert(`Latitude: ${clickedLat}, Longitude: ${clickedLng}`);
    
  //   //   const newMarker = {
  //   //     id: markers.length + 1,
  //   //     modelId: `new_marker_${markers.length + 1}`,
  //   //     lat: clickedLat,
  //   //     lng: clickedLng,
  //   //     isActive: true,
  //   //   };
  //   //   // setMarkers([...markers, newMarker]);
  //   //   setMarkers( searches => [...searches, newMarker]);
     
  //   // };
  //   const handleMapClick = (event) => {
  //     const clickedLat = event.latLng.lat();
  //     const clickedLng = event.latLng.lng();
  //     // alert(`Latitude: ${clickedLat}, Longitude: ${clickedLng}`);
    
  //     const newMarker = {
  //       id: markers.length + 1,
  //       modelId: `new_marker_${markers.length + 1}`,
  //       lat: clickedLat,
  //       lng: clickedLng,
  //       isActive: true,
  //     };
  //     setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
  //   };
  //   console.log(markers)
  //   const renderMap = () => {
  //     return (
  //       <div style={{ width: "100%", height: "80vh" }}>
  //         <GoogleMap
  //           center={center}
  //           zoom={10}
  //           mapContainerStyle={{ width: "100%", height: "100%" }}
  //           onClick={handleMapClick} // Add onClick event to the map
  //         >
            
    
  //           {/* Render dynamically added markers */}
  //           {markers.map((marker) => (
  //             <Marker
  //               key={marker.id}
  //               position={{ lat: marker.lat, lng: marker.lng }}
  //               icon={dron_state_icon.red} // or specify a different icon URL
  //               // onClick={() => handleMarkerClick(marker)}
  //             />
  //           ))}
  //         </GoogleMap>
  //       </div>
  //     );
  //   };
    
  //   // const renderMap = () => {
  //   //   return (
  //   //     <div style={{ width: "100%", height: "80vh" }}>
  //   //       <GoogleMap
  //   //         center={center}
  //   //         zoom={10}
  //   //         mapContainerStyle={{ width: "100%", height: "100%" }}
  //   //         onClick={handleMapClick} // Add onClick event to the map
  //   //       >
  //   //         {/* Render existing markers */}
  //   //         {/* {map_data.map((data) => (
  //   //           <Marker
  //   //             key={data.id}
  //   //             position={{ lat: data.lat, lng: data.lng }}
  //   //             icon={data.isActive ? dron_state_icon.green : dron_state_icon.red}
  //   //             onClick={() => handleMarkerClick(data)}
  //   //           />
  //   //         ))} */}
  
  //   //         {/* Render dynamically added markers */}
  //   //         {markers.map((marker) => (
  //   //           <Marker
  //   //             key={marker.id}
  //   //             position={{ lat: marker.lat, lng: marker.lng }}
  //   //             icon={"https://img.icons8.com/color/48/marker--v1.png"}
  //   //             onClick={() => handleMarkerClick(marker)}
  //   //           />
  //   //         ))}
  //   //       </GoogleMap>
  //   //     </div>
  //   //   );
  //   // };
  
  //   const renderedMap = useMemo(() => {
  //     return isLoaded ? renderMap() : <div>Map loading...</div>;
  //   }, [isLoaded]);
  
  //   return renderedMap;
  // }
  

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

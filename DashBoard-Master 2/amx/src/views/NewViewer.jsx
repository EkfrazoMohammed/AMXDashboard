
import React, { useState,useEffect, useRef } from "react";

// reactstrap components
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";

// const ViewerWrapper = () => {
//   const mapRef = React.useRef(null);
//   React.useEffect(() => {
//     let google = window.google;
//     let map = mapRef.current;
//     let lat = "40.748817";
//     let lng = "-73.985428";
//     const myLatlng = new google.maps.LatLng(lat, lng);
//     const mapOptions = {
//       scrollwheel: false, //we disable de scroll over the map, it is a really annoing when you scroll through page
//       styles: [
//         {
//           elementType: "geometry",
//           stylers: [
//             {
//               color: "#1d2c4d"
//             }
//           ]
//         },
//         {
//           elementType: "labels.text.fill",
//           stylers: [
//             {
//               color: "#8ec3b9"
//             }
//           ]
//         },
//         {
//           elementType: "labels.text.stroke",
//           stylers: [
//             {
//               color: "#1a3646"
//             }
//           ]
//         },
//         {
//           featureType: "administrative.country",
//           elementType: "geometry.stroke",
//           stylers: [
//             {
//               color: "#4b6878"
//             }
//           ]
//         },
//         {
//           featureType: "administrative.land_parcel",
//           elementType: "labels.text.fill",
//           stylers: [
//             {
//               color: "#64779e"
//             }
//           ]
//         },
//         {
//           featureType: "administrative.province",
//           elementType: "geometry.stroke",
//           stylers: [
//             {
//               color: "#4b6878"
//             }
//           ]
//         },
//         {
//           featureType: "landscape.man_made",
//           elementType: "geometry.stroke",
//           stylers: [
//             {
//               color: "#334e87"
//             }
//           ]
//         },
//         {
//           featureType: "landscape.natural",
//           elementType: "geometry",
//           stylers: [
//             {
//               color: "#023e58"
//             }
//           ]
//         },
//         {
//           featureType: "poi",
//           elementType: "geometry",
//           stylers: [
//             {
//               color: "#283d6a"
//             }
//           ]
//         },
//         {
//           featureType: "poi",
//           elementType: "labels.text.fill",
//           stylers: [
//             {
//               color: "#6f9ba5"
//             }
//           ]
//         },
//         {
//           featureType: "poi",
//           elementType: "labels.text.stroke",
//           stylers: [
//             {
//               color: "#1d2c4d"
//             }
//           ]
//         },
//         {
//           featureType: "poi.park",
//           elementType: "geometry.fill",
//           stylers: [
//             {
//               color: "#023e58"
//             }
//           ]
//         },
//         {
//           featureType: "poi.park",
//           elementType: "labels.text.fill",
//           stylers: [
//             {
//               color: "#3C7680"
//             }
//           ]
//         },
//         {
//           featureType: "road",
//           elementType: "geometry",
//           stylers: [
//             {
//               color: "#304a7d"
//             }
//           ]
//         },
//         {
//           featureType: "road",
//           elementType: "labels.text.fill",
//           stylers: [
//             {
//               color: "#98a5be"
//             }
//           ]
//         },
//         {
//           featureType: "road",
//           elementType: "labels.text.stroke",
//           stylers: [
//             {
//               color: "#1d2c4d"
//             }
//           ]
//         },
//         {
//           featureType: "road.highway",
//           elementType: "geometry",
//           stylers: [
//             {
//               color: "#2c6675"
//             }
//           ]
//         },
//         {
//           featureType: "road.highway",
//           elementType: "geometry.fill",
//           stylers: [
//             {
//               color: "#9d2a80"
//             }
//           ]
//         },
//         {
//           featureType: "road.highway",
//           elementType: "geometry.stroke",
//           stylers: [
//             {
//               color: "#9d2a80"
//             }
//           ]
//         },
//         {
//           featureType: "road.highway",
//           elementType: "labels.text.fill",
//           stylers: [
//             {
//               color: "#b0d5ce"
//             }
//           ]
//         },
//         {
//           featureType: "road.highway",
//           elementType: "labels.text.stroke",
//           stylers: [
//             {
//               color: "#023e58"
//             }
//           ]
//         },
//         {
//           featureType: "transit",
//           elementType: "labels.text.fill",
//           stylers: [
//             {
//               color: "#98a5be"
//             }
//           ]
//         },
//         {
//           featureType: "transit",
//           elementType: "labels.text.stroke",
//           stylers: [
//             {
//               color: "#1d2c4d"
//             }
//           ]
//         },
//         {
//           featureType: "transit.line",
//           elementType: "geometry.fill",
//           stylers: [
//             {
//               color: "#283d6a"
//             }
//           ]
//         },
//         {
//           featureType: "transit.station",
//           elementType: "geometry",
//           stylers: [
//             {
//               color: "#3a4762"
//             }
//           ]
//         },
//         {
//           featureType: "water",
//           elementType: "geometry",
//           stylers: [
//             {
//               color: "#0e1626"
//             }
//           ]
//         },
//         {
//           featureType: "water",
//           elementType: "labels.text.fill",
//           stylers: [
//             {
//               color: "#4e6d70"
//             }
//           ]
//         }
//       ]
//     };

//     map = new google.maps.Map(map, mapOptions);

//     const marker = new google.maps.Marker({
//       position: myLatlng,
//       map: map,
//       animation: google.maps.Animation.DROP,
//       title: "BLK Design System PRO React!"
//     });

//     const contentString =
//       '<div className="info-window-content"><h2>BLK Dashboard React</h2>' +
//       "<p>A freebie Admin for ReactStrap, Bootstrap, React, and React Hooks.</p></div>";

//     const infowindow = new google.maps.InfoWindow({
//       content: contentString
//     });

//     google.maps.event.addListener(marker, "click", function () {
//       infowindow.open(map, marker);
//     });
//   }, []);
//   return <div ref={mapRef} />;
// };
import Frame from 'react-frame-component';
function NewViewer() {
   const myurl=process.env.PUBLIC_URL + '/NewViewer1.html';

  const [localStorageValue, setLocalStorageValue] = useState(null);
  // const jstree = localStorage.getItem("jstree");
  // console.log("jstree==>", jstree);
  // useEffect(() => {
  //   // Access the parent window's localStorage
  //   const parentLocalStorage = window.parent.localStorage;

  //   // Get the desired value from parentLocalStorage
  //   const valueFromParent = parentLocalStorage.getItem('jstree');

  //   // Update the state with the value from the parent window's localStorage
  //   setLocalStorageValue(valueFromParent);
  // }, []);

  const [jstreeData, setJstreeData] = useState(null);

  useEffect(() => {
    // Send a message to the parent window to request the 'jstree' data
    window.parent.postMessage('getJstreeData', 'https://3d.aivolved.in/');

    // Listen for messages from the parent window
    const receiveMessage = (event) => {
      if (event.origin === 'https://3d.aivolved.in/' && event.data.type === 'jstreeData') {
        // Access the 'jstree' data received from the parent window
        const receivedData = event.data.data;
        setJstreeData(receivedData);
      }
    };

    window.addEventListener('message', receiveMessage);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('message', receiveMessage);
    };
  }, []);
  console.log("jstree==>",jstreeData)
  return (
    <>
      <div className="content">
        {/* <Row> */}
        {/* <Col md="12"> */}
        <div
          id="map"
          className="map"
          style={{
            position: "relative",
            overflow: "hidden",
            width: "100%",
            height: "calc(88vh)",
          }}
        >
          {/* <iframe
                      style={{width:'100%', height:'100%'}}

                      src={'https://64.227.154.198'}
                      
                    ></iframe> */}
          {/* <iframe
            style={{ width: "100%", height: "100%" }}
            src={"https://3d.aivolved.in/"}
            id="iframeId"
          ></iframe> */}
    
          
          <iframe  
           style={{ width: "100%", height: "100%" ,border:"none",outline:"none"}}
           src={myurl}
            id="iframeId">
          </iframe>
          
        </div>
        {/* <Card className="card-plain">
              <CardHeader>Viewer</CardHeader>
              <CardBody>
                <div
                  id="map"
                  className="map"
                  style={{ position: "relative", overflow: "hidden" }}
                >
          
                  <iframe
                      width="100%"
                      height="100%"
                      src={'https://plasio.netlify.app/'}
                      
                    ></iframe>
                </div>
              </CardBody>
            </Card> */}
        {/* </Col> */}
        {/* </Row> */}
      </div>
    </>
  );
}

export default NewViewer;

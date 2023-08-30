import React, { useState, useEffect,useRef, useMemo } from "react";
import { Card, CardHeader, CardBody, Row, Col} from "reactstrap";
import { InputGroup, InputGroupAddon, Input } from "reactstrap";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";


import Frame from 'react-frame-component';
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  useLoadScript,
  Polygon,
  Autocomplete
} from "@react-google-maps/api";


import ModalParent from "./projects/ModalParent";
const libraries = ['places'];
function generateKML(polygonCoordinates) {
  // Create a KML string
  const kmlString = `<?xml version="1.0" encoding="UTF-8"?>
    <kml xmlns="http://www.opengis.net/kml/2.2">
      <Document>
        <Placemark>
          <Polygon>
            <outerBoundaryIs>
              <LinearRing>
                <coordinates>
                  ${polygonCoordinates
                    .map(({ lat, lng }) => `${lng},${lat},0`)
                    .join(" ")}
                </coordinates>
              </LinearRing>
            </outerBoundaryIs>
          </Polygon>
        </Placemark>
      </Document>
    </kml>`;

  return kmlString;
}

// function Example(args) {
//   const [modal, setModal] = useState(false);

//   const toggle = () => setModal(!modal);

//   return (
//     <div>
//       <Button color="danger" onClick={toggle}>
//         Click Me
//       </Button>
//       <Modal isOpen={modal} toggle={toggle} {...args}>
//         <ModalHeader toggle={toggle}>Modal title</ModalHeader>
//         <ModalBody>
//           Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
//           eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
//           minim veniam, quis nostrud exercitation ullamco laboris nisi ut
//           aliquip ex ea commodo consequat. Duis aute irure dolor in
//           reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
//           pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
//           culpa qui officia deserunt mollit anim id est laborum.
//         </ModalBody>
//         <ModalFooter>
//           <Button color="primary" onClick={toggle}>
//             Do Something
//           </Button>{' '}
//           <Button color="secondary" onClick={toggle}>
//             Cancel
//           </Button>
//         </ModalFooter>
//       </Modal>
//     </div>
//   );
// }

const DroneMap = () => {
  const [modal, setModal] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);
  const [closeAll, setCloseAll] = useState(false);

  const toggle = () => setModal(!modal);
  const toggleNested = () => {
    setNestedModal(!nestedModal);
    setCloseAll(false);
  };
  const toggleAll = () => {
    setNestedModal(!nestedModal);
    setCloseAll(true);
  };
  const mapRef = useRef(null);
  const autocompleteRef = useRef(null);

  const { isLoaded} = useLoadScript({
    googleMapsApiKey: "AIzaSyD-ww6ewKJkrhAZNRQRwITZRpSMnziHdc0", // Replace with your API key
    libraries,
  });

  const handlePlaceSelect = () => {
    const place = autocompleteRef.current.getPlace();

    // if (place.geometry && place.geometry.location) {
    //   const selectedLocation = {
    //     lat: place.geometry.location.lat(),
    //     lng: place.geometry.location.lng(),
    //   };

    //   // Do something with the selectedLocation (e.g., update the map's center)
    //   mapRef.current.panTo(selectedLocation);

    //   // Add a marker at the selected location
    //   const newMarker = {
    //     id: markers.length + 1,
    //     position: selectedLocation,
    //   };
    //   setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
    // }
    if (place.geometry && place.geometry.location) {
      const selectedLocation = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };

      // Update the map's center and set the zoom level to 15
      mapRef.current.panTo(selectedLocation);
      mapRef.current.setZoom(16);
  
  };
  };

  const [polygonCoordinates, setPolygonCoordinates] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [latestCoordinate, setLatestCoordinate] = useState(null);

  const handlePolygonClick = (event) => {
    const { latLng } = event;

    // Update polygon coordinates
    setPolygonCoordinates((prevCoordinates) => [
      ...prevCoordinates,
      {
        lat: latLng.lat(),
        lng: latLng.lng(),
      },
    ]);

    // Update latest coordinate
    setLatestCoordinate({
      lat: latLng.lat(),
      lng: latLng.lng(),
    });
  };

  const handleMapClick = (event) => {
    event.preventDefault();
    const { latLng } = event;

    // Create a new marker at the clicked location
    const newMarker = {
      id: markers.length + 1,
      position: latLng,
    };
    setMarkers((prevMarkers) => [...prevMarkers, newMarker]);

    // Update polygon coordinates with markers
    setPolygonCoordinates((prevCoordinates) => [
      ...prevCoordinates,
      {
        lat: latLng.lat(),
        lng: latLng.lng(),
      },
    ]);

    // Update latest coordinate
    setLatestCoordinate({
      lat: latLng.lat(),
      lng: latLng.lng(),
    });
  };
  const [showModal, setShowModal] = useState(false);
  const [kmlURL, setKmlURL] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  
    const toggleModal = () => {
      setModalOpen(!modalOpen);
    };

  const handleExportKML = () => {
    const kmlString = generateKML(polygonCoordinates);

    // Create a Blob from the KML string
    const kmlBlob = new Blob([kmlString], {
      type: "application/vnd.google-earth.kml+xml",
    });

    // Save the KML file
    const fileURL = URL.createObjectURL(kmlBlob);
    const link = document.createElement("a");
    link.href = fileURL;
    link.download = "polygon.kml";
    link.click();

    
    // setShowModal(true);
  };
  const handleCloseModal = () => {
    // Revoke the URL to release memory
    URL.revokeObjectURL(kmlURL);

    // Hide the modal
    setShowModal(false);
  };
  const renderMap = () => {
    const mapCenter = latestCoordinate || { lat: 12.979631 ,lng: 77.590687 };
const reloadPageButton=()=>{
  return window.location.reload();
}


  const toggle = () => setModal(!modal);
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div style={{display:'flex',gap:'1rem'}}>

           {/* Modal */}
      {/* <Modal isOpen={showModal} toggle={handleCloseModal}>
        <ModalHeader toggle={handleCloseModal}>KML File</ModalHeader>
        <ModalBody>
          <iframe src="https://fibregrid.amxdrones.com/amx/parentproject" width="100%" height="400"></iframe>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </ModalFooter>
      </Modal> */}
        <button
          type="button"
          onClick={handleExportKML}
          className="btn btn-primary"
        >
          Export KML
        </button>
        
        <div>
      
   
    </div>
       
        <button
          type="button"
          onClick={reloadPageButton}
          className="btn btn-primary"
        >
          Create New
        </button>
      
        <Autocomplete
        className="search-location"
        onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
        onPlaceChanged={handlePlaceSelect}
      >
       
        <Input
    bsSize="lg"
    type="search"
    placeholder="Search for a location" className="search-location-input"
  />
    
           
         {/* <Input
    bsSize="lg"
    type="search"
    placeholder="Search for a location" className="search-location-input"
  /> */}
        {/* <input type="text" /> */}
      </Autocomplete>
    
      </div>
        <GoogleMap
          center={mapCenter}
          zoom={12}
          onClick={handlePolygonClick}
          onMapClick={handleMapClick}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          draggable={false}
          onLoad={(map) => (mapRef.current = map)}
        >
          {/* Render the polygon */}
          {polygonCoordinates.length > 0 && (
            <>
              <Polygon
                paths={polygonCoordinates}
                strokeColor="#0000FF"
                strokeOpacity={0.8}
                strokeWeight={2}
                fillColor="#0000FF"
                fillOpacity={0.35}
              />
              {polygonCoordinates.map((coordinate, index) => (
                <Marker key={index} position={coordinate} />
              ))}
            </>
          )}

          {/* Render the markers */}
          {markers.map((marker) => (
            <Marker key={marker.id} position={marker.position} />
          ))}
        </GoogleMap>
      </div>
    );
  };

  return isLoaded ? renderMap() : <div>Loading map...</div>;
};

const NewMap = () => {


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
                  style={{ position: "relative" }}
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
};

export default NewMap;

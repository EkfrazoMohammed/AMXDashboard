import React, { useState, useEffect,useRef, useMemo } from "react";
import { Card, CardHeader, CardBody, Row, Col} from "reactstrap";
import { InputGroup, InputGroupAddon, Input } from "reactstrap";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import storage from "../../src/firebaseConfig.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import axios from "axios";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  useLoadScript,
  Polygon,
  Autocomplete
} from "@react-google-maps/api";
import { ElevationService } from "@react-google-maps/api";


import ModalParent from "./projects/ModalParent";
import ModalFolders from "./Home/ModalFolders";
const libraries = ['places','elevation'];
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

const DroneMap = () => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  
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

  // localStorage.setItem("mylatestCoordinate", JSON.stringify({ lat: 12.979631 ,lng: 77.590687 }));

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
  
    // Update latest coordinate using the callback form of setState
    setLatestCoordinate((prevLatestCoordinate) => {
      // Construct the new coordinate object
      const newCoordinate = {
        lat: latLng.lat(),
        lng: latLng.lng(),
      };
  
      // Save the new coordinate to local storage
      localStorage.setItem("mylatestCoordinate", JSON.stringify(newCoordinate));
  
      // Return the new coordinate to update latestCoordinate
      return newCoordinate;
    });
  };

  
//   const handlePolygonClick = (event) => {
//     const { latLng } = event;

//     // Update polygon coordinates
//     setPolygonCoordinates((prevCoordinates) => [
//       ...prevCoordinates,
//       {
//         lat: latLng.lat(),
//         lng: latLng.lng(),
//       },
//     ]);
// console.log(polygonCoordinates)
//     // Update latest coordinate
//     setLatestCoordinate({
//       lat: latLng.lat(),
//       lng: latLng.lng(),
//     });
//     console.log(latestCoordinate)
//     localStorage.setItem("mylatestCoordinate", JSON.stringify(latestCoordinate));
//   };

  const handleMapClick = (event) => {
    event.preventDefault();
    const { latLng } = event;

    // Create a new marker at the clicked location
    const newMarker = {
      id: markers.length + 1,
      position: latLng,
    };
    console.log(newMarker)
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

  // const handleMarkerClick = async (index) => {
  //   if (!isLoaded || loadError) {
  //     console.log("Google Maps API is not loaded or encountered an error.");
  //     return;
  //   }

  //   const marker = markers[index];
  //   const location = new window.google.maps.LatLng(marker.position.lat, marker.position.lng);

  //   const elevator = new window.google.maps.ElevationService();
  //   const request = {
  //     locations: [location],
  //   };

  //   elevator.getElevationForLocations(request, (results, status) => {
  //     if (status === window.google.maps.ElevationStatus.OK && results && results[0]) {
  //       const elevation = results[0].elevation;
  //       console.log(`Elevation at marker ${index}: ${elevation} meters`);
  //     } else {
  //       console.log("Elevation data not available.");
  //     }
  //   });
  // };
  
  

  // const handleMarkerClick = async (index) => {
  //   const marker = markers[index];
  //   console.log(marker)
  //   const elevationService = new window.google.maps.ElevationService();
  
  //   const location = new window.google.maps.LatLng(marker.position.lat, marker.position.lng);
  //   const request = {
  //     locations: [location],
  //   };
  // console.log(request)
  //   elevationService.getElevationForLocations(request, (results, status) => {
  //     if (status === "OK" && results && results[0]) {
  //       const elevation = results[0].elevation;
        
  //       console.log(`Elevation at marker ${index}: ${elevation} meters`);
  //     } else {
  //       console.log("Elevation data not available.");
  //     }
  //   });
  // };
  
  const [showModal, setShowModal] = useState(false);
  const [kmlURL, setKmlURL] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  
    const toggleModal = () => {
      setModalOpen(!modalOpen);
    };



  const handleExportKML = async () => {
    const kmlString = generateKML(polygonCoordinates);
  
    // Create a Blob from the KML string
    const kmlBlob = new Blob([kmlString], {
      type: "application/vnd.google-earth.kml+xml",
    });
  
    // Set the file name for the KML file
    const fileName = "polygon.kml";
  
    const kmlDataURL = URL.createObjectURL(kmlBlob);
    console.log(kmlDataURL)
    localStorage.setItem("new_kml_file", kmlDataURL);
    // Create a new File object from the Blob with the specified file name
    const kmlFile = new File([kmlBlob], fileName);
    console.log(kmlFile)

  };

  const icons_data={
    four:"https://aactxg.stripocdn.email/content/guids/CABINET_f37167ea2322984dfeb6a0a05e92d2480b49356b15fb055bb2ce2e84131a12e4/images/icons8fullstop30.png",
    three:"https://aactxg.stripocdn.email/content/guids/CABINET_f37167ea2322984dfeb6a0a05e92d2480b49356b15fb055bb2ce2e84131a12e4/images/rec.png",
    one:"https://aactxg.stripocdn.email/content/guids/CABINET_f37167ea2322984dfeb6a0a05e92d2480b49356b15fb055bb2ce2e84131a12e4/images/fullstop.png",
    two:"https://aactxg.stripocdn.email/content/guids/CABINET_f37167ea2322984dfeb6a0a05e92d2480b49356b15fb055bb2ce2e84131a12e4/images/newmoon.png",
  }

  const [selectedMarkerIndex, setSelectedMarkerIndex] = useState(null);

  const handleMarkerDragEnd = (event, index) => {
    const { latLng } = event;
    const newCoordinates = [...polygonCoordinates];
    newCoordinates[index] = {
      lat: latLng.lat(),
      lng: latLng.lng(),
    };
    setPolygonCoordinates(newCoordinates);
  };
  const handleDeleteMarker = (indexToDelete) => {
    const newMarkers = markers.filter((marker, index) => index !== indexToDelete);
    const newCoordinates = polygonCoordinates.filter(
      (coordinate, index) => index !== indexToDelete
    );
  
    setMarkers(newMarkers);
    setPolygonCoordinates(newCoordinates);
    setSelectedMarkerIndex(null); // Clear the selected marker index
  };
  
  const handleCloseModal = () => {
    // Revoke the URL to release memory
    URL.revokeObjectURL(kmlURL);

    // Hide the modal
    setShowModal(false);
  };
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  
  const handleSearch = () => {
    if (latitude && longitude) {
      const selectedLocation = {
        lat: parseFloat(latitude),
        lng: parseFloat(longitude),
      };
  
      // Update the map's center and set the zoom level
      mapRef.current.panTo(selectedLocation);
      mapRef.current.setZoom(16);
    } else {
      // Handle empty input error
      console.log("Please enter both latitude and longitude.");
    }
  };
  const [nestedModal, setNestedModal] = useState(false);
  const [closeAll, setCloseAll] = useState(false);


  const toggleNested = () => {
    setNestedModal(!nestedModal);
    setCloseAll(false);
  };
  
const storedCoordinate = localStorage.getItem("mylatestCoordinate");

// Calculate the center of the polygon coordinates
const calculatePolygonCenter = (coordinates) => {
  const storedCoordinate = localStorage.getItem("mylatestCoordinate");

  if (storedCoordinate) {
    return JSON.parse(storedCoordinate);
  }
  if (coordinates.length === 0) {
    // Default center when no coordinates are present
    return { lat: 12.979631, lng: 77.590687 };
  }

  const latSum = coordinates.reduce((sum, coord) => sum + coord.lat, 0);
  const lngSum = coordinates.reduce((sum, coord) => sum + coord.lng, 0);

  const centerLat = latSum / coordinates.length;
  const centerLng = lngSum / coordinates.length;

  const newCenters={ lat: centerLat, lng: centerLng };
  
  return newCenters;
};


  const renderMap = () => {
    // const mapCenter = latestCoordinate || { lat: 12.979631 ,lng: 77.590687 };
    // const mapCenter = calculatePolygonCenter(polygonCoordinates);
    // console.log(mapCenter)
  // Check if there's a latestCoordinate in local storage
  const mapCenter =calculatePolygonCenter(polygonCoordinates);

// const reloadPageButton=()=>{
//   localStorage.removeItem("folder_name")
//   window.location.reload();
// }
const reloadPageButton = () => {
  // Store the latestCoordinate in local storage
 

  // Remove other data from local storage if needed
  localStorage.removeItem("folder_name");

  // Reload the page
  window.location.reload();
}

  const toggle = () => setModal(!modal);
    return (
      <div style={{ width: "100%", height: "100%" }}>
      <div>
      
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Select Project</ModalHeader>
        <ModalBody>
         <ModalParent nestedToggle={toggleNested} /> 
     
     
          <Modal
            isOpen={nestedModal}
            toggle={toggleNested}
            // onClosed={closeAll ? toggle : undefined}
          >
            <ModalHeader>Nested Modal title</ModalHeader>
            <ModalBody>
              <ModalFolders />
</ModalBody>
         
          </Modal>
        </ModalBody>
      
      </Modal>
    </div>
        <div className="mission-first-line" style={{position: "relative",backgroundColor:"#f5f6fa"}}>

        <div className="mymapcolumns">
        <button
          type="button"
          onClick={() => {
            handleExportKML(); // Call the handleExportKML function
            toggle()
          }}
          className="btn btn-primary mymapbuttons"
        >
          Export KML
        </button>
       <button
          type="button"
          onClick={reloadPageButton}
          className="btn btn-primary mymapbuttons"
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
      <div className="mymapcolumns">
   <div
        className="search-location"
        onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
        onPlaceChanged={handlePlaceSelect}
      >
       
        <Input
    bsSize="lg"
    type="number"
    placeholder="Search Latitude" className="search-location-input"
    value={latitude}
      onChange={(e) => setLatitude(e.target.value)}
  />
      </div>
      <div
        className="search-location"
        onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
        onPlaceChanged={handlePlaceSelect}
      >
       
        <Input
    bsSize="lg"
    type="number"
    placeholder="Search Longitude" className="search-location-input"
    value={longitude}
      onChange={(e) => setLongitude(e.target.value)}
  />
      </div>

  <Button className="btn btn-primary mymapbuttons" color="primary" onClick={handleSearch}>
    Search Location
  </Button>
  </div>
      </div>
        <GoogleMap
          center={mapCenter}
          zoom={16}
          onClick={handlePolygonClick}
          onMapClick={handleMapClick}
          // mapContainerStyle={{ width: "100%", height: "90vh" }}
          mapContainerStyle={{ width: "100%", height: "calc(100vh - 80px)" }}
          draggable={false}
          onLoad={(map) => (mapRef.current = map)}
          options={mapOptions}
        >
         

{polygonCoordinates.length > 0 && (
  <>
    <Polygon
      paths={polygonCoordinates}
      strokeColor="#3ebfea"
      strokeOpacity={0.8}
      strokeWeight={2}
      fillColor="#3ebfea"
      fillOpacity={0.35}
    />
    {polygonCoordinates.map((coordinate, index) => (
      <Marker
        key={index}
        position={coordinate}
        icon={icons_data.two}
        draggable={true}
        
        // onClick={() => {
        //   // handleMarkerClick(index);
        //   handleDeleteMarker(index)}}

        onDragEnd={(event) => handleMarkerDragEnd(event, index)}
        onClick={() => setSelectedMarkerIndex(index)} // Set the selected marker index
      />
    ))}
    {selectedMarkerIndex !== null && (
      <Button
        className="btn btn-danger"
        onClick={() => handleDeleteMarker(selectedMarkerIndex)}
      >
        Delete Marker
      </Button>
    )}
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
  const mapOptions = {

    // Basic options
    mapTypeId: "hybrid",     // Set the map type (e.g., "roadmap", "terrain", "satellite", "hybrid")
    // zoomControl: true,          // Display zoom control
    streetViewControl: false,   // Display street view control

    fullscreenControl: false,

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
keyboardShortcuts: false,
  };
  return isLoaded ? renderMap() : <div>Loading map...</div>;
};

const LatestNewMap = () => {


  return (
    <>
      {/* <div className="content" style={{padding:"0 0px 10px 250px",zIndex:"2000 !important"}}> */}
    
      <div className="content mycustompadding">
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

export default LatestNewMap;

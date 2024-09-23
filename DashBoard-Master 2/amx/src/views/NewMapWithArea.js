import React, { useState, useEffect, useRef, useMemo } from "react";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import { InputGroup, InputGroupAddon, Input } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import storage from "../../src/firebaseConfig.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import axios from "axios";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  useLoadScript,
  InfoWindow,
  Polygon,
  Polyline,
  Autocomplete,
} from "@react-google-maps/api";
import { ElevationService } from "@react-google-maps/api";
import ModalParent from "./projects/ModalParent";
import ModalFolders from "./Home/ModalFolders";
const libraries = ["places", "elevation"];
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
  function toRadians(deg) {
    return deg * (Math.PI / 180);
}

 const DroneMap = () => {
    const [userCenter, setUserCenter] = useState({ lat: 12.979631, lng: 77.590687 });
    const [polygonCoordinates, setPolygonCoordinates] = useState([]);
    const [area, setArea] = useState(null);
    const [lengths, setLengths] = useState([]);
    console.table(lengths)
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const toggleAll = () => {
    setNestedModal(!nestedModal);
    setCloseAll(true);
  };
  const mapRef = useRef(null);
  const autocompleteRef = useRef(null);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyD-ww6ewKJkrhAZNRQRwITZRpSMnziHdc0", // Replace with your API key
    libraries,
  });

  const handlePlaceSelect = () => {
    const place = autocompleteRef.current.getPlace();
    if (place.geometry && place.geometry.location) {
      const selectedLocation = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      // Update the map's center and set the zoom level to 15
      mapRef.current.panTo(selectedLocation);
      mapRef.current.setZoom(16);
    }
  };
  const [markers, setMarkers] = useState([]);
  const [elevationData, setElevationData] = useState(null);
  console.log("land area=>",area)
  const fetchElevationData = (position) => {
    const elevationService = new window.google.maps.ElevationService();
    elevationService.getElevationForLocations(
      {
        locations: [position],
      },
      (results, status) => {
        if (status === "OK" && results[0]) {
          setElevationData(results[0].elevation);
          // console.log(results[0].elevation)
        } else {
          setElevationData(null);
          console.error("Error fetching elevation data:", status);
        }
      }
    );
  };
  function toRadians(deg) {
    return deg * (Math.PI / 180);
}
useEffect(() => {
    calculateArea(polygonCoordinates)
},[polygonCoordinates])
const calculateArea = (coords) => {
    const earthRadius = 6378137; // Earth's radius in meters (mean radius)
    let area = 0;
    let numCoords = coords.length;

    for (let i = 0; i < numCoords; i++) {
        let lat1 = toRadians(coords[i].lat);
        let lng1 = toRadians(coords[i].lng);
        let lat2 = toRadians(coords[(i + 1) % numCoords].lat);
        let lng2 = toRadians(coords[(i + 1) % numCoords].lng);

        // Calculate area using spherical excess formula
        area += (lng2 - lng1) * (2 + Math.sin(lat1) + Math.sin(lat2));
    }

    area = Math.abs(area * earthRadius * earthRadius / 2); // Area in square meters

    // Convert to acres and square feet
    const areaInAcres = area * 0.000247105; // Conversion factor
    const areaInSquareFeet = area * 10.7639; // Conversion factor

    setArea({
        acres: areaInAcres.toFixed(2),
        squareMeters: area.toFixed(2),
        squareFeet: areaInSquareFeet.toFixed(2),
    });

    return area;
};
const renderLengthLabels = () => {
    return polygonCoordinates.map((coordinate, index) => {
      if (index < polygonCoordinates.length - 1) {
        const midLat = (coordinate.lat + polygonCoordinates[index + 1].lat) / 2;
        const midLng = (coordinate.lng + polygonCoordinates[index + 1].lng) / 2;
        const length = lengths[index] ? lengths[index].toFixed(2) : 0;
        console.log(length)
        return (
          <Marker
            key={`length-${index}`}
            position={{ lat: midLat, lng: midLng }}
            // label={{
            //   text: `${length} km`,
            //   color: "black",
            //   fontWeight: "bold",
            // }}
            icon={{
              path: window.google.maps.SymbolPath.CIRCLE,
              scale: 0, // Hide the marker icon
            }}
          />
        );
      }
      return null;
    });
  };
  const handlePolygonClick = (event) => {
    const { latLng } = event;
    const newCoordinate = { lat: latLng.lat(), lng: latLng.lng() };

    setPolygonCoordinates((prevCoordinates) => {
      const updatedCoordinates = [...prevCoordinates, newCoordinate];
      return updatedCoordinates;
    });
  };
//   const handleMapClick = (event) => {
//     const { latLng } = event;
//     const newMarker = {
//       id: polygonCoordinates.length + 1,
//       position: latLng,
//     };
//     setPolygonCoordinates((prevCoordinates) => [...prevCoordinates, newMarker.position]);
//     calculateArea([...polygonCoordinates, newMarker.position]);
//   };

const calculateLength = (lat1, lng1, lat2, lng2) => {
    const earthRadius = 6378137;
    const dLat = toRadians(lat2 - lat1);
    const dLng = toRadians(lng2 - lng1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadius * c / 1000; // Convert to kilometers
  };

  function toRadians(deg) {
    return deg * (Math.PI / 180);
  }
const handleMapClick = (event) => {
    const { latLng } = event;
        const newMarker = {
      id: polygonCoordinates.length + 1,
      position: latLng,
    };
    const newCoordinate = { lat: latLng.lat(), lng: latLng.lng() };

    setPolygonCoordinates((prevCoordinates) => {
      const updatedCoordinates = [...prevCoordinates, newCoordinate];
      const newLengths = [];
      for (let i = 0; i < updatedCoordinates.length - 1; i++) {
        const length = calculateLength(
          updatedCoordinates[i].lat,
          updatedCoordinates[i].lng,
          updatedCoordinates[i + 1].lat,
          updatedCoordinates[i + 1].lng
        );
        newLengths.push(length);
      }

      // Add length for the closing segment
      if (updatedCoordinates.length > 1) {
        const closingLength = calculateLength(
          updatedCoordinates[0].lat,
          updatedCoordinates[0].lng,
          updatedCoordinates[updatedCoordinates.length - 1].lat,
          updatedCoordinates[updatedCoordinates.length - 1].lng
        );
        newLengths.push(closingLength);
      }

      setLengths(newLengths);
      setPolygonCoordinates((prevCoordinates) => [...prevCoordinates, newMarker.position]);
    calculateArea([...polygonCoordinates, newMarker.position]);
       
      return updatedCoordinates;
    });
  };

  const [showModal, setShowModal] = useState(false);
  const [kmlURL, setKmlURL] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleExportKML = async () => {
    // Check if polygonCoordinates is empty or has length less than 1
    if (!polygonCoordinates || polygonCoordinates.length < 1) {
      toast.warn("Click on map to add co-ordinates");
      return;
    }
    const kmlString = generateKML(polygonCoordinates);

    // Create a Blob from the KML string
    const kmlBlob = new Blob([kmlString], {
      type: "application/vnd.google-earth.kml+xml",
    });

    // Set the file name for the KML file
    const fileName = "polygon.kml";

    const kmlDataURL = URL.createObjectURL(kmlBlob);
    console.log(kmlDataURL);
    localStorage.setItem("new_kml_file", kmlDataURL);
    // Create a new File object from the Blob with the specified file name
    const kmlFile = new File([kmlBlob], fileName, {
      type: "application/vnd.google-earth.kml+xml",
    });
    toggle();
  };

  const icons_data = {
    four: "https://aactxg.stripocdn.email/content/guids/CABINET_f37167ea2322984dfeb6a0a05e92d2480b49356b15fb055bb2ce2e84131a12e4/images/icons8fullstop30.png",
    three:
      "https://aactxg.stripocdn.email/content/guids/CABINET_f37167ea2322984dfeb6a0a05e92d2480b49356b15fb055bb2ce2e84131a12e4/images/rec.png",
    one: "https://aactxg.stripocdn.email/content/guids/CABINET_f37167ea2322984dfeb6a0a05e92d2480b49356b15fb055bb2ce2e84131a12e4/images/fullstop.png",
    two: "https://aactxg.stripocdn.email/content/guids/CABINET_f37167ea2322984dfeb6a0a05e92d2480b49356b15fb055bb2ce2e84131a12e4/images/newmoon.png",
  };

  const [selectedMarkerIndex, setSelectedMarkerIndex] = useState(null);

  const handleMarkerDragEnd = (event, index) => {
    const { latLng } = event;
    const newCoordinates = [...polygonCoordinates];
    newCoordinates[index] = {
      lat: latLng.lat(),
      lng: latLng.lng(),
    };
    setPolygonCoordinates(newCoordinates);
    calculateArea(newCoordinates); 
  };
  const handleDeleteMarker = (indexToDelete) => {
    const newMarkers = markers.filter(
      (marker, index) => index !== indexToDelete
    );
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
    if (!latitude || !longitude) {
      toast.info("Enter Latitude & Longitude");
    }
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

  const renderMap = () => {
    const reloadPageButton = () => {
       localStorage.removeItem("folder_name");
 window.location.reload();
    };

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
        <div
          className="mission-first-line"
          style={{ position: "relative", backgroundColor: "#f5f6fa" }}
        >
          <div
            className="mymapcolumns"
            style={{
              border: "2px solid #fd6585",
              borderRadius: "4px",
              margin: "4px",
            }}
          >
            <ToastContainer />
            <button
              type="button"
              onClick={() => {
                handleExportKML();
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
              onLoad={(autocomplete) =>
                (autocompleteRef.current = autocomplete)
              }
              onPlaceChanged={handlePlaceSelect}
            >
              <Input
                bsSize="lg"
                type="search"
                placeholder="Search for a Location"
                className="search-location-input"
              />

            </Autocomplete>
          </div>
          <div
            className="mymapcolumns"
            style={{
              border: "2px solid #fd6585",
              borderRadius: "4px",
              margin: "4px",
            }}
          >
            <div
              className="search-location"
              onLoad={(autocomplete) =>
                (autocompleteRef.current = autocomplete)
              }
              onPlaceChanged={handlePlaceSelect}
            >
              <Input
                bsSize="lg"
                type="number"
                placeholder="Search Latitude"
                className="search-location-input"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
              />
            </div>
            <div
              className="search-location"
              onLoad={(autocomplete) =>
                (autocompleteRef.current = autocomplete)
              }
              onPlaceChanged={handlePlaceSelect}
            >
              <Input
                bsSize="lg"
                type="number"
                placeholder="Search Longitude"
                className="search-location-input"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
              />
            </div>

            <Button
              className="btn btn-primary mymapbuttons"
              color="primary"
              onClick={handleSearch}
            >
              Search Location
            </Button>
          </div>
        </div>
        {area && (
        <div>
          <p>Area: {JSON.stringify(area)}</p>
        </div>
      )}
        <GoogleMap
          // center={mapCenter}
          center={userCenter}
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
               <Polyline
              paths={polygonCoordinates}
              strokeColor="#3ebfea"
              strokeOpacity={0.8}
              strokeWeight={2}
            />
            {renderLengthLabels()}
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
                  onClick={() => {
                    setSelectedMarkerIndex(index);
                    fetchElevationData(coordinate);
                  }} // Set the selected marker index
                />
              ))}
             {area && (
        <div>
        <Button className="btn btn-primary">
                  Area: {area.acres} acres
                  </Button>
          
        </div>
      )}
              {elevationData !== null && (
                <div>
                  <Button className="btn btn-primary">
                    Elevation: {elevationData} meters
                  </Button>
                </div>
              )}
              {selectedMarkerIndex !== null && (
                <div>
                  <Button
                    className="btn btn-danger"
                    onClick={() => {
                      handleDeleteMarker(selectedMarkerIndex);
                      setElevationData(null);
                    }}
                  >
                    Delete Marker
                  </Button>
                </div>
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
    mapTypeId: "hybrid", // Set the map type (e.g., "roadmap", "terrain", "satellite", "hybrid")
    zoomControl: false, // Display zoom control
    streetViewControl: false, // Display street view control

    fullscreenControl: false,

    mapTypeControl: false, // Disable map type control

    // Display options
    backgroundColor: "#f2f2f2", // Background color of the map
    disableDefaultUI: false, // Disable default UI components (zoom, map type, etc.)
    draggable: true, // Make the map draggable
    scrollwheel: true, // Enable zoom via mouse scrollwheel
    disableDoubleClickZoom: false, // Disable zoom on double click

    // Interaction options
    gestureHandling: "auto", // Define how the map responds to user gestures ("cooperative", "greedy", "auto")
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
      <div className="content mycustompadding">
        <Row>
          <Col md="12">
            <Card className="card-plain">
              <CardBody>
                <div id="map" className="map" style={{ position: "relative" }}>
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

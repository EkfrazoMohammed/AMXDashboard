import React, { useState, useEffect, useMemo } from "react";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  useLoadScript,
  Polygon,
  Autocomplete
} from "@react-google-maps/api";
import {useRef } from 'react';


import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

const libraries = ['places'];

// const MapWithSearchBox = () => {
//   const mapRef = useRef(null);
//   const autocompleteRef = useRef(null);
//   const [searchQuery, setSearchQuery] = useState('');

//   const { isLoaded, loadError } = useLoadScript({
//     googleMapsApiKey: 'AIzaSyD-ww6ewKJkrhAZNRQRwITZRpSMnziHdc0',
//     libraries,
//   });

//   const handlePlaceSelect = async (address) => {
//     try {
//       const results = await geocodeByAddress(address);
//       const latLng = await getLatLng(results[0]);
//       mapRef.current.panTo(latLng);
//       setSearchQuery(address);
//     } catch (error) {
//       console.error('Error fetching geocode data:', error);
//     }
//   };

//   if (loadError) return <div>Error loading maps</div>;
//   if (!isLoaded) return <div>Loading maps</div>;

//   return (
//     <div style={{ width: '100%', height: '500px' }}>
//       <PlacesAutocomplete value={searchQuery} onChange={setSearchQuery} onSelect={handlePlaceSelect}>
//         {({ getInputProps, suggestions, getSuggestionItemProps }) => (
//           <div>
//             <input {...getInputProps({ placeholder: 'Search for a location' })} />
//             <div>
//               {suggestions.map((suggestion) => (
//                 <div key={suggestion.placeId} {...getSuggestionItemProps(suggestion)}>
//                   {suggestion.description}
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </PlacesAutocomplete>
//       <GoogleMap
//         mapContainerStyle={{ width: '100%', height: '100%' }}
//         center={{ lat: -33.8688, lng: 151.2195 }}
//         zoom={13}
//         onLoad={(map) => (mapRef.current = map)}
//       ></GoogleMap>
//     </div>
//   );
// };


const MapWithSearchBox = () => {
  const mapRef = useRef(null);
  const autocompleteRef = useRef(null);

  const { isLoaded, loadError } = useLoadScript({
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

      // Do something with the selectedLocation (e.g., update the map's center)
      mapRef.current.panTo(selectedLocation);
    }
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading maps</div>;

  return (
    <div style={{ width: "100%", height: "500px" }}>
      <Autocomplete
        onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
        onPlaceChanged={handlePlaceSelect}
      >
        <input type="text" placeholder="Search for a location" />
      </Autocomplete>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={{ lat: -33.8688, lng: 151.2195 }}
        zoom={13}
        onLoad={(map) => (mapRef.current = map)}
      >
        
      </GoogleMap>
    </div>
  );
};
const DroneMap = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyD-ww6ewKJkrhAZNRQRwITZRpSMnziHdc0",
  });
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
  };

  const renderMap = () => {
    const mapCenter = latestCoordinate || { lat: 12.772442, lng: 77.540643 };
const reloadPageButton=()=>{
  return window.location.reload();
}
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <button
          type="button"
          onClick={handleExportKML}
          className="btn btn-primary"
        >
          Export KML
        </button>
        <button
          type="button"
          onClick={reloadPageButton}
          className="btn btn-primary"
        >
          Create New
        </button>

        <GoogleMap
          center={mapCenter}
          zoom={11}
          onClick={handlePolygonClick}
          onMapClick={handleMapClick}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          draggable={false}
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
const MapWithSearch = () => {
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
                  {/* <DroneMap /> */}
                  <MapWithSearchBox />
                 
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default MapWithSearch;

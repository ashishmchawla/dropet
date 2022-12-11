import React, { useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  DistanceMatrixService,
} from "@react-google-maps/api";
import { RouteComponentProps } from "react-router";

const containerStyle = {
  width: "100%",
  height: "700px",
};

const center = {
  lat: 19.075983,
  lng: 72.877655,
};

interface Ownprops extends RouteComponentProps {}

interface ResultProps extends Ownprops {}

const Result: React.FC<ResultProps> = ({ location }) => {
  let [responseOutput, setResponseOutput] = useState("");

  const initMap = (map: any) => {
    const bounds = new google.maps.LatLngBounds();
    const markersArray = [] as any;
    // initialize services
    const geocoder = new google.maps.Geocoder();
    const service = new google.maps.DistanceMatrixService();
    // build request
    const origin1 = state.source;
    const destinationA = state.destination;
    const request = {
      origins: [origin1],
      destinations: [destinationA],
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC,
      avoidHighways: false,
      avoidTolls: false,
    };

    // get distance matrix response
    service.getDistanceMatrix(request).then((response) => {
      console.log(response);
      setResponseOutput(response.rows[0].elements[0].distance.text);
      console.log(response.rows[0].elements[0].distance.text);
      // show on map
      const originList = response.originAddresses;
      const destinationList = response.destinationAddresses;

      deleteMarkers(markersArray);

      const showGeocodedAddressOnMap = (asDestination: any) => {
        const handler = (response: any) => {
          let results = response.results;
          map.fitBounds(bounds.extend(results[0].geometry.location));
          markersArray.push(
            new google.maps.Marker({
              map,
              position: results[0].geometry.location,
              label: asDestination ? "D" : "O",
            })
          );
        };
        return handler;
      };

      for (let i = 0; i < originList.length; i++) {
        const results = response.rows[i].elements;

        geocoder
          .geocode({
            address: originList[i],
          })
          .then(showGeocodedAddressOnMap(false));

        for (let j = 0; j < results.length; j++) {
          geocoder
            .geocode({
              address: destinationList[j],
            })
            .then(showGeocodedAddressOnMap(true));
        }
      }
    });
  };
  const deleteMarkers = (markersArray: any) => {
    for (let i = 0; i < markersArray.length; i++) {
      markersArray[i].setMap(null);
    }

    markersArray = [];
  };

  let state = {} as any;
  if (location.state !== undefined) {
    state = location.state;
    console.log(state);
  }

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBV3lXvysIaB2NlYCp5Kf4jgWGkUwaV5wI",
  });

  const onLoad = React.useCallback(function callback(map: any) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
    initMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map: any) {
    setMap(null);
  }, []);

  const [map, setMap] = React.useState(null);
  return isLoaded ? (
    <div className="home">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {/* Child components, such as markers, info windows, etc. */}
        <></>
      </GoogleMap>
      <br />
      Origin: {state.source}
      <br />
      Destination: {state.destination}
      <br />
      Distance: {responseOutput}
    </div>
  ) : (
    <></>
  );
};

export default Result;

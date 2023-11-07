import Script from "next/script";
import { Unstable_Grid2 as Grid, Button } from "@mui/material";
import $ from "jquery";
import React, { useRef, useState } from "react";
// import { GoogleMap, Marker, useJsApiLoader, Polyline } from "@react-google-maps/api";
import { StaticTimePicker } from "@mui/x-date-pickers";
import runJQueryCode from "./playback-sandbox";
import Head from "next/head";
import { Map, GoogleApiWrapper, Polyline } from "google-maps-react";

const containerStyle = {
  width: "400px",
  height: "400px"
};

const Playback = props => {
  //   let state = {
  //       path: [
  //         { lat: 37.7749, lng: -122.4194 },
  //         { lat: 37.7895, lng: -122.4144 },
  //         { lat: 37.8075, lng: -122.4090 },
  //         { lat: 37.8199, lng: -122.4783 },
  //       ],
  //     };

  //   const { isLoaded } = useJsApiLoader({
  //       googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  //     });

  //     const [animation, setAnimation] = useState(null);

  //     useEffect(() => {
  //       if (isLoaded) {
  //         setAnimation(window.google.maps.Animation.BOUNCE);
  //       }
  //     }, [isLoaded]);

  //     if (!isLoaded) {
  //       return <div>Loading...</div>;
  //     }

  // return (
  //   <GoogleMap
  //       id="map"
  //       mapContainerStyle={containerStyle}
  //       zoom={12}
  //       center={state.path[0]}
  //     >
  //       <Polyline
  //       path={state.path}
  //       options={{
  //         strokeColor: '#FF0000',
  //         strokeOpacity: 1,
  //         strokeWeight: 2,
  //         editable: false,
  //         draggable: false,
  //         geodesic: true,
  //         animation: animation,
  //       }}
  //     />
  //     </GoogleMap>
  // );

  //     useEffect(() => {
  //       runJQueryCode();
  //     }, []);

  //   return (
  //     <div>
  //       <Head>
  //         {/* import external javascript */}
  //         <script
  //           async
  //           src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA2C2Pu928d5fXhDBBpozZY4ZKkWLbmrTY&callback=initMap"
  //         ></script>
  //         <script
  //           async
  //           src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
  //           integrity="sha256-k2WSCIexGzOj3Euiig+TlR8gA0EmPjuc79OEeY5L45g="
  //           crossorigin="anonymous"
  //         ></script>
  //         <script
  //           defer
  //           src="https://use.fontawesome.com/releases/v5.15.4/js/all.js"
  //           integrity="sha384-rOA1PnstxnOBLzCLMcre8ybwbTmemjzdNlILg8O7z1lUkLXozs4DHonlDtnE7fpc"
  //           crossorigin="anonymous"
  //         ></script>
  //       </Head>
  //       <div id="map"></div>
  //       {/* <Script async type="text/javascript" src="./playback-sandbox.js"></Script> */}
  //     </div>
  //   );

  const polylineRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const startAnimation = () => {
    if (polylineRef.current) {
      const polyline = polylineRef.current.getPath();
      let percent = 0;

      const animation = setInterval(() => {
        if (percent < 100) {
          percent += 10;
          polylineRef.current.setOptions({
            icons: [
              {
                icon: {
                  path: window.google.maps.SymbolPath.FORWARD_OPEN_ARROW,
                  scale: 4,
                  strokeWeight: 2
                },
                offset: `${percent}%`
              }
            ]
          });
        } else {
          clearInterval(animation);
          setIsPlaying(false);
        }
      }, 1000);
    }
  };

  const stopAnimation = () => {
    if (polylineRef.current) {
      polylineRef.current.setOptions({
        icons: []
      });
      setIsPlaying(false);
    }
  };

  return (
    <Grid container spacing={2}>
      <Map
        width={"400px"}
        height={"400px"}
        google={props.google}
        zoom={12} // Set the desired zoom level
        initialCenter={{ lat: 37.7749, lng: -122.4194 }} // Set the desired center coordinates
      >
        <Polyline
          ref={polylineRef}
          path={[
            { lat: 37.7749, lng: -122.4194 }, // Set the start coordinates of the polyline
            { lat: 37.8199, lng: -122.4783 } // Set the end coordinates of the polyline
          ]}
          options={{
            strokeColor: "red",
            strokeOpacity: 1,
            strokeWeight: 4
          }}
        />
      </Map>
      <Button onClick={isPlaying ? stopAnimation : startAnimation}>
        {isPlaying ? "Stop" : "Play"}
      </Button>
    </Grid>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY // Replace with your Google Maps API key
})(Playback);

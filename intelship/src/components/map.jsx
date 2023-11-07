import { useEffect, useState, React } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchVesselById } from "src/store/actionCreators/vesselAction";
import { useParams } from "react-router-dom";
import { Box, Container, Unstable_Grid2 as Grid } from "@mui/material";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import ClipLoader from "react-spinners/ClipLoader";

const markerIcon = new L.Icon({
  iconUrl: require("src/assets/images/icons8-sailing-ship-50.png"),
  iconSize: [35, 45],
  iconAnchor: [17, 46],
  popupAnchor: [3, -46]
});

export default function Map() {
  const params = useParams();
  const dispatch = useDispatch();
  const { vessel, isLoading } = useSelector(state => state.vesselReducer);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 8000);
  //   dispatch(fetchVesselById(1));
  // }, []);

  return (
    <Grid xs={12} lg={9}>
      {loading ? (
        <ClipLoader
          color={"#0000CD"}
          loading={loading}
          size={70}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <Grid className="mb-4 pt-4 pb-4 mx-2 shadow-lg" style={{ width: "68vw" }}>
          {vessel?.latitude && vessel?.longitude ? (
            <MapContainer
              center={[vessel?.latitude, vessel?.longitude]}
              zoom={10}
              style={{ width: "68vw", height: "75vh", border: "6px solid" }}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://maps.google.com/maps?q=indonesia&t=&z=5&ie=UTF8&iwloc=&output=embed">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[vessel?.latitude, vessel?.longitude]} icon={markerIcon}>
                <Popup>{[vessel?.name,' ', 'lat= ', vessel?.latitude,' ', 'long= ', vessel?.longitude]}</Popup>
              </Marker>
            </MapContainer>
          ) : (
            <MapContainer
              center={[0, 0]}
              zoom={10}
              style={{ width: "65vw", height: "75vh" }}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://maps.google.com/maps?q=indonesia&t=&z=5&ie=UTF8&iwloc=&output=embed">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[0, 0]} icon={markerIcon}>
                <Popup>
                  First Marker
                  {/* {vessel.DFM1} */}
                </Popup>
              </Marker>
            </MapContainer>
          )}
        </Grid>
      )}
    </Grid>
    // <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} style={{height: 400, width: "100%"}}>
    //   <TileLayer
    //     attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    //     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    //   />
    //   <Marker position={[51.505, -0.09]}>
    //     <Popup>
    //       A pretty CSS3 popup. <br /> Easily customizable.
    //     </Popup>
    //   </Marker>
    // </MapContainer>
    
  );
}

// import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
// import 'leaflet/dist/leaflet.css'
// import { styled } from '@mui/material/styles';

// const Map = () => {
//   return (
    // <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} style={{height: 400, width: "100%"}}>
    //   <TileLayer
    //     attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    //     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    //   />
    //   <Marker position={[51.505, -0.09]}>
    //     <Popup>
    //       A pretty CSS3 popup. <br /> Easily customizable.
    //     </Popup>
    //   </Marker>
    // </MapContainer>
//   )
// }

// export default Map

import Head from "next/head";
import { subDays, subHours } from "date-fns";
import { Box, Container, Unstable_Grid2 as Grid } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { OverviewBudget } from "src/sections/overview/overview-budget";
import { OverviewLatestOrders } from "src/sections/overview/overview-latest-orders";
import { OverviewLatestProducts } from "src/sections/overview/overview-latest-products";
// import { OverviewSales } from "src/sections/overview/overview-sales";
import { OverviewTasksProgress } from "src/sections/overview/overview-tasks-progress";
import { OverviewTotalCustomers } from "src/sections/overview/overview-total-customers";
import { OverviewTotalProfit } from "src/sections/overview/overview-total-profit";
import { OverviewTraffic } from "src/sections/overview/overview-traffic";
// import Speedo from "src/sections/overview/overview-speedometer";
// import OverviewTank from "src/sections/overview/overview-tank";
import LineChart from "src/pages/chart/lineChart";
import { useSelector, useDispatch } from "react-redux";
import { fetchVesselById } from "src/store/actionCreators/vesselAction";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Speedometer, {
  Background,
  Arc,
  Needle,
  Progress,
  Marks,
  Indicator
} from "react-speedometer";
import {
  Button,
  Card,
  Typography,
  CardActions,
  CardContent,
  CardHeader,
  Divider
} from "@mui/material";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "react-leaflet";
import ClipLoader from "react-spinners/ClipLoader";
import dynamic from "next/dynamic";
import { fetchVesselsInfo } from "src/store/actionCreators/vesselAction";
import Image from "next/image";
import Back from "../assets/images/back_kapal.png";
import Side from "../assets/images/side_kapal.png";
import Panahbawah from "../assets/images/panah_bawah.png";
import Panahatas from "../assets/images/panah_atas.png";
// import Thermometer from "react-thermometer-chart";

const now = new Date();

export const VesselMonitor = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { vessel, isLoading } = useSelector(state => state.vesselReducer);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");
  useEffect(() => {
    const pathSegments = window.location.pathname.split("/");
    const newId = pathSegments[2];
    // console.log(newId);
    setId(newId);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 8000);
    dispatch(fetchVesselById(newId));
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchVesselsInfo());
  }, [dispatch]);

  const fueltank1 = vessel?.fuelTank1;
  const fueltank2 = vessel?.fuelTank2;
  const fueltank3 = vessel?.fuelTank3;
  const fueltank4 = vessel?.fuelTank4;
  const fueltank5 = vessel?.fuelTank5;
  const fueltank6 = vessel?.fuelTank6;
  const fueltank7 = vessel?.fuelTank7;
  const fueltank8 = vessel?.fuelTank8;
  const list = vessel?.pitch;
  const trims = vessel?.roll;

  var direction;
  if (vessel.pitch < 0) {
    direction = Panahbawah;
  } else {
    direction = Panahatas;
  }

  var direction2;
  if (vessel.roll < 0) {
    direction2 = Panahbawah;
  } else {
    direction2 = Panahatas;
  }

  var today = new Date();
  today.setHours(6, 0, 0, 0);
  var yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  yesterday.setHours(6, 0, 0, 0);

  // var dataFiltered = vesselInfo.filter(function(item) {
  //   return item.createdAt >= yesterday && item.createdAt <= today;
  // });

  const Map = dynamic(
    () => import("../components/map"), // replace '@components/map' with your component's location
    {
      loading: () => (
        <ClipLoader
          color={"#0000CD"}
          loading={loading}
          size={70}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ),
      ssr: false // This line is important. It's what prevents server-side render
      // loading: () => null
    }
  );
  const SummaryVessel = dynamic(() =>
    import("../sections/overview/overview-latest-orders", {
      loading: () => null,
      ssr: false
    })
  );

  const tankHeight = 90; // Height of the tank in pixels
  const waterHeight1 = (fueltank1 / 300) * tankHeight; // Calculate the water height based on the level percentage
  const waterHeight2 = (fueltank2 / 300) * tankHeight;
  const waterHeight3 = (fueltank3 / 300) * tankHeight;
  const waterHeight4 = (fueltank4 / 300) * tankHeight;
  const waterHeight5 = (fueltank5 / 300) * tankHeight;
  const waterHeight6 = (fueltank6 / 300) * tankHeight;
  const waterHeight7 = (fueltank7 / 300) * tankHeight;
  const waterHeight8 = (fueltank8 / 300) * tankHeight;
  const waterPersen = Math.round((fueltank1 / 300) * 100);
  const waterPersen2 = Math.round((fueltank2 / 300) * 100);
  const waterPersen3 = Math.round((fueltank3 / 300) * 100);
  const waterPersen4 = Math.round((fueltank4 / 300) * 100);
  const waterPersen5 = Math.round((fueltank5 / 300) * 100);
  const waterPersen6 = Math.round((fueltank6 / 300) * 100);
  const waterPersen7 = Math.round((fueltank7 / 300) * 100);
  const waterPersen8 = Math.round((fueltank8 / 300) * 100);

  return (
    <>
      <Head>
        <title>Overview</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            <Grid xs={12} sm={6} lg={4}>
              {/* <OverviewBudget difference={12} positive sx={{ height: "100%" }} value="$24k" /> */}
              <Card style={{ width: "19rem" }}>
                {vessel?.DFM1 ? (
                  <Grid sm={6} lg={3} style={{ border: "0px solid", display: "inline-table" }}>
                    {/* <ReactSpeedometer maxValue={100} maxSegmentLabels={10} segments={5555} textColor="#bf616a" startColor={'#FF0000'} endColor={'#FF0000'} value={vessel.DFM1} /> */}
                    <div
                      className="shadow-lg"
                      style={{ border: "8px solid", borderRadius: "50%", borderColor: "black" }}
                    >
                      <div
                        className="shadow-lg"
                        style={{ border: "8px solid", borderRadius: "50%", borderColor: "gray" }}
                      >
                        <Speedometer
                          value={vessel.DFM1}
                          fontFamily="squada-one"
                          min={0}
                          max={100}
                          accentColor={"black"}
                        >
                          <Background color={"#000000"} opacity={1} />
                          <Arc />
                          <Needle
                            color={"red"}
                            circleColor={"#696969"}
                            circleRadius={20}
                            baseWidth={6}
                            baseOffset={-20}
                          />
                          <Progress color={"black"} />
                          <Marks step={5} lineCap={"butt"} lineColor={"#FFEBCD"} lineSize={15} />
                          <Indicator fontSize={30} suffix={"km/h"} color={"#FFEBCD"} />
                        </Speedometer>
                      </div>
                    </div>
                  </Grid>
                ) : (
                  <Grid
                    sm={6}
                    lg={3}
                    className="mb-4 pt-4 mx-2"
                    style={{ border: "0px solid", display: "inline-table" }}
                  >
                    {/* <ReactSpeedometer maxValue={100} maxSegmentLabels={10} segments={5555} textColor="#bf616a" startColor={'#FF0000'} endColor={'#FF0000'} value={0} /> */}
                    <div
                      className="shadow-lg"
                      style={{ border: "8px solid", borderRadius: "50%", borderColor: "black" }}
                    >
                      <div
                        className="shadow-lg"
                        style={{ border: "8px solid", borderRadius: "50%", borderColor: "gray" }}
                      >
                        <Speedometer
                          value={0}
                          fontFamily="squada-one"
                          min={0}
                          max={100}
                          accentColor={"black"}
                        >
                          <Background color={"#000000"} opacity={1} />
                          <Arc />
                          <Needle
                            color={"red"}
                            circleColor={"#696969"}
                            circleRadius={20}
                            baseWidth={6}
                            baseOffset={-20}
                          />
                          <Progress color={"black"} />
                          <Marks step={5} lineCap={"butt"} lineColor={"#FFEBCD"} lineSize={15} />
                          <Indicator fontSize={30} suffix={"km/h"} color={"#FFEBCD"} />
                        </Speedometer>
                      </div>
                    </div>
                  </Grid>
                )}
                <CardActions sx={{ justifyContent: "center" }}>
                  <Divider />
                  <div className="text-medium-emphasis text-center">DFM Left (Liter/Hour)</div>
                </CardActions>
              </Card>
            </Grid>
            <Grid xs={12} sm={6} lg={4}>
              {/* <OverviewBudget difference={12} positive sx={{ height: "100%" }} value="$24k" /> */}
              <Card style={{ width: "19rem" }}>
                {vessel?.DFM2 ? (
                  <Grid sm={6} lg={3} style={{ border: "0px solid", display: "inline-table" }}>
                    {/* <ReactSpeedometer maxValue={100} maxSegmentLabels={10} segments={5555} textColor="#bf616a" startColor={'#FF0000'} endColor={'#FF0000'} value={vessel.DFM1} /> */}
                    <div
                      className="shadow-lg"
                      style={{ border: "8px solid", borderRadius: "50%", borderColor: "black" }}
                    >
                      <div
                        className="shadow-lg"
                        style={{ border: "8px solid", borderRadius: "50%", borderColor: "gray" }}
                      >
                        <Speedometer
                          value={vessel.DFM2}
                          fontFamily="squada-one"
                          min={0}
                          max={100}
                          accentColor={"black"}
                        >
                          <Background color={"#000000"} opacity={1} />
                          <Arc />
                          <Needle
                            color={"red"}
                            circleColor={"#696969"}
                            circleRadius={20}
                            baseWidth={6}
                            baseOffset={-20}
                          />
                          <Progress color={"black"} />
                          <Marks step={5} lineCap={"butt"} lineColor={"#FFEBCD"} lineSize={15} />
                          <Indicator fontSize={30} suffix={"km/h"} color={"#FFEBCD"} />
                        </Speedometer>
                      </div>
                    </div>
                  </Grid>
                ) : (
                  <Grid
                    sm={6}
                    lg={3}
                    className="mb-4 pt-4 mx-2"
                    style={{ border: "0px solid", display: "inline-table" }}
                  >
                    {/* <ReactSpeedometer maxValue={100} maxSegmentLabels={10} segments={5555} textColor="#bf616a" startColor={'#FF0000'} endColor={'#FF0000'} value={0} /> */}
                    <div
                      className="shadow-lg"
                      style={{ border: "8px solid", borderRadius: "50%", borderColor: "black" }}
                    >
                      <div
                        className="shadow-lg"
                        style={{ border: "8px solid", borderRadius: "50%", borderColor: "gray" }}
                      >
                        <Speedometer
                          value={0}
                          fontFamily="squada-one"
                          min={0}
                          max={100}
                          accentColor={"black"}
                        >
                          <Background color={"#000000"} opacity={1} />
                          <Arc />
                          <Needle
                            color={"red"}
                            circleColor={"#696969"}
                            circleRadius={20}
                            baseWidth={6}
                            baseOffset={-20}
                          />
                          <Progress color={"black"} />
                          <Marks step={5} lineCap={"butt"} lineColor={"#FFEBCD"} lineSize={15} />
                          <Indicator fontSize={30} suffix={"km/h"} color={"#FFEBCD"} />
                        </Speedometer>
                      </div>
                    </div>
                  </Grid>
                )}
                <CardActions sx={{ justifyContent: "center" }}>
                  <Divider />
                  <div className="text-medium-emphasis text-center">DFM Right (Liter/Hour)</div>
                </CardActions>
              </Card>
            </Grid>
            <Grid xs={12} sm={6} lg={4}>
              {/* <OverviewBudget difference={12} positive sx={{ height: "100%" }} value="$24k" /> */}
              <Card style={{ width: "19rem" }}>
                {vessel?.speed ? (
                  <Grid sm={6} lg={3} style={{ border: "0px solid", display: "inline-table" }}>
                    {/* <ReactSpeedometer maxValue={100} maxSegmentLabels={10} segments={5555} textColor="#bf616a" startColor={'#FF0000'} endColor={'#FF0000'} value={vessel.DFM1} /> */}
                    <div
                      className="shadow-lg"
                      style={{ border: "8px solid", borderRadius: "50%", borderColor: "black" }}
                    >
                      <div
                        className="shadow-lg"
                        style={{ border: "8px solid", borderRadius: "50%", borderColor: "gray" }}
                      >
                        <Speedometer
                          value={vessel.speed}
                          fontFamily="squada-one"
                          min={0}
                          max={8}
                          accentColor={"black"}
                        >
                          <Background color={"#000000"} opacity={1} />
                          <Arc />
                          <Needle
                            color={"red"}
                            circleColor={"#696969"}
                            circleRadius={20}
                            baseWidth={6}
                            baseOffset={-20}
                          />
                          <Progress color={"black"} />
                          <Marks step={0.4} lineCap={"butt"} lineColor={"#FFEBCD"} lineSize={15} />
                          <Indicator fontSize={30} suffix={"km/h"} color={"#FFEBCD"} />
                        </Speedometer>
                      </div>
                    </div>
                  </Grid>
                ) : (
                  <Grid
                    sm={6}
                    lg={3}
                    className="mb-4 pt-4 mx-2"
                    style={{ border: "0px solid", display: "inline-table" }}
                  >
                    {/* <ReactSpeedometer maxValue={100} maxSegmentLabels={10} segments={5555} textColor="#bf616a" startColor={'#FF0000'} endColor={'#FF0000'} value={0} /> */}
                    <div
                      className="shadow-lg"
                      style={{ border: "8px solid", borderRadius: "50%", borderColor: "black" }}
                    >
                      <div
                        className="shadow-lg"
                        style={{ border: "8px solid", borderRadius: "50%", borderColor: "gray" }}
                      >
                        <Speedometer
                          value={0}
                          fontFamily="squada-one"
                          min={0}
                          max={8}
                          accentColor={"black"}
                        >
                          <Background color={"#000000"} opacity={1} />
                          <Arc />
                          <Needle
                            color={"red"}
                            circleColor={"#696969"}
                            circleRadius={20}
                            baseWidth={6}
                            baseOffset={-20}
                          />
                          <Progress color={"black"} />
                          <Marks step={0.4} lineCap={"butt"} lineColor={"#FFEBCD"} lineSize={15} />
                          <Indicator fontSize={30} suffix={"km/h"} color={"#FFEBCD"} />
                        </Speedometer>
                      </div>
                    </div>
                  </Grid>
                )}
                <CardActions sx={{ justifyContent: "center" }}>
                  <Divider />
                  <div className="text-medium-emphasis text-center">Speed (Knot)</div>
                </CardActions>
              </Card>
            </Grid>
            <Grid xs={12} sm={6} lg={4}>
              {/* <OverviewBudget difference={12} positive sx={{ height: "100%" }} value="$24k" /> */}
              <Card style={{ width: "19rem" }}>
                {vessel?.RPM1 ? (
                  <Grid sm={6} lg={3} style={{ border: "0px solid", display: "inline-table" }}>
                    {/* <ReactSpeedometer maxValue={100} maxSegmentLabels={10} segments={5555} textColor="#bf616a" startColor={'#FF0000'} endColor={'#FF0000'} value={vessel.DFM1} /> */}
                    <div
                      className="shadow-lg"
                      style={{ border: "8px solid", borderRadius: "50%", borderColor: "black" }}
                    >
                      <div
                        className="shadow-lg"
                        style={{ border: "8px solid", borderRadius: "50%", borderColor: "gray" }}
                      >
                        <Speedometer
                          value={vessel.RPM1}
                          fontFamily="squada-one"
                          min={0}
                          max={2000}
                          accentColor={"black"}
                          style={{ border: "20px solid" }}
                        >
                          <Background color={"#000000"} opacity={1} />
                          <Arc />
                          <Needle
                            color={"red"}
                            circleColor={"#696969"}
                            circleRadius={20}
                            baseWidth={6}
                            baseOffset={-20}
                          />
                          <Progress color={"black"} />
                          <Marks step={100} lineCap={"butt"} lineColor={"#FFEBCD"} lineSize={15} />
                          <Indicator fontSize={30} suffix={"km/h"} color={"#FFEBCD"} />
                        </Speedometer>
                      </div>
                    </div>
                  </Grid>
                ) : (
                  <Grid
                    sm={6}
                    lg={3}
                    className="mb-4 pt-4 mx-2"
                    style={{ border: "0px solid", display: "inline-table" }}
                  >
                    {/* <ReactSpeedometer maxValue={100} maxSegmentLabels={10} segments={5555} textColor="#bf616a" startColor={'#FF0000'} endColor={'#FF0000'} value={0} /> */}
                    <div
                      className="shadow-lg"
                      style={{ border: "8px solid", borderRadius: "50%", borderColor: "black" }}
                    >
                      <div
                        className="shadow-lg"
                        style={{ border: "8px solid", borderRadius: "50%", borderColor: "gray" }}
                      >
                        <Speedometer
                          value={0}
                          fontFamily="squada-one"
                          min={0}
                          max={2000}
                          accentColor={"black"}
                        >
                          <Background color={"#000000"} opacity={1} />
                          <Arc />
                          <Needle
                            color={"red"}
                            circleColor={"#696969"}
                            circleRadius={20}
                            baseWidth={6}
                            baseOffset={-20}
                          />
                          <Progress color={"black"} />
                          <Marks step={100} lineCap={"butt"} lineColor={"#FFEBCD"} lineSize={15} />
                          <Indicator fontSize={30} suffix={"km/h"} color={"#FFEBCD"} />
                        </Speedometer>
                      </div>
                    </div>
                  </Grid>
                )}
                <CardActions sx={{ justifyContent: "center" }}>
                  <Divider />
                  <div className="text-medium-emphasis text-center">RPM Left</div>
                </CardActions>
              </Card>
            </Grid>
            <Grid xs={12} sm={6} lg={4}>
              {/* <OverviewBudget difference={12} positive sx={{ height: "100%" }} value="$24k" /> */}
              <Card style={{ width: "19rem" }}>
                {vessel?.RPM2 ? (
                  <Grid sm={6} lg={3} style={{ border: "0px solid", display: "inline-table" }}>
                    {/* <ReactSpeedometer maxValue={100} maxSegmentLabels={10} segments={5555} textColor="#bf616a" startColor={'#FF0000'} endColor={'#FF0000'} value={vessel.DFM1} /> */}
                    <div
                      className="shadow-lg"
                      style={{ border: "8px solid", borderRadius: "50%", borderColor: "black" }}
                    >
                      <div
                        className="shadow-lg"
                        style={{ border: "8px solid", borderRadius: "50%", borderColor: "gray" }}
                      >
                        <Speedometer
                          value={vessel.RPM2}
                          fontFamily="squada-one"
                          min={0}
                          max={2000}
                          accentColor={"black"}
                          className="border-solid"
                        >
                          <Background color={"#000000"} opacity={1} />
                          <Arc />
                          <Needle
                            color={"red"}
                            circleColor={"#696969"}
                            circleRadius={20}
                            baseWidth={6}
                            baseOffset={-20}
                          />
                          <Progress color={"black"} />
                          <Marks step={100} lineCap={"butt"} lineColor={"#FFEBCD"} lineSize={15} />
                          <Indicator fontSize={30} suffix={"km/h"} color={"#FFEBCD"} />
                        </Speedometer>
                      </div>
                    </div>
                  </Grid>
                ) : (
                  <Grid
                    sm={6}
                    lg={3}
                    className="mb-4 pt-4 mx-2"
                    style={{ border: "0px solid", display: "inline-table" }}
                  >
                    {/* <ReactSpeedometer maxValue={100} maxSegmentLabels={10} segments={5555} textColor="#bf616a" startColor={'#FF0000'} endColor={'#FF0000'} value={0} /> */}
                    <div
                      className="shadow-lg"
                      style={{ border: "8px solid", borderRadius: "50%", borderColor: "black" }}
                    >
                      <div
                        className="shadow-lg"
                        style={{ border: "8px solid", borderRadius: "50%", borderColor: "gray" }}
                      >
                        <Speedometer
                          value={0}
                          fontFamily="squada-one"
                          min={0}
                          max={2000}
                          accentColor={"black"}
                        >
                          <Background color={"#000000"} opacity={1} />
                          <Arc />
                          <Needle
                            color={"red"}
                            circleColor={"#696969"}
                            circleRadius={20}
                            baseWidth={6}
                            baseOffset={-20}
                          />
                          <Progress color={"black"} />
                          <Marks step={100} lineCap={"butt"} lineColor={"#FFEBCD"} lineSize={15} />
                          <Indicator fontSize={30} suffix={"km/h"} color={"#FFEBCD"} />
                        </Speedometer>
                      </div>
                    </div>
                  </Grid>
                )}
                <CardActions sx={{ justifyContent: "center" }}>
                  <Divider />
                  <div className="text-medium-emphasis text-center">RPM Right</div>
                </CardActions>
              </Card>
            </Grid>
            <div className="water-tank">
              <div className="water" style={{ height: waterHeight1 }}></div>
              <div className="tank">{waterPersen}%</div>
            </div>
            <div className="water-tank">
              <div className="water2" style={{ height: waterHeight2 }}></div>
              <div className="tank">{waterPersen2}%</div>
            </div>
            <div className="water-tank">
              <div className="water3" style={{ height: waterHeight3 }}></div>
              <div className="tank">{waterPersen3}%</div>
            </div>
            <div className="water-tank">
              <div className="water4" style={{ height: waterHeight4 }}></div>
              <div className="tank">{waterPersen4}%</div>
            </div>
            <div className="water-tank">
              <div className="water5" style={{ height: waterHeight5 }}></div>
              <div className="tank">{waterPersen5}%</div>
            </div>
            <div className="water-tank">
              <div className="water6" style={{ height: waterHeight6 }}></div>
              <div className="tank">{waterPersen6}%</div>
            </div>
            <div className="water-tank">
              <div className="water7" style={{ height: waterHeight7 }}></div>
              <div className="tank">{waterPersen7}%</div>
            </div>
            <div className="water-tank">
              <div className="water8" style={{ height: waterHeight8 }}></div>
              <div className="tank">{waterPersen8}%</div>
            </div>
            <Grid xs={12} sm={6} lg={4}>
              <Card style={{ width: "19rem" }}>
                <div className="langit">
                  <center>
                    <Image src={direction} />
                    <Image
                      src={Back}
                      height={170}
                      width={170}
                      style={{ transform: `rotate(${list}deg)` }}
                    />
                  </center>
                  <div className="water10">
                    <CardActions sx={{ justifyContent: "center" }}>
                      <Divider />
                      <div className="text-card">List {list}°</div>
                    </CardActions>
                  </div>
                </div>
              </Card>
            </Grid>
            <Grid xs={12} sm={6} lg={4}>
              <Card style={{ width: "19rem" }}>
                <div className="langit">
                  <center>
                    <Image src={direction2} />
                    <Image
                      src={Side}
                      height={170}
                      width={170}
                      style={{ transform: `rotate(${trims}deg)` }}
                    />
                  </center>
                  <div className="water10">
                    <CardActions sx={{ justifyContent: "center" }}>
                      <Divider />
                      <div className="text-card">Trims {trims}°</div>
                    </CardActions>
                  </div>
                </div>
              </Card>
            </Grid>
            {/* <Grid xs={12} lg={12}>
              <Speedo />
              </Grid> */}
            {/* <OverviewSales
                chartSeries={[
                  {
                    name: "Volume",
                    data: [
                      fueltank1,
                      fueltank2,
                      fueltank3,
                      fueltank4,
                      fueltank5,
                      fueltank6,
                      fueltank7,
                      fueltank8
                    ]
                  }
                ]}
                sx={{ height: "100%" }}
              /> */}

            {/* <Grid xs={12} lg={12}>
              <OverviewTank />
            </Grid> */}
            {/* <Grid xs={12} md={6} lg={4}>
              <OverviewTraffic
                chartSeries={[63, 15, 22]}
                labels={["Desktop", "Tablet", "Phone"]}
                sx={{ height: "100%" }}
              />
            </Grid>
            <Grid xs={12} md={6} lg={4}>
              <OverviewLatestProducts
                products={[
                  {
                    id: "5ece2c077e39da27658aa8a9",
                    image: "/assets/products/product-1.png",
                    name: "Healthcare Erbology",
                    updatedAt: subHours(now, 6).getTime()
                  },
                  {
                    id: "5ece2c0d16f70bff2cf86cd8",
                    image: "/assets/products/product-2.png",
                    name: "Makeup Lancome Rouge",
                    updatedAt: subDays(subHours(now, 8), 2).getTime()
                  },
                  {
                    id: "b393ce1b09c1254c3a92c827",
                    image: "/assets/products/product-5.png",
                    name: "Skincare Soja CO",
                    updatedAt: subDays(subHours(now, 1), 1).getTime()
                  },
                  {
                    id: "a6ede15670da63f49f752c89",
                    image: "/assets/products/product-6.png",
                    name: "Makeup Lipstick",
                    updatedAt: subDays(subHours(now, 3), 3).getTime()
                  },
                  {
                    id: "bcad5524fe3a2f8f8620ceda",
                    image: "/assets/products/product-7.png",
                    name: "Healthcare Ritual",
                    updatedAt: subDays(subHours(now, 5), 6).getTime()
                  }
                ]}
                sx={{ height: "100%" }}
              />
            </Grid> */}
            <Map />
            {/* <Thermometer width="100px" height="250px" steps={5} minValue={0} maxValue={100}/> */}
            <Grid xs={12} md={12} lg={12}>
              <SummaryVessel />
            </Grid>
            <LineChart />
          </Grid>
        </Container>
      </Box>
    </>
  );
}

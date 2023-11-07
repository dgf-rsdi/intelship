import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  ListItem,
  List,
  Unstable_Grid2 as Grid,
  Box,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import ArrowRightIcon from "@heroicons/react/24/solid/ArrowRightIcon";
import { fetchVesselById, fetchVessels } from "src/store/actionCreators/vesselAction";
import { SeverityPill } from "src/components/severity-pill";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import Speedometer, {
  Background,
  Arc,
  Needle,
  Progress,
  Marks,
  Indicator
} from "react-speedometer";

export const DfmLeft = () => {
  const dispatch = useDispatch();
  const { vessel, isLoading, vesselDetail } = useSelector(state => state.vesselReducer);
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
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 8000);
    dispatch(fetchVessels());
  }, [dispatch]);

  const statusMap = {
    1: "success",
    0: "error"
  };

  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
  // var today = new Date();
  // var dd = String(today.getDate()).padStart(2, "0");
  // var mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
  // var yyyy = today.getFullYear();
  // var currentDate = dd + '/' + mm + '/' + yyyy + '-';

  // Mengambil tanggal saat ini
  var today = new Date();

  var labels = [];
  for (var i = 0; i < 10; i++) {
    var time = new Date(today.getTime() - i * 2 * 60 * 60 * 1000);
    var hours = String(time.getHours()).padStart(2, "0");
    var minutes = String(time.getMinutes()).padStart(2, "0");
    const date = String(time.getDate()).padStart(2, "0");
    const month = String(time.getMonth() + 1).padStart(2, "0");
    var label = `${date}/${month} ${hours}:${minutes}`;
    labels.unshift(label);
  }

  const data = {
    labels: vesselDetail.map((vessel) => vessel.createdAt.split("T")[0]).slice(-10),
    datasets: [
      {
        label: "DFM Kiri",
        data: vesselDetail.map((vessel) => vessel.DFM1).slice(-10),
        fill: false,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)"
      }
    ]
  };

  var tanggal = vessel?.createdAt;
  return (
    <Grid container spacing={2}>
      <Stack sx={{ px: 2 }}>
        <Card sx={{ maxWidth: 450 }}>
          <CardHeader title="DFM Mesin Kiri" />
          <Divider />
          <Typography variant="p" sx={{ px: 2, color: "orangered" }}>
            DFM Mesin Kiri Kapal, {tanggal?.split("T")[0]}
          </Typography>
          <Grid xs={12} sm={6} lg={4}>
              <Card style={{ width: "19rem" }}>
                {vessel?.DFM1 ? (
                  <Grid sm={6} lg={3} style={{ border: "0px solid", display: "inline-table" }}>
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
          <Typography variant="p" sx={{ px: 2, color: "orangered" }}>
          Histori DFM Mesin Kiri
          </Typography>
          <Box sx={{ minWidth: 500, maxWeight: "500px" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sortDirection="desc">Tanggal</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>DFM</TableCell>
                  <TableCell>Liter/Jam</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {vesselDetail.map(vessel => {
                  return (
                    <TableRow hover key={vessel.id}>
                      <TableCell>{vessel.createdAt.split("T")[0]}</TableCell>
                      <TableCell>
                      <SeverityPill color={statusMap[vessel.statusPower]}>{vessel.statusPower}</SeverityPill>
                      </TableCell>
                      <TableCell>{vessel.DFM1}</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Box>
          <Divider />
          <CardActions sx={{ justifyContent: "flex-end" }}>
            <Button
              color="inherit"
              endIcon={
                <SvgIcon fontSize="small">
                  <ArrowRightIcon />
                </SvgIcon>
              }
              size="small"
              variant="text"
            >
              View all
            </Button>
          </CardActions>
          <Divider />
        </Card>
      </Stack>
      <Stack sx={{ px: 2 }}>
        <Card sx={{ maxWidth: 450 }}>
          <CardHeader title="Grafik Histori DFM Mesin Kiri" />
          <Divider />
          <CardContent>
            <Stack spacing={3} sx={{ width: 450 }}>
              <List sx={{ paddingRight: 6 }}>
                <ListItem>
                  <div style={{ width: "100%", maxWidth: "600px" }}>
                    <Line data={data} />
                  </div>
                </ListItem>
              </List>
            </Stack>
          </CardContent>
          <Divider />
        </Card>
      </Stack>
    </Grid>
  );
};

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
  ListItemText,
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
import LineChart from "src/pages/chart/lineChart";

export const FuelStock = () => {
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

  const fueltank1 = vessel?.fuelTank1;
  const fueltank2 = vessel?.fuelTank2;
  const fueltank3 = vessel?.fuelTank3;
  const fueltank4 = vessel?.fuelTank4;
  const fueltank5 = vessel?.fuelTank5;
  const fueltank6 = vessel?.fuelTank6;
  const fueltank7 = vessel?.fuelTank7;
  const fueltank8 = vessel?.fuelTank8;
  const tankHeight = 90; // Height of the tank in pixels
  const waterHeight1 = (fueltank1 / 300) * tankHeight; // Calculate the water height based on the level percentage
  const waterHeight2 = (fueltank2 / 300) * tankHeight;
  const waterHeight3 = (fueltank3 / 300) * tankHeight;
  const waterHeight4 = (fueltank4 / 300) * tankHeight;
  const waterHeight5 = (fueltank5 / 300) * tankHeight;
  const waterHeight6 = (fueltank6 / 300) * tankHeight;
  const waterHeight7 = (fueltank7 / 300) * tankHeight;
  const waterHeight8 = (fueltank8 / 300) * tankHeight;
  //   const waterPersen = Math.round((fueltank1 / 300) * 100);
  //   const waterPersen2 = Math.round((fueltank2 / 300) * 100);
  //   const waterPersen3 = Math.round((fueltank3 / 300) * 100);
  //   const waterPersen4 = Math.round((fueltank4 / 300) * 100);
  //   const waterPersen5 = Math.round((fueltank5 / 300) * 100);
  //   const waterPersen6 = Math.round((fueltank6 / 300) * 100);
  //   const waterPersen7 = Math.round((fueltank7 / 300) * 100);
  //   const waterPersen8 = Math.round((fueltank8 / 300) * 100);
  return (
    <Grid container spacing={2}>
      <Stack sx={{ px: 2 }}>
        <Card sx={{ maxWidth: 450 }}>
          <CardHeader title="Stock Bahan Bakar" />
          <Divider />
          <CardContent>
            <Stack spacing={3} sx={{ width: 450 }}>
              <List sx={{ paddingRight: 8 }}>
                <ListItem>
                  <p>tanki</p>
                  <div className="water-tank">
                    <div className="water" style={{ height: waterHeight1 }}></div>
                    <div className="tank">{fueltank1}</div>
                  </div>
                  <div className="water-tank">
                    <div className="water2" style={{ height: waterHeight2 }}></div>
                    <div className="tank">{fueltank2}</div>
                  </div>
                  <div className="water-tank">
                    <div className="water3" style={{ height: waterHeight3 }}></div>
                    <div className="tank">{fueltank3}</div>
                  </div>
                  <div className="water-tank">
                    <div className="water4" style={{ height: waterHeight4 }}></div>
                    <div className="tank">{fueltank4}</div>
                  </div>
                  <div className="water-tank">
                    <div className="water5" style={{ height: waterHeight5 }}></div>
                    <div className="tank">{fueltank5}</div>
                  </div>
                  <div className="water-tank">
                    <div className="water6" style={{ height: waterHeight6 }}></div>
                    <div className="tank">{fueltank6}</div>
                  </div>
                  <div className="water-tank">
                    <div className="water7" style={{ height: waterHeight7 }}></div>
                    <div className="tank">{fueltank7}</div>
                  </div>
                  <div className="water-tank">
                    <div className="water8" style={{ height: waterHeight8 }}></div>
                    <div className="tank">{fueltank8}</div>
                  </div>
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={`Total Volume Tanki: ${fueltank1 +
                      fueltank2 +
                      fueltank3 +
                      fueltank4 +
                      fueltank5 +
                      fueltank6 +
                      fueltank7 +
                      fueltank8} KL`}
                  />
                </ListItem>
              </List>
            </Stack>
          </CardContent>
          <Typography variant="p" sx={{ px: 2, color: "orangered" }}>
            Histori Stock Bahan Bakar
          </Typography>
          <Box sx={{ minWidth: 500, maxWeight: "500px" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sortDirection="desc">Tanggal</TableCell>
                  <TableCell>Total Tanki</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {vesselDetail.map(vessel => {
                  return (
                    <TableRow hover key={vessel.id}>
                      <TableCell>{vessel.createdAt.split("T")[0]}</TableCell>
                      <TableCell>{`${vessel.fuelTank1 +
                        vessel.fuelTank2 +
                        vessel.fuelTank3 +
                        vessel.fuelTank4 +
                        vessel.fuelTank5 +
                        vessel.fuelTank6 +
                        vessel.fuelTank7 +
                        vessel.fuelTank8} KL`}</TableCell>
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
          <CardHeader title="Grafik Stok Bahan Bakar (Total)" />
          <Divider />
          <CardContent>
            <Stack spacing={3} sx={{ width: 450 }}>
              <List sx={{ paddingRight: 6 }}>
                <ListItem>
                  <LineChart />
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

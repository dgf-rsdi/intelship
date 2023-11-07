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
  TableRow
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

export const TankHistory = () => {
  const dispatch = useDispatch();
  const { vessel, vesselDetail, isLoading } = useSelector(state => state.vesselReducer);
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
    labels: labels,
    datasets: [
      {
        label: "Tangki 1",
        data: [300, 290, 280, 270, 260, 250, 240, 230, 220, 210],
        fill: false,
        backgroundColor: "rgba(255, 0, 0, 0.4)",
        borderColor: "rgba(255, 0, 0, 1)"
      },
      {
        label: "Tangki 2",
        data: [295, 290, 285, 280, 275, 270, 265, 260, 255, 250],
        fill: false,
        backgroundColor: "rgba(255, 255, 0, 0.4)",
        borderColor: "rgba(255, 255, 0, 1)"
      },
      {
        label: "Tangki 3",
        data: [290, 280, 270, 260, 250, 240, 230, 220, 210, 200],
        fill: false,
        backgroundColor: "rgba(0, 255, 127, 0.4)",
        borderColor: "rgba(0, 255, 127, 1)"
      },
      {
        label: "Tangki 4",
        data: [270, 255, 240, 235, 220, 205, 190, 175, 160, 145],
        fill: false,
        backgroundColor: "rgba(128, 0, 128, 0.4)",
        borderColor: "rgba(128, 0, 128, 1)"
      },
      {
        label: "Tangki 5",
        data: [200, 210, 220, 230, 240, 250, 260, 270, 280, 290],
        fill: false,
        backgroundColor: "rgba(255, 69, 0, 0.4)",
        borderColor: "rgba(255, 69, 0, 1)"
      },
      {
        label: "Tangki 6",
        data: [125, 100, 200, 250, 200, 150, 170, 100, 120, 200],
        fill: false,
        backgroundColor: "rgba(199, 21, 133, 0.4)",
        borderColor: "rgba(199, 21, 133, 1)"
      },
      {
        label: "Tangki 7",
        data: [100, 200, 210, 160, 220, 170, 230, 180, 240, 190],
        fill: false,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)"
      },
      {
        label: "Tangki 8",
        data: [120, 150, 180, 210, 240, 270, 300, 265, 235, 200],
        fill: false,
        backgroundColor: "rgba(255, 160, 122, 0.4)",
        borderColor: "rgba(255, 160, 122, 1)"
      }
    ]
  };
  var total =
    vessel.fuelTank1 +
    vessel.fuelTank2 +
    vessel.fuelTank3 +
    vessel.fuelTank4 +
    vessel.fuelTank5 +
    vessel.fuelTank6 +
    vessel.fuelTank7 +
    vessel.fuelTank8;

  return (
    <Grid container spacing={2}>
      <Stack sx={{ px: 2, py: 4 }}>
        <Card sx={{ maxWidth: 1200 }}>
          <CardHeader title="History Tangki" />
          <Divider />
          <Box sx={{ minWidth: 500, overflowY: "scroll", maxWeight: "500px" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sortDirection="desc">Tanggal</TableCell>
                  <TableCell>Tangki 1</TableCell>
                  <TableCell>Tangki 2</TableCell>
                  <TableCell>Tangki 3</TableCell>
                  <TableCell>Tangki 4</TableCell>
                  <TableCell>Tangki 5</TableCell>
                  <TableCell>Tangki 6</TableCell>
                  <TableCell>Tangki 7</TableCell>
                  <TableCell>Tangki 8</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Trim</TableCell>
                  <TableCell>List</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {vesselDetail.map(vessel => {
                  return (
                    <TableRow hover key={vessel.id}>
                      <TableCell>{vessel.createdAt.split("T")[0]}</TableCell>
                      <TableCell>
                        <SeverityPill color={statusMap[1]}>{vessel.fuelTank1}</SeverityPill>
                      </TableCell>
                      <TableCell>
                        <SeverityPill color={statusMap[1]}>{vessel.fuelTank2}</SeverityPill>
                      </TableCell>
                      <TableCell>
                        <SeverityPill color={statusMap[1]}>{vessel.fuelTank3}</SeverityPill>
                      </TableCell>
                      <TableCell>
                        <SeverityPill color={statusMap[1]}>{vessel.fuelTank4}</SeverityPill>
                      </TableCell>
                      <TableCell>
                        <SeverityPill color={statusMap[1]}>{vessel.fuelTank5}</SeverityPill>
                      </TableCell>
                      <TableCell>
                        <SeverityPill color={statusMap[1]}>{vessel.fuelTank6}</SeverityPill>
                      </TableCell>
                      <TableCell>
                        <SeverityPill color={statusMap[1]}>{vessel.fuelTank7}</SeverityPill>
                      </TableCell>
                      <TableCell>
                        <SeverityPill color={statusMap[1]}>{vessel.fuelTank8}</SeverityPill>
                      </TableCell>
                      <TableCell>{total}</TableCell>
                      <TableCell>{vessel.pitch}</TableCell>
                      <TableCell>{vessel.roll}</TableCell>
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
        <Card sx={{ maxWidth: 1000 }}>
          <CardHeader title="Grafik Tangki" />
          <Divider />
          <CardContent>
            <Stack spacing={3} sx={{ width: 1000 }}>
              <List sx={{ paddingRight: 6 }}>
                <ListItem>
                  <div style={{ width: "100%", maxWidth: "1000px" }}>
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

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

export const MainPower = () => {
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
        label: "Main Power",
        data: vesselDetail.map((vessel) => vessel.statusPower).slice(-10),
        fill: false,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)"
      }
    ]
  };

  return (
    <Grid container spacing={2}>
      <Stack sx={{ px: 2 }}>
        <Card sx={{ maxWidth: 450 }}>
          <CardHeader title="History Main Power" />
          <Divider />
          <Box sx={{ minWidth: 500, maxWeight: "500px" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sortDirection="desc">Tanggal</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {vesselDetail.map(vessel => {
                  // const createdAt = format(vessel.createdAt, 'dd/MM/yyyy');

                  return (
                    <TableRow hover key={vessel.id}>
                      <TableCell>{vessel.createdAt.split("T")[0]}</TableCell>
                      <SeverityPill color={statusMap[vessel.statusPower]}>
                        {vessel.statusPower}
                      </SeverityPill>
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
          <CardHeader title="Grafik Main Power" />
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

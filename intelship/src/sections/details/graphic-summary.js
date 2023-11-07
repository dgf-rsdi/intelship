import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  ListItem,
  List,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { fetchVesselById, fetchVessels } from "src/store/actionCreators/vesselAction";
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

export const GraphicSummary = () => {
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
            label: "RPM Kanan",
            data: vesselDetail.map((vessel) => vessel.RPM2).slice(-10),
            fill: false,
            backgroundColor: "rgba(220, 20, 60, 0.4)",
            borderColor: "rgba(220, 20, 60, 1)"
          },
          {
            label: "RPM Kiri",
            data: vesselDetail.map((vessel) => vessel.RPM1).slice(-10),
            fill: false,
            backgroundColor: "rgba(218, 165, 32, 0.4)",
            borderColor: "rgba(218, 165, 32, 1)"
          },
          {
            label: "Speed",
            data: vesselDetail.map((vessel) => vessel.speed).slice(-10),
            fill: false,
            backgroundColor: "rgba(0, 128, 0, 0.4)",
            borderColor: "rgba(0, 128, 0, 1)"
          },
          {
            label: "BBM Use DFM",
            data: [270, 255, 240, 235, 220, 205, 190, 175, 160, 145],
            fill: false,
            backgroundColor: "rgba(72, 209, 204, 0.4)",
            borderColor: "rgba(72, 209, 204, 1)"
          }
    ]
  };

  return (
    <Grid container spacing={2}>
      <Stack sx={{ px: 2 }}>
        <Card sx={{ maxWidth: 1000 }}>
          <CardHeader title="Grafik Summary" />
          <Divider />
          <CardContent>
            <Stack spacing={3} sx={{ width: 1200 }}>
              <List sx={{ paddingRight: 6 }}>
                <ListItem>
                  <div style={{ width: "100%", maxWidth: "900px" }}>
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
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
  Unstable_Grid2 as Grid
} from "@mui/material";
import { fetchVesselById, fetchVessels } from "src/store/actionCreators/vesselAction";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  BarElement
} from "chart.js";

export const FuelConsumption = () => {
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

  ChartJS.register(CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend);

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

  //   const data = {
  //     labels: labels,
  //     datasets: [
  //         {
  //             label: "RPM Kanan",
  //             data: [300, 290, 280, 270, 260, 250, 240, 230, 220, 210],
  //             fill: false,
  //             backgroundColor: "rgba(220, 20, 60, 0.4)",
  //             borderColor: "rgba(220, 20, 60, 1)"
  //           },
  //           {
  //             label: "RPM Kiri",
  //             data: [295, 290, 285, 280, 275, 270, 265, 260, 255, 250],
  //             fill: false,
  //             backgroundColor: "rgba(218, 165, 32, 0.4)",
  //             borderColor: "rgba(218, 165, 32, 1)"
  //           },
  //           {
  //             label: "Speed",
  //             data: [290, 280, 270, 260, 250, 240, 230, 220, 210, 200],
  //             fill: false,
  //             backgroundColor: "rgba(0, 128, 0, 0.4)",
  //             borderColor: "rgba(0, 128, 0, 1)"
  //           },
  //           {
  //             label: "BBM Use DFM",
  //             data: [270, 255, 240, 235, 220, 205, 190, 175, 160, 145],
  //             fill: false,
  //             backgroundColor: "rgba(72, 209, 204, 0.4)",
  //             borderColor: "rgba(72, 209, 204, 1)"
  //           }
  //     ]
  //   };
  const data = {
    labels: labels,
    datasets: [
      {
        label: "BBM per Hari",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)"
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)"
        ],
        borderWidth: 1
      }
    ]
  };

  return (
    <Grid container spacing={2}>
      <Stack sx={{ px: 2 }}>
        <Card sx={{ maxWidth: 1000 }}>
          <CardHeader title="Grafik Pemakaian Bahan Bakar" />
          <Divider />
          <CardContent>
            <Stack spacing={3} sx={{ width: 1200 }}>
              <List sx={{ paddingRight: 6 }}>
                <ListItem>
                  <div style={{ width: "100%", maxWidth: "900px" }}>
                    <Bar data={data} />
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

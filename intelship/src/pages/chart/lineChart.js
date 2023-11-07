import React from "react";
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
import { useSelector } from "react-redux";

const LineChart = () => {
  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
  const { vessel, vesselDetail, isLoading, vesselInfo } = useSelector(state => state.vesselReducer);
  // var today = new Date();
  // var dd = String(today.getDate()).padStart(2, "0");
  // var mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
  // var yyyy = today.getFullYear();
  // var currentDate = dd + '/' + mm + '/' + yyyy + '-';

  // Mengambil tanggal saat ini
  var today = new Date();

  // Membuat array label waktu setiap 2 jam
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
        label: "Total Volume",
        data: vesselDetail.map((vessel) => (vessel.fuelTank1 + vessel.fuelTank2 + vessel.fuelTank3 + vessel.fuelTank4 + vessel.fuelTank5 + vessel.fuelTank6 + vessel.fuelTank7 + vessel.fuelTank8 )).slice(-10),
        fill: false,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)"
      }
    ]
  };

  return (
    <div style={{ width: "100%", maxWidth: "600px" }}>
      <Line data={data} />
    </div>
  );
};

export default LineChart;

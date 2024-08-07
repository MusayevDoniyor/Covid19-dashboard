export const data = {
  labels: [1, 10, 100, "1k", "10k", "100k", "1m", "10m", "100m"],
  datasets: [
    {
      label: "Dataset 2",
      data: [28, 48, 40, 19, 86, 27, 90],
      fill: true,
      tension: 0.4,
      backgroundColor: "rgba(153,102,255,0.4)",
      borderColor: "rgba(153,102,255,1)",
    },
  ],
};

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Line Chart Example",
    },
  },
};

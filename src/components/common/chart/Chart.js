import Highcharts from "highcharts/highstock";
import { useEffect } from "react";
import { useSelector } from "react-redux";
export const Chart = ({ data }) => {
  const themeColor = useSelector((state) => state.auth.theme);

  useEffect(() => {
    const chart = Highcharts.stockChart("container", {
      chart: {
        height: 400,
        backgroundColor: themeColor === "dark" ? "#1C1D25" : "#F2F2F2",
      },

      rangeSelector: {
        enabled: false,
      },

      series: [
        {
          name: "",
          data: data,
          type: "area",
          threshold: null,
          tooltip: {
            valueDecimals: 2,
          },
        },
      ],

      legend: {
        layout: "horizontal",
        align: "center",
        verticalAlign: "bottom",
        borderWidth: 0,
        backgroundColor: "#3333ff",
      },
      colors: [
        "#4662a0",
        "#aadb87",
        "#da495b",
        "#a87bc6",
        "#fde5a5",
        "#66ceed",
        "#d565ad",
        "#7ea45d",
        "#eace6b",
        "#66edc6",
        "#fdb7a5",
      ],
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500,
            },
            chartOptions: {
              chart: {
                height: 300,
              },
              subtitle: {
                text: null,
              },
              navigator: {
                enabled: false,
              },
            },
          },
        ],
      },
    });
  }, [themeColor]);

  return <div id="container" className="bg-black"></div>;
};

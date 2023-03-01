import { ColorType, createChart } from "lightweight-charts";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

export const Chart = ({ data }) => {
  const themeColor = useSelector((state) => state.auth.theme);
  const backgroundColor = "transparent";
  const lineColor = "#BA4DF9";
  const textColor = themeColor === "light" ? "#C4C4C4" : "white";
  const areaTopColor = "#BA4DF9";
  const areaBottomColor = "rgba(0,0,0,0)";

  const chartContainerRef = useRef();

  useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: backgroundColor },
        textColor,
      },
      width: chartContainerRef.current.clientWidth,
      height: 300,
    });
    chart.timeScale().fitContent();

    const newSeries = chart.addAreaSeries({
      lineColor,
      topColor: areaTopColor,
      bottomColor: areaBottomColor,
    });
    newSeries.setData(data);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      chart.remove();
    };
  }, [
    data,
    backgroundColor,
    lineColor,
    textColor,
    areaTopColor,
    areaBottomColor,
  ]);

  return <div ref={chartContainerRef} />;
};

import React, { useEffect, useState, memo } from "react";
import { Line } from "react-chartjs-2";
import { Center } from "@mantine/core";
import { ISale } from "../../supabase/sales";
import { DAY_NAMES, MONTH_NAMES, SALES_INTERVAL } from "../utils/constants";

type ISalesWithOrders = {
  salesData: ISale[];
  interval?: SALES_INTERVAL;
};

function SalesWithOrders({
  salesData,
  interval = SALES_INTERVAL.month,
}: ISalesWithOrders) {
  const [chartLabels, setChartLabels] = useState<string[]>([]);
  const [totalAmount, setTotalAmount] = useState<number[]>([]);
  const [orderCount, setOrderCount] = useState<number[]>([]);

  const calculateSalesDataAndLabels = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const currentDay = currentDate.getDate();

    let filteredSalesDataForChart: ISale[] = [];
    let chartLabels: string[] = [];
    let totalAmountByLabel: number[] = [];
    let orderCountByLabel: number[] = [];

    switch (interval) {
      case SALES_INTERVAL.day:
        filteredSalesDataForChart = salesData.filter((sale) => {
          const saleDate = new Date(sale.created_at);
          return (
            saleDate.getFullYear() === currentYear &&
            saleDate.getMonth() === currentMonth &&
            saleDate.getDate() <= currentDay
          );
        });

        chartLabels = Array.from({ length: currentDay }, (_, i) => `${i + 1}`);

        totalAmountByLabel = chartLabels.map((label) => {
          const salesForDay = filteredSalesDataForChart.filter((sale) => {
            const saleDate = new Date(sale.created_at);
            return saleDate.getDate() === parseInt(label, 10);
          });

          return salesForDay.reduce(
            (total, sale) => total + sale.total_price,
            0
          );
        });

        orderCountByLabel = chartLabels.map((label) => {
          const ordersForDay = filteredSalesDataForChart.filter((sale) => {
            const saleDate = new Date(sale.created_at);
            return (
              saleDate.getDate() === parseInt(label, 10) &&
              saleDate.getMonth() === currentMonth
            );
          });

          return ordersForDay.length;
        });
        break;

      case SALES_INTERVAL.month:
        filteredSalesDataForChart = salesData.filter((sale) => {
          const saleDate = new Date(sale.created_at);
          return saleDate.getFullYear() === currentYear;
        });

        chartLabels = Array.from(
          { length: currentMonth + 1 },
          (_, i) => MONTH_NAMES[i]
        );

        totalAmountByLabel = chartLabels.map((label) => {
          const salesForMonth = filteredSalesDataForChart.filter((sale) => {
            const saleDate = new Date(sale.created_at);
            return saleDate.getMonth() === MONTH_NAMES.indexOf(label);
          });

          return salesForMonth.reduce(
            (total, sale) => total + sale.total_price,
            0
          );
        });

        orderCountByLabel = chartLabels.map((label) => {
          const ordersForMonth = filteredSalesDataForChart.filter((sale) => {
            const saleDate = new Date(sale.created_at);
            return saleDate.getMonth() === MONTH_NAMES.indexOf(label);
          });

          return ordersForMonth.length;
        });
        break;

      case SALES_INTERVAL.year:
        filteredSalesDataForChart = salesData.filter((sale) => {
          const saleDate = new Date(sale.created_at);
          const saleYear = saleDate.getFullYear();
          return saleYear >= currentYear - 4 && saleYear <= currentYear;
        });

        chartLabels = Array.from(
          { length: 5 },
          (_, i) => `${currentYear - 4 + i}`
        );

        totalAmountByLabel = chartLabels.map((label) => {
          const salesForYear = filteredSalesDataForChart.filter((sale) => {
            const saleDate = new Date(sale.created_at);
            return saleDate.getFullYear() === parseInt(label, 10);
          });

          return salesForYear.reduce(
            (total, sale) => total + sale.total_price,
            0
          );
        });

        orderCountByLabel = chartLabels.map((label, index) => {
          const ordersForMonth = filteredSalesDataForChart.filter((sale) => {
            const saleDate = new Date(sale.created_at);
            return (
              saleDate.getMonth() === index &&
              saleDate.getFullYear() === currentYear
            );
          });

          return ordersForMonth.length;
        });
        break;

      case SALES_INTERVAL.week:
        filteredSalesDataForChart = salesData.filter((sale) => {
          const saleDate = new Date(sale.created_at);
          return saleDate.getFullYear() === currentYear;
        });

        chartLabels = Array.from({ length: 7 }, (_, i) => DAY_NAMES[i]);

        totalAmountByLabel = chartLabels.map((label) => {
          const salesForDay = filteredSalesDataForChart.filter((sale) => {
            const saleDate = new Date(sale.created_at);
            return DAY_NAMES[saleDate.getDay()] === label;
          });

          return salesForDay.reduce(
            (total, sale) => total + sale.total_price,
            0
          );
        });

        orderCountByLabel = chartLabels.map((label, index) => {
          const ordersForDay = filteredSalesDataForChart.filter((sale) => {
            const saleDate = new Date(sale.created_at);
            return (
              DAY_NAMES[saleDate.getDay()] === label &&
              saleDate.getFullYear() === currentYear
            );
          });

          return ordersForDay.length;
        });
        break;
      default:
        break;
    }

    setChartLabels(chartLabels);
    setTotalAmount(totalAmountByLabel);
    setOrderCount(orderCountByLabel);
  };

  useEffect(() => {
    calculateSalesDataAndLabels();
  }, [salesData, interval]);

  const data = {
    labels: chartLabels,
    datasets: [
      {
        label: "Sales",
        data: totalAmount,
        fill: true,
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
      },
      {
        label: "Order Count",
        data: orderCount,
        fill: true,
        borderColor: "rgba(255,99,132,1)",
        backgroundColor: "rgba(255,99,132,0.2)",
      },
    ],
  };

  return (
    <Center mx={"10%"}>
      <Line data={data} />
    </Center>
  );
}

export default memo(SalesWithOrders);

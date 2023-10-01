import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Center } from "@mantine/core";
import { ISale } from "../../supabase/sales";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Revenue Generated Over Time",
    },
  },
};

// const labels = ["Jan", "Feb", "Mar", "Apr", "May"];

// export const data = {
//   labels,
//   datasets: [
//     {
//       label: "Monthly Sales",
//       data: [100, 150, 120, 200, 180],
//       borderColor: "rgb(255, 99, 132)",
//       backgroundColor: "rgba(255, 99, 132, 0.5)",
//     },
//   ],
// };

type ITotalSale = {
  salesData: ISale[];
};

export function TotalSale({ salesData }: ITotalSale) {
  const [monthlySalesData, setMonthlySalesData] = useState<ISale[]>([]);

  // Function to calculate total sales for each month
  const calculateMonthlySales = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Initialize an array to store sales data for each month
    const monthlySales = new Array(12).fill(0);

    // Filter sales data for the current year
    const filteredSalesData = salesData.filter((sale) => {
      const saleDate = new Date(sale.created_at);
      return saleDate.getFullYear() === currentYear;
    });

    // Calculate total sales for each month
    filteredSalesData.forEach((sale) => {
      const saleDate = new Date(sale.created_at);
      const saleMonth = saleDate.getMonth();
      const saleAmount = sale.total_price;
      monthlySales[saleMonth] += saleAmount;
    });

    // Only include data up to the current month
    const monthlyData = monthlySales.slice(0, currentMonth + 1);
    return monthlyData;
  };

  useEffect(() => {
    const monthlyData = calculateMonthlySales();
    setMonthlySalesData(monthlyData);
  }, [salesData]);

  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ].slice(0, monthlySalesData.length),
    datasets: [
      {
        label: "Revenue Per Month",
        data: monthlySalesData,
        fill: true,
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
      },
    ],
  };

  return (
    <Center mx={"10%"}>
      <Line options={options} data={data} />
    </Center>
  );
}

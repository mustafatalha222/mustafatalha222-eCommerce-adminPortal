import { Center } from "@mantine/core";
import { memo, useCallback } from "react";
import { Doughnut } from "react-chartjs-2";
import { IProduct } from "../../supabase/products";

type IInvetoryChart = {
  products: IProduct[];
};

const InventoryChart = ({ products }: IInvetoryChart) => {
  const productNames = products.map((product) => product.name);
  const inventoryLevels = products.map((product) => product.inventory);

  const generateUniqueColor = useCallback((index: number): string => {
    if (products[index].inventory < 10) {
      return `rgba(${255 - index * 3}, ${99 + index * 3}, ${
        132 - index * 3
      }, 0.7)`;
    } else if (products[index].inventory < 30) {
      return `rgba(${255 - index * 3}, ${165 + index * 3}, ${
        0 - index * 3
      }, 0.7)`; // Orange-like for inventory less than 30
    } else {
      return `rgba(${0 + index * 3}, ${128 - index * 3}, ${
        0 + index * 3
      }, 0.7)`; // Greenish for higher inventory
    }
  }, []);

  // Create an array of unique colors based on inventory levels
  const uniqueColors = inventoryLevels?.map((_, index) =>
    generateUniqueColor(index)
  );

  const data = {
    labels: productNames,
    datasets: [
      {
        data: inventoryLevels,
        backgroundColor: uniqueColors,
      },
    ],
  };

  return (
    <Center style={{ maxWidth: 500, margin: "auto" }}>
      <Doughnut data={data} />
    </Center>
  );
};

export default memo(InventoryChart);

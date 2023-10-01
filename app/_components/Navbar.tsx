import { useState } from "react";
import { Text, Box, NavLink } from "@mantine/core";
import { AiFillHome, AiFillDashboard, AiOutlineUser } from "react-icons/ai";
import { MdInventory, MdPointOfSale } from "react-icons/md";
import { useRouter } from "next/navigation";

const tabs = [
  { icon: <AiFillHome size={20} />, label: "Home", link: "/" },
  {
    icon: <AiFillDashboard size={20} />,
    label: "Dashboard",
    link: "/dashboard",
  },
  {
    icon: <MdInventory size={20} />,
    label: "Inventory",
    link: "/inventory",
  },
  {
    icon: <MdPointOfSale size={20} />,
    label: "Sales",
    link: "/sales",
  },
  {
    icon: <AiOutlineUser size={20} />,
    label: "Customers",
    link: "/customers",
  },
];

export function Navbar() {
  const router = useRouter();
  const [active, setActive] = useState(tabs[0].label);

  const links = tabs.map((item) => (
    <NavLink
      styles={{ label: { fontSize: 20 } }}
      key={item.label}
      active={item.label === active}
      label={item.label}
      leftSection={item.icon}
      onClick={() => {
        setActive(item.label);
        router.push(item.link);
      }}
    />
  ));

  return (
    <>
      <Text
        fw={500}
        size="md"
        style={{
          textTransform: "uppercase",
        }}
        mt={"xs"}
        c="dimmed"
      >
        Admin Talha
      </Text>

      <Box
        style={{
          flex: 1,
          marginTop: 20,
        }}
      >
        {links}
      </Box>
    </>
  );
}

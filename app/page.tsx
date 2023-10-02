import {
  ThemeIcon,
  Text,
  Title,
  Container,
  SimpleGrid,
  Center,
} from "@mantine/core";
import { AiFillDashboard, AiOutlineUser } from "react-icons/ai";
import { FaStore } from "react-icons/fa";
import { MdInventory, MdPointOfSale } from "react-icons/md";

export const MOCKDATA = [
  {
    icon: AiFillDashboard,
    title: "Dashboard",
    description:
      "Dashboard page helps us in sales, orders and inventory Graphs view",
  },
  {
    icon: MdInventory,
    title: "Inventory",
    description: "Inventory page allow us to manage products inventory",
  },
  {
    icon: MdPointOfSale,
    title: "Sales",
    description:
      "Sales page allows us to see sales details along with Categories and Time Frame filters",
  },
  {
    icon: AiOutlineUser,
    title: "Customers",
    description:
      "Customers page helps to see all customers available in our system",
  },
  {
    icon: FaStore,
    title: "Stores",
    description: "Stores page helps to see all stores available in our system",
  },
];

interface FeatureProps {
  icon: React.FC;
  title: React.ReactNode;
  description: React.ReactNode;
}

function Feature({ icon: Icon, title, description }: FeatureProps) {
  return (
    <div>
      <ThemeIcon variant="light" size={40} radius={40}>
        <Icon />
      </ThemeIcon>
      <Text mt="sm" mb={7} size={"lg"} fw={600}>
        {title}
      </Text>
      <Text size="sm" c="dimmed" lh={1.6}>
        {description}
      </Text>
    </div>
  );
}

export default function HomePage() {
  const features = MOCKDATA.map((f, index) => (
    <Feature
      icon={f.icon}
      description={f.description}
      title={f.title}
      key={index}
    />
  ));

  return (
    <Container mt={"xl"}>
      <Center>
        <Title>This is an E-commerce Admin Portals</Title>
      </Center>
      <Center>
        <Text size="sm">Let me brief you down detail of each page</Text>
      </Center>

      <SimpleGrid
        mt={60}
        cols={{ base: 1, sm: 2, md: 3 }}
        spacing={{ base: "xl", md: 50 }}
        verticalSpacing={{ base: "md", md: 50 }}
      >
        {features}
      </SimpleGrid>
    </Container>
  );
}

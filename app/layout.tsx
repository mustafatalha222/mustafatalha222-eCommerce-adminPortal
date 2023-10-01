"use client";
import "@mantine/core/styles.css";
import { MantineProvider, ColorSchemeScript, Text } from "@mantine/core";
import { theme } from "../theme";
import { useDisclosure } from "@mantine/hooks";
import { AppShell, Burger, Group } from "@mantine/core";
import { FaStore } from "react-icons/fa";
import { ReactNode } from "react";
import { Navbar } from "./_components/Navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const metadata = {
  title: "E-Commerce Admin Portal",
  description: "this is an eCommerce Admin Portal developed using nextJs",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient();
  const [opened, { toggle }] = useDisclosure();
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <MantineProvider theme={theme}>
            <AppShell
              header={{ height: 60 }}
              navbar={{
                width: 300,
                breakpoint: "sm",
                collapsed: { mobile: !opened },
              }}
              padding="md"
            >
              <AppShell.Header
                styles={{
                  header: {
                    background: theme.colors?.primary?.[1],
                    border: 0,
                  },
                }}
              >
                <Group h="100%" px="md">
                  <Burger
                    opened={opened}
                    onClick={toggle}
                    hiddenFrom="sm"
                    size="sm"
                  />
                  <FaStore size={40} color={theme.colors?.primary?.[8]} />
                  <Text
                    size={"xl"}
                    style={{ color: theme.colors?.primary?.[8] }}
                    fw={600}
                  >
                    E-Commerce Portal
                  </Text>
                </Group>
              </AppShell.Header>
              <AppShell.Navbar p="md">
                <Navbar />
              </AppShell.Navbar>
              <AppShell.Main>{children}</AppShell.Main>
            </AppShell>
          </MantineProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}

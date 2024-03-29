"use client";
import Layout from "@repo/ui/dashboardLayout";
import { Button } from "@repo/ui/button";
import { ListItem } from "@repo/ui/listItem";
import Link from "next/link";
import {
  MdHome,
  MdPerson,
  MdLocationPin,
  MdTrain,
  MdHelp,
  MdMap,
  MdBookOnline,
  MdReviews,
} from "react-icons/md";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const pathname = usePathname();
  return (
    <Layout
      headerActions={
        <Link href="api/auth/signout">
          <Button variant="contained" color="error">
            Sign Out
          </Button>
        </Link>
      }
      listItems={
        <>
          <Link
            href="/"
            style={{
              textDecoration: "none",
              color: pathname == "/" ? "#FF7757" : "inherit",
            }}
          >
            <ListItem
              icon={
                <MdHome
                  style={{
                    fontSize: "1.5rem",
                  }}
                />
              }
              primary="Dashboard"
            />
          </Link>
          <Link
            href="/sites"
            style={{
              textDecoration: "none",
              color: pathname == "/sites" ? "#FF7757" : "inherit",
            }}
          >
            <ListItem
              icon={
                <MdLocationPin
                  style={{
                    fontSize: "1.5rem",
                  }}
                />
              }
              primary="Sites"
            />
          </Link>
          <Link
            href="/transports"
            style={{
              textDecoration: "none",
              color: pathname == "/transports" ? "#FF7757" : "inherit",
            }}
          >
            <ListItem
              icon={
                <MdTrain
                  style={{
                    fontSize: "1.5rem",
                  }}
                />
              }
              primary="Transports"
            />
          </Link>
          <Link
            href="/tours"
            style={{
              textDecoration: "none",
              color: pathname == "/tours" ? "#FF7757" : "inherit",
            }}
          >
            <ListItem
              icon={
                <MdMap
                  style={{
                    fontSize: "1.5rem",
                  }}
                />
              }
              primary="Tours"
            />
          </Link>
          <Link
            href="/bookings"
            style={{
              textDecoration: "none",
              color: pathname == "/bookings" ? "#FF7757" : "inherit",
            }}
          >
            <ListItem
              icon={
                <MdBookOnline
                  style={{
                    fontSize: "1.5rem",
                  }}
                />
              }
              primary="Bookings"
            />
          </Link>
          <Link
            href="/queries"
            style={{
              textDecoration: "none",
              color: pathname == "/queries" ? "#FF7757" : "inherit",
            }}
          >
            <ListItem
              icon={
                <MdHelp
                  style={{
                    fontSize: "1.5rem",
                  }}
                />
              }
              primary="Queries"
            />
          </Link>
          <Link
            href="/reviews"
            style={{
              textDecoration: "none",
              color: pathname == "/reviews" ? "#FF7757" : "inherit",
            }}
          >
            <ListItem
              icon={
                <MdReviews
                  style={{
                    fontSize: "1.5rem",
                  }}
                />
              }
              primary="Reviews"
            />
          </Link>
          <Link
            href="/users"
            style={{
              textDecoration: "none",
              color: pathname == "/users" ? "#FF7757" : "inherit",
            }}
          >
            <ListItem
              icon={
                <MdPerson
                  style={{
                    fontSize: "1.5rem",
                  }}
                />
              }
              primary="Users"
            />
          </Link>
        </>
      }
    >
      {children}
    </Layout>
  );
}

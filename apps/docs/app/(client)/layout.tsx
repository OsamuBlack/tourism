import Layout from "@repo/ui/dashboardLayout";
import { Button } from "@repo/ui/button";
import { ListItem } from "@repo/ui/listItem";
import Link from "next/link";
import { MdHome, MdPerson, MdLocationPin } from "react-icons/md";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
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
              color: "inherit",
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
              color: "inherit",
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
            href="/users"
            style={{
              textDecoration: "none",
              color: "inherit",
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

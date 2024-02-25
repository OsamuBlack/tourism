"use client";

import { Box, Container, Drawer } from "@repo/ui/box";
import { Button, IconButton } from "@repo/ui/button";
import { Typography } from "@repo/ui/typography";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdFlag, MdMenu, MdClose } from "react-icons/md";

export function Logo() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        gap: 2,
      }}
    >
      <MdFlag />
      <Typography
        variant="h6"
        component="span"
        fontFamily={"var(--fontPlafair), serif"}
      >
        Sole
      </Typography>
    </Box>
  );
}

export function Menu({ isMobile }: { isMobile?: boolean }) {
  return (
    <Box
      component="ul"
      sx={{
        display: "flex",
        flexDirection: isMobile ? "column" : undefined,
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Link href="/">
        <Typography
          component={"li"}
          sx={{
            color: "#fff",
            listStyle: "none",
          }}
        >
          Home
        </Typography>
      </Link>
    </Box>
  );
}

function UserActions() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 1,
      }}
    >
      <Link href="api/auth/signin">
        <Button color="secondary">Login</Button>
      </Link>
      <Link href="api/auth/signup">
        <Button
          variant="contained"
          color="secondary"
          style={{
            color: "#fff",
          }}
        >
          Signin
        </Button>
      </Link>
    </Box>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            bgcolor: "#000",
            width: 200,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            p: "2rem 1rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <Logo />
            <Menu />
          </Box>
          <UserActions />
        </Box>
      </Drawer>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
        }}
      >
        <Container>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 2,
            }}
          >
            <Logo />

            <Box
              display={{
                xs: "none",
                md: "block",
              }}
            >
              <Menu />
            </Box>
            <Box
              display={{
                xs: "none",
                md: "block",
              }}
            >
              <UserActions />
            </Box>
            <Box
              display={{
                xs: "block",
                md: "none",
                color: "#fff",
              }}
            >
              <IconButton onClick={() => setOpen(!open)} color="inherit">
                {open ? <MdClose /> : <MdMenu />}
              </IconButton>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}

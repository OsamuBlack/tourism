"use client";
// import React, { useRef, useState } from "react";
// Import Swiper React components
// import { Swiper, SwiperSlide } from "swiper/react";
import { MdArrowForward } from "react-icons/md";
// Import Swiper styles

import { Box, Container } from "@repo/ui/box";

// import required modules
import { Pagination, EffectFade, Autoplay } from "swiper/modules";
import { Typography } from "@repo/ui/typography";
import { Button } from "@repo/ui/button";

function Type() {
  return (
    <Box width="100%" position={"relative"}>
      <Container>
        <Typography
          variant="h2"
          component="h1"
          fontFamily={"var(--fontPlafair), serif"}
          align="left"
          whiteSpace={"pre-wrap"}
          color={"white"}
        >
          Start your unforgettable{"\n"}journey with us
        </Typography>
        <Typography
          variant="subtitle1"
          align="left"
          whiteSpace={"pre-wrap"}
          color={"white"}
        >
          The best travel for your journey begins now.
        </Typography>
      </Container>
    </Box>
  );
}

function Book() {
  function Field() {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Typography component={"p"} color={"#777"}>
          Destinatioin
        </Typography>
        <Typography
          variant="h6"
          component={"p"}
          fontFamily={"var(--fontPlafair), serif"}
        >
          Rakaposhi Base Camp
        </Typography>
        <Box
          sx={{
            borderBottom: "2px solid #ddd",
            height: 2,
            width: { md: "250px", lg: "100%" },
          }}
        ></Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        bgcolor: "white",
        borderRadius: { xs: "2rem", md: "0 4rem 4rem 0" },
        width: { xs: "95%", md: "calc(100% - 220px)" },
        left: {
          xs: 0,
          md: "-220px",
        },
        position: "relative",
        p: { xs: "2rem 1rem", md: 8 },
        pb: { xs: 16 },
        m: { xs: 4, md: 0 },
        overflow: "hidden",
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          gap: 4,
          position: "relative",
          left: { sx: 0, md: "220px" },
          oveflow: "auto",
        }}
      >
        <Field />
        <Field />
        <Field />
      </Container>
      <Box
        sx={{
          bgcolor: (props) => props.palette.primary.main,
          color: "#fff",
          position: "absolute",
          top: { xs: undefined, md: 0 },
          right: 0,
          left: {
            xs: 0,
            md: "Auto",
          },
          bottom: 0,
          display: "flex",
        }}
      >
        <Button
          color="inherit"
          sx={{
            fontFamily: "var(--fontPlafair), serif",
            p: 4,
            textAlign: {
              xs: "center",
              md: "left",
            },
          }}
          endIcon={<MdArrowForward />}
        >
          Book Now
        </Button>
      </Box>
    </Box>
  );
}

export default function Hero() {
  return (
    <>
      {/* <Swiper
        spaceBetween={30}
        style={{
          width: "100%",
          height: "100%",
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, EffectFade, Autoplay]}
        autoplay={{
          delay: 6000,
        }}
        className="mySwiper"
      > */}
      {/* <SwiperSlide> */}
      <Box
        sx={{
          width: "100%",
          height: "100%",
          overflow: "hidden",
          background: `url("https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
          backgroundAttachment: "fixed",
          position: "relative",
          display: "flex",
          justifyContent: "stretch",
          alignItems: "center",
          p: { xs: "6rem 0", md: "8rem 0" },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            bgcolor: "#000",
            opacity: 0.25,
          }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            width: "100%",
            gap: { xs: 8, md: 12, lg: 16 },
          }}
        >
          <Type />
          <Book />
        </Box>
      </Box>
      {/* </SwiperSlide>
      </Swiper> */}
    </>
  );
}

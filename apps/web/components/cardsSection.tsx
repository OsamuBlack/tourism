"use client";

import { Box, Container, Grid } from "@repo/ui/box";
import Title from "./title";
import { Typography } from "@repo/ui/typography";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css/bundle";

export default function CardsSection({
  title,
  subtitle,
  align,
  cards,
}: {
  title: string;
  subtitle: string;
  align?: "left" | "center" | "right";
  cards: {
    title: string;
    description: React.ReactNode;
    image: string;
  }[];
}) {
  return (
    <Box
      sx={{
        p: "4rem 0",
      }}
    >
      <Container
        sx={{
          gap: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Title title={title} subtitle={subtitle} align={align} />
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          modules={[Pagination]}
          className="mySwiper"
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          {cards?.map((card, index) => (
            <SwiperSlide key={index + card.title}>
              <Box
                sx={{
                  aspectRatio: "3/4",
                  background: `url(${card.image})`,
                  backgroundSize: "cover",
                  borderRadius: 4,
                  overflow: "clip",
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    p: 2,
                    gap: 2,
                    display: "flex",
                    flexDirection: "column",
                    color: "#fff",
                  }}
                >
                  <Typography
                    variant="h5"
                    component="h2"
                    fontFamily="var(--fontPlafair), serif"
                  >
                    {card.title}
                  </Typography>
                  {card.description}
                </Box>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </Box>
  );
}

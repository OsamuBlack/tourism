import { Box } from "@repo/ui/box";
import CardsSection from "../components/cardsSection";
import Hero from "../components/hero";
import { MdLocationPin } from "react-icons/md";

export default function () {
  return (
    <main>
      <Hero />
      <CardsSection
        title="Popular Destinations"
        subtitle="Most popular destinations around in Pakistan, from historical places to natural wonders."
        cards={[
          {
            title: "Rakaposhi Base Camp",
            description: (
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                }}
              >
                <MdLocationPin />A wonder hidden.
              </Box>
            ),
            image:
              "https://images.unsplash.com/photo-1683548632549-8fa44ce4f10e?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          {
            title: "Rakaposhi Base Camp",
            description: (
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                }}
              >
                <MdLocationPin />A wonder hidden.
              </Box>
            ),
            image:
              "https://images.unsplash.com/photo-1683548632549-8fa44ce4f10e?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          {
            title: "Rakaposhi Base Camp",
            description: (
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                }}
              >
                <MdLocationPin
                  style={{
                    fontSize: "2rem",
                  }}
                />
                A wonder hidden.
              </Box>
            ),
            image:
              "https://images.unsplash.com/photo-1641975765119-ecc40b55973e?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          {
            title: "Rakaposhi Base Camp",
            description: (
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                }}
              >
                <MdLocationPin
                  style={{
                    fontSize: "2rem",
                  }}
                />
                A wonder hidden.
              </Box>
            ),
            image:
              "https://images.unsplash.com/photo-1641975765119-ecc40b55973e?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
        ]}
      />
    </main>
  );
}

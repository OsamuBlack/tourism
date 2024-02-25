import { Box } from "@repo/ui/box";
import CardsSection from "../../components/cardsSection";
import Hero from "../../components/hero";
import { MdLocationPin } from "react-icons/md";
import { getSites } from "@repo/modal/models";

export default async function () {
  const sites = await getSites();
  console.log(sites);
  return (
    <main>
      <Hero />
      <CardsSection
        title="Popular Destinations"
        subtitle="Most popular destinations around in Pakistan, from historical places to natural wonders."
        cards={[
          ...sites.map((site) => ({
            title: site.name || "",
            description: (
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                }}
              >
                <MdLocationPin />
                {site.address}
              </Box>
            ),
            image: site.heroImage || "",
          })),
        ]}
      />
    </main>
  );
}

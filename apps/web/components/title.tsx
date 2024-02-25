import { Box } from "@repo/ui/box";
import { Typography } from "@repo/ui/typography";

export default function Title({
  title,
  subtitle,
  align,
}: {
  title: string;
  subtitle: string;
  align?: "left" | "right" | "center";
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography
        component="h1"
        variant="h3"
        fontFamily="var(--fontPlafair), serif"
      >
        {title}
      </Typography>
      <Box
        sx={{
          width: 200,
          height: 4,
          bgcolor: "#ff7757"
        }}
      />
      <Typography variant="h6" color="#777">
        {subtitle}
      </Typography>
    </Box>
  );
}

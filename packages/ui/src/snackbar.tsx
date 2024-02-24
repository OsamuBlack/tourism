import { Snackbar as MuiSnackbar, Slide, SlideProps } from "@mui/material";

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="right" />;
}
export default function Snackbar({
  snackbar,
  setSnackbar,
}: {
  snackbar: string;
  setSnackbar: (value: string) => void;
}) {
  return (
    <MuiSnackbar
      open={Boolean(snackbar)}
      onClose={() => setSnackbar("")}
      TransitionComponent={SlideTransition}
      message={snackbar}
      autoHideDuration={5000}
    />
  );
}

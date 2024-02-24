import {
  TypographyProps,
  FormHelperTextProps,
  InputLabelProps,
  Typography as MuiTypography,
  FormHelperText as MuiFormHelperText,
  InputLabel as MuiInputLabel,
} from "@mui/material";

export const Typography = (props: TypographyProps) => (
  <MuiTypography {...props} />
);
export const FormHelperText = (props: FormHelperTextProps) => (
  <MuiFormHelperText {...props} />
);
export const InputLabel = (props: InputLabelProps) => (
  <MuiInputLabel {...props} />
);

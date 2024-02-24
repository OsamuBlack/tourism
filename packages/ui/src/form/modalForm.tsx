import {
  Box,
  Button,
  Container,
  FormHelperText,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import { FormikProps, FormikValues, useFormik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import Snackbar from "../snackbar";
import { Close } from "@mui/icons-material";

export function ModalForm<T>({
  title,
  schema,
  initialValues,
  fields,
  submitText,
  onSubmit,
  open,
  setOpen,
}: {
  title: string;
  schema: yup.ObjectSchema<any>;
  initialValues: FormikValues;
  fields: (formik: FormikProps<FormikValues>) => React.ReactNode;
  submitText?: string;
  onSubmit: (values: FormikValues) => Promise<string> | string;
  open: boolean;
  setOpen: (value: boolean) => void;
}) {
  const [snackbar, setSnackbar] = useState("");

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: schema,
    onSubmit: (values) => {
      const res = onSubmit(values);
      if (typeof res == "string") setSnackbar(res);
      else res.then((value) => setSnackbar(value));
    },
  });

  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          width={"100%"}
          height={"100%"}
        >
          <Container maxWidth={"sm"}>
            <Box
              sx={{
                borderRadius: 4,
                bgcolor: "#fff",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  maxHeight: "90vh",
                  overflowY: "auto",
                }}
              >
                <Box
                  sx={{
                    bgcolor: (props) => props.palette.primary.main,
                    color: (props) => props.palette.primary.contrastText,
                    p: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="h5" component="p">
                    {title}
                  </Typography>
                  <IconButton color={"inherit"} onClick={() => setOpen(false)}>
                    <Close />
                  </IconButton>
                </Box>
                <Box
                  component={"form"}
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                  }}
                  onSubmit={formik.handleSubmit}
                >
                  {fields(formik)}
                  <Button
                    disabled={!formik.isValid}
                    color="primary"
                    variant="contained"
                    fullWidth
                    type="submit"
                  >
                    {submitText || "Submit"}
                  </Button>
                </Box>
              </Box>
            </Box>
          </Container>
        </Box>
      </Modal>
      <Snackbar setSnackbar={setSnackbar} snackbar={snackbar} />
    </>
  );
}

export { yup };

export function ModalConfirm<T>({
  title,
  children,
  onSubmit,
  open,
  setOpen,
}: {
  title: string;
  children?: React.ReactNode;
  onSubmit: () => Promise<string> | string;
  open: boolean;
  setOpen: (value: boolean) => void;
}) {
  const [snackbar, setSnackbar] = useState("");
  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          width={"100%"}
          height={"100%"}
        >
          <Container maxWidth={"sm"}>
            <Box
              sx={{
                borderRadius: 4,
                bgcolor: "#fff",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  bgcolor: (props) => props.palette.primary.main,
                  color: (props) => props.palette.primary.contrastText,
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h5" component="p">
                  {title}
                </Typography>
                <IconButton color={"inherit"} onClick={() => setOpen(false)}>
                  <Close />
                </IconButton>
              </Box>
              <Box
                component={"form"}
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                }}
                onSubmit={(e) => {
                  e.preventDefault();
                  const res = onSubmit();
                  if (typeof res == "string") setSnackbar(res);
                  else res.then((value) => setSnackbar(value));
                }}
              >
                {children || "Are you sure you wish to procede?"}
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 2,
                  }}
                >
                  <Button color="primary" variant="contained" type="submit">
                    {"Confirm"}
                  </Button>
                  <Button
                    color="error"
                    variant="outlined"
                    type="button"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </Button>
                </Box>
              </Box>
            </Box>
          </Container>
        </Box>
      </Modal>
      <Snackbar setSnackbar={setSnackbar} snackbar={snackbar} />
    </>
  );
}

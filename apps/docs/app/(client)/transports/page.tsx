"use client";

import { useEffect, useState } from "react";

import { TableGrid } from "@repo/ui/table";
import { TextField, MDEditor } from "@repo/ui/fields";
import { ModalForm, yup, ModalConfirm } from "@repo/ui/form";
import { FormHelperText, InputLabel } from "@repo/ui/typography";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { transportType } from "@repo/modal/types";
import { v4 } from "uuid";
import {
  addTransport,
  getTransports,
  updateTransport,
  deleteTransport,
} from "./request";

const transportSchema = yup.object<transportType>({
  id: yup.string().required(),
  name: yup.string().required(),
  urduName: yup.string(),
  heroImage: yup.string().url(),
  capacity: yup.string().required().min(1),
  description: yup.string().required(),
  urduDescription: yup.string(),
});

function Fields({ formik }: { formik: any }) {
  return (
    <>
      <TextField
        fullWidth
        id="id"
        name="id"
        disabled
        label="Id"
        value={formik.values.id}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.id && Boolean(formik.errors.id)}
        helperText={
          ((formik.touched.id && formik.errors.id) as string) ||
          "Auto generated"
        }
      />
      <TextField
        fullWidth
        id="name"
        name="name"
        label="Name"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={(formik.touched.name && formik.errors.name) as string}
      />
      <TextField
        fullWidth
        id="urduName"
        name="urduName"
        label="Urdu Name"
        value={formik.values.urduName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.urduName && Boolean(formik.errors.urduName)}
        helperText={
          (formik.touched.urduName && formik.errors.urduName) as string
        }
      />
      <TextField
        fullWidth
        id="heroImage"
        name="heroImage"
        label="Hero Image"
        value={formik.values.heroImage}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.heroImage && Boolean(formik.errors.heroImage)}
        helperText={
          (formik.touched.heroImage && formik.errors.heroImage) as string
        }
      />
      <TextField
        fullWidth
        id="capacity"
        name="capacity"
        type="number"
        label="Capacity"
        value={formik.values.capacity}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.capacity && Boolean(formik.errors.capacity)}
        helperText={
          (formik.touched.capacity && formik.errors.capacity) as string
        }
      ></TextField>
      <div data-color-mode="light">
        <InputLabel>Description</InputLabel>
        <MDEditor
          id="description"
          value={formik.values.description}
          preview="edit"
          onChange={(value) => formik.setFieldValue("description", value)}
        />
        <FormHelperText error>
          {(formik.touched.description && formik.errors.description) as string}
        </FormHelperText>
      </div>
      <div
        data-color-mode="light"
        style={{
          textAlign: "right",
        }}
      >
        <InputLabel>اردو تفصیل</InputLabel>
        <MDEditor
          id="urduDescription"
          value={formik.values.urduDescription}
          preview="edit"
          onChange={(value) => formik.setFieldValue("urduDescription", value)}
        />
        <FormHelperText error>
          {
            (formik.touched.urduDescription &&
              formik.errors.urduDescription) as string
          }
        </FormHelperText>
      </div>
    </>
  );
}

export default function TransportsPage() {
  const [transports, setTransports] = useState<transportType[]>([]);

  const [request, setRequest] = useState(0);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [transport, setTransport] = useState<transportType | null>();
  const [deleteId, setDeleteId] = useState<string | null>();

  useEffect(() => {
    if (loading)
      getTransports().then((newTransports) => {
        if (newTransports)
          setTransports((prevTransports) => [
            ...prevTransports,
            ...newTransports,
          ]);
        if (request == 0 && loading) setLoading(false);
      });
  }, [request]);
  return (
    <>
      <TableGrid
        data={transports}
        baseColumns={[
          { field: "id", headerName: "ID", width: 70 },
          { field: "name", headerName: "Name", width: 200 },
          { field: "capacity", headerName: "Capacity", width: 75 },
          { field: "description", headerName: "Description", width: 300 },
        ]}
        loading={loading}
        updateRow={async (row) => {
          setTransport(row as transportType);
        }}
        deleteRow={(row) => {
          setDeleteId(row.id);
        }}
        newRow={() => setOpen(true)}
      />
      {open && (
        <ModalForm
          title={"Add New Transport"}
          schema={transportSchema}
          initialValues={{
            id: v4(),
            name: "",
            email: "",
            role: "transport",
          }}
          fields={(formik) => <Fields formik={formik} />}
          onSubmit={async (values) => {
            const res = await addTransport(values);
            if (res.status == 200) {
              setTransports((prevTransports) => [
                values as transportType,
                ...prevTransports,
              ]);
              setTimeout(() => setDeleteId(null), 5000);
            }
            return res.status == 200
              ? "Successfully created a new transport"
              : "Error creating the transport";
          }}
          open={open}
          setOpen={setOpen}
          submitText="Add Transport"
        />
      )}
      {transport && (
        <ModalForm
          title={"Update Transport"}
          schema={transportSchema}
          initialValues={transport}
          fields={(formik) => <Fields formik={formik} />}
          onSubmit={async (values) => {
            const res = await updateTransport(values);
            const updatedTransport = values as transportType;
            if (res.status == 200) {
              setTransports((prevRows) =>
                prevRows?.map((r) =>
                  r.id == updatedTransport.id ? updatedTransport : r
                )
              );
            }
            return res.status == 200
              ? "Successfully updated the transport"
              : "Error updating the transport";
          }}
          open={true}
          setOpen={() => setTransport(null)}
          submitText="Update Transport"
        />
      )}
      {deleteId && (
        <ModalConfirm
          title="Delete Transport"
          open={true}
          setOpen={() => setDeleteId(null)}
          onSubmit={async () => {
            const res = await deleteTransport(deleteId);
            if (res.status == 200) {
              setTransports((prevRows) =>
                prevRows?.filter((r) => r.id != deleteId)
              );
              setTimeout(() => setDeleteId(null), 5000);
            }
            return res.status == 200
              ? "Successfully deleted the transport"
              : "Error deleted the transport";
          }}
        >
          Are you sure you want to delete this transport?
        </ModalConfirm>
      )}
    </>
  );
}

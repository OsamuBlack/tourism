"use client";

import { useEffect, useState } from "react";

import { TableGrid } from "@repo/ui/table";
import { TextField, MDEditor, MapPicker } from "@repo/ui/fields";
import { ModalForm, yup, ModalConfirm } from "@repo/ui/form";
import { FormHelperText, InputLabel } from "@repo/ui/typography";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { siteType } from "@repo/modal/types";
import { v4 } from "uuid";

import { addSite, getSites, deleteSite, updateSite } from "./request";

const siteSchema = yup.object<siteType>({
  id: yup.string().required(),
  name: yup.string().required(),
  urduName: yup.string(),
  heroImage: yup.string().url(),
  longitude: yup.string().required(),
  latitude: yup.string().required(),
  zoom: yup.string().required(),
  address: yup.string().required(),
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
        label="Id *"
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
        label="Name *"
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
          ((formik.touched.heroImage && formik.errors.heroImage) as string) ||
          "Enter url of the image"
        }
      />
      <div className="">
        <InputLabel>Location *</InputLabel>
        <MapPicker
          latitude={formik.values.latitude}
          setLatitude={(value: number) =>
            formik.setFieldValue("latitude", value)
          }
          longitude={formik.values.longitude}
          setLongitude={(value: number) =>
            formik.setFieldValue("longitude", value)
          }
          zoom={formik.values.zoom}
          setZoom={(value: number) => formik.setFieldValue("zoom", value)}
        />
        <FormHelperText error>
          {(formik.touched.zoom && formik.errors.zoom) as string}
        </FormHelperText>
      </div>
      <TextField
        fullWidth
        id="address"
        name="address"
        label="Address *"
        value={formik.values.address}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.address && Boolean(formik.errors.address)}
        helperText={(formik.touched.address && formik.errors.address) as string}
      ></TextField>
      <div data-color-mode="light">
        <InputLabel>Description *</InputLabel>
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

export default function SitesPage() {
  const [sites, setSites] = useState<siteType[]>([]);

  const [request, setRequest] = useState(0);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [site, setSite] = useState<siteType | null>();
  const [deleteId, setDeleteId] = useState<string | null>();

  useEffect(() => {
    if (loading)
      getSites().then((newSites) => {
        if (newSites) setSites((prevSites) => [...prevSites, ...newSites]);
        if (request == 0 && loading) setLoading(false);
      });
  }, [request]);
  return (
    <>
      <TableGrid
        data={sites}
        baseColumns={[
          { field: "id", headerName: "ID", width: 70 },
          { field: "name", headerName: "Name", width: 200 },
          { field: "longitude", headerName: "Longitude", width: 75 },
          { field: "latitude", headerName: "Latitude", width: 75 },
          { field: "zoom", headerName: "Zoom", width: 75 },
          { field: "address", headerName: "Address", width: 200 },
          { field: "description", headerName: "Description", width: 200 },
        ]}
        loading={loading}
        updateRow={async (row) => {
          setSite(row as siteType);
        }}
        deleteRow={(row) => {
          setDeleteId(row.id);
        }}
        newRow={() => setOpen(true)}
      />
      {open && (
        <ModalForm
          title={"Add New Site"}
          schema={siteSchema}
          initialValues={{
            id: v4(),
            latitude: 30,
            longitude: 69,
            zoom: 6,
          }}
          fields={(formik) => <Fields formik={formik} />}
          onSubmit={async (values) => {
            const res = await addSite(values);
            if (res.status == 200) {
              setSites((prevSites) => [values as siteType, ...prevSites]);
              setTimeout(() => setDeleteId(null), 5000);
            }
            return res.status == 200
              ? "Successfully created a new site"
              : "Error creating the site";
          }}
          open={open}
          setOpen={setOpen}
          submitText="Add Site"
        />
      )}
      {site && (
        <ModalForm
          title={"Update Site"}
          schema={siteSchema}
          initialValues={site}
          fields={(formik) => <Fields formik={formik} />}
          onSubmit={async (values) => {
            const res = await updateSite(values);
            const updatedSite = values as siteType;
            if (res.status == 200) {
              setSites((prevRows) =>
                prevRows?.map((r) => (r.id == updatedSite.id ? updatedSite : r))
              );
            }
            return res.status == 200
              ? "Successfully updated the site"
              : "Error updating the site";
          }}
          open={true}
          setOpen={() => setSite(null)}
          submitText="Update Site"
        />
      )}
      {deleteId && (
        <ModalConfirm
          title="Delete Site"
          open={true}
          setOpen={() => setDeleteId(null)}
          onSubmit={async () => {
            const res = await deleteSite(deleteId);
            if (res.status == 200) {
              setSites((prevRows) => prevRows?.filter((r) => r.id != deleteId));
              setTimeout(() => setDeleteId(null), 5000);
            }
            return res.status == 200
              ? "Successfully deleted the site"
              : "Error deleted the site";
          }}
        >
          Are you sure you want to delete this site?
        </ModalConfirm>
      )}
    </>
  );
}

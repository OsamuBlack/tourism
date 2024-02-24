"use client";

import { useEffect, useState } from "react";

import { TableGrid } from "@repo/ui/table";
import { TextField } from "@repo/ui/fields";
import { ModalForm, yup, ModalConfirm } from "@repo/ui/form";
import { sitesType } from "./types";
import { v4 } from "uuid";

const siteSchema = yup.object({
  id: yup.string().required(),
  name: yup.string().required(),
  longitude: yup.string().required(),
  latitude: yup.string().required(),
  zoom: yup.string().required(),
  address: yup.string().required(),
  description: yup.string().required(),
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
        id="longitude"
        name="longitude"
        type="number"
        label="Longitude"
        value={formik.values.longitude}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.longitude && Boolean(formik.errors.longitude)}
        helperText={
          (formik.touched.longitude && formik.errors.longitude) as string
        }
      ></TextField>
      <TextField
        fullWidth
        id="latitude"
        name="latitude"
        type="number"
        label="Latitude"
        value={formik.values.latitude}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.latitude && Boolean(formik.errors.latitude)}
        helperText={
          (formik.touched.latitude && formik.errors.latitude) as string
        }
      ></TextField>

      <TextField
        fullWidth
        id="zoom"
        name="zoom"
        type="number"
        label="Zoom"
        value={formik.values.zoom}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.zoom && Boolean(formik.errors.zoom)}
        helperText={(formik.touched.zoom && formik.errors.zoom) as string}
      ></TextField>
      <TextField
        fullWidth
        id="address"
        name="address"
        label="Address"
        value={formik.values.address}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.address && Boolean(formik.errors.address)}
        helperText={(formik.touched.address && formik.errors.address) as string}
      ></TextField>
      <TextField
        fullWidth
        id="description"
        name="description"
        multiline
        label="Description"
        value={formik.values.description}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.description && Boolean(formik.errors.description)}
        helperText={
          (formik.touched.description && formik.errors.description) as string
        }
      ></TextField>
    </>
  );
}

export default function SitesPage() {
  const [sites, setSites] = useState<sitesType[]>([]);

  const [request, setRequest] = useState(0);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [site, setSite] = useState<sitesType | null>();
  const [deleteId, setDeleteId] = useState<string | null>();

  const getSites = async () => {
    const res = await fetch("/sites/api");
    const data = await res.json();
    return data.sites;
  };

  const addSite = async (values: object) => {
    return await fetch("/sites/api", {
      method: "POST",
      body: JSON.stringify(values),
    });
  };

  const updateSite = async (values: object) => {
    return await fetch("/sites/api", {
      method: "PUT",
      body: JSON.stringify(values),
    });
  };

  const deleteSite = async (id: string) => {
    return await fetch("/sites/api", {
      method: "DELETE",
      body: JSON.stringify(id),
    });
  };

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
          setSite(row as sitesType);
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
            name: "",
            email: "",
            role: "site",
          }}
          fields={(formik) => <Fields formik={formik} />}
          onSubmit={async (values) => {
            const res = await addSite(values);
            if (res.status == 200) {
              setSites((prevSites) => [values as sitesType, ...prevSites]);
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
            const updatedSite = values as sitesType;
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

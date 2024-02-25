"use client";

import { useEffect, useState } from "react";

import { TableGrid } from "@repo/ui/table";
import { TextField, MDEditor, MapPicker, MenuItem } from "@repo/ui/fields";
import { ModalForm, yup, ModalConfirm } from "@repo/ui/form";
import { FormHelperText, InputLabel } from "@repo/ui/typography";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { siteType, tourType, transportType } from "@repo/modal/types";
import { v4 } from "uuid";
import { getTransports } from "../transports/request";
import { getSites } from "../sites/request";
import { getTours, addTour, deleteTour, updateTour } from "./request";

const tourSchema = yup.object<tourType>({
  id: yup.string().required(),
  name: yup.string().required(),
  urduName: yup.string(),
  heroImage: yup.string(),
  description: yup.string().required(),
  urduDescription: yup.string(),
  siteId: yup.string().required(),
  transportId: yup.string().required(),
  departureDate: yup.date(),
  departureTime: yup.string(),
  duration: yup.number().required(),
  price: yup.number().required(),
  priceUSD: yup.number().required(),
  longitude: yup.string(),
  latitude: yup.string(),
  zoom: yup.string(),
});

function Fields({
  formik,
  sites,
  transports,
}: {
  formik: any;
  sites: siteType[];
  transports: transportType[];
}) {
  console.log(formik);
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
        id="departureDate"
        name="departureDate"
        label="Departure Date *"
        type="date"
        value={formik.values.departureDate}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.departureDate && Boolean(formik.errors.departureDate)
        }
        helperText={
          (formik.touched.departureDate &&
            formik.errors.departureDate) as string
        }
      ></TextField>
      <TextField
        fullWidth
        id="departureTime"
        name="departureTime"
        label="Departure Time *"
        type="time"
        value={formik.values.departureTime}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.departureTime && Boolean(formik.errors.departureTime)
        }
        helperText={
          (formik.touched.departureTime &&
            formik.errors.departureTime) as string
        }
      ></TextField>
      <TextField
        fullWidth
        id="siteId"
        name="siteId"
        label="Site *"
        select
        value={formik.values.siteId}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.siteId && Boolean(formik.errors.siteId)}
        helperText={(formik.touched.siteId && formik.errors.siteId) as string}
      >
        {sites.map((item) => (
          <MenuItem value={item.id} key={item.id}>
            {item.name}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        fullWidth
        id="transportId"
        name="transportId"
        label="Transport*"
        select
        value={formik.values.transportId}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.transportId && Boolean(formik.errors.transportId)}
        helperText={
          (formik.touched.transportId && formik.errors.transportId) as string
        }
      >
        {transports.map((item) => (
          <MenuItem value={item.id} key={item.id}>
            {item.name}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        fullWidth
        id="duration"
        name="duration"
        label="Trip Duration * (Days)"
        type="number"
        value={formik.values.duration}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.duration && Boolean(formik.errors.duration)}
        helperText={
          (formik.touched.duration && formik.errors.duration) as string
        }
      />
      <TextField
        fullWidth
        id="price"
        name="price"
        label="Price* (PKR)"
        type="number"
        value={formik.values.price}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.price && Boolean(formik.errors.price)}
        helperText={(formik.touched.price && formik.errors.price) as string}
      />
      <TextField
        fullWidth
        id="priceUSD"
        name="priceUSD"
        label="Price* (USD)"
        type="number"
        value={formik.values.priceUSD}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.priceUSD && Boolean(formik.errors.priceUSD)}
        helperText={
          (formik.touched.priceUSD && formik.errors.priceUSD) as string
        }
      />
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

export default function ToursPage() {
  const [tours, setTours] = useState<tourType[]>([]);

  const [request, setRequest] = useState(0);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [tour, setTour] = useState<tourType | null>();
  const [deleteId, setDeleteId] = useState<string | null>();

  const [sites, setSites] = useState<siteType[]>([]);
  const [transports, setTransports] = useState<transportType[]>([]);

  useEffect(() => {
    getSites().then((t) => setSites(t));
    getTransports().then((usrs) => setTransports(usrs));
  }, []);

  useEffect(() => {
    if (loading)
      getTours().then((newTours) => {
        if (newTours) setTours((prevTours) => [...prevTours, ...newTours]);
        if (request == 0 && loading) setLoading(false);
      });
  }, [request]);
  return (
    <>
      <TableGrid
        data={tours}
        baseColumns={[
          { field: "id", headerName: "ID", width: 70 },
          { field: "name", headerName: "Name", width: 200 },
          { field: "duration", headerName: "Duration (Days)", width: 150 },
          { field: "price", headerName: "Price (PKR)", width: 100 },
          { field: "departureTime", headerName: "Departure Time", width: 150 },
          { field: "longitude", headerName: "Longitude", width: 75 },
          { field: "latitude", headerName: "Latitude", width: 75 },
          { field: "zoom", headerName: "Zoom", width: 75 },
          { field: "description", headerName: "Description", width: 200 },
        ]}
        loading={loading}
        updateRow={async (row) => {
          setTour(row as tourType);
        }}
        deleteRow={(row) => {
          setDeleteId(row.id);
        }}
        newRow={() => setOpen(true)}
      />
      {open && (
        <ModalForm
          title={"Add New Tour"}
          schema={tourSchema}
          initialValues={{
            id: v4(),
            latitude: 30,
            longitude: 69,
            zoom: 6,
          }}
          fields={(formik) => (
            <Fields sites={sites} transports={transports} formik={formik} />
          )}
          onSubmit={async (values) => {
            const res = await addTour(values);
            if (res.status == 200) {
              setTours((prevTours) => [values as tourType, ...prevTours]);
              setTimeout(() => setDeleteId(null), 5000);
            }
            return res.status == 200
              ? "Successfully created a new tour"
              : "Error creating the tour";
          }}
          open={open}
          setOpen={setOpen}
          submitText="Add Tour"
        />
      )}
      {tour && (
        <ModalForm
          title={"Update Tour"}
          schema={tourSchema}
          initialValues={tour}
          fields={(formik) => (
            <Fields sites={sites} transports={transports} formik={formik} />
          )}
          onSubmit={async (values) => {
            const res = await updateTour(values);
            const updatedTour = values as tourType;
            if (res.status == 200) {
              setTours((prevRows) =>
                prevRows?.map((r) => (r.id == updatedTour.id ? updatedTour : r))
              );
            }
            return res.status == 200
              ? "Successfully updated the tour"
              : "Error updating the tour";
          }}
          open={true}
          setOpen={() => setTour(null)}
          submitText="Update Tour"
        />
      )}
      {deleteId && (
        <ModalConfirm
          title="Delete Tour"
          open={true}
          setOpen={() => setDeleteId(null)}
          onSubmit={async () => {
            const res = await deleteTour(deleteId);
            if (res.status == 200) {
              setTours((prevRows) => prevRows?.filter((r) => r.id != deleteId));
              setTimeout(() => setDeleteId(null), 5000);
            }
            return res.status == 200
              ? "Successfully deleted the tour"
              : "Error deleted the tour";
          }}
        >
          Are you sure you want to delete this tour?
        </ModalConfirm>
      )}
    </>
  );
}

"use client";

import { useEffect, useState } from "react";

import { TableGrid } from "@repo/ui/table";
import { TextField, MenuItem } from "@repo/ui/fields";
import { ModalForm, yup, ModalConfirm } from "@repo/ui/form";
import { bookingType, tourType, userType } from "@repo/modal/types";
import { v4 } from "uuid";
import { getUsers } from "../users/request";
import { getTours } from "../tours/request";

import {
  getBookings,
  addBooking,
  updateBooking,
  deleteBooking,
} from "./requests";

const bookingSchema = yup.object<bookingType>({
  id: yup.string().required(),
  transportId: yup.string(),
  status: yup.string(),
  tourId: yup.string().required(),
  userId: yup.string().required(),
});

function Fields({
  formik,
  users,
  tours,
}: {
  formik: any;
  users: userType[];
  tours: tourType[];
}) {
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
        id="userId"
        name="userId"
        label="User"
        select
        value={formik.values.userId}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.userId && Boolean(formik.errors.userId)}
        helperText={(formik.touched.userId && formik.errors.userId) as string}
      >
        {users.map((usr) => (
          <MenuItem value={usr.id} key={usr.id}>
            {usr.email}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        fullWidth
        id="tourId"
        name="tourId"
        label="Tour"
        select
        value={formik.values.tourId}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.tourId && Boolean(formik.errors.tourId)}
        helperText={(formik.touched.tourId && formik.errors.tourId) as string}
      >
        {tours.map((item) => (
          <MenuItem value={item.id} key={item.id}>
            {item.name}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        fullWidth
        id="status"
        name="status"
        label="Status"
        select
        value={formik.values.status}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.status && Boolean(formik.errors.status)}
        helperText={(formik.touched.status && formik.errors.status) as string}
      >
        <MenuItem value={"pending"}>Payment Pending</MenuItem>
        <MenuItem value={"confirmed"}>Confirmed</MenuItem>
        <MenuItem value={"completed"}>Completed</MenuItem>
        <MenuItem value={"canceled"}>Cancled</MenuItem>
      </TextField>
    </>
  );
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<bookingType[]>([]);

  const [request, setRequest] = useState(0);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [booking, setBooking] = useState<bookingType | null>();
  const [deleteId, setDeleteId] = useState<string | null>();

  const [users, setUsers] = useState<userType[]>([]);
  const [tours, setTours] = useState<tourType[]>([]);
  useEffect(() => {
    getUsers().then((usrs: userType[]) => setUsers(usrs));
    getTours().then((items: tourType[]) => setTours(items));
  }, [])
  
  useEffect(() => {
    if (loading)
      getBookings().then((newBookings) => {
        if (newBookings)
          setBookings((prevBookings) => [...prevBookings, ...newBookings]);
        if (request == 0 && loading) setLoading(false);
      });
  }, [request]);
  return (
    <>
      <TableGrid
        data={bookings}
        baseColumns={[
          { field: "id", headerName: "ID", width: 70 },
          { field: "status", headerName: "Status", width: 200 },
          { field: "userId", headerName: "User", width: 200 },
          { field: "tourId", headerName: "Tour", width: 200 },
        ]}
        loading={loading}
        updateRow={async (row) => {
          setBooking(row as bookingType);
        }}
        deleteRow={(row) => {
          setDeleteId(row.id);
        }}
        newRow={() => setOpen(true)}
      />
      {open && (
        <ModalForm
          title={"Add New Booking"}
          schema={bookingSchema}
          initialValues={{
            id: v4(),
          }}
          fields={(formik) => (
            <Fields formik={formik} tours={tours} users={users} />
          )}
          onSubmit={async (values) => {
            const res = await addBooking(values);
            if (res.status == 200) {
              setBookings((prevBookings) => [
                values as bookingType,
                ...prevBookings,
              ]);
              setTimeout(() => setDeleteId(null), 5000);
            }
            return res.status == 200
              ? "Successfully created a new booking"
              : "Error creating the booking";
          }}
          open={open}
          setOpen={setOpen}
          submitText="Add Booking"
        />
      )}
      {booking && (
        <ModalForm
          title={"Update Booking"}
          schema={bookingSchema}
          initialValues={booking}
          fields={(formik) => (
            <Fields formik={formik} tours={tours} users={users} />
          )}
          onSubmit={async (values) => {
            const res = await updateBooking(values);
            const updatedBooking = values as bookingType;
            if (res.status == 200) {
              setBookings((prevRows) =>
                prevRows?.map((r) =>
                  r.id == updatedBooking.id ? updatedBooking : r
                )
              );
            }
            return res.status == 200
              ? "Successfully updated the booking"
              : "Error updating the booking";
          }}
          open={true}
          setOpen={() => setBooking(null)}
          submitText="Update Booking"
        />
      )}
      {deleteId && (
        <ModalConfirm
          title="Delete Booking"
          open={true}
          setOpen={() => setDeleteId(null)}
          onSubmit={async () => {
            const res = await deleteBooking(deleteId);
            if (res.status == 200) {
              setBookings((prevRows) =>
                prevRows?.filter((r) => r.id != deleteId)
              );
              setTimeout(() => setDeleteId(null), 5000);
            }
            return res.status == 200
              ? "Successfully deleted the booking"
              : "Error deleted the booking";
          }}
        >
          Are you sure you want to delete this booking?
        </ModalConfirm>
      )}
    </>
  );
}

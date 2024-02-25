"use client";

import { useEffect, useState } from "react";

import { TableGrid } from "@repo/ui/table";
import { TextField, MenuItem } from "@repo/ui/fields";
import { ModalForm, yup, ModalConfirm } from "@repo/ui/form";
import { reviewType, tourType, userType } from "@repo/modal/types";
import { v4 } from "uuid";
import { getUsers } from "../users/request";
import { getTours } from "../tours/request";
import { getReviews, addReview, deleteReview, updateReview } from "./requests";

const reviewSchema = yup.object<reviewType>({
  id: yup.string().required(),
  tourId: yup.string().required(),
  content: yup.string().required(),
  ratting: yup.number().min(0).max(5),
});

function Fields({
  formik,
  tour,
  users,
}: {
  formik: any;
  tour: tourType[];
  users: userType[];
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
        label="User*"
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
        label="Tour*"
        select
        value={formik.values.tourId}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.tourId && Boolean(formik.errors.tourId)}
        helperText={(formik.touched.tourId && formik.errors.tourId) as string}
      >
        {tour.map((item) => (
          <MenuItem value={item.id} key={item.id}>
            {item.name}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        fullWidth
        id="content"
        name="content"
        label="Review*"
        value={formik.values.content}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.content && Boolean(formik.errors.content)}
        helperText={(formik.touched.content && formik.errors.content) as string}
      />
    </>
  );
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<reviewType[]>([]);

  const [request, setRequest] = useState(0);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [review, setReview] = useState<reviewType | null>();
  const [deleteId, setDeleteId] = useState<string | null>();
  const [tour, setTours] = useState<tourType[]>([]);
  const [users, setUsers] = useState<userType[]>([]);

  useEffect(() => {
    getTours().then((t) => setTours(t));
    getUsers().then((usrs: userType[]) => setUsers(usrs));
  }, []);

  useEffect(() => {
    if (loading)
      getReviews().then((newReviews) => {
        if (newReviews)
          setReviews((prevReviews) => [...prevReviews, ...newReviews]);
        if (request == 0 && loading) setLoading(false);
      });
  }, [request]);
  return (
    <>
      <TableGrid
        data={reviews}
        baseColumns={[
          { field: "id", headerName: "ID", width: 70 },
          { field: "userId", headerName: "User", width: 75 },
          { field: "content", headerName: "Review", width: 200 },
        ]}
        loading={loading}
        updateRow={async (row) => {
          setReview(row as reviewType);
        }}
        deleteRow={(row) => {
          setDeleteId(row.id);
        }}
        newRow={() => setOpen(true)}
      />
      {open && (
        <ModalForm
          title={"Add New Review"}
          schema={reviewSchema}
          initialValues={{
            id: v4(),
          }}
          fields={(formik) => (
            <Fields formik={formik} users={users} tour={tour} />
          )}
          onSubmit={async (values) => {
            const res = await addReview(values);
            if (res.status == 200) {
              setReviews((prevReviews) => [
                values as reviewType,
                ...prevReviews,
              ]);
              setTimeout(() => setDeleteId(null), 5000);
            }
            return res.status == 200
              ? "Successfully created a new review"
              : "Error creating the review";
          }}
          open={open}
          setOpen={setOpen}
          submitText="Add Review"
        />
      )}
      {review && (
        <ModalForm
          title={"Update Review"}
          schema={reviewSchema}
          initialValues={review}
          fields={(formik) => (
            <Fields formik={formik} users={users} tour={tour} />
          )}
          onSubmit={async (values) => {
            const res = await updateReview(values);
            const updatedReview = values as reviewType;
            if (res.status == 200) {
              setReviews((prevRows) =>
                prevRows?.map((r) =>
                  r.id == updatedReview.id ? updatedReview : r
                )
              );
            }
            return res.status == 200
              ? "Successfully updated the review"
              : "Error updating the review";
          }}
          open={true}
          setOpen={() => setReview(null)}
          submitText="Update Review"
        />
      )}
      {deleteId && (
        <ModalConfirm
          title="Delete Review"
          open={true}
          setOpen={() => setDeleteId(null)}
          onSubmit={async () => {
            const res = await deleteReview(deleteId);
            if (res.status == 200) {
              setReviews((prevRows) =>
                prevRows?.filter((r) => r.id != deleteId)
              );
              setTimeout(() => setDeleteId(null), 5000);
            }
            return res.status == 200
              ? "Successfully deleted the review"
              : "Error deleted the review";
          }}
        >
          Are you sure you want to delete this review?
        </ModalConfirm>
      )}
    </>
  );
}

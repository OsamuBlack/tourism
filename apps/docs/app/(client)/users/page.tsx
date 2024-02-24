"use client";

import { useEffect, useState } from "react";

import { TableGrid } from "@repo/ui/table";
import { TextField, MenuItem } from "@repo/ui/fields";
import { ModalForm, yup, ModalConfirm } from "@repo/ui/form";
import { userType } from "./types";
import { v4 } from "uuid";
import { getUsers, addUser, updateUser, deleteUser } from "./request";

const userSchema = yup.object({
  id: yup.string().required(),
  name: yup.string().nullable(),
  email: yup.string().email().required(),
  role: yup.string().oneOf(["user", "admin"]),
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
        id="email"
        name="email"
        label="Email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={(formik.touched.email && formik.errors.email) as string}
      />
      <TextField
        fullWidth
        id="role"
        name="role"
        label="Role"
        select
        value={formik.values.role}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.role && Boolean(formik.errors.role)}
        helperText={(formik.touched.role && formik.errors.role) as string}
      >
        <MenuItem value={"user"}>User</MenuItem>
        <MenuItem value={"admin"}>Admin</MenuItem>
      </TextField>
    </>
  );
}

export default function UsersPage() {
  const [users, setUsers] = useState<
    {
      id: string;
      name?: string;
      email: string;
      image?: string;
      password?: string;
      role: string;
    }[]
  >([]);

  const [request, setRequest] = useState(0);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<userType | null>();
  const [deleteId, setDeleteId] = useState<string | null>();

  useEffect(() => {
    if (loading)
      getUsers().then((newUsers) => {
        if (newUsers) setUsers((prevUsers) => [...prevUsers, ...newUsers]);
        if (request == 0 && loading) setLoading(false);
      });
  }, [request]);
  return (
    <>
      <TableGrid
        data={users}
        baseColumns={[
          { field: "id", headerName: "ID", width: 70 },
          { field: "name", headerName: "Name", width: 200 },
          { field: "email", headerName: "Email", width: 200 },
          {
            field: "role",
            headerName: "Role",
            width: 130,
          },
        ]}
        loading={loading}
        updateRow={async (row) => {
          setUser(row as userType);
        }}
        deleteRow={(row) => {
          setDeleteId(row.id);
        }}
        newRow={() => setOpen(true)}
      />
      {open && (
        <ModalForm
          title={"Add New User"}
          schema={userSchema}
          initialValues={{
            id: v4(),
            name: "",
            email: "",
            role: "user",
          }}
          fields={(formik) => <Fields formik={formik} />}
          onSubmit={async (values) => {
            const res = await addUser(values);
            if (res.status == 200) {
              setUsers((prevUsers) => [values as userType, ...prevUsers]);
              setTimeout(() => setDeleteId(null), 5000);
            }
            return res.status == 200
              ? "Successfully created a new user"
              : "Error creating the user";
          }}
          open={open}
          setOpen={setOpen}
          submitText="Add User"
        />
      )}
      {user && (
        <ModalForm
          title={"Update User"}
          schema={userSchema}
          initialValues={user}
          fields={(formik) => <Fields formik={formik} />}
          onSubmit={async (values) => {
            const res = await updateUser(values);
            const updatedUser = values as userType;
            if (res.status == 200) {
              setUsers((prevRows) =>
                prevRows?.map((r) => (r.id == updatedUser.id ? updatedUser : r))
              );
            }
            return res.status == 200
              ? "Successfully updated the user"
              : "Error updating the user";
          }}
          open={true}
          setOpen={() => setUser(null)}
          submitText="Update User"
        />
      )}
      {deleteId && (
        <ModalConfirm
          title="Delete User"
          open={true}
          setOpen={() => setDeleteId(null)}
          onSubmit={async () => {
            const res = await deleteUser(deleteId);
            if (res.status == 200) {
              setUsers((prevRows) => prevRows?.filter((r) => r.id != deleteId));
              setTimeout(() => setDeleteId(null), 5000);
            }
            return res.status == 200
              ? "Successfully deleted the user"
              : "Error deleted the user";
          }}
        >
          Are you sure you want to delete this user?
        </ModalConfirm>
      )}
    </>
  );
}

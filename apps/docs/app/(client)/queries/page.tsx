"use client";

import { useEffect, useState } from "react";

import { TableGrid } from "@repo/ui/table";
import { TextField, MenuItem } from "@repo/ui/fields";
import { ModalForm, yup, ModalConfirm } from "@repo/ui/form";
import { queryType, userType } from "@repo/modal/types";
import { v4 } from "uuid";
import { getUsers } from "../users/request";

import { getQuerys, addQuery, updateQuery, deleteQuery } from "./requests";

const querySchema = yup.object<queryType>({
  id: yup.string().required(),
  userId: yup.string().required(),
  query: yup.string().required(),
});

function Fields({ formik, users }: { formik: any; users: userType[] }) {
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
        id="query"
        name="query"
        label="Query"
        value={formik.values.query}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.query && Boolean(formik.errors.query)}
        helperText={(formik.touched.query && formik.errors.query) as string}
      />
    </>
  );
}

export default function QuerysPage() {
  const [querys, setQuerys] = useState<queryType[]>([]);

  const [request, setRequest] = useState(0);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState<queryType | null>();
  const [deleteId, setDeleteId] = useState<string | null>();

  const [users, setUsers] = useState<userType[]>([]);
  useEffect(() => {
    getUsers().then((usrs: userType[]) => setUsers(usrs));
  }, []);

  useEffect(() => {
    if (loading)
      getQuerys().then((newQuerys) => {
        if (newQuerys) setQuerys((prevQuerys) => [...prevQuerys, ...newQuerys]);
        if (request == 0 && loading) setLoading(false);
      });
  }, [request]);
  return (
    <>
      <TableGrid
        data={querys}
        baseColumns={[
          { field: "id", headerName: "ID", width: 70 },
          { field: "userId", headerName: "User", width: 75 },
          { field: "query", headerName: "Query", width: 200 },
        ]}
        loading={loading}
        updateRow={async (row) => {
          setQuery(row as queryType);
        }}
        deleteRow={(row) => {
          setDeleteId(row.id);
        }}
        newRow={() => setOpen(true)}
      />
      {open && (
        <ModalForm
          title={"Add New Query"}
          schema={querySchema}
          initialValues={{
            id: v4(),
          }}
          fields={(formik) => <Fields formik={formik} users={users} />}
          onSubmit={async (values) => {
            const res = await addQuery(values);
            if (res.status == 200) {
              setQuerys((prevQuerys) => [values as queryType, ...prevQuerys]);
              setTimeout(() => setDeleteId(null), 5000);
            }
            return res.status == 200
              ? "Successfully created a new query"
              : "Error creating the query";
          }}
          open={open}
          setOpen={setOpen}
          submitText="Add Query"
        />
      )}
      {query && (
        <ModalForm
          title={"Update Query"}
          schema={querySchema}
          initialValues={query}
          fields={(formik) => <Fields formik={formik} users={users} />}
          onSubmit={async (values) => {
            const res = await updateQuery(values);
            const updatedQuery = values as queryType;
            if (res.status == 200) {
              setQuerys((prevRows) =>
                prevRows?.map((r) =>
                  r.id == updatedQuery.id ? updatedQuery : r
                )
              );
            }
            return res.status == 200
              ? "Successfully updated the query"
              : "Error updating the query";
          }}
          open={true}
          setOpen={() => setQuery(null)}
          submitText="Update Query"
        />
      )}
      {deleteId && (
        <ModalConfirm
          title="Delete Query"
          open={true}
          setOpen={() => setDeleteId(null)}
          onSubmit={async () => {
            const res = await deleteQuery(deleteId);
            if (res.status == 200) {
              setQuerys((prevRows) =>
                prevRows?.filter((r) => r.id != deleteId)
              );
              setTimeout(() => setDeleteId(null), 5000);
            }
            return res.status == 200
              ? "Successfully deleted the query"
              : "Error deleted the query";
          }}
        >
          Are you sure you want to delete this query?
        </ModalConfirm>
      )}
    </>
  );
}

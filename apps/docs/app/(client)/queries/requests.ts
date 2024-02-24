export const getQuerys = async () => {
  const res = await fetch("/queries/api");
  const data = await res.json();
  return data.querys;
};

export const addQuery = async (values: object) => {
  return await fetch("/queries/api", {
    method: "POST",
    body: JSON.stringify(values),
  });
};

export const updateQuery = async (values: object) => {
  return await fetch("/queries/api", {
    method: "PUT",
    body: JSON.stringify(values),
  });
};

export const deleteQuery = async (id: string) => {
  return await fetch("/queries/api", {
    method: "DELETE",
    body: JSON.stringify(id),
  });
};

export const getUsers = async () => {
  const res = await fetch("/users/api");
  const data = await res.json();
  return data.users;
};

export const addUser = async (values: object) => {
  return await fetch("/users/api", {
    method: "POST",
    body: JSON.stringify(values),
  });
};

export const updateUser = async (values: object) => {
  return await fetch("/users/api", {
    method: "PUT",
    body: JSON.stringify(values),
  });
};

export const deleteUser = async (id: string) => {
  return await fetch("/users/api", {
    method: "DELETE",
    body: JSON.stringify(id),
  });
};

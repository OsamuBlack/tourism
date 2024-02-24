export const getBookings = async () => {
  const res = await fetch("/queries/api");
  const data = await res.json();
  return data.querys;
};

export const addBooking = async (values: object) => {
  return await fetch("/queries/api", {
    method: "POST",
    body: JSON.stringify(values),
  });
};

export const updateBooking = async (values: object) => {
  return await fetch("/queries/api", {
    method: "PUT",
    body: JSON.stringify(values),
  });
};

export const deleteBooking = async (id: string) => {
  return await fetch("/queries/api", {
    method: "DELETE",
    body: JSON.stringify(id),
  });
};

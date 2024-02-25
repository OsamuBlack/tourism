export const getTours = async () => {
  const res = await fetch("/tours/api");
  const data = await res.json();
  return data.tours;
};

export const addTour = async (values: object) => {
  return await fetch("/tours/api", {
    method: "POST",
    body: JSON.stringify(values),
  });
};

export const updateTour = async (values: object) => {
  return await fetch("/tours/api", {
    method: "PUT",
    body: JSON.stringify(values),
  });
};

export const deleteTour = async (id: string) => {
  return await fetch("/tours/api", {
    method: "DELETE",
    body: JSON.stringify(id),
  });
};

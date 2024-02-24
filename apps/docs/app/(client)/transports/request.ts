export const getTransports = async () => {
  const res = await fetch("/transports/api");
  const data = await res.json();
  return data.transports;
};

export const addTransport = async (values: object) => {
  return await fetch("/transports/api", {
    method: "POST",
    body: JSON.stringify(values),
  });
};

export const updateTransport = async (values: object) => {
  return await fetch("/transports/api", {
    method: "PUT",
    body: JSON.stringify(values),
  });
};

export const deleteTransport = async (id: string) => {
  return await fetch("/transports/api", {
    method: "DELETE",
    body: JSON.stringify(id),
  });
};

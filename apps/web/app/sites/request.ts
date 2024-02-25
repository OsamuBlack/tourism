
export const getSites = async () => {
  const res = await fetch("/sites/api");
  const data = await res.json();
  return data.sites;
}; 
export const addSite = async (values: object) => {
  return await fetch("/sites/api", {
    method: "POST",
    body: JSON.stringify(values),
  });
};

export const updateSite = async (values: object) => {
  return await fetch("/sites/api", {
    method: "PUT",
    body: JSON.stringify(values),
  });
};

export const deleteSite = async (id: string) => {
  return await fetch("/sites/api", {
    method: "DELETE",
    body: JSON.stringify(id),
  });
};

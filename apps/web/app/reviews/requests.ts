
export const getReviews = async () => {
  const res = await fetch("/reviews/api");
  const data = await res.json();
  return data.reviews;
};

export const addReview = async (values: object) => {
  return await fetch("/reviews/api", {
    method: "POST",
    body: JSON.stringify(values),
  });
};

export const updateReview = async (values: object) => {
  return await fetch("/reviews/api", {
    method: "PUT",
    body: JSON.stringify(values),
  });
};

export const deleteReview = async (id: string) => {
  return await fetch("/reviews/api", {
    method: "DELETE",
    body: JSON.stringify(id),
  });
};
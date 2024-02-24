export type userType = {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  password: string;
  role: string;
};

export type siteType = {
  id: string;
  name: string | null;
  urduName: string | null;
  longitude: string | null;
  latitude: string | null;
  zoom: string | null;
  heroImage: string | null;
  address: string | null;
  description: string | null;
  urduDescription: string | null;
};

export type transportType = {
  id: string;
  name: string;
  urduName: string | null;
  heroImage: string | null;
  description: string | null;
  urduDescription: string | null;
  capacity: number | null;
};

export type tourType = {
  id: string;
  name: string | null;
  urduName: string | null;
  heroImage: string | null;
  description: string | null;
  urduDescription: string | null;
  siteId: string;
  transportId: string;
  departureTime: Date | null;
  duration: number | null;
  price: string | null;
  priceUSD: string | null;
  longitude: string | null;
  latitude: string | null;
  zoom: string | null;
};

export type queryType = {
  id: string;
  userId: string;
  query: string;
};

export type reviewType = {
  id: string;
  tourId: string;
  content: string;
  ratting: number | null;
};

export type bookingType = {
  id: string;
  transportId: string;
  status: string | null;
  tourId: string;
  userId: string;
}
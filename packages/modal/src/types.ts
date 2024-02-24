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
  longitude: string | null;
  latitude: string | null;
  zoom: string | null;
  address: string | null;
  description: string | null;
};

import { db } from "./database";
import * as schema from "./schema";
import { eq } from "drizzle-orm";
import {
  userType,
  siteType,
  transportType,
  tourType,
  queryType,
  reviewType,
  bookingType,
} from "./types";

export const getUser = async (id: string) =>
  await db.query.users.findFirst({
    where(fields, operators) {
      return eq(schema.users.id, id);
    },
  });

export const getUsers = async () => await db.query.users.findMany();

export const addUser = async (payload: userType, password: string) =>
  await db.insert(schema.users).values({ ...payload, password });

export const updateUser = async (payload: userType) =>
  await db
    .update(schema.users)
    .set({ ...payload })
    .where(eq(schema.users.id, payload.id));

export const deleteUser = async (id: string) =>
  await db.delete(schema.users).where(eq(schema.users.id, id));

// Sites

export const getSites = async () => await db.query.site.findMany();

export const addSite = async (payload: siteType) =>
  await db.insert(schema.site).values({ ...payload });

export const updateSite = async (payload: siteType) =>
  await db
    .update(schema.site)
    .set({ ...payload })
    .where(eq(schema.site.id, payload.id));

export const deleteSite = async (id: string) =>
  await db.delete(schema.site).where(eq(schema.site.id, id));

// Transports

export const getTransports = async () => await db.query.transport.findMany();

export const addTransport = async (payload: transportType) =>
  await db.insert(schema.transport).values({ ...payload });

export const updateTransport = async (payload: transportType) =>
  await db
    .update(schema.transport)
    .set({ ...payload })
    .where(eq(schema.transport.id, payload.id));

export const deleteTransport = async (id: string) =>
  await db.delete(schema.transport).where(eq(schema.transport.id, id));

// Tours

export const getTours = async () => await db.query.tour.findMany();

export const addTour = async (payload: tourType) =>
  await db.insert(schema.tour).values({ ...payload });

export const updateTour = async (payload: tourType) =>
  await db
    .update(schema.tour)
    .set({ ...payload })
    .where(eq(schema.tour.id, payload.id));

export const deleteTour = async (id: string) =>
  await db.delete(schema.tour).where(eq(schema.tour.id, id));

// Bookings

export const getBookings = async () => await db.query.booking.findMany();

export const addBooking = async (payload: bookingType) =>
  await db.insert(schema.booking).values({ ...payload });

export const updateBooking = async (payload: bookingType) =>
  await db
    .update(schema.booking)
    .set({ ...payload })
    .where(eq(schema.booking.id, payload.id));

export const deleteBooking = async (id: string) =>
  await db.delete(schema.booking).where(eq(schema.booking.id, id));

// Query

export const getQuerys = async () => await db.query.query.findMany();

export const addQuery = async (payload: queryType) =>
  await db.insert(schema.query).values({ ...payload });

export const updateQuery = async (payload: queryType) =>
  await db
    .update(schema.query)
    .set({ ...payload })
    .where(eq(schema.query.id, payload.id));

export const deleteQuery = async (id: string) =>
  await db.delete(schema.query).where(eq(schema.query.id, id));

export const getReviews = async () => await db.query.review.findMany();

export const addReview = async (payload: reviewType) =>
  await db.insert(schema.review).values({ ...payload });

export const updateReview = async (payload: reviewType) =>
  await db
    .update(schema.review)
    .set({ ...payload })
    .where(eq(schema.review.id, payload.id));

export const deleteReview = async (id: string) =>
  await db.delete(schema.review).where(eq(schema.review.id, id));

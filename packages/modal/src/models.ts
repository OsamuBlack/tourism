import { db } from "./database";
import * as schema from "./schema";
import { eq } from "drizzle-orm";
import { userType, siteType } from "./types";

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

//

import { time } from "drizzle-orm/pg-core";
import { date, pgTable, text, integer, numeric } from "drizzle-orm/pg-core";

export const users = pgTable("user", {
  id: text("id").notNull().primaryKey().default(crypto.randomUUID()),
  name: text("name"),
  email: text("email").notNull(),
  image: text("image"),
  password: text("password").notNull(),
  role: text("role").notNull().default("user"),
});

export const site = pgTable("site", {
  id: text("id").notNull().primaryKey().default(crypto.randomUUID()),
  name: text("name"),
  urduName: text("urduTitle"),
  longitude: numeric("longitude"),
  latitude: numeric("latitude"),
  zoom: numeric("zoom"),
  heroImage: text("heroImage"),
  address: text("adderss"),
  description: text("description"),
  urduDescription: text("urduDescription"),
});

export const transport = pgTable("transport", {
  id: text("id").notNull().primaryKey().default(crypto.randomUUID()),
  name: text("name"),
  urduName: text("urduTitle"),
  heroImage: text("heroImage"),
  capacity: integer("capacity"),
  description: text("description"),
  urduDescription: text("urduDescription"),
});

export const tour = pgTable("tour", {
  id: text("id").notNull().primaryKey().default(crypto.randomUUID()),
  name: text("text"),
  urduName: text("urduTitle"),
  siteId: text("siteId")
    .notNull()
    .references(() => site.id, { onDelete: "cascade" }),
  transportId: text("transportId")
    .notNull()
    .references(() => transport.id, { onDelete: "cascade" }),
  longitude: numeric("longitude"),
  latitude: numeric("latitude"),
  zoom: numeric("zoom"),
  departureDate: date("departureDate"),
  departureTime: text("departureTime"),
  heroImage: text("heroImage"),
  duration: integer("duration"),
  price: numeric("price"),
  priceUSD: numeric("priceUSD"),
  description: text("description"),
  urduDescription: text("urduDescription"),
});

export const booking = pgTable("booking", {
  id: text("id").notNull().primaryKey().default(crypto.randomUUID()),
  status: text("status"),
  tourId: text("tourId")
    .notNull()
    .references(() => tour.id, { onDelete: "cascade" }),
  transportId: text("transportId")
    .notNull()
    .references(() => transport.id, { onDelete: "cascade" }),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

export const query = pgTable("query", {
  id: text("id").notNull().primaryKey().default(crypto.randomUUID()),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  query: text("query").notNull(),
});

export const review = pgTable("review", {
  id: text("id").notNull().primaryKey().default(crypto.randomUUID()),
  content: text("content").notNull(),
  ratting: integer("ratting"),
  tourId: text("tourId")
    .notNull()
    .references(() => tour.id, { onDelete: "cascade" }),
});

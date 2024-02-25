import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import bcrypt from "bcryptjs";
import { db } from "@repo/modal/db";
import { addUser } from "@repo/modal/models";
const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials) return null;
        if (
          credentials.email === process.env.ADMIN_EMAIL &&
          credentials.password === process.env.ADMIN_PASSWORD
        ) {
          const user = {
            id: "-1",
            email: process.env.ADMIN_EMAIL,
            role: "Admin",
          };

          return user;
        } else {
          const user = await db.query.users.findFirst({
            where(fields, operators) {
              return operators.eq(fields.email, credentials.email);
            },
          });

          if (user) {
            const valid = await bcrypt.compare(
              credentials.password,
              user.password
            );

            if (valid && user.role == "admin") return user;
            return null;
          } else if (user) {
            const password = await bcrypt.hash(credentials.password, 10);
            const res = addUser(user, password);
            return null;
          }
          return null;
        }
      },
    }),
  ],
};

export default authOptions;

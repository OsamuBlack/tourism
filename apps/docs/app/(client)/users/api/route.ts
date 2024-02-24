// import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../database";
import { userType } from "../types";
import bcrypt from "bcryptjs";
import { users as userSchema } from "../../../../schema";
import { eq } from "drizzle-orm";

export async function GET(request: NextRequest) {
  // const token = request.nextUrl.searchParams.get("token");

  let users;
  // const session = await getServerSession(authOptions);
  // if (session) {
  try {
    users = await db.query.users.findMany();
    return NextResponse.json({
      users: users,
      status: 200,
    });
  } catch (e) {
    console.log("Error", e);
    return NextResponse.json({
      users: null,
      status: 500,
    });
  }
  // }
  // else {
  //   return NextResponse.json({
  //     users: null,
  //     status: 401,
  //   });
  // }
}

export async function POST(request: NextRequest) {
  let payload: userType = await request.json();
  const password = await bcrypt.hash("000000", 10);

  try {
    await db.insert(userSchema).values({ ...payload, password });
    return NextResponse.json({
      status: 200,
    });
  } catch (e) {
    console.log("Error", e);
    return NextResponse.json({
      users: null,
      status: 500,
    });
  }
}

export async function PUT(request: NextRequest) {
  let payload: userType = await request.json();

  try {
    await db
      .update(userSchema)
      .set({ ...payload })
      .where(eq(userSchema.id, payload.id));
    return NextResponse.json({
      status: 200,
    });
  } catch (e) {
    console.log("Error", e);
    return NextResponse.json({
      users: null,
      status: 500,
    });
  }
}

export async function DELETE(request: NextRequest) {
  let id: string = await request.json();

  try {
    await db.delete(userSchema).where(eq(userSchema.id, id));
    return NextResponse.json({
      status: 200,
    });
  } catch (e) {
    console.log("Error", e);
    return NextResponse.json({
      users: null,
      status: 500,
    });
  }
}

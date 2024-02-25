// import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { userType } from "@repo/modal/types";
import bcrypt from "bcryptjs";
import { getUsers, addUser, updateUser, deleteUser } from "@repo/modal/models";
import { getServerSession } from "next-auth";
import authOptions from "../../authOptions";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");

  let users;
  const session = await getServerSession(authOptions);
  if (session) {
    try {
      users = await getUsers();
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
  } else {
    return NextResponse.json({
      users: null,
      status: 401,
    });
  }
}

export async function POST(request: NextRequest) {
  let payload: userType = await request.json();
  const password = await bcrypt.hash("000000", 10);

  try {
    addUser(payload, password);
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
    updateUser(payload);
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
    deleteUser(id);
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

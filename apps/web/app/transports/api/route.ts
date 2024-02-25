// import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { transportType } from "@repo/modal/types";
import { getTransports, addTransport, updateTransport, deleteTransport } from "@repo/modal/models";

export async function GET(request: NextRequest) {
  let transports;
  try {
    transports = await getTransports();
    return NextResponse.json({
      transports: transports,
      status: 200,
    });
  } catch (e) {
    console.log("Error", e);
    return NextResponse.json({
      transports: null,
      status: 500,
    });
  }
}

export async function POST(request: NextRequest) {
  let payload: transportType = await request.json();

  try {
    addTransport(payload);
    return NextResponse.json({
      status: 200,
    });
  } catch (e) {
    console.log("Error", e);
    return NextResponse.json({
      transports: null,
      status: 500,
    });
  }
}

export async function PUT(request: NextRequest) {
  let payload: transportType = await request.json();

  try {
    updateTransport(payload);
    return NextResponse.json({
      status: 200,
    });
  } catch (e) {
    console.log("Error", e);
    return NextResponse.json({
      transports: null,
      status: 500,
    });
  }
}

export async function DELETE(request: NextRequest) {
  let id: string = await request.json();

  try {
    deleteTransport(id);
    return NextResponse.json({
      status: 200,
    });
  } catch (e) {
    console.log("Error", e);
    return NextResponse.json({
      transports: null,
      status: 500,
    });
  }
}

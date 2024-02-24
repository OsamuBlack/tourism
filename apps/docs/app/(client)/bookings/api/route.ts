// import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { bookingType } from "@repo/modal/types";
import { getBookings, addBooking, updateBooking, deleteBooking } from "@repo/modal/models";

export async function GET(request: NextRequest) {
  let bookings;
  try {
    bookings = await getBookings();
    return NextResponse.json({
      bookings: bookings,
      status: 200,
    });
  } catch (e) {
    console.log("Error", e);
    return NextResponse.json({
      bookings: null,
      status: 500,
    });
  }
}

export async function POST(request: NextRequest) {
  let payload: bookingType = await request.json();

  try {
    addBooking(payload);
    return NextResponse.json({
      status: 200,
    });
  } catch (e) {
    console.log("Error", e);
    return NextResponse.json({
      bookings: null,
      status: 500,
    });
  }
}

export async function PUT(request: NextRequest) {
  let payload: bookingType = await request.json();

  try {
    updateBooking(payload);
    return NextResponse.json({
      status: 200,
    });
  } catch (e) {
    console.log("Error", e);
    return NextResponse.json({
      bookings: null,
      status: 500,
    });
  }
}

export async function DELETE(request: NextRequest) {
  let id: string = await request.json();

  try {
    deleteBooking(id);
    return NextResponse.json({
      status: 200,
    });
  } catch (e) {
    console.log("Error", e);
    return NextResponse.json({
      bookings: null,
      status: 500,
    });
  }
}

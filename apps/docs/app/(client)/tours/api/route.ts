// import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { tourType } from "@repo/modal/types";
import { getTours, addTour, updateTour, deleteTour } from "@repo/modal/models";

export async function GET(request: NextRequest) {
  let tours;
  try {
    tours = await getTours();
    return NextResponse.json({
      tours: tours,
      status: 200,
    });
  } catch (e) {
    console.log("Error", e);
    return NextResponse.json({
      tours: null,
      status: 500,
    });
  }
}

export async function POST(request: NextRequest) {
  let payload: tourType = await request.json();

  try {
    addTour(payload);
    return NextResponse.json({
      status: 200,
    });
  } catch (e) {
    console.log("Error", e);
    return NextResponse.json({
      tours: null,
      status: 500,
    });
  }
}

export async function PUT(request: NextRequest) {
  let payload: tourType = await request.json();

  try {
    updateTour(payload);
    return NextResponse.json({
      status: 200,
    });
  } catch (e) {
    console.log("Error", e);
    return NextResponse.json({
      tours: null,
      status: 500,
    });
  }
}

export async function DELETE(request: NextRequest) {
  let id: string = await request.json();

  try {
    deleteTour(id);
    return NextResponse.json({
      status: 200,
    });
  } catch (e) {
    console.log("Error", e);
    return NextResponse.json({
      tours: null,
      status: 500,
    });
  }
}

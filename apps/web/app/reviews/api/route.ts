// import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { reviewType } from "@repo/modal/types";
import { getReviews, addReview, updateReview, deleteReview } from "@repo/modal/models";

export async function GET(request: NextRequest) {
  let reviews;
  try {
    reviews = await getReviews();
    return NextResponse.json({
      reviews: reviews,
      status: 200,
    });
  } catch (e) {
    console.log("Error", e);
    return NextResponse.json({
      reviews: null,
      status: 500,
    });
  }
}

export async function POST(request: NextRequest) {
  let payload: reviewType = await request.json();

  try {
    addReview(payload);
    return NextResponse.json({
      status: 200,
    });
  } catch (e) {
    console.log("Error", e);
    return NextResponse.json({
      reviews: null,
      status: 500,
    });
  }
}

export async function PUT(request: NextRequest) {
  let payload: reviewType = await request.json();

  try {
    updateReview(payload);
    return NextResponse.json({
      status: 200,
    });
  } catch (e) {
    console.log("Error", e);
    return NextResponse.json({
      reviews: null,
      status: 500,
    });
  }
}

export async function DELETE(request: NextRequest) {
  let id: string = await request.json();

  try {
    deleteReview(id);
    return NextResponse.json({
      status: 200,
    });
  } catch (e) {
    console.log("Error", e);
    return NextResponse.json({
      reviews: null,
      status: 500,
    });
  }
}

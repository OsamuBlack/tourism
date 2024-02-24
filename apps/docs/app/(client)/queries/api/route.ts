// import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { queryType } from "@repo/modal/types";
import { getQuerys, addQuery, updateQuery, deleteQuery } from "@repo/modal/models";

export async function GET(request: NextRequest) {
  let querys;
  try {
    querys = await getQuerys();
    return NextResponse.json({
      querys: querys,
      status: 200,
    });
  } catch (e) {
    console.log("Error", e);
    return NextResponse.json({
      querys: null,
      status: 500,
    });
  }
}

export async function POST(request: NextRequest) {
  let payload: queryType = await request.json();

  try {
    addQuery(payload);
    return NextResponse.json({
      status: 200,
    });
  } catch (e) {
    console.log("Error", e);
    return NextResponse.json({
      querys: null,
      status: 500,
    });
  }
}

export async function PUT(request: NextRequest) {
  let payload: queryType = await request.json();

  try {
    updateQuery(payload);
    return NextResponse.json({
      status: 200,
    });
  } catch (e) {
    console.log("Error", e);
    return NextResponse.json({
      querys: null,
      status: 500,
    });
  }
}

export async function DELETE(request: NextRequest) {
  let id: string = await request.json();

  try {
    deleteQuery(id);
    return NextResponse.json({
      status: 200,
    });
  } catch (e) {
    console.log("Error", e);
    return NextResponse.json({
      querys: null,
      status: 500,
    });
  }
}

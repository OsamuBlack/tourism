// import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { siteType } from "@repo/modal/types";
import { getSites, addSite, updateSite, deleteSite } from "@repo/modal/models";

export async function GET(request: NextRequest) {
  let sites;
  try {
    sites = await getSites();
    return NextResponse.json({
      sites: sites,
      status: 200,
    });
  } catch (e) {
    console.log("Error", e);
    return NextResponse.json({
      sites: null,
      status: 500,
    });
  }
}

export async function POST(request: NextRequest) {
  let payload: siteType = await request.json();

  try {
    addSite(payload);
    return NextResponse.json({
      status: 200,
    });
  } catch (e) {
    console.log("Error", e);
    return NextResponse.json({
      sites: null,
      status: 500,
    });
  }
}

export async function PUT(request: NextRequest) {
  let payload: siteType = await request.json();

  try {
    updateSite(payload);
    return NextResponse.json({
      status: 200,
    });
  } catch (e) {
    console.log("Error", e);
    return NextResponse.json({
      sites: null,
      status: 500,
    });
  }
}

export async function DELETE(request: NextRequest) {
  let id: string = await request.json();

  try {
    deleteSite(id);
    return NextResponse.json({
      status: 200,
    });
  } catch (e) {
    console.log("Error", e);
    return NextResponse.json({
      sites: null,
      status: 500,
    });
  }
}

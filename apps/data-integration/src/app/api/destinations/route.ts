import { getDestinations } from "@/lib/database";
import { NextResponse } from "next/server";

export async function GET() {
  try{
    const destinations = getDestinations();
    return NextResponse.json(destinations);
  }
  catch (err) {
    return NextResponse.json({ error: 'Failed to fetch schedules' }, { status: 500 });
  }
}
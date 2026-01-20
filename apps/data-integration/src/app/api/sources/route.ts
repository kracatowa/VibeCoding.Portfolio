import { getSources } from "@/lib/database";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const sources = getSources();
    return NextResponse.json( sources );
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch sources' }, { status: 500 });
  }
}
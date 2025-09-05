import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const isAuthenticated = (await cookies()).get("isAuthenticated")?.value === "true";
  return NextResponse.json({ isAuthenticated });
}
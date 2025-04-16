import { apiURL } from "@/utils/api";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  console.log("Logging out...");
  const backendRes = await fetch(`${apiURL}/logout`, {
    method: "POST",
  });

  if (!backendRes.ok) {
    return NextResponse.json({
      status: backendRes.status,
      message: "Failed to logout user",
    });
  }
  console.log("Logged out successfully!");

  const cookieStore = await cookies();
  cookieStore.delete("JSESSIONID");

  const response = NextResponse.json({ success: true });

  return response;
}

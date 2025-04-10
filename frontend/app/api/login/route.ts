import { apiURL } from "@/utils/api";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  console.log(`Requesting login for: ${body}`);
  const backendRes = await fetch(`${apiURL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const backendBody = await backendRes.json();

  if (!backendRes.ok) {
    return NextResponse.json(
      { message: backendBody.message || "Login failed" },
      { status: backendRes.status }
    );
  }

  const cookie = backendRes.headers.get("set-cookie");

  const response = NextResponse.json({ success: true });

  if (cookie) {
    response.headers.set("Set-Cookie", cookie);
  }

  console.log(`User ${body?.email} logged in`);
  return response;
}

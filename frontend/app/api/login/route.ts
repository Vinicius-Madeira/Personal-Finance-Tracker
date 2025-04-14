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

  if (!backendRes.ok) {
    return NextResponse.json(
      { message: "Login failed" },
      { status: backendRes.status }
    );
  }
  const backendBody = await backendRes.json();

  const response = NextResponse.json(backendBody);

  const cookie = backendRes.headers.get("set-cookie");
  if (cookie) {
    response.headers.set("Set-Cookie", cookie);
  }

  console.log(`User ${body?.email} logged in`);
  return response;
}

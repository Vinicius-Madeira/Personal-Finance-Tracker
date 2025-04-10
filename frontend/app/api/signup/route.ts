import { apiURL } from "@/utils/api";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  console.log("Sending new user credentials...");
  const backendRes = await fetch(`${apiURL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  // const backendBody = await backendRes.json();

  if (!backendRes.ok) {
    return NextResponse.json(
      // { message: backendBody.message || "Signup failed" },
      { status: backendRes.status }
    );
  }

  const response = NextResponse.json({ success: true });

  console.log("User successfully created!");
  return response;
}

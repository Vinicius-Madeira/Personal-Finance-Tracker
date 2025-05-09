import { apiURL } from "@/utils/api";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: NextRequest) {
  try {
    // Replace this with your actual backend API call
    const backendResponse = await fetchPDF();

    // Return the PDF bytes with appropriate headers
    return new NextResponse(backendResponse, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="report.pdf"',
      },
    });
  } catch (error) {
    console.error("Error fetching PDF:", error);
    return new NextResponse(JSON.stringify({ error: "Failed to fetch PDF" }), {
      status: 500,
    });
  }
}

async function fetchPDF(): Promise<Uint8Array> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("JSESSIONID");

  if (!sessionCookie) {
    console.log("no session cookie found");
    throw new Error("No session cookie found");
  }

  const response = await fetch(`${apiURL}/api/report/pdf`, {
    method: "GET",
    headers: {
      "Content-Type": "application/pdf",

      Cookie: `JSESSIONID=${sessionCookie.value}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch PDF");
  }

  const pdfBytes = await response.arrayBuffer();
  return new Uint8Array(pdfBytes);
}

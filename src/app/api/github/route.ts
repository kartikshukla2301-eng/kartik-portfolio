import { NextResponse } from "next/server";
import { fetchGitHubData } from "@/lib/github";

export const revalidate = 1800;

export async function GET() {
  try {
    const data = await fetchGitHubData();
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=3600",
      },
    });
  } catch (error) {
    console.error("GitHub API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch GitHub data" },
      { status: 502 }
    );
  }
}

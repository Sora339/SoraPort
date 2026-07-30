// app/api/ogp/route.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { load } from "cheerio";
import type { OgpResponse } from "@/types/ogp";

const CACHE_CONTROL = "public, s-maxage=3600, stale-while-revalidate=86400";

export async function GET(request: NextRequest): Promise<NextResponse<OgpResponse>> {
  const url = request.nextUrl.searchParams.get("url");
  if (!url) {
    return NextResponse.json({ success: false, error: "URL is required" }, { status: 400 });
  }

  let targetUrl: URL;
  try {
    targetUrl = new URL(url);
  } catch {
    return NextResponse.json({ success: false, error: "Invalid URL" }, { status: 400 });
  }

  if (targetUrl.protocol !== "http:" && targetUrl.protocol !== "https:") {
    return NextResponse.json({ success: false, error: "Unsupported URL protocol" }, { status: 400 });
  }

  try {
    const response = await fetch(targetUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; SoraPort-OGP/1.0)",
      },
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      throw new Error(`Upstream request failed with status ${response.status}`);
    }

    const html = await response.text();
    const $ = load(html);

    // OGPデータの抽出
    const ogpData = {
      title: $("meta[property='og:title']").attr("content") || $("title").text() || url,
      description: $("meta[property='og:description']").attr("content") || $("meta[name='description']").attr("content"),
      image: $("meta[property='og:image']").attr("content"),
      siteName: $("meta[property='og:site_name']").attr("content"),
      url,
    };

    if (ogpData.image) {
      ogpData.image = new URL(ogpData.image, targetUrl).toString();
    }

    return NextResponse.json(
      { success: true, ogp: ogpData },
      {
        headers: {
          "Cache-Control": CACHE_CONTROL,
        },
      },
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}

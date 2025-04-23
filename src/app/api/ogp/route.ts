// app/api/ogp/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { load } from 'cheerio';
import { OgpResponse } from '@/types/ogp';

export async function GET(request: NextRequest): Promise<NextResponse<OgpResponse>> {
  const url = request.nextUrl.searchParams.get('url');
  if (!url) {
    return NextResponse.json({ success: false, error: 'URL is required' }, { status: 400 });
  }

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; nextsorablog/1.0)',
        'Referer': 'https://nextsorablog.com'
      }
    });
    
    const html = await response.text();
    const $ = load(html);

    // OGPデータの抽出
    const ogpData = {
      title: $('meta[property="og:title"]').attr('content') || $('title').text() || url,
      description: $('meta[property="og:description"]').attr('content') || $('meta[name="description"]').attr('content'),
      image: $('meta[property="og:image"]').attr('content'),
      siteName: $('meta[property="og:site_name"]').attr('content'),
      url: url
    };

    return NextResponse.json(
      { success: true, ogp: ogpData },
      { 
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        } 
      }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
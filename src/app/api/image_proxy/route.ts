import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const imageUrl = request.nextUrl.searchParams.get('url');
  
  if (!imageUrl) {
    return new Response('画像URLが必要です', { status: 400 });
  }
  
  try {
    console.log(`画像プロキシ: ${imageUrl}`); // デバッグ用ログ
    
    const response = await fetch(imageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; nextsorablog/1.0)',
        'Referer': 'https://nextsorablog.com'
      }
    });
    
    if (!response.ok) {
      console.error(`画像取得エラー: ${response.status} ${response.statusText}`);
      return new Response(`画像の取得に失敗しました: ${response.statusText}`, { status: response.status });
    }
    
    const contentType = response.headers.get('content-type');
    const buffer = await response.arrayBuffer();
    
    return new Response(buffer, {
      headers: {
        'Content-Type': contentType || 'image/jpeg',
        'Cache-Control': 'public, max-age=86400'
      }
    });
  } catch (error) {
    console.error('画像プロキシエラー:', error);
    return new Response(`画像取得エラー: ${error instanceof Error ? error.message : '不明なエラー'}`, { 
      status: 500 
    });
  }
}
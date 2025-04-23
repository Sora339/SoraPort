"use client";
import { useState, useEffect, ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

interface OgpData {
  title: string;
  description?: string | null; // nullも許容するように修正
  image?: string | null; // nullも許容するように修正
  siteName?: string | null; // nullも許容するように修正
  url: string;
}

interface LinkPreviewProps {
  url: string;
  children: ReactNode;
}

const CORS_PROXIES = [
  "https://api.codetabs.com/v1/proxy?quest="
];


export function LinkPreview({ url, children }: LinkPreviewProps): JSX.Element {
  const [ogpData, setOgpData] = useState<OgpData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchOgpDataClient = async (): Promise<void> => {
      for (const proxy of CORS_PROXIES) {
        try {
          // 各プロキシを試す
          const proxyUrl = `${proxy}${encodeURIComponent(url)}`;
          const response = await fetch(proxyUrl);
          
          // レスポンスの形式に応じて処理を変える
          let html = '';
          if (proxy.includes('allorigins')) {
            const data = await response.json();
            html = data.contents;
          } else {
            html = await response.text();
          }

          // HTMLがない場合は次のプロキシを試す
          if (!html) {
            continue;
          }
          
          // DOMParserはブラウザ環境でのみ使用可能
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, 'text/html');
          
          const ogp: OgpData = {
            title: doc.querySelector('meta[property="og:title"]')?.getAttribute('content') || 
                   doc.querySelector('title')?.textContent || url,
            description: doc.querySelector('meta[property="og:description"]')?.getAttribute('content') || 
                       doc.querySelector('meta[name="description"]')?.getAttribute('content') || '',
            image: doc.querySelector('meta[property="og:image"]')?.getAttribute('content') || null,
            siteName: doc.querySelector('meta[property="og:site_name"]')?.getAttribute('content') || null,
            url: url
          };
          
          // 有効なOGPデータが取得できたら設定して処理終了
          if (ogp.title && (ogp.title !== url || ogp.image)) {
            setOgpData(ogp);
            setLoading(false);
            return;
          }
        } catch (err) {
          console.error(`${proxy}でのOGP取得エラー:`, err);
          // エラーが発生しても次のプロキシを試す
          continue;
        }
      }
      
      // すべてのプロキシで失敗した場合
      console.error('すべてのプロキシでOGP取得に失敗');
      setError(true);
      setLoading(false);
    };

    fetchOgpDataClient();
  }, [url]);


  if (loading) {
    return (
      <div className="my-4">
        <div className="block no-underline">
          <Card className="overflow-hidden">
            <div className="flex sm:flex-row items-center">
              <div className="w-[30%] sm:w-[50%] md:w-[60%] lg:w-[45%] xl:w-[40%] 2xl:w-[35%]">
                <Skeleton className="w-full aspect-video" />
              </div>
              <CardContent className="w-full p-2 sm:p-4 sm:py-0 sm:pt-2">
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-4/5" />
                </div>
              </CardContent>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (error || !ogpData) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline"
      >
        {children}
      </a>
    );
  }

  return (
    <div className="my-4">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="no-underline block"
      >
        <Card className="overflow-hidden hover:shadow-md transition-shadow">
          <div className="flex sm:flex-row items-center">
            {ogpData.image && (
              <div className="w-[30%] sm:w-[50%] md:w-[60%] lg:w-[45%] xl:w-[40%] 2xl:w-[35%] h-fit relative">
                <Image
                  src={ogpData.image}
                  alt={ogpData.title || "リンクプレビュー"}
                  width={500}
                  height={330}
                  className="object-cover aspect-square sm:aspect-video my-0"
                  unoptimized={true} // 外部画像の最適化をスキップ
                />
              </div>
            )}
            <CardContent className="w-full p-2 sm:p-4 sm:py-0 sm:pt-2">
              <div className="flex flex-col 2xl:gap-1">
                <div className="text-sm text-gray-500 sm:mb-1 truncate">
                  {new URL(url).host}
                </div>
                <h4 className="font-medium text-base h-[3rem] line-clamp-2 mt-1 mb-4">
                  {ogpData.title || url}
                </h4>
              </div>
            </CardContent>
          </div>
        </Card>
      </a>
    </div>
  );
}

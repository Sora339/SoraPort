"use client";
import { useState, useEffect, ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { OgpData } from "@/types/ogp";

interface LinkPreviewProps {
  url: string;
  children: ReactNode;
}

export function LinkPreview({ url, children }: LinkPreviewProps): JSX.Element {
  const [ogpData, setOgpData] = useState<OgpData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchOgpData = async (): Promise<void> => {
      try {
        const response = await fetch(`/api/ogp?url=${encodeURIComponent(url)}`);
        const data = await response.json();

        if (data.success && data.ogp) {
          setOgpData({ ...data.ogp, url });
        } else {
          setError(true);
        }
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchOgpData();
  }, [url]);

  // 外部画像URLをプロキシ経由に変換する関数
  const getProxiedImageUrl = (originalUrl: string) => {
    if (!originalUrl) return "";

    // 自分のドメインの画像はそのまま返す
    if (
      originalUrl.startsWith("/") ||
      originalUrl.includes("nextsorablog.com")
    ) {
      return originalUrl;
    }

    // 外部画像はプロキシを使用
    return `/api/image_proxy?url=${encodeURIComponent(originalUrl)}`;
  };

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
                  src={getProxiedImageUrl(ogpData.image)}
                  alt={ogpData.title || "リンクプレビュー"}
                  width={500}
                  height={330}
                  className="object-cover aspect-square sm:aspect-video my-0"
                  unoptimized={!ogpData.image.startsWith("/")} // 外部画像はNext.jsの最適化を無効化
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

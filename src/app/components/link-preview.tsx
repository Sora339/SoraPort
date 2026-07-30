"use client";
import type { ReactNode } from "react";
import useSWR from "swr";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import type { OgpData, OgpResponse } from "@/types/ogp";

interface LinkPreviewProps {
  url: string;
  children: ReactNode;
}

const ogpFetcher = async (url: string): Promise<OgpData> => {
  const response = await fetch(`/api/ogp?url=${encodeURIComponent(url)}`);
  if (!response.ok) {
    throw new Error("Failed to fetch OGP data");
  }

  const data: OgpResponse = await response.json();
  if (!data.success || !data.ogp) {
    throw new Error(data.error || "Failed to fetch OGP data");
  }

  return data.ogp;
};

export function LinkPreview({ url, children }: LinkPreviewProps) {
  const { data, error, isLoading } = useSWR(url, ogpFetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    shouldRetryOnError: false,
  });

  if (isLoading) {
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

  if (error || !data) {
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
            {data.image && (
              <div className="w-[30%] sm:w-[50%] md:w-[60%] lg:w-[45%] xl:w-[40%] 2xl:w-[35%] h-fit relative">
                <Image
                  src={data.image}
                  alt={data.title || "リンクプレビュー"}
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
                  {data.title || url}
                </h4>
              </div>
            </CardContent>
          </div>
        </Card>
      </a>
    </div>
  );
}

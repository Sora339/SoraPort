import { notFound } from "next/navigation";
import { getWorkDetail } from "@/lib/microcms";
import { cookies, draftMode } from "next/headers";
import { Metadata } from "next";
import WorkArticle from "@/app/components/work-article";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ postId: string }>;
}): Promise<Metadata> {
  const { postId } = await params;
  const draftKey = (await cookies()).get("draftKey")?.value;
  const work = draftKey
    ? await getWorkDetail(postId, { draftKey })
    : null;

  if (!work) {
    return {
      title: "記事が見つかりません",
      description: "お探しの記事は存在しないか、削除された可能性があります。",
      robots: {
        index: false,
      },
    };
  }

  const metadata: Metadata = {
    title: `${work.title} | SoraPort`,
    description: `${work.title}に関する記事です`,
    openGraph: {
      title: `${work.title} | SoraPort`,
      description: `${work.title}に関する記事です`,
      type: "article",
      url: `https://nextsorablog.com/blog/${postId}`,
      siteName: "SoraPort",
      images: work.eyecatch
        ? [
            {
              url: work.eyecatch.url,
              width: work.eyecatch.width,
              height: work.eyecatch.height,
              alt: work.title,
            },
          ]
        : [
            {
              url: "https://nextsorablog.com/img/ogp.png",
              width: 1200,
              height: 630,
              alt: work.title,
            },
          ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${work.title} | SoraPort`,
      description: `${work.title}に関する記事です`,
      site: "@SoraPort",
      images: work.eyecatch
        ? [
            {
              url: work.eyecatch.url,
              alt: work.title,
            },
          ]
        : [
            {
              url: "https://nextsorablog.com/img/ogp.png",
              alt: work.title,
            },
          ],
    },
    robots: {
      index: false,
    },
  };

  return metadata;
}

export default async function WorkDraftDetailPage({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = await params;
  const { isEnabled } = await draftMode();
  const draftKey = (await cookies()).get("draftKey")?.value;

  if (!draftKey) {
    notFound();
  }

  const article = await getWorkDetail(postId, { draftKey });

  if (!article) {
    //console.error("Post not found:", postId);
    notFound();
  }

  return (
    <>
      {isEnabled && (
        <div className="text-lg">
          プレビューモード中 - これは下書きのプレビューです
        </div>
      )}
      <WorkArticle content={article} />
    </>
  );
}

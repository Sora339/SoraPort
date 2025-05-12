import { notFound } from "next/navigation";
import { getWorkDetail, getWorkList } from "@/lib/microcms";
import { draftMode } from "next/headers";
import { Metadata } from "next";
import WorkArticle from "@/app/components/work-article";

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { postId: string },
  searchParams: { draftKey?: string };
}): Promise<Metadata> {
  // パラメータを確認
  console.log("Generating metadata for:", params);
  
  const work = await getWorkDetail(params.postId);
  
  if (!work) {
    return {
      title: "記事が見つかりません",
      description: "お探しの記事は存在しないか、削除された可能性があります。",
    };
  }
  
  // メタデータを生成
  const metadata: Metadata = {
    title: `${work.title} | SoraPort`,
    description: `${work.title}に関する記事です`,
    openGraph: {
      title: `${work.title} | SoraPort`,
      description: `${work.title}に関する記事です`,
      type: "article",
      url: `https://nextsorablog.com/blog/${params.postId}`,
      siteName: "SoraPort",  // ルートから継承したい値を明示的に設定
      images: work.eyecatch ? [
        {
          url: work.eyecatch.url,
          width: work.eyecatch.width,
          height: work.eyecatch.height,
          alt: work.title,
        }
      ] : [
        {
          url: "https://nextsorablog.com/img/ogp.png",  // デフォルト画像
          width: 1200,
          height: 630,
          alt: work.title,
        }
      ],
    },
    // Twitterカードも設定
    twitter: {
      card: "summary_large_image",
      title: `${work.title} | SoraPort`,
      description: `${work.title}に関する記事です`,
      site: "@SoraPort",
      images: work.eyecatch ? [
        {
          url: work.eyecatch.url,
          alt: work.title,
        }
      ] : [
        {
          url: "https://nextsorablog.com/img/ogp.png",
          alt: work.title,
        }
      ],
    },
  };

  if (searchParams.draftKey) {
    metadata.robots = {
      index: false,
    };
  }
  
  console.log("Generated metadata:", metadata);
  return metadata;
}

export async function generateStaticParams() {
  const { contents } = await getWorkList();

  const paths = contents
    .filter((post) => post.id)
    .map((post) => ({
      postId: post.id.toString(),
    }));

  return paths;
}

export default async function WorkDetailPage({
  params: { postId },
  searchParams,
}: {
  params: { postId: string };
  searchParams: { draftKey?: string };
}) {
  const { isEnabled } = draftMode();

  // Draft Modeが有効な場合または直接draftKeyが指定されている場合
  // draftKeyを含めてコンテンツを取得
  const queries = searchParams.draftKey
    ? { draftKey: searchParams.draftKey }
    : {};
  const article = await getWorkDetail(postId, queries);

  if (!article) {
    console.error("Post not found:", postId);
    notFound();
  }

  return (
    <>
      {(isEnabled || searchParams.draftKey) && (
        <div className="text-lg">
          プレビューモード中 - これは下書きのプレビューです
        </div>
      )}
      <WorkArticle content={article} />
    </>
  );
}

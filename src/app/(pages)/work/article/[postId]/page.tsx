import { notFound } from "next/navigation";
import { getWorkDetail, getWorkList } from "@/lib/microcms";
import { Metadata } from "next";
import WorkArticle from "@/app/components/work-article";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ postId: string }>;
}): Promise<Metadata> {
  // パラメータを確認
  const { postId } = await params;
  const work = await getWorkDetail(postId);
  
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
      url: `https://nextsoraport.digital/blog/${postId}`,
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
          url: "https://nextsoraport.digital/img/ogp.png",  // デフォルト画像
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
          url: "https://nextsoraport.digital/img/ogp.png",
          alt: work.title,
        }
      ],
    },
  };

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
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = await params;
  const article = await getWorkDetail(postId);

  if (!article) {
    //console.error("Post not found:", postId);
    notFound();
  }

  return (
    <>
      <WorkArticle content={article} />
    </>
  );
}

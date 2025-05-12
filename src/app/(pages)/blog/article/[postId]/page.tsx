import { notFound } from "next/navigation";
import { getBlogDetail, getBlogList } from "@/lib/microcms";
import BlogArticle from "@/app/components/blog-article";
import { draftMode } from "next/headers";
import { Metadata } from "next";

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { postId: string },
  searchParams: { draftKey?: string };
}): Promise<Metadata> {
  // パラメータを確認
  console.log("Generating metadata for:", params);
  
  const blog = await getBlogDetail(params.postId);
  
  if (!blog) {
    return {
      title: "記事が見つかりません",
      description: "お探しの記事は存在しないか、削除された可能性があります。",
    };
  }
  
  // メタデータを生成
  const metadata: Metadata = {
    title: `${blog.title} | SoraPort`,
    description: `${blog.title}に関する記事です`,
    openGraph: {
      title: `${blog.title} | SoraPort`,
      description: `${blog.title}に関する記事です`,
      type: "article",
      url: `https://nextsorablog.com/blog/${params.postId}`,
      siteName: "SoraPort",  // ルートから継承したい値を明示的に設定
      images: blog.eyecatch ? [
        {
          url: blog.eyecatch.url,
          width: blog.eyecatch.width,
          height: blog.eyecatch.height,
          alt: blog.title,
        }
      ] : [
        {
          url: "https://nextsorablog.com/img/ogp.png",  // デフォルト画像
          width: 1200,
          height: 630,
          alt: blog.title,
        }
      ],
    },
    // Twitterカードも設定
    twitter: {
      card: "summary_large_image",
      title: `${blog.title} | SoraPort`,
      description: `${blog.title}に関する記事です`,
      site: "@SoraPort",
      images: blog.eyecatch ? [
        {
          url: blog.eyecatch.url,
          alt: blog.title,
        }
      ] : [
        {
          url: "https://nextsorablog.com/img/ogp.png",
          alt: blog.title,
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
  const { contents } = await getBlogList();

  const paths = contents
    .filter((post) => post.id)
    .map((post) => ({
      postId: post.id.toString(),
    }));

  return paths;
}

export default async function BlogDetailPage({
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
  const article = await getBlogDetail(postId, queries);

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
      <BlogArticle content={article} />
    </>
  );
}

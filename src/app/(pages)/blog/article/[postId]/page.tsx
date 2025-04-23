import { notFound } from "next/navigation";
import { getBlogDetail, getBlogList } from "@/lib/microcms";
import BlogArticle from "@/app/components/blog-article";
import { draftMode } from "next/headers";
import { Metadata } from "next";

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { id: string },
  searchParams: { draftKey?: string };
}): Promise<Metadata> {
  const blog = await getBlogDetail(params.id);
  
  // メタデータの基本構造を作成
  const metadata: Metadata = {
    title: blog?.title,
    description: blog?.content || `${blog?.title}に関する記事です`,
  };

  // 下書きモードまたはdraftKeyが存在する場合、indexingを無効化
  const { isEnabled } = draftMode();
  if (isEnabled || searchParams.draftKey) {
    metadata.robots = {
      index: false,
    };
  }

  // OGP情報があれば追加
  if (blog?.eyecatch) {
    metadata.openGraph = {
      title: blog.title,
      description: blog.content || `${blog.title}に関する記事です`,
      images: [
        {
          url: blog.eyecatch.url,
          width: blog.eyecatch.width,
          height: blog.eyecatch.height,
          alt: blog.title,
        },
      ],
    };
  }

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

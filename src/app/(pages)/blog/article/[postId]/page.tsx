import { notFound } from "next/navigation";
import { getBlogDetail, getBlogList } from "@/lib/microcms";
import BlogArticle from "@/app/components/blog-article";
import { draftMode } from "next/headers";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { draftKey?: string };
}) {
  const metadata: {
    robots?: {
      index: boolean;
    };
  } = {};

  const { isEnabled } = draftMode();

  if (isEnabled || searchParams.draftKey) {
    metadata.robots = {
      index: false,
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

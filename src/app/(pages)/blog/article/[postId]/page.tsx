import { notFound } from "next/navigation";
import {
	getBlogDetail,
	getBlogList,
} from "@/lib/microcms";
import BlogArticle from "@/app/components/blog-article";

export async function generateMetadata({
  params: { postId },
}: {
  params: { postId: string };
}) {
  const article = await getBlogDetail(postId);

  if (!article) {
    return {
      title: "業務ブログ",
      description: "AIM Commonsスタッフからの発信です",
    };
  }

  return {
    title: `${article.title}`,
    description: article.content,
  };
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

export default async function StaticDetailPage({
  params: { postId },
}: {
  params: { postId: string };
}) {
  const article = await getBlogDetail(postId);

  if (!article) {
    console.error("Post not found:", postId);
    notFound();
  }

  return <BlogArticle content={article} />;
}

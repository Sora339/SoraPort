import { notFound } from "next/navigation";
import { getWorkDetail, getWorkList } from "@/lib/microcms";
import WorkArticle from "@/app/components/work-article";

export async function generateStaticParams() {
  const { contents } = await getWorkList();

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
  const article = await getWorkDetail(postId);

  if (!article) {
    console.error("Post not found:", postId);
    notFound();
  }

  return <WorkArticle content={article} />;
}

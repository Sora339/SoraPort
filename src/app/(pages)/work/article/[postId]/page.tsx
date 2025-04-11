import { notFound } from "next/navigation";
import { getWorkDetail, getWorkList } from "@/lib/microcms";
import WorkArticle from "@/app/components/work-article";

type searchParamsType = {
  draftKey?: string;
}

export async function generateMetadata({ searchParams }: {searchParams: searchParamsType}) {
  const metadata: {
    robots?: {
      index: boolean;
    };
  } = {};

  if (searchParams.draftKey) {
    metadata.robots = {
      index: false,
    };
  }
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

export default async function StaticDetailPage({
  params: { postId },searchParams
}: {
  params: { postId: string },searchParams: searchParamsType;
}) {
  const queries = { draftKey: searchParams.draftKey };
  const article = await getWorkDetail(postId, queries);

  if (!article) {
    console.error("Post not found:", postId);
    notFound();
  }

  return <WorkArticle content={article} />;
}

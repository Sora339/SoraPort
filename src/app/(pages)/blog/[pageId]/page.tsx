import { notFound } from "next/navigation";
import Articlelist from "@/app/components/blog-article-list";
import { LIMIT } from "@/lib/constants";
import { getBlogList } from "@/lib/microcms";

export const dynamicParams = false;

export async function generateStaticParams() {
  const queries = { limit: LIMIT, fields: "id" };
  const articlesListResponse = await getBlogList(queries);
  const { totalCount } = articlesListResponse;

  const range = (start: number, end: number) =>
    Array.from({ length: end - start + 1 }, (_, i) => start + i);

  const paths = range(1, Math.ceil(totalCount / LIMIT)).map((page) => ({
    pageId: page.toString(),
  }));

  return [...paths];
}

export default async function Blog({
  params,
}: {
  params: Promise<{ pageId: string }>;
}) {
  const { pageId } = await params;
  const currentPage = Number.parseInt(pageId, 10);

  if (Number.isNaN(currentPage) || currentPage < 1) {
    return notFound();
  }

  const articlesListQueries = {
    limit: LIMIT,
    offset: (currentPage - 1) * LIMIT,
  };

  const blogPageResponse = await getBlogList(articlesListQueries).catch(() =>
    notFound()
  );
  const { contents, totalCount } = blogPageResponse;

  const maxPage = Math.max(1, Math.ceil(totalCount / LIMIT));

  if (currentPage > maxPage) {
    return notFound();
  }

  if (!contents) {
    return <h1>No contents</h1>;
  }

  return (
    <div className="font-bold text-[20px] text-foreground leading-10">
      <Articlelist
        contents={contents}
        currentPage={currentPage}
        totalCount={totalCount}
      />
    </div>
  );
}

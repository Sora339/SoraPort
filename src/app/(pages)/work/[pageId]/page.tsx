import { notFound } from "next/navigation";
import WorkArticlelist from "@/app/components/work-article-list";
import { LIMIT } from "@/lib/constants";
import { getWorkList } from "@/lib/microcms";

export async function generateStaticParams() {
  const queries = { limit: LIMIT, fields: "id" };
  const articlesListResponse = await getWorkList(queries);
  const { totalCount } = articlesListResponse;

  const range = (start: number, end: number) =>
    Array.from({ length: end - start + 1 }, (_, i) => start + i);

  const paths = range(1, Math.ceil(totalCount / LIMIT)).map((page) => ({
    pageId: page.toString(),
  }));

  return [...paths];
}

export default async function Work({
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

  const workPageResponse = await getWorkList(articlesListQueries).catch(() =>
    notFound()
  );
  const { contents, totalCount } = workPageResponse;

  const maxPage = Math.max(1, Math.ceil(totalCount / LIMIT));

  if (currentPage > maxPage) {
    return notFound();
  }

  if (!contents) {
    return <h1>No contents</h1>;
  }

  return (
    <div className="font-bold text-[20px] text-foreground leading-10">
      <WorkArticlelist
        contents={contents}
        currentPage={currentPage}
        totalCount={totalCount}
      />
    </div>
  );
}

import { notFound } from "next/navigation";
import Articlelist from "@/app/components/blog-article-list";
import { LIMIT } from "@/lib/constants";
import { getBlogList } from "@/lib/microcms";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "業務ブログ",
  description: "AIM Commonsスタッフからの発信です",
};

export async function generateStaticParams() {
  const queries = { limit: LIMIT, fields: "id" };
  const articlesListResponse = await getBlogList(queries);
  const { totalCount } = articlesListResponse;

  const range = (start: number, end: number) =>
    Array.from({ length: end - start + 1 }, (_, i) => start + i);

  const paths = range(1, Math.ceil(totalCount / LIMIT)).map((page) => ({
    current: page.toString(),
  }));

  return [...paths];
}

export default async function Blog({ params }: { params: { pageId: string } }) {
  const currentPage = Number.parseInt(params.pageId, 10);

  const initialQueries = { limit: LIMIT, fields: "id" };
  const articlesListResponse = await getBlogList(initialQueries).catch(() =>
    notFound()
  );
  const { totalCount } = articlesListResponse;

  const maxPage = Math.ceil(totalCount / LIMIT);

  if (Number.isNaN(currentPage) || currentPage < 1 || currentPage > maxPage) {
    return notFound();
  }

  const articlesListQueries = {
    limit: LIMIT,
    offset: (currentPage - 1) * LIMIT,
  };

  const blogPageResponse = await getBlogList(articlesListQueries).catch(() =>
    notFound()
  );
  const { contents } = blogPageResponse;

  if (!contents) {
    return <h1>No contents</h1>;
  }

  return (
    <div className="my-[75px] font-bold text-[20px] text-black leading-10">
      <Articlelist
        contents={contents}
        currentPage={currentPage}
        totalCount={totalCount}
      />
    </div>
  );
}

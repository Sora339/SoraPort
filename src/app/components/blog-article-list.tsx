import type { BlogArticleType } from "@/types/microcms";
import Link from "next/link";
import { Pagination } from "./pagination";
import BlogCard from "./blog-card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

type ArticlelistProps = {
  contents: BlogArticleType[];
  currentPage?: number;
  totalCount: number;
};

export default function BlogArticlelist({
  contents,
  currentPage,
  totalCount,
}: ArticlelistProps) {
  console.log(contents);
  return (
    <div className="container mx-auto px-4 my-8 lg:px-12 lg:my-16">
      {/* ナビゲーション */}
      <div className="mb-8 text-white">
        <Button variant="ghost" asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Topに戻る
          </Link>
        </Button>
      </div>
      <h1 className="text-white text-3xl font-bold sm:text-4xl md:text-5xl mb-12 text-center">
        Blog
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {contents.map((content) => (
          <BlogCard
            title={content.title}
            date={content.publishedAt || content.updatedAt}
            image={content.eyecatch.url}
            detailLink={`/blog/article/${content.id}`}
            key={content.id}
          />
        ))}
      </div>
      <Pagination totalCount={totalCount} currentPage={currentPage ?? 1} />
    </div>
  );
}

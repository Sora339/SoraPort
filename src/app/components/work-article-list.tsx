import type { WorkArticleType } from "@/types/microcms";
import Link from "next/link";
import { Pagination } from "./pagination";
import WorkCard from "./work-card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

type ArticlelistProps = {
  contents: WorkArticleType[];
  currentPage?: number;
  totalCount: number;
};

export default function WorkArticlelist({
  contents,
  currentPage,
  totalCount,
}: ArticlelistProps) {
  return (
    <div className="container mx-auto px-4 my-8 lg:px-12 lg:my-16">
      {/* ナビゲーション */}
      <div className="mb-8 text-foreground">
        <Button variant="ghost" asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Topに戻る
          </Link>
        </Button>
      </div>
      <h1 className="text-foreground text-3xl font-bold sm:text-4xl md:text-5xl mb-12 text-center">
        Works
      </h1>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 w-fit mx-auto px-4 sm:px-0">
        {contents.map((content) => (
          <WorkCard
            title={content.title}
            techs={content.techs}
            image={content.eyecatch.url}
            description={content.description}
            detailLink={`/work/article/${content.id}`}
            githubLink={content.githubLink}
            deployLink={content.deployLink || ""}
            key={content.id}
          />
        ))}
      </div>
      <Pagination
        totalCount={totalCount}
        currentPage={currentPage ?? 1}
        basePath="work"
      />
    </div>
  );
}

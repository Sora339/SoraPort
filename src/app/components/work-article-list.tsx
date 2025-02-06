import type { WorkArticleType } from "@/types/microcms";
import WorkCard from "./work-card";

type ArticlelistProps = {
  contents: WorkArticleType[]
};

export default function WorkArticlelist({
  contents,
}: ArticlelistProps) {
  return (
    <div>
      <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl mb-12 text-center">
        Blog
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {contents.map((content) => (
        
        <WorkCard
          title={content.title}
          techs={content.techs}
          image={content.eyecatch.url}
          description={content.description}
          detailLink={`/blog/${content.id}`}
          githubLink={content.githubLink}
          deployLink={content.deployLink || ""}
          key={content.id}
        />

        ))}
      </div>
    </div>
  );
}

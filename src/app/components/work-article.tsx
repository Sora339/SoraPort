import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { WorkArticleType } from "@/types/microcms";
import parse from "html-react-parser";
import { ArrowLeft, Calendar, Github, Globe, Trophy } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function WorkArticle({ content }: { content: WorkArticleType }) {
  return (
    <div className="container mx-auto px-4 my-8 lg:px-12 lg:my-16">
      {/* ナビゲーション */}
      <div className="mb-4 lg:mb-8">
        <Button variant="ghost" asChild>
          <Link href="/#works">
            <ArrowLeft className="mr-2 h-4 w-4" />
            作品一覧に戻る
          </Link>
        </Button>
      </div>
      <div className="bg-white min-h-[80vh] text-black rounded-xl p-6 md:p-16 py-8 md:py-12">
        {/* ヘッダー情報 */}
        <div className="mb-12">
          <h1 className="mb-4 text-3xl md:text-4xl font-bold">
            {content.title}
          </h1>
          <p className="mb-6 md:text-lg text-muted-foreground">
            {content.description}
          </p>

          {/* メタ情報 */}
          <div className="mb-6 flex flex-wrap flex-col gap-2">
            <div className="flex items-baseline text-muted-foreground">
              <Calendar className="mr-2 h-4 w-4" />
              {content.period}
            </div>
            {content.award && (
              <div className="flex items-baseline text-muted-foreground">
                <Trophy className="mr-2 h-4 w-4 flex-shrink-0" />
                {content.award}
              </div>
            )}
          </div>

          {/* 技術スタック */}
          <div className="mb-6">
            <div className="mb-2 font-semibold">使用技術</div>
            <div className="flex flex-wrap gap-2">
              <div className="flex flex-wrap gap-2">
                {content.techs.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-sm font-medium text-primary ring-1 ring-inset ring-primary/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* リンク */}
          <div className="flex flex-wrap gap-4">
            {content.deployLink && (
              <Button asChild>
                <Link
                  href={content.deployLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Globe className="mr-2 h-4 w-4" />
                  サイトを見る
                </Link>
              </Button>
            )}

            <Button variant="outline" asChild>
              <Link
                href={content.githubLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-2 h-4 w-4" />
                ソースコード
              </Link>
            </Button>
          </div>
        </div>

        {/* サムネイル画像 */}
        <Card className="mb-12 border-0 overflow-hidden">
          <Image
            src={content.eyecatch.url}
            alt={content.title}
            width={800}
            height={430}
            className="w-full object-cover"
          />
        </Card>

        {/* 本文 */}
        <article className="prose mx-auto">{parse(content.content)}</article>
      </div>
      {/* ナビゲーション */}
      <div className="mt-4 lg:mt-8 text-right">
        <Button variant="ghost" asChild>
          <Link href="/#works">
            <ArrowLeft className="mr-2 h-4 w-4" />
            作品一覧に戻る
          </Link>
        </Button>
      </div>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import type { BlogArticleType} from "@/types/microcms";
import { format } from "date-fns";
import parse from "html-react-parser";
import { ArrowLeft, Calendar } from "lucide-react";
import Link from "next/link";

export default function BlogArticle({ content }: { content: BlogArticleType }) {
  return (
    <div className="">
      <div className="container mx-auto px-4 py-8 lg:px-12 lg:py-16">
        {/* ナビゲーション */}
        <div className="mb-4 lg:mb-8 text-left">
          <Button variant="ghost" asChild>
            <Link href="/blog/1">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Blog一覧に戻る
            </Link>
          </Button>
        </div>
        <div className="bg-white min-h-[90vh] text-black rounded-xl p-6 md:p-16 py-8 md:py-12">
          {/* ヘッダー情報 */}
          <div className="mb-12">
            <h1 className="mb-4 text-2xl md:text-4xl font-bold">
              {content.title}
            </h1>

            {/* メタ情報 */}
            <div className="mb-6 flex flex-wrap gap-2">
              <div className="flex items-center text-muted-foreground">
                <Calendar className="mr-2 h-4 w-4" />
                {format(content.publishedAt || content.updatedAt, "yyyy-MM-dd")}
              </div>
            </div>
          </div>

          {/* 本文 */}
          <article className="prose prose-gray mx-auto max-w-4xl dark:prose-invert">
            <div className="prose mx-auto">{parse(content.content)}</div>
          </article>
        </div>
        {/* ナビゲーション */}
        <div className="mt-4 lg:mt-8 text-right">
          <Button variant="ghost" asChild>
            <Link href="/blog/1">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Blog一覧に戻る
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

import { notFound } from "next/navigation";
import { getWorkDetail, getWorkList } from "@/lib/microcms";
import { draftMode } from "next/headers";
import { Metadata } from "next";
import WorkArticle from "@/app/components/work-article";

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { id: string },
  searchParams: { draftKey?: string };
}): Promise<Metadata> {
  const work = await getWorkDetail(params.id);
  
  // メタデータの基本構造を作成
  const metadata: Metadata = {
    title: work?.title,
    description: work?.content || `${work?.title}に関する記事です`,
  };

  // 下書きモードまたはdraftKeyが存在する場合、indexingを無効化
  const { isEnabled } = draftMode();
  if (isEnabled || searchParams.draftKey) {
    metadata.robots = {
      index: false,
    };
  }

  // OGP情報があれば追加
  if (work?.eyecatch) {
    metadata.openGraph = {
      title: work.title,
      description: work.content || `${work.title}に関する記事です`,
      images: [
        {
          url: work.eyecatch.url,
          width: work.eyecatch.width,
          height: work.eyecatch.height,
          alt: work.title,
        },
      ],
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

export default async function WorkDetailPage({
  params: { postId },
  searchParams,
}: {
  params: { postId: string };
  searchParams: { draftKey?: string };
}) {
  const { isEnabled } = draftMode();

  // Draft Modeが有効な場合または直接draftKeyが指定されている場合
  // draftKeyを含めてコンテンツを取得
  const queries = searchParams.draftKey
    ? { draftKey: searchParams.draftKey }
    : {};
  const article = await getWorkDetail(postId, queries);

  if (!article) {
    console.error("Post not found:", postId);
    notFound();
  }

  return (
    <>
      {(isEnabled || searchParams.draftKey) && (
        <div className="text-lg">
          プレビューモード中 - これは下書きのプレビューです
        </div>
      )}
      <WorkArticle content={article} />
    </>
  );
}

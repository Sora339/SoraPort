import { notFound } from "next/navigation";
import { getBlogDetail } from "@/lib/microcms";
import BlogArticle from "@/app/components/blog-article";
import { cookies, draftMode } from "next/headers";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ postId: string }>;
}): Promise<Metadata> {
  const { postId } = await params;
  const draftKey = (await cookies()).get("draftKey")?.value;
  const blog = draftKey
    ? await getBlogDetail(postId, { draftKey })
    : null;

  if (!blog) {
    return {
      title: "記事が見つかりません",
      description: "お探しの記事は存在しないか、削除された可能性があります。",
      robots: {
        index: false,
      },
    };
  }

  const metadata: Metadata = {
    title: `${blog.title} | SoraPort`,
    description: `${blog.title}に関する記事です`,
    openGraph: {
      title: `${blog.title} | SoraPort`,
      description: `${blog.title}に関する記事です`,
      type: "article",
      url: `https://nextsoraport.digital/blog/${postId}`,
      siteName: "SoraPort",
      images: blog.eyecatch
        ? [
            {
              url: blog.eyecatch.url,
              width: blog.eyecatch.width,
              height: blog.eyecatch.height,
              alt: blog.title,
            },
          ]
        : [
            {
              url: "https://nextsoraport.digital/img/ogp.png",
              width: 1200,
              height: 630,
              alt: blog.title,
            },
          ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${blog.title} | SoraPort`,
      description: `${blog.title}に関する記事です`,
      site: "@SoraPort",
      images: blog.eyecatch
        ? [
            {
              url: blog.eyecatch.url,
              alt: blog.title,
            },
          ]
        : [
            {
              url: "https://nextsoraport.digital/img/ogp.png",
              alt: blog.title,
            },
          ],
    },
    robots: {
      index: false,
    },
  };

  return metadata;
}

export default async function BlogDraftDetailPage({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = await params;
  const { isEnabled } = await draftMode();
  const draftKey = (await cookies()).get("draftKey")?.value;

  if (!draftKey) {
    notFound();
  }

  const article = await getBlogDetail(postId, { draftKey });

  if (!article) {
    //console.error("Post not found:", postId);
    notFound();
  }

  return (
    <>
      {isEnabled && (
        <div className="text-lg">
          プレビューモード中 - これは下書きのプレビューです
        </div>
      )}
      <BlogArticle content={article} />
    </>
  );
}

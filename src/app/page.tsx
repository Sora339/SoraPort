import Image from "next/image";
import { ArrowRight } from "lucide-react";
import TechStack from "@/app/components/techstack";
import Link from "next/link";
import CareerTimeline from "@/app/components/carrer-timeline";
import { getBlogList, getWorkList } from "@/lib/microcms";
import WorkCard from "@/app/components/work-card";
import BlogCard from "@/app/components/blog-card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SoraPort",
  description: "Sora_339のポートフォリオサイトです。",
};

export default async function Page() {
  const articlesListQueries = {
    limit: 3,
  };
  const workArticleResponse = await getWorkList();
  const workcontents = workArticleResponse;
  const blogArticleResponse = await getBlogList(articlesListQueries);
  const blogcontents = blogArticleResponse;
  console.log(workcontents);
  return (
    <div className="min-h-screen">
      {/* ヘッダーセクション */}
      <section className="relative flex h-[50vh] flex-col items-center justify-center space-y-8 px-4 py-24 text-center">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#4f4f4f2e_2px,transparent_2px),linear-gradient(to_bottom,#4f4f4f2e_2px,transparent_2px)] bg-[size:24px_36px]" />
        <div className="space-y-4">
          <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl">
            SoraPort
          </h1>
          <p className="mx-auto max-w-[600px] text-muted-foreground md:text-lg">
            ようこそSora_339のポートフォリオサイトへ。
          </p>
        </div>
      </section>
      <main className="container max-w-[90%] mx-auto">
        {/* 自己紹介セクション */}
        <section className="py-12 md:py-24">
          <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl mb-12 text-center">
            About Me
          </h2>
          <div className="flex flex-col md:flex-row justify-center gap-12 md:gap-24">
            <div className="flex justify-center">
              <Image
                src="/img/icon.webp"
                alt="プロフィール写真"
                width={300}
                height={300}
                className="rounded-full"
              />
            </div>
            <div className="flex flex-col mx-auto md:mx-0 items-center md:items-start justify-center space-y-4 w-fit">
              <div className="w-fit">
                <h3 className="mb-6 text-2xl font-bold">
                  Sora_339（西堀 宙知）
                </h3>
                <p className="">Web developer / Movie creater</p>
              </div>
              <p className="">@ AoyamaGakuinUniv / Japan.</p>
              <p className="pb-4">
                Hi! I love <span className="font-Noto">ものづくり</span>.
                Let&apos;s be friends!
              </p>
              <div className="flex gap-4">
                <ul className="grid grid-cols-2 gap-4 text-black font-semibold">
                  <li className="bg-white rounded-lg hover:shadow-[0_0_10px_4px_rgba(0,0,0,0.8)] transition duration-300">
                    <Link
                      target="_blank"
                      href={"https://github.com/Sora339"}
                      className="flex items-center h-full p-2 px-3 gap-3"
                    >
                      <div className="w-[30px] flex justify-center">
                        <Image
                          src={
                            "https://res.cloudinary.com/divcohz2x/image/upload/v1727722296/github-icon_odxnis.svg"
                          }
                          alt="Next"
                          width={50}
                          height={50}
                        ></Image>
                      </div>
                      <p className="">Sora339</p>
                    </Link>
                  </li>
                  <li className="bg-stone-900 text-white rounded-lg hover:shadow-[0_0_10px_4px_rgba(255,255,255,0.8)] transition duration-300">
                    <Link
                      target="_blank"
                      href={"https://x.com/339_Sora"}
                      className="flex items-center h-full p-2 px-3 gap-3"
                    >
                      <div className="w-[30px] flex justify-center">
                        <Image
                          src={
                            "https://res.cloudinary.com/divcohz2x/image/upload/v1727722443/logo-white_hjqcnz.png"
                          }
                          alt="Next"
                          width={24}
                          height={35}
                        ></Image>
                      </div>
                      <p className="">339_Sora</p>
                    </Link>
                  </li>
                  <li className="bg-stone-900 text-white rounded-lg hover:shadow-[0_0_10px_4px_rgba(62,168,255,0.8)] transition duration-300">
                    <Link
                      target="_blank"
                      href={"https://zenn.dev/sors339"}
                      className="flex items-center h-full p-2 px-3 gap-3"
                    >
                      <div className="w-[30px] flex justify-center">
                        <Image
                          src={
                            "https://res.cloudinary.com/divcohz2x/image/upload/v1732692608/logo-only_prtw1b.svg"
                          }
                          alt="Next"
                          width={40}
                          height={40}
                        ></Image>
                      </div>
                      <p className="">339_Sora</p>
                    </Link>
                  </li>
                  <li className="bg-white rounded-lg hover:shadow-[0_0_10px_4px_rgba(88,101,242,0.8)] transition duration-300">
                    <div className="flex items-center h-full p-2 px-3 gap-3">
                      <div className="w-[30px] flex justify-center">
                        <Image
                          src={
                            "https://res.cloudinary.com/divcohz2x/image/upload/v1727722293/discord-icon_zpzg2h.svg"
                          }
                          alt="Next"
                          width={50}
                          height={50}
                        ></Image>
                      </div>
                      <p className="">sora_339</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 作品セクション */}
        <section id="works" className="py-12 md:py-24 mx-auto container">
          <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl mb-12 text-center">
            Works
          </h2>
          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {workcontents.contents.map((work) => (
              <WorkCard
                title={work.title}
                techs={work.techs}
                image={work.eyecatch.url}
                description={work.description}
                detailLink={`/work/article/${work.id}`}
                githubLink={work.githubLink}
                deployLink={work.deployLink || ""}
                key={work.id}
              />
            ))}
          </div>
        </section>

        {/* キャリアパスセクション */}
        <section className="py-12 md:py-24 mx-auto container">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">
              Carrer
            </h2>
          </div>
          <CareerTimeline />
        </section>

        {/* 技術スタックセクション */}
        <section className="py-12 md:py-24 mx-auto container">
          <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl mb-12 text-center">
            Tech Stack
          </h2>
          <TechStack />
        </section>

        {/* ブログセクション */}
        <section className="py-12 md:py-24 mx-auto container">
          <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl mb-12 text-center">
            Blog
          </h2>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {blogcontents.contents.map((content) => (
              <BlogCard
                title={content.title}
                date={content.publishedAt || content.updatedAt}
                image={content.eyecatch.url}
                detailLink={`/blog/article/${content.id}`}
                key={content.id}
              />
            ))}
          </div>
          <div className="flex justify-end mt-6">
            <Link href={"/blog/1"} className="p-0 text-white flex items-center">
              <span>すべての記事を見る</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

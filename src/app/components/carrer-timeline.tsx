"use client";

import { motion } from "framer-motion";
import { School, Code2, GraduationCap, Building2 } from "lucide-react";
import { Card } from "@/components/ui/card";

const careers = [
  {
    period: "2027 - ",
    company: "株式会社サイバーエージェント",
    position: "Webフロントエンドエンジニア",
    description:
      "2027年4月入社予定。",
    icon: Building2,
  },
  {
    period: "2024 - 現在",
    company: "青山学院大学情報メディアセンター",
    position: "学生エンジニア",
    description:
      "貸出予約Webシステムの開発及びポータルサイトの設計・開発を行う。",
    icon: Code2,
  },
  {
    period: "2023 - 現在",
    company: "青山学院大学",
    position: "社会情報学部社会情報学科",
    description:
      "情報科学の基礎から応用まで幅広い知識を学び、情報社会における課題解決能力を養う。",
    icon: GraduationCap,
  },
  {
    period: "2020-2023",
    company: "静岡県立磐田南高等学校",
    position: "",
    description:
      "Pythonを用いて、宇宙線の周期性に関するデータ分析を研究する。",
    icon: School,
  },
];

export default function CareerTimeline() {
  return (
      <div className="relative mx-auto max-w-4xl">
        {/* タイムラインの中心線 */}
        <div className="absolute left-[50%] top-0 h-full w-0.5 -translate-x-1/2 bg-border md:block z-0" />

        {careers.map((career, index) => (
          <motion.div
            key={career.period}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className="mb-8 md:mb-16"
          >
            <div
              className={`flex flex-col ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } items-center gap-8 md:gap-4`}
            >
              {/* カード */}
              <Card className="w-full md:w-[calc(50%-2.5rem)] z-10">
                <div className="space-y-4 p-6">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium text-muted-foreground">
                      {career.period}
                    </span>
                    <h3 className="text-xl font-semibold">{career.company}</h3>
                    <p className="text-base font-medium text-primary">
                      {career.position}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {career.description}
                  </p>
                </div>
              </Card>
              {/* アイコン */}
              <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg md:order-2">
                <career.icon className="h-6 w-6" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
  );
}

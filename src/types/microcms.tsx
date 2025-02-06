import type { MicroCMSDate, MicroCMSImage } from "microcms-js-sdk";

export type BlogArticleType = {
  id: string;
  title: string;
  content: string;
  eyecatch: MicroCMSImage;
  detailLink: string;
} & MicroCMSDate;

export type WorkArticleType = {
  techs: string[];
  period: string;
  award?: string;
  description: string;
  githubLink: string;
  deployLink?: string;
} & BlogArticleType;

import type { BlogArticleType, WorkArticleType } from "@/types/microcms";
import { createClient } from "microcms-js-sdk";
import type { MicroCMSQueries } from "microcms-js-sdk";
import { FETCH_ALL_BATCH_LIMIT } from "@/lib/constants";

const STATIC_FETCH: RequestInit = { cache: "force-cache" };
const DRAFT_FETCH: RequestInit = { cache: "no-store" };

const getRequestInit = (queries?: MicroCMSQueries) =>
  queries?.draftKey ? DRAFT_FETCH : STATIC_FETCH;
if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error("MICROCMS_SERVICE_DOMAIN is required");
}

if (!process.env.MICROCMS_API_KEY) {
  throw new Error("MICROCMS_API_KEY is required");
}

// API取得用のクライアントを作成
export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

// 作品一覧を取得
export const getWorkList = async (queries?: MicroCMSQueries) => {
  const listData = await client.getList<WorkArticleType>({
    endpoint: "works",
    queries,
    customRequestInit: getRequestInit(queries),
  });

  return listData;
};

// 作品の詳細を取得
export const getWorkDetail = async (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  try {
    const detailData = await client.get<WorkArticleType>({
      endpoint: "works",
      contentId,
      queries,
      customRequestInit: getRequestInit(queries),
    });

    if (!detailData) {
      //console.error("No data found for contentId:", contentId);
      return null;
    }

    return detailData;
  } catch (error) {
    //console.error("Error fetching detail:", error);
    return null;
  }
};

// ブログ一覧を取得
export const getBlogList = async (queries?: MicroCMSQueries) => {
  const listData = await client.getList<BlogArticleType>({
    endpoint: "blogs",
    queries,
    customRequestInit: getRequestInit(queries),
  });

  return listData;
};

// ブログの詳細を取得
export const getBlogDetail = async (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  try {
    const detailData = await client.get<BlogArticleType>({
      endpoint: "blogs",
      contentId,
      queries,
      customRequestInit: getRequestInit(queries),
    });

    if (!detailData) {
      //console.error("No data found for contentId:", contentId);
      return null;
    }

    return detailData;
  } catch (error) {
    //console.error("Error fetching detail:", error);
    return null;
  }
};

const getAllContentIds = async (endpoint: "works" | "blogs") => {
  const ids: string[] = [];
  let offset = 0;
  let totalCount = 0;

  do {
    const response = await client.getList<{ id: string }>({
      endpoint,
      queries: {
        limit: FETCH_ALL_BATCH_LIMIT,
        offset,
        fields: "id",
      },
      customRequestInit: STATIC_FETCH,
    });

    ids.push(...response.contents.map((content) => content.id));
    totalCount = response.totalCount;
    offset += FETCH_ALL_BATCH_LIMIT;
  } while (offset < totalCount);

  return ids;
};

export const getAllWorkIds = () => getAllContentIds("works");
export const getAllBlogIds = () => getAllContentIds("blogs");

import type {
	BlogArticleType,WorkArticleType
} from "@/types/microcms";
import { createClient } from "microcms-js-sdk";
import type { MicroCMSQueries } from "microcms-js-sdk";

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
	});

	return listData;
};

// 作品の詳細を取得
export const getWorkDetail = async (
	contentId: string,
	queries?: MicroCMSQueries,
) => {
	try {
		const detailData = await client.get<WorkArticleType>({
			endpoint: "works",
			contentId,
			queries,
		});

		console.log("Fetched detail data:", detailData); // デバッグ用

		if (!detailData) {
			console.error("No data found for contentId:", contentId);
			return null;
		}

		return detailData;
	} catch (error) {
		console.error("Error fetching detail:", error);
		return null;
	}
};

// ブログ一覧を取得
export const getBlogList = async (queries?: MicroCMSQueries) => {
	const listData = await client.getList<BlogArticleType>({
		endpoint: "blogs",
		queries,
	});

	return listData;
};

// ブログの詳細を取得
export const getBlogDetail = async (
	contentId: string,
	queries?: MicroCMSQueries,
) => {
	try {
		const detailData = await client.get<BlogArticleType>({
			endpoint: "blogs",
			contentId,
			queries,
		});

		console.log("Fetched detail data:", detailData); // デバッグ用

		if (!detailData) {
			console.error("No data found for contentId:", contentId);
			return null;
		}

		return detailData;
	} catch (error) {
		console.error("Error fetching detail:", error);
		return null;
	}
};



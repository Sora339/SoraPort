// app/api/draft/route.ts
import { getBlogDetail } from '@/lib/microcms'
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const secret = searchParams.get('secret')
    const contentId = searchParams.get('contentId')
    const draftKey = searchParams.get('draftKey')

    // シークレットキーの検証
    if (secret !== process.env.MICROCMS_PREVIEW_SECRET || !contentId) {
        return new Response('Invalid token', { status: 401 })
    }

    // 記事の存在確認
    const article = await getBlogDetail(contentId, { draftKey: draftKey || undefined })
        .catch(() => null)

    if (!article) {
        return new Response('Invalid article', { status: 401 })
    }

    // Draft Modeを有効化
    const draft = await draftMode()
    draft.enable()

    // draftKeyをURLパラメータとして保持したままリダイレクト
    redirect(`/blog/article/${contentId}?draftKey=${draftKey}`)
}
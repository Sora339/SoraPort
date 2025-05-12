import parse, {
  domToReact,
  Element,
  HTMLReactParserOptions,
  DOMNode,
} from "html-react-parser";
import { Button } from "@/components/ui/button";
import type { BlogArticleType } from "@/types/microcms";
import { format } from "date-fns";
import { ArrowLeft, Calendar } from "lucide-react";
import Link from "next/link";
import { LinkPreview } from "./link-preview";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function BlogArticle({
  content,
}: {
  content: BlogArticleType;
}): JSX.Element {
	const options: HTMLReactParserOptions = {
		replace: (domNode): JSX.Element | string | undefined => {
			// コードブロックの処理
			if (
				domNode instanceof Element &&
				domNode.name === "pre" &&
				domNode.children.length === 1 &&
				domNode.children[0] instanceof Element &&
				domNode.children[0].name === "code"
			) {
				const codeElement = domNode.children[0] as Element;
				const codeContent = domToReact(codeElement.children as DOMNode[]);

				let codeText = "";
				if (typeof codeContent === "string") {
					codeText = codeContent;
				} else if (Array.isArray(codeContent)) {
					codeText = codeContent.join("");
				}

				let language = "";
				if (codeElement.attribs.class) {
					const match = codeElement.attribs.class.match(/language-(\w+)/);
					if (match) {
						language = match[1];
					}
				}

				try {
					const fileName = domNode.attribs?.["data-filename"] || "";

					return (
						<div className="code-block-wrapper">
							{fileName && (
								<div className="code-filename rounded-t-md bg-gray-800 px-4 py-2 text-sm text-white">
									{fileName}
								</div>
							)}
							<SyntaxHighlighter
								language={language || "typescript"}
								style={vscDarkPlus}
								className="hljs !my-0 overflow-auto rounded-md"
							>
								{codeText}
							</SyntaxHighlighter>
						</div>
					);
				} catch {
					return (
						<pre>
							<code className={codeElement.attribs.class || ""}>
								{codeContent}
							</code>
						</pre>
					);
				}
			}

			if (domNode instanceof Element && domNode.name === "p") {
				const children = domNode.children;
				const aIndex = children.findIndex(
					(child) =>
						child instanceof Element &&
						child.name === "a" &&
						child.attribs?.href,
				);

				if (aIndex !== -1) {
					const aElement = children[aIndex] as Element;
					const before = children.slice(0, aIndex);
					const after = children.slice(aIndex + 1);

					return (
						<>
							{before.length > 0 && (
								<p>{domToReact(before as DOMNode[], options)}</p>
							)}
							<div className="my-4">
								<LinkPreview url={aElement.attribs.href}>
									{domToReact(aElement.children as DOMNode[], options)}
								</LinkPreview>
							</div>
							{after.length > 0 && (
								<p>{domToReact(after as DOMNode[], options)}</p>
							)}
						</>
					);
				}
			}

			if (
				domNode instanceof Element &&
				domNode.name === "a" &&
				domNode.attribs?.href
			) {
				return (
					<LinkPreview url={domNode.attribs.href}>
						{domToReact(domNode.children as DOMNode[], options)}
					</LinkPreview>
				);
			}
		},
	};

  return (
    <div className="container mx-auto px-4 my-8 lg:px-12 lg:my-16">
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
        {/* ヘッダー */}
        <div className="mb-12">
          <h1 className="mb-4 text-2xl md:text-4xl font-bold">
            {content.title}
          </h1>

          {/* 公開日 */}
          <div className="mb-6 flex flex-wrap gap-2">
            <div className="flex items-center text-muted-foreground">
              <Calendar className="mr-2 h-4 w-4" />
              {format(content.publishedAt || content.updatedAt, "yyyy-MM-dd")}
            </div>
          </div>
        </div>

        {/* 本文 */}
        <article className="prose mx-auto">
          {parse(content.content, options)}
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
  );
}
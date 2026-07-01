import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

export function BlogContent({ content }: { content: string }) {
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none prose-lg prose-headings:font-serif prose-headings:font-normal prose-headings:text-2xl prose-headings:mt-10 prose-headings:mb-4 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-sm prose-li:marker:text-primary">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

export function InstructionSteps({
  content,
  className,
}: {
  content: string;
  className?: string;
}) {
  return (
    <div className={cn("space-y-5", className)}>
      <div>
        <p className="eyebrow">Method</p>
        <h2 className="mt-2 font-serif text-2xl font-normal">Instructions</h2>
      </div>
      <div className="prose prose-neutral dark:prose-invert max-w-none border-t border-border pt-4 prose-headings:font-serif prose-headings:font-normal prose-headings:text-xl prose-headings:mt-8 prose-headings:mb-3 prose-li:marker:text-primary">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </div>
    </div>
  );
}
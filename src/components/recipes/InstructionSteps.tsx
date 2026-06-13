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
    <div className={cn("space-y-4", className)}>
      <h2 className="text-2xl font-bold font-serif">Instructions</h2>
      <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-serif prose-headings:text-xl prose-headings:mt-8 prose-headings:mb-3 prose-li:marker:text-primary">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </div>
    </div>
  );
}
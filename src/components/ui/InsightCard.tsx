import React from "react"
import { cn } from "../../lib/utils"
import { Lightbulb } from "lucide-react"

interface InsightCardProps {
  title?: string;
  insights: string[];
  className?: string;
}

export function InsightCard({ title = "Insights e observações", insights, className }: InsightCardProps) {
  return (
    <div className={cn("border-2 border-red-600 rounded-xl bg-zinc-950 p-6 flex flex-col gap-4", className)}>
      <div className="flex items-center gap-3 text-red-500">
        <Lightbulb className="w-6 h-6" />
        <h3 className="font-bold text-lg uppercase tracking-wider">{title}</h3>
      </div>
      <ul className="flex flex-col gap-3">
        {insights.map((insight, idx) => (
          <li key={idx} className="flex items-start gap-2 text-zinc-300 text-sm leading-relaxed">
            <span className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 shrink-0" />
            <span>{insight}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

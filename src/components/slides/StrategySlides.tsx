import React from "react"
import { SlideProps } from "../../types"
import { InsightCard } from "../ui/InsightCard"
import { Target, ArrowRight } from "lucide-react"

export function PillarsSlide({ data }: SlideProps) {
  const { titulo, pilar_1_nome, pilar_1_texto, pilar_2_nome, pilar_2_texto, pilar_3_nome, pilar_3_texto } = data.content_slots
  
  const pilares = [
    { nome: pilar_1_nome, texto: pilar_1_texto },
    { nome: pilar_2_nome, texto: pilar_2_texto },
    { nome: pilar_3_nome, texto: pilar_3_texto },
  ]

  return (
    <div className="w-full h-full bg-zinc-950 flex flex-col text-white p-16">
      <h2 className="text-4xl font-bold mb-16 max-w-2xl leading-tight">{titulo}</h2>

      <div className="flex-1 flex gap-6">
        {pilares.map((pilar, idx) => (
          <div key={idx} className="flex-1 flex flex-col">
            <div className="bg-red-600 text-white font-bold py-4 px-6 rounded-t-xl text-center uppercase tracking-wider text-sm shadow-lg">
              {pilar.nome}
            </div>
            <div className="flex-1 bg-zinc-950 border-2 border-red-600 border-t-0 rounded-b-xl p-8 flex items-center shadow-inner">
              <p className="text-zinc-300 leading-relaxed text-justify">
                {pilar.texto}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function SmartGoalSlide({ data }: SlideProps) {
  const { titulo, fase_projeto, objetivo_geral, kr1_texto, kr2_texto, kr3_texto, insights_operacionais } = data.content_slots
  
  const krs = [kr1_texto, kr2_texto, kr3_texto]

  return (
    <div className="w-full h-full bg-zinc-950 flex flex-col text-white p-16">
      <div className="flex justify-between items-start mb-10">
        <div>
          <h2 className="text-3xl font-bold mb-4">{titulo}</h2>
          <div className="inline-flex items-center gap-2 bg-red-600/20 text-red-500 px-3 py-1 rounded-full text-xs font-bold border border-red-600/30">
            <Target className="w-4 h-4" />
            {fase_projeto}
          </div>
        </div>
      </div>

      <div className="text-xl text-zinc-300 leading-relaxed max-w-4xl mb-12 border-l-4 border-red-600 pl-6">
        {objetivo_geral}
      </div>

      <div className="flex-1 flex gap-8">
        <div className="flex-[2] flex gap-4">
          {krs.map((kr, idx) => (
            <div key={idx} className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl p-6 pt-10 relative mt-6 flex flex-col">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-red-600 rounded-full flex items-center justify-center font-bold text-xl shadow-lg shadow-red-900/50">
                {idx + 1}
              </div>
              <p className="text-zinc-300 text-sm text-center mt-4">{kr}</p>
            </div>
          ))}
        </div>
        
        <div className="flex-1">
          <InsightCard title="Operacional" insights={insights_operacionais || []} className="h-full" />
        </div>
      </div>
    </div>
  )
}

export function FunnelSlide({ data }: SlideProps) {
  const { titulo } = data.content_slots
  
  const columns = ["Aquisição", "Engajamento", "Monetização"]
  const rows = ["Inbound", "Outbound", "Growth"]

  return (
    <div className="w-full h-full bg-zinc-950 flex flex-col text-white p-16">
      <div className="flex items-center gap-3 mb-10">
        <ArrowRight className="w-8 h-8 text-red-600 -rotate-45" />
        <h2 className="text-3xl font-bold">{titulo}</h2>
      </div>

      <div className="flex-1 flex flex-col relative pl-16">
        {/* Header */}
        <div className="flex gap-4 mb-4">
          {columns.map(col => (
            <div key={col} className="flex-1 bg-red-600 text-center py-2 rounded-lg font-bold uppercase tracking-wider text-sm">
              {col}
            </div>
          ))}
        </div>

        {/* Rows */}
        <div className="flex-1 flex flex-col gap-4">
          {rows.map((row, idx) => (
            <div key={row} className="flex-1 flex gap-4 relative">
              <div className="absolute -left-16 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border-2 border-zinc-700 flex items-center justify-center font-bold text-zinc-500 bg-zinc-900">
                {String.fromCharCode(65 + idx)}
              </div>
              <div className="absolute -left-16 top-14 text-xs text-zinc-600 rotate-[-90deg] origin-left whitespace-nowrap uppercase tracking-widest font-bold">
                {row}
              </div>
              
              {columns.map(col => (
                <div key={col} className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg p-4 flex flex-col items-center justify-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center">
                    <div className="w-6 h-6 bg-zinc-700 rounded-sm" />
                  </div>
                  <div className="text-xs text-center text-zinc-400">Canal / Ferramenta<br/>Ação Específica</div>
                </div>
              ))}
            </div>
          ))}
        </div>
        
        {/* Remarketing Loop Arrow */}
        <div className="absolute bottom-4 left-1/2 w-[60%] h-8 border-b-2 border-l-2 border-red-600/50 rounded-bl-xl -translate-x-1/2" />
        <div className="absolute bottom-11 right-[20%] w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-red-600/50 rotate-90" />
      </div>
    </div>
  )
}

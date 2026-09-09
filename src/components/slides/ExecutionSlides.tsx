import React from "react"
import { SlideProps } from "../../types"
import { ArrowUpRight, CheckSquare } from "lucide-react"

export function GanttSlide({ data }: SlideProps) {
  const { titulo, nome_playbook } = data.content_slots
  
  return (
    <div className="w-full h-full bg-zinc-950 flex flex-col text-white p-16">
      <div className="flex items-center gap-3 mb-8">
        <ArrowUpRight className="w-8 h-8 text-red-600" />
        <h2 className="text-3xl font-bold">{titulo}</h2>
      </div>

      <div className="flex-1 border border-zinc-800 rounded-xl overflow-hidden flex flex-col bg-zinc-900">
        <div className="flex bg-red-600 font-bold text-sm">
          <div className="w-[40%] p-4 border-r border-red-700/50 uppercase tracking-widest">
            {nome_playbook || "Playbook"}
          </div>
          <div className="w-[15%] p-4 text-center border-r border-red-700/50">RESPONSÁVEL</div>
          <div className="flex-1 flex">
            {[1,2,3,4,5,6].map(w => (
              <div key={w} className="flex-1 p-4 text-center border-r border-red-700/50 last:border-0">W{w}</div>
            ))}
          </div>
        </div>

        {/* Mock Data Rows */}
        {[
          { phase: "Setup Inicial", tasks: ["Criação de Contas", "Instalação de Tags", "Integração CRM"] },
          { phase: "Campanhas Meta", tasks: ["Estruturação Fundo", "Criativos v1", "Lançamento"] }
        ].map((block, i) => (
          <div key={i} className="flex flex-col">
            <div className="bg-red-950/30 text-red-400 font-bold text-xs p-2 pl-4 border-y border-zinc-800 uppercase tracking-widest">
              {block.phase}
            </div>
            {block.tasks.map((task, j) => (
              <div key={j} className="flex text-sm border-b border-zinc-800/50 last:border-0 hover:bg-zinc-800/50 transition-colors">
                <div className="w-[40%] p-4 border-r border-zinc-800/50 text-zinc-300">
                  {task}
                </div>
                <div className="w-[15%] p-4 text-center border-r border-zinc-800/50 text-zinc-500 text-xs flex items-center justify-center">
                  V4 + CLIENTE
                </div>
                <div className="flex-1 flex">
                  {[1,2,3,4,5,6].map(w => (
                    <div key={w} className="flex-1 p-4 border-r border-zinc-800/50 last:border-0 flex items-center justify-center">
                       {/* Random checks */}
                       {(i === 0 && w <= 2) || (i === 1 && w > 2 && w <=4) ? (
                         <div className="w-3 h-3 bg-red-600 rounded-sm" />
                       ) : (
                         <div className="w-3 h-3 bg-zinc-800 rounded-sm border border-zinc-700" />
                       )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export function MediaPlanSlide({ data }: SlideProps) {
  const { titulo, mes_referencia } = data.content_slots
  
  return (
    <div className="w-full h-full bg-zinc-950 flex flex-col text-white p-16">
      <div className="flex items-center gap-3 mb-8">
        <ArrowUpRight className="w-8 h-8 text-red-600" />
        <h2 className="text-3xl font-bold">{titulo}</h2>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="bg-white text-zinc-950 px-6 py-3 rounded-xl font-bold flex items-center justify-center">
          LOGO CLIENTE
        </div>
        <div className="flex-1 flex bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden divide-x divide-zinc-800">
          {[
            { label: "Modelo", val: "B2B / SaaS" },
            { label: "Investimento", val: "R$ 10.000" },
            { label: "Nicho", val: "Tecnologia" },
            { label: "Step", val: "V1" }
          ].map(m => (
            <div key={m.label} className="flex-1 p-3 px-6 flex flex-col justify-center">
              <span className="text-xs text-zinc-500 uppercase tracking-widest">{m.label}</span>
              <span className="font-bold text-sm text-zinc-300">{m.val}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 border border-zinc-800 rounded-xl overflow-hidden flex flex-col bg-zinc-900 text-sm">
         <div className="bg-red-600 font-bold p-3 text-center uppercase tracking-widest border-b border-red-700">
           Plano de Mídia - {mes_referencia || "Mês Atual"}
         </div>
         <div className="flex text-zinc-400 text-xs font-bold uppercase tracking-wider border-b border-zinc-800 bg-zinc-950/50">
           <div className="w-1/6 p-3 border-r border-zinc-800 text-center">Canal</div>
           <div className="w-1/6 p-3 border-r border-zinc-800 text-center">Objetivo</div>
           <div className="w-2/6 p-3 border-r border-zinc-800">Campanhas</div>
           <div className="w-1/6 p-3 border-r border-zinc-800 text-right">Inv/Campanha</div>
           <div className="w-1/6 p-3 text-right">Inv Total</div>
         </div>

         {/* Mock Rows */}
         <div className="flex border-b border-zinc-800/50">
           <div className="w-1/6 p-4 border-r border-zinc-800/50 flex flex-col items-center justify-center gap-2">
             <div className="w-8 h-8 bg-zinc-800 rounded flex items-center justify-center text-[10px]">META</div>
           </div>
           <div className="w-1/6 p-4 border-r border-zinc-800/50 flex items-center justify-center text-center">
             Geração de Leads
           </div>
           <div className="w-2/6 border-r border-zinc-800/50 flex flex-col">
             <div className="p-3 border-b border-zinc-800/50">C1: Fundo de Funil - Oferta Direta</div>
             <div className="p-3">C2: Retargeting - Visitantes 30d</div>
           </div>
           <div className="w-1/6 border-r border-zinc-800/50 flex flex-col font-mono">
             <div className="p-3 border-b border-zinc-800/50 text-right">R$ 4.000</div>
             <div className="p-3 text-right">R$ 1.000</div>
           </div>
           <div className="w-1/6 p-4 flex items-center justify-end font-mono font-bold text-red-400">
             R$ 5.000
           </div>
         </div>

         <div className="flex">
           <div className="w-1/6 p-4 border-r border-zinc-800/50 flex flex-col items-center justify-center gap-2">
             <div className="w-8 h-8 bg-zinc-800 rounded flex items-center justify-center text-[10px]">GOOG</div>
           </div>
           <div className="w-1/6 p-4 border-r border-zinc-800/50 flex items-center justify-center text-center">
             Intenção de Busca
           </div>
           <div className="w-2/6 border-r border-zinc-800/50 flex flex-col">
             <div className="p-3">C1: Rede de Pesquisa - Institucional/Fundo</div>
           </div>
           <div className="w-1/6 border-r border-zinc-800/50 flex flex-col font-mono">
             <div className="p-3 text-right">R$ 5.000</div>
           </div>
           <div className="w-1/6 p-4 flex items-center justify-end font-mono font-bold text-red-400">
             R$ 5.000
           </div>
         </div>
      </div>
    </div>
  )
}

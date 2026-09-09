import React from "react"
import { SlideProps } from "../../types"
import { ArrowUpRight, CheckCircle2, ThumbsUp } from "lucide-react"

export function CoverSlide({ data }: SlideProps) {
  const { titulo_principal, logo_cliente, data_apresentacao, logo_agencia, legenda_rodape } = data.content_slots
  return (
    <div className="w-full h-full bg-zinc-950 flex relative overflow-hidden text-white">
      {/* Right side background image metaphor */}
      <div className="absolute right-0 top-0 w-1/2 h-full bg-zinc-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 to-transparent z-10" />
        <img src="https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=1200&q=80" alt="Strategy" className="w-full h-full object-cover opacity-50" />
      </div>
      
      {/* Gradient accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-transparent z-20" />

      <div className="relative z-20 flex flex-col justify-center p-16 w-2/3 h-full">
        <h1 className="text-5xl lg:text-6xl font-bold leading-tight max-w-2xl text-white">
          {titulo_principal || "Planejamento Estratégico de Marketing"}
        </h1>
        
        <div className="mt-auto">
          <div className="text-zinc-500 font-semibold tracking-wider text-sm mb-2 uppercase">Apresentado por</div>
          <div className="flex items-center gap-4">
            <div className="bg-red-600 text-white font-bold py-2 px-4 rounded">AGÊNCIA</div>
          </div>
        </div>
      </div>

      <div className="absolute right-16 top-16 z-20">
        <div className="bg-white p-6 rounded-xl shadow-2xl flex flex-col items-center gap-2">
          <div className="w-32 h-12 bg-zinc-200 rounded flex items-center justify-center text-zinc-500 font-bold">CLIENTE LOGO</div>
          <span className="text-zinc-500 text-xs font-semibold">{data_apresentacao || "Data do Projeto"}</span>
        </div>
      </div>
      
      {legenda_rodape && (
        <div className="absolute bottom-8 left-0 w-full text-center text-zinc-600 text-xs z-20 uppercase tracking-widest">
          {legenda_rodape}
        </div>
      )}
    </div>
  )
}

export function TimelineSlide({ data }: SlideProps) {
  const { titulo, etapas_timeline, etapa_atual_destacada, label_fase_rodape } = data.content_slots
  
  return (
    <div className="w-full h-full bg-zinc-950 flex flex-col relative text-white p-16">
      <h2 className="text-4xl font-bold text-center mb-24 mt-8">{titulo}</h2>
      
      <div className="flex-1 flex items-center justify-center">
        <div className="flex items-center gap-2 w-full max-w-5xl">
          {etapas_timeline?.map((etapa: string, index: number) => {
            const isCurrent = etapa === etapa_atual_destacada
            return (
              <React.Fragment key={index}>
                <div className={`relative flex flex-col items-center flex-1 ${isCurrent ? 'scale-110 z-10' : 'opacity-60'}`}>
                  {isCurrent && (
                    <div className="absolute -top-12 bg-zinc-800 text-red-400 text-xs py-1 px-3 rounded-full font-semibold border border-red-900/50 mb-4 whitespace-nowrap">
                      Você está aqui
                    </div>
                  )}
                  <div className={`
                    w-full py-4 px-2 text-center rounded-sm font-bold text-sm
                    ${isCurrent ? 'bg-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.3)] ring-2 ring-red-500 ring-offset-2 ring-offset-zinc-950' : 'bg-zinc-900 text-zinc-400'}
                  `}>
                    {etapa}
                  </div>
                </div>
                {index < etapas_timeline.length - 1 && (
                  <div className="w-8 h-0.5 bg-zinc-800 shrink-0" />
                )}
              </React.Fragment>
            )
          })}
        </div>
      </div>

      <div className="mt-auto border-t border-zinc-800 pt-6 flex justify-between items-center text-zinc-500 text-sm font-semibold uppercase tracking-widest">
        <span>Fase: <span className="text-red-500">{label_fase_rodape}</span></span>
      </div>
    </div>
  )
}

export function AgendaSlide({ data }: SlideProps) {
  const { titulo, itens_agenda } = data.content_slots
  
  return (
    <div className="w-full h-full bg-zinc-950 flex relative text-white p-16 overflow-hidden">
      <div className="absolute right-0 top-0 w-1/2 h-full opacity-10 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-current text-red-500">
          <circle cx="80" cy="50" r="40" />
          <circle cx="90" cy="20" r="10" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-3xl">
        <h2 className="text-5xl font-bold text-red-600 mb-16">{titulo}</h2>
        <div className="flex flex-col gap-8">
          {itens_agenda?.map((item: string, idx: number) => (
            <div key={idx} className="flex items-center gap-6 group">
              <span className="text-4xl font-light text-zinc-700 group-hover:text-red-500 transition-colors w-12">{(idx + 1).toString().padStart(2, '0')}</span>
              <span className="text-2xl font-medium text-zinc-300 group-hover:text-white transition-colors">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function DividerSlide({ data }: SlideProps) {
  const { titulo_secao, icone } = data.content_slots
  
  return (
    <div className="w-full h-full bg-zinc-950 flex items-center relative text-white p-16 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=1200&q=80" alt="Background" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-transparent" />
      </div>
      
      <div className="relative z-10 max-w-4xl flex items-center gap-6">
        <ArrowUpRight className="w-16 h-16 text-red-600 shrink-0" />
        <h2 className="text-6xl font-bold text-white leading-tight">{titulo_secao}</h2>
      </div>
    </div>
  )
}

export function ClosingSlide({ data }: SlideProps) {
  const { titulo_encerramento, texto_cta } = data.content_slots
  
  return (
    <div className="w-full h-full bg-zinc-950 flex flex-col items-center justify-center relative text-white p-16 overflow-hidden">
       <div className="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80" alt="Space" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/50 to-zinc-950" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-12">
        <h2 className="text-7xl font-bold text-center tracking-tight">{titulo_encerramento}</h2>
        
        <div className="flex gap-6 items-center">
           <div className="bg-white p-4 rounded-xl shadow-2xl flex items-center justify-center">
            <div className="w-32 h-8 bg-zinc-200 rounded flex items-center justify-center text-zinc-500 font-bold text-sm">AGÊNCIA</div>
          </div>
          <span className="text-zinc-500 font-light text-xl">+</span>
          <div className="bg-white p-4 rounded-xl shadow-2xl flex items-center justify-center">
            <div className="w-32 h-8 bg-zinc-200 rounded flex items-center justify-center text-zinc-500 font-bold text-sm">CLIENTE</div>
          </div>
        </div>

        <button className="mt-8 bg-green-600 hover:bg-green-500 text-white font-bold py-4 px-10 rounded-full flex items-center gap-3 text-lg transition-colors shadow-lg shadow-green-900/50">
          <ThumbsUp className="w-6 h-6" />
          {texto_cta}
        </button>
      </div>
    </div>
  )
}

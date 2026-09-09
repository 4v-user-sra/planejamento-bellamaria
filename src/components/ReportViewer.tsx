import React from "react"
import { presentationData } from "../data"
import { ArrowUpRight, ArrowRight, Target, Lightbulb, PlayCircle, Star, Calendar, CheckCircle2, ChevronRight, FileSpreadsheet, Network } from "lucide-react"

// Helper to determine section background based on type
function getSectionTheme(type: string) {
  if (['competitor_benchmark', 'campaign_strategy_boxes'].includes(type)) return 'bg-zinc-100 text-zinc-900 border-zinc-200'
  if (['moodboard_identity', 'spreadsheet_placeholder'].includes(type)) return 'bg-white text-zinc-900 border-zinc-200'
  if (['process_timeline', 'funnel_flow_diagram', 'visual_drawflow'].includes(type)) return 'bg-black text-zinc-300 border-zinc-900'
  if (['smart_goal_okr'].includes(type)) return 'bg-zinc-900 text-zinc-300 border-zinc-800'
  return 'bg-zinc-950 text-zinc-300 border-zinc-900'
}

function SectionWrapper({ children, themeClass }: { children: React.ReactNode; themeClass: string }) {
  return (
    <section className={`w-full min-h-[60vh] flex flex-col justify-center px-8 md:px-24 py-24 ${themeClass}`}>
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-12">
        {children}
      </div>
    </section>
  )
}

function RenderBlock({ slide }: { slide: any }) {
  const type = slide.slide_type
  const d = slide.content_slots
  const themeClass = getSectionTheme(type)
  const isLight = themeClass.includes('bg-white') || themeClass.includes('bg-zinc-100')

  const titleColor = isLight ? "text-zinc-900" : "text-white"
  const subtitleColor = isLight ? "text-zinc-600" : "text-zinc-400"
  const cardBg = isLight ? "bg-white border-zinc-200 shadow-sm" : "bg-zinc-900 border-zinc-800"

  if (type === 'cover') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-8">
        <h3 className="text-xl md:text-2xl font-serif text-zinc-400 tracking-widest uppercase">{d.logo_agencia}</h3>
        <h1 className="text-5xl md:text-7xl font-bold text-white max-w-4xl leading-tight tracking-tight">
          {d.titulo_principal}
        </h1>
        <div className="h-px w-24 bg-red-600 my-8"></div>
        <h2 className="text-3xl md:text-4xl font-light text-zinc-300 font-serif italic">
          {d.subtitulo}
        </h2>
        <div className="pt-16 flex flex-col items-center gap-4 text-zinc-500">
          <p className="text-lg tracking-wide uppercase">{d.data_apresentacao}</p>
          <p className="max-w-md">{d.legenda_rodape}</p>
        </div>
      </div>
    )
  }

  if (type === 'process_timeline') {
    return (
      <div>
        <h2 className={`text-4xl font-bold ${titleColor} mb-16 text-center`}>{d.titulo}</h2>
        <div className="flex flex-col md:flex-row justify-between items-center relative max-w-5xl mx-auto">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-zinc-800 md:hidden" />
          <div className="absolute top-1/2 left-0 right-0 h-px bg-zinc-800 hidden md:block" />
          
          {d.etapas_timeline?.map((etapa: string, i: number) => {
            const isCurrent = etapa === d.etapa_atual_destacada
            return (
              <div key={i} className="relative z-10 flex flex-col items-center gap-4 my-8 md:my-0 bg-black md:bg-transparent px-4">
                <div className={`w-8 h-8 rounded-full border-4 flex items-center justify-center ${isCurrent ? 'border-red-600 bg-black' : 'border-zinc-800 bg-zinc-900'}`}>
                  {isCurrent && <div className="w-2 h-2 rounded-full bg-red-600" />}
                </div>
                <span className={`text-sm md:text-base font-medium max-w-[120px] text-center ${isCurrent ? 'text-red-500' : 'text-zinc-500'}`}>
                  {etapa}
                </span>
              </div>
            )
          })}
        </div>
        <div className="mt-20 text-center">
          <p className="inline-block px-6 py-2 rounded-full bg-red-950/30 text-red-400 border border-red-900/50 mb-4">
            {d.label_fase_rodape}
          </p>
          <p className="text-zinc-500 max-w-xl mx-auto">{d.anotacoes_contextuais}</p>
        </div>
      </div>
    )
  }

  if (type === 'agenda_toc') {
    return (
      <div className="flex flex-col md:flex-row gap-12 items-start max-w-5xl mx-auto w-full">
        <div className="w-full md:w-1/3 pt-4">
           <h2 className={`text-4xl font-bold ${titleColor} sticky top-32`}>{d.titulo}</h2>
        </div>
        <div className="w-full md:w-2/3 flex flex-col gap-3 border-l border-zinc-800 pl-8 md:pl-12">
          {d.itens_agenda?.map((item: string, i: number) => (
            <div key={i} className="flex gap-6 group items-center transition-colors">
              <span className="text-xl font-bold text-red-600 font-mono w-6 text-right opacity-80">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className={`text-xl font-medium ${titleColor} opacity-80 group-hover:opacity-100 transition-opacity`}>
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (type === 'section_divider') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh] text-center">
        <Target className="w-16 h-16 text-red-600 mb-8 opacity-80" />
        <h2 className={`text-5xl font-bold ${titleColor} max-w-3xl leading-tight`}>{d.titulo_secao}</h2>
      </div>
    )
  }

  if (type === 'diagnostic_analysis') {
    return (
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className={`text-4xl font-bold ${titleColor} mb-8`}>{d.titulo_slide}</h2>
          <div className="w-16 h-1 bg-red-600 mb-8"></div>
        </div>
        <div className="flex flex-col gap-6">
          {d.insights_bullets?.map((bullet: string, i: number) => (
            <div key={i} className={`flex items-start gap-4 p-6 rounded-2xl border ${cardBg}`}>
              <ArrowUpRight className="w-6 h-6 text-red-500 shrink-0 mt-1" />
              <p className={`text-lg leading-relaxed ${titleColor}`}>{bullet}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (type === 'three_pillar_framework') {
    return (
      <div>
        <h2 className={`text-4xl font-bold ${titleColor} text-center mb-16`}>{d.titulo}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((num) => (
            <div key={num} className={`p-8 rounded-2xl border ${cardBg} flex flex-col items-center text-center group hover:border-red-900/50 transition-colors`}>
              <div className="w-16 h-16 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center mb-6 shadow-inner">
                <span className="text-2xl font-bold text-red-600">{num}</span>
              </div>
              <h3 className={`text-2xl font-bold ${titleColor} mb-4`}>{d[`pilar_${num}_nome`]}</h3>
              <p className={`text-lg ${subtitleColor} leading-relaxed`}>{d[`pilar_${num}_texto`]}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (type === 'competitor_benchmark') {
    return (
      <div>
        <h2 className={`text-4xl font-bold ${titleColor} mb-12`}>{d.titulo}</h2>
        <div className="grid md:grid-cols-12 gap-8">
          <div className={`col-span-12 md:col-span-4 rounded-2xl border ${cardBg} p-8 flex flex-col justify-center items-center text-center`}>
            <span className="text-sm font-bold text-red-600 uppercase tracking-widest mb-4">{d.subtitulo}</span>
            <h3 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-4 leading-tight">{d.nome_concorrente}</h3>
          </div>
          <div className={`col-span-12 md:col-span-8 flex flex-col gap-4 rounded-2xl border ${cardBg} p-8`}>
            <h4 className={`text-xl font-bold ${titleColor} mb-4 flex items-center gap-2`}>
              <Lightbulb className="text-red-500" />
              Análise Estratégica
            </h4>
            {d.insights_bullets?.map((insight: string, i: number) => (
              <div key={i} className="flex gap-4 items-start pb-4 border-b border-zinc-100 last:border-0 last:pb-0">
                <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-1" />
                <p className={`text-lg ${subtitleColor} leading-relaxed`}>{insight}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (type === 'moodboard_identity') {
    return (
      <div>
        <h2 className={`text-4xl font-bold ${titleColor} mb-16 text-center`}>{d.titulo}</h2>
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-12">
            <div>
              <h4 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-4">Tipografia Principal</h4>
              <p className="text-5xl font-serif text-zinc-900 mb-2">{d.tipografia_principal}</p>
              <p className="text-2xl font-serif text-zinc-500 italic">Libre Baskerville</p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-4">Tipografia Secundária</h4>
              <p className="text-4xl font-sans font-bold text-zinc-900 mb-2">{d.tipografia_secundaria}</p>
              <p className="text-xl font-sans text-zinc-500">Google Sans / System UI</p>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-6">Paleta de Cores</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {d.paleta_cores?.map((cor: string, i: number) => (
                <div key={i} className="flex flex-col gap-2">
                  <div 
                    className="w-full aspect-square rounded-2xl shadow-inner border border-zinc-200"
                    style={{ backgroundColor: cor }}
                  />
                  <span className="text-sm font-mono text-zinc-500 text-center uppercase">{cor}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (type === 'persona_profile') {
    return (
      <div className={`p-8 md:p-12 rounded-3xl border ${cardBg}`}>
        <div className="flex flex-col md:flex-row gap-12">
          <div className="md:w-1/3">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-950/30 text-red-500 font-bold mb-6">
              <Target className="w-5 h-5" /> Persona {d.numero_persona}
            </div>
            <h2 className={`text-4xl font-bold ${titleColor} mb-8 leading-tight`}>{d.nome_persona}</h2>
            <div className="space-y-4">
              <div className="flex justify-between border-b border-zinc-800 pb-2">
                <span className="text-zinc-500">Local</span>
                <span className={titleColor}>{d.local}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-800 pb-2">
                <span className="text-zinc-500">Idade</span>
                <span className={titleColor}>{d.idade}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-800 pb-2">
                <span className="text-zinc-500">Renda</span>
                <span className={titleColor}>{d.renda}</span>
              </div>
            </div>
          </div>
          <div className="md:w-2/3 grid md:grid-cols-2 gap-8">
            <div className="space-y-8">
              <div>
                <h4 className="text-lg font-bold text-red-500 mb-4 flex items-center gap-2">Dores</h4>
                <ul className="space-y-3">
                  {d.dores_bullets?.map((item: string, i: number) => (
                    <li key={i} className={`flex gap-3 text-lg ${subtitleColor} leading-relaxed`}><span className="text-red-600 mt-1.5">•</span> {item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-bold text-emerald-500 mb-4 flex items-center gap-2">Desejos</h4>
                <ul className="space-y-3">
                  {d.desejos_bullets?.map((item: string, i: number) => (
                    <li key={i} className={`flex gap-3 text-lg ${subtitleColor} leading-relaxed`}><span className="text-emerald-600 mt-1.5">•</span> {item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-bold text-amber-500 mb-4 flex items-center gap-2">Objeções de Compra</h4>
              <ul className="space-y-3">
                {d.objecoes_bullets?.map((item: string, i: number) => (
                  <li key={i} className={`flex gap-3 text-lg ${subtitleColor} leading-relaxed`}><span className="text-amber-600 mt-1.5">•</span> {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (type === 'smart_goal_okr') {
    return (
      <div className={`p-12 rounded-3xl border border-red-900/50 bg-gradient-to-br from-zinc-950 to-red-950/20`}>
        <div className="text-center max-w-4xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-red-600 text-white font-bold text-sm tracking-widest uppercase mb-6">{d.fase_projeto}</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">{d.titulo}</h2>
          <p className="text-xl md:text-2xl text-red-100 leading-relaxed font-serif italic">{d.objetivo_geral}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[1,2,3].map((num) => (
            <div key={num} className="bg-black/50 border border-red-900/30 p-6 rounded-2xl flex flex-col gap-4 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-red-950 flex items-center justify-center text-red-500 font-bold font-mono">KR{num}</div>
              </div>
              <p className="text-lg text-zinc-300">{d[`kr${num}_texto`]}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (type === 'campaign_strategy_boxes') {
    return (
      <div>
        <h2 className={`text-4xl font-bold ${titleColor} text-center mb-16`}>{d.titulo}</h2>
        <div className="flex flex-col md:flex-row gap-6 w-full">
          {d.boxes?.map((box: any, i: number) => (
            <div key={i} className={`flex-1 ${cardBg} border rounded-2xl p-8 flex flex-col shadow-sm hover:-translate-y-1 transition-transform`}>
              <span className="text-5xl font-bold text-red-600 mb-4">{box.percentual}</span>
              <h3 className={`text-2xl font-bold ${titleColor} mb-4`}>{box.nome}</h3>
              <p className={`text-lg ${subtitleColor} leading-relaxed`}>{box.detalhes}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (type === 'creative_scripts') {
    return (
      <div>
        <h2 className={`text-4xl font-bold ${titleColor} mb-12`}>{d.titulo}</h2>
        <div className="space-y-8">
          {d.roteiros?.map((roteiro: any, i: number) => (
            <div key={i} className={`p-8 rounded-2xl border ${cardBg}`}>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3 border-b md:border-b-0 md:border-r border-zinc-800 pb-6 md:pb-0 md:pr-8">
                  <div className="flex items-center gap-2 mb-4">
                    <PlayCircle className="w-6 h-6 text-red-500" />
                    <h3 className={`text-2xl font-bold ${titleColor}`}>{roteiro.tipo}</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <span className="block text-sm font-bold text-zinc-500 uppercase">Tom</span>
                      <span className={subtitleColor}>{roteiro.tom}</span>
                    </div>
                    <div>
                      <span className="block text-sm font-bold text-zinc-500 uppercase">Veiculação</span>
                      <span className={subtitleColor}>{roteiro.veiculacao}</span>
                    </div>
                  </div>
                </div>
                <div className="md:w-2/3">
                  <span className="block text-sm font-bold text-zinc-500 uppercase mb-4">Estrutura do Vídeo</span>
                  <p className={`text-lg ${titleColor} leading-relaxed font-serif`}>"{roteiro.estrutura}"</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (type === 'visual_drawflow') {
    return (
      <div className="flex flex-col items-center py-12 w-full overflow-x-auto">
         <h2 className={`text-4xl font-bold ${titleColor} mb-16 self-start`}>{d.titulo}</h2>
         
         <div className="min-w-[800px] w-full flex flex-col items-center">
           {/* Top Node */}
           <div className="bg-blue-900/30 border border-blue-500/50 text-blue-400 font-bold px-8 py-4 rounded-xl flex items-center gap-3">
              <Network className="w-5 h-5" />
              Meta Ads & Tráfego Pago
           </div>

           <div className="h-12 w-px bg-zinc-700" />
           <div className="w-[80%] h-px bg-zinc-700" />
           
           <div className="flex w-[80%] justify-between">
              <div className="h-12 w-px bg-zinc-700 relative"><ChevronRight className="absolute -bottom-2 -left-2.5 w-5 h-5 text-zinc-500 rotate-90" /></div>
              <div className="h-12 w-px bg-zinc-700 relative"><ChevronRight className="absolute -bottom-2 -left-2.5 w-5 h-5 text-zinc-500 rotate-90" /></div>
              <div className="h-12 w-px bg-zinc-700 relative"><ChevronRight className="absolute -bottom-2 -left-2.5 w-5 h-5 text-zinc-500 rotate-90" /></div>
           </div>

           <div className="flex w-full justify-between gap-6 px-12 mt-4">
             <div className="flex-1 bg-zinc-900 border border-zinc-800 p-6 rounded-xl text-center shadow-lg">
                <h4 className="font-bold text-red-500 mb-2 text-xl">Reconhecimento</h4>
                <p className="text-sm text-zinc-400">Público Frio • Awareness</p>
             </div>
             <div className="flex-1 bg-zinc-900 border border-zinc-800 p-6 rounded-xl text-center shadow-lg">
                <h4 className="font-bold text-red-500 mb-2 text-xl">Conversão Delivery</h4>
                <p className="text-sm text-zinc-400">Remarketing • Foco em Pedidos</p>
             </div>
             <div className="flex-1 bg-zinc-900 border border-zinc-800 p-6 rounded-xl text-center shadow-lg">
                <h4 className="font-bold text-red-500 mb-2 text-xl">Tração de Salão</h4>
                <p className="text-sm text-zinc-400">Pino Fixo • Experiência Local</p>
             </div>
           </div>

           <div className="flex w-[80%] justify-between mt-6">
              <div className="h-12 w-px bg-zinc-700" />
              <div className="h-12 w-px bg-zinc-700" />
              <div className="h-12 w-px bg-zinc-700" />
           </div>
           <div className="w-[80%] h-px bg-zinc-700" />
           <div className="h-12 w-px bg-zinc-700 relative"><ChevronRight className="absolute -bottom-2 -left-2.5 w-5 h-5 text-zinc-500 rotate-90" /></div>

           <div className="bg-red-600 text-white font-bold px-12 py-5 rounded-xl shadow-xl shadow-red-900/30 flex items-center gap-3 text-lg mt-4">
              Cardápio Web & Salão Físico
           </div>

           <div className="h-12 w-px bg-zinc-700 relative"><ChevronRight className="absolute -bottom-2 -left-2.5 w-5 h-5 text-zinc-500 rotate-90" /></div>

           <div className="bg-emerald-900/30 border border-emerald-500/50 text-emerald-400 font-bold px-8 py-4 rounded-xl flex items-center gap-3 mt-4">
              CRM, Retenção & LTV
           </div>
         </div>
      </div>
    )
  }

  if (type === 'spreadsheet_placeholder') {
    return (
      <div>
         <div className="flex items-center gap-4 mb-12">
           <FileSpreadsheet className="w-10 h-10 text-red-600" />
           <h2 className={`text-4xl font-bold ${titleColor}`}>{d.titulo}</h2>
         </div>
         
         <div className="w-full h-[500px] bg-white border border-zinc-200 rounded-xl shadow-sm overflow-hidden flex flex-col relative">
           {/* Excel Header */}
           <div className="w-full h-8 bg-zinc-100 border-b border-zinc-200 flex">
              <div className="w-12 h-full border-r border-zinc-200 bg-zinc-100" />
              {['A', 'B', 'C', 'D', 'E', 'F'].map(col => (
                <div key={col} className="flex-1 border-r border-zinc-200 flex items-center justify-center text-xs font-mono text-zinc-400 font-bold">{col}</div>
              ))}
           </div>
           {/* Excel Rows */}
           <div className="flex-1 flex flex-col">
             {[1,2,3,4,5,6,7,8,9,10].map(row => (
               <div key={row} className="flex-1 flex border-b border-zinc-100 last:border-0">
                  <div className="w-12 h-full border-r border-zinc-200 bg-zinc-50 flex items-center justify-center text-xs font-mono text-zinc-400">{row}</div>
                  {['A', 'B', 'C', 'D', 'E', 'F'].map(col => (
                    <div key={col} className="flex-1 border-r border-zinc-100" />
                  ))}
               </div>
             ))}
           </div>
           
           {/* Overlay overlay */}
           <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center">
              <div className="bg-white border border-zinc-200 shadow-2xl rounded-2xl p-8 max-w-md text-center flex flex-col items-center">
                <FileSpreadsheet className="w-16 h-16 text-zinc-300 mb-6" />
                <h3 className="text-2xl font-bold text-zinc-900 mb-3">Planilha de {d.tipo_planilha}</h3>
                <p className="text-zinc-500 text-base leading-relaxed">
                  Este espaço está reservado para a inserção da planilha interativa de <b>{d.tipo_planilha}</b>.
                </p>
              </div>
           </div>
         </div>
      </div>
    )
  }

  // Fallback for missing types
  return (
    <div className={`p-8 border border-red-500 ${cardBg} text-red-500`}>
      <p>⚠️ Missing renderer for slide type: {type}</p>
    </div>
  )
}

export default function ReportViewer() {
  const { slides } = presentationData

  return (
    <div className="min-h-screen bg-zinc-950 selection:bg-red-500/30 font-sans">
      {slides.map((slide, index) => {
        const themeClass = getSectionTheme(slide.slide_type)
        return (
          <SectionWrapper key={slide.id || index} themeClass={themeClass}>
            <RenderBlock slide={slide} />
          </SectionWrapper>
        )
      })}
    </div>
  )
}

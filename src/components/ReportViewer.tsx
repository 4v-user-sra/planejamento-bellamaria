import React, { useState } from "react"
import { presentationData } from "../data"
import { ArrowUpRight, ArrowRight, Target, Lightbulb, PlayCircle, Star, Calendar, CheckCircle2, ChevronRight, FileSpreadsheet, Network, FileText, Video, Rocket, ExternalLink, AlertTriangle, ShoppingCart, Ban, RefreshCw, BarChart2, TrendingUp, DollarSign } from "lucide-react"

const themeMap: Record<string, string> = {
  "01_capa": "bg-zinc-950 text-zinc-300 border-zinc-900",
  "02_recapitulando_jornada": "bg-zinc-200 text-zinc-900 border-zinc-300",
  "03_sumario": "bg-white text-zinc-900 border-zinc-200",
  "04_divisor_secao_1": "bg-zinc-900 text-zinc-100 border-zinc-800",
  "05_analise_social": "bg-zinc-50 text-zinc-900 border-zinc-200",
  "06_analise_site": "bg-zinc-100 text-zinc-900 border-zinc-200",
  "07_analise_meta": "bg-white text-zinc-900 border-zinc-200",
  "08_diferenciais": "bg-zinc-950 text-zinc-300 border-zinc-900",
  "09_divisor_secao_2": "bg-zinc-900 text-zinc-100 border-zinc-800",
  "10_benchmarking_1": "bg-zinc-50 text-zinc-900 border-zinc-200",
  "11_benchmarking_2": "bg-white text-zinc-900 border-zinc-200",
  "12_moodboard": "bg-zinc-200 text-zinc-900 border-zinc-300",
  "14_persona_1": "bg-zinc-900 text-zinc-300 border-zinc-800",
  "15_persona_2": "bg-zinc-950 text-zinc-300 border-zinc-900",
  "17_objetivo_smart": "bg-black text-zinc-300 border-zinc-900",
  "13_estrategia": "bg-white text-zinc-900 border-zinc-200",
  "13_estrategia_campanhas": "bg-zinc-50 text-zinc-900 border-zinc-200",
  "21_criativos": "bg-zinc-100 text-zinc-900 border-zinc-200",
  "18_drawflow_funil": "bg-zinc-900 text-zinc-100 border-zinc-800",
  "19_cronograma": "bg-white text-zinc-900 border-zinc-200",
  "20_plano_midia": "bg-zinc-50 text-zinc-900 border-zinc-200"
}

// Helper to determine section background based on type
function getSectionTheme(id: string, type: string) {
  if (themeMap[id]) return themeMap[id]
  
  if (['competitor_benchmark', 'campaign_strategy_boxes'].includes(type)) return 'bg-zinc-100 text-zinc-900 border-zinc-200'
  if (['moodboard_identity', 'spreadsheet_placeholder'].includes(type)) return 'bg-white text-zinc-900 border-zinc-200'
  if (['process_timeline', 'funnel_flow_diagram', 'visual_drawflow'].includes(type)) return 'bg-black text-zinc-300 border-zinc-900'
  if (['smart_goal_okr'].includes(type)) return 'bg-zinc-900 text-zinc-300 border-zinc-800'
  return 'bg-zinc-950 text-zinc-300 border-zinc-900'
}

function SectionWrapper({ children, themeClass }: { children: React.ReactNode; themeClass: string; key?: React.Key }) {
  return (
    <section className={`w-full min-h-[60vh] flex flex-col justify-center px-8 md:px-24 py-24 ${themeClass} transition-colors duration-500`}>
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-12">
        {children}
      </div>
    </section>
  )
}

function RenderBlock({ slide }: { slide: any }) {
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  const type = slide.slide_type
  const d = slide.content_slots
  const themeClass = getSectionTheme(slide.id, type)
  const isLight = themeClass.includes('bg-white') || themeClass.includes('bg-zinc-50') || themeClass.includes('bg-zinc-100') || themeClass.includes('bg-zinc-200')

  let titleColor = isLight ? "text-zinc-900" : "text-white"
  let subtitleColor = isLight ? "text-zinc-600" : "text-zinc-400"
  let cardBg = isLight ? "bg-white border-zinc-200 shadow-sm" : "bg-zinc-900 border-zinc-800"

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
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start relative max-w-5xl mx-auto">
          <div className="absolute left-1/2 top-4 bottom-0 w-px bg-zinc-300 md:hidden" />
          <div className="absolute top-4 left-0 right-0 h-px bg-zinc-300 hidden md:block" />
          
          {d.etapas_timeline?.map((etapa: string, i: number) => {
            const isCurrent = etapa === d.etapa_atual_destacada
            return (
              <div key={i} className="relative z-10 flex flex-col items-center gap-4 flex-1 px-2 my-4 md:my-0">
                <div className="h-8 flex items-center justify-center">
                  <div className={`w-8 h-8 rounded-full border-4 flex items-center justify-center relative z-10 ${isCurrent ? 'border-red-600 bg-white' : 'border-zinc-300 bg-white'}`}>
                    {isCurrent && <div className="w-2 h-2 rounded-full bg-red-600" />}
                  </div>
                </div>
                <span className={`text-sm md:text-base font-medium text-center ${isCurrent ? 'text-red-600' : subtitleColor}`}>
                  {etapa}
                </span>
              </div>
            )
          })}
        </div>
        <div className="mt-20 text-center">
          {d.label_fase_rodape && (
            <p className={`inline-block px-6 py-2 rounded-full ${isLight ? 'bg-red-100 text-red-700 border-red-200' : 'bg-red-950/30 text-red-400 border-red-900/50'} mb-4`}>
              {d.label_fase_rodape}
            </p>
          )}
          {d.anotacoes_contextuais && (
            <p className={`${subtitleColor} max-w-xl mx-auto`}>{d.anotacoes_contextuais}</p>
          )}
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
        <div className={`w-full md:w-2/3 flex flex-col gap-3 border-l ${isLight ? 'border-zinc-200' : 'border-zinc-800'} pl-8 md:pl-12`}>
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
        <Target className={`w-16 h-16 text-red-600 mb-8 opacity-80`} />
        <h2 className={`text-5xl font-bold ${titleColor} max-w-3xl leading-tight`}>{d.titulo_secao}</h2>
      </div>
    )
  }

  if (type === 'diagnostic_analysis') {
    return (
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div className="flex flex-col h-full justify-center">
          <h2 className={`text-4xl font-bold ${titleColor} mb-8`}>{d.titulo_slide}</h2>
          <div className="w-16 h-1 bg-red-600 mb-8"></div>
          
          {/* Sessão de Imagem / Print */}
          {(d.imagem_url || d.image_placeholder) && (
            <div className="flex flex-col gap-4">
              <div className={`mt-4 w-full rounded-2xl border-2 ${d.imagem_url ? (isLight ? 'border-zinc-200 shadow-xl' : 'border-zinc-800 shadow-2xl') : (isLight ? 'border-dashed border-zinc-300 bg-zinc-50' : 'border-dashed border-zinc-800 bg-zinc-900/50')} overflow-hidden flex items-center justify-center relative`}>
                 {d.imagem_url ? (
                    <img 
                      src={d.imagem_url} 
                      alt="Print da Plataforma" 
                      className="w-full h-auto object-contain cursor-pointer transition-transform hover:scale-[1.02]" 
                      style={{ maxHeight: '650px' }} 
                      onClick={() => setExpandedImage(d.imagem_url)}
                    />
                 ) : (
                    <div className="flex flex-col items-center justify-center text-center p-12 opacity-50 min-h-[250px]">
                       <Target className="w-12 h-12 mb-4" />
                       <p className="font-bold text-lg">{d.image_placeholder}</p>
                       <p className="text-sm mt-2">Área reservada para inserir a imagem</p>
                    </div>
                 )}
              </div>
              {d.imagens_secundarias && (
                <div className="flex gap-4 w-full">
                  {d.imagens_secundarias.map((imgUrl: string, idx: number) => (
                    <div key={idx} className={`flex-1 rounded-xl border-2 ${isLight ? 'border-zinc-200 shadow-md' : 'border-zinc-800 shadow-xl'} overflow-hidden cursor-pointer transition-transform hover:scale-105`} onClick={() => setExpandedImage(imgUrl)}>
                      <img src={imgUrl} alt={`Destaque ${idx + 1}`} className="w-full h-full object-cover aspect-square" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-6">
          {d.insights_estruturados ? d.insights_estruturados.map((insight: any, i: number) => {
            const isPositivo = insight.tipo === 'positivo';
            const Icon = isPositivo ? CheckCircle2 : Lightbulb;
            const iconColor = isPositivo ? 'text-emerald-500' : 'text-amber-500';
            const borderColor = isPositivo ? (isLight ? 'border-emerald-200 bg-emerald-50' : 'border-emerald-900/50 bg-emerald-950/20') : (isLight ? 'border-amber-200 bg-amber-50' : 'border-amber-900/50 bg-amber-950/20');
            
            return (
              <div key={i} className={`flex items-start gap-4 p-5 rounded-2xl border ${borderColor}`}>
                <Icon className={`w-6 h-6 shrink-0 mt-1 ${iconColor}`} />
                <div>
                   {insight.titulo && <span className={`font-bold ${iconColor} block mb-1 uppercase text-sm`}>{insight.titulo}</span>}
                   <p className={`text-[17px] leading-relaxed ${titleColor}`}>{insight.texto}</p>
                </div>
              </div>
            )
          }) : d.insights_bullets?.map((bullet: string, i: number) => (
            <div key={i} className={`flex items-start gap-4 p-6 rounded-2xl border ${cardBg}`}>
              <ArrowUpRight className="w-6 h-6 text-red-500 shrink-0 mt-1" />
              <p className={`text-lg leading-relaxed ${titleColor}`}>{bullet}</p>
            </div>
          ))}
        </div>

        {/* Modal / Lightbox */}
        {expandedImage && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-12 animate-in fade-in duration-300"
            onClick={() => setExpandedImage(null)}
          >
            <div className="relative max-w-7xl w-full h-full flex items-center justify-center">
              <img 
                src={expandedImage} 
                alt="Fullscreen" 
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-300" 
              />
            </div>
          </div>
        )}
      </div>
    )
  }

  if (type === 'three_pillar_framework') {
    return (
      <div>
        <h2 className={`text-4xl font-bold ${titleColor} text-center mb-16`}>{d.titulo}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((num) => (
            <div key={num} className={`p-8 rounded-2xl border ${cardBg} flex flex-col items-center text-center group transition-colors`}>
              <div className={`w-16 h-16 rounded-2xl ${isLight ? 'bg-zinc-100 border-zinc-200' : 'bg-zinc-950 border-zinc-800'} flex items-center justify-center mb-6 shadow-inner`}>
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
            <h3 className={`text-4xl md:text-5xl font-bold ${titleColor} mb-4 leading-tight`}>{d.nome_concorrente}</h3>
          </div>
          <div className={`col-span-12 md:col-span-8 flex flex-col gap-4 rounded-2xl border ${cardBg} p-8`}>
            <h4 className={`text-xl font-bold ${titleColor} mb-4 flex items-center gap-2`}>
              <Lightbulb className="text-red-500" />
              Análise Estratégica
            </h4>
            {d.insights_bullets?.map((insight: string, i: number) => (
              <div key={i} className={`flex gap-4 items-start pb-4 border-b ${isLight ? 'border-zinc-200' : 'border-zinc-800'} last:border-0 last:pb-0`}>
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
              <h4 className={`text-sm font-bold ${isLight ? 'text-zinc-500' : 'text-zinc-400'} uppercase tracking-widest mb-4`}>Tipografia Principal</h4>
              <p className={`text-5xl font-serif ${titleColor} mb-2`}>{d.tipografia_principal}</p>
              <p className={`text-2xl font-serif ${subtitleColor} italic`}>Libre Baskerville</p>
            </div>
            <div>
              <h4 className={`text-sm font-bold ${isLight ? 'text-zinc-500' : 'text-zinc-400'} uppercase tracking-widest mb-4`}>Tipografia Secundária</h4>
              <p className={`text-4xl font-sans font-bold ${titleColor} mb-2`}>{d.tipografia_secundaria}</p>
              <p className={`text-xl font-sans ${subtitleColor}`}>Google Sans / System UI</p>
            </div>
          </div>
          <div>
            <h4 className={`text-sm font-bold ${isLight ? 'text-zinc-500' : 'text-zinc-400'} uppercase tracking-widest mb-6`}>Paleta de Cores</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {d.paleta_cores?.map((cor: string, i: number) => (
                <div key={i} className="flex flex-col gap-2">
                  <div 
                    className={`w-full aspect-square rounded-2xl shadow-inner border ${isLight ? 'border-zinc-200' : 'border-zinc-800'}`}
                    style={{ backgroundColor: cor }}
                  />
                  <span className={`text-sm font-mono ${subtitleColor} text-center uppercase`}>{cor}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (type === 'vertical_feature_list') {
    return (
      <div>
        <h2 className={`text-4xl font-bold ${titleColor} text-center mb-16`}>{d.titulo}</h2>
        <div className="flex flex-col gap-6 max-w-4xl mx-auto">
          {d.features?.map((f: any, i: number) => (
            <div key={i} className={`p-8 rounded-2xl border ${cardBg} flex flex-col md:flex-row gap-8 items-start hover:border-red-500/50 transition-colors`}>
              <div className={`w-16 h-16 shrink-0 rounded-2xl ${isLight ? 'bg-zinc-100 border-zinc-200' : 'bg-zinc-950 border-zinc-800'} flex items-center justify-center shadow-inner`}>
                <span className="text-2xl font-bold text-red-600">0{i + 1}</span>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className={`text-2xl font-bold ${titleColor}`}>{f.titulo}</h3>
                <p className={`text-lg ${subtitleColor} leading-relaxed`}>{f.descricao}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
  if (type === 'vertical_feature_list') {
    return (
      <div>
        <h2 className={`text-4xl font-bold ${titleColor} text-center mb-16`}>{d.titulo}</h2>
        <div className="flex flex-col gap-6 max-w-4xl mx-auto">
          {d.features?.map((f: any, i: number) => (
            <div key={i} className={`p-8 rounded-2xl border ${cardBg} flex flex-col md:flex-row gap-8 items-start hover:border-red-500/50 transition-colors`}>
              <div className={`w-16 h-16 shrink-0 rounded-2xl ${isLight ? 'bg-zinc-100 border-zinc-200' : 'bg-zinc-950 border-zinc-800'} flex items-center justify-center shadow-inner`}>
                <span className="text-2xl font-bold text-red-600">0{i + 1}</span>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className={`text-2xl font-bold ${titleColor}`}>{f.titulo}</h3>
                <p className={`text-lg ${subtitleColor} leading-relaxed`}>{f.descricao}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (type === 'persona_profile') {
    return (
      <div className={`p-8 md:p-12 rounded-3xl border ${cardBg}`}>
        <div className="flex flex-col md:flex-row gap-12">
          <div className="md:w-1/3">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${isLight ? 'bg-red-100' : 'bg-red-950/30'} text-red-500 font-bold mb-6`}>
              <Target className="w-5 h-5" /> Persona {d.numero_persona}
            </div>
            <h2 className={`text-4xl font-bold ${titleColor} mb-8 leading-tight`}>{d.nome_persona}</h2>
            <div className="flex flex-wrap gap-2 mb-8">
              <div className={`px-4 py-2 rounded-xl text-sm font-bold border ${isLight ? 'bg-zinc-100 border-zinc-200' : 'bg-zinc-900 border-zinc-800'}`}>
                 <span className="text-zinc-500 block text-xs uppercase mb-1">Dispositivo</span>
                 <span className={titleColor}>{d.dispositivo}</span>
              </div>
              <div className={`px-4 py-2 rounded-xl text-sm font-bold border ${isLight ? 'bg-zinc-100 border-zinc-200' : 'bg-zinc-900 border-zinc-800'}`}>
                 <span className="text-zinc-500 block text-xs uppercase mb-1">Canais</span>
                 <span className={titleColor}>{d.canais}</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className={`flex justify-between border-b ${isLight ? 'border-zinc-200' : 'border-zinc-800'} pb-2`}>
                <span className={subtitleColor}>Local</span>
                <span className={titleColor}>{d.local}</span>
              </div>
              <div className={`flex justify-between border-b ${isLight ? 'border-zinc-200' : 'border-zinc-800'} pb-2`}>
                <span className={subtitleColor}>Idade</span>
                <span className={titleColor}>{d.idade}</span>
              </div>
              <div className={`flex justify-between border-b ${isLight ? 'border-zinc-200' : 'border-zinc-800'} pb-2`}>
                <span className={subtitleColor}>Renda</span>
                <span className={titleColor}>{d.renda}</span>
              </div>
            </div>
          </div>
          <div className="md:w-2/3 flex flex-col justify-center gap-8">
            <div className={`p-6 rounded-2xl border ${isLight ? 'bg-zinc-50 border-zinc-200' : 'bg-zinc-950 border-zinc-800'}`}>
              <h4 className="text-lg font-bold text-red-500 mb-4 flex items-center gap-2">Dores</h4>
              <ul className="space-y-3">
                {d.dores_bullets?.map((item: string, i: number) => (
                  <li key={i} className={`flex gap-3 text-lg ${subtitleColor} leading-relaxed`}><span className="text-red-600 mt-1.5">•</span> {item}</li>
                ))}
              </ul>
            </div>
            <div className={`p-6 rounded-2xl border ${isLight ? 'bg-zinc-50 border-zinc-200' : 'bg-zinc-950 border-zinc-800'}`}>
              <h4 className="text-lg font-bold text-emerald-500 mb-4 flex items-center gap-2">Desejos</h4>
              <ul className="space-y-3">
                {d.desejos_bullets?.map((item: string, i: number) => (
                  <li key={i} className={`flex gap-3 text-lg ${subtitleColor} leading-relaxed`}><span className="text-emerald-600 mt-1.5">•</span> {item}</li>
                ))}
              </ul>
            </div>
            <div className={`p-6 rounded-2xl border ${isLight ? 'bg-zinc-50 border-zinc-200' : 'bg-zinc-950 border-zinc-800'}`}>
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

  if (type === 'creative_workflow') {
    const icons: any = { FileText, CheckCircle2, Video, Rocket };

    return (
      <div className="flex flex-col items-center max-w-4xl mx-auto w-full">
        <h2 className={`text-4xl font-bold ${titleColor} mb-4 text-center`}>{d.titulo}</h2>
        <p className={`text-xl ${subtitleColor} mb-16 text-center`}>{d.subtitulo}</p>

        {/* Horizontal Workflow timeline */}
        <div className="flex flex-col md:flex-row items-center w-full justify-between relative mb-16 px-4">
           {/* Connecting Line */}
           <div className={`hidden md:block absolute top-8 left-12 right-12 h-1 -translate-y-1/2 rounded-full ${isLight ? 'bg-zinc-200' : 'bg-zinc-800'} z-0`} />

           {d.passos?.map((passo: any, i: number) => {
             const Icon = icons[passo.icone] || FileText;
             return (
               <div key={i} className="flex flex-col items-center text-center gap-4 group relative z-10 mb-8 md:mb-0 w-32">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border shadow-xl transition-all duration-300 group-hover:-translate-y-2 
                    ${isLight ? 'bg-white border-zinc-200 shadow-zinc-200/50' : 'bg-zinc-950 border-zinc-800 shadow-black/50'}`}>
                    <Icon className="w-7 h-7 text-red-500" />
                  </div>
                  <h4 className={`font-bold ${titleColor} leading-tight`}>{passo.titulo}</h4>
               </div>
             )
           })}
        </div>

        {/* Link / Button */}
        {d.link_exemplo && (
          <div className={`w-full mt-8 p-8 rounded-3xl border ${cardBg} flex flex-col items-center text-center gap-6 shadow-xl`}>
             <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mb-2">
                <FileText className="w-6 h-6 text-red-500" />
             </div>
             <h3 className={`text-2xl font-bold ${titleColor}`}>Documento de Direcionamento Exemplo:</h3>
             <a href={d.link_exemplo} target="_blank" rel="noreferrer" 
                className="group flex items-center gap-3 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-colors shadow-lg shadow-red-900/20">
                Acessar Documento no Google Docs
                <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
             </a>
             <p className={subtitleColor}>Veja o exemplo prático de um roteiro e direcionamento validado em campo.</p>
          </div>
        )}
      </div>
    )
  }


const HistoricalMetaAdsChart = ({ isLight }: { isLight: boolean }) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const data = [
    { mes: "Jan", pedidos: 45, cpa: 8.33, invest: "R$ 374,85", obs: "Campanhas com criativo e público frescos" },
    { mes: "Fev", pedidos: 59, cpa: 21.09, invest: "R$ 1.244,31", obs: "Aumento de verba inicial" },
    { mes: "Mar", pedidos: 76, cpa: 8.41, invest: "R$ 639,16", obs: "Excelente tração e eficiência (CPA R$8,41)" },
    { mes: "Abr", pedidos: 83, cpa: 11.83, invest: "R$ 981,89", obs: "Pico de volume de pedidos (83 pedidos)" },
    { mes: "Mai", pedidos: 6, cpa: 15.92, invest: "R$ 95,42", obs: "Queda brusca: verba de Compra quase parou (só R$95,42)" },
    { mes: "Jun", pedidos: 68, cpa: 14.63, invest: "R$ 994,82", obs: "Retomada da verba de compras" },
    { mes: "Jul", pedidos: 36, cpa: 19.85, invest: "R$ 714,60", obs: "Início da fadiga de público e criativo" },
    { mes: "Ago", pedidos: 11, cpa: 33.78, invest: "R$ 371,56", obs: "Fadiga severa: mesmo criativo mantido sem troca" }
  ];

  const maxPedidos = 100;
  const maxCpa = 40;
  const cpaMedia = 13.70;

  const svgWidth = 860;
  const svgHeight = 280;
  const paddingLeft = 55;
  const paddingRight = 65;
  const paddingTop = 35;
  const paddingBottom = 45;

  const plotWidth = svgWidth - paddingLeft - paddingRight;
  const plotHeight = svgHeight - paddingTop - paddingBottom;

  const getX = (index: number) => paddingLeft + (index + 0.5) * (plotWidth / data.length);
  const getYPedidos = (val: number) => paddingTop + plotHeight - (val / maxPedidos) * plotHeight;
  const getYCpa = (val: number) => paddingTop + plotHeight - (val / maxCpa) * plotHeight;

  const yCpaMedia = getYCpa(cpaMedia);

  const linePoints = data.map((d, i) => `${getX(i)},${getYCpa(d.cpa)}`).join(" ");

  return (
    <div className={`w-full rounded-2xl border ${isLight ? 'bg-white border-zinc-200' : 'bg-zinc-900/90 border-zinc-800'} p-6 shadow-xl`}>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b pb-4 border-zinc-200 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-red-600" />
            <h3 className={`text-lg font-bold ${isLight ? 'text-zinc-900' : 'text-zinc-100'}`}>
              Histórico de Vendas & CPA Mensal (Jan - Ago)
            </h3>
          </div>
          <p className={`text-xs mt-1 ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>
            Campanhas de Compra (Cardápio Web) — volume de pedidos vs. custo por aquisição
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-5 text-xs font-semibold">
          <div className="flex items-center gap-2">
            <div className="w-3.5 h-3.5 rounded bg-red-600 shadow-sm" />
            <span className={isLight ? 'text-zinc-700' : 'text-zinc-300'}>Pedidos (Barras)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 bg-amber-500 rounded-full" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500 -ml-3.5" />
            <span className={isLight ? 'text-zinc-700' : 'text-zinc-300'}>CPA em R$ (Linha)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 border-b-2 border-dashed border-emerald-500" />
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">Média: R$13,70</span>
          </div>
        </div>
      </div>

      {/* SVG Chart */}
      <div className="relative w-full overflow-x-auto">
        <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto min-w-[650px] font-sans">
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map((val) => {
            const y = getYPedidos(val);
            return (
              <g key={val}>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={svgWidth - paddingRight}
                  y2={y}
                  stroke={isLight ? '#f1f5f9' : '#27272a'}
                  strokeWidth="1"
                />
                {/* Left Y-axis label (Pedidos) */}
                <text
                  x={paddingLeft - 10}
                  y={y + 4}
                  textAnchor="end"
                  fontSize="10"
                  fill={isLight ? '#94a3b8' : '#71717a'}
                  fontWeight="600"
                >
                  {val}
                </text>
              </g>
            );
          })}

          {/* Right Y-axis labels (CPA) */}
          {[0, 10, 20, 30, 40].map((val) => {
            const y = getYCpa(val);
            return (
              <text
                key={val}
                x={svgWidth - paddingRight + 10}
                y={y + 4}
                textAnchor="start"
                fontSize="10"
                fill="#f59e0b"
                fontWeight="700"
              >
                R${val}
              </text>
            );
          })}

          {/* Reference Line for Average CPA */}
          <line
            x1={paddingLeft}
            y1={yCpaMedia}
            x2={svgWidth - paddingRight}
            y2={yCpaMedia}
            stroke="#10b981"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <text
            x={svgWidth - paddingRight - 8}
            y={yCpaMedia - 6}
            textAnchor="end"
            fontSize="10"
            fill="#10b981"
            fontWeight="bold"
          >
            CPA Médio R$13,70
          </text>

          {/* Bars for Pedidos */}
          {data.map((d, i) => {
            const x = getX(i);
            const barWidth = 38;
            const barHeight = (d.pedidos / maxPedidos) * plotHeight;
            const y = getYPedidos(d.pedidos);
            const isHovered = hoveredIdx === i;

            return (
              <g
                key={i}
                className="cursor-pointer transition-all duration-200"
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {/* Bar */}
                <rect
                  x={x - barWidth / 2}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  rx="6"
                  fill={d.pedidos < 15 ? '#f43f5e' : '#dc2626'}
                  opacity={isHovered ? 1 : 0.85}
                  className="transition-opacity duration-200"
                />
                
                {/* Pedidos value label on top of bar */}
                <text
                  x={x}
                  y={y - 6}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="bold"
                  fill={isLight ? '#1e293b' : '#f8fafc'}
                >
                  {d.pedidos}
                </text>

                {/* X-axis label (Mês) */}
                <text
                  x={x}
                  y={svgHeight - 15}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight={isHovered ? 'bold' : '600'}
                  fill={isHovered ? '#dc2626' : isLight ? '#475569' : '#a1a1aa'}
                >
                  {d.mes}
                </text>
              </g>
            );
          })}

          {/* CPA Line Path */}
          <polyline
            fill="none"
            stroke="#f59e0b"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={linePoints}
          />

          {/* CPA Dots & Badges */}
          {data.map((d, i) => {
            const x = getX(i);
            const y = getYCpa(d.cpa);
            const isHovered = hoveredIdx === i;

            return (
              <g
                key={i}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {/* Outer halo */}
                <circle
                  cx={x}
                  cy={y}
                  r={isHovered ? 8 : 5}
                  fill="#f59e0b"
                  stroke={isLight ? '#ffffff' : '#18181b'}
                  strokeWidth="2.5"
                  className="transition-all duration-200 shadow-md"
                />

                {/* CPA Pill/Label */}
                <g transform={`translate(${x}, ${y + (i === 1 || i === 7 ? -14 : 18)})`}>
                  <rect
                    x="-24"
                    y="-9"
                    width="48"
                    height="17"
                    rx="8"
                    fill={isLight ? '#fffbeb' : '#451a03'}
                    stroke="#f59e0b"
                    strokeWidth="1"
                    className="shadow-sm"
                  />
                  <text
                    x="0"
                    y="3"
                    textAnchor="middle"
                    fontSize="9.5"
                    fontWeight="800"
                    fill={isLight ? '#b45309' : '#fbbf24'}
                  >
                    R${d.cpa.toFixed(2).replace('.', ',')}
                  </text>
                </g>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Dynamic Hover Details or Default Callouts */}
      {hoveredIdx !== null ? (
        <div className={`mt-4 p-4 rounded-xl border transition-all ${isLight ? 'bg-red-50/80 border-red-200' : 'bg-red-950/30 border-red-900/50'} flex items-center justify-between gap-4`}>
          <div className="flex items-center gap-3">
            <span className="text-xl font-black text-red-600">{data[hoveredIdx].mes} 2026</span>
            <span className={`text-sm ${isLight ? 'text-zinc-600' : 'text-zinc-300'}`}>• {data[hoveredIdx].obs}</span>
          </div>
          <div className="flex items-center gap-6 text-sm font-bold">
            <div>Pedidos: <span className="text-red-600">{data[hoveredIdx].pedidos}</span></div>
            <div>Investimento: <span className="text-indigo-600">{data[hoveredIdx].invest}</span></div>
            <div>CPA: <span className="text-amber-600">R$ {data[hoveredIdx].cpa.toFixed(2).replace('.', ',')}</span></div>
          </div>
        </div>
      ) : (
        <div className="mt-4 grid md:grid-cols-2 gap-3 text-xs leading-relaxed">
          <div className={`p-3 rounded-xl border ${isLight ? 'bg-amber-50/80 border-amber-200 text-amber-900' : 'bg-amber-950/20 border-amber-900/40 text-amber-300'} flex items-start gap-2.5`}>
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong>Maio (6 pedidos):</strong> Pior mês do período porque a verba de Compra quase parou (R$95,42), migrando incorretamente para campanhas de Tráfego/Perfil.
            </div>
          </div>
          <div className={`p-3 rounded-xl border ${isLight ? 'bg-rose-50/80 border-rose-200 text-rose-900' : 'bg-rose-950/20 border-rose-900/40 text-rose-300'} flex items-start gap-2.5`}>
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <strong>Julho/Agosto (CPA subiu para R$19,85 e R$33,78):</strong> Efeito da <strong>fadiga de público e criativo</strong> mantido 2 a 3 meses sem renovação.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


  if (type === 'visual_drawflow') {
    return (
      <div className="flex flex-col items-center py-8 w-full overflow-x-auto">
        <div className="w-full flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className={`text-4xl font-bold ${titleColor}`}>{d.titulo}</h2>
            <p className={`text-base mt-2 ${subtitleColor}`}>{d.subtitulo || "Arquitetura otimizada para o orçamento aprovado de R$ 3.000/mês"}</p>
          </div>
          <div className="px-5 py-2.5 rounded-xl bg-red-600/10 border border-red-500/30 text-red-600 font-bold text-sm flex items-center gap-2 self-start">
            <Target className="w-4 h-4" />
            100% Foco em Conversão Rastreada
          </div>
        </div>
        
        <div className="min-w-[920px] w-full flex flex-col items-center relative">
          {/* Top Node */}
          <div className="bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 border-2 border-zinc-700 text-white font-extrabold px-10 py-4 rounded-2xl flex items-center gap-3 shadow-2xl z-10">
            <DollarSign className="w-6 h-6 text-emerald-400" />
            <div className="flex flex-col text-left">
              <span className="text-xs uppercase tracking-widest text-zinc-400 font-semibold">Orçamento Total Mensal</span>
              <span className="text-2xl text-emerald-400 font-black">R$ 3.000,00 / mês</span>
            </div>
          </div>

          {/* Vertical line from Top */}
          <div className={`h-10 w-px ${isLight ? 'bg-zinc-300' : 'bg-zinc-700'}`} />
          
          {/* Horizontal span line covering all 3 branches */}
          <div className={`w-[85%] h-px ${isLight ? 'bg-zinc-300' : 'bg-zinc-700'}`} />
          
          {/* 3 Dropdown lines */}
          <div className="flex w-[85%] justify-between">
            <div className={`h-10 w-px ${isLight ? 'bg-zinc-300' : 'bg-zinc-700'} relative`}>
              <ChevronRight className={`absolute -bottom-2 -left-2.5 w-5 h-5 ${isLight ? 'text-zinc-400' : 'text-zinc-500'} rotate-90`} />
            </div>
            <div className={`h-10 w-px ${isLight ? 'bg-zinc-300' : 'bg-zinc-700'} relative`}>
              <ChevronRight className={`absolute -bottom-2 -left-2.5 w-5 h-5 ${isLight ? 'text-zinc-400' : 'text-zinc-500'} rotate-90`} />
            </div>
            <div className={`h-10 w-px ${isLight ? 'bg-zinc-300' : 'bg-zinc-700'} relative`}>
              <ChevronRight className={`absolute -bottom-2 -left-2.5 w-5 h-5 ${isLight ? 'text-zinc-400' : 'text-zinc-500'} rotate-90`} />
            </div>
          </div>

          {/* 3 Campaign Branch Nodes */}
          <div className="flex w-full justify-between gap-6 px-4 mt-2 z-10">
            
            {/* Branch 1: Conversão (85%) */}
            <div className={`flex-[1.2] ${cardBg} p-6 rounded-2xl text-left shadow-xl border-2 border-emerald-500/60 relative flex flex-col justify-between overflow-hidden`}>
              <div className="absolute top-0 right-0 bg-emerald-500 text-white font-black text-xs px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                85% da Verba
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Motor Principal</span>
                </div>
                <h4 className={`font-black text-xl mb-1 ${titleColor}`}>Conversão Direta</h4>
                <p className="text-2xl font-black text-emerald-600 mb-3">R$ 2.550 <span className="text-xs font-semibold text-zinc-500">/mês</span></p>
                <div className={`text-xs ${isLight ? 'text-zinc-600' : 'text-zinc-300'} space-y-1.5`}>
                  <p><strong>Público:</strong> Aberto + Visitantes (180d) + Seguidores</p>
                  <p className="text-emerald-700 dark:text-emerald-400 font-medium">⚡ Rotação de criativos a cada 3 a 4 semanas para manter CPA baixo (R$8 a R$12)</p>
                </div>
              </div>
            </div>

            {/* Branch 2: Remarketing (15%) */}
            <div className={`flex-[1] ${cardBg} p-6 rounded-2xl text-left shadow-xl border-2 border-indigo-500/60 relative flex flex-col justify-between overflow-hidden`}>
              <div className="absolute top-0 right-0 bg-indigo-500 text-white font-black text-xs px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                15% da Verba
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Fundo de Funil</span>
                </div>
                <h4 className={`font-black text-xl mb-1 ${titleColor}`}>Remarketing de Fundo</h4>
                <p className="text-2xl font-black text-indigo-600 mb-3">R$ 450 <span className="text-xs font-semibold text-zinc-500">/mês</span></p>
                <div className={`text-xs ${isLight ? 'text-zinc-600' : 'text-zinc-300'} space-y-1.5`}>
                  <p><strong>Público:</strong> Visitou o Cardápio/Site e não comprou</p>
                  <p className="text-indigo-700 dark:text-indigo-400 font-medium">🎯 Converte indecisos e recupera carrinhos sem atrito</p>
                </div>
              </div>
            </div>

            {/* Branch 3: Tráfego/Engajamento Eliminado (0%) */}
            <div className={`flex-[0.9] ${isLight ? 'bg-red-50/70 border-red-200' : 'bg-red-950/20 border-red-900/50'} p-6 rounded-2xl text-left shadow-lg border-2 border-dashed relative flex flex-col justify-between opacity-85`}>
              <div className="absolute top-0 right-0 bg-red-600 text-white font-black text-xs px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                0% (Corte Total)
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2 text-red-600">
                  <Ban className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Linha Eliminada</span>
                </div>
                <h4 className="font-bold text-lg text-red-700 dark:text-red-400 mb-1 line-through">Tráfego & Engajamento</h4>
                <p className="text-2xl font-black text-zinc-400 mb-3">R$ 0,00</p>
                <div className={`text-xs ${isLight ? 'text-zinc-600' : 'text-zinc-400'} space-y-1`}>
                  <p className="text-red-600 dark:text-red-400 font-medium">🚫 Histórico queimou 45% (R$4.615) com ZERO pedidos gerados.</p>
                </div>
              </div>
            </div>

          </div>

          {/* Convergence Paths (Lines from Branch 1 & 2 to Center) */}
          <div className="flex w-full justify-between px-4 mt-0">
            {/* Left convergence for 85% and 15% */}
            <div className="flex-[2.2] flex flex-col items-center relative pt-6">
              <div className="flex w-[65%] justify-between absolute top-0">
                <div className={`h-8 w-px ${isLight ? 'bg-emerald-500' : 'bg-emerald-500'}`} />
                <div className={`h-8 w-px ${isLight ? 'bg-indigo-500' : 'bg-indigo-500'}`} />
              </div>
              <div className={`w-[65%] h-0.5 bg-gradient-to-r from-emerald-500 to-indigo-500 mt-8`} />
              <div className={`h-8 w-px bg-red-600 relative`}>
                <ChevronRight className="absolute -bottom-2 -left-2.5 w-5 h-5 text-red-600 rotate-90" />
              </div>
              
              {/* Cardápio Web Central Node */}
              <div className="bg-gradient-to-r from-red-600 to-rose-700 text-white font-bold p-6 rounded-2xl shadow-2xl shadow-red-900/30 flex items-center justify-between gap-6 mt-2 z-10 w-full max-w-xl">
                <div className="flex items-center gap-4">
                  <div className="p-3.5 bg-white/10 rounded-xl">
                    <ShoppingCart className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <span className="text-2xl font-black block">Cardápio Web Direto</span>
                    <span className="text-sm font-normal text-red-100">Único destino com compras rastreadas e ROI validado</span>
                  </div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl text-right shrink-0">
                  <span className="text-xs uppercase block text-red-100 font-bold">Histórico Real</span>
                  <span className="text-lg font-black">353 Pedidos</span>
                </div>
              </div>
            </div>

            {/* Right cut indicator for Branch 3 */}
            <div className="flex-[0.9] flex flex-col items-center relative pt-6 opacity-40">
              <div className="h-14 w-px border-l-2 border-dashed border-red-400" />
              <div className="px-4 py-2 rounded-lg bg-red-100 dark:bg-red-950/40 text-red-600 text-xs font-bold flex items-center gap-1.5 mt-2">
                <Ban className="w-3.5 h-3.5" />
                Sem fluxo para vendas
              </div>
            </div>
          </div>

          {/* Connector from Cardápio Web to CRM */}
          <div className="w-full relative h-12">
            <div className={`absolute top-0 h-12 w-px ${isLight ? 'bg-zinc-300' : 'bg-zinc-700'}`} style={{ left: 'calc(16px + (100% - 32px) * 0.355)' }} />
            <div className={`absolute top-12 h-px ${isLight ? 'bg-zinc-300' : 'bg-zinc-700'}`} style={{ left: 'calc(16px + (100% - 32px) * 0.355)', right: '50%' }} />
            <div className={`absolute top-12 h-8 w-px ${isLight ? 'bg-zinc-300' : 'bg-zinc-700'}`} style={{ left: '50%' }}>
              <ChevronRight className={`absolute -bottom-2 -left-2.5 w-5 h-5 ${isLight ? 'text-zinc-400' : 'text-zinc-500'} rotate-90`} />
            </div>
          </div>

          {/* Final CRM node */}
          <div className="flex w-full flex-col items-center mt-8 relative z-10">
            <div className={`${isLight ? 'bg-emerald-50 border-emerald-300 text-emerald-800' : 'bg-emerald-950/40 border-emerald-500/50 text-emerald-400'} border-2 px-10 py-5 rounded-2xl flex items-center gap-4 shadow-xl max-w-lg w-full justify-center`}>
              <RefreshCw className="w-6 h-6 text-emerald-500 animate-spin-slow" />
              <div className="text-left">
                <span className="text-lg font-black block">CRM, Retenção & LTV</span>
                <span className={`text-xs ${isLight ? 'text-emerald-700' : 'text-emerald-300'}`}>Pós-venda ativo, recompra contínua e fidelização de clientes</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }

  if (type === 'meta_ads_analysis') {
    return (
      <div className="flex flex-col h-full gap-8">
        <h2 className={`text-4xl font-bold ${titleColor} mb-2`}>{d.titulo}</h2>
        
        {/* Top 3 KPI Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className={`${cardBg} p-6 rounded-2xl shadow-lg border-l-4 border-indigo-500 flex flex-col gap-2`}>
            <span className={`text-sm font-semibold ${subtitleColor}`}>Investido no Período</span>
            <span className="text-3xl font-black text-indigo-600">{d.investimento}</span>
            <span className="text-xs text-zinc-400">~8,5 meses • média R$1.212/mês</span>
          </div>
          <div className={`${cardBg} p-6 rounded-2xl shadow-lg border-l-4 border-emerald-500 flex flex-col gap-2`}>
            <span className={`text-sm font-semibold ${subtitleColor}`}>CPA Médio (Compra)</span>
            <span className="text-3xl font-black text-emerald-600">{d.cpa_medio}</span>
            <span className="text-xs text-emerald-600 font-semibold">353 pedidos gerados comprovados</span>
          </div>
          <div className={`${cardBg} p-6 rounded-2xl shadow-lg border-l-4 border-red-500 flex flex-col gap-2`}>
            <span className={`text-sm font-semibold ${subtitleColor}`}>Verba sem venda rastreada</span>
            <span className="text-3xl font-black text-red-600">{d.verba_perdida}</span>
            <span className="text-xs text-red-500 font-semibold">{d.venda_zero?.valor || "R$4.615,83"} em tráfego/engajamento</span>
          </div>
        </div>

        {/* Combo Chart (Pedidos vs. CPA) */}
        <HistoricalMetaAdsChart isLight={isLight} />

        {/* 2 Bottom Columns: Funcionou vs Não Funcionou */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* O que funcionou */}
          <div className={`${isLight ? 'bg-emerald-50' : 'bg-emerald-950/20'} p-8 rounded-2xl border border-emerald-200/50 flex flex-col`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-emerald-500 rounded-xl text-white shadow-md shadow-emerald-500/20">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-emerald-700 dark:text-emerald-400">O que funcionou (Repetir & Escalar)</h3>
                <p className={`text-sm ${subtitleColor}`}>Gerou {d.venda_rastreada.pedidos} pedidos ({d.venda_rastreada.valor})</p>
              </div>
            </div>
            <ul className="flex flex-col gap-4">
              {d.funcionou.map((item: string, i: number) => (
                <li key={i} className="flex gap-3 items-start">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  <span className={`text-sm leading-relaxed ${isLight ? 'text-zinc-700' : 'text-zinc-300'}`}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* O que nao funcionou */}
          <div className={`${isLight ? 'bg-red-50' : 'bg-red-950/20'} p-8 rounded-2xl border border-red-200/50 flex flex-col`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-red-500 rounded-xl text-white shadow-md shadow-red-500/20">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-red-700 dark:text-red-400">Não deu certo (Cortar Definitivamente)</h3>
                <p className={`text-sm ${subtitleColor}`}>0 pedidos rastreados ({d.venda_zero.valor} desperdiçados)</p>
              </div>
            </div>
            <ul className="flex flex-col gap-4">
              {d.nao_funcionou.map((item: string, i: number) => (
                <li key={i} className="flex gap-3 items-start">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-red-500 shrink-0" />
                  <span className={`text-sm leading-relaxed ${isLight ? 'text-zinc-700' : 'text-zinc-300'}`}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'media_projection') {
    return (
      <div className="flex flex-col h-full items-center justify-center py-8">
        <h2 className={`text-4xl font-bold ${titleColor} mb-2`}>{d.titulo}</h2>
        <p className={`text-xl ${subtitleColor} mb-12`}>Orçamento aprovado: <strong className="text-emerald-600">{d.orcamento}</strong></p>

        <div className="w-full max-w-5xl grid md:grid-cols-3 gap-8 mb-12">
          {d.cenarios.map((cenario: any, i: number) => {
            let color = 'text-zinc-500';
            let bg = isLight ? 'bg-zinc-100' : 'bg-zinc-800';
            let border = 'border-zinc-200 dark:border-zinc-700';
            
            if (i === 0) { color = 'text-amber-500'; bg = isLight ? 'bg-amber-50' : 'bg-amber-950/30'; border = 'border-amber-200 dark:border-amber-900/50'; }
            if (i === 1) { color = 'text-indigo-500'; bg = isLight ? 'bg-indigo-50' : 'bg-indigo-950/30'; border = 'border-indigo-200 dark:border-indigo-900/50'; }
            if (i === 2) { color = 'text-emerald-500'; bg = isLight ? 'bg-emerald-50' : 'bg-emerald-950/30'; border = 'border-emerald-200 dark:border-emerald-900/50'; }

            return (
              <div key={i} className={`${cardBg} rounded-3xl p-8 border-2 ${border} shadow-xl flex flex-col items-center text-center relative overflow-hidden`}>
                 <div className={`absolute top-0 inset-x-0 h-2 ${color.replace('text', 'bg')}`} />
                 <h4 className={`text-lg font-bold uppercase tracking-wider ${color} mb-6`}>{cenario.nome}</h4>
                 <div className="flex flex-col items-center gap-2 mb-6">
                   <span className="text-5xl font-black">{cenario.pedidos}</span>
                   <span className={`text-sm font-medium ${subtitleColor}`}>pedidos / mês</span>
                 </div>
                 <div className={`mt-auto ${bg} px-6 py-3 rounded-xl w-full`}>
                   <span className={`font-bold ${color}`}>CPA {cenario.cpa}</span>
                 </div>
              </div>
            )
          })}
        </div>

        <div className={`max-w-4xl w-full ${isLight ? 'bg-blue-50 border-blue-100' : 'bg-blue-950/20 border-blue-900/50'} border p-6 rounded-2xl flex items-start gap-4`}>
           <div className="p-3 bg-blue-500 text-white rounded-xl shrink-0">
             <Target className="w-6 h-6" />
           </div>
           <div>
             <h4 className="text-blue-700 dark:text-blue-400 font-bold text-lg mb-1">Alcance Estimado</h4>
             <p className={`${isLight ? 'text-blue-900/80' : 'text-blue-200/80'} leading-relaxed`}>
               {d.alcance_estimado}
             </p>
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
         
         {d.imagem_url ? (
           <div className="w-full flex flex-col gap-6">
             <div className="w-full bg-white border border-zinc-200 rounded-xl shadow-lg overflow-hidden flex flex-col p-4">
               <img src={d.imagem_url} alt={d.titulo} className="w-full h-auto object-contain rounded-lg" />
             </div>
             {d.link_planilha && (
               <div className="w-full flex justify-center mt-4">
                 <a href={d.link_planilha} target="_blank" rel="noreferrer" 
                    className="group flex items-center gap-3 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-colors shadow-lg shadow-red-900/20">
                    <FileSpreadsheet className="w-5 h-5" />
                    Acessar {d.tipo_planilha} Completa
                    <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                 </a>
               </div>
             )}
           </div>
         ) : (
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
         )}
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
        const themeClass = getSectionTheme(slide.id, slide.slide_type)
        return (
          <SectionWrapper key={slide.id || index} themeClass={themeClass}>
            <RenderBlock slide={slide} />
          </SectionWrapper>
        )
      })}
    </div>
  )
}

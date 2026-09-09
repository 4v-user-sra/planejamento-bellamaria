import React from "react"
import { SlideProps } from "../../types"
import { InsightCard } from "../ui/InsightCard"
import { ArrowUpRight } from "lucide-react"

export function DiagnosticSlide({ data }: SlideProps) {
  const { titulo_slide, insights_bullets } = data.content_slots
  
  return (
    <div className="w-full h-full bg-zinc-950 flex flex-col text-white p-16">
      <div className="flex items-center gap-3 mb-10">
        <ArrowUpRight className="w-8 h-8 text-red-600" />
        <h2 className="text-3xl font-bold">{titulo_slide}</h2>
      </div>

      <div className="flex-1 flex gap-8">
        <div className="flex-1 bg-zinc-900 rounded-xl border border-zinc-800 p-8 flex flex-col items-center justify-center relative overflow-hidden">
          {/* Mock image placeholder */}
          <div className="w-3/4 h-3/4 bg-zinc-800 rounded shadow-xl border border-zinc-700 flex items-center justify-center text-zinc-600">
            [ Screenshot do Ativo Digital ]
          </div>
          {/* Mock annotation */}
          <div className="absolute top-1/4 left-1/4 bg-red-600/20 border-2 border-red-600 w-32 h-24 rounded"></div>
        </div>
        
        <div className="w-[35%]">
          <InsightCard insights={insights_bullets || []} className="h-full" />
        </div>
      </div>
    </div>
  )
}

export function PersonaSlide({ data }: SlideProps) {
  const { numero_persona, nome_persona, local, idade, profissao, renda, genero, dispositivo, canais, dores_bullets, desejos_bullets, objecoes_bullets } = data.content_slots

  return (
    <div className="w-full h-full bg-zinc-950 flex flex-col text-white p-16">
      <h2 className="text-center text-zinc-500 uppercase tracking-widest text-sm font-bold mb-10">Persona {numero_persona}</h2>

      <div className="flex-1 flex gap-8">
        {/* Left Card */}
        <div className="w-1/3 bg-zinc-900 rounded-2xl border border-zinc-800 p-8 flex flex-col items-center text-center">
          <div className="w-32 h-32 rounded-full bg-zinc-800 mb-6 border-4 border-zinc-950 shadow-[0_0_0_2px_rgba(220,38,38,1)] overflow-hidden">
            <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80" alt="Persona" className="w-full h-full object-cover grayscale opacity-80" />
          </div>
          <h3 className="text-2xl font-bold text-red-500 mb-6">{nome_persona}</h3>
          
          <div className="w-full flex flex-col gap-3">
            {[
              { label: "Local", value: local },
              { label: "Idade", value: idade },
              { label: "Profissão", value: profissao },
              { label: "Renda", value: renda }
            ].map((attr, i) => (
              <div key={i} className="flex justify-between bg-zinc-950 rounded px-4 py-3 text-sm">
                <span className="text-zinc-500">{attr.label}</span>
                <span className="font-semibold">{attr.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Content */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex gap-4">
            {[
              { label: "Gênero", value: genero },
              { label: "Dispositivos", value: dispositivo },
              { label: "Canais", value: canais }
            ].map((tag, i) => (
              <div key={i} className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">{tag.label}</div>
                <div className="font-semibold text-sm">{tag.value}</div>
              </div>
            ))}
          </div>

          <div className="flex-1 flex flex-col gap-4">
            {[
              { title: "Dores", items: dores_bullets },
              { title: "Desejos", items: desejos_bullets },
              { title: "Objeções", items: objecoes_bullets }
            ].map((section, i) => (
              <div key={i} className="flex bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden flex-1">
                <div className="bg-zinc-800 w-32 flex items-center justify-center font-bold text-zinc-400 uppercase text-xs tracking-widest shrink-0 border-r border-zinc-700">
                  {section.title}
                </div>
                <ul className="p-6 flex flex-col justify-center gap-2">
                  {section.items?.map((item: string, j: number) => (
                    <li key={j} className="flex items-start gap-2 text-zinc-300 text-sm">
                      <span className="text-red-500 mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function MoodboardSlide({ data }: SlideProps) {
  const { titulo, tipografia_principal, tipografia_secundaria, paleta_cores } = data.content_slots
  
  return (
    <div className="w-full h-full bg-zinc-50 flex flex-col text-zinc-950 p-16">
      <h2 className="text-3xl font-bold mb-10 text-center">{titulo}</h2>

      <div className="flex-1 flex gap-12">
        {/* Left Side */}
        <div className="w-[40%] flex flex-col gap-10">
          <div>
            <div className="w-40 h-16 bg-zinc-200 rounded flex items-center justify-center font-bold text-zinc-400 mb-2 border border-zinc-300">LOGO</div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-4">Tipografia</h4>
            <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm flex flex-col gap-6">
              <div>
                <div className="text-sm text-zinc-400 mb-1">Principal</div>
                <div className="text-4xl font-bold text-zinc-900">{tipografia_principal}</div>
                <div className="text-2xl font-bold text-zinc-900">Aa Bb Cc</div>
              </div>
              <div className="w-full h-px bg-zinc-100" />
              <div>
                <div className="text-sm text-zinc-400 mb-1">Secundária</div>
                <div className="text-2xl text-zinc-700">{tipografia_secundaria}</div>
                <div className="text-lg text-zinc-700">Aa Bb Cc Dd Ee</div>
              </div>
            </div>
          </div>

          <div>
             <h4 className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-4">Cores</h4>
             <div className="flex gap-4">
                {paleta_cores?.map((hex: string, i: number) => (
                  <div key={i} className="flex flex-col gap-2 items-center">
                    <div className="w-16 h-16 rounded-full shadow-sm border border-black/10" style={{ backgroundColor: hex }} />
                    <span className="text-xs font-mono text-zinc-500 uppercase">{hex}</span>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Right Side Grid */}
        <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-4">
          {[1,2,3,4].map(i => (
             <div key={i} className="bg-zinc-200 rounded-xl overflow-hidden border border-zinc-300 relative">
               <img src={`https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=500&q=80&sig=${i}`} alt="Ref" className="w-full h-full object-cover opacity-80 mix-blend-multiply" />
             </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function BenchmarkSlide({ data }: SlideProps) {
  const { titulo, subtitulo, nome_concorrente, insights_bullets } = data.content_slots
  
  return (
    <div className="w-full h-full bg-zinc-950 flex flex-col text-white p-16">
      <div className="mb-10">
        <h2 className="text-3xl font-bold">{titulo}</h2>
        {subtitulo && <p className="text-zinc-500 mt-2">{subtitulo}</p>}
      </div>

      <div className="flex-1 flex gap-8">
        <div className="flex-1 bg-zinc-900 rounded-xl border border-zinc-800 p-8 flex flex-col gap-6 overflow-hidden">
          <div className="flex items-center gap-4">
             <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center text-zinc-500 text-xs">IMG</div>
             <div>
               <div className="font-bold text-lg">{nome_concorrente}</div>
               <div className="text-sm text-zinc-500">@concorrente</div>
             </div>
          </div>
          <div className="flex-1 bg-zinc-800 rounded flex items-center justify-center text-zinc-600 text-sm">
             [ Grid de posts ou Screenshot do Site ]
          </div>
        </div>
        
        <div className="w-[35%]">
          <InsightCard insights={insights_bullets || []} className="h-full" />
        </div>
      </div>
    </div>
  )
}

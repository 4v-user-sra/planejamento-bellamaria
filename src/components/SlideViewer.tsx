import React, { useState, useEffect } from "react"
import { presentationData } from "../data"
import { ArrowLeft, ArrowRight } from "lucide-react"

// Import all slide components
import { CoverSlide, TimelineSlide, AgendaSlide, DividerSlide, ClosingSlide } from "./slides/IntroSlides"
import { DiagnosticSlide, PersonaSlide, MoodboardSlide, BenchmarkSlide } from "./slides/AnalysisSlides"
import { PillarsSlide, SmartGoalSlide, FunnelSlide } from "./slides/StrategySlides"
import { GanttSlide, MediaPlanSlide } from "./slides/ExecutionSlides"

const SLIDE_MAP: Record<string, React.FC<any>> = {
  "cover": CoverSlide,
  "process_timeline": TimelineSlide,
  "agenda_toc": AgendaSlide,
  "section_divider": DividerSlide,
  "diagnostic_analysis": DiagnosticSlide,
  "persona_profile": PersonaSlide,
  "moodboard_identity": MoodboardSlide,
  "competitor_benchmark": BenchmarkSlide,
  "three_pillar_framework": PillarsSlide,
  "smart_goal_okr": SmartGoalSlide,
  "funnel_flow_diagram": FunnelSlide,
  "gantt_playbook_table": GanttSlide,
  "media_investment_table": MediaPlanSlide,
  "closing_cta": ClosingSlide
}

export function SlideViewer() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const slides = presentationData.slides

  const nextSlide = () => {
    setCurrentIndex(prev => Math.min(prev + 1, slides.length - 1))
  }

  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0))
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "Space") nextSlide()
      if (e.key === "ArrowLeft") prevSlide()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const currentSlideData = slides[currentIndex]
  const SlideComponent = SLIDE_MAP[currentSlideData.slide_type]

  if (!SlideComponent) {
    return <div className="text-white">Slide type not implemented: {currentSlideData.slide_type}</div>
  }

  return (
    <div className="w-full h-screen bg-black flex flex-col items-center justify-center overflow-hidden font-sans">
      {/* 16:9 Aspect Ratio Container */}
      <div className="w-full max-w-[1600px] aspect-video relative shadow-2xl bg-zinc-950 overflow-hidden ring-1 ring-zinc-800">
        <SlideComponent data={currentSlideData} />
      </div>

      {/* Navigation Controls */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-zinc-900/80 backdrop-blur-sm p-2 rounded-full border border-zinc-800 z-50">
        <button 
          onClick={prevSlide}
          disabled={currentIndex === 0}
          className="p-2 text-zinc-400 hover:text-white disabled:opacity-30 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        
        <span className="text-zinc-500 font-mono text-sm px-4">
          {String(currentIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
        </span>

        <button 
          onClick={nextSlide}
          disabled={currentIndex === slides.length - 1}
          className="p-2 text-zinc-400 hover:text-white disabled:opacity-30 transition-colors"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

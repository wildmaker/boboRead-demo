"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, Settings } from "lucide-react"
import { OnboardingGuide } from "./onboarding-guide"

interface CameraScreenProps {
  isActive: boolean
  onBack: () => void
  onRead: () => void
}

export function CameraScreen({ isActive, onBack, onRead }: CameraScreenProps) {
  const [showDrawer, setShowDrawer] = useState(false)
  const [showScanFrame, setShowScanFrame] = useState(true)
  const [readingMode, setReadingMode] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [showOnboarding, setShowOnboarding] = useState(false)

  const storyPages = [
    {
      text: "在金字塔的深处，",
      highlight: "探险家",
      after: "发现了一个神秘的符号，它闪烁着光芒...",
    },
    {
      text: "这是一个",
      highlight: "古埃及",
      after: "的象形文字，代表着'生命'。",
    },
    {
      text: "接着，他们打开了那扇沉重的大门，眼前出现了一片",
      highlight: "金色的沙漠",
      after: "。",
    },
  ]

  // Simulate book detection
  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => {
        setShowScanFrame(false)
        setShowDrawer(true)
      }, 2500)
      return () => clearTimeout(timer)
    } else {
      // Reset state when leaving screen
      setShowDrawer(false)
      setShowScanFrame(true)
      setReadingMode(false)
      setCurrentPage(0)
      setIsPlaying(false)
      setIsListening(false)
    }
  }, [isActive])

  useEffect(() => {
    if (showDrawer && !readingMode) {
      const hasSeenOnboarding = localStorage.getItem("hasSeenOnboarding")
      if (!hasSeenOnboarding) {
        // Don't show onboarding yet, will show when clicking "Start Reading"
      }
    }
  }, [showDrawer, readingMode])

  const startReading = () => {
    const hasSeenOnboarding = localStorage.getItem("hasSeenOnboarding")

    if (!hasSeenOnboarding) {
      // Show onboarding for first-time users
      setShowOnboarding(true)
    } else {
      // Existing users go straight to reading
      setShowDrawer(false)
      setReadingMode(true)
      setIsPlaying(true)
      onRead()
    }
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const toggleMic = () => {
    setIsListening(!isListening)
  }

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % storyPages.length)
  }

  const handleMascotClick = () => {
    const mascot = document.querySelector(".mascot-hippo")
    if (mascot) {
      mascot.classList.add("scale-125", "rotate-12")
      setTimeout(() => {
        mascot?.classList.remove("scale-125", "rotate-12")
      }, 300)
    }
  }

  const handleOnboardingComplete = () => {
    setShowOnboarding(false)
    setShowDrawer(false)
    setReadingMode(true)
    setIsPlaying(true)
    onRead()
  }

  const currentStory = storyPages[currentPage]

  return (
    <div className={`fixed inset-0 ${isActive ? "flex" : "hidden"} flex-col`}>
      {/* Layer 0: Camera Background with vignette */}
      <div className="absolute inset-0 bg-[#111] z-0">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: "url(https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(circle, transparent 60%, rgba(0,0,0,0.3) 100%)",
          }}
        />
      </div>

      {/* Layer 1: HUD - Scan Frame */}
      {showScanFrame && (
        <div
          className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
          style={{ transform: "translateY(-10%)" }}
        >
          <div className="relative w-[70vw] aspect-[3/4] border-2 border-dashed border-white/60 rounded-[30px]">
            <div
              className="absolute -top-0.5 -left-0.5 w-10 h-10 border-4 border-white rounded-lg border-r-0 border-b-0"
              style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))" }}
            />
            <div
              className="absolute -top-0.5 -right-0.5 w-10 h-10 border-4 border-white rounded-lg border-l-0 border-b-0"
              style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))" }}
            />
            <div
              className="absolute -bottom-0.5 -left-0.5 w-10 h-10 border-4 border-white rounded-lg border-r-0 border-t-0"
              style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))" }}
            />
            <div
              className="absolute -bottom-0.5 -right-0.5 w-10 h-10 border-4 border-white rounded-lg border-l-0 border-t-0"
              style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))" }}
            />

            {/* Scanning laser line */}
            <div className="absolute w-full h-1 bg-turquoise shadow-[0_0_15px_var(--turquoise)] top-0 left-0 animate-scan" />
          </div>
        </div>
      )}

      {/* Layer 2: Top Navigation (Glass buttons) */}
      {readingMode && (
        <div
          className="absolute top-0 left-0 w-full flex justify-between z-20 pointer-events-auto"
          style={{ padding: "calc(env(safe-area-inset-top, 20px) + 10px) 20px" }}
        >
          <button
            onClick={onBack}
            className="w-11 h-11 bg-black/20 backdrop-blur-[10px] border border-white/20 rounded-full flex items-center justify-center text-white"
          >
            <ChevronLeft className="w-6 h-6" strokeWidth={3} />
          </button>
          <button className="w-11 h-11 bg-black/20 backdrop-blur-[10px] border border-white/20 rounded-full flex items-center justify-center text-white">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Book Detail Drawer */}
      <div
        className={`absolute bottom-0 left-0 w-full bg-white rounded-t-[30px] px-6 pt-[30px] pb-10 shadow-[0_-10px_40px_rgba(0,0,0,0.3)] z-[100] transition-transform duration-[400ms] ${
          showDrawer ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ transitionTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 1.275)" }}
      >
        {/* Drawer Handle */}
        <div className="w-10 h-[5px] bg-border rounded-full mx-auto mb-5" />

        {/* Book Detail Header */}
        <div className="flex gap-5 items-start mb-5">
          {/* Detail Cover */}
          <div className="w-[100px] h-[130px] bg-egypt-blue rounded-xl flex items-center justify-center text-[3rem] shadow-[0_5px_15px_rgba(0,0,0,0.2)]">
            🦖
          </div>

          {/* Detail Info */}
          <div className="flex-1">
            <h2 className="text-egypt-blue text-2xl font-black mb-2">法老王的宝藏</h2>
            <div className="flex gap-1 flex-wrap mb-4">
              <span className="bg-desert-gold text-[#8d6e63] px-2.5 py-1 rounded-[10px] text-xs font-bold">探险</span>
              <span className="bg-desert-gold text-[#8d6e63] px-2.5 py-1 rounded-[10px] text-xs font-bold">历史</span>
              <span className="bg-desert-gold text-[#8d6e63] px-2.5 py-1 rounded-[10px] text-xs font-bold">3-6岁</span>
            </div>
            <p className="text-muted-foreground text-sm m-0">在神秘的金字塔中，寻找失落的黄金权杖...</p>
          </div>
        </div>

        {/* Start Reading Button */}
        <button
          onClick={startReading}
          className="w-full py-4 bg-royal-gold text-egypt-blue rounded-[25px] font-black text-lg shadow-[0_5px_0_var(--dark-gold)] active:translate-y-1 active:shadow-none transition-all border-none"
        >
          开始伴读 ▶
        </button>
      </div>

      {/* Layer 3: Reading Control Panel */}
      {readingMode && (
        <div
          className="absolute bottom-0 left-0 w-full z-[100] pointer-events-none"
          style={{ paddingBottom: "env(safe-area-inset-bottom, 20px)" }}
        >
          <div className="px-5 pb-5 pointer-events-auto relative">
            <div
              className="mascot-hippo absolute w-[140px] h-[140px] flex items-center justify-center text-[5rem] cursor-pointer transition-all duration-300 z-30"
              style={{
                top: "-75px",
                left: "-10px",
                filter: "drop-shadow(0 10px 15px rgba(0,0,0,0.2))",
                transformOrigin: "bottom center",
              }}
              onClick={handleMascotClick}
            >
              <div className="animate-hippo-float">🦛</div>
            </div>

            <div
              className="relative rounded-[32px] border-2 border-white/60 overflow-visible"
              style={{
                background: "rgba(255, 253, 245, 0.92)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                padding: "24px 24px 20px",
                boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
              }}
            >
              <div className="mb-6 min-h-[80px] flex items-center pl-2.5">
                <p
                  className="font-fredoka text-[1.15rem] leading-relaxed text-text-dark text-left m-0"
                  style={{ textIndent: "2.5rem" }}
                >
                  {currentStory.text}
                  <span className="inline-block bg-[#FFC107]/25 text-[#E65100] px-1.5 py-0.5 rounded-md font-semibold border-b-2 border-[#FFC107] mx-1">
                    {currentStory.highlight}
                  </span>
                  {currentStory.after}
                </p>
              </div>

              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2.5">
                {/* Left Controls */}
                <div className="flex gap-4">
                  <button
                    onClick={toggleMic}
                    className={`relative w-14 h-14 rounded-full border-none flex items-center justify-center text-[1.4rem] text-white transition-all duration-100 ${
                      isListening
                        ? "bg-[#FF5252] border-[3px] border-[#FFEBEE] animate-pulse-ring"
                        : "bg-[#26C6DA] border-[3px] border-white"
                    }`}
                    style={{
                      backgroundImage: "linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(0,0,0,0.05) 100%)",
                      boxShadow: isListening
                        ? "0 6px 0 #D32F2F"
                        : "0 6px 0 #0097A7, 0 10px 15px rgba(0, 151, 167, 0.2)",
                    }}
                    onMouseDown={(e) => {
                      e.currentTarget.style.transform = "translateY(4px) scale(0.95)"
                      e.currentTarget.style.boxShadow = "none"
                    }}
                    onMouseUp={(e) => {
                      e.currentTarget.style.transform = ""
                      e.currentTarget.style.boxShadow = isListening
                        ? "0 6px 0 #D32F2F"
                        : "0 6px 0 #0097A7, 0 10px 15px rgba(0, 151, 167, 0.2)"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = ""
                      e.currentTarget.style.boxShadow = isListening
                        ? "0 6px 0 #D32F2F"
                        : "0 6px 0 #0097A7, 0 10px 15px rgba(0, 151, 167, 0.2)"
                    }}
                  >
                    🎙️
                  </button>
                </div>

                {/* Center - Primary Play Button */}
                <button
                  onClick={togglePlay}
                  className="relative w-[76px] h-[76px] rounded-full border-[3px] border-white flex items-center justify-center text-[2rem] text-[#5D4037] bg-[#FFC107] transition-all duration-100 z-[5]"
                  style={{
                    backgroundImage: "linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(0,0,0,0.05) 100%)",
                    boxShadow: "0 8px 0 #FF8F00, 0 16px 20px rgba(255, 143, 0, 0.3)",
                  }}
                  onMouseDown={(e) => {
                    e.currentTarget.style.transform = "translateY(4px) scale(0.95)"
                    e.currentTarget.style.boxShadow = "none"
                  }}
                  onMouseUp={(e) => {
                    e.currentTarget.style.transform = ""
                    e.currentTarget.style.boxShadow = "0 8px 0 #FF8F00, 0 16px 20px rgba(255, 143, 0, 0.3)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = ""
                    e.currentTarget.style.boxShadow = "0 8px 0 #FF8F00, 0 16px 20px rgba(255, 143, 0, 0.3)"
                  }}
                >
                  {isPlaying ? "⏸" : "▶"}
                </button>

                {/* Right Controls */}
                <div className="flex gap-4 justify-end">
                  <button
                    onClick={() => {
                      setCurrentPage(0)
                      setIsPlaying(true)
                    }}
                    className="relative w-14 h-14 rounded-full border-[3px] border-white flex items-center justify-center text-[1.4rem] text-white bg-[#FF7043] transition-all duration-100"
                    style={{
                      backgroundImage: "linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(0,0,0,0.05) 100%)",
                      boxShadow: "0 6px 0 #D84315, 0 10px 15px rgba(216, 67, 21, 0.2)",
                    }}
                    onMouseDown={(e) => {
                      e.currentTarget.style.transform = "translateY(4px) scale(0.95)"
                      e.currentTarget.style.boxShadow = "none"
                    }}
                    onMouseUp={(e) => {
                      e.currentTarget.style.transform = ""
                      e.currentTarget.style.boxShadow = "0 6px 0 #D84315, 0 10px 15px rgba(216, 67, 21, 0.2)"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = ""
                      e.currentTarget.style.boxShadow = "0 6px 0 #D84315, 0 10px 15px rgba(216, 67, 21, 0.2)"
                    }}
                  >
                    🔄
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showOnboarding && <OnboardingGuide onComplete={handleOnboardingComplete} />}
    </div>
  )
}

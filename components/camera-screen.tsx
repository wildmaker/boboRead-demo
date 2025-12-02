"use client"

import { useState, useEffect } from "react"
import { ChevronLeft } from "lucide-react"

interface CameraScreenProps {
  isActive: boolean
  onBack: () => void
}

export function CameraScreen({ isActive, onBack }: CameraScreenProps) {
  const [showDrawer, setShowDrawer] = useState(false)
  const [showScanFrame, setShowScanFrame] = useState(true)
  const [readingMode, setReadingMode] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [messages, setMessages] = useState<Array<{ type: "ai" | "user"; text: string }>>([])

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
      setMessages([])
    }
  }, [isActive])

  const startReading = () => {
    setShowDrawer(false)
    setReadingMode(true)
    setMessages([{ type: "ai", text: "🦛: 我们可以开始啦！有不懂的随时问我哦~" }])
  }

  const toggleMic = () => {
    if (!isListening) {
      setIsListening(true)

      // Simulate user speaking
      setTimeout(() => {
        setMessages((prev) => [...prev, { type: "user", text: "这个三角形是什么？" }])
      }, 1000)

      // Simulate AI response
      setTimeout(() => {
        setIsListening(false)
        setMessages((prev) => [...prev, { type: "ai", text: "🦛: 这是金字塔，是法老的陵墓。" }])
      }, 2500)
    } else {
      setIsListening(false)
    }
  }

  return (
    <div className={`fixed inset-0 ${isActive ? "flex" : "hidden"} flex-col`}>
      {/* Camera Background */}
      <div className="absolute inset-0 bg-[#222] z-0">
        <div
          className="w-full h-full opacity-60"
          style={{
            backgroundImage: "url(https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </div>

      {/* Back Button */}
      <button
        onClick={onBack}
        className="absolute top-[50px] left-5 w-11 h-11 bg-white/30 backdrop-blur-[5px] rounded-full flex items-center justify-center z-20 border border-white/50"
      >
        <ChevronLeft className="w-6 h-6 text-white" strokeWidth={3} />
      </button>

      {/* Scan Frame */}
      {showScanFrame && (
        <div className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[40%] border-4 border-white/50 rounded-[20px] z-10 flex items-center justify-center">
          <div className="absolute w-full h-1 bg-turquoise shadow-[0_0_15px_var(--turquoise)] top-0 left-0 animate-scan" />
          <div className="text-white font-bold mt-5 text-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">请对准绘本封面</div>
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

      {/* Chat Layer */}
      {readingMode && (
        <div className="absolute inset-0 z-[90] flex flex-col justify-end pb-[150px] bg-gradient-to-t from-black/50 to-transparent pointer-events-none">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`bg-white/95 backdrop-blur-[10px] px-5 py-4 rounded-[20px] mx-5 my-2.5 max-w-[80%] shadow-[0_5px_15px_rgba(0,0,0,0.2)] font-bold text-text-dark animate-pop-in flex items-center gap-2.5 ${
                msg.type === "user"
                  ? "self-end rounded-br-[5px] bg-turquoise text-white"
                  : "self-start rounded-bl-[5px]"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>
      )}

      {/* Mic Control */}
      {readingMode && (
        <div className="absolute bottom-10 w-full flex justify-center z-[110] pointer-events-auto">
          <button
            onClick={toggleMic}
            className={`w-[70px] h-[70px] rounded-full bg-white border-none text-[2rem] shadow-[0_5px_20px_rgba(0,0,0,0.3)] flex items-center justify-center transition-transform ${
              isListening ? "bg-turquoise text-white animate-pulse-ring" : ""
            }`}
          >
            🎙️
          </button>
        </div>
      )}
    </div>
  )
}

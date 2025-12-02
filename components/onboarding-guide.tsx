"use client"

import { useState } from "react"
import { Check, Eye, Rocket } from "lucide-react"

interface OnboardingGuideProps {
  onComplete: () => void
}

export function OnboardingGuide({ onComplete }: OnboardingGuideProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [isVisible, setIsVisible] = useState(true)

  const nextStep = (stepNum: number) => {
    setCurrentStep(stepNum)
  }

  const finishGuide = () => {
    setIsVisible(false)
    setTimeout(() => {
      localStorage.setItem("hasSeenOnboarding", "true")
      onComplete()
    }, 500)
  }

  return (
    <div
      className={`fixed inset-0 z-[200] transition-opacity duration-500 ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
    >
      {/* Overlay with blur */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Guide Mascot - Fox */}
      <div
        className={`absolute font-emoji text-[6rem] z-[202] transition-all duration-500 ${
          currentStep === 2
            ? "top-[10%] left-[15%] scale-[0.6]"
            : "bottom-[320px] left-1/2 -translate-x-1/2 animate-float"
        }`}
        style={{ filter: "drop-shadow(0 10px 10px rgba(0,0,0,0.3))" }}
      >
        🦊
      </div>

      {/* AR Scan Helper (only show in step 2) */}
      {currentStep === 2 && (
        <div
          className="absolute top-[20%] left-[10%] w-[80%] h-[40%] border-4 border-dashed rounded-[20px] pointer-events-none z-[90] animate-pulse-border"
          style={{ borderColor: "rgba(255,255,255,0.8)" }}
        />
      )}

      {/* Guide Card Container */}
      <div className="absolute bottom-0 left-0 w-full bg-white rounded-t-[32px] px-[30px] pt-10 pb-10 text-center z-[201] animate-slide-up">
        {/* Step 1: Place Phone */}
        <div className={`${currentStep === 1 ? "block" : "hidden"} animate-fade-in`}>
          <div className="h-[120px] flex items-center justify-center mb-5">
            <div className="relative w-[100px] h-[80px]">
              {/* Mug */}
              <div className="absolute bottom-0 right-[10px] w-10 h-[50px] bg-turquoise rounded-t-[5px] rounded-b-[15px]" />
              {/* Phone */}
              <div className="absolute bottom-0 left-5 w-[35px] h-[70px] bg-[#333] rounded-[5px] border-2 border-white animate-lean-phone" />
            </div>
          </div>
          <h3 className="font-fredoka text-[1.4rem] text-[#FF6D00] mb-2.5">解放双手</h3>
          <p className="text-text-dark text-base leading-[1.5] mb-[30px]">
            找个水杯或支架，把手机
            <br />
            <b>斜靠在上面</b>，对准桌面哦~
          </p>
          <button
            onClick={() => nextStep(2)}
            className="w-full py-4 border-none rounded-[50px] font-fredoka text-[1.1rem] font-bold bg-[#FFC107] text-[#5D4037] cursor-pointer transition-transform duration-100 active:translate-y-1"
            style={{
              boxShadow: "0 6px 0 #FF8F00, 0 10px 20px rgba(0,0,0,0.1)",
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.boxShadow = "0 2px 0 #FF8F00"
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.boxShadow = "0 6px 0 #FF8F00, 0 10px 20px rgba(0,0,0,0.1)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 6px 0 #FF8F00, 0 10px 20px rgba(0,0,0,0.1)"
            }}
          >
            <span className="inline-flex items-center gap-2 justify-center">
              <span>放好啦</span>
              <Check className="w-5 h-5" />
            </span>
          </button>
        </div>

        {/* Step 2: Place Book */}
        <div className={`${currentStep === 2 ? "block" : "hidden"} animate-fade-in`}>
          <div className="h-[120px] flex items-center justify-center mb-5 text-[3rem]">📖 ➡️ 📱</div>
          <h3 className="font-fredoka text-[1.4rem] text-[#FF6D00] mb-2.5">放入绘本</h3>
          <p className="text-text-dark text-base leading-[1.5] mb-[30px]">
            把绘本放在虚线框里
            <br />
            让我看清楚封面
          </p>
          <button
            onClick={() => nextStep(3)}
            className="w-full py-4 border-none rounded-[50px] font-fredoka text-[1.1rem] font-bold bg-[#FFC107] text-[#5D4037] cursor-pointer transition-transform duration-100 active:translate-y-1"
            style={{
              boxShadow: "0 6px 0 #FF8F00, 0 10px 20px rgba(0,0,0,0.1)",
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.boxShadow = "0 2px 0 #FF8F00"
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.boxShadow = "0 6px 0 #FF8F00, 0 10px 20px rgba(0,0,0,0.1)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 6px 0 #FF8F00, 0 10px 20px rgba(0,0,0,0.1)"
            }}
          >
            <span className="inline-flex items-center gap-2 justify-center">
              <span>看清了</span>
              <Eye className="w-5 h-5" />
            </span>
          </button>
        </div>

        {/* Step 3: Flip Page */}
        <div className={`${currentStep === 3 ? "block" : "hidden"} animate-fade-in`}>
          <div className="h-[120px] flex items-center justify-center mb-5">
            <div className="relative w-20 h-[60px] bg-[#EEE] rounded-[5px]">
              <div
                className="absolute top-0 right-0 w-1/2 h-full bg-white rounded-r-[5px] border border-[#ddd] animate-turn-page"
                style={{ transformOrigin: "left center" }}
              />
            </div>
          </div>
          <h3 className="font-fredoka text-[1.4rem] text-[#FF6D00] mb-2.5">翻页即读</h3>
          <p className="text-text-dark text-base leading-[1.5] mb-[30px]">
            只要<b>翻一页</b>书
            <br />
            我就能自动给你讲故事啦！
          </p>
          <button
            onClick={finishGuide}
            className="w-full py-4 border-none rounded-[50px] font-fredoka text-[1.1rem] font-bold bg-[#FFC107] text-[#5D4037] cursor-pointer transition-transform duration-100 active:translate-y-1"
            style={{
              boxShadow: "0 6px 0 #FF8F00, 0 10px 20px rgba(0,0,0,0.1)",
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.boxShadow = "0 2px 0 #FF8F00"
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.boxShadow = "0 6px 0 #FF8F00, 0 10px 20px rgba(0,0,0,0.1)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 6px 0 #FF8F00, 0 10px 20px rgba(0,0,0,0.1)"
            }}
          >
            <span className="inline-flex items-center gap-2 justify-center">
              <span>开始体验</span>
              <Rocket className="w-5 h-5" />
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

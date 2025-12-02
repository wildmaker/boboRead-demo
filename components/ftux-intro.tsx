"use client"

import { useRef, useState, UIEvent } from "react"
import { Hand, Sparkles, Rocket } from "lucide-react"

interface FtuxIntroProps {
  onFinish: () => void
}

const SLIDE_COUNT = 3

export function FtuxIntro({ onFinish }: FtuxIntroProps) {
  const carouselRef = useRef<HTMLDivElement | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleScroll = (event: UIEvent<HTMLDivElement>) => {
    const container = event.currentTarget
    const width = container.offsetWidth || 1
    const newIndex = Math.round(container.scrollLeft / width)

    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex)
    }
  }

  const updateAndMaybeFinish = () => {
    if (currentIndex < SLIDE_COUNT - 1) {
      const container = carouselRef.current
      if (container) {
        container.scrollBy({ left: container.offsetWidth, behavior: "smooth" })
      }
    } else {
      finish()
    }
  }

  const finish = () => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("hasSeenFtux", "true")
      }
    } catch {
      // ignore storage errors (private mode, etc.)
    }
    onFinish()
  }

  const buttonLabel =
    currentIndex === 0 ? "你好呀！" : currentIndex === 1 ? "好神奇" : "开始扫描"

  const buttonIcon =
    currentIndex === 0 ? (
      <Hand className="w-5 h-5" />
    ) : currentIndex === 1 ? (
      <Sparkles className="w-5 h-5" />
    ) : (
      <Rocket className="w-5 h-5" />
    )

  return (
    <div className="fixed inset-0 z-[250] flex flex-col ftux-root">
      {/* 跳过按钮 */}
      <button type="button" className="ftux-skip-btn" onClick={finish}>
        跳过
      </button>

      {/* 轮播主区域 */}
      <div
        ref={carouselRef}
        className="ftux-carousel"
        onScroll={handleScroll}
      >
        {/* PAGE 1 */}
        <div className={`ftux-slide ${currentIndex === 0 ? "active" : ""}`} id="ftux-slide-0">
          <div className="ftux-voice-bubble">
            <div className="ftux-speaker-icon">🔊</div>
            <div className="ftux-wave-box">
              <div className="ftux-bar" />
              <div className="ftux-bar" />
              <div className="ftux-bar" />
              <div className="ftux-bar" />
              <div className="ftux-bar" />
            </div>
            <span className="ftux-bubble-text">我在说话哦~</span>
          </div>

          <div className="ftux-mascot-area">
            <div className="ftux-fox-pose">
              <video
                className="ftux-fox-video"
                src="/videos/ftux-greeting.mp4"
                autoPlay
                loop
                muted
                playsInline
              />
            </div>
          </div>

          <div className="ftux-text-area">
            <div className="ftux-title">嗨！我是小宝</div>
            <div className="ftux-desc">
              终于见到你啦！
              <br />
              我是一个会讲故事的小狐狸，
              <br />
              特别想和你做朋友。
            </div>
          </div>
        </div>

        {/* PAGE 2 */}
        <div
          className={`ftux-slide ftux-slide-step2 ${currentIndex === 1 ? "active" : ""}`}
          id="ftux-slide-1"
        >
          <div className="ftux-voice-bubble">
            <div className="ftux-wave-box">
              <div className="ftux-bar" />
              <div className="ftux-bar" />
              <div className="ftux-bar" />
              <div className="ftux-bar" />
              <div className="ftux-bar" />
            </div>
          </div>

          <div className="ftux-mascot-area">
            <div className="ftux-fox-pose">
              <video
                className="ftux-fox-video ftux-fox-video-step2"
                src="/videos/ftux-step2.mp4"
                autoPlay
                loop
                muted
                playsInline
              />
            </div>
          </div>

          <div className="ftux-text-area">
            <div className="ftux-title">我有神奇的眼睛</div>
            <div className="ftux-desc">
              把你喜欢的绘本拿给我看看。
              <br />
              只要“咔嚓”一下，
              <br />
              我就能认出它是谁哦！
            </div>
          </div>
        </div>

        {/* PAGE 3 */}
        <div className={`ftux-slide ${currentIndex === 2 ? "active" : ""}`} id="ftux-slide-2">
          <div className="ftux-voice-bubble">
            <div className="ftux-wave-box">
              <div className="ftux-bar" />
              <div className="ftux-bar" />
              <div className="ftux-bar" />
              <div className="ftux-bar" />
              <div className="ftux-bar" />
            </div>
          </div>

          <div className="ftux-mascot-area">
            <div className="ftux-fox-pose">🎧🦊</div>
          </div>

          <div className="ftux-text-area">
            <div className="ftux-title">我不怕生字</div>
            <div className="ftux-desc">
              不管书上有多少字，
              <br />
              我都能把它们变成有趣的声音。
              <br />
              我们一起听故事吧！
            </div>
          </div>
        </div>
      </div>

      {/* 底部控制区 */}
      <div className="ftux-bottom">
        <div className="ftux-dots">
          {Array.from({ length: SLIDE_COUNT }).map((_, index) => (
            <div
              key={index}
              className={`ftux-dot ${currentIndex === index ? "active" : ""}`}
            />
          ))}
        </div>

        <button type="button" className="ftux-btn" onClick={updateAndMaybeFinish}>
          <span className="inline-flex items-center gap-2">
            {buttonIcon}
            <span>{buttonLabel}</span>
          </span>
        </button>
      </div>
    </div>
  )
}



"use client"

import { useEffect, useRef, useState, UIEvent } from "react"
import { Hand, Sparkles, Rocket, Volume2, VolumeX } from "lucide-react"

interface FtuxIntroProps {
  onFinish: () => void
}

const SLIDE_COUNT = 3

export function FtuxIntro({ onFinish }: FtuxIntroProps) {
  const carouselRef = useRef<HTMLDivElement | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const page3VideoRef = useRef<HTMLVideoElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // 初始化音频
  useEffect(() => {
    const audio = new Audio("/demo.mp3")
    audio.loop = true
    audioRef.current = audio

    if (isPlaying) {
      audio.play().catch(() => {
        // 自动播放可能被浏览器拦截，用户点击后会恢复
        setIsPlaying(false)
      })
    }

    return () => {
      audio.pause()
      audioRef.current = null
    }
  }, [])

  // 响应播放状态变化
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false))
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

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

  useEffect(() => {
    // 仅在第三页时确保视频播放，不再驱动任何缩放动画
    const video = page3VideoRef.current
    if (!video) return

    if (currentIndex !== 2) {
      try {
        video.pause()
        video.currentTime = 0
      } catch {
        // ignore
      }
      return
    }

    const ensurePlay = async () => {
      try {
        await video.play()
      } catch {
        // autoplay might be blocked
      }
    }

    ensurePlay()
  }, [currentIndex])

  return (
    <div className="fixed inset-0 z-[250] flex flex-col ftux-root" data-ftux-step={currentIndex}>
      {/* 跳过按钮 */}
      <button type="button" className="ftux-skip-btn" onClick={finish}>
        跳过
      </button>

      {/* 扬声器播放组件 */}
      <button 
        type="button"
        className={`ftux-speaker-widget ${isPlaying ? 'is-playing' : ''}`}
        onClick={togglePlay}
        aria-label={isPlaying ? "暂停播放" : "开启播放"}
      >
        <div className="ftux-speaker-icon">
          {isPlaying ? (
            <Volume2 className="w-12 h-12" />
          ) : (
            <VolumeX className="w-12 h-12" />
          )}
        </div>
      </button>

      {/* 轮播主区域 */}
      <div
        ref={carouselRef}
        className="ftux-carousel"
        onScroll={handleScroll}
      >
        {/* PAGE 1 */}
        <div
          className={`ftux-slide ftux-slide-overlap ${currentIndex === 0 ? "active" : ""}`}
          id="ftux-slide-0"
        >
          <div className="ftux-mascot-area">
            <div className="ftux-media-shell">
              <img
                className="ftux-fox-media"
                src="/videos/ftux-say-hello.png"
                alt="小宝打招呼"
                loading="lazy"
              />
            </div>
          </div>

          <div className="ftux-text-area">
            <div className="ftux-title">嗨！我是小宝</div>
            <div className="ftux-desc">
              终于见到你啦！
              <br />
              我是会讲故事的小狐狸。
            </div>
          </div>

          <div className="ftux-bottom-area">
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
                <Hand className="w-5 h-5" />
                <span>你好呀！</span>
              </span>
            </button>
          </div>
        </div>

        {/* PAGE 2 */}
        <div
          className={`ftux-slide ftux-slide-overlap ftux-slide-step2 ${currentIndex === 1 ? "active" : ""}`}
          id="ftux-slide-1"
        >
          <div className="ftux-mascot-area">
            <div className="ftux-media-shell">
              <img
                className="ftux-fox-media"
                src="/videos/ftux-intro.png"
                alt="小宝介绍眼睛的魔法"
                loading="lazy"
              />
            </div>
          </div>

          <div className="ftux-text-area">
            <div className="ftux-title">我有神奇的眼睛</div>
            <div className="ftux-desc">
              把你喜欢的绘本拿给我，
              <br />
              轻轻"咔嚓"，我就认识它啦！
            </div>
          </div>

          <div className="ftux-bottom-area">
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
                <Sparkles className="w-5 h-5" />
                <span>好神奇</span>
              </span>
            </button>
          </div>
        </div>

        {/* PAGE 3 */}
        <div
          className={`ftux-slide ftux-slide-overlap ftux-slide-page3 ${currentIndex === 2 ? "active" : ""}`}
          id="ftux-slide-2"
        >
          <div className="ftux-mascot-area">
            <div className="ftux-media-shell">
              <video
                className="ftux-fox-media"
                src="/videos/ftux-reading.mp4"
                autoPlay
                loop
                muted
                playsInline
                ref={page3VideoRef}
              />
            </div>
          </div>

          <div className="ftux-text-area">
            <div className="ftux-title">我们开始吧</div>
            <div className="ftux-desc">
              书都准备好啦，
              <br />
              让我读给你听吧。
            </div>
          </div>

          <div className="ftux-bottom-area">
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
                <Rocket className="w-5 h-5" />
                <span>现在开始</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

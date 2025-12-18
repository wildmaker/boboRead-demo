"use client"

import { useEffect, useRef, useState, UIEvent } from "react"
import { Hand, Sparkles, Rocket } from "lucide-react"

interface FtuxIntroProps {
  onFinish: () => void
}

const SLIDE_COUNT = 3

export function FtuxIntro({ onFinish }: FtuxIntroProps) {
  const carouselRef = useRef<HTMLDivElement | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const page3SlideRef = useRef<HTMLDivElement | null>(null)
  const page3MascotRef = useRef<HTMLDivElement | null>(null)
  const page3ShellRef = useRef<HTMLDivElement | null>(null)
  const page3VideoRef = useRef<HTMLVideoElement | null>(null)
  const page3AnimRafRef = useRef<number | null>(null)

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
    // 只在第三页时驱动视频与容器缩放；离开第三页就复位
    const video = page3VideoRef.current
    const shell = page3ShellRef.current
    if (!video) return

    if (currentIndex !== 2) {
      if (page3AnimRafRef.current) {
        cancelAnimationFrame(page3AnimRafRef.current)
        page3AnimRafRef.current = null
      }
      if (shell) {
        shell.style.width = ""
        shell.style.height = ""
        shell.style.padding = ""
        shell.style.borderRadius = ""
        shell.style.transform = ""
      }
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
        // autoplay might be blocked; it is muted but still ignore safely
      }
    }

    ensurePlay()

    // 外层气泡：固定 3 秒内完成放大（与视频播放无关）
    // 关键：不通过 React setState 每帧更新，避免引发重渲染导致视频抖动
    const slide = page3SlideRef.current
    const mascot = page3MascotRef.current
    if (!slide || !shell || !mascot) return

    // 先清空内联样式，确保初态完全沿用现有气泡 UI
    shell.style.width = ""
    shell.style.height = ""
    shell.style.padding = ""
    shell.style.borderRadius = ""
    shell.style.transform = ""
    shell.style.animation = "none" // 停止 CSS 里的 morph 动画，由 JS 接管

    const durationMs = 3000
    const start = performance.now()

    const slideStyle = getComputedStyle(slide)
    const slidePadTop = Number.parseFloat(slideStyle.paddingTop || "0") || 0

    // base size from actual rendered bubble (保持原样)
    const baseRect = shell.getBoundingClientRect()
    const baseW = baseRect.width
    const baseH = baseRect.height
    const basePad = Number.parseFloat(getComputedStyle(shell).paddingTop || "0") || 0

    // target size: full-bleed width (via mascot full-bleed) + half-screen height
    const targetW = mascot.getBoundingClientRect().width
    const slideH = slide.getBoundingClientRect().height
    const targetH = Math.max(baseH, slideH * 0.5)
    const targetPad = 0

    // target translateY: remove slide paddingTop -> top flush (沉浸感)
    const targetTy = -slidePadTop

    const clamp01 = (v: number) => Math.max(0, Math.min(1, v))
    const lerp = (a: number, b: number, k: number) => a + (b - a) * k
    const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3)

    const step = (now: number) => {
      const p = clamp01((now - start) / durationMs)
      const t = easeOutCubic(p)

      const w = lerp(baseW, targetW, t)
      const h = lerp(baseH, targetH, t)
      const pad = lerp(basePad, targetPad, t)

      // 参考 demo：圆角从 50% -> 24px（只改变形状，颜色/边框/阴影等保持原样）
      const rVal = 50 - 50 * t
      const radius = rVal < 24 ? "24px" : `${50 - 40 * t}%`

      const ty = lerp(0, targetTy, t)

      // 关键：对 width/height 取整，并配合 translate3d，减少布局计算导致的抖动
      // 视频画面抖动的根本原因通常是由于 container 尺寸是非整数导致的 object-fit 计算误差
      shell.style.width = `${Math.round(w)}px`
      shell.style.height = `${Math.round(h)}px`
      shell.style.padding = `${Math.round(pad)}px`
      shell.style.borderRadius = radius
      shell.style.transform = `translate3d(0, ${ty}px, 0)`

      // 素材本身略微放大（镜头更近），通过 translate3d(0,0,0) 开启硬件加速
      const mediaScale = 1.1 + 0.1 * t
      video.style.transform = `translate3d(0,0,0) scale(${mediaScale})`

      if (p < 1) {
        page3AnimRafRef.current = requestAnimationFrame(step)
      } else {
        page3AnimRafRef.current = null
      }
    }

    page3AnimRafRef.current = requestAnimationFrame(step)
    return () => {
      if (page3AnimRafRef.current) cancelAnimationFrame(page3AnimRafRef.current)
      page3AnimRafRef.current = null
    }
  }, [currentIndex])

  return (
    <div className="fixed inset-0 z-[250] flex flex-col ftux-root" data-ftux-step={currentIndex}>
      {/* 跳过按钮 */}
      <button type="button" className="ftux-skip-btn" onClick={finish}>
        跳过
      </button>

      {/* 扬声器播放组件 */}
      <div className="ftux-speaker-widget">
        <div className="ftux-speaker-icon">🔊</div>
        <div className="ftux-wave-box">
          <div className="ftux-bar" />
          <div className="ftux-bar" />
          <div className="ftux-bar" />
          <div className="ftux-bar" />
          <div className="ftux-bar" />
        </div>
      </div>

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
          ref={page3SlideRef}
        >
          <div className="ftux-mascot-area" ref={page3MascotRef}>
            <div
              className="ftux-media-shell ftux-media-shell-zoom"
              ref={page3ShellRef}
            >
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

"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter, useParams } from "next/navigation"

type BubbleState = "playing" | "paused" | "finished"
type Mode = "read" | "chat"
type ChatState = "idle" | "recording" | "error"

const ICON_CHAT_PATH = "M12 14c1.66 0 3-1.34 3-3V7c0-1.66-1.34-3-3-3S9 5.34 9 7v4c0 1.66 1.34 3 3 3zm5-3c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.07 2.13 5.64 5 6.32V21h4v-3.68c2.87-.68 5-3.25 5-6.32h-2z"
const ICON_READ_PATH =
  "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"
const ICON_MIC_PATH =
  "M12 14a3 3 0 0 0 3-3V7a3 3 0 0 0-6 0v4a3 3 0 0 0 3 3zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 14 0h-2zm-5 7a1 1 0 0 0 1-1h-2a 1 1 0 0 0 1 1z"
const ICON_PLAY_PATH = "M8 5v14l11-7z"
const ICON_PAUSE_PATH = "M6 19h4V5H6v14zm8-14v14h4V5h-4z"

export default function ReadPage() {
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const id = params.id

  const finishTimerRef = useRef<NodeJS.Timeout | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioStreamRef = useRef<MediaStream | null>(null)
  const longPressTimerRef = useRef<NodeJS.Timeout | null>(null)
  
  const wheelRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  const [bubbleState, setBubbleState] = useState<BubbleState>("playing")
  const [mode, setMode] = useState<Mode>("read")
  const [chatState, setChatState] = useState<ChatState>("idle")
  const [voiceRole, setVoiceRole] = useState("小狐狸")
  const [showVoiceDrawer, setShowVoiceDrawer] = useState(false)
  const [modeTitle, setModeTitle] = useState("AI 伴读模式")
  const [statusText, setStatusText] = useState("正在朗读")
  const [mainText, setMainText] = useState("“在一片安静的沙漠边缘，住着一只小狐狸…”")
  const [cameraFacing, setCameraFacing] = useState<"rear" | "front">("rear")

  // 角色音色试听相关状态
  const sampleAudioRef = useRef<HTMLAudioElement | null>(null)
  const lastHighlightedVoiceRef = useRef<string | null>(null)
  const [currentSampleVoice, setCurrentSampleVoice] = useState<string | null>(null)
  const [isSamplePlaying, setIsSamplePlaying] = useState(false)
  const [canReplaySample, setCanReplaySample] = useState(false)

  const voiceOptions = [
    { label: "小狐狸", emoji: "🦊", gradient: "linear-gradient(135deg, #ff9a9e, #fecfef)", bg: "#FFF0F5" },
    { label: "小猫", emoji: "🐱", gradient: "linear-gradient(135deg, #a18cd1, #fbc2eb)", bg: "#F3E5F5" },
    { label: "小狗", emoji: "🐶", gradient: "linear-gradient(135deg, #f6d365, #fda085)", bg: "#FFF8E1" },
    { label: "小熊", emoji: "🐻", gradient: "linear-gradient(135deg, #84fab0, #8fd3f4)", bg: "#E0F7FA" },
    { label: "小兔子", emoji: "🐰", gradient: "linear-gradient(135deg, #ffdde1, #ee9ca7)", bg: "#FFEBEE" },
    { label: "小象", emoji: "🐘", gradient: "linear-gradient(135deg, #e0c3fc, #8ec5fc)", bg: "#F3E5F5" },
    { label: "小企鹅", emoji: "🐧", gradient: "linear-gradient(135deg, #4facfe, #00f2fe)", bg: "#E0F7FA" },
    { label: "小奶牛", emoji: "🐮", gradient: "linear-gradient(135deg, #43e97b, #38f9d7)", bg: "#E0F2F1" },
    { label: "小恐龙", emoji: "🦕", gradient: "linear-gradient(135deg, #fa709a, #fee140)", bg: "#FFFDE7" },
  ]

  // 不同角色对应的测试音频（放在 public 目录下，实际项目中请替换为真实音频）
  const voiceSampleMap: Record<string, string> = {
    小狐狸: "/demo.mp3",
    小猫: "/demo.mp3",
    小狗: "/demo.mp3",
    小熊: "/demo.mp3",
    小兔子: "/demo.mp3",
    小象: "/demo.mp3",
    小企鹅: "/demo.mp3",
    小奶牛: "/demo.mp3",
    小恐龙: "/demo.mp3",
  }

  const playSampleForVoice = (label: string) => {
    const src = voiceSampleMap[label]
    if (!src) return

    // 停止之前的播放
    if (sampleAudioRef.current) {
      sampleAudioRef.current.pause()
      sampleAudioRef.current.currentTime = 0
    }

    const audio = new Audio(src)
    sampleAudioRef.current = audio
    setCurrentSampleVoice(label)
    setIsSamplePlaying(true)
    setCanReplaySample(false)

    audio.onended = () => {
      setIsSamplePlaying(false)
      setCanReplaySample(true)
    }

    audio.play().catch((err) => {
      console.error("播放测试音频失败:", err)
      setIsSamplePlaying(false)
    })
  }

  // 模拟朗读 5 秒后自动结束
  useEffect(() => {
    if (finishTimerRef.current) {
      clearTimeout(finishTimerRef.current)
    }

    if (bubbleState === "playing") {
      finishTimerRef.current = setTimeout(() => {
        setBubbleState("finished")
        setStatusText("朗读结束")
        setMainText("本页内容已读完，点击重读。")
      }, 5000)
    }

    return () => {
      if (finishTimerRef.current) {
        clearTimeout(finishTimerRef.current)
      }
    }
  }, [bubbleState])

  const handleBubbleClick = () => {
    if (bubbleState === "playing") {
      setBubbleState("paused")
      setStatusText("已暂停")
    } else {
      // 重新进入自动朗读模式，同时确保关闭说话模式
      activateReadMode()
    }
  }

  const activateReadMode = () => {
    setMode("read")
    setBubbleState("playing")
    setStatusText("正在朗读")
    setMainText("“在一片安静的沙漠边缘，住着一只小狐狸…”")
    setModeTitle(`${voiceRole}正在朗读`)
    setChatState("idle")
    // 停止录音（如果正在录音）
    stopRecording()
  }

  const activateChatIdleMode = () => {
    setMode("chat")
    setBubbleState("paused")
    setStatusText("聆听中...")
    setMainText("你好呀！我是小宝，你想聊什么？")
    // 胶囊仅承担 AI 自动朗读相关文案，这里不再提示「按住说话」
    setModeTitle("AI 伴读已暂停")
    setChatState("idle")
  }

  const toggleMode = () => {
    if (mode === "read") {
      activateChatIdleMode()
    } else {
      activateReadMode()
    }
  }

  const startRecording = async () => {
    // Mock 麦克风权限 - 用于高保真交互原型
    try {
      // 模拟获得麦克风权限，直接设置录音状态
      console.log("🎤 Mock: 模拟开始录音")
      setChatState("recording")
      
      // 模拟录音过程，每秒输出一次录音数据日志
      const mockInterval = setInterval(() => {
        const mockSize = Math.floor(Math.random() * 1000) + 500
        console.log("🎤 Mock: 录音数据:", mockSize, "bytes")
      }, 1000)
      
      // 将模拟的 interval 保存起来，以便停止时清理
      mediaRecorderRef.current = { mockInterval } as any

      /* 原始真实麦克风代码（已注释，用于正式环境）
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      audioStreamRef.current = stream

      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder

      mediaRecorder.start()
      setChatState("recording")

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          // 这里可以处理录音数据，发送到服务器等
          console.log("录音数据:", event.data.size, "bytes")
        }
      }

      mediaRecorder.onstop = () => {
        if (audioStreamRef.current) {
          audioStreamRef.current.getTracks().forEach((track) => track.stop())
          audioStreamRef.current = null
        }
        if (chatState === "recording") {
          setChatState("idle")
        }
      }

      mediaRecorder.onerror = (event) => {
        console.error("录音错误:", event)
        setChatState("error")
        stopRecording()
      }
      */
    } catch (error) {
      console.error("无法访问麦克风:", error)
      setChatState("error")
    }
  }

  const stopRecording = () => {
    // Mock 停止录音 - 清理模拟的 interval
    if (mediaRecorderRef.current) {
      const mockRecorder = mediaRecorderRef.current as any
      if (mockRecorder.mockInterval) {
        clearInterval(mockRecorder.mockInterval)
        console.log("🎤 Mock: 停止录音")
      }
      mediaRecorderRef.current = null
    }
    
    if (chatState === "recording") {
      setChatState("idle")
    }

    /* 原始真实代码（已注释）
    if (mediaRecorderRef.current && chatState === "recording") {
      mediaRecorderRef.current.stop()
      mediaRecorderRef.current = null
    }
    if (audioStreamRef.current) {
      audioStreamRef.current.getTracks().forEach((track) => track.stop())
      audioStreamRef.current = null
    }
    if (chatState === "recording") {
      setChatState("idle")
    }
    */
  }

  const handleSpeakPressStart = () => {
    // 说话按钮激活时，切换到聊天模式并暂停朗读
    if (mode !== "chat") {
      activateChatIdleMode()
    }

    // 清除之前的定时器
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current)
    }

    // 设置长按定时器（300ms 后开始录音）
    longPressTimerRef.current = setTimeout(() => {
      startRecording()
    }, 300)
  }

  const handleSpeakPressEnd = () => {
    // 清除长按定时器
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current)
      longPressTimerRef.current = null
    }

    // 如果正在录音，停止录音
    if (chatState === "recording") {
      stopRecording()
    }
  }

  // Arc Wheel Logic
  const handleScroll = () => {
    if (!wheelRef.current) return
    const wheel = wheelRef.current
    const containerCenter = wheel.scrollLeft + wheel.offsetWidth / 2

    let closestIndex = -1
    let minDistance = Number.POSITIVE_INFINITY

    cardsRef.current.forEach((card, index) => {
      if (!card) return
      const cardCenter = card.offsetLeft + (card.offsetWidth / 2)
      const distance = cardCenter - containerCenter
      const ratio = distance / 320
      const clampedRatio = Math.max(-1, Math.min(1, ratio))

      const scale = 1.1 - Math.abs(clampedRatio) * 0.25
      const translateY = Math.abs(clampedRatio) * 50
      const rotate = clampedRatio * 15
      const opacity = 1 - Math.abs(clampedRatio) * 0.4

      card.style.transform = `translateY(${translateY}px) scale(${scale}) rotate(${rotate}deg)`
      card.style.opacity = opacity.toString()

      if (Math.abs(clampedRatio) < 0.15) {
        card.classList.add('active')
        if (Math.abs(distance) < minDistance) {
          minDistance = Math.abs(distance)
          closestIndex = index
        }
      } else {
        card.classList.remove('active')
      }
    })

    // 中心高亮卡片变化时，自动播放对应的测试音频
    if (closestIndex !== -1) {
      const newLabel = voiceOptions[closestIndex]?.label
      if (newLabel && newLabel !== lastHighlightedVoiceRef.current) {
        lastHighlightedVoiceRef.current = newLabel
        // playSampleForVoice(newLabel)
      }
    }
  }

  useEffect(() => {
    if (showVoiceDrawer && wheelRef.current) {
      // Delay slightly to ensure layout and scroll to current selection
      setTimeout(() => {
        handleScroll()
        const index = voiceOptions.findIndex(v => v.label === voiceRole)
        if (index !== -1 && cardsRef.current[index]) {
             cardsRef.current[index]?.scrollIntoView({ inline: 'center', block: 'nearest' })
        }
      }, 100)
      
      const wheel = wheelRef.current
      let ticking = false
      const onScroll = () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleScroll()
                ticking = false
            })
            ticking = true
        }
      }
      wheel.addEventListener('scroll', onScroll)
      return () => wheel.removeEventListener('scroll', onScroll)
    }
  }, [showVoiceDrawer])

  const handleCardClick = (index: number, item: any) => {
    // 移除旧的 clicking class 逻辑，改由 press handlers 控制
    setVoiceRole(item.label)
    cardsRef.current[index]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
    // 点击卡片时也触发一次试听，确保用户能立刻听到对应音色
    playSampleForVoice(item.label)
  }

  const handleCardPressStart = (e: React.MouseEvent | React.TouchEvent) => {
    // 使用 currentTarget 确保操作的是绑定事件的 div
    e.currentTarget.classList.add('pressed')
  }

  const handleCardPressEnd = (e: React.MouseEvent | React.TouchEvent) => {
    e.currentTarget.classList.remove('pressed')
  }

  // 清理函数
  useEffect(() => {
    return () => {
      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current)
      }
      stopRecording()

      // 清理音频资源
      if (sampleAudioRef.current) {
        sampleAudioRef.current.pause()
        sampleAudioRef.current = null
      }
    }
  }, [])

  const handleClose = () => {
    router.push("/")
  }

  const toggleCameraFacing = () => {
    setCameraFacing((prev) => (prev === "rear" ? "front" : "rear"))
  }

  return (
    <div className="storypal-read-root fixed inset-0 bg-black text-white">
      <div className="camera-wrapper" data-facing={cameraFacing}>
        <img src="/dumbo-book-cover.jpg" alt="绘本封面" className="camera-image" />

        <div className="camera-overlay">
          <div className="scene-capsule-floating">
            <div className="scene-top-controls">
              <button
                className="glass-icon-btn close-btn"
                type="button"
                aria-label="关闭并返回首页"
                onClick={handleClose}
              >
                ×
              </button>

              <button
                className="scene-capsule"
                type="button"
                onClick={() => setShowVoiceDrawer(true)}
                aria-label="切换朗读角色"
              >
                <span className="scene-icon">
                  <span />
                  <span />
                  <span />
                  <span />
                </span>
                <span className="scene-text">选择角色</span>
              </button>

              <button
                className="glass-icon-btn camera-switch-btn"
                type="button"
                onClick={toggleCameraFacing}
                aria-label={`切换到${cameraFacing === "rear" ? "前" : "后"}摄像头`}
              >
                <span className="camera-switch-icon" aria-hidden="true">
                  <img src="/images/flip.svg" alt="" style={{ width: 20, height: 20 }} />
                </span>
              </button>
            </div>
          </div>

          {/* 底部控制条 */}
          <div className="glass-footer">
            <div 
              className={`control-wrapper ${chatState === "recording" ? "is-listening" : ""}`}
              data-state={bubbleState === "playing" ? "reading" : "paused"}
            >
              {/* 声波气泡：按住麦克风时浮现 */}
              <div className="wave-bubble">
                <div className="bar" />
                <div className="bar" />
                <div className="bar" />
                <div className="bar" />
              </div>

              {/* 左侧胶囊：AI 自动朗读 + 角色气泡 */}
              <div
                className="glass-btn btn-capsule"
                onClick={handleBubbleClick}
                data-bubble-state={bubbleState}
              >
                {/* Option 1: Deep Nebula Effect */}
                <div className="aurora-nebula">
                  <div className="nebula-blob nb-1"></div>
                  <div className="nebula-blob nb-2"></div>
                  <div className="nebula-blob nb-3"></div>
                </div>

                {/* 声音波浪 - 移至 capsule-main 外部作为背景层 */}
                <div className="wave-container">
                  <div className="wave-bar" />
                  <div className="wave-bar" />
                  <div className="wave-bar" />
                  <div className="wave-bar" />
                  <div className="wave-bar" />
                  <div className="wave-bar" />
                  <div className="wave-bar" />
                  <div className="wave-bar" />
                  <div className="wave-bar" />
                  <div className="wave-bar" />
                </div>

                <div className="capsule-main">
                  <div
                    className={`fox-bubble-container ${bubbleState === "paused" ? "paused" : ""} ${
                      bubbleState === "finished" ? "finished" : ""
                    }`}
                  >
                    <div className="fox-avatar">
                      <img src="/avatar-fox.png" alt="小宝" className="fox-avatar-img" />
                    </div>

                    {/* 声音波浪已移至外部 */}
                  </div>

                  <div
                    className="play-toggle"
                    aria-label={bubbleState === "playing" ? "暂停朗读" : "继续朗读"}
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d={bubbleState === "playing" ? ICON_PAUSE_PATH : ICON_PLAY_PATH} />
                    </svg>
                  </div>
                  {/* 文案状态已按需求移除，仅保留角色头像与声波 */}
                </div>
              </div>

              {/* 右侧麦克风：按住说话 */}
              <button
                className="glass-btn btn-mic"
                type="button"
                aria-label="按住说话"
                onMouseDown={handleSpeakPressStart}
                onMouseUp={handleSpeakPressEnd}
                onMouseLeave={handleSpeakPressEnd}
                onTouchStart={handleSpeakPressStart}
                onTouchEnd={handleSpeakPressEnd}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d={ICON_MIC_PATH} />
                </svg>
              </button>
            </div>
          </div>

          {/* 角色选择抽屉 (Arc Wheel) */}
          {showVoiceDrawer && (
            <div className="role-drawer-backdrop" onClick={() => setShowVoiceDrawer(false)}>
              <div
                className="role-drawer"
                onClick={(event) => event.stopPropagation()}
                role="dialog"
                aria-label="选择朗读角色"
              >
                <div className="role-drawer-handle" />
                <button className="drawer-close-btn-absolute" type="button" onClick={() => setShowVoiceDrawer(false)} aria-label="关闭">
                  ×
                </button>
                <div className="role-drawer-header flex items-center justify-between">
                  <span>选择音色</span>
                  <button
                    type="button"
                    className="text-xs px-2 py-1 rounded-full border border-white/30 text-white/80 disabled:opacity-40"
                    onClick={() => currentSampleVoice && playSampleForVoice(currentSampleVoice)}
                    disabled={!canReplaySample || !currentSampleVoice}
                  >
                    Replay
                  </button>
                </div>
                
                <div className="wheel-container" ref={wheelRef}>
                  {voiceOptions.map((item, index) => (
                    <div
                      key={item.label}
                      className={`role-card-wheel ${voiceRole === item.label ? "selected" : ""}`}
                      data-label={item.label}
                      ref={(el) => { cardsRef.current[index] = el }}
                      onClick={() => handleCardClick(index, item)}
                      onMouseDown={handleCardPressStart}
                      onTouchStart={handleCardPressStart}
                      onMouseUp={handleCardPressEnd}
                      onTouchEnd={handleCardPressEnd}
                      onMouseLeave={handleCardPressEnd}
                    >
                      <div className="role-card-inner">
                        <div className="role-card-avatar" style={{ background: item.gradient }}>
                          {item.emoji}
                        </div>
                        <div className="role-card-name">{item.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

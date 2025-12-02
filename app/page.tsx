"use client"

import { useEffect, useState } from "react"
import { HomeScreen, type Book } from "@/components/home-screen"
import { CameraScreen } from "@/components/camera-screen"
import { OnboardingGuide } from "@/components/onboarding-guide"
import { FtuxIntro } from "@/components/ftux-intro"
import { BookDetailModal, type CardRect } from "@/components/book-detail-modal"

export default function Page() {
  const [activeScreen, setActiveScreen] = useState<"home" | "camera">("home")
  const [bookCount, setBookCount] = useState<1 | 7>(1)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [showFtux, setShowFtux] = useState(false)
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const [selectedCardRect, setSelectedCardRect] = useState<CardRect | null>(null)
  const [showBookDetail, setShowBookDetail] = useState(false)

  // 首次进入 App 时展示 FTUX 流程
  useEffect(() => {
    try {
      if (typeof window === "undefined") return
      const hasSeenFtux = localStorage.getItem("hasSeenFtux")
      if (!hasSeenFtux) {
        setShowFtux(true)
      }
    } catch {
      // 忽略本地存储异常
    }
  }, [])

  const handleAddNewBook = () => {
    const hasSeenOnboarding = typeof window !== "undefined" ? localStorage.getItem("hasSeenOnboarding") : "true"

    if (!hasSeenOnboarding) {
      // 首次用户：先展示摄像头使用引导
      setShowOnboarding(true)
    } else {
      // 已看过引导：直接进入摄像头界面
      setActiveScreen("camera")
    }
  }

  const handleOnboardingComplete = () => {
    setShowOnboarding(false)
    // 引导结束后进入摄像头界面开始扫描
    setActiveScreen("camera")
  }

  const rectFromDom = (bookId: number): CardRect | null => {
    if (typeof document === "undefined") return null
    const el = document.querySelector<HTMLElement>(`[data-book-id="${bookId}"]`)
    if (!el) return null
    const rect = el.getBoundingClientRect()
    return {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    }
  }

  const handleScanSuccess = () => {
    // 扫描成功后：回到首页、增加书本数量、弹出新书卡片
    setActiveScreen("home")
    setBookCount(7)
    // 显示刚扫描的书（法老王的宝藏）
    const newBook: Book = {
      id: 1,
      title: "法老王的宝藏",
      image: "/egyptian-pharaoh-treasure-ancient-egypt.jpg",
      date: "刚刚添加到图书馆",
      status: "new",
      tape: "yellow",
    }
    setSelectedBook(newBook)
    // 等待首页 DOM 更新后再测量位置
    requestAnimationFrame(() => {
      const rect = rectFromDom(newBook.id)
      if (rect) {
        setSelectedCardRect(rect)
      }
    })
    setShowBookDetail(true)
  }

  const handleBookClick = (book: Book, cardRect: DOMRect) => {
    setSelectedBook(book)
    setSelectedCardRect({
      top: cardRect.top,
      left: cardRect.left,
      width: cardRect.width,
      height: cardRect.height,
    })
    setShowBookDetail(true)
  }

  const handleCloseBookDetail = () => {
    setShowBookDetail(false)
    // 延迟清空选中的书，等动画完成
    setTimeout(() => {
      setSelectedBook(null)
      setSelectedCardRect(null)
    }, 600)
  }

  const handleStartReading = (book: Book) => {
    // TODO: 实现开始阅读逻辑
    console.log("开始阅读:", book.title)
  }

  return (
    <div className="h-screen w-full overflow-hidden relative">
      <HomeScreen
        isActive={activeScreen === "home"}
        onStartReading={handleAddNewBook}
        onBookClick={handleBookClick}
        bookCount={bookCount}
      />
      <CameraScreen
        isActive={activeScreen === "camera"}
        onBack={() => setActiveScreen("home")}
        onRead={() => {}}
        onScanSuccess={handleScanSuccess}
      />

      {/* 图书详情弹窗（通用） */}
      <BookDetailModal
        book={selectedBook}
        isOpen={showBookDetail && activeScreen === "home"}
        onClose={handleCloseBookDetail}
        onStartReading={handleStartReading}
        targetRect={selectedCardRect}
      />

      {showOnboarding && <OnboardingGuide onComplete={handleOnboardingComplete} />}

      {showFtux && <FtuxIntro onFinish={() => setShowFtux(false)} />}
    </div>
  )
}

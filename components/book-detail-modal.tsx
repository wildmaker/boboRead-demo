"use client"

import { X } from "lucide-react"
import { useRef, useState } from "react"
import type { Book } from "@/components/home-screen"

export interface CardRect {
  top: number
  left: number
  width: number
  height: number
}

interface BookDetailModalProps {
  book: Book | null
  isOpen: boolean
  onClose: () => void
  onStartReading?: (book: Book) => void
  targetRect?: CardRect | null
}

export function BookDetailModal({ book, isOpen, onClose, onStartReading, targetRect }: BookDetailModalProps) {
  const [isClosing, setIsClosing] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  if (!book || !isOpen) return null

  const playReturnAnimation = () => {
    if (!targetRect || !cardRef.current) return false
    const cardRect = cardRef.current.getBoundingClientRect()
    const deltaX = targetRect.left - cardRect.left
    const deltaY = targetRect.top - cardRect.top
    const scaleX = targetRect.width / cardRect.width
    const scaleY = targetRect.height / cardRect.height

    cardRef.current.animate(
      [
        { transform: "translate3d(0,0,0) scale(1)", opacity: 1 },
        {
          transform: `translate3d(${deltaX}px, ${deltaY}px, 0) scale(${scaleX}, ${scaleY})`,
          opacity: 0.15,
        },
      ],
      {
        duration: 600,
        easing: "cubic-bezier(0.4, 0, 0.2, 1)",
        fill: "forwards",
      },
    )
    return true
  }

  const handleClose = () => {
    // 触发关闭动画
    setIsClosing(true)
    playReturnAnimation()
    // 等待动画完成后真正关闭
    setTimeout(() => {
      setIsClosing(false)
      onClose()
    }, 600) // 动画时长
  }

  const handleStartReading = () => {
    if (onStartReading) {
      onStartReading(book)
    }
    handleClose()
  }

  return (
    <div
      className={`fixed inset-0 z-[150] flex items-center justify-center bg-[rgba(255,255,255,0.85)] backdrop-blur-[10px] transition-opacity duration-300 ${
        isClosing ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="relative w-full px-6 max-w-md flex flex-col items-center">
        {/* 关闭按钮 */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="关闭图书详情"
          className={`absolute left-0 top-[-72px] ml-6 w-9 h-9 rounded-full bg-white/80 text-[#5D4037] shadow-[0_4px_10px_rgba(0,0,0,0.2)] flex items-center justify-center border border-white/80 transition-opacity duration-300 ${
            isClosing ? "opacity-0" : "opacity-100"
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        {/* 复用首页「只有一张卡片」的 Polaroid 样式 */}
        <div
          ref={cardRef}
          className={`
            group polaroid-card relative bg-white rounded-[18px] p-2.5 pb-10
            shadow-[0_2px_5px_rgba(141,110,99,0.08),_0_14px_32px_rgba(141,110,99,0.25)]
            transition-transform duration-300
            w-[280px]
            ${isClosing ? "" : "animate-pop-in"}
          `}
        >
          {/* Washi Tape */}
          <div
            className={`
              absolute top-[-12px] left-1/2 w-[50px] h-4
              opacity-85 mix-blend-multiply
              shadow-[0_2px_2px_rgba(0,0,0,0.1)]
              tape-mask
              ${
                book.tape === "yellow"
                  ? "bg-[#FFEB3B] -translate-x-1/2 rotate-[-2deg]"
                  : book.tape === "cyan"
                    ? "bg-[#4DD0E1] -translate-x-1/2 rotate-[3deg]"
                    : book.tape === "pink"
                      ? "bg-[#F48FB1] -translate-x-1/2 rotate-[-4deg]"
                      : "bg-[#A5D6A7] -translate-x-1/2 rotate-[1deg]"
              }
            `}
          />

          {/* Image Container */}
          <div className="relative w-full aspect-[1/1.05] bg-[#F5F5F5] rounded-xl overflow-hidden border border-black/[0.03] mb-8">
            <img
              src={book.image || "/placeholder.svg"}
              alt={book.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 opacity-30 pointer-events-none mix-blend-overlay film-grain" />

            {/* Status Pill Tag */}
            {book.status && (
              <div className="absolute top-2 right-2 bg-white/95 px-2.5 py-1 rounded-xl text-[0.65rem] font-black text-[#4E342E] shadow-[0_2px_5px_rgba(0,0,0,0.1)] flex items-center gap-1">
                {book.status === "reading" && (
                  <>
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FF9100] shadow-[0_0_5px_#FF9100]" />
                    <span>阅读中</span>
                  </>
                )}
                {book.status === "new" && <span className="text-[#00C853]">✨ NEW</span>}
                {book.status === "completed" && (
                  <>
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00E676]" />
                    <span>完结</span>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Handwritten Note */}
          <div className="absolute bottom-2.5 left-0 w-full text-center px-2">
            <div className="font-nunito font-black text-[#4E342E] text-[0.9rem] mb-0.5 leading-tight">
              {book.title}
            </div>
            <div className="font-fredoka text-[0.7rem] text-[#9E9E9E] tracking-wide">{book.date}</div>
          </div>
        </div>

        {/* 操作按钮 */}
        <button
          onClick={handleStartReading}
          className={`mt-8 w-[220px] py-3 rounded-[24px] border-none bg-[#26C6DA] text-white font-bold text-sm shadow-[0_4px_0_#0097A7] active:translate-y-0.5 active:shadow-none self-center transition-opacity duration-300 ${
            isClosing ? "opacity-0" : "opacity-100"
          }`}
        >
          开始阅读
        </button>
      </div>
    </div>
  )
}


"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Camera, AlertCircle, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"

export default function ScanPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const bookId = searchParams.get("bookId") || "1"

  const [isScanning, setIsScanning] = useState(true)
  const [scanSuccess, setScanSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [guideText, setGuideText] = useState("把封面放进框框里哦~")

  useEffect(() => {
    const scanTimer = setTimeout(() => {
      setIsScanning(false)
      setScanSuccess(true)
      setGuideText("找到啦！")
    }, 2500)

    const redirectTimer = setTimeout(() => {
      router.push(`/read/${bookId}`)
    }, 3500)

    return () => {
      clearTimeout(scanTimer)
      clearTimeout(redirectTimer)
    }
  }, [router, bookId])

  const handleRetry = () => {
    setError(null)
    setIsScanning(true)
    setScanSuccess(false)
    setGuideText("把封面放进框框里哦~")
  }

  const handleShutterClick = () => {
    if (scanSuccess || error) return
    setIsScanning(false)
    setScanSuccess(true)
    setGuideText("找到啦！")
    // 保持原有自动跳转计时，不额外 push 路由，避免重复跳转
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4">
        <Link href={`/book/${bookId}`}>
          <Button variant="ghost" size="icon" className="rounded-full bg-black/50 text-white hover:bg-black/70">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
      </div>

      {/* Camera Preview / Scanning Area */}
      <div className="flex-1 relative flex flex-col items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center overflow-hidden">
          {/* Simulated camera grain effect */}
          <div className="absolute inset-0 opacity-20 bg-[url('/camera-grain-texture.jpg')]" />
          <Camera className="w-24 h-24 text-gray-600/50" />
        </div>

        {/* 扫描框和狐狸提示语的容器 */}
        <div className="relative z-10 flex flex-col items-center">
          {/* 扫描框 */}
          <div className="relative w-80 h-96 rounded-3xl flex items-center justify-center">
            {/* Corner indicators */}
            <div className="absolute inset-0">
              {/* Top-left */}
              <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-primary rounded-tl-3xl" />
              {/* Top-right */}
              <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-primary rounded-tr-3xl" />
              {/* Bottom-left */}
              <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-primary rounded-bl-3xl" />
              {/* Bottom-right */}
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-primary rounded-br-3xl" />
            </div>

            {/* 金色光束扫描线 */}
            {isScanning && !error && <div className="laser-beam" />}

            {scanSuccess && (
              <div className="absolute inset-0 flex items-center justify-center animate-in fade-in zoom-in duration-500">
                <div className="bg-primary/90 rounded-full p-4 shadow-2xl">
                  <CheckCircle2 className="w-16 h-16 text-primary-foreground" />
                </div>
              </div>
            )}

            {/* Status text */}
            <div className="text-center space-y-2 px-6">
              <p className="text-white font-semibold text-lg drop-shadow-lg">
                {isScanning && !error && "正在识别封面..."}
                {scanSuccess && "识别成功！"}
              </p>
              {scanSuccess && <p className="text-white/80 text-sm drop-shadow">即将进入阅读模式</p>}
            </div>
          </div>

          {/* 狐狸和提示语 - 固定在扫描框下方，狐狸在左侧，文字在右侧 */}
          <div className="relative z-20 mt-6 flex items-center gap-4 px-4">
            <div className="drop-shadow-[-5px_6px_12px_rgba(0,0,0,0.35)] flex-shrink-0">
              <Image
                src="/images/fox_01.png"
                alt="小狐狸"
                width={72}
                height={72}
                className="object-contain"
                priority
              />
            </div>
            <div className="bg-white px-3.5 py-2.5 rounded-[20px_20px_20px_0] shadow-[0_5px_15px_rgba(0,0,0,0.25)] text-[0.85rem] font-bold text-[color:var(--text-dark)] max-w-[240px] text-left leading-relaxed">
              {guideText}
            </div>
          </div>
        </div>

        {error && (
          <div className="absolute bottom-32 left-6 right-6 bg-card rounded-2xl p-6 shadow-xl animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-destructive flex-shrink-0 mt-0.5" />
              <div className="flex-1 space-y-3">
                <div>
                  <h3 className="font-semibold text-lg">识别失败</h3>
                  <p className="text-sm text-muted-foreground mt-1">{error}</p>
                </div>
                <Button onClick={handleRetry} className="w-full">
                  重新扫描
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 底部控制台：快门按钮 + 文案 */}
      <div className="pb-8 pt-4 px-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col items-center gap-4">
        {/* 快门按钮 */}
        <button
          type="button"
          onClick={handleShutterClick}
          className="relative w-20 h-20 flex items-center justify-center active:scale-95 transition-transform duration-100"
        >
          {/* 外圈 */}
          <div className="absolute inset-0 rounded-full border-4 border-white/90 shadow-[0_5px_15px_rgba(0,0,0,0.4)]" />
          {/* 内芯 */}
          <div
            className="w-16 h-16 rounded-full border-[3px] border-white shadow-inner"
            style={{
              background: "radial-gradient(circle at 30% 30%, #FFD740 0%, #FFC107 100%)",
              boxShadow: "inset 0 -4px 4px rgba(0,0,0,0.15)",
            }}
          />
        </button>

        {/* 提示文案 */}
        <div className="text-center space-y-1">
          <p className="text-white font-medium text-balance">将绘本封面对准取景框</p>
          <p className="text-white/60 text-sm">点击下方按钮拍照识别，系统将自动开始阅读</p>
        </div>
      </div>
    </div>
  )
}



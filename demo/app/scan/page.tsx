"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Camera, AlertCircle, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"

export default function ScanPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const bookId = searchParams.get("bookId") || "1"

  const [isScanning, setIsScanning] = useState(true)
  const [scanSuccess, setScanSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const scanTimer = setTimeout(() => {
      setIsScanning(false)
      setScanSuccess(true)
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
      <div className="flex-1 relative flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center overflow-hidden">
          {/* Simulated camera grain effect */}
          <div className="absolute inset-0 opacity-20 bg-[url('/camera-grain-texture.jpg')]" />
          <Camera className="w-24 h-24 text-gray-600/50" />
        </div>

        <div className="relative z-10 w-80 h-96 rounded-3xl flex items-center justify-center">
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

          {isScanning && !error && (
            <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-[scan_2s_ease-in-out_infinite]">
              <style jsx>{`
                @keyframes scan {
                  0%, 100% { top: 0; opacity: 0; }
                  50% { opacity: 1; }
                  100% { top: 100%; opacity: 0; }
                }
              `}</style>
            </div>
          )}

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

      <div className="p-6 bg-gradient-to-t from-black/80 to-transparent text-center space-y-2">
        <p className="text-white font-medium text-balance">将绘本封面对准取景框</p>
        <p className="text-white/60 text-sm">系统将自动识别并开始阅读</p>
      </div>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Sparkles, Trophy, Clock, BookOpen, ArrowRight } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

export default function ReadingCompletePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const bookId = searchParams.get("bookId")
  const bookTitle = searchParams.get("title") || "这本书"

  // Simulated state - check if this is user's first completed book
  const [isFirstCompletion, setIsFirstCompletion] = useState(true)
  const [showConfetti, setShowConfetti] = useState(true)

  // Mock reading stats
  const readingStats = {
    duration: "12分30秒",
    pages: 24,
    wordsLearned: 18,
  }

  useEffect(() => {
    // Hide confetti after animation
    const timer = setTimeout(() => setShowConfetti(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex flex-col relative overflow-hidden">
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-${Math.random() * 20}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            >
              <Sparkles className="text-primary/60" size={16 + Math.random() * 16} />
            </div>
          ))}
        </div>
      )}

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md space-y-6 animate-in fade-in zoom-in-95 duration-500">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center animate-in zoom-in-50 duration-700">
                <CheckCircle2 className="w-12 h-12 text-primary" />
              </div>
              <div className="absolute -top-2 -right-2 w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center animate-in zoom-in duration-1000 delay-300">
                <Trophy className="w-6 h-6 text-secondary" />
              </div>
            </div>
          </div>

          {/* Congratulations */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-balance">太棒了！</h1>
            <p className="text-muted-foreground text-pretty">你完成了《{bookTitle}》的阅读</p>
          </div>

          {/* Reading Stats */}
          <div className="bg-card p-6 rounded-3xl shadow-sm border space-y-4">
            <h3 className="font-semibold text-center mb-4">本次阅读统计</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div className="text-sm text-muted-foreground">时长</div>
                <div className="font-semibold">{readingStats.duration}</div>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mx-auto">
                  <BookOpen className="w-6 h-6 text-secondary" />
                </div>
                <div className="text-sm text-muted-foreground">页数</div>
                <div className="font-semibold">{readingStats.pages}页</div>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto">
                  <Sparkles className="w-6 h-6 text-accent" />
                </div>
                <div className="text-sm text-muted-foreground">新词汇</div>
                <div className="font-semibold">{readingStats.wordsLearned}个</div>
              </div>
            </div>
          </div>

          {/* First Completion - Baby Setup Prompt */}
          {isFirstCompletion && (
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-6 rounded-3xl border border-primary/20 space-y-4 animate-in slide-in-from-bottom-4 duration-500 delay-500">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <h4 className="font-semibold text-balance">完善宝宝信息</h4>
                  <p className="text-sm text-muted-foreground text-pretty">
                    填写宝宝的基本信息，我们将为您推荐更适合的图书内容
                  </p>
                </div>
              </div>
              <Button size="lg" className="w-full h-12 rounded-xl" onClick={() => router.push("/baby-setup")}>
                去填写
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button size="lg" className="w-full h-12 rounded-xl" onClick={() => router.push("/")}>
              继续探索更多图书
            </Button>
            {bookId && (
              <Button
                size="lg"
                variant="outline"
                className="w-full h-12 rounded-xl bg-transparent"
                onClick={() => router.push(`/book/${bookId}`)}
              >
                再读一遍
              </Button>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes confetti {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-confetti {
          animation: confetti linear forwards;
        }
      `}</style>
    </div>
  )
}



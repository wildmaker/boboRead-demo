"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { BookOpen, Library, User, Settings, Share2, ChevronRight, Crown, Sparkles } from "lucide-react"
import Link from "next/link"

// Mock user data
const userData = {
  name: "小明",
  avatar: "👶",
  age: "4岁",
  isPro: true, // Set to false to see non-Pro UI
  proExpiresAt: "2025-12-31",
  totalReadingTime: 120, // minutes
  booksCompleted: 15,
  currentStreak: 7,
  favoriteBooks: 23,
}

const achievements = [
  { id: 1, icon: "🏆", title: "阅读小能手", description: "连续阅读7天" },
  { id: 2, icon: "⭐", title: "故事大王", description: "完成10本故事书" },
  { id: 3, icon: "🎯", title: "专注达人", description: "累计阅读2小时" },
]

const recentBooks = [
  {
    id: 1,
    title: "小兔子的冒险",
    cover: "/placeholder.svg?key=jczz2",
    completedAt: "今天",
  },
  {
    id: 2,
    title: "恐龙世界",
    cover: "/placeholder.svg?key=9a5bq",
    completedAt: "昨天",
  },
  {
    id: 3,
    title: "太空探险",
    cover: "/placeholder.svg?key=qs3q8",
    completedAt: "2天前",
  },
]

export default function ProfilePage() {
  const handleShare = () => {
    // Share functionality
    alert("分享功能")
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 px-6 pt-8 pb-12">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-3xl flex items-center justify-center text-3xl shadow-lg">
                {userData.avatar}
              </div>
              {userData.isPro && (
                <div className="absolute -top-1 -right-1 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full p-1.5 shadow-lg">
                  <Crown className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold">{userData.name}</h1>
                {userData.isPro && (
                  <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-2 py-0.5 rounded-full text-xs font-bold shadow-md">
                    <Crown className="w-3 h-3" />
                    <span>Pro</span>
                  </div>
                )}
              </div>
              <p className="text-muted-foreground mt-1">{userData.age}</p>
            </div>
          </div>
          <Link href="/settings">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Settings className="w-5 h-5" />
            </Button>
          </Link>
        </div>

        {userData.isPro && (
          <Card className="mb-4 bg-gradient-to-r from-yellow-400/20 to-amber-500/20 border-yellow-400/30 backdrop-blur-sm">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-xl flex items-center justify-center shadow-md">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-amber-900 dark:text-amber-100">Pro 会员</div>
                  <div className="text-xs text-amber-700 dark:text-amber-200">有效期至 {userData.proExpiresAt}</div>
                </div>
              </div>
              <Link href="/vip">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-yellow-400 text-yellow-600 hover:bg-yellow-50 bg-transparent"
                >
                  续费
                </Button>
              </Link>
            </div>
          </Card>
        )}

        {!userData.isPro && (
          <Link href="/vip">
            <Card className="mb-4 bg-gradient-to-r from-yellow-400/10 to-amber-500/10 border-yellow-400/20 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-xl flex items-center justify-center shadow-md">
                    <Crown className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-amber-900 dark:text-amber-100">升级 Pro 会员</div>
                    <div className="text-xs text-amber-700 dark:text-amber-200">解锁全部故事和功能</div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-yellow-600" />
              </div>
            </Card>
          </Link>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{userData.totalReadingTime}</div>
            <div className="text-xs text-muted-foreground mt-1">阅读分钟</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-secondary">{userData.booksCompleted}</div>
            <div className="text-xs text-muted-foreground mt-1">完成书籍</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-accent">{userData.currentStreak}</div>
            <div className="text-xs text-muted-foreground mt-1">连续天数</div>
          </Card>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-6 space-y-6">
        {/* Achievements */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">成就徽章</h2>
            <Button variant="ghost" size="sm" className="text-sm" asChild>
              <Link href="/achievements">
                查看全部
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {achievements.map((achievement) => (
              <Card key={achievement.id} className="p-4 text-center hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-2">{achievement.icon}</div>
                <p className="text-xs font-medium line-clamp-2">{achievement.title}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Recent Reading */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold">最近阅读</h2>
          <div className="space-y-2">
            {recentBooks.map((book) => (
              <Link key={book.id} href={`/book/${book.id}`}>
                <Card className="p-4 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-4">
                    <img
                      src={book.cover || "/placeholder.svg"}
                      alt={book.title}
                      className="w-16 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium line-clamp-1">{book.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">完成于 {book.completedAt}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Action Cards */}
        <section className="space-y-3">
          <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer" onClick={handleShare}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Share2 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">分享 APP</h3>
                  <p className="text-sm text-muted-foreground">邀请好友一起阅读</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </Card>

          <Link href="/settings">
            <Card className="p-4 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center">
                    <Settings className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-medium">设置</h3>
                    <p className="text-sm text-muted-foreground">账号与个人信息</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </Card>
          </Link>
        </section>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t px-6 py-3">
        <div className="flex items-center justify-around">
          <Link
            href="/home"
            className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <BookOpen className="w-6 h-6" />
            <span className="text-xs">首页</span>
          </Link>
          <Link
            href="/library"
            className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Library className="w-6 h-6" />
            <span className="text-xs">图书馆</span>
          </Link>
          <Link href="/profile" className="flex flex-col items-center gap-1 text-primary">
            <User className="w-6 h-6" />
            <span className="text-xs font-medium">我的</span>
          </Link>
        </div>
      </nav>
    </div>
  )
}

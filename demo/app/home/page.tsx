"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { BookOpen, Library, User, Sparkles, ChevronRight, ScanLine, Search, AlertCircle } from "lucide-react"
import Link from "next/link"

// Mock data
const recentBooks = [
  {
    id: 2,
    title: "恐龙世界大探险",
    cover: "/placeholder.svg?height=200&width=150",
    progress: 45,
  },
  {
    id: 3,
    title: "太空探险记",
    cover: "/placeholder.svg?height=200&width=150",
    progress: 78,
  },
]

const featuredCollections = [
  {
    id: 1,
    title: "牛津英语小飞鼠·高级·阅读全掌握",
    bookCount: 36,
    coverImage: "/images/image.png",
    category: "bxl格式",
    description: "牛津出版社经典英语分级阅读系列",
  },
  {
    id: 2,
    title: "培生幼儿英语预备级第一辑",
    bookCount: 48,
    coverImage: "/images/image.png",
    category: "bxl格式",
    description: "适合3-6岁儿童的英语启蒙读物",
  },
  {
    id: 3,
    title: "培生幼儿英语基础级第二辑",
    bookCount: 42,
    coverImage: "/images/image.png",
    category: "bxl格式",
    description: "进阶英语阅读，建立语言基础",
  },
  {
    id: 4,
    title: "培生词汇妙趣屋：第二辑",
    bookCount: 40,
    coverImage: "/images/image.png",
    category: "bxl格式",
    description: "趣味词汇学习，轻松掌握英语词汇",
  },
]

const popularBooks = [
  { id: 6, title: "勇敢的小狮子", cover: "/placeholder.svg?height=240&width=180", isPremium: true },
  { id: 7, title: "彩虹的故事", cover: "/placeholder.svg?height=240&width=180", isPremium: false },
  { id: 8, title: "友谊的力量", cover: "/placeholder.svg?height=240&width=180", isPremium: true },
  { id: 9, title: "海底奇遇记", cover: "/placeholder.svg?height=240&width=180", isPremium: false },
]

export default function HomePage() {
  const isLoggedIn = false

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 px-6 py-6 space-y-4">
        {!isLoggedIn && (
          <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-2xl p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1 space-y-2">
              <p className="text-sm text-amber-900 dark:text-amber-200 font-medium">你还未登录</p>
              <p className="text-xs text-amber-700 dark:text-amber-300">登录后可使用语音伴读功能</p>
            </div>
            <Button size="sm" variant="default" className="flex-shrink-0" asChild>
              <Link href="/login">登录</Link>
            </Button>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">书小宝</h1>
            <p className="text-sm text-muted-foreground mt-1">你好，小明</p>
          </div>
          <Link href="/profile">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-primary-foreground" />
            </div>
          </Link>
        </div>

        <Link href="/scan">
          <Button size="lg" className="w-full h-14 rounded-2xl shadow-lg gap-2">
            <ScanLine className="w-5 h-5" />
            扫描封面开始阅读
          </Button>
        </Link>
      </header>

      {/* Main Content */}
      <main className="px-6 py-6 space-y-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input placeholder="搜索绘本..." className="pl-10 h-12 rounded-2xl bg-muted/50" />
        </div>

        {/* Recent Reading */}
        {recentBooks.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-secondary" />
                <h2 className="text-xl font-bold">最近阅读</h2>
              </div>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {recentBooks.map((book) => (
                <Link key={book.id} href={`/book/${book.id}`} className="flex-shrink-0">
                  <Card className="w-32 overflow-hidden hover:shadow-lg transition-shadow">
                    <img src={book.cover || "/placeholder.svg"} alt={book.title} className="w-full h-40 object-cover" />
                    <div className="p-3">
                      <h3 className="font-medium text-sm line-clamp-2 text-balance">{book.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1">已读 {book.progress}%</p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold">精选内容</h2>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 -mx-6 px-6">
            {featuredCollections.map((collection) => (
              <Link key={collection.id} href={`/collection/${collection.id}`} className="flex-shrink-0">
                <Card className="w-64 overflow-hidden hover:shadow-xl transition-all hover:scale-[1.02]">
                  <div className="relative aspect-[4/3] bg-gradient-to-br from-muted/50 to-muted p-3">
                    <div className="w-full h-full rounded-lg overflow-hidden shadow-md">
                      <img
                        src={collection.coverImage || "/placeholder.svg"}
                        alt={collection.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute top-5 right-5 bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full font-medium shadow-sm">
                      {collection.bookCount} 本
                    </div>
                  </div>
                  <div className="p-4 space-y-2">
                    <div className="text-xs text-muted-foreground">{collection.category}</div>
                    <h3 className="font-bold text-base line-clamp-2 text-balance leading-tight">{collection.title}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 text-pretty">{collection.description}</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Popular Books */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">热门绘本</h2>
            <Button variant="ghost" size="sm" className="text-sm" asChild>
              <Link href="/library">
                更多
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {popularBooks.map((book) => (
              <Link key={book.id} href={`/book/${book.id}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow relative">
                  <img src={book.cover || "/placeholder.svg"} alt={book.title} className="w-full h-48 object-cover" />
                  {book.isPremium && (
                    <div className="absolute top-2 right-2 bg-accent text-accent-foreground text-xs px-2 py-0.5 rounded-full font-medium">
                      精品
                    </div>
                  )}
                  <div className="p-3">
                    <h3 className="font-medium text-sm line-clamp-2 text-balance">{book.title}</h3>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t px-6 py-3">
        <div className="flex items-center justify-around">
          <Link href="/home" className="flex flex-col items-center gap-1 text-primary">
            <BookOpen className="w-6 h-6" />
            <span className="text-xs font-medium">首页</span>
          </Link>
          <Link
            href="/library"
            className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Library className="w-6 h-6" />
            <span className="text-xs">图书馆</span>
          </Link>
          <Link
            href="/profile"
            className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <User className="w-6 h-6" />
            <span className="text-xs">我的</span>
          </Link>
        </div>
      </nav>
    </div>
  )
}

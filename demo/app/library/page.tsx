"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Search, BookOpen, LibraryIcon, User, Sparkles } from "lucide-react"
import Link from "next/link"

// Mock data
const categories = [
  { id: "story", name: "故事", icon: "📖" },
  { id: "science", name: "科普", icon: "🔬" },
  { id: "picture", name: "绘本", icon: "🎨" },
  { id: "english", name: "英语", icon: "🗣️" },
  { id: "music", name: "音乐", icon: "🎵" },
  { id: "math", name: "数学", icon: "🔢" },
]

const ageGroups = [
  { id: "0-2", name: "0-2岁", books: "120+" },
  { id: "3-5", name: "3-5岁", books: "350+" },
  { id: "6-8", name: "6-8岁", books: "280+" },
  { id: "9-12", name: "9-12岁", books: "200+" },
]

const featuredBooks = [
  {
    id: 1,
    title: "小红帽",
    cover: "/little-red-riding-hood-children-book.jpg",
    category: "故事",
    age: "3-5岁",
  },
  {
    id: 2,
    title: "太阳系探秘",
    cover: "/solar-system-children-book.jpg",
    category: "科普",
    age: "6-8岁",
  },
  {
    id: 3,
    title: "动物世界",
    cover: "/animal-world-children-book.jpg",
    category: "绘本",
    age: "3-5岁",
  },
  {
    id: 4,
    title: "ABC字母歌",
    cover: "/abc-alphabet-children-book.jpg",
    category: "英语",
    age: "3-5岁",
  },
  {
    id: 5,
    title: "快乐数学",
    cover: "/math-children-book.jpg",
    category: "数学",
    age: "6-8岁",
  },
  {
    id: 6,
    title: "经典童谣",
    cover: "/nursery-rhymes-children-book.jpg",
    category: "音乐",
    age: "0-2岁",
  },
]

export default function LibraryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  const handleSearch = () => {
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-card border-b sticky top-0 z-10 px-6 py-4">
        <h1 className="text-2xl font-bold mb-4">图书馆</h1>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="搜索书名或关键词..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="pl-10 h-12 rounded-xl"
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-6 space-y-8">
        {/* Categories */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold">分类浏览</h2>
          <div className="grid grid-cols-3 gap-3">
            {categories.map((category) => (
              <Link key={category.id} href={`/category/${category.id}`}>
                <Card className="p-4 text-center hover:shadow-lg transition-all hover:-translate-y-1">
                  <div className="text-3xl mb-2">{category.icon}</div>
                  <p className="text-sm font-medium">{category.name}</p>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Age Groups */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold">按年龄段</h2>
          <div className="grid grid-cols-2 gap-3">
            {ageGroups.map((group) => (
              <Link key={group.id} href={`/age/${group.id}`}>
                <Card className="p-4 hover:shadow-lg transition-all hover:border-primary">
                  <h3 className="font-bold text-lg">{group.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{group.books} 本书</p>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Books */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold">精选书单</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {featuredBooks.map((book) => (
              <Link key={book.id} href={`/book/${book.id}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <img src={book.cover || "/placeholder.svg"} alt={book.title} className="w-full h-48 object-cover" />
                  <div className="p-3 space-y-2">
                    <h3 className="font-medium text-sm line-clamp-2 text-balance">{book.title}</h3>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="bg-primary/10 text-primary px-2 py-0.5 rounded">{book.category}</span>
                      <span className="text-muted-foreground">{book.age}</span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* AI Interactive */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold">AI 互动专区</h2>
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold mb-1">AI 伴读故事</h3>
                <p className="text-sm text-muted-foreground text-pretty">智能语音讲故事，互动问答更有趣</p>
              </div>
              <Button size="sm" className="rounded-full">
                体验
              </Button>
            </div>
          </Card>
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
          <Link href="/library" className="flex flex-col items-center gap-1 text-primary">
            <LibraryIcon className="w-6 h-6" />
            <span className="text-xs font-medium">图书馆</span>
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

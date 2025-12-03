"use client"

import { useState, useEffect, Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Search, ArrowLeft, X, Clock } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

// Mock search results
const mockResults = [
  {
    id: 1,
    title: "小兔子的冒险",
    cover: "/rabbit-adventure-book.jpg",
    category: "故事",
    age: "3-5岁",
    description: "跟随小兔子一起探索神奇的森林",
  },
  {
    id: 2,
    title: "勇敢的小兔",
    cover: "/brave-rabbit-book.jpg",
    category: "故事",
    age: "3-5岁",
    description: "学会勇敢面对困难",
  },
  {
    id: 3,
    title: "兔子和乌龟",
    cover: "/rabbit-turtle-race-book.jpg",
    category: "故事",
    age: "3-5岁",
    description: "经典的龟兔赛跑故事",
  },
]

const recentSearches = ["小兔子", "恐龙", "太空", "海洋"]

function SearchPageContent() {
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get("q") || "")
  const [results, setResults] = useState<typeof mockResults>([])
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    if (query) {
      setIsSearching(true)
      // Simulate search delay
      const timer = setTimeout(() => {
        setResults(mockResults)
        setIsSearching(false)
      }, 500)
      return () => clearTimeout(timer)
    } else {
      setResults([])
    }
  }, [query])

  const handleSearch = (searchTerm: string) => {
    setQuery(searchTerm)
  }

  const clearSearch = () => {
    setQuery("")
    setResults([])
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Search */}
      <header className="bg-card border-b sticky top-0 z-10 px-4 py-4">
        <div className="flex items-center gap-3">
          <Link href="/library">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="搜索书名或关键词..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 pr-10 h-11 rounded-xl"
              autoFocus
            />
            {query && (
              <button onClick={clearSearch} className="absolute right-3 top-1/2 -translate-y-1/2">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-6 space-y-6">
        {!query && (
          <>
            {/* Recent Searches */}
            <section className="space-y-3">
              <h2 className="text-sm font-medium text-muted-foreground">最近搜索</h2>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((term) => (
                  <Button
                    key={term}
                    variant="outline"
                    size="sm"
                    className="rounded-full bg-transparent"
                    onClick={() => handleSearch(term)}
                  >
                    <Clock className="w-3 h-3 mr-1" />
                    {term}
                  </Button>
                ))}
              </div>
            </section>

            {/* Popular Searches */}
            <section className="space-y-3">
              <h2 className="text-sm font-medium text-muted-foreground">热门搜索</h2>
              <div className="flex flex-wrap gap-2">
                {["恐龙世界", "公主故事", "超级英雄", "科学实验"].map((term, index) => (
                  <Button
                    key={term}
                    variant="secondary"
                    size="sm"
                    className="rounded-full"
                    onClick={() => handleSearch(term)}
                  >
                    <span className="text-xs font-bold text-primary mr-1">{index + 1}</span>
                    {term}
                  </Button>
                ))}
              </div>
            </section>
          </>
        )}

        {isSearching && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">搜索中...</p>
          </div>
        )}

        {query && !isSearching && results.length === 0 && (
          <div className="text-center py-12 space-y-2">
            <p className="text-muted-foreground">没有找到相关书籍</p>
            <p className="text-sm text-muted-foreground">试试其他关键词吧</p>
          </div>
        )}

        {results.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-sm font-medium text-muted-foreground">找到 {results.length} 个结果</h2>
            <div className="space-y-3">
              {results.map((book) => (
                <Link key={book.id} href={`/book/${book.id}`}>
                  <Card className="p-4 hover:shadow-lg transition-shadow">
                    <div className="flex gap-4">
                      <img
                        src={book.cover || "/placeholder.svg"}
                        alt={book.title}
                        className="w-20 h-28 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0 space-y-2">
                        <h3 className="font-bold line-clamp-2 text-balance">{book.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 text-pretty">{book.description}</p>
                        <div className="flex items-center gap-2 text-xs">
                          <span className="bg-primary/10 text-primary px-2 py-0.5 rounded">{book.category}</span>
                          <span className="text-muted-foreground">{book.age}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchPageContent />
    </Suspense>
  )
}



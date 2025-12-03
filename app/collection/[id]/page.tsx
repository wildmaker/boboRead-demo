"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Crown } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"

// Mock collections data
const collectionsData: Record<
  string,
  {
    id: number
    title: string
    category: string
    description: string
    bookCount: number
    coverImage: string
    books: Array<{
      id: number
      title: string
      cover: string
      isPremium: boolean
      ageRange: string
      pages: number
    }>
  }
> = {
  "1": {
    id: 1,
    title: "牛津英语小飞鼠·高级·阅读全掌握",
    category: "bxl格式",
    description:
      "牛津出版社经典英语分级阅读系列，专为6-8岁儿童设计的进阶读物，涵盖丰富主题和场景。",
    bookCount: 36,
    coverImage: "/images/image.png",
    books: [
      {
        id: 101,
        title: "The Magic Key",
        cover: "/placeholder.svg?height=300&width=200",
        isPremium: true,
        ageRange: "6-8岁",
        pages: 24,
      },
      {
        id: 102,
        title: "Dragon Adventure",
        cover: "/placeholder.svg?height=300&width=200",
        isPremium: true,
        ageRange: "6-8岁",
        pages: 24,
      },
      {
        id: 103,
        title: "Lost in the Jungle",
        cover: "/placeholder.svg?height=300&width=200",
        isPremium: true,
        ageRange: "6-8岁",
        pages: 28,
      },
      {
        id: 104,
        title: "Space Mission",
        cover: "/placeholder.svg?height=300&width=200",
        isPremium: true,
        ageRange: "6-8岁",
        pages: 26,
      },
      {
        id: 105,
        title: "Under the Sea",
        cover: "/placeholder.svg?height=300&width=200",
        isPremium: true,
        ageRange: "6-8岁",
        pages: 24,
      },
      {
        id: 106,
        title: "Time Travel",
        cover: "/placeholder.svg?height=300&width=200",
        isPremium: true,
        ageRange: "6-8岁",
        pages: 30,
      },
      {
        id: 107,
        title: "The Giant's Castle",
        cover: "/placeholder.svg?height=300&width=200",
        isPremium: true,
        ageRange: "6-8岁",
        pages: 24,
      },
      {
        id: 108,
        title: "Pirate Treasure",
        cover: "/placeholder.svg?height=300&width=200",
        isPremium: true,
        ageRange: "6-8岁",
        pages: 26,
      },
    ],
  },
  "2": {
    id: 2,
    title: "培生幼儿英语预备级第一辑",
    category: "bxl格式",
    description: "培生集团权威出品，专为3-6岁儿童设计的英语启蒙读物，简单易懂，配有精美插图。",
    bookCount: 48,
    coverImage: "/images/image.png",
    books: [
      {
        id: 201,
        title: "Hello!",
        cover: "/placeholder.svg?height=300&width=200",
        isPremium: false,
        ageRange: "3-6岁",
        pages: 12,
      },
      {
        id: 202,
        title: "My Family",
        cover: "/placeholder.svg?height=300&width=200",
        isPremium: false,
        ageRange: "3-6岁",
        pages: 12,
      },
      {
        id: 203,
        title: "Colors Around Us",
        cover: "/placeholder.svg?height=300&width=200",
        isPremium: false,
        ageRange: "3-6岁",
        pages: 12,
      },
      {
        id: 204,
        title: "My Toys",
        cover: "/placeholder.svg?height=300&width=200",
        isPremium: false,
        ageRange: "3-6岁",
        pages: 12,
      },
      {
        id: 205,
        title: "Animals I Love",
        cover: "/placeholder.svg?height=300&width=200",
        isPremium: true,
        ageRange: "3-6岁",
        pages: 14,
      },
      {
        id: 206,
        title: "Count with Me",
        cover: "/placeholder.svg?height=300&width=200",
        isPremium: true,
        ageRange: "3-6岁",
        pages: 14,
      },
      {
        id: 207,
        title: "Fun at the Park",
        cover: "/placeholder.svg?height=300&width=200",
        isPremium: true,
        ageRange: "3-6岁",
        pages: 14,
      },
      {
        id: 208,
        title: "My Day",
        cover: "/placeholder.svg?height=300&width=200",
        isPremium: true,
        ageRange: "3-6岁",
        pages: 14,
      },
    ],
  },
  "3": {
    id: 3,
    title: "培生幼儿英语基础级第二辑",
    category: "bxl格式",
    description: "进阶英语阅读系列，帮助4-7岁儿童建立扎实的语言基础，培养阅读兴趣。",
    bookCount: 42,
    coverImage: "/images/image.png",
    books: [
      {
        id: 301,
        title: "Going Shopping",
        cover: "/placeholder.svg?height=300&width=200",
        isPremium: true,
        ageRange: "4-7岁",
        pages: 16,
      },
      {
        id: 302,
        title: "At the Zoo",
        cover: "/placeholder.svg?height=300&width=200",
        isPremium: true,
        ageRange: "4-7岁",
        pages: 16,
      },
      {
        id: 303,
        title: "Birthday Party",
        cover: "/placeholder.svg?height=300&width=200",
        isPremium: true,
        ageRange: "4-7岁",
        pages: 18,
      },
      {
        id: 304,
        title: "My School Day",
        cover: "/placeholder.svg?height=300&width=200",
        isPremium: true,
        ageRange: "4-7岁",
        pages: 16,
      },
      {
        id: 305,
        title: "Weather Fun",
        cover: "/placeholder.svg?height=300&width=200",
        isPremium: true,
        ageRange: "4-7岁",
        pages: 16,
      },
      {
        id: 306,
        title: "Helping at Home",
        cover: "/placeholder.svg?height=300&width=200",
        isPremium: true,
        ageRange: "4-7岁",
        pages: 18,
      },
    ],
  },
  "4": {
    id: 4,
    title: "培生词汇妙趣屋：第二辑",
    category: "bxl格式",
    description:
      "趣味词汇学习系列，通过生动有趣的故事帮助5-8岁儿童轻松掌握常用英语词汇。",
    bookCount: 40,
    coverImage: "/images/image.png",
    books: [
      {
        id: 401,
        title: "Action Words",
        cover: "/placeholder.svg?height=300&width=200",
        isPremium: true,
        ageRange: "5-8岁",
        pages: 20,
      },
      {
        id: 402,
        title: "Food & Drinks",
        cover: "/placeholder.svg?height=300&width=200",
        isPremium: true,
        ageRange: "5-8岁",
        pages: 20,
      },
      {
        id: 403,
        title: "Opposites",
        cover: "/placeholder.svg?height=300&width=200",
        isPremium: true,
        ageRange: "5-8岁",
        pages: 20,
      },
      {
        id: 404,
        title: "Places to Go",
        cover: "/placeholder.svg?height=300&width=200",
        isPremium: true,
        ageRange: "5-8岁",
        pages: 22,
      },
      {
        id: 405,
        title: "Feelings",
        cover: "/placeholder.svg?height=300&width=200",
        isPremium: true,
        ageRange: "5-8岁",
        pages: 20,
      },
      {
        id: 406,
        title: "Things I Wear",
        cover: "/placeholder.svg?height=300&width=200",
        isPremium: true,
        ageRange: "5-8岁",
        pages: 20,
      },
    ],
  },
}

export default function CollectionDetailPage() {
  const params = useParams()
  const router = useRouter()
  const collectionId = params.id as string
  const collection = collectionsData[collectionId]

  if (!collection) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">合辑不存在</p>
          <Button onClick={() => router.push("/home")}>返回首页</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header with back button */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="flex items-center gap-3 px-4 py-3">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1 min-w-0">
            <h1 className="font-bold text-lg truncate">{collection.title}</h1>
            <p className="text-xs text-muted-foreground">{collection.category}</p>
          </div>
        </div>
      </header>

      {/* Collection Info */}
      <div className="px-6 py-6 space-y-4">
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-lg">
          <img
            src={collection.coverImage || "/placeholder.svg"}
            alt={collection.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                {collection.category}
              </div>
              <div className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                共 {collection.bookCount} 本
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-bold text-balance">{collection.title}</h2>
          <p className="text-sm text-muted-foreground text-pretty leading-relaxed">{collection.description}</p>
        </div>
      </div>

      {/* Books Grid */}
      <div className="px-6 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-lg">全部图书</h3>
          <span className="text-sm text-muted-foreground">{collection.books.length} 本</span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {collection.books.map((book) => (
            <Link key={book.id} href={`/book/${book.id}`}>
              <Card className="overflow-hidden hover:shadow-lg transition-all hover:scale-[1.02] relative group">
                <div className="relative aspect-[3/4]">
                  <img src={book.cover || "/placeholder.svg"} alt={book.title} className="w-full h-full object-cover" />
                  {book.isPremium && (
                    <div className="absolute top-2 right-2 bg-accent text-accent-foreground text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1 shadow-sm">
                      <Crown className="w-3 h-3" />
                      精品
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                </div>
                <div className="p-3 space-y-1">
                  <h4 className="font-medium text-sm line-clamp-2 text-balance leading-tight">{book.title}</h4>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{book.ageRange}</span>
                    <span>{book.pages}页</span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* Show more hint if there are more books */}
        {collection.books.length < collection.bookCount && (
          <div className="text-center py-4">
            <p className="text-sm text-muted-foreground">
              还有 {collection.bookCount - collection.books.length} 本图书...
            </p>
          </div>
        )}
      </div>
    </div>
  )
}



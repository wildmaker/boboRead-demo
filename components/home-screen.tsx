"use client"

import Link from "next/link"

export interface Book {
  id: number
  title: string
  image: string
  date: string
  status?: "reading" | "new" | "completed"
  progress?: number
  tape: "yellow" | "cyan" | "pink" | "green"
}

interface HomeScreenProps {
  isActive: boolean
  onStartReading: () => void
  onBookClick: (book: Book, cardRect: DOMRect) => void
  bookCount: 1 | 7
}

export function HomeScreen({ isActive, onStartReading, onBookClick, bookCount }: HomeScreenProps) {
  const allBooks: Book[] = [
    {
      id: 1,
      title: "法老王的宝藏",
      image: "/egyptian-pharaoh-treasure-ancient-egypt.jpg",
      date: "昨天 20:30",
      status: "reading" as const,
      progress: 80,
      tape: "yellow" as const,
    },
    {
      id: 2,
      title: "海底两万里",
      image: "/underwater-ocean-submarine-sea-adventure.jpg",
      date: "刚刚添加",
      status: "new" as const,
      tape: "cyan" as const,
    },
    {
      id: 3,
      title: "魔法红舞鞋",
      image: "/magic-red-shoes-fairy-tale-ballet.jpg",
      date: "3天前读过",
      status: "completed" as const,
      tape: "pink" as const,
    },
    {
      id: 4,
      title: "火星大救援",
      image: "/mars-planet-space-rescue-mission.jpg",
      date: "Oct 24",
      tape: "green" as const,
    },
    {
      id: 5,
      title: "狮子王辛巴",
      image: "/lion-king-simba-africa-savanna.jpg",
      date: "Oct 20",
      status: "reading" as const,
      tape: "yellow" as const,
    },
    {
      id: 6,
      title: "晚安月亮",
      image: "/goodnight-moon-night-sky-bedtime.jpg",
      date: "Sep 15",
      status: "completed" as const,
      tape: "pink" as const,
    },
    {
      id: 7,
      title: "小王子",
      image: "/little-prince-stars-planet-rose.jpg",
      date: "Sep 10",
      status: "reading" as const,
      tape: "green" as const,
    },
  ]

  const books = bookCount === 1 ? [allBooks[0]] : allBooks

  return (
    <div className={`fixed inset-0 flex-col ${isActive ? "flex" : "hidden"}`}>
      <div className="px-6 pt-[50px] pb-5 flex justify-between items-end bg-gradient-to-b from-[#FFFDF8] to-transparent relative z-10">
        <div>
          <h1 className="text-[1.8rem] font-black text-[#FF8F00] mb-1 [text-shadow:2px_2px_0px_rgba(255,236,179,0.5)] font-fredoka">
            图书馆
          </h1>
          <p className="text-sm text-[#8D6E63] font-bold">已收集 {bookCount === 1 ? "1" : "12"} 个精彩故事</p>
        </div>

        <Link
          href="/profile"
          className="bg-white border-2 border-[#FFECB3] px-3 py-1.5 rounded-[20px] flex items-center gap-1.5 shadow-[0_4px_10px_rgba(255,193,7,0.15)] hover:shadow-[0_6px_14px_rgba(255,193,7,0.25)] active:scale-95 transition-all"
        >
          <span className="text-lg [filter:drop-shadow(0_2px_2px_rgba(255,87,34,0.2))]">😊</span>
          <span className="text-sm font-fredoka font-semibold text-[#5D4037]">我的</span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-[130px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden relative z-[1]">
        <div
          className={
            bookCount === 1 ? "flex justify-center items-start pt-6" : "grid grid-cols-2 gap-x-5 gap-y-10 items-start"
          }
        >
          {books.map((book, index) => (
            <div
              key={book.id}
              data-book-id={book.id}
              onClick={(event) => onBookClick(book, event.currentTarget.getBoundingClientRect())}
              className={`
                group polaroid-card relative bg-white rounded-[18px] p-2.5 pb-10
                shadow-[0_2px_5px_rgba(141,110,99,0.05),_0_10px_30px_rgba(141,110,99,0.12)]
                transition-all duration-300 cursor-pointer
                [backface-visibility:hidden]
                hover:!rotate-0 hover:scale-[1.03] hover:shadow-[0_15px_40px_rgba(141,110,99,0.2)] hover:z-10
                active:scale-[0.96]
                ${
                  bookCount === 1
                    ? "w-[280px] scale-110"
                    : index % 2 === 0
                      ? "rotate-[-2deg] origin-top-left"
                      : "rotate-[1.5deg] origin-top-right mt-10"
                }
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
                {/* Film grain overlay */}
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
          ))}
        </div>
      </div>

      <div className="fixed bottom-[30px] left-1/2 -translate-x-1/2 flex flex-col items-center z-[100]">
        {/* Button + Fox wrapper */}
        <div className="relative mt-1 flex items-center">
          {/* Fennec Fox hiding behind the button */}
          <img
            src="/images/fox_01.png"
            alt="小狐狸"
            className="pointer-events-none absolute -left-24 bottom-[-18px] w-[180px] h-auto object-contain z-0 drop-shadow-[0_10px_25px_rgba(0,0,0,0.3)]"
          />

          {/* Pulse Ring：正好在按钮正下方，尺寸与按钮一致 */}
          <div className="pointer-events-none absolute inset-0 rounded-[50px] bg-[rgba(255,215,0,0.4)] z-[-2] animate-pulse-ring-gold" />

          {/* Main CTA Button */}
          <button
            onClick={onStartReading}
            className="
              relative overflow-hidden
              bg-gradient-to-b from-[#FFD700] to-[#FFB300]
              text-[#5D4037] font-fredoka text-xl font-bold
              flex items-center justify-center gap-2
              px-12 py-[18px] rounded-[50px]
              border-4 border-white
              shadow-[0_6px_0_#FF8F00,_0_20px_30px_rgba(255,143,0,0.25)]
              min-w-[220px]
              transition-all duration-100
              active:translate-y-1 active:shadow-[0_2px_0_#FF8F00]
              shine-effect
              z-[1]
            "
          >
            <svg
              className="w-7 h-7"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 9.5C4 8.39543 4.89543 7.5 6 7.5H8L9 6H15L16 7.5H18C19.1046 7.5 20 8.39543 20 9.5V17.5C20 18.6046 19.1046 19.5 18 19.5H6C4.89543 19.5 4 18.6046 4 17.5V9.5Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx="12"
                cy="13.5"
                r="3"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <circle cx="18" cy="10" r="0.8" fill="currentColor" />
            </svg>
            <span>添加新书</span>
          </button>
        </div>
      </div>
    </div>
  )
}

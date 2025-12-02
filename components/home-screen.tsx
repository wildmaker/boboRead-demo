"use client"

interface HomeScreenProps {
  isActive: boolean
  onStartReading: () => void
}

export function HomeScreen({ isActive, onStartReading }: HomeScreenProps) {
  const books = [
    {
      id: 1,
      title: "法老王的宝藏",
      image: "https://images.unsplash.com/photo-1626262963665-22d716223b2c?auto=format&fit=crop&q=80",
      date: "昨天 20:30",
      status: "reading" as const,
      progress: 80,
      tape: "yellow" as const,
    },
    {
      id: 2,
      title: "海底两万里",
      image: "https://images.unsplash.com/photo-1535591273668-578e31182c4f?auto=format&fit=crop&q=80",
      date: "刚刚添加",
      status: "new" as const,
      tape: "cyan" as const,
    },
    {
      id: 3,
      title: "魔法红舞鞋",
      image: "https://images.unsplash.com/photo-1551024601-562963525602?auto=format&fit=crop&q=80",
      date: "3天前读过",
      status: "completed" as const,
      tape: "pink" as const,
    },
    {
      id: 4,
      title: "火星大救援",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80",
      date: "Oct 24",
      tape: "green" as const,
    },
    {
      id: 5,
      title: "狮子王辛巴",
      image: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&q=80",
      date: "Oct 20",
      tape: "yellow" as const,
    },
    {
      id: 6,
      title: "晚安月亮",
      image: "https://images.unsplash.com/photo-1518932945647-7a1c969f8be2?auto=format&fit=crop&q=80",
      date: "Sep 15",
      tape: "pink" as const,
    },
  ]

  return (
    <div className={`fixed inset-0 flex-col ${isActive ? "flex" : "hidden"}`}>
      <div className="px-6 pt-[50px] pb-5 flex justify-between items-end bg-gradient-to-b from-[#FFFDF8] to-transparent relative z-10">
        <div>
          <h1 className="text-[1.8rem] font-black text-[#FF8F00] mb-1 [text-shadow:2px_2px_0px_rgba(255,236,179,0.5)] font-fredoka">
            我的收藏册
          </h1>
          <p className="text-sm text-[#8D6E63] font-bold">已收集 12 个精彩故事</p>
        </div>

        <div className="bg-white border-2 border-[#FFECB3] px-3 py-1.5 rounded-[20px] flex items-center gap-1.5 shadow-[0_4px_10px_rgba(255,193,7,0.15)]">
          <span className="text-lg [filter:drop-shadow(0_2px_2px_rgba(255,87,34,0.2))]">🔥</span>
          <span className="text-sm font-fredoka font-semibold text-[#FF6F00]">连续 3 天</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-[130px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden relative z-[1]">
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 items-start">
          {books.map((book, index) => (
            <div
              key={book.id}
              className={`
                group polaroid-card relative bg-white rounded-[18px] p-2.5 pb-10
                shadow-[0_2px_5px_rgba(141,110,99,0.05),_0_10px_30px_rgba(141,110,99,0.12)]
                transition-all duration-300 cursor-pointer
                [backface-visibility:hidden]
                hover:!rotate-0 hover:scale-[1.03] hover:shadow-[0_15px_40px_rgba(141,110,99,0.2)] hover:z-10
                active:scale-[0.96]
                ${index % 2 === 0 ? "rotate-[-2deg] origin-top-left" : "rotate-[1.5deg] origin-top-right mt-10"}
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
                        <span>{book.progress}%</span>
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
        {/* Pulse Ring */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-[80%] h-[60%] rounded-[50px] bg-[rgba(255,215,0,0.4)] z-[-1] animate-pulse-ring-gold" />

        {/* Hippo Head */}
        <div className="text-[4rem] mb-[-22px] z-[2] animate-hippo-float [filter:drop-shadow(0_4px_0px_rgba(0,0,0,0.1))] pointer-events-none">
          🦛
        </div>

        {/* Main CTA Button */}
        <button
          onClick={onStartReading}
          className="
            relative overflow-hidden
            bg-gradient-to-b from-[#FFD700] to-[#FFB300]
            text-[#5D4037] font-fredoka text-xl font-bold
            px-12 py-[18px] rounded-[50px]
            border-4 border-white
            shadow-[0_6px_0_#FF8F00,_0_20px_30px_rgba(255,143,0,0.25)]
            min-w-[220px]
            transition-all duration-100
            active:translate-y-1 active:shadow-[0_2px_0_#FF8F00]
            shine-effect
          "
        >
          开始读书
        </button>
      </div>
    </div>
  )
}

"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { CheckCircle2, ShoppingCart, MessageCircle } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

export default function TutorialPage() {
  const router = useRouter()
  const [showPurchaseGuide] = useState(false)

  const steps = [
    {
      number: "1",
      title: '通过手机应用商店下载并安装"慧读伴侣APP"',
      description: '扫描二维码或搜索"慧读伴侣"',
      color: "text-pink-600",
    },
    {
      number: "2",
      title: '打开手机App，在"激活"界面输入激活码',
      description: "激活码位于产品包装内",
      color: "text-purple-600",
    },
    {
      number: "3",
      title: "将手机/平板放在支架上，摄像头对准书本",
      description: "确保书本内容清晰可见",
      color: "text-orange-600",
    },
    {
      number: "4",
      title: "把反光镜贴纸贴在手机/平板背面",
      description: "也可扣在手机壳上方，让摄像头朝下拍摄",
      color: "text-red-600",
    },
    {
      number: "5",
      title: "点击《慧读伴侣》APP",
      description: "开始体验智能朗读之旅",
      color: "text-blue-600",
    },
  ]

  const handleContactService = () => {
    alert("正在跳转到微信客服...")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-300 via-amber-400 to-amber-500">
      {/* Header */}
      <div className="px-6 py-8 text-center">
        <h1 className="text-4xl font-bold text-white mb-2">AI慧读伴侣</h1>
        <h2 className="text-5xl font-black text-white tracking-wider">使用说明</h2>
      </div>

      <div className="mx-6 mb-6 bg-white/95 backdrop-blur rounded-3xl p-6 shadow-lg border-2 border-amber-600">
        <div className="flex items-start gap-4 mb-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
            <ShoppingCart className="w-6 h-6 text-amber-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-2">温馨提示</h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              本APP需配合专用硬件设备使用，包括阅读支架和反光镜贴纸。如您尚未购买设备，请先联系客服完成购买。
            </p>
          </div>
        </div>
        <Button
          onClick={handleContactService}
          className="w-full h-12 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold rounded-full shadow-md flex items-center justify-center gap-2"
        >
          <MessageCircle className="w-5 h-5" />
          联系微信客服购买设备
        </Button>
      </div>

      {/* Hero Image */}
      <div className="relative w-full h-64 mb-8">
        <Image src="/images/image.jpeg" alt="AI Reading Companion Tutorial" fill className="object-contain" priority />
      </div>

      {/* Steps */}
      <div className="px-6 pb-24 space-y-6">
        {steps.map((step, index) => (
          <div key={index} className="bg-white rounded-3xl p-6 shadow-lg">
            <div className="flex items-start gap-4">
              <div
                className={`flex-shrink-0 w-12 h-12 rounded-full ${
                  index === 0
                    ? "bg-pink-100"
                    : index === 1
                    ? "bg-purple-100"
                    : index === 2
                    ? "bg-orange-100"
                    : index === 3
                    ? "bg-red-100"
                    : "bg-blue-100"
                } flex items-center justify-center`}
              >
                <span className={`text-2xl font-black ${step.color}`}>{step.number}</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-2 leading-snug">{step.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Tip */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-4 text-sm text-gray-700">
          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
          <p className="leading-relaxed">将平板或手机放入支架凹槽处即可开始阅读</p>
        </div>
        <Button
          onClick={() => router.push("/")}
          className="w-full h-14 text-lg font-bold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 rounded-full shadow-lg"
        >
          开始使用
        </Button>
      </div>
    </div>
  )
}



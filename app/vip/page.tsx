"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Crown, Sparkles, Volume2, Zap, Check } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const plans = [
  {
    id: "monthly",
    name: "月度会员",
    price: 29,
    unit: "元/月",
    save: null as string | null,
    popular: false,
  },
  {
    id: "yearly",
    name: "年度会员",
    price: 199,
    unit: "元/年",
    save: "省149元",
    popular: true,
  },
]

const features = [
  {
    icon: Sparkles,
    title: "解锁所有精品资源",
    description: "海量优质绘本随心读",
  },
  {
    icon: Zap,
    title: "AI 实时合成朗读",
    description: "任何绘本都能智能朗读",
  },
  {
    icon: Volume2,
    title: "Pro 音色全解锁",
    description: "更多高品质声音选择",
  },
]

export default function VIPPage() {
  const router = useRouter()
  const [selectedPlan, setSelectedPlan] = useState("yearly")
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSubscribe = () => {
    setIsProcessing(true)
    setTimeout(() => {
      router.push("/home")
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      {/* Header */}
      <header className="p-4 flex items-center justify-between">
        <Link href="/home">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-lg font-semibold">会员订阅</h1>
        <div className="w-10" />
      </header>

      {/* Content */}
      <main className="px-6 pb-6 space-y-6">
        {/* Hero */}
        <div className="text-center space-y-4 py-8">
          <div className="flex justify-center">
            <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-3xl flex items-center justify-center shadow-2xl">
              <Crown className="w-12 h-12 text-primary-foreground" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-balance">开通会员</h2>
          <p className="text-muted-foreground text-pretty">解锁全部精品内容和 AI 智能功能</p>
        </div>

        {/* Features */}
        <div className="space-y-3">
          {features.map((feature, index) => (
            <Card key={index} className="p-4 flex items-center gap-4 border-2">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
              <Check className="w-5 h-5 text-primary flex-shrink-0" />
            </Card>
          ))}
        </div>

        {/* Plans */}
        <div className="space-y-4">
          <h3 className="font-semibold text-center">选择订阅方案</h3>
          <div className="space-y-3">
            {plans.map((plan) => (
              <button
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className="w-full relative"
                type="button"
              >
                <Card
                  className={`p-5 flex items-center justify-between border-2 transition-all ${
                    selectedPlan === plan.id ? "border-primary bg-primary/5 shadow-lg" : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedPlan === plan.id ? "border-primary bg-primary" : "border-border"
                      }`}
                    >
                      {selectedPlan === plan.id && <div className="w-2.5 h-2.5 bg-primary-foreground rounded-full" />}
                    </div>
                    <div className="text-left">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{plan.name}</h4>
                        {plan.popular && <Badge className="bg-accent text-accent-foreground text-xs">最划算</Badge>}
                      </div>
                      {plan.save && <p className="text-xs text-primary">{plan.save}</p>}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">¥{plan.price}</div>
                    <div className="text-xs text-muted-foreground">{plan.unit}</div>
                  </div>
                </Card>
              </button>
            ))}
          </div>
        </div>

        {/* Subscribe Button */}
        <Button
          size="lg"
          className="w-full h-14 rounded-2xl text-base shadow-lg"
          onClick={handleSubscribe}
          disabled={isProcessing}
        >
          <Crown className="w-5 h-5 mr-2" />
          {isProcessing ? "处理中..." : "立即开通"}
        </Button>

        {/* Terms */}
        <p className="text-xs text-center text-muted-foreground text-pretty px-4">
          订阅即表示同意
          <Link href="#" className="text-primary hover:underline">
            《会员服务协议》
          </Link>
          和
          <Link href="#" className="text-primary hover:underline">
            《自动续费协议》
          </Link>
        </p>
      </main>
    </div>
  )
}



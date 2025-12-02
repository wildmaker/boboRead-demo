"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  ArrowLeft,
  Shield,
  HelpCircle,
  Trash2,
  LogOut,
  ChevronRight,
  CalendarIcon,
  Baby,
  MessageCircle,
  ShoppingCart,
} from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"
import { zhCN } from "date-fns/locale"
import { cn } from "@/lib/utils"

export default function SettingsPage() {
  const [showBabyInfo, setShowBabyInfo] = useState(false)
  const [name, setName] = useState("小明")
  const [birthDate, setBirthDate] = useState<Date>(new Date("2020-03-15"))
  const [gender, setGender] = useState("boy")
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)

  const handleSave = () => {
    // Save baby info
    alert("信息已保存")
    setShowBabyInfo(false)
  }

  const handleLogout = () => {
    // Logout logic
    window.location.href = "/"
  }

  const handleContactService = () => {
    alert("正在跳转到微信客服...")
    // In production: window.location.href = 'weixin://...'
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b px-4 py-4 flex items-center gap-4 sticky top-0 z-10">
        <Link href="/profile">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold">设置</h1>
      </header>

      {/* Main Content */}
      <main className="px-6 py-6 space-y-6">
        {/* Account Section */}
        <section className="space-y-3">
          <h2 className="text-sm font-medium text-muted-foreground px-1">账号与安全</h2>
          <Card className="divide-y">
            <button
              onClick={() => setShowBabyInfo(true)}
              className="w-full p-4 flex items-center justify-between hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Baby className="w-5 h-5 text-primary" />
                <span className="font-medium">宝宝信息</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{name}</span>
                <ChevronRight className="w-5 h-5" />
              </div>
            </button>

            <Link
              href="/privacy"
              className="flex items-center justify-between p-4 hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-secondary" />
                <span className="font-medium">隐私协议</span>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </Link>
          </Card>
        </section>

        {/* General Section */}
        <section className="space-y-3">
          <h2 className="text-sm font-medium text-muted-foreground px-1">通用</h2>
          <Card className="divide-y">
            <button className="w-full p-4 flex items-center justify-between hover:bg-accent/50 transition-colors">
              <div className="flex items-center gap-3">
                <Trash2 className="w-5 h-5 text-muted-foreground" />
                <span className="font-medium">清除缓存</span>
              </div>
              <div className="text-sm text-muted-foreground">23.5 MB</div>
            </button>
          </Card>
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-medium text-muted-foreground px-1">硬件设备</h2>
          <Card className="divide-y">
            <button
              onClick={handleContactService}
              className="w-full p-4 flex items-center justify-between hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <ShoppingCart className="w-5 h-5 text-amber-600" />
                <div className="text-left">
                  <div className="font-medium">购买阅读支架</div>
                  <div className="text-xs text-muted-foreground">联系客服购买配套硬件设备</div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>

            <button
              onClick={handleContactService}
              className="w-full p-4 flex items-center justify-between hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <MessageCircle className="w-5 h-5 text-green-600" />
                <div className="text-left">
                  <div className="font-medium">联系客服</div>
                  <div className="text-xs text-muted-foreground">咨询产品或售后服务</div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          </Card>
        </section>

        {/* Help Section */}
        <section className="space-y-3">
          <h2 className="text-sm font-medium text-muted-foreground px-1">帮助与反馈</h2>
          <Card className="divide-y">
            <Link
              href="/tutorial"
              className="flex items-center justify-between p-4 hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">📖</span>
                <span className="font-medium">使用说明</span>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </Link>

            <Link href="/help" className="flex items-center justify-between p-4 hover:bg-accent/50 transition-colors">
              <div className="flex items-center gap-3">
                <HelpCircle className="w-5 h-5 text-accent" />
                <span className="font-medium">帮助中心</span>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </Link>

            <Link
              href="/feedback"
              className="flex items-center justify-between p-4 hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">💬</span>
                <span className="font-medium">意见反馈</span>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </Link>

            <Link href="/about" className="flex items-center justify-between p-4 hover:bg-accent/50 transition-colors">
              <div className="flex items-center gap-3">
                <span className="text-xl">ℹ️</span>
                <span className="font-medium">关于我们</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>v1.0.0</span>
                <ChevronRight className="w-5 h-5" />
              </div>
            </Link>
          </Card>
        </section>

        {/* Logout Button */}
        <Button variant="destructive" size="lg" className="w-full rounded-xl" onClick={() => setShowLogoutDialog(true)}>
          <LogOut className="w-5 h-5 mr-2" />
          退出登录
        </Button>
      </main>

      {/* Baby Info Dialog */}
      <Dialog open={showBabyInfo} onOpenChange={setShowBabyInfo}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>宝宝信息</DialogTitle>
            <DialogDescription>修改宝宝的个人信息</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {/* Baby Name */}
            <div className="space-y-2">
              <Label htmlFor="edit-name">宝宝姓名/昵称</Label>
              <Input
                id="edit-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-11 rounded-xl"
              />
            </div>

            {/* Birth Date */}
            <div className="space-y-2">
              <Label>出生年月</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full h-11 rounded-xl justify-start text-left font-normal")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {birthDate ? format(birthDate, "yyyy年MM月dd日", { locale: zhCN }) : "选择日期"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={birthDate}
                    onSelect={(date) => date && setBirthDate(date)}
                    disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <Label>性别</Label>
              <RadioGroup value={gender} onValueChange={setGender}>
                <div className="grid grid-cols-2 gap-3">
                  <Label
                    htmlFor="edit-boy"
                    className={cn(
                      "flex items-center justify-center h-11 rounded-xl border-2 cursor-pointer transition-all",
                      gender === "boy"
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:border-primary/50",
                    )}
                  >
                    <RadioGroupItem value="boy" id="edit-boy" className="sr-only" />
                    <span className="font-medium">男孩</span>
                  </Label>
                  <Label
                    htmlFor="edit-girl"
                    className={cn(
                      "flex items-center justify-center h-11 rounded-xl border-2 cursor-pointer transition-all",
                      gender === "girl"
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:border-primary/50",
                    )}
                  >
                    <RadioGroupItem value="girl" id="edit-girl" className="sr-only" />
                    <span className="font-medium">女孩</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBabyInfo(false)} className="rounded-xl">
              取消
            </Button>
            <Button onClick={handleSave} className="rounded-xl">
              保存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Logout Confirmation Dialog */}
      <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>确认退出</DialogTitle>
            <DialogDescription>退出登录后需要重新登录才能使用 APP</DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setShowLogoutDialog(false)} className="rounded-xl">
              取消
            </Button>
            <Button variant="destructive" onClick={handleLogout} className="rounded-xl">
              退出登录
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}



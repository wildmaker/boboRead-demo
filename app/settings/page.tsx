"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
  Crown,
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

  // Custom Card Component for Settings
  const SettingsCard = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={cn(
      "bg-white rounded-[24px] overflow-hidden shadow-[0_2px_8px_rgba(93,64,55,0.1)] border-2 border-[#8D6E63]/10",
      className
    )}>
      {children}
    </div>
  )

  // Custom Row Item
  const SettingsItem = ({ 
    icon: Icon, 
    iconColor = "text-[#FF8F00]", 
    iconBg = "bg-[#FFF8E1]",
    title, 
    subtitle, 
    value, 
    onClick, 
    href,
    isDestructive = false
  }: any) => {
    const content = (
      <div className="w-full p-4 flex items-center justify-between hover:bg-[#FFF8E1]/50 transition-colors cursor-pointer group">
        <div className="flex items-center gap-4">
          <div className={cn("w-10 h-10 rounded-full flex items-center justify-center transition-transform group-hover:scale-110", iconBg)}>
            <Icon className={cn("w-5 h-5", iconColor)} />
          </div>
          <div className="text-left">
            <div className={cn("font-bold text-[#5D4037]", isDestructive && "text-red-500")}>{title}</div>
            {subtitle && <div className="text-xs text-[#8D6E63]/80 mt-0.5">{subtitle}</div>}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {value && <span className="text-sm text-[#8D6E63] font-medium">{value}</span>}
          <ChevronRight className="w-5 h-5 text-[#8D6E63]/40 group-hover:text-[#FF8F00] transition-colors" />
        </div>
      </div>
    )

    if (href) return <Link href={href} className="block">{content}</Link>
    return <button onClick={onClick} className="w-full block">{content}</button>
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFCF8] bg-[radial-gradient(#8D6E63_0.5px,transparent_0.5px)] [background-size:20px_20px] pb-10">
      {/* Header */}
      <header className="sticky top-0 z-10 px-6 py-4 flex items-center gap-4 bg-[#FDFCF8]/90 backdrop-blur-md">
        <Link href="/">
          <Button variant="ghost" size="icon" className="rounded-full w-10 h-10 bg-white shadow-sm border border-[#8D6E63]/10 hover:bg-[#FFF8E1] hover:text-[#FF8F00]">
            <ArrowLeft className="w-5 h-5 text-[#5D4037]" />
          </Button>
        </Link>
        <h1 className="text-2xl font-black text-[#5D4037] font-fredoka">设置</h1>
      </header>

      {/* Main Content */}
      <main className="px-6 py-4 flex-1 flex flex-col gap-6">
        <div className="space-y-6">
          {/* Profile Card */}
          <Link href="/profile">
            <SettingsCard className="p-5 flex items-center gap-5 relative overflow-hidden group cursor-pointer hover:shadow-md transition-shadow">
              {/* Avatar Area */}
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-[#FFF8E1] border-2 border-[#FFD700] flex items-center justify-center shadow-sm overflow-hidden">
                  <img src="/placeholder-user.jpg" alt="Avatar" className="w-full h-full object-cover" />
                </div>
                {/* VIP Badge Overlay */}
                <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-[#FFD700] to-[#FF8F00] text-white text-[10px] px-2 py-0.5 rounded-full flex items-center gap-0.5 border-2 border-white shadow-sm">
                  <Crown className="w-3 h-3 fill-current" />
                  <span className="font-bold font-fredoka">PRO</span>
                </div>
              </div>

              {/* Text Info */}
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-black text-[#5D4037] font-fredoka">{name}</h2>
                </div>
                <div className="text-xs text-[#8D6E63] font-medium flex items-center gap-2">
                  <span className="bg-[#8D6E63]/5 px-2 py-0.5 rounded-md">书龄 128 天</span>
                  <span className="text-[#8D6E63]/40">|</span>
                  <span className="text-[#8D6E63]">已读 32 本书</span>
                </div>
              </div>

              <ChevronRight className="w-5 h-5 text-[#8D6E63]/30 group-hover:text-[#FF8F00] transition-colors relative z-0" />
            </SettingsCard>
          </Link>

          {/* Account Section */}
          <section className="space-y-3">
            <h2 className="text-lg font-black text-[#8D6E63] px-2 font-fredoka flex items-center gap-2">
              <span className="w-1.5 h-4 rounded-full bg-[#FF8F00]" />
              账号与安全
            </h2>
            <SettingsCard>
              <SettingsItem 
                icon={Baby} 
                title="宝宝信息" 
                value={name}
                onClick={() => setShowBabyInfo(true)} 
              />
              <div className="h-px bg-[#8D6E63]/5 mx-4" />
              <SettingsItem 
                icon={Shield} 
                iconColor="text-[#4DD0E1]"
                iconBg="bg-[#E0F7FA]"
                title="隐私协议" 
                href="/privacy" 
              />
            </SettingsCard>
          </section>

          {/* General Section */}
          <section className="space-y-3">
            <h2 className="text-lg font-black text-[#8D6E63] px-2 font-fredoka flex items-center gap-2">
              <span className="w-1.5 h-4 rounded-full bg-[#4DD0E1]" />
              通用
            </h2>
            <SettingsCard>
              <SettingsItem 
                icon={Trash2} 
                iconColor="text-[#8D6E63]"
                iconBg="bg-[#EFEBE9]"
                title="清除缓存" 
                value="23.5 MB"
                onClick={() => {}} 
              />
            </SettingsCard>
          </section>

          {/* Hardware Section */}
          <section className="space-y-3">
            <h2 className="text-lg font-black text-[#8D6E63] px-2 font-fredoka flex items-center gap-2">
              <span className="w-1.5 h-4 rounded-full bg-[#FFCA28]" />
              其他
            </h2>
            <SettingsCard>
              <SettingsItem 
                icon={ShoppingCart} 
                iconColor="text-[#FF9800]"
                iconBg="bg-[#FFF3E0]"
                title="购买阅读支架" 
                subtitle="联系客服购买配套硬件设备"
                onClick={handleContactService} 
              />
               <div className="h-px bg-[#8D6E63]/5 mx-4" />
              <SettingsItem 
                icon={MessageCircle} 
                iconColor="text-[#66BB6A]"
                iconBg="bg-[#E8F5E9]"
                title="联系客服" 
                subtitle="咨询产品或售后服务"
                onClick={handleContactService} 
              />
            </SettingsCard>
          </section>

          {/* Help Section */}
          <section className="space-y-3">
            <h2 className="text-lg font-black text-[#8D6E63] px-2 font-fredoka flex items-center gap-2">
              <span className="w-1.5 h-4 rounded-full bg-[#F48FB1]" />
              帮助与反馈
            </h2>
            <SettingsCard>
              <SettingsItem 
                icon={({className}: any) => <span className={className}>📖</span>}
                iconColor="text-xl"
                iconBg="bg-transparent"
                title="使用说明" 
                href="/tutorial" 
              />
               <div className="h-px bg-[#8D6E63]/5 mx-4" />
              <SettingsItem 
                 icon={HelpCircle} 
                 iconColor="text-[#AB47BC]"
                 iconBg="bg-[#F3E5F5]"
                title="帮助中心" 
                href="/help" 
              />
               <div className="h-px bg-[#8D6E63]/5 mx-4" />
              <SettingsItem 
                icon={({className}: any) => <span className={className}>💬</span>}
                 iconColor="text-xl"
                 iconBg="bg-transparent"
                title="意见反馈" 
                href="/feedback" 
              />
               <div className="h-px bg-[#8D6E63]/5 mx-4" />
              <SettingsItem 
                icon={({className}: any) => <span className={className}>ℹ️</span>}
                 iconColor="text-xl"
                 iconBg="bg-transparent"
                title="关于我们" 
                value="v1.0.0"
                href="/about" 
              />
            </SettingsCard>
          </section>
        </div>

        {/* Logout Button */}
        <button
            onClick={() => setShowLogoutDialog(true)}
            className="w-full mt-auto bg-[#FFEBEE] text-[#D32F2F] font-bold font-fredoka py-4 rounded-[20px] 
            border-2 border-[#FFCDD2] shadow-[0_4px_0_#FFCDD2] active:translate-y-1 active:shadow-none transition-all
            flex items-center justify-center gap-2"
        >
          <LogOut className="w-5 h-5" />
          退出登录
        </button>
      </main>

      {/* Baby Info Dialog */}
      <Dialog open={showBabyInfo} onOpenChange={setShowBabyInfo}>
        <DialogContent className="sm:max-w-md bg-[#FFFDF8] border-none rounded-[24px] shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-black text-[#5D4037] font-fredoka text-center">宝宝信息</DialogTitle>
            <DialogDescription className="text-[#8D6E63] text-center">修改宝宝的个人信息</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {/* Baby Name */}
            <div className="space-y-2">
              <Label htmlFor="edit-name" className="text-[#5D4037] font-bold">宝宝姓名/昵称</Label>
              <Input
                id="edit-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-12 rounded-xl border-2 border-[#8D6E63]/20 bg-white focus-visible:ring-[#FF8F00] text-[#5D4037]"
              />
            </div>

            {/* Birth Date */}
            <div className="space-y-2">
              <Label className="text-[#5D4037] font-bold">出生年月</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                        "w-full h-12 rounded-xl justify-start text-left font-normal border-2 border-[#8D6E63]/20 text-[#5D4037] hover:bg-[#8D6E63]/5 hover:text-[#5D4037]",
                        !birthDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 text-[#FF8F00]" />
                    {birthDate ? format(birthDate, "yyyy年MM月dd日", { locale: zhCN }) : "选择日期"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-[#FFFDF8] border-2 border-[#8D6E63]/10 shadow-xl rounded-xl" align="start">
                  <Calendar
                    mode="single"
                    selected={birthDate}
                    onSelect={(date) => date && setBirthDate(date)}
                    disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                    initialFocus
                    className="p-3 bg-white rounded-xl"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <Label className="text-[#5D4037] font-bold">性别</Label>
              <RadioGroup value={gender} onValueChange={setGender}>
                <div className="grid grid-cols-2 gap-3">
                  <Label
                    htmlFor="edit-boy"
                    className={cn(
                      "flex items-center justify-center h-12 rounded-xl border-2 cursor-pointer transition-all",
                      gender === "boy"
                        ? "border-[#4DD0E1] bg-[#4DD0E1]/10 text-[#0097A7] font-bold shadow-sm"
                        : "border-[#8D6E63]/20 hover:border-[#4DD0E1]/50 bg-white text-[#8D6E63]",
                    )}
                  >
                    <RadioGroupItem value="boy" id="edit-boy" className="sr-only" />
                    <span className="font-medium">男孩 👦</span>
                  </Label>
                  <Label
                    htmlFor="edit-girl"
                    className={cn(
                      "flex items-center justify-center h-12 rounded-xl border-2 cursor-pointer transition-all",
                      gender === "girl"
                        ? "border-[#F48FB1] bg-[#F48FB1]/10 text-[#C2185B] font-bold shadow-sm"
                        : "border-[#8D6E63]/20 hover:border-[#F48FB1]/50 bg-white text-[#8D6E63]",
                    )}
                  >
                    <RadioGroupItem value="girl" id="edit-girl" className="sr-only" />
                    <span className="font-medium">女孩 👧</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBabyInfo(false)} 
                className="rounded-xl border-2 border-[#8D6E63]/20 text-[#8D6E63] hover:bg-[#8D6E63]/10 hover:text-[#5D4037] h-11 w-full sm:w-auto">
              取消
            </Button>
            <Button onClick={handleSave} 
                className="rounded-xl bg-[#FF8F00] hover:bg-[#FFA000] text-white font-bold h-11 shadow-[0_4px_0_#E65100] w-full sm:w-auto active:shadow-none active:translate-y-1 transition-all">
              保存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Logout Confirmation Dialog */}
      <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <DialogContent className="sm:max-w-md bg-[#FFFDF8] border-none rounded-[24px] shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-black text-[#5D4037] font-fredoka text-center">确认退出？</DialogTitle>
            <DialogDescription className="text-[#8D6E63] text-center">退出登录后需要重新登录才能使用 APP 哦</DialogDescription>
          </DialogHeader>
          <div className="flex w-full gap-3 mt-4">
            <Button variant="outline" onClick={() => setShowLogoutDialog(false)} 
                className="flex-1 rounded-xl border-2 border-[#8D6E63]/20 text-[#8D6E63] hover:bg-[#8D6E63]/10 hover:text-[#5D4037] h-12 text-base font-bold">
              取消
            </Button>
            <Button variant="destructive" onClick={handleLogout} 
                className="flex-1 rounded-xl bg-[#FF5252] hover:bg-[#FF1744] text-white font-bold h-12 text-base shadow-[0_4px_0_#D32F2F] active:shadow-none active:translate-y-1 transition-all">
              退出
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
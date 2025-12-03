"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Baby, CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { zhCN } from "date-fns/locale"
import { cn } from "@/lib/utils"

export default function BabySetupPage() {
  const [name, setName] = useState("")
  const [birthDate, setBirthDate] = useState<Date>()
  const [gender, setGender] = useState("")

  const handleComplete = () => {
    window.location.href = "/tutorial"
  }

  const isFormValid = name && birthDate && gender

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-3xl flex items-center justify-center shadow-lg">
              <Baby className="w-10 h-10 text-primary-foreground" />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-balance">为宝宝开启阅读之旅</h1>
            <p className="text-muted-foreground text-pretty">填写宝宝信息，获得精准的个性化推荐</p>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-6 bg-card p-8 rounded-3xl shadow-sm border">
          {/* Baby Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-base">
              宝宝姓名/昵称 <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="请输入宝宝的姓名或昵称"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-12 rounded-xl text-base"
            />
          </div>

          {/* Birth Date */}
          <div className="space-y-2">
            <Label className="text-base">
              出生年月 <span className="text-destructive">*</span>
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full h-12 rounded-xl justify-start text-left font-normal",
                    !birthDate && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {birthDate ? (
                    format(birthDate, "yyyy年MM月dd日", { locale: zhCN })
                  ) : (
                    <span>选择宝宝的出生日期</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={birthDate}
                  onSelect={setBirthDate}
                  disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <p className="text-xs text-muted-foreground">用于推荐适合宝宝年龄的书籍</p>
          </div>

          {/* Gender */}
          <div className="space-y-3">
            <Label className="text-base">
              性别 <span className="text-destructive">*</span>
            </Label>
            <RadioGroup value={gender} onValueChange={setGender}>
              <div className="grid grid-cols-2 gap-3">
                <Label
                  htmlFor="boy"
                  className={cn(
                    "flex items-center justify-center h-12 rounded-xl border-2 cursor-pointer transition-all",
                    gender === "boy" ? "border-primary bg-primary/10 text-primary" : "border-border hover:border-primary/50",
                  )}
                >
                  <RadioGroupItem value="boy" id="boy" className="sr-only" />
                  <span className="font-medium">男孩</span>
                </Label>
                <Label
                  htmlFor="girl"
                  className={cn(
                    "flex items-center justify-center h-12 rounded-xl border-2 cursor-pointer transition-all",
                    gender === "girl"
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:border-primary/50",
                  )}
                >
                  <RadioGroupItem value="girl" id="girl" className="sr-only" />
                  <span className="font-medium">女孩</span>
                </Label>
              </div>
            </RadioGroup>
            <p className="text-xs text-muted-foreground">用于个性化推荐更适合的内容</p>
          </div>

          {/* Submit Button */}
          <Button size="lg" className="w-full h-12 rounded-xl mt-4" onClick={handleComplete} disabled={!isFormValid}>
            开始阅读
          </Button>
        </div>

        {/* Privacy Note */}
        <p className="text-xs text-center text-muted-foreground text-pretty px-4">
          我们会安全保存这些信息，您可以随时在设置中修改
        </p>
      </div>
    </div>
  )
}



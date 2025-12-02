"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Shield } from "lucide-react"

export default function PrivacyAgreementPage() {
  const [agreed, setAgreed] = useState(false)

  const handleContinue = () => {
    if (agreed) {
      window.location.href = "/home"
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-card rounded-3xl shadow-xl border overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="bg-primary/10 p-6 text-center space-y-3">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center">
              <Shield className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-balance">儿童隐私保护指引</h2>
          <p className="text-sm text-muted-foreground text-pretty">我们重视儿童的个人信息保护</p>
        </div>

        {/* Content */}
        <ScrollArea className="h-[400px] px-6 py-4">
          <div className="space-y-4 text-sm leading-relaxed">
            <section className="space-y-2">
              <h3 className="font-semibold text-base">一、引言</h3>
              <p className="text-muted-foreground">
                我们非常重视儿童的个人信息保护。本指引适用于14周岁以下的儿童用户，旨在向监护人说明我们如何收集、使用、存储和保护儿童的个人信息。
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-semibold text-base">二、收集的信息</h3>
              <p className="text-muted-foreground">我们会收集以下信息以提供更好的个性化服务：</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-2">
                <li>宝宝的昵称/姓名</li>
                <li>出生年月（用于适龄推荐）</li>
                <li>性别（用于个性化内容）</li>
                <li>阅读记录和偏好</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h3 className="font-semibold text-base">三、信息使用</h3>
              <p className="text-muted-foreground">我们使用收集的信息用于：</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-2">
                <li>提供适龄的图书推荐</li>
                <li>记录阅读进度和成长轨迹</li>
                <li>优化产品体验和服务质量</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h3 className="font-semibold text-base">四、信息保护</h3>
              <p className="text-muted-foreground">
                我们采用业界标准的安全措施保护儿童信息，不会向第三方出售或共享儿童的个人信息。监护人有权随时查询、更正或删除儿童的个人信息。
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-semibold text-base">五、监护人权利</h3>
              <p className="text-muted-foreground">作为监护人，您有权：</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-2">
                <li>访问、更正或删除儿童的个人信息</li>
                <li>拒绝进一步收集儿童的个人信息</li>
                <li>撤回对个人信息处理的同意</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h3 className="font-semibold text-base">六、联系我们</h3>
              <p className="text-muted-foreground">
                如有任何疑问或需要行使上述权利，请通过应用内"帮助与反馈"联系我们。
              </p>
            </section>
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="p-6 border-t space-y-4">
          <div className="flex items-start gap-3">
            <Checkbox
              id="agree"
              checked={agreed}
              onCheckedChange={(checked) => setAgreed(checked as boolean)}
              className="mt-1"
            />
            <label htmlFor="agree" className="text-sm leading-relaxed cursor-pointer text-pretty">
              我已仔细阅读并同意《儿童隐私保护指引》，同意按照上述规则收集和使用儿童的个人信息
            </label>
          </div>

          <Button size="lg" className="w-full h-12 rounded-xl" onClick={handleContinue} disabled={!agreed}>
            同意并继续
          </Button>
        </div>
      </div>
    </div>
  )
}

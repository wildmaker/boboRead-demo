"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Crown, Sparkles, Volume2, X } from "lucide-react"
import { useRouter } from "next/navigation"

interface PaywallDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  source?: "book-detail" | "voice-selection"
}

export function PaywallDialog({ open, onOpenChange, source = "book-detail" }: PaywallDialogProps) {
  const router = useRouter()

  const handleUpgrade = () => {
    router.push("/vip")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>

        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
              <Crown className="w-10 h-10 text-primary-foreground" />
            </div>
          </div>
          <DialogTitle className="text-center text-2xl">开通会员解锁更多</DialogTitle>
          <DialogDescription className="text-center">
            {source === "voice-selection" ? "Pro 音色需要会员权限" : "解锁精品内容和 AI 智能朗读"}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-3">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-primary/5">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-medium">解锁所有精品资源</p>
              <p className="text-xs text-muted-foreground">海量优质绘本随心读</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/5">
            <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
              <Volume2 className="w-5 h-5 text-secondary" />
            </div>
            <div className="flex-1">
              <p className="font-medium">AI 实时合成朗读</p>
              <p className="text-xs text-muted-foreground">任何绘本都能智能朗读</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-accent/5">
            <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
              <Crown className="w-5 h-5 text-accent-foreground" />
            </div>
            <div className="flex-1">
              <p className="font-medium">Pro 音色全解锁</p>
              <p className="text-xs text-muted-foreground">更多高品质声音选择</p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button size="lg" className="w-full h-12 rounded-xl" onClick={handleUpgrade}>
            <Crown className="w-5 h-5 mr-2" />
            升级会员
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

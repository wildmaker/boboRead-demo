"use client"

import { useState } from "react"
import { HomeScreen } from "@/components/home-screen"
import { CameraScreen } from "@/components/camera-screen"

export default function Page() {
  const [activeScreen, setActiveScreen] = useState<"home" | "camera">("home")

  return (
    <div className="h-screen w-full overflow-hidden">
      <HomeScreen isActive={activeScreen === "home"} onStartReading={() => setActiveScreen("camera")} />
      <CameraScreen isActive={activeScreen === "camera"} onBack={() => setActiveScreen("home")} />
    </div>
  )
}

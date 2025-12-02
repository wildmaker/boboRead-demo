"use client"

import { useState } from "react"
import { HomeScreen } from "@/components/home-screen"
import { CameraScreen } from "@/components/camera-screen"

export default function Page() {
  const [activeScreen, setActiveScreen] = useState<"home" | "camera">("home")
  const [bookCount, setBookCount] = useState<1 | 7>(1)

  return (
    <div className="h-screen w-full overflow-hidden">
      <HomeScreen
        isActive={activeScreen === "home"}
        onStartReading={() => setActiveScreen("camera")}
        bookCount={bookCount}
      />
      <CameraScreen
        isActive={activeScreen === "camera"}
        onBack={() => setActiveScreen("home")}
        onRead={() => setBookCount(7)}
      />
    </div>
  )
}

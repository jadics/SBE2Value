"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Recycle, Globe2, Factory } from "lucide-react"
import Link from "next/link"

export default function LoginSelectionPage() {
  const [lang, setLang] = useState<"ar" | "en">(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("sbe2value-lang") as "ar" | "en") || "ar"
    }
    return "ar"
  })
  const isArabic = lang === "ar"

  const content = {
    ar: {
      title: "اختر نوع الحساب",
      factoryTitle: "دخول المصانع",
      factoryDesc: "للمصانع المنتجة لمسحوق SBE المستهلك",
      processorTitle: "دخول شركات المعالجة",
      processorDesc: "للشركات المتخصصة في معالجة وإعادة استخدام SBE",
    },
    en: {
      title: "Choose Account Type",
      factoryTitle: "Factory Login",
      factoryDesc: "For factories producing spent SBE powder",
      processorTitle: "Processor Login",
      processorDesc: "For companies specialized in processing and reusing SBE",
    },
  }

  const t = content[lang]

  useEffect(() => {
    const handleLanguageChange = (e: CustomEvent) => {
      setLang(e.detail.lang)
    }
    window.addEventListener("languageChange", handleLanguageChange as EventListener)
    return () => window.removeEventListener("languageChange", handleLanguageChange as EventListener)
  }, [])

  const handleLanguageToggle = () => {
    const newLang = lang === "ar" ? "en" : "ar"
    setLang(newLang)
    localStorage.setItem("sbe2value-lang", newLang)
    window.dispatchEvent(new CustomEvent("languageChange", { detail: { lang: newLang } }))
  }

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50/30 to-blue-50/30 ${isArabic ? "rtl" : "ltr"}`}
      dir={isArabic ? "rtl" : "ltr"}
    >
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-[#1FC1DF] rounded-full blur-3xl opacity-10 animate-pulse" />
        <div
          className="absolute bottom-20 right-20 w-96 h-96 bg-[#2896DD] rounded-full blur-3xl opacity-10 animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#1FC1DF] rounded-full blur-3xl opacity-5 animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Language Toggle */}
      <div className="absolute top-6 right-6 z-10">
        <Button variant="ghost" size="sm" onClick={handleLanguageToggle} className="gap-2 bg-white/80 backdrop-blur-sm">
          <Globe2 className="w-4 h-4" />
          {lang === "ar" ? "EN" : "ع"}
        </Button>
      </div>

      {/* Main Content */}
      <div className="relative min-h-screen flex items-center justify-center px-4 py-12">
        <div className="max-w-5xl w-full space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center">
                <img src="/logo.png" alt="SBE2Value Logo" className="w-14 h-14 object-contain" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[#1FC1DF] to-[#2896DD] bg-clip-text text-transparent">
                SBE2Value
              </h1>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">{t.title}</h2>
          </div>

          {/* Selection Cards */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Factory Card */}
            <Link href="/factory/signin">
              <Card className="p-8 hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer border-2 hover:border-[#1FC1DF] bg-white/80 backdrop-blur-sm h-full">
                <div className="space-y-6 text-center">
                  <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-[#1FC1DF] to-[#2896DD] flex items-center justify-center shadow-lg">
                    <Factory className="w-10 h-10 text-white" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-slate-900">{t.factoryTitle}</h3>
                    <p className="text-slate-600 leading-relaxed">{t.factoryDesc}</p>
                  </div>
                  <Button size="lg" className="w-full bg-gradient-to-r from-[#1FC1DF] to-[#2896DD] text-white">
                    {isArabic ? "دخول" : "Login"}
                  </Button>
                </div>
              </Card>
            </Link>

            {/* Processor Card */}
            <Link href="/processor/signin">
              <Card className="p-8 hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer border-2 hover:border-[#1FC1DF] bg-white/80 backdrop-blur-sm h-full">
                <div className="space-y-6 text-center">
                  <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-[#1FC1DF] to-[#2896DD] flex items-center justify-center shadow-lg">
                    <Recycle className="w-10 h-10 text-white" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-slate-900">{t.processorTitle}</h3>
                    <p className="text-slate-600 leading-relaxed">{t.processorDesc}</p>
                  </div>
                  <Button size="lg" className="w-full bg-gradient-to-r from-[#1FC1DF] to-[#2896DD] text-white">
                    {isArabic ? "دخول" : "Login"}
                  </Button>
                </div>
              </Card>
            </Link>
          </div>

          {/* Back to Home */}
          <div className="text-center">
            <Link href="/">
              <Button variant="ghost" className="text-slate-600 hover:text-[#1FC1DF]">
                {isArabic ? "← العودة للصفحة الرئيسية" : "← Back to Home"}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

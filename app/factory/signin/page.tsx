"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Factory, Globe, ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function FactorySignIn() {
  const [lang, setLang] = useState<"ar" | "en">(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("sbe2value-lang") as "ar" | "en") || "ar"
    }
    return "ar"
  })
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [factoryName, setFactoryName] = useState("")
  const router = useRouter()
  const isArabic = lang === "ar"

  const content = {
    ar: {
      title: "SBE2Value",
      signInTitle: "تسجيل الدخول - المصانع المنتجة",
      signUpTitle: "إنشاء حساب - المصانع المنتجة",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      confirmPassword: "تأكيد كلمة المرور",
      factoryName: "اسم المصنع",
      signInBtn: "تسجيل الدخول",
      signUpBtn: "إنشاء حساب",
      noAccount: "ليس لديك حساب؟",
      hasAccount: "لديك حساب بالفعل؟",
      signUpLink: "سجل الآن",
      signInLink: "سجل الدخول",
      backToHome: "العودة للرئيسية",
      useDemoData: "استخدام بيانات تجريبية",
    },
    en: {
      title: "SBE2Value",
      signInTitle: "Sign In - Producing Factories",
      signUpTitle: "Create Account - Producing Factories",
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm Password",
      factoryName: "Factory Name",
      signInBtn: "Sign In",
      signUpBtn: "Create Account",
      noAccount: "Don't have an account?",
      hasAccount: "Already have an account?",
      signUpLink: "Sign up now",
      signInLink: "Sign in",
      backToHome: "Back to Home",
      useDemoData: "Use Demo Data",
    },
  }

  const t = content[lang]

  const fillDemoData = () => {
    if (isSignUp) {
      setFactoryName("مصنع زيت عافية")
      setEmail("factory@example.com")
      setPassword("demo123")
      setConfirmPassword("demo123")
    } else {
      setEmail("factory@example.com")
      setPassword("demo123")
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate authentication - in production, this would call an API
    if (isSignUp) {
      if (password === confirmPassword && factoryName && email) {
        // Simulate successful registration
        router.push("/factory/input")
      }
    } else {
      if (email && password) {
        // Simulate successful login
        router.push("/factory/input")
      }
    }
  }

  useEffect(() => {
    const handleLanguageChange = (e: CustomEvent) => {
      setLang(e.detail.lang)
    }
    window.addEventListener("languageChange", handleLanguageChange as EventListener)
    return () => window.removeEventListener("languageChange", handleLanguageChange as EventListener)
  }, [])

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 ${isArabic ? "rtl" : "ltr"}`}
      dir={isArabic ? "rtl" : "ltr"}
    >
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="SBE2Value Logo" className="w-10 h-10 object-contain" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-[#1FC1DF] to-[#2896DD] bg-clip-text text-transparent">
              {t.title}
            </h1>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="sm">
                {t.backToHome}
              </Button>
            </Link>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const newLang = lang === "ar" ? "en" : "ar"
                setLang(newLang)
                localStorage.setItem("sbe2value-lang", newLang)
                window.dispatchEvent(new CustomEvent("languageChange", { detail: { lang: newLang } }))
              }}
              className="gap-2"
            >
              <Globe className="w-4 h-4" />
              {lang === "ar" ? "English" : "العربية"}
            </Button>
          </div>
        </div>
      </header>

      {/* Sign In Form */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <Card className="p-8 shadow-xl border-2">
            <div className="space-y-6">
              {/* Icon and Title */}
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1FC1DF]/10 to-[#1FC1DF]/5 flex items-center justify-center mx-auto">
                  <Factory className="w-8 h-8 text-[#1FC1DF]" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">{isSignUp ? t.signUpTitle : t.signInTitle}</h2>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {isSignUp && (
                  <div className="space-y-2">
                    <Label htmlFor="factoryName">{t.factoryName}</Label>
                    <Input
                      id="factoryName"
                      type="text"
                      value={factoryName}
                      onChange={(e) => setFactoryName(e.target.value)}
                      required
                      className="text-right"
                      dir={isArabic ? "rtl" : "ltr"}
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">{t.email}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="text-right"
                    dir="ltr"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">{t.password}</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    dir="ltr"
                  />
                </div>

                {isSignUp && (
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">{t.confirmPassword}</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      dir="ltr"
                    />
                  </div>
                )}

                <Button
                  type="button"
                  variant="outline"
                  className="w-full gap-2 border-dashed bg-transparent"
                  onClick={fillDemoData}
                >
                  <Sparkles className="w-4 h-4" />
                  {t.useDemoData}
                </Button>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#1FC1DF] to-[#2896DD] hover:opacity-90 text-white gap-2"
                >
                  {isSignUp ? t.signUpBtn : t.signInBtn}
                  <ArrowRight className={`w-4 h-4 ${isArabic ? "rotate-180" : ""}`} />
                </Button>
              </form>

              {/* Toggle Sign In/Sign Up */}
              <div className="text-center text-sm text-slate-600">
                {isSignUp ? t.hasAccount : t.noAccount}{" "}
                <button
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-[#1FC1DF] hover:text-[#2896DD] font-semibold"
                >
                  {isSignUp ? t.signInLink : t.signUpLink}
                </button>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}

"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle2, ArrowRight, BarChart3, Package } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function PublishSuccessPage() {
  const router = useRouter()
  const [lang, setLang] = useState<"ar" | "en">(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("sbe2value-lang") as "ar" | "en") || "ar"
    }
    return "ar"
  })
  const [batchData, setBatchData] = useState<any>(null)
  const isArabic = lang === "ar"

  useEffect(() => {
    const data = sessionStorage.getItem("publishedBatch")
    if (data) {
      setBatchData(JSON.parse(data))
    } else {
      router.push("/factory/input")
    }
  }, [router])

  useEffect(() => {
    const handleLanguageChange = (e: CustomEvent) => {
      setLang(e.detail.lang)
    }
    window.addEventListener("languageChange", handleLanguageChange as EventListener)
    return () => window.removeEventListener("languageChange", handleLanguageChange as EventListener)
  }, [])

  const content = {
    ar: {
      title: "تم نشر الدفعة بنجاح!",
      subtitle: "دفعتك الآن متاحة في السوق للشركات المعالجة",
      batchId: "معرف الدفعة",
      factory: "المصنع",
      quantity: "الكمية",
      tons: "طن",
      status: "الحالة",
      published: "منشورة في السوق",
      nextSteps: "ماذا بعد؟",
      step1: "ستتمكن شركات المعالجة من رؤية دفعتك",
      step2: "يمكنك متابعة عدد المشاهدات والاهتمام",
      step3: "سيتم إشعارك عند وجود عروض شراء",
      viewMarketplace: "عرض السوق",
      viewDashboard: "لوحة التحكم",
      publishAnother: "نشر دفعة أخرى",
    },
    en: {
      title: "Batch Published Successfully!",
      subtitle: "Your batch is now available in the marketplace for processing companies",
      batchId: "Batch ID",
      factory: "Factory",
      quantity: "Quantity",
      tons: "tons",
      status: "Status",
      published: "Published in Marketplace",
      nextSteps: "What's Next?",
      step1: "Processing companies can now view your batch",
      step2: "You can track views and interest",
      step3: "You'll be notified when there are purchase offers",
      viewMarketplace: "View Marketplace",
      viewDashboard: "Dashboard",
      publishAnother: "Publish Another Batch",
    },
  }

  const t = content[lang]

  if (!batchData) return null

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 ${isArabic ? "rtl" : "ltr"}`}
      dir={isArabic ? "rtl" : "ltr"}
    >
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <img src="/logo.png" alt="SBE2Value" className="h-8" />
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
          >
            {lang === "ar" ? "English" : "العربية"}
          </Button>
        </div>
      </header>

      {/* Success Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Success Icon */}
          <div className="text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mx-auto animate-pulse">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900">{t.title}</h1>
            <p className="text-slate-600 text-pretty">{t.subtitle}</p>
          </div>

          {/* Batch Details */}
          <Card className="p-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-slate-600">{t.batchId}</p>
                <p className="font-bold text-slate-900">{batchData.batchId}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-slate-600">{t.factory}</p>
                <p className="font-bold text-slate-900">{batchData.factory_name}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-slate-600">{t.quantity}</p>
                <p className="font-bold text-slate-900">
                  {batchData.quantity} {t.tons}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-slate-600">{t.status}</p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <p className="font-bold text-green-600">{t.published}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Next Steps */}
          <Card className="p-6 bg-gradient-to-br from-[#1FC1DF]/5 to-[#2896DD]/5 border-[#1FC1DF]/20">
            <h3 className="text-xl font-bold text-slate-900 mb-4">{t.nextSteps}</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#2896DD]/10 flex items-center justify-center text-[#2896DD] font-bold flex-shrink-0">
                  1
                </div>
                <p className="text-slate-700 pt-1">{t.step1}</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#2896DD]/10 flex items-center justify-center text-[#2896DD] font-bold flex-shrink-0">
                  2
                </div>
                <p className="text-slate-700 pt-1">{t.step2}</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#2896DD]/10 flex items-center justify-center text-[#2896DD] font-bold flex-shrink-0">
                  3
                </div>
                <p className="text-slate-700 pt-1">{t.step3}</p>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              className="flex-1 bg-gradient-to-r from-[#1FC1DF] to-[#2896DD] hover:opacity-90 text-white"
              onClick={() => router.push("/processor/marketplace")}
            >
              <Package className="w-4 h-4" />
              {t.viewMarketplace}
              <ArrowRight className={`w-4 h-4 ${isArabic ? "rotate-180" : ""}`} />
            </Button>
            <Button
              variant="outline"
              className="flex-1 bg-transparent"
              onClick={() => router.push("/factory/dashboard")}
            >
              <BarChart3 className="w-4 h-4" />
              {t.viewDashboard}
            </Button>
          </div>

          <Button variant="ghost" className="w-full" onClick={() => router.push("/factory/input")}>
            {t.publishAnother}
          </Button>
        </div>
      </section>
    </div>
  )
}

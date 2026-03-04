"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, TrendingUp, Leaf, Flame, Droplet, CheckCircle2, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import SBEResultCard from "@/components/SBEResultCard"
import Top3Methods from "@/components/Top3Methods"
import MethodDetails from "@/components/MethodDetails"

function confidenceLabel(prob?: number) {
  if (prob == null) return "N/A"
  if (prob >= 0.8) return "Excellent"
  if (prob >= 0.6) return "Good"
  if (prob >= 0.4) return "Fair"
  return "Low"
}

export default function AnalysisPage() {
  const router = useRouter()
  const [lang, setLang] = useState<"ar" | "en">(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("sbe2value-lang") as "ar" | "en") || "ar"
    }
    return "ar"
  })
  const [sbeData, setSbeData] = useState<any>(null)
  const isArabic = lang === "ar"

  useEffect(() => {
    const data = sessionStorage.getItem("sbeData")
    if (data) {
      setSbeData(JSON.parse(data))
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

  const handleLanguageToggle = () => {
    const newLang = lang === "ar" ? "en" : "ar"
    setLang(newLang)
    localStorage.setItem("sbe2value-lang", newLang)
    window.dispatchEvent(new CustomEvent("languageChange", { detail: { lang: newLang } }))
  }

  const oilTypeMapping: Record<string, { ar: string; en: string }> = {
    soybean: { ar: "زيت الصويا", en: "Soybean Oil" },
    palm: { ar: "زيت النخيل", en: "Palm Oil" },
    sunflower: { ar: "زيت دوار الشمس", en: "Sunflower Oil" },
    canola: { ar: "زيت الكانولا", en: "Canola Oil" },
    corn: { ar: "زيت الذرة", en: "Corn Oil" },
    olive: { ar: "زيت الزيتون", en: "Olive Oil" },
  }

  const content = {
    ar: {
      title: "نتائج التحليل الذكي",
      subtitle: "تحليل شامل لمخلفات SBE وتوصيات إعادة الاستخدام",
      recommendations: "أفضل 3 طرق معالجة",
      suitability: "مدى الملاءمة",
      expectedProfit: "الربح المتوقع",
      co2Reduction: "تقليل انبعاثات CO₂",
      processingCost: "تكلفة المعالجة",
      marketDemand: "الطلب في السوق",
      high: "مرتفع",
      medium: "متوسط",
      low: "منخفض",
      perTon: "للطن",
      tons: "طن",
      keyInsights: "رؤى رئيسية",
      insight1: "نسبة الزيت المتبقية مناسبة جداً لإنتاج الوقود الحيوي",
      insight2: "المحتوى الكربوني يجعلها مثالية للكربون المنشط",
      insight3: "الخصائص الفيزيائية ممتازة لمواد البناء",
      nextSteps: "الخطوات التالية",
      step1: "نشر الدفعة في السوق",
      step2: "عرض على شركات المعالجة",
      step3: "متابعة الأثر البيئي",
      publishBatch: "نشر الدفعة في السوق",
      viewDashboard: "عرض لوحة التحكم",
      back: "رجوع",
      factoryName: "اسم المصنع",
      quantity: "الكمية",
      oilContent: "نسبة الزيت",
      moistureContent: "نسبة الرطوبة",
      oilType: "نوع الزيت",
      surfaceArea: "مساحة السطح",
      ph: "pH",
      application: "التطبيق المطلوب",
      recommendedMethod: "الطريقة الموصى بها",
      modelConfidence: "ثقة النموذج",
    },
    en: {
      title: "Smart Analysis Results",
      subtitle: "Comprehensive analysis of spent bleaching earth and reuse recommendations",
      recommendations: "Top 3 Processing Methods",
      suitability: "Suitability",
      expectedProfit: "Expected Profit",
      co2Reduction: "CO₂ Reduction",
      processingCost: "Processing Cost",
      marketDemand: "Market Demand",
      high: "High",
      medium: "Medium",
      low: "Low",
      perTon: "per ton",
      tons: "tons",
      keyInsights: "Key Insights",
      insight1: "Residual oil content is highly suitable for biofuel production",
      insight2: "Carbon content makes it ideal for activated carbon",
      insight3: "Physical properties are excellent for construction materials",
      nextSteps: "Next Steps",
      step1: "Publish batch to marketplace",
      step2: "Present to processing companies",
      step3: "Track environmental impact",
      publishBatch: "Publish to Marketplace",
      viewDashboard: "View Dashboard",
      back: "Back",
      factoryName: "Factory Name",
      quantity: "Quantity",
      oilContent: "Oil Percentage",
      moistureContent: "Moisture Content",
      oilType: "Oil Type",
      surfaceArea: "Surface Area",
      ph: "pH",
      application: "Application",
      recommendedMethod: "Recommended Method",
      modelConfidence: "Model Confidence",
    },
  }

  const t = content[lang]

  if (!sbeData) return null

  const methodMapping: Record<string, { icon: any; color: string; bgColor: string; iconColor: string }> = {
    Utilization: {
      icon: Flame,
      color: "from-orange-500 to-red-500",
      bgColor: "from-orange-500/10 to-red-500/10",
      iconColor: "text-orange-600",
    },
    Chemical: {
      icon: Droplet,
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-500/10 to-cyan-500/10",
      iconColor: "text-cyan-600",
    },
    Combined: {
      icon: TrendingUp,
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-500/10 to-pink-500/10",
      iconColor: "text-purple-600",
    },
    "Solvent Extraction": {
      icon: Droplet,
      color: "from-teal-500 to-green-500",
      bgColor: "from-teal-500/10 to-green-500/10",
      iconColor: "text-teal-600",
    },
    Thermal: {
      icon: Flame,
      color: "from-red-500 to-orange-500",
      bgColor: "from-red-500/10 to-orange-500/10",
      iconColor: "text-red-600",
    },
  }

  const pathways =
    sbeData.top3_classes && sbeData.top3_probs
      ? sbeData.top3_classes.map((method: string, index: number) => {
          const methodStyle = methodMapping[method] || methodMapping.Combined
          const probability = sbeData.top3_probs[index]
          const suitability = Math.round(probability * 100)

          return {
            icon: methodStyle.icon,
            title: method,
            description: isArabic
              ? `طريقة معالجة ${method} بناءً على خصائص SBE المدخلة`
              : `${method} processing method based on input SBE characteristics`,
            suitability,
            profit: Math.round(150 + probability * 100),
            co2: (2.0 + probability * 1.5).toFixed(1),
            cost: Math.round(60 + (1 - probability) * 80),
            demand: probability > 0.7 ? t.high : probability > 0.4 ? t.medium : t.low,
            color: methodStyle.color,
            bgColor: methodStyle.bgColor,
            iconColor: methodStyle.iconColor,
          }
        })
      : []

  const handlePublishBatch = () => {
    const batchId = `SBE-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9000) + 1000).padStart(3, "0")}`

    const batchData = {
      ...sbeData,
      batchId,
      publishedDate: new Date().toISOString(),
      status: "active",
      views: 0,
    }

    sessionStorage.setItem("publishedBatch", JSON.stringify(batchData))

    const existingBatches = JSON.parse(localStorage.getItem("marketplaceBatches") || "[]")
    existingBatches.push(batchData)
    localStorage.setItem("marketplaceBatches", JSON.stringify(existingBatches))

    router.push("/factory/publish-success")
  }

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 ${isArabic ? "rtl" : "ltr"}`}
      dir={isArabic ? "rtl" : "ltr"}
    >
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" onClick={() => router.push("/factory/input")} className="gap-2">
            <ArrowLeft className={`w-4 h-4 ${isArabic ? "rotate-180" : ""}`} />
            {t.back}
          </Button>
          <Button variant="outline" size="sm" onClick={handleLanguageToggle}>
            {lang === "ar" ? "English" : "العربية"}
          </Button>
        </div>
      </header>

      <section className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1FC1DF] to-[#2896DD] flex items-center justify-center mx-auto">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900">{t.title}</h1>
            <p className="text-slate-600 text-pretty">{t.subtitle}</p>
          </div>

          <Card className="p-6 bg-gradient-to-br from-[#1FC1DF]/5 to-[#2896DD]/5 border-[#1FC1DF]/20">
            <div className="grid md:grid-cols-5 gap-4 text-center">
              <div>
                <p className="text-sm text-slate-600 mb-1">{t.factoryName}</p>
                <p className="font-bold text-slate-900">{sbeData.factory_name}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">{t.quantity}</p>
                <p className="font-bold text-slate-900">
                  {sbeData.quantity} {t.tons}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">{t.oilType}</p>
                <p className="font-bold text-slate-900">
                  {oilTypeMapping[sbeData.oil_type]?.[lang] || sbeData.oil_type}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">{t.oilContent}</p>
                <p className="font-bold text-slate-900">{sbeData.oil_content_pct}%</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">{t.ph}</p>
                <p className="font-bold text-slate-900">{sbeData.ph}</p>
              </div>
            </div>
          </Card>

          {sbeData.predicted_method && (
            <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <div className="flex items-center gap-4">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900">{t.recommendedMethod}</h3>
                  <p className="text-lg text-slate-700 mt-1">
                    <span className="font-bold text-green-600">{sbeData.predicted_method}</span>
                    {" - "}
                    {sbeData.top3_probs?.[0] != null
                      ? `${t.modelConfidence}: ${(sbeData.top3_probs[0] * 100).toFixed(1)}%`
                      : "ثقة النموذج غير متوفرة"}
                  </p>
                </div>
              </div>
            </Card>
          )}

          {sbeData.best_processing_method && (
            <SBEResultCard
              method={sbeData.best_processing_method}
              prob={sbeData.predicted_prob}
              confidence={sbeData.confidence_label ?? (confidenceLabel(sbeData.predicted_prob) as any)}
              info={sbeData.method_info}
            />
          )}

          <Top3Methods data={sbeData} lang={lang} />

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">{t.recommendations}</h2>
            <div className="grid gap-6">
              {pathways.map((pathway, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-14 h-14 rounded-xl bg-gradient-to-br ${pathway.bgColor} flex items-center justify-center flex-shrink-0`}
                      >
                        <pathway.icon className={`w-7 h-7 ${pathway.iconColor}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-900 mb-1">{pathway.title}</h3>
                        <p className="text-slate-600 text-sm">{pathway.description}</p>
                      </div>
                      <Badge className={`bg-gradient-to-r ${pathway.color} text-white border-0`}>
                        {pathway.suitability}%
                      </Badge>
                    </div>

                    <MethodDetails methodName={pathway.title} lang={lang} />

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">{t.suitability}</span>
                        <span className="font-semibold text-slate-900">{pathway.suitability}%</span>
                      </div>
                      <Progress value={pathway.suitability} className="h-2" />
                    </div>

                    <div className="grid md:grid-cols-4 gap-4 pt-4 border-t">
                      
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-slate-600 text-sm">
                          <Leaf className="w-4 h-4" />
                          {t.co2Reduction}
                        </div>
                        <p className="font-bold text-[#1FC1DF]">
                          {pathway.co2} {t.tons}
                        </p>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-slate-600 text-sm">
                          <TrendingUp className="w-4 h-4" />
                          {t.marketDemand}
                        </div>
                        <p className="font-bold text-slate-900">{pathway.demand}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              {t.keyInsights}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">{t.insight1}</span>
              </li>
              <li className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">{t.insight2}</span>
              </li>
              <li className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">{t.insight3}</span>
              </li>
            </ul>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-4">{t.nextSteps}</h3>
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#2896DD]/10 flex items-center justify-center text-[#2896DD] font-bold">
                  1
                </div>
                <span className="text-slate-700">{t.step1}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#2896DD]/10 flex items-center justify-center text-[#2896DD] font-bold">
                  2
                </div>
                <span className="text-slate-700">{t.step2}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#2896DD]/10 flex items-center justify-center text-[#2896DD] font-bold">
                  3
                </div>
                <span className="text-slate-700">{t.step3}</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                className="flex-1 bg-gradient-to-r from-[#1FC1DF] to-[#2896DD] hover:opacity-90 text-white"
                onClick={handlePublishBatch}
              >
                {t.publishBatch}
              </Button>
              <Button
                variant="outline"
                className="flex-1 bg-transparent"
                onClick={() => router.push("/factory/dashboard")}
              >
                {t.viewDashboard}
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}

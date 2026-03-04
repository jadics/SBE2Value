"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, ArrowLeft, Factory, Loader2, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"

export default function FactoryInputPage() {
  const router = useRouter()
  const [lang, setLang] = useState<"ar" | "en">(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("sbe2value-lang") as "ar" | "en") || "ar"
    }
    return "ar"
  })
  const [loading, setLoading] = useState(false)
  const isArabic = lang === "ar"

  const [formData, setFormData] = useState({
    factory_name: "",
    quantity: "",
    oil_type: "",
    oil_content_pct: "",
    surface_area: "",
    ph: "",
    desired_application: "",
  })

  const content = {
    ar: {
      title: "إدخال بيانات الـSBE المستهلك",
      subtitle: "أدخل المعلومات التفصيلية عن مخلفات الSBE لديك",
      factoryName: "اسم المصنع",
      factoryNamePlaceholder: "أدخل اسم المصنع",
      quantity: "الكمية المتاحة (طن)",
      quantityPlaceholder: "مثال: 50",
      demoButton: "تعبئة بيانات تجريبية",
      oilType: "نوع الزيت",
      oilTypeDesc: "دور رئيسي في التصنيف",
      oilTypePlaceholder: "اختر نوع الزيت",
      oilTypes: {
        palm: "زيت النخيل",
        soybean: "زيت الصويا",
        sunflower: "زيت دوّار الشمس",
        canola: "زيت الكانولا",
        corn: "زيت الذرة",
        olive: "زيت الزيتون",
      },
      oilContent: "نسبة الزيت (%)",
      oilContentDesc: "يلعب دور مهم في التصنيف",
      oilContentPlaceholder: "مثال: 12",
      surfaceArea: "مساحة السطح (m²/g)",
      surfaceAreaDesc: "تلعب دور رئيسي بالخواص الكيميائية",
      surfaceAreaPlaceholder: "مثال: 150",
      ph: "الرقم الهيدروجيني (pH)",
      phDesc: "يلعب دور رئيسي بالخواص الكيميائية",
      phPlaceholder: "مثال: 7.5",
      desiredApplication: "هدف الاستعمال مابعد المعالجة",
      desiredApplicationDesc: "مهم لاختيار نوع المعالجة",
      desiredApplicationPlaceholder: "اختر التطبيق المطلوب",
      applications: {
        biofuel: "إنتاج الوقود الحيوي",
        activated_carbon: "الكربون المنشط",
        construction: "مواد البناء",
        agriculture: "التطبيقات الزراعية",
      },
      back: "رجوع",
      analyze: "تحليل بالذكاء الاصطناعي",
      analyzing: "جاري التحليل...",
    },
    en: {
      title: "Spent Bleaching Earth Data Input",
      subtitle: "Enter detailed information about your spent bleaching earth waste",
      factoryName: "Factory Name",
      factoryNamePlaceholder: "Enter factory name",
      quantity: "Available Quantity (tons)",
      quantityPlaceholder: "Example: 50",
      demoButton: "Fill Demo Data",
      oilType: "Oil Type",
      oilTypeDesc: "Plays a major role in classification",
      oilTypePlaceholder: "Select oil type",
      oilTypes: {
        palm: "Palm Oil",
        soybean: "Soybean Oil",
        sunflower: "Sunflower Oil",
        canola: "Canola Oil",
        corn: "Corn Oil",
        olive: "Olive Oil",
      },
      oilContent: "Oil Percentage (%)",
      oilContentDesc: "Plays an important role in classification",
      oilContentPlaceholder: "Example: 12",
      surfaceArea: "Surface Area (m²/g)",
      surfaceAreaDesc: "Plays a major role in chemical properties",
      surfaceAreaPlaceholder: "Example: 150",
      ph: "pH",
      phDesc: "Plays a major role in chemical properties",
      phPlaceholder: "Example: 7.5",
      desiredApplication: "Desired Application",
      desiredApplicationDesc: "Important for choosing treatment type",
      desiredApplicationPlaceholder: "Select desired application",
      applications: {
        biofuel: "Biofuel Production",
        activated_carbon: "Activated Carbon",
        construction: "Construction Materials",
        agriculture: "Agricultural Applications",
      },
      back: "Back",
      analyze: "Analyze with AI",
      analyzing: "Analyzing...",
    },
  }

  const t = content[lang]

  const fillDemoData = () => {
    setFormData({
      factory_name: "زيت عافية",
      quantity: "120",
      oil_type: "palm",
      oil_content_pct: "22.3",
      surface_area: "168.7",
      ph: "7.2",
      desired_application: "biofuel",
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("https://disappointedly-nuptial-verline.ngrok-free.dev/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Oil_Type: formData.oil_type,
          Residual_Oil_Content: Number.parseFloat(formData.oil_content_pct),
          Surface_Area: Number.parseFloat(formData.surface_area),
          pH: Number.parseFloat(formData.ph),
          Desired_Application: formData.desired_application,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get prediction from API")
      }

      const predictionResult = await response.json()

      const dataToStore = {
        factory_name: formData.factory_name,
        quantity: Number.parseFloat(formData.quantity),
        oil_type: formData.oil_type,
        oil_content_pct: Number.parseFloat(formData.oil_content_pct),
        surface_area: Number.parseFloat(formData.surface_area),
        ph: Number.parseFloat(formData.ph),
        desired_application: formData.desired_application,
        predicted_method: predictionResult["Best processing method"],
        top3_classes: predictionResult["Top 3 classes"],
        top3_probs: predictionResult["Predicted prob."],
      }

      sessionStorage.setItem("sbeData", JSON.stringify(dataToStore))
      router.push("/factory/analysis")
    } catch (error) {
      console.error("Error calling prediction API:", error)
      alert(
        isArabic
          ? "حدث خطأ أثناء الاتصال بخادم التحليل. تأكد من تشغيل الخادم المحلي."
          : "Error connecting to analysis server. Make sure the local server is running.",
      )
      setLoading(false)
    }
  }

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
      className={`min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 ${isArabic ? "rtl" : "ltr"}`}
      dir={isArabic ? "rtl" : "ltr"}
    >
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" onClick={() => router.push("/")} className="gap-2">
            <ArrowLeft className={`w-4 h-4 ${isArabic ? "rotate-180" : ""}`} />
            {t.back}
          </Button>
          <Button variant="outline" size="sm" onClick={handleLanguageToggle}>
            {lang === "ar" ? "English" : "العربية"}
          </Button>
        </div>
      </header>

      <section className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center space-y-4 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1FC1DF]/10 to-[#1FC1DF]/5 flex items-center justify-center mx-auto">
              <Factory className="w-8 h-8 text-[#1FC1DF]" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900">{t.title}</h1>
            <p className="text-slate-600 text-pretty">{t.subtitle}</p>
          </div>

          <div className="mb-6 flex justify-center">
            <Button
              type="button"
              onClick={fillDemoData}
              className="gap-2 bg-gradient-to-r from-[#1FC1DF] to-[#2896DD] hover:opacity-90 text-white shadow-md hover:shadow-lg transition-all"
            >
              <Sparkles className="w-4 h-4" />
              {t.demoButton}
            </Button>
          </div>

          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="factoryName">{t.factoryName}</Label>
                <Input
                  id="factoryName"
                  type="text"
                  value={formData.factory_name}
                  onChange={(e) => setFormData({ ...formData, factory_name: e.target.value })}
                  placeholder={t.factoryNamePlaceholder}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity">{t.quantity}</Label>
                <Input
                  id="quantity"
                  type="number"
                  step="0.1"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  placeholder={t.quantityPlaceholder}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="oilContent">{t.oilContent}</Label>
                <Input
                  id="oilContent"
                  type="number"
                  step="0.1"
                  value={formData.oil_content_pct}
                  onChange={(e) => setFormData({ ...formData, oil_content_pct: e.target.value })}
                  placeholder={t.oilContentPlaceholder}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="surfaceArea">{t.surfaceArea}</Label>
                <Input
                  id="surfaceArea"
                  type="number"
                  step="0.1"
                  value={formData.surface_area}
                  onChange={(e) => setFormData({ ...formData, surface_area: e.target.value })}
                  placeholder={t.surfaceAreaPlaceholder}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ph">{t.ph}</Label>
                <Input
                  id="ph"
                  type="number"
                  step="0.1"
                  value={formData.ph}
                  onChange={(e) => setFormData({ ...formData, ph: e.target.value })}
                  placeholder={t.phPlaceholder}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="oilType">{t.oilType}</Label>
                <Select
                  value={formData.oil_type}
                  onValueChange={(value) => setFormData({ ...formData, oil_type: value })}
                >
                  <SelectTrigger id="oilType" className="bg-white">
                    <SelectValue placeholder={t.oilTypePlaceholder} />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="palm">{t.oilTypes.palm}</SelectItem>
                    <SelectItem value="soybean">{t.oilTypes.soybean}</SelectItem>
                    <SelectItem value="sunflower">{t.oilTypes.sunflower}</SelectItem>
                    <SelectItem value="canola">{t.oilTypes.canola}</SelectItem>
                    <SelectItem value="corn">{t.oilTypes.corn}</SelectItem>
                    <SelectItem value="olive">{t.oilTypes.olive}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="desiredApplication">{t.desiredApplication}</Label>
                <Select
                  value={formData.desired_application}
                  onValueChange={(value) => setFormData({ ...formData, desired_application: value })}
                >
                  <SelectTrigger id="desiredApplication" className="bg-white">
                    <SelectValue placeholder={t.desiredApplicationPlaceholder} />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="biofuel">{t.applications.biofuel}</SelectItem>
                    <SelectItem value="activated_carbon">{t.applications.activated_carbon}</SelectItem>
                    <SelectItem value="construction">{t.applications.construction}</SelectItem>
                    <SelectItem value="agriculture">{t.applications.agriculture}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#1FC1DF] to-[#2896DD] hover:opacity-90 text-white gap-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {t.analyzing}
                  </>
                ) : (
                  <>
                    {t.analyze}
                    <ArrowRight className={`w-4 h-4 ${isArabic ? "rotate-180" : ""}`} />
                  </>
                )}
              </Button>
            </form>
          </Card>
        </div>
      </section>
    </div>
  )
}

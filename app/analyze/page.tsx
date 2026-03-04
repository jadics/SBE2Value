"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, CheckCircle2, Sparkles } from "lucide-react"

export default function AnalyzeSBEPage() {
  const [isArabic, setIsArabic] = useState(true)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const content = {
    ar: {
      title: "تحليل نفايات SBE",
      subtitle: "أدخل بيانات التربة البيضاء المستهلكة للحصول على تحليل ذكي",
      oilType: "نوع الزيت",
      oilTypeHint: "دور رئيسي في التصنيف",
      oilContent: "مكونات الزيت (wt%)",
      oilContentHint: "يلعب دور مهم في التصنيف",
      surfaceArea: "مساحة السطح (m²/g)",
      surfaceAreaHint: "تلعب دور رئيسي بالخواص الكيميائية",
      ph: "الرقم الهيدروجيني",
      phHint: "يلعب دور رئيسي بالخواص الكيميائية",
      desiredApplication: "هدف الاستعمال مابعد المعالجة",
      desiredApplicationHint: "مهم لاختيار نوع المعالجة",
      analyzeButton: "تحليل بالذكاء الاصطناعي",
      analyzing: "جاري التحليل...",
      resultsTitle: "نتائج التحليل الذكي",
      errorTitle: "حدث خطأ",
      errorMessage: "حدث خطأ أثناء التحليل، الرجاء التحقق من البيانات.",
      oilTypes: {
        soybean: "زيت الصويا",
        sunflower: "زيت دوار الشمس",
        palm: "زيت النخيل",
        canola: "زيت الكانولا",
        corn: "زيت الذرة",
        olive: "زيت الزيتون",
      },
      applications: {
        biofuel: "إنتاج الوقود الحيوي",
        activated_carbon: "الكربون المنشط",
        construction: "مواد البناء",
        agriculture: "الزراعة",
        other: "أخرى",
      },
    },
    en: {
      title: "Analyze SBE Waste",
      subtitle: "Enter spent bleaching earth data for intelligent analysis",
      oilType: "Oil Type",
      oilTypeHint: "Plays a major role in classification",
      oilContent: "Oil Content (wt%)",
      oilContentHint: "Plays an important role in classification",
      surfaceArea: "Surface Area (m²/g)",
      surfaceAreaHint: "Plays a major role in chemical properties",
      ph: "pH",
      phHint: "Plays a major role in chemical properties",
      desiredApplication: "Desired Application",
      desiredApplicationHint: "Important for choosing treatment type",
      analyzeButton: "Analyze with AI",
      analyzing: "Analyzing...",
      resultsTitle: "Smart Analysis Results",
      errorTitle: "Error Occurred",
      errorMessage: "An error occurred during analysis, please check the data.",
      oilTypes: {
        soybean: "Soybean Oil",
        sunflower: "Sunflower Oil",
        palm: "Palm Oil",
        canola: "Canola Oil",
        corn: "Corn Oil",
        olive: "Olive Oil",
      },
      applications: {
        biofuel: "Biofuel Production",
        activated_carbon: "Activated Carbon",
        construction: "Construction Materials",
        agriculture: "Agriculture",
        other: "Other",
      },
    },
  }

  const t = isArabic ? content.ar : content.en

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const formDataToSend = new FormData(e.currentTarget)

      const response = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        body: formDataToSend,
      })

      if (!response.ok) {
        throw new Error("API request failed")
      }

      const data = await response.json()
      setResult(data)
    } catch (err) {
      console.error("Analysis error:", err)
      setError(t.errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4" dir={isArabic ? "rtl" : "ltr"}>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-[#2896DD]" />
            <h1 className="text-4xl font-bold text-slate-900">{t.title}</h1>
          </div>
          <p className="text-lg text-slate-600">{t.subtitle}</p>

          {/* Language Toggle */}
          <div className="mt-4 flex justify-center gap-2">
            <Button
              variant={isArabic ? "default" : "outline"}
              size="sm"
              onClick={() => setIsArabic(true)}
              className={isArabic ? "bg-[#2896DD] hover:bg-[#2896DD]/90" : ""}
            >
              العربية
            </Button>
            <Button
              variant={!isArabic ? "default" : "outline"}
              size="sm"
              onClick={() => setIsArabic(false)}
              className={!isArabic ? "bg-[#2896DD] hover:bg-[#2896DD]/90" : ""}
            >
              English
            </Button>
          </div>
        </div>

        {/* Form Card */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-2xl">{t.title}</CardTitle>
            <CardDescription>{t.subtitle}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Oil Type */}
              <div className="space-y-2">
                <Label htmlFor="oil_type" className="text-base font-semibold">
                  {t.oilType}
                </Label>
                <p className="text-sm text-slate-500">{t.oilTypeHint}</p>
                <select
                  id="oil_type"
                  name="oil_type"
                  required
                  className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-base ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">{t.oilType}</option>
                  <option value="soybean">{t.oilTypes.soybean}</option>
                  <option value="sunflower">{t.oilTypes.sunflower}</option>
                  <option value="palm">{t.oilTypes.palm}</option>
                  <option value="canola">{t.oilTypes.canola}</option>
                  <option value="corn">{t.oilTypes.corn}</option>
                  <option value="olive">{t.oilTypes.olive}</option>
                </select>
              </div>

              {/* Oil Content */}
              <div className="space-y-2">
                <Label htmlFor="oil_content_pct" className="text-base font-semibold">
                  {t.oilContent}
                </Label>
                <p className="text-sm text-slate-500">{t.oilContentHint}</p>
                <Input
                  id="oil_content_pct"
                  name="oil_content_pct"
                  type="number"
                  step="0.01"
                  min="0"
                  max="100"
                  required
                  className="text-base"
                  placeholder="0.00"
                />
              </div>

              {/* Surface Area */}
              <div className="space-y-2">
                <Label htmlFor="surface_area" className="text-base font-semibold">
                  {t.surfaceArea}
                </Label>
                <p className="text-sm text-slate-500">{t.surfaceAreaHint}</p>
                <Input
                  id="surface_area"
                  name="surface_area"
                  type="number"
                  step="0.01"
                  min="0"
                  required
                  className="text-base"
                  placeholder="0.00"
                />
              </div>

              {/* pH */}
              <div className="space-y-2">
                <Label htmlFor="ph" className="text-base font-semibold">
                  {t.ph}
                </Label>
                <p className="text-sm text-slate-500">{t.phHint}</p>
                <Input
                  id="ph"
                  name="ph"
                  type="number"
                  step="0.01"
                  min="0"
                  max="14"
                  required
                  className="text-base"
                  placeholder="7.00"
                />
              </div>

              {/* Desired Application */}
              <div className="space-y-2">
                <Label htmlFor="desired_application" className="text-base font-semibold">
                  {t.desiredApplication}
                </Label>
                <p className="text-sm text-slate-500">{t.desiredApplicationHint}</p>
                <select
                  id="desired_application"
                  name="desired_application"
                  required
                  className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-base ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">{t.desiredApplication}</option>
                  <option value="biofuel">{t.applications.biofuel}</option>
                  <option value="activated_carbon">{t.applications.activated_carbon}</option>
                  <option value="construction">{t.applications.construction}</option>
                  <option value="agriculture">{t.applications.agriculture}</option>
                  <option value="other">{t.applications.other}</option>
                </select>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[#2896DD] hover:bg-[#2896DD]/90 text-white text-lg py-6"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {t.analyzing}
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    {t.analyzeButton}
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Results Card */}
        {result && (
          <Card className="mt-6 shadow-lg border-0 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <CardHeader>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
                <CardTitle className="text-green-900">{t.resultsTitle}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <pre className="whitespace-pre-wrap text-sm text-slate-700 font-mono">
                  {JSON.stringify(result.predicted_result || result, null, 2)}
                </pre>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Error Card */}
        {error && (
          <Card className="mt-6 shadow-lg border-0 bg-gradient-to-br from-red-50 to-rose-50 border-red-200">
            <CardHeader>
              <CardTitle className="text-red-900">{t.errorTitle}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-red-700">{error}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

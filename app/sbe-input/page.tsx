"use client"

import { useState, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Sparkles, TrendingUp } from "lucide-react"

export default function SBEInputPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const formData = new FormData(e.currentTarget)

      const response = await fetch("http://127.0.0.1:8000/analyze_simple", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`خطأ في الاتصال بالخادم: ${response.status}`)
      }

      const data = await response.json()
      setResult(data.predicted_result)
    } catch (err) {
      setError(err instanceof Error ? err.message : "حدث خطأ أثناء التحليل. الرجاء المحاولة مرة أخرى.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">إدخال بيانات SBE المستهلك</h1>
          <p className="text-slate-600">SBE Waste Data Input</p>
        </div>

        {/* Form Card */}
        <Card className="shadow-lg border-slate-200">
          <CardHeader>
            <CardTitle className="text-xl text-slate-900">بيانات التحليل</CardTitle>
            <CardDescription>Analysis Data</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Oil Type */}
              <div className="space-y-2">
                <Label htmlFor="oil_type" className="text-base text-slate-900">
                  نوع الزيت
                </Label>
                <p className="text-xs text-slate-500">Oil Type - دور رئيسي في التصنيف</p>
                <select
                  id="oil_type"
                  name="oil_type"
                  required
                  className="flex h-11 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-lg ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2"
                >
                  <option value="">اختر نوع الزيت / Select oil type</option>
                  <option value="soybean">فول الصويا / Soybean</option>
                  <option value="sunflower">دوار الشمس / Sunflower</option>
                  <option value="palm">النخيل / Palm</option>
                  <option value="canola">الكانولا / Canola</option>
                  <option value="corn">الذرة / Corn</option>
                  <option value="olive">الزيتون / Olive</option>
                </select>
              </div>

              {/* Oil Content */}
              <div className="space-y-2">
                <Label htmlFor="oil_content_pct" className="text-base text-slate-900">
                  مكونات الزيت (%)
                </Label>
                <p className="text-xs text-slate-500">Oil Content (wt%) - يلعب دور مهم في التصنيف</p>
                <Input
                  id="oil_content_pct"
                  name="oil_content_pct"
                  type="number"
                  step="0.01"
                  min="0"
                  max="100"
                  required
                  className="text-lg"
                  placeholder="مثال: 25"
                />
              </div>

              {/* Surface Area */}
              <div className="space-y-2">
                <Label htmlFor="surface_area" className="text-base text-slate-900">
                  مساحة السطح (m²/g)
                </Label>
                <p className="text-xs text-slate-500">Surface Area - تلعب دور رئيسي بالخواص الكيميائية</p>
                <Input
                  id="surface_area"
                  name="surface_area"
                  type="number"
                  step="0.01"
                  min="0"
                  required
                  className="text-lg"
                  placeholder="مثال: 150"
                />
              </div>

              {/* pH */}
              <div className="space-y-2">
                <Label htmlFor="ph" className="text-base text-slate-900">
                  الرقم الهيدروجيني
                </Label>
                <p className="text-xs text-slate-500">pH - يلعب دور رئيسي بالخواص الكيميائية</p>
                <Input
                  id="ph"
                  name="ph"
                  type="number"
                  step="0.01"
                  min="0"
                  max="14"
                  required
                  className="text-lg"
                  placeholder="مثال: 7.5"
                />
              </div>

              {/* Desired Application */}
              <div className="space-y-2">
                <Label htmlFor="desired_application" className="text-base text-slate-900">
                  هدف الاستعمال مابعد المعالجة
                </Label>
                <p className="text-xs text-slate-500">Desired Application - مهم لاختيار نوع المعالجة</p>
                <select
                  id="desired_application"
                  name="desired_application"
                  required
                  className="flex h-11 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-lg ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2"
                >
                  <option value="">اختر الهدف / Select application</option>
                  <option value="biofuel">وقود حيوي / Biofuel Production</option>
                  <option value="activated_carbon">كربون منشط / Activated Carbon</option>
                  <option value="construction">مواد بناء / Construction Materials</option>
                  <option value="fertilizer">سماد / Fertilizer</option>
                  <option value="animal_feed">علف حيواني / Animal Feed</option>
                </select>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 text-lg font-semibold"
                style={{ backgroundColor: "#2896DD" }}
              >
                {loading ? (
                  <>
                    <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                    جاري التحليل...
                  </>
                ) : (
                  <>
                    <Sparkles className="ml-2 h-5 w-5" />
                    تحليل بالذكاء الاصطناعي
                  </>
                )}
              </Button>
            </form>

            {/* Error Message */}
            {error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results Card */}
        {result && (
          <Card className="mt-6 shadow-lg border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
            <CardHeader>
              <CardTitle className="text-xl text-green-900 flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-green-600" />
                نتائج التحليل الذكي
              </CardTitle>
              <CardDescription className="text-green-700">AI Analysis Results - أفضل ٣ طرق معالجة</CardDescription>
            </CardHeader>
            <CardContent>
              {result.top_3_classes ? (
                <div className="space-y-3">
                  {result.top_3_classes.map((item: any, index: number) => (
                    <div
                      key={index}
                      className="bg-white p-4 rounded-lg border border-green-200 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-700 font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">{item.class}</p>
                          <p className="text-xs text-slate-500">طريقة المعالجة / Treatment Method</p>
                        </div>
                      </div>
                      <div className="text-left">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-green-600" />
                          <span className="text-lg font-bold text-green-700">
                            {(item.probability * 100).toFixed(1)}%
                          </span>
                        </div>
                        <p className="text-xs text-slate-500">مدى الثقة / Confidence</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <pre className="bg-white p-4 rounded-lg border border-green-200 overflow-x-auto text-sm text-slate-900 whitespace-pre-wrap">
                  {JSON.stringify(result, null, 2)}
                </pre>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

"use client"
import { useState } from "react"
import type React from "react"

export default function AnalyzeClassifierPage() {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setErr(null)
    const fd = new FormData(e.currentTarget)
    try {
      // أثناء التطوير المحلي: استهدفي FastAPI المحلي
      const r = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        body: fd,
      })
      if (!r.ok) throw new Error(await r.text())
      setResult(await r.json())
    } catch (e: any) {
      setErr(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">تحليل SBE (تصنيف الطريقة)</h1>

      <form onSubmit={onSubmit} encType="multipart/form-data" className="space-y-4">
        <input
          name="batch_sbe_tons"
          type="number"
          step="0.01"
          placeholder="كمية SBE (طن)"
          className="w-full border p-2 rounded"
          required
        />

        <input
          name="oil_content_pct"
          type="number"
          step="0.1"
          placeholder="نسبة الزيت المتبقي (%)"
          className="w-full border p-2 rounded"
          required
        />

        {/* input type="month" يعطي قيمة بصيغة YYYY-MM */}
        <input name="month" type="month" className="w-full border p-2 rounded" required />

        <select name="oil_type" className="w-full border p-2 rounded" defaultValue="" required>
          <option value="" disabled>
            اختر نوع الزيت
          </option>
          <option value="soybean">Soybean</option>
          <option value="sunflower">Sunflower</option>
          <option value="palm">Palm</option>
          <option value="canola">Canola</option>
          <option value="corn">Corn</option>
          <option value="olive">Olive</option>
        </select>

        <button type="submit" disabled={loading} className="bg-[#2896DD] text-white px-4 py-2 rounded w-full">
          {loading ? "جاري التحليل..." : "تحليل بالذكاء الاصطناعي"}
        </button>
      </form>

      {err && <div className="text-red-600 mt-3">{err}</div>}

      {result && (
        <div className="p-4 mt-6 rounded-xl border bg-gray-50">
          <h2 className="font-semibold text-lg mb-2">نتائج التحليل الذكي</h2>
          <pre className="text-sm whitespace-pre-wrap">{JSON.stringify(result.predicted_result, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}

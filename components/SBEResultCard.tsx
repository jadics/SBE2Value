export type MethodInfo = {
  summary?: string
  environmental?: string
  economic?: string
  practical?: string
  rating?: string
  co2_reduction_ton?: number
  profit_sar_per_ton?: number
  treatment_cost_sar_per_ton?: number
}

export type SBECardProps = {
  method: string
  prob: number
  confidence?: "Excellent" | "Good" | "Fair" | "Low" | "N/A"
  info?: MethodInfo
}

function fmt(n?: number, suffix = "") {
  if (typeof n !== "number" || Number.isNaN(n)) return "—"
  return `${n}${suffix}`
}

export default function SBEResultCard({ method, prob, confidence = "N/A", info }: SBECardProps) {
  const pct = Math.max(0, Math.min(100, Math.round(prob * 100)))
  return (
    <div className="p-5 bg-white rounded-2xl shadow border space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{method || "N/A"}</h2>
        <div className="flex items-center gap-2">
          <span className="text-xs px-2 py-1 rounded-full bg-fuchsia-100">{pct}%</span>
          <span className="text-sm px-3 py-1 rounded-full bg-blue-50">{confidence}</span>
        </div>
      </div>

      {info?.summary && <p className="text-gray-700">{info.summary}</p>}

      <div className="w-full h-2 bg-gray-100 rounded overflow-hidden">
        <div className="h-full bg-sky-500" style={{ width: `${pct}%` }} />
      </div>

      <div className="grid md:grid-cols-3 gap-4 text-sm">
        <div>
          🌍 <b>Environmental:</b> {info?.environmental || "—"}
        </div>
        <div>
          💰 <b>Economic:</b> {info?.economic || "—"}
        </div>
        <div>
          ⚙️ <b>Practical:</b> {info?.practical || "—"}
        </div>
      </div>

      <div className="flex flex-wrap gap-6 text-sm">
        <div>
          🌱 تقليل CO₂: <b>{fmt(info?.co2_reduction_ton, " طن")}</b>
        </div>
        <div>
          💸 الربح المتوقع: <b>{fmt(info?.profit_sar_per_ton, " رس/طن")}</b>
        </div>
        <div>
          🏗️ تكلفة المعالجة: <b>{fmt(info?.treatment_cost_sar_per_ton, " رس/طن")}</b>
        </div>
      </div>

      {info?.rating && (
        <div className="text-sm text-gray-500">
          Rating: <b>{info.rating}</b>
        </div>
      )}
    </div>
  )
}

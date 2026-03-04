import MethodDetails from "./MethodDetails"

const KB: Record<string, any> = {
  "asphalt/concrete filler": {
    summary:
      "Using SBE as filler or additive in asphalt/concrete to reduce waste and replace part of virgin aggregates.",
    environmental: "Good — reduces landfill waste and replaces part of virgin materials.",
    economic: "Moderate — requires collection, drying, and grinding before mixing, but materials are cheap.",
    practical: "Moderate — feasible for construction plants but needs ratio control to maintain strength.",
    rating: "Excellent",
    co2_reduction_ton: 3.2,
    profit_sar_per_ton: 866,
    treatment_cost_sar_per_ton: 285,
  },
  "thermal + acid": {
    summary: "Combined calcination then acid activation to maximize performance.",
    environmental: "Very good — high performance and reuse potential.",
    economic: "Moderate — combined steps raise opex; value higher.",
    practical: "Moderate — multi-step line & QA.",
    rating: "Excellent",
    co2_reduction_ton: 3.0,
    profit_sar_per_ton: 820,
    treatment_cost_sar_per_ton: 340,
  },
  pyrolysis: {
    summary: "Thermal cracking in low-oxygen to produce pyro-oil/gas and recover carbonaceous solid.",
    environmental: "Good — valorizes residual hydrocarbons; requires off-gas cleaning.",
    economic: "Moderate — capex of reactor; revenue from pyro-oil depends on specs.",
    practical: "Moderate — needs reactor control and downstream separation.",
    rating: "Good",
    co2_reduction_ton: 2.3,
    profit_sar_per_ton: 520,
    treatment_cost_sar_per_ton: 260,
  },
  calcination: {
    summary: "High-temperature treatment to burn off residual oil and reactivate clay for reuse.",
    environmental: "Good — enables reuse; energy intensity must be managed.",
    economic: "Moderate — fuel cost vs. savings from reactivated clay.",
    practical: "Moderate — standard kilns; QC on surface area/pH.",
    rating: "Good",
    co2_reduction_ton: 2.0,
    profit_sar_per_ton: 480,
    treatment_cost_sar_per_ton: 240,
  },
  "ceramic/membrane support": {
    summary: "Use calcined/processed SBE as ceramic support or membrane substrate in filtration/adsorption systems.",
    environmental: "Very good — turns waste into durable industrial products.",
    economic: "Low to Moderate — higher processing temperatures and shaping steps increase capex/opex.",
    practical: "Low — needs specialized kilns and QA to meet mechanical specs.",
    rating: "Good",
    co2_reduction_ton: 2.8,
    profit_sar_per_ton: 742,
    treatment_cost_sar_per_ton: 320,
  },
  "hexane/organic solvents": {
    summary: "Solvent extraction of residual oil, followed by solvent recovery and oil valorization (e.g., biodiesel).",
    environmental: "Good — recovers oil; must handle VOCs/solvent losses safely.",
    economic: "Moderate — solvent recovery unit adds cost; oil revenue helps.",
    practical: "Moderate — needs ATEX-safe equipment and solvent management.",
    rating: "Good",
    co2_reduction_ton: 2.5,
    profit_sar_per_ton: 600,
    treatment_cost_sar_per_ton: 300,
  },
  "supercritical co₂": {
    summary: "Oil extraction using supercritical CO₂; clean solvent with high selectivity.",
    environmental: "Very good — no persistent organic solvent; low residues.",
    economic: "Lower to Moderate — higher capex/pressure equipment.",
    practical: "Low to Moderate — specialized high-pressure systems.",
    rating: "Good",
    co2_reduction_ton: 2.6,
    profit_sar_per_ton: 610,
    treatment_cost_sar_per_ton: 360,
  },
  "acid activation/leaching": {
    summary: "Chemical activation to increase surface area/active sites for reuse as adsorbent.",
    environmental: "Good — enables reuse; must manage acid/effluent.",
    economic: "Moderate — chemicals and neutralization cost.",
    practical: "Moderate — standard wet-chem processing and rinsing.",
    rating: "Good",
    co2_reduction_ton: 2.1,
    profit_sar_per_ton: 500,
    treatment_cost_sar_per_ton: 220,
  },
  "salt activation": {
    summary: "Thermo-chemical salt activation to modify pore structure and acidity.",
    environmental: "Good — tailored properties; salt waste management needed.",
    economic: "Moderate — salts/thermal cycles cost.",
    practical: "Moderate — controlled heating and washing.",
    rating: "Fair",
    co2_reduction_ton: 1.9,
    profit_sar_per_ton: 420,
    treatment_cost_sar_per_ton: 210,
  },
  "solvent + thermal/chemical": {
    summary: "Hybrid flow: solvent oil recovery then thermal/chemical reactivation.",
    environmental: "Very good — recovers oil and reuses clay.",
    economic: "Good — dual value streams (oil + reactivated solid).",
    practical: "Moderate — integration complexity.",
    rating: "Excellent",
    co2_reduction_ton: 3.1,
    profit_sar_per_ton: 840,
    treatment_cost_sar_per_ton: 350,
  },
}

function normLabel(x: any) {
  const s = (x ?? "").toString().trim()
  return s
}

function normKey(x: any) {
  return normLabel(x).toLowerCase()
}

function toNum(x: any, def = 0) {
  const n = typeof x === "number" ? x : Number.parseFloat(String(x))
  return Number.isFinite(n) ? n : def
}

function toPct(prob: any) {
  const p = toNum(prob, 0)
  const clamped = Math.max(0, Math.min(1, p))
  return `${Math.round(clamped * 100)}%`
}

function confLabel(prob: any) {
  const p = toNum(prob, Number.NaN)
  if (!Number.isFinite(p)) return "N/A"
  if (p >= 0.8) return "Excellent"
  if (p >= 0.6) return "Good"
  if (p >= 0.4) return "Fair"
  return "Low"
}

function enrich(label: any, infoFromApi?: any) {
  const k = normKey(label)
  const base = KB[k] || {}
  return { ...base, ...(infoFromApi || {}) }
}

function extractTop3(data: any): Array<{ label: string; prob: number; info?: any; confidence_label?: string }> {
  if (!data) return []

  // 1) If top3_enriched exists from server
  if (Array.isArray(data.top3_enriched) && data.top3_enriched.length) {
    return data.top3_enriched.map((x: any) => ({
      label: normLabel(x.label),
      prob: toNum(x.prob, 0),
      info: enrich(x.label, x.info),
      confidence_label: x.confidence_label || confLabel(x.prob),
    }))
  }

  // 2) Fallback: top3_classes
  if (Array.isArray(data.top3_classes) && data.top3_classes.length) {
    return data.top3_classes.map((x: any) => ({
      label: normLabel(x.label),
      prob: toNum(x.prob, 0),
      info: enrich(x.label),
      confidence_label: confLabel(x.prob),
    }))
  }

  // 3) Last resort: use best method only
  if (data.best_processing_method) {
    return [
      {
        label: normLabel(data.best_processing_method),
        prob: toNum(data.predicted_prob, 0),
        info: enrich(data.best_processing_method, data.method_info),
        confidence_label: data.confidence_label || confLabel(data.predicted_prob),
      },
    ]
  }

  return []
}

function Card({ item, idx, lang }: { item: any; idx: number; lang: "ar" | "en" }) {
  const pct = toPct(item.prob)
  const info = item.info || {}
  const method = item.label || `Method #${idx + 1}`
  const cl = item.confidence_label || confLabel(item.prob)
  const isArabic = lang === "ar"

  const content = {
    ar: {
      probability: "الاحتمالية",
      confidence: "الثقة",
      co2Reduction: "تقليل CO₂",
      profit: "الربح",
      cost: "التكلفة",
      rating: "التقييم",
      tons: "طن",
      perTon: "للطن",
    },
    en: {
      probability: "Probability",
      confidence: "Confidence",
      co2Reduction: "CO₂ Reduction",
      profit: "Profit",
      cost: "Cost",
      rating: "Rating",
      tons: "tons",
      perTon: "per ton",
    },
  }

  const t = content[lang]

  return (
    null
  )
}

export default function Top3Methods({ data, lang = "ar" }: { data: any; lang?: "ar" | "en" }) {
  const list = extractTop3(data)
  if (!list.length) return null

  const isArabic = lang === "ar"

  const content = {
    ar: {
      title: "أفضل 3 طرق معالجة",
    },
    en: {
      title: "Top 3 Processing Methods",
    },
  }

  const t = content[lang]

  return (
    <div className={`space-y-6 ${isArabic ? "rtl" : "ltr"}`} dir={isArabic ? "rtl" : "ltr"}>
      
      <div className="grid gap-6">
        {list.map((item, idx) => (
          <Card key={idx} item={item} idx={idx} lang={lang} />
        ))}
      </div>
    </div>
  )
}

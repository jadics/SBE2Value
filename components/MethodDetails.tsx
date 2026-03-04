// 1) الداتا الثابتة (بدون API)
// ملاحظة: وفّرت عربي جزئيًا في الوصف؛ إن ما توفر ترجمة، راح يطيح تلقائيًا للإنجليزي.
const METHOD_DESCRIPTIONS: Record<
  string,
  {
    en: { Description: string; Environmental: string; Economic: string; Practical: string }
    ar?: { Description?: string; Environmental?: string; Economic?: string; Practical?: string }
    // مرادفات/أسماء بديلة للمطابقة المرنة
    aliases?: string[]
  }
> = {
  "Asphalt/Concrete Filler": {
    en: {
      Description: "Using SBE as filler or additive in asphalt/concrete to reduce waste.",
      Environmental: "Good — reduces landfill waste and replaces part of virgin materials.",
      Economic: "Moderate — requires collection, drying, and grinding before mixing, but materials are cheap.",
      Practical: "Moderate — feasible for construction plants but needs ratio control to maintain strength.",
    },
    ar: {
      Description: "استخدام SBE كحشوة/مضاف في الأسفلت أو الخرسانة لتقليل الهدر.",
      Environmental: "جيدة — تقلّل نفايات الدفن وتستبدل جزءًا من المواد البِكر.",
      Economic: "متوسطة — يلزم التجفيف والطحن، لكن المواد رخيصة.",
      Practical: "متوسطة — مناسبة لمصانع الخلط مع ضبط النِّسب.",
    },
    aliases: ["asphalt", "asphalt filler", "asphalt/concrete", "asphalt concrete filler"],
  },
  "Ceramic/Membrane Support": {
    en: {
      Description: "Transforming SBE into ceramic supports or membranes.",
      Environmental: "Very good — turns waste into durable industrial products.",
      Economic: "Moderate to low — requires high temperatures and precise shaping.",
      Practical: "Low — needs specialized thermal equipment, suitable for pilot-scale use.",
    },
    ar: {
      Description: "تحويل SBE إلى دعامات خزفية أو أغشية.",
      Environmental: "ممتازة — تحوّل النفايات إلى منتجات صناعية متينة.",
      Economic: "متوسطة إلى منخفضة — تتطلب درجات حرارة عالية وتشكيل دقيق.",
      Practical: "منخفضة — تحتاج معدات حرارية متخصصة، مناسبة للاستخدام التجريبي.",
    },
    aliases: ["ceramic", "membrane", "ceramic support", "membrane support"],
  },
  Incineration: {
    en: {
      Description: "Burning SBE to remove oil residues and reduce pollutants.",
      Environmental: "Moderate — removes pollutants but emits CO₂ if gases are not treated.",
      Economic: "Low — high energy demand with limited product value.",
      Practical: "Good — simple technology, can be implemented using standard furnaces.",
    },
    ar: {
      Description: "حرق SBE لإزالة بقايا الزيت وتقليل الملوثات.",
      Environmental: "متوسطة — تزيل الملوثات لكن تنبعث CO₂ إذا لم تُعالج الغازات.",
      Economic: "منخفضة — استهلاك طاقة عالٍ مع قيمة محدودة للمنتج.",
      Practical: "جيدة — تقنية بسيطة، يمكن تطبيقها باستخدام أفران قياسية.",
    },
    aliases: ["burning", "combustion"],
  },
  Pyrolysis: {
    en: {
      Description: "Heating SBE in the absence of oxygen to recover oil and renew clay.",
      Environmental: "Good — limited emissions and potential to recover oil as fuel.",
      Economic: "Moderate — equipment costs are offset partly by recovered oil.",
      Practical: "Moderate — requires controlled heating under inert gas (N₂ or CO₂).",
    },
    ar: {
      Description: "تسخين دون أكسجين لاسترجاع الزيت وتجديد الطين.",
      Environmental: "جيدة — انبعاثات محدودة وإمكانية استرجاع الزيت كوقود.",
      Economic: "متوسطة — تكاليف المعدات تُعوَّض جزئيًا بالزيت المسترجع.",
      Practical: "متوسطة — تتطلب تسخينًا مُتحكَّمًا تحت غاز خامل (N₂ أو CO₂).",
    },
    aliases: ["thermal cracking", "anaerobic heating"],
  },
  Calcination: {
    en: {
      Description: "Controlled heating to remove organics and reactivate clay structure.",
      Environmental: "Good — removes residual organics and renews the clay's structure.",
      Economic: "Moderate to low — energy-intensive process.",
      Practical: "Moderate — applicable in industrial setups with furnaces.",
    },
    ar: {
      Description: "تسخين مُتحكَّم لإزالة العضويات وتنشيط البنية.",
      Environmental: "جيدة — تزيل العضويات المتبقية وتجدد بنية الطين.",
      Economic: "متوسطة إلى منخفضة — عملية كثيفة الطاقة.",
      Practical: "متوسطة — قابلة للتطبيق في المنشآت الصناعية التي تحتوي على أفران.",
    },
    aliases: ["re-activation", "calcine"],
  },
  "Hexane/Organic Solvents": {
    en: {
      Description: "Dissolving residual oil using organic solvents like hexane.",
      Environmental: "Good — reduces oil pollution but requires safe solvent management.",
      Economic: "Moderate — solvents can be recovered, lowering long-term costs.",
      Practical: "Moderate — widely known technique but needs sealed systems.",
    },
    ar: {
      Description: "استخلاص الزيت بمذيبات عضوية مثل الهكسان.",
      Environmental: "جيدة — تقلل تلوث الزيت لكن تتطلب إدارة آمنة للمذيبات.",
      Economic: "متوسطة — يمكن استرجاع المذيبات، مما يقلل التكاليف طويلة الأجل.",
      Practical: "متوسطة — تقنية معروفة لكن تحتاج أنظمة مغلقة.",
    },
    aliases: ["hexane", "organic solvents", "solvent extraction (hexane)"],
  },
  "Supercritical CO₂": {
    en: {
      Description: "Eco-friendly extraction under high temperature/pressure.",
      Environmental: "Excellent — green process without toxic solvents.",
      Economic: "Low to moderate — high cost of pressurized equipment.",
      Practical: "Low — requires expertise and strict control of temperature and pressure.",
    },
    ar: {
      Description: "استخلاص صديق للبيئة بضغط/حرارة مرتفعين دون مذيبات سامة.",
      Environmental: "ممتازة — عملية خضراء بدون مذيبات سامة.",
      Economic: "منخفضة إلى متوسطة — تكلفة عالية للمعدات المضغوطة.",
      Practical: "منخفضة — تتطلب خبرة وتحكمًا صارمًا في درجة الحرارة والضغط.",
    },
    aliases: ["scCO2", "supercritical co2", "co2 extraction"],
  },
  "Acid Activation/Leaching": {
    en: {
      Description: "Reactivation using acids (H₂SO₄/HCl) to restore adsorptive power.",
      Environmental: "Moderate — saves raw materials but generates acidic wastewater.",
      Economic: "Moderate — acids are cheap, but waste treatment adds cost.",
      Practical: "Good — simple, effective, and used at lab or plant scale.",
    },
    ar: {
      Description: "تنشيط/إذابة بالأحماض لإعادة قدرة الامتزاز.",
      Environmental: "متوسطة — توفر المواد الخام لكن تولد مياه صرف حمضية.",
      Economic: "متوسطة — الأحماض رخيصة، لكن معالجة النفايات تضيف تكلفة.",
      Practical: "جيدة — بسيطة وفعالة، تُستخدم في المختبر أو المصنع.",
    },
    aliases: ["acid activation", "acid leaching"],
  },
  "Salt Activation": {
    en: {
      Description: "Reactivation using salts with lower pollution risk.",
      Environmental: "Good — avoids acid waste and reuses the clay safely.",
      Economic: "Moderate — salts are affordable and less corrosive.",
      Practical: "Moderate — simpler to perform with mild heating.",
    },
    ar: {
      Description: "تنشيط بالأملاح مع مخاطر تلوث أقل.",
      Environmental: "جيدة — تتجنب نفايات الأحماض وتعيد استخدام الطين بأمان.",
      Economic: "متوسطة — الأملاح ميسورة التكلفة وأقل تآكلًا.",
      Practical: "متوسطة — أبسط في التنفيذ مع تسخين خفيف.",
    },
    aliases: ["salt reactivation"],
  },
  "Thermal + Acid": {
    en: {
      Description: "Sequential heating and acid treatment for enhanced regeneration.",
      Environmental: "Good — high regeneration with manageable emissions if treated.",
      Economic: "Moderate — two-step adds cost but yields high-quality adsorbent.",
      Practical: "Moderate — requires furnace and acid-handling capability.",
    },
    ar: {
      Description: "تسخين يليه معالجة حمضية لرفع التجديد.",
      Environmental: "جيدة — تجديد عالٍ مع انبعاثات قابلة للإدارة إذا عُولجت.",
      Economic: "متوسطة — الخطوتان تضيفان تكلفة لكن تنتج ممتزًا عالي الجودة.",
      Practical: "متوسطة — تتطلب فرنًا وقدرة على التعامل مع الأحماض.",
    },
    aliases: ["thermal and acid", "heat + acid"],
  },
  "Solvent + Thermal/Chemical": {
    en: {
      Description: "Combining solvent extraction with thermal/chemical regeneration.",
      Environmental: "Good — maximizes oil recovery then regenerates clay.",
      Economic: "Moderate — staged CAPEX with value from recovered oil and renewed adsorbent.",
      Practical: "Moderate — needs solvent unit plus kiln/reactor.",
    },
    ar: {
      Description: "مزيج الاستخلاص بالمذيب مع التجديد الحراري/الكيميائي.",
      Environmental: "جيدة — تعظّم استرجاع الزيت ثم تجدد الطين.",
      Economic: "متوسطة — استثمار مرحلي مع قيمة من الزيت المسترجع والممتز المجدد.",
      Practical: "متوسطة — تحتاج وحدة مذيبات بالإضافة إلى فرن/مفاعل.",
    },
    aliases: ["solvent + thermal", "solvent then thermal", "solvent + chemical"],
  },
}

// 2) أدوات مساعدة: تطبيع الاسم + مطابقة مرنة
function normalizeName(s?: string) {
  return (s || "")
    .toLowerCase()
    .replace(/[^\w\u0600-\u06FF+/]+/g, " ") // إزالة الرموز الغريبة مع إبقاء العربية و+
    .replace(/\s+/g, " ")
    .trim()
}

function resolveMethodKey(inputName: string): string | null {
  const n = normalizeName(inputName)

  // مطابقة مباشرة على المفاتيح
  for (const key of Object.keys(METHOD_DESCRIPTIONS)) {
    if (normalizeName(key) === n) return key
  }
  // مطابقة مرادفات
  for (const [key, val] of Object.entries(METHOD_DESCRIPTIONS)) {
    const aliases = val.aliases || []
    if (aliases.some((a) => normalizeName(a) === n)) return key
  }
  // مطابقة احتوائية مرنة (asphalt ⊂ asphalt/concrete filler)
  for (const key of Object.keys(METHOD_DESCRIPTIONS)) {
    if (normalizeName(key).includes(n) || n.includes(normalizeName(key))) return key
  }
  return null
}

import { Leaf, DollarSign, Settings, FileText } from "lucide-react"

// 3) كومبوننت العرض
export default function MethodDetails({
  methodName,
  lang = "ar",
}: {
  methodName: string // يجب أن يكون اسم الطريقة الحقيقي (ليس "Method #1")
  lang?: "ar" | "en"
}) {
  const key = resolveMethodKey(methodName)
  if (!key) return null

  const pack = METHOD_DESCRIPTIONS[key]
  const t =
    lang === "ar"
      ? {
          Description: pack.ar?.Description || pack.en.Description,
          Environmental: pack.ar?.Environmental || pack.en.Environmental,
          Economic: pack.ar?.Economic || pack.en.Economic,
          Practical: pack.ar?.Practical || pack.en.Practical,
          labels: {
            desc: "وصف الطريقة",
            env: "تأثير الطريقة بيئيًا:",
            eco: "تأثير الطريقة اقتصاديًا:",
            prac: "تأثير الطريقة عمليًا:",
            method: "الطريقة",
          },
        }
      : {
          Description: pack.en.Description,
          Environmental: pack.en.Environmental,
          Economic: pack.en.Economic,
          Practical: pack.en.Practical,
          labels: { desc: "Description", env: "Environmental", eco: "Economic", prac: "Practical", method: "Method" },
        }

  return (
    <div className="mt-4 space-y-3">
      {/* Description Section with gradient background */}
      <div className="rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 p-4 border border-blue-100">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 p-2 rounded-lg bg-white shadow-sm">
            <FileText className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-semibold text-blue-900 mb-1">{t.labels.desc}</div>
            <div className="text-sm text-slate-700 leading-relaxed">{t.Description}</div>
          </div>
        </div>
      </div>

      {/* Three Aspects Grid with individual colored cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Environmental */}
        <div className="rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 p-4 border border-green-100">
          <div className="flex items-start gap-2 mb-2">
            <div className="p-1.5 rounded-lg bg-white shadow-sm">
              <Leaf className="w-4 h-4 text-green-600" />
            </div>
            <div className="text-sm font-semibold text-green-900">
              {lang === "ar" ? (
                <>
                  تأثير الطريقة <span className="font-bold">بيئيًا:</span>
                </>
              ) : (
                t.labels.env
              )}
            </div>
          </div>
          <div className="text-sm text-slate-700 leading-relaxed">{t.Environmental}</div>
        </div>

        {/* Economic */}
        <div className="rounded-xl bg-gradient-to-br from-amber-50 to-yellow-50 p-4 border border-amber-100">
          <div className="flex items-start gap-2 mb-2">
            <div className="p-1.5 rounded-lg bg-white shadow-sm">
              <DollarSign className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-sm font-semibold text-amber-900">
              {lang === "ar" ? (
                <>
                  تأثير الطريقة <span className="font-bold">اقتصاديًا:</span>
                </>
              ) : (
                t.labels.eco
              )}
            </div>
          </div>
          <div className="text-sm text-slate-700 leading-relaxed">{t.Economic}</div>
        </div>

        {/* Practical */}
        <div className="rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 p-4 border border-purple-100">
          <div className="flex items-start gap-2 mb-2">
            <div className="p-1.5 rounded-lg bg-white shadow-sm">
              <Settings className="w-4 h-4 text-purple-600" />
            </div>
            <div className="text-sm font-semibold text-purple-900">
              {lang === "ar" ? (
                <>
                  تأثير الطريقة <span className="font-bold">عمليًا:</span>
                </>
              ) : (
                t.labels.prac
              )}
            </div>
          </div>
          <div className="text-sm text-slate-700 leading-relaxed">{t.Practical}</div>
        </div>
      </div>
    </div>
  )
}

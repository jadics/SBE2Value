"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  ArrowLeft,
  Globe,
  Leaf,
  TreePine,
  Factory,
  Award,
  Upload,
  FileText,
  Download,
  Recycle,
  Trash2,
  CloudOff,
  Car,
} from "lucide-react"
import { useRouter } from "next/navigation"

const API = "https://unfortuitous-reclivate-kalel.ngrok-free.dev"

async function isAlive() {
  try {
    const r = await fetch("/api/forecast-batch/ping")
    return r.ok
  } catch {
    return false
  }
}

export default function EnvironmentalImpactPage() {
  const router = useRouter()
  const [lang, setLang] = useState<"ar" | "en">(
    () => (typeof window !== "undefined" ? (localStorage.getItem("sbe2value-lang") as "ar" | "en") : null) || "ar",
  )
  const isArabic = lang === "ar"

  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [rows, setRows] = useState<any[] | null>(null)

  const content = {
    ar: {
      title: "الأثــــر البيــئي",
      subtitle1: "نحو صناعة أكثر استدامة!",
      subtitle2a: "بالأرقام والتأثير الحقيقي الذي نطمح إليه. خلال عامٍ واحد من تشغيل منصة SBE2Value،",
      subtitle2b: "نتوقع تحقيق أثر إيجابي ملموس على البيئة والصناعة في المملكة.",
      uploadTitle: "رفع ملف البيانات",
      uploadSubtitle: "قم برفع ملف Excel أو CSV يحتوي على بيانات الأثر البيئي",
      uploadButton: "اختر ملفًا",
      uploadDragDrop: "أو اسحب الملف وأفلته هنا",
      fileSelected: "الملف المحدد:",
      removeFile: "إزالة الملف",
      supportedFormats: "الصيغ المدعومة: Excel (.xlsx, .xls), CSV (.csv)",
      uploadFile: "رفع الملف",
      uploading: "جاري الرفع...",
      uploadSuccessMsg: "تم رفع الملف بنجاح!",
      uploadErrorMsg: "خطأ في رفع الملف. الرجاء المحاولة مرة أخرى.",
      invalidFileType: "نوع الملف غير مدعوم. الرجاء رفع ملف Excel أو CSV فقط.",
      totalImpact: "يُنتج العالم ما يقارب 2.5 مليون طن من مخلفات التبييض (SBE) سنويًا!",
      co2Reduced: "انبعاثات CO₂ تم تقليلها",
      tons: "طن",
      treesEquivalent: "ما يعادل زراعة الأشجار",
      trees: "شجرة",
      wasteRecycled: "كمية النفايات المعاد تدويرها (SBE)",
      energySaved: "الطاقة التي تم توفيرها",
      mwh: "ميجاواط/ساعة",
      waterSaved: "المياه التي تم حفظها",
      liters: "لتر",
      landfillAvoided: "النفايات التي تم تجنّب دفنها",
      achievements: "الإنجازات المتوقعة في السنة الأولى",
      achievement1: "إعادة تدوير أكثر من 2,000 طن من بودرة التبييض المستهلكة (SBE)",
      achievement2: "فض أكثر من 300 طن من انبعاثات CO₂",
      achievement3: "تحقيق ما يعادل زراعة 7,000 شجرة",
      achievement4: "شراكة مع أكثر من 20 مصنع وشركة معالجة",
      sdgAlignment: "التوافق مع أهداف التنمية المستدامة (SDGs) بناء على رؤية السعودية",
      sdg7: "الطاقة النظيفة وبأسعار معقولة",
      sdg7Desc: "من خلال إنتاج وقود حيوي محلي منخفض الانبعاثات.",
      sdg9: "الصناعة والابتكار والتقنيات التحتية",
      sdg9Desc: "تطوير نموذج صناعي ذكي ومستدام.",
      sdg12: "الاستهلاك والإنتاج المسؤولان",
      sdg12Desc: "تحويل النفايات إلى موارد قيمة.",
      sdg13: "العمل المناخي",
      sdg13Desc: "تقليل الانبعاثات الكربونية ودعم الاقتصاد الأخضر.",
      sdg15: "الحياة في البر",
      sdg15Desc: "تقليل تلوث التربة والنفايات المدفونة.",
      sdg17: "عقد الشراكات لتحقيق الأهداف",
      sdg17Desc: "تعزيز التعاون بين المصانع وشركات المعالجة.",
      back: "رجوع",
      energyEquivalent: "تكفي لتشغيل 1,200 منزل سنويًا",
      waterEquivalent: "تعادل استهلاك 2,300 شخص سنويًا",
      wasteEquivalent: "نفايات صناعية حُوّلت إلى موارد ذات قيمة",
      closingTitle: "الأثر البيئي ليس وعدًا، بل رؤية قابلة للقياس.",
      closingMessage:
        "مع كل دفعة SBE تتم معالجتها عبر SBE2Value، نقترب خطوة من اقتصاد صناعي أكثر كفاءة، وبيئة أكثر نقاءً، ومستقبل أكثر استدامة.",
    },
    en: {
      title: "Environmental Impact",
      subtitle1: "Towards a more sustainable industry!",
      subtitle2a: "With real numbers and impact we aspire to achieve. Within one year of operating SBE2Value platform,",
      subtitle2b: "we expect to achieve tangible positive impact on the environment and industry in the Kingdom.",
      uploadTitle: "Upload Data File",
      uploadSubtitle: "Upload an Excel or CSV file containing environmental impact data",
      uploadButton: "Choose File",
      uploadDragDrop: "or drag and drop file here",
      fileSelected: "Selected File:",
      removeFile: "Remove File",
      supportedFormats: "Supported formats: Excel (.xlsx, .xls), CSV (.csv)",
      uploadFile: "Upload File",
      uploading: "Uploading...",
      uploadSuccessMsg: "File uploaded successfully!",
      uploadErrorMsg: "Error uploading file. Please try again.",
      invalidFileType: "Unsupported file type. Please upload Excel or CSV files only.",
      totalImpact: "The world produces approximately 2.5 million tons of Spent Bleaching Earth (SBE) waste annually!",
      co2Reduced: "CO₂ Emissions Reduced",
      tons: "tons",
      treesEquivalent: "Equivalent to Planting Trees",
      trees: "trees",
      wasteRecycled: "SBE Waste Recycled",
      energySaved: "Energy Saved",
      mwh: "MWh",
      waterSaved: "Water Conserved",
      liters: "liters",
      landfillAvoided: "Waste Diverted from Landfill",
      achievements: "Expected Achievements in First Year",
      achievement1: "Recycled over 2,000 tons of spent bleaching earth (SBE)",
      achievement2: "Reduced over 300 tons of CO₂ emissions",
      achievement3: "Equivalent to planting 7,000 trees",
      achievement4: "Partnership with over 20 factories and processing companies",
      sdgAlignment: "Alignment with SDGs based on Saudi Vision",
      sdg7: "Affordable and Clean Energy",
      sdg7Desc: "Through local low-emission biofuel production.",
      sdg9: "Industry, Innovation and Infrastructure",
      sdg9Desc: "Developing a smart and sustainable industrial model.",
      sdg12: "Responsible Consumption and Production",
      sdg12Desc: "Converting waste into valuable resources.",
      sdg13: "Climate Action",
      sdg13Desc: "Reducing carbon emissions and supporting green economy.",
      sdg15: "Life on Land",
      sdg15Desc: "Reducing soil pollution and landfill waste.",
      sdg17: "Partnerships for the Goals",
      sdg17Desc: "Strengthening cooperation between factories and processing companies.",
      back: "Back",
      energyEquivalent: "Enough to power 1,200 homes annually",
      waterEquivalent: "Equivalent to consumption of 2,300 people annually",
      wasteEquivalent: "Industrial waste converted to valuable resources",
      closingTitle: "Environmental impact is not a promise, but a measurable vision.",
      closingMessage:
        "With every SBE batch processed through SBE2Value, we move one step closer to a more efficient industrial economy, a cleaner environment, and a more sustainable future.",
    },
  }

  const t = content[lang]

  const achievements = [
    { icon: Factory, text: t.achievement1, color: "text-[#1FC1DF]" },
    { icon: Leaf, text: t.achievement2, color: "text-green-600" },
    { icon: TreePine, text: t.achievement3, color: "text-emerald-600" },
    { icon: Award, text: t.achievement4, color: "text-amber-600" },
  ]

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      const validTypes = [
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "text/csv",
      ]
      if (validTypes.includes(selectedFile.type) || selectedFile.name.match(/\.(xlsx|xls|csv)$/i)) {
        setFile(selectedFile)
        setError(null)
        setRows(null)
      } else {
        alert(t.invalidFileType)
      }
    }
  }

  const handleRemoveFile = () => {
    setFile(null)
    setError(null)
    setRows(null)
  }

  const onUpload = async () => {
    if (!file) return alert(isArabic ? "حمّل ملف CSV/Excel أولاً" : "Please upload a CSV/Excel file first")
    setLoading(true)
    setError(null)
    try {
      const fd = new FormData()
      fd.append("file", file)

      const res = await fetch("/api/forecast-batch", {
        method: "POST",
        body: fd,
      })

      const data = await res.json().catch(() => null)
      console.log("Forecast response:", data)

      if (!res.ok) {
        const msg = data && data.detail ? data.detail : "فشل تحليل الملف"
        setRows(null)
        setError(msg)
        console.error("Forecast error:", msg)
        return
      }

      if (!Array.isArray(data) || data.length === 0) {
        setRows(null)
        setError("لم تصل نتائج من الخادم")
        console.error("Forecast error:", "Empty or invalid response")
        return
      }

      setRows(data)
    } catch (err) {
      console.error("Network/Parsing error:", err)
      setRows(null)
      setError("حدث خطأ غير متوقع أثناء تحليل الملف")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 ${isArabic ? "rtl" : "ltr"}`}
      dir={isArabic ? "rtl" : "ltr"}
    >
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" onClick={() => router.push("/login")} className="gap-2">
            <ArrowLeft className={`w-4 h-4 ${isArabic ? "rotate-180" : ""}`} />
            {t.back}
          </Button>
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
      </header>

      {/* Content */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mx-auto">
              <Leaf className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900">{t.title}</h1>
            <div className="text-lg text-slate-600 max-w-3xl mx-auto space-y-2">
              <p className="text-pretty">{t.subtitle1}</p>
              <p className="text-pretty">{t.subtitle2a}</p>
              <p className="text-pretty">{t.subtitle2b}</p>
            </div>
          </div>

          {/* Impact Metrics Grid */}
          <div className="space-y-12">
            <div className="text-center space-y-4 max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 leading-relaxed md:text-3xl">
                {t.totalImpact}
                <p className="text-xl md:text-2xl text-slate-700 leading-relaxed">
                  {isArabic
                    ? "فقط 25٪ من هذه الكمية يتم إعادة تدويرها أو استغلالها حاليًا."
                    : "Only 25% of this amount is currently recycled or utilized."}
                </p>
              </h2>
            </div>

            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-slate-900 text-center">
                {isArabic ? "الأثر السنوي لإعادة التدوير" : "Annual Recycling Impact"}
              </h3>

              <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {/* SBE Recycled */}
                <Card className="p-8 bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                      <Recycle className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-slate-600">
                        {isArabic ? "كمية SBE المُعاد تدويرها" : "Amount of SBE Recycled"}
                      </p>
                      <p className="text-3xl font-bold text-slate-900">
                        {isArabic ? "625,000 - 1,200,000" : "625,000 - 1,200,000"}
                      </p>
                      <p className="text-sm text-slate-600">{isArabic ? "طن سنويًا" : "tons annually"}</p>
                    </div>
                  </div>
                </Card>

                {/* Landfill Avoided */}
                <Card className="p-8 bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                      <Trash2 className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-slate-600">
                        {isArabic ? "كمية SBE المُتجنّب دفنها" : "SBE Diverted from Landfills"}
                      </p>
                      <p className="text-lg font-semibold text-slate-900 leading-snug">
                        {isArabic
                          ? "نفس الكمية أعلاه، ما يعني تقليل الأثر البيئي مباشرة"
                          : "Same as above, directly reducing environmental impact"}
                      </p>
                    </div>
                  </div>
                </Card>

                {/* CO2 Emissions */}
                <Card className="p-8 bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center">
                      <CloudOff className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-slate-600">
                        {isArabic ? "انبعاثات CO₂e المُخفَّضة" : "CO₂e Emissions Reduced"}
                      </p>
                      <p className="text-3xl font-bold text-slate-900">
                        {isArabic ? "250,000 - 960,000" : "250,000 - 960,000"}
                      </p>
                      <p className="text-sm text-slate-600">{isArabic ? "طن CO₂e سنويًا" : "tons CO₂e annually"}</p>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="max-w-3xl mx-auto">
                <div className="flex items-center justify-center gap-3 text-slate-600 text-center">
                  <Car className="w-5 h-5 flex-shrink-0" />
                  <p className="text-base leading-relaxed">
                    {isArabic
                      ? "أي ما يُعادل الانبعاثات الناتجة عن أكثر من 200,000 سيارة على الطريق سنويًا"
                      : "Equivalent to emissions from over 200,000 cars on the road annually"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* File Upload Section */}
          <div className="space-y-6">
            <div className="text-center max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold text-slate-900 mb-3 md:text-2xl">
                {isArabic
                  ? "جرّب تقنية التنبؤ المدربة من فريق SBE2Value لتظهر لك نتائج أثرك السنوي!"
                  : "Try the prediction technology trained by the SBE2Value team to show you your annual impact results!"}
              </h3>
            </div>

            <Card className="p-8 bg-white/80 backdrop-blur-sm border-[#1FC1DF]/20">
              <div className="space-y-6">
                <div className={`flex items-center gap-3 ${isArabic ? "flex-row-reverse text-right" : ""}`}>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1FC1DF]/10 to-[#2896DD]/10 flex items-center justify-center">
                    <Upload className="w-6 h-6 text-[#1FC1DF]" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      {isArabic ? "رفع وتحليل البيانات" : "Upload and Analyze Data"}
                    </h2>
                    <p className="text-sm text-slate-600">{t.uploadSubtitle}</p>
                  </div>
                </div>

                {!file ? (
                  <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-[#1FC1DF] transition-colors">
                    <input
                      type="file"
                      id="file-upload"
                      accept=".xlsx,.xls,.csv"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <div className="space-y-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1FC1DF]/10 to-[#2896DD]/10 flex items-center justify-center mx-auto">
                          <FileText className="w-8 h-8 text-[#1FC1DF]" />
                        </div>
                        <div>
                          <Button
                            type="button"
                            className="bg-gradient-to-r from-[#1FC1DF] to-[#2896DD] hover:opacity-90"
                          >
                            {isArabic ? "اختر ملف" : "Choose File"}
                          </Button>
                          <p className="text-sm text-slate-500 mt-2">
                            {isArabic ? "أو اسحب الملف وأفلته هنا" : "or drag and drop file here"}
                          </p>
                        </div>
                        <p className="text-xs text-slate-400">
                          {isArabic
                            ? "الصيغ المدعومة: Excel (.xlsx, .xls), CSV (.csv)"
                            : "Supported formats: Excel (.xlsx, .xls), CSV (.csv)"}
                        </p>
                      </div>
                    </label>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {error && (
                      <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
                        <p className="text-red-700 font-semibold">{error}</p>
                      </div>
                    )}

                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center">
                            <FileText className="w-6 h-6 text-green-600" />
                          </div>
                          <div>
                            <p className="text-sm text-slate-600 mb-1">
                              {isArabic ? "الملف المحدد:" : "Selected File:"}
                            </p>
                            <p className="font-semibold text-slate-900">{file.name}</p>
                            <p className="text-xs text-slate-500 mt-1">{(file.size / 1024).toFixed(2)} KB</p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleRemoveFile}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
                          disabled={loading}
                        >
                          {isArabic ? "إزالة الملف" : "Remove File"}
                        </Button>
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <Button
                        onClick={onUpload}
                        disabled={loading}
                        className="bg-gradient-to-r from-[#1FC1DF] to-[#2896DD] hover:opacity-90 px-8"
                      >
                        {loading
                          ? isArabic
                            ? "جاري التحليل…"
                            : "Analyzing..."
                          : isArabic
                            ? "رفع وتحليل"
                            : "Upload and Analyze"}
                      </Button>
                    </div>
                  </div>
                )}

                {rows && rows.length > 0 && (
                  <div className="mt-8 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-slate-900">
                        {isArabic ? "نتائج التحليل" : "Analysis Results"}
                      </h3>
                      <Button
                        onClick={() => console.log("Download CSV")}
                        variant="outline"
                        size="sm"
                        className="gap-2 bg-transparent"
                      >
                        <Download className="w-4 h-4" />
                        {isArabic ? "تحميل CSV" : "Download CSV"}
                      </Button>
                    </div>

                    <div className="overflow-x-auto rounded-xl border border-slate-200">
                      <table className="w-full text-sm">
                        <thead className="bg-gradient-to-r from-[#1FC1DF]/10 to-[#2896DD]/10">
                          <tr>
                            <th className="px-4 py-3 text-left font-semibold text-slate-900">
                              {isArabic ? "السنة" : "Year"}
                            </th>
                            <th className="px-4 py-3 text-left font-semibold text-slate-900">
                              {isArabic ? "الشهر" : "Month"}
                            </th>
                            <th className="px-4 py-3 text-left font-semibold text-slate-900">
                              {isArabic ? "الزيت (لتر)" : "Oil (L)"}
                            </th>
                            <th className="px-4 py-3 text-left font-semibold text-slate-900">
                              {isArabic ? "البودرة (كجم)" : "Powder (kg)"}
                            </th>
                            <th className="px-4 py-3 text-left font-semibold text-slate-900">
                              {isArabic ? "SBE المتوقع" : "Predicted SBE"}
                            </th>
                            <th className="px-4 py-3 text-left font-semibold text-slate-900">
                              {isArabic ? "CO₂ قبل" : "CO₂ Before"}
                            </th>
                            <th className="px-4 py-3 text-left font-semibold text-slate-900">
                              {isArabic ? "COD قبل" : "COD Before"}
                            </th>
                            <th className="px-4 py-3 text-left font-semibold text-green-700">
                              {isArabic ? "CO₂ بعد" : "CO₂ After"}
                            </th>
                            <th className="px-4 py-3 text-left font-semibold text-green-700">
                              {isArabic ? "COD بعد" : "COD After"}
                            </th>
                            <th className="px-4 py-3 text-left font-semibold text-green-700">
                              {isArabic ? "CO₂ موفر" : "CO₂ Avoided"}
                            </th>
                            <th className="px-4 py-3 text-left font-semibold text-green-700">
                              {isArabic ? "COD موفر" : "COD Avoided"}
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white">
                          {rows.map((row, idx) => (
                            <tr key={idx} className="border-t border-slate-100 hover:bg-slate-50">
                              <td className="px-4 py-3">{row.year ?? "-"}</td>
                              <td className="px-4 py-3">{row.month_num ?? "-"}</td>
                              <td className="px-4 py-3">
                                {row.oil_liters_before_processing != null
                                  ? Math.round(row.oil_liters_before_processing)
                                  : "-"}
                              </td>
                              <td className="px-4 py-3">
                                {row.bleaching_powder_kg != null ? Math.round(row.bleaching_powder_kg) : "-"}
                              </td>
                              <td className="px-4 py-3 font-semibold">
                                {row.predicted_SBE != null ? Number(row.predicted_SBE).toFixed(3) : "-"}
                              </td>
                              <td className="px-4 py-3">
                                {row.CO2eq_before_kg != null ? Math.round(row.CO2eq_before_kg) : "-"}
                              </td>
                              <td className="px-4 py-3">
                                {row.COD_before_kg != null ? Math.round(row.COD_before_kg) : "-"}
                              </td>
                              <td className="px-4 py-3 text-green-700">
                                {row.CO2eq_after_kg != null ? Math.round(row.CO2eq_after_kg) : "-"}
                              </td>
                              <td className="px-4 py-3 text-green-700">
                                {row.COD_after_kg != null ? Math.round(row.COD_after_kg) : "-"}
                              </td>
                              <td className="px-4 py-3 font-semibold text-green-700">
                                {row.CO2eq_avoided_kg != null ? Math.round(row.CO2eq_avoided_kg) : "-"}
                              </td>
                              <td className="px-4 py-3 font-semibold text-green-700">
                                {row.COD_avoided_kg != null ? Math.round(row.COD_avoided_kg) : "-"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Achievements */}
          <Card className="p-8 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Award className="w-6 h-6 text-amber-600" />
              {t.achievements}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center flex-shrink-0">
                    <achievement.icon className={`w-6 h-6 ${achievement.color}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-slate-900 font-semibold">{achievement.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* SDG Alignment */}
          <Card className="p-8 bg-white/80 backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              {isArabic
                ? "التوافق مع أهداف التنمية المستدامة (SDGs) بناء على رؤية السعودية"
                : "Alignment with SDGs based on Saudi Vision"}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* SDG Alignment */}

              {/* Circular Economy */}
              <Card className="p-6 hover:shadow-lg transition-shadow bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center flex-shrink-0">
                    <Recycle className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">
                    {isArabic ? "تعزيز الاقتصاد الدائري" : "Promoting Circular Economy"}
                  </h4>
                </div>
              </Card>

              {/* Emissions Reduction */}
              <Card className="p-6 hover:shadow-lg transition-shadow bg-gradient-to-br from-teal-50 to-cyan-50 border-teal-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-teal-600 to-cyan-600 flex items-center justify-center flex-shrink-0">
                    <Leaf className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">
                    {isArabic ? "تقليل الانبعاثات والتلوث البيئي" : "Reducing Emissions and Environmental Pollution"}
                  </h4>
                </div>
              </Card>

              {/* Saudi Green Initiative */}
              <Card className="p-6 hover:shadow-lg transition-shadow bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-600 to-green-700 flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">
                    {isArabic ? "دعم مبادرة السعودية الخضراء" : "Supporting Saudi Green Initiative"}
                  </h4>
                </div>
              </Card>

              {/* Energy Efficiency */}
              <Card className="p-6 hover:shadow-lg transition-shadow bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-600 to-orange-600 flex items-center justify-center flex-shrink-0">
                    <Factory className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">
                    {isArabic
                      ? "تعزيز كفاءة الطاقة والاستخدام الذكي للموارد"
                      : "Enhancing Energy Efficiency and Smart Resource Use"}
                  </h4>
                </div>
              </Card>
            </div>
          </Card>

          {/* Closing Message */}
          <Card className="p-12 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 text-white text-center">
            <div className="max-w-3xl mx-auto space-y-6">
              <Leaf className="w-16 h-16 mx-auto opacity-90" />
              <h3 className="text-2xl md:text-3xl font-bold text-balance">{t.closingTitle}</h3>
              <p className="text-lg md:text-xl text-white/90 leading-relaxed text-balance">{t.closingMessage}</p>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}

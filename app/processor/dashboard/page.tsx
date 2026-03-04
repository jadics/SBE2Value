"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  Globe,
  ShoppingBag,
  TrendingUp,
  DollarSign,
  Leaf,
  Package,
  Flame,
  Droplet,
  Building2,
} from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function ProcessorDashboard() {
  const router = useRouter()
  const [lang, setLang] = useState<"ar" | "en">("ar")
  const isArabic = lang === "ar"

  const content = {
    ar: {
      title: "لوحة تحكم شركة المعالجة",
      subtitle: "نظرة شاملة على مشترياتك وعمليات المعالجة وأرباحك",
      overview: "نظرة عامة",
      totalPurchases: "إجمالي المشتريات",
      activeProcessing: "قيد المعالجة",
      totalProfit: "إجمالي الأرباح",
      co2Reduced: "CO₂ تم تقليله",
      purchasedBatches: "الدفعات المشتراة",
      batchId: "رقم الدفعة",
      factory: "المصنع",
      quantity: "الكمية",
      processingType: "نوع المعالجة",
      status: "الحالة",
      profit: "الربح",
      processing: "قيد المعالجة",
      completed: "مكتمل",
      pending: "قيد الانتظار",
      tons: "طن",
      biofuel: "وقود حيوي",
      activatedCarbon: "كربون منشط",
      construction: "مواد بناء",
      processingBreakdown: "تفصيل المعالجة",
      biofuelProduction: "إنتاج الوقود الحيوي",
      activatedCarbonProduction: "إنتاج الكربون المنشط",
      constructionMaterials: "مواد البناء",
      environmentalImpact: "الأثر البيئي",
      co2Reduction: "تقليل CO₂",
      wasteProcessed: "نفايات تمت معالجتها",
      energySaved: "طاقة تم توفيرها",
      mwh: "ميجاواط/ساعة",
      browseMarketplace: "تصفح السوق",
      back: "رجوع للرئيسية",
    },
    en: {
      title: "Processor Dashboard",
      subtitle: "Comprehensive overview of your purchases, processing operations, and profits",
      overview: "Overview",
      totalPurchases: "Total Purchases",
      activeProcessing: "Active Processing",
      totalProfit: "Total Profit",
      co2Reduced: "CO₂ Reduced",
      purchasedBatches: "Purchased Batches",
      batchId: "Batch ID",
      factory: "Factory",
      quantity: "Quantity",
      processingType: "Processing Type",
      status: "Status",
      profit: "Profit",
      processing: "Processing",
      completed: "Completed",
      pending: "Pending",
      tons: "tons",
      biofuel: "Biofuel",
      activatedCarbon: "Activated Carbon",
      construction: "Construction",
      processingBreakdown: "Processing Breakdown",
      biofuelProduction: "Biofuel Production",
      activatedCarbonProduction: "Activated Carbon Production",
      constructionMaterials: "Construction Materials",
      environmentalImpact: "Environmental Impact",
      co2Reduction: "CO₂ Reduction",
      wasteProcessed: "Waste Processed",
      energySaved: "Energy Saved",
      mwh: "MWh",
      browseMarketplace: "Browse Marketplace",
      back: "Back to Home",
    },
  }

  const t = content[lang]

  // Mock data
  const kpis = [
    {
      icon: ShoppingBag,
      label: t.totalPurchases,
      value: "8",
      change: "+2",
      color: "from-[#2896DD] to-[#1FC1DF]",
      bgColor: "from-[#2896DD]/10 to-[#1FC1DF]/10",
    },
    {
      icon: Package,
      label: t.activeProcessing,
      value: "3",
      change: "+1",
      color: "from-amber-500 to-orange-500",
      bgColor: "from-amber-500/10 to-orange-500/10",
    },
    {
      icon: DollarSign,
      label: t.totalProfit,
      value: "160,500 ر.س",
      change: "+46,500 ر.س",
      color: "from-green-500 to-emerald-500",
      bgColor: "from-green-500/10 to-emerald-500/10",
    },
    {
      icon: Leaf,
      label: t.co2Reduced,
      value: "24.5 " + t.tons,
      change: "+6.8",
      color: "from-green-600 to-teal-600",
      bgColor: "from-green-600/10 to-teal-600/10",
    },
  ]

  const batches = [
    {
      id: "SBE-2024-001",
      factory: isArabic ? "مصنع الزيوت النباتية المتحدة" : "United Vegetable Oils Factory",
      quantity: 50,
      processingType: t.biofuel,
      status: "completed",
      profit: 9000,
    },
    {
      id: "SBE-2024-003",
      factory: isArabic ? "مصنع الزيوت النباتية المتحدة" : "United Vegetable Oils Factory",
      quantity: 60,
      processingType: t.activatedCarbon,
      status: "processing",
      profit: 0,
    },
    {
      id: "SBE-2024-005",
      factory: isArabic ? "شركة الصناعات الغذائية" : "Food Industries Company",
      quantity: 35,
      processingType: t.construction,
      status: "processing",
      profit: 0,
    },
    {
      id: "SBE-2024-007",
      factory: isArabic ? "مصنع الزيوت الشرقية" : "Eastern Oils Factory",
      quantity: 50,
      processingType: t.biofuel,
      status: "completed",
      profit: 8750,
    },
    {
      id: "SBE-2024-009",
      factory: isArabic ? "مصانع الأغذية الوطنية" : "National Food Industries",
      quantity: 45,
      processingType: t.activatedCarbon,
      status: "processing",
      profit: 0,
    },
  ]

  const processingBreakdown = [
    {
      icon: Flame,
      type: t.biofuelProduction,
      percentage: 45,
      batches: 3,
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Droplet,
      type: t.activatedCarbonProduction,
      percentage: 35,
      batches: 3,
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Building2,
      type: t.constructionMaterials,
      percentage: 20,
      batches: 2,
      color: "from-slate-500 to-slate-700",
    },
  ]

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      completed: { label: t.completed, className: "bg-green-100 text-green-700 border-green-200" },
      processing: { label: t.processing, className: "bg-blue-100 text-blue-700 border-blue-200" },
      pending: { label: t.pending, className: "bg-amber-100 text-amber-700 border-amber-200" },
    }
    const config = statusConfig[status as keyof typeof statusConfig]
    return <Badge className={`${config.className} border`}>{config.label}</Badge>
  }

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 ${isArabic ? "rtl" : "ltr"}`}
      dir={isArabic ? "rtl" : "ltr"}
    >
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" onClick={() => router.push("/")} className="gap-2">
            <ArrowLeft className={`w-4 h-4 ${isArabic ? "rotate-180" : ""}`} />
            {t.back}
          </Button>
          <Button variant="outline" size="sm" onClick={() => setLang(lang === "ar" ? "en" : "ar")} className="gap-2">
            <Globe className="w-4 h-4" />
            {lang === "ar" ? "English" : "العربية"}
          </Button>
        </div>
      </header>

      {/* Dashboard Content */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900">{t.title}</h1>
            <p className="text-slate-600">{t.subtitle}</p>
          </div>

          {/* KPI Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpis.map((kpi, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${kpi.bgColor} flex items-center justify-center`}
                  >
                    <kpi.icon className={`w-6 h-6 bg-gradient-to-br ${kpi.color} bg-clip-text text-transparent`} />
                  </div>
                  <Badge className="bg-green-100 text-green-700 border-green-200 border">{kpi.change}</Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-slate-600">{kpi.label}</p>
                  <p className="text-2xl font-bold text-slate-900">{kpi.value}</p>
                </div>
              </Card>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Batches Table */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900">{t.purchasedBatches}</h2>
                <Link href="/processor/marketplace">
                  <Button className="bg-gradient-to-r from-[#2896DD] to-[#1FC1DF] hover:opacity-90 text-white">
                    {t.browseMarketplace}
                  </Button>
                </Link>
              </div>

              <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50 border-b">
                      <tr>
                        <th className="px-6 py-3 text-start text-sm font-semibold text-slate-900">{t.batchId}</th>
                        <th className="px-6 py-3 text-start text-sm font-semibold text-slate-900">{t.factory}</th>
                        <th className="px-6 py-3 text-start text-sm font-semibold text-slate-900">{t.quantity}</th>
                        <th className="px-6 py-3 text-start text-sm font-semibold text-slate-900">
                          {t.processingType}
                        </th>
                        <th className="px-6 py-3 text-start text-sm font-semibold text-slate-900">{t.status}</th>
                        <th className="px-6 py-3 text-start text-sm font-semibold text-slate-900">{t.profit}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {batches.map((batch, index) => (
                        <tr key={index} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4 text-sm font-medium text-slate-900">{batch.id}</td>
                          <td className="px-6 py-4 text-sm text-slate-600 max-w-[200px] truncate">{batch.factory}</td>
                          <td className="px-6 py-4 text-sm text-slate-600">
                            {batch.quantity} {t.tons}
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-600">{batch.processingType}</td>
                          <td className="px-6 py-4">{getStatusBadge(batch.status)}</td>
                          <td className="px-6 py-4 text-sm font-semibold text-slate-900">
                            {batch.profit > 0 ? `${(batch.profit * 3.75).toLocaleString()} ر.س` : "-"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Processing Breakdown */}
              <Card className="p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[#2896DD]" />
                  {t.processingBreakdown}
                </h3>
                <div className="space-y-6">
                  {processingBreakdown.map((item, index) => (
                    <div key={index} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-lg bg-gradient-to-br ${item.color} bg-opacity-10 flex items-center justify-center`}
                          >
                            <item.icon className="w-5 h-5 text-slate-700" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-900">{item.type}</p>
                            <p className="text-xs text-slate-600">
                              {item.batches} {isArabic ? "دفعات" : "batches"}
                            </p>
                          </div>
                        </div>
                        <span className="text-lg font-bold text-slate-900">{item.percentage}%</span>
                      </div>
                      <Progress value={item.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </Card>

              {/* Environmental Impact */}
              <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-green-600" />
                  {t.environmentalImpact}
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm text-slate-600">{t.co2Reduction}</p>
                    <p className="text-2xl font-bold text-green-700">24.5 {t.tons}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-slate-600">{t.wasteProcessed}</p>
                    <p className="text-2xl font-bold text-green-700">240 {t.tons}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-slate-600">{t.energySaved}</p>
                    <p className="text-2xl font-bold text-green-700">1,850 {t.mwh}</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

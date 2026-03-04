"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Leaf, Package, ArrowLeft, Eye, CheckCircle, Globe, BarChart3 } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

export default function FactoryDashboard() {
  const router = useRouter()
  const [lang, setLang] = useState<"ar" | "en">("ar")
  const isArabic = lang === "ar"

  const content = {
    ar: {
      title: "لوحة تحكم المصنع",
      subtitle: "نظرة شاملة على دفعاتك وأرباحك وأثرك البيئي",
      overview: "نظرة عامة",
      totalBatches: "إجمالي الدفعات",
      activeBatches: "دفعات نشطة",
      totalRevenue: "إجمالي الإيرادات",
      co2Saved: "CO₂ تم توفيره",
      myBatches: "دفعاتي",
      batchId: "رقم الدفعة",
      quantity: "الكمية",
      status: "الحالة",
      revenue: "الإيرادات",
      views: "المشاهدات",
      actions: "الإجراءات",
      published: "منشور",
      sold: "مباع",
      pending: "قيد الانتظار",
      viewDetails: "عرض التفاصيل",
      tons: "طن",
      environmentalImpact: "الأثر البيئي",
      co2Reduction: "تقليل CO₂",
      treesEquivalent: "ما يعادل الأشجار",
      wasteRecycled: "نفايات معاد تدويرها",
      trees: "شجرة",
      recentActivity: "النشاط الأخير",
      activity1: "تم نشر دفعة جديدة #SBE-2024-003",
      activity2: "تم بيع الدفعة #SBE-2024-001 لشركة البيئة الخضراء",
      activity3: "تم تحليل دفعة جديدة بنجاح",
      addNewBatch: "إضافة دفعة جديدة",
      back: "رجوع للرئيسية",
    },
    en: {
      title: "Factory Dashboard",
      subtitle: "Comprehensive overview of your batches, profits, and environmental impact",
      overview: "Overview",
      totalBatches: "Total Batches",
      activeBatches: "Active Batches",
      totalRevenue: "Total Revenue",
      co2Saved: "CO₂ Saved",
      myBatches: "My Batches",
      batchId: "Batch ID",
      quantity: "Quantity",
      status: "Status",
      revenue: "Revenue",
      views: "Views",
      actions: "Actions",
      published: "Published",
      sold: "Sold",
      pending: "Pending",
      viewDetails: "View Details",
      tons: "tons",
      environmentalImpact: "Environmental Impact",
      co2Reduction: "CO₂ Reduction",
      treesEquivalent: "Trees Equivalent",
      wasteRecycled: "Waste Recycled",
      trees: "trees",
      recentActivity: "Recent Activity",
      activity1: "New batch published #SBE-2024-003",
      activity2: "Batch #SBE-2024-001 sold to Green Environment Co.",
      activity3: "New batch analyzed successfully",
      addNewBatch: "Add New Batch",
      back: "Back to Home",
    },
  }

  const t = content[lang]

  const kpis = [
    {
      icon: Package,
      label: t.totalBatches,
      value: "12",
      change: "+3",
      iconColor: "text-[#1FC1DF]",
      bgColor: "bg-[#1FC1DF]/10",
    },
    {
      icon: CheckCircle,
      label: t.activeBatches,
      value: "5",
      change: "+2",
      iconColor: "text-green-600",
      bgColor: "bg-green-500/10",
    },
    {
      icon: "sar", // Special case for SAR symbol
      label: t.totalRevenue,
      value: "92,250 ر.س",
      change: "+30,750 ر.س",
      iconColor: "text-amber-500",
      bgColor: "bg-amber-500/10",
    },
    {
      icon: Leaf,
      label: t.co2Saved,
      value: "18.5 " + t.tons,
      change: "+5.2",
      iconColor: "text-green-600",
      bgColor: "bg-green-600/10",
    },
  ]

  const batches = [
    {
      id: "SBE-2024-001",
      quantity: 50,
      status: "sold",
      revenue: 9000,
      views: 45,
      date: "2024-01-15",
    },
    {
      id: "SBE-2024-002",
      quantity: 35,
      status: "published",
      revenue: 0,
      views: 28,
      date: "2024-01-20",
    },
    {
      id: "SBE-2024-003",
      quantity: 60,
      status: "published",
      revenue: 0,
      views: 12,
      date: "2024-01-22",
    },
    {
      id: "SBE-2024-004",
      quantity: 40,
      status: "pending",
      revenue: 0,
      views: 0,
      date: "2024-01-23",
    },
  ]

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      sold: { label: t.sold, className: "bg-green-100 text-green-700 border-green-200" },
      published: { label: t.published, className: "bg-blue-100 text-blue-700 border-blue-200" },
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
            
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpis.map((kpi, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl ${kpi.bgColor} flex items-center justify-center`}>
                    {kpi.icon === "sar" ? (
                      <Image
                        src="/sar-symbol.png"
                        alt="SAR"
                        width={24}
                        height={24}
                        className="w-6 h-6"
                        style={{
                          filter:
                            "brightness(0) saturate(100%) invert(70%) sepia(98%) saturate(1000%) hue-rotate(0deg)",
                        }}
                      />
                    ) : (
                      <kpi.icon className={`w-6 h-6 ${kpi.iconColor}`} />
                    )}
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
                <h2 className="text-2xl font-bold text-slate-900">{t.myBatches}</h2>
                <Link href="/factory/input">
                  <Button className="bg-gradient-to-r from-[#1FC1DF] to-[#2896DD] hover:opacity-90 text-white">
                    {t.addNewBatch}
                  </Button>
                </Link>
              </div>

              <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50 border-b">
                      <tr>
                        <th className="px-6 py-3 text-start text-sm font-semibold text-slate-900">{t.batchId}</th>
                        <th className="px-6 py-3 text-start text-sm font-semibold text-slate-900">{t.quantity}</th>
                        <th className="px-6 py-3 text-start text-sm font-semibold text-slate-900">{t.status}</th>
                        <th className="px-6 py-3 text-start text-sm font-semibold text-slate-900">{t.revenue}</th>
                        <th className="px-6 py-3 text-start text-sm font-semibold text-slate-900">{t.views}</th>
                        <th className="px-6 py-3 text-start text-sm font-semibold text-slate-900">{t.actions}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {batches.map((batch, index) => (
                        <tr key={index} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4 text-sm font-medium text-slate-900">{batch.id}</td>
                          <td className="px-6 py-4 text-sm text-slate-600">
                            {batch.quantity} {t.tons}
                          </td>
                          <td className="px-6 py-4">{getStatusBadge(batch.status)}</td>
                          <td className="px-6 py-4 text-sm font-semibold text-slate-900">
                            {batch.revenue > 0 ? `${(batch.revenue * 3.75).toLocaleString()} ر.س` : "-"}
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-600">
                            <div className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              {batch.views}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <Button variant="ghost" size="sm" className="text-[#1FC1DF] hover:text-[#2896DD]">
                              {t.viewDetails}
                            </Button>
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
              {/* Environmental Impact */}
              <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-green-600" />
                  {t.environmentalImpact}
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm text-slate-600">{t.co2Reduction}</p>
                    <p className="text-2xl font-bold text-green-700">18.5 {t.tons}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-slate-600">{t.treesEquivalent}</p>
                    <p className="text-2xl font-bold text-green-700">425 {t.trees}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-slate-600">{t.wasteRecycled}</p>
                    <p className="text-2xl font-bold text-green-700">185 {t.tons}</p>
                  </div>
                </div>
              </Card>

              {/* Recent Activity */}
              <Card className="p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-[#1FC1DF]" />
                  {t.recentActivity}
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#1FC1DF] mt-2 flex-shrink-0" />
                    <div className="space-y-1">
                      <p className="text-sm text-slate-900">{t.activity1}</p>
                      <p className="text-xs text-slate-500">2 {isArabic ? "ساعات" : "hours ago"}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                    <div className="space-y-1">
                      <p className="text-sm text-slate-900">{t.activity2}</p>
                      <p className="text-xs text-slate-500">1 {isArabic ? "يوم" : "day ago"}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#2896DD] mt-2 flex-shrink-0" />
                    <div className="space-y-1">
                      <p className="text-sm text-slate-900">{t.activity3}</p>
                      <p className="text-xs text-slate-500">2 {isArabic ? "أيام" : "days ago"}</p>
                    </div>
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

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Globe,
  MapPin,
  Leaf,
  TrendingUp,
  Droplets,
  Flame,
  Factory,
  Phone,
  Mail,
  ShoppingCart,
  FileText,
} from "lucide-react"
import { useRouter, useParams } from "next/navigation"

export default function BatchDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const [lang, setLang] = useState<"ar" | "en">("ar")
  const isArabic = lang === "ar"

  const content = {
    ar: {
      title: "تفاصيل الدفعة",
      back: "رجوع للسوق",
      batchInfo: "معلومات الدفعة",
      factoryInfo: "معلومات المصنع",
      chemicalProperties: "الخصائص الكيميائية",
      suitability: "مناسب لـ",
      environmentalImpact: "الأثر البيئي",
      contactInfo: "معلومات التواصل",
      batchId: "رقم الدفعة",
      quantity: "الكمية المتاحة",
      oilType: "نوع الزيت",
      location: "الموقع",
      publishedDate: "تاريخ النشر",
      views: "المشاهدات",
      oilContent: "نسبة الزيت",
      moistureContent: "نسبة الرطوبة",
      ashContent: "نسبة الرماد",
      biofuel: "وقود حيوي",
      activatedCarbon: "كربون منشط",
      construction: "مواد بناء",
      co2Reduction: "تقليل CO₂",
      equivalentTrees: "يعادل زراعة",
      phone: "الهاتف",
      email: "البريد الإلكتروني",
      purchaseNow: "شراء الآن",
      downloadReport: "تحميل التقرير المخبري",
      tons: "طن",
      trees: "شجرة",
      palmOil: "زيت النخيل",
      soybeanOil: "زيت الصويا",
      sunflowerOil: "زيت دوّار الشمس",
      canolaOil: "زيت الكانولا",
      cornOil: "زيت الذرة",
      oliveOil: "زيت الزيتون",
      riyadh: "الرياض",
      jeddah: "جدة",
      dammam: "الدمام",
    },
    en: {
      title: "Batch Details",
      back: "Back to Marketplace",
      batchInfo: "Batch Information",
      factoryInfo: "Factory Information",
      chemicalProperties: "Chemical Properties",
      suitability: "Suitable For",
      environmentalImpact: "Environmental Impact",
      contactInfo: "Contact Information",
      batchId: "Batch ID",
      quantity: "Available Quantity",
      oilType: "Oil Type",
      location: "Location",
      publishedDate: "Published Date",
      views: "Views",
      oilContent: "Oil Content",
      moistureContent: "Moisture Content",
      ashContent: "Ash Content",
      biofuel: "Biofuel",
      activatedCarbon: "Activated Carbon",
      construction: "Construction",
      co2Reduction: "CO₂ Reduction",
      equivalentTrees: "Equivalent to planting",
      phone: "Phone",
      email: "Email",
      purchaseNow: "Purchase Now",
      downloadReport: "Download Lab Report",
      tons: "tons",
      trees: "trees",
      palmOil: "Palm Oil",
      soybeanOil: "Soybean Oil",
      sunflowerOil: "Sunflower Oil",
      canolaOil: "Canola Oil",
      cornOil: "Corn Oil",
      oliveOil: "Olive Oil",
      riyadh: "Riyadh",
      jeddah: "Jeddah",
      dammam: "Dammam",
    },
  }

  const t = content[lang]

  // Mock batch data - in real app, fetch based on params.id
  const batch = {
    id: params.id || "SBE-2024-003",
    factory: isArabic ? "مصنع زيت عافية" : "Afia Oil Factory",
    quantity: 60,
    location: t.jeddah,
    oilType: t.palmOil,
    oilContent: 28,
    moistureContent: 12,
    ashContent: 8,
    suitableFor: [t.biofuel, t.activatedCarbon],
    co2Reduction: 3.2,
    equivalentTrees: 145,
    views: 45,
    publishedDate: "2024-01-15",
    phone: "0096626350000",
    email: "info@savola.com",
    address: isArabic ? "المدينة الصناعية الأولى بجدة" : "First Industrial City, Jeddah",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E2%80%8F%D9%84%D9%82%D8%B7%D8%A9%20%D8%A7%D9%84%D8%B4%D8%A7%D8%B4%D8%A9%20%D9%A1%D9%A4%D9%A4%D9%A7-%D9%A0%D9%A4-%D9%A0%D9%A9%20%D9%81%D9%8A%20%D9%A1%D9%A2.%D9%A4%D9%A0.%D9%A2%D9%A6%C2%A0%D9%85.png-kl8tYBEDy6VrHlhgkWtFHuIhYax6yI.jpeg",
    hasLabReport: true,
  }

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 ${isArabic ? "rtl" : "ltr"}`}
      dir={isArabic ? "rtl" : "ltr"}
    >
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" onClick={() => router.push("/processor/marketplace")} className="gap-2">
            <ArrowLeft className={`w-4 h-4 ${isArabic ? "rotate-180" : ""}`} />
            {t.back}
          </Button>
          <Button variant="outline" size="sm" onClick={() => setLang(lang === "ar" ? "en" : "ar")} className="gap-2">
            <Globe className="w-4 h-4" />
            {lang === "ar" ? "English" : "العربية"}
          </Button>
        </div>
      </header>

      {/* Content */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900">{t.title}</h1>
            <Badge className="bg-[#1FC1DF] text-white text-lg px-4 py-2">{batch.id}</Badge>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column - Image and Quick Stats */}
            <div className="lg:col-span-1 space-y-6">
              {/* Image */}
              <Card className="overflow-hidden">
                <div className="relative h-64 bg-slate-200">
                  <img
                    src={batch.image || "/placeholder.svg"}
                    alt={batch.factory}
                    className="w-full h-full object-cover"
                  />
                </div>
              </Card>

              {/* Quick Stats */}
              <Card className="p-6 space-y-4">
                <h3 className="font-bold text-slate-900">{t.batchInfo}</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">{t.batchId}</span>
                    <span className="font-semibold text-slate-900">{batch.id}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">{t.publishedDate}</span>
                    <span className="font-semibold text-slate-900">{batch.publishedDate}</span>
                  </div>
                </div>
              </Card>

              {/* Purchase CTA */}
              <Button
                onClick={() => router.push(`/processor/purchase/${batch.id}`)}
                className="w-full bg-gradient-to-r from-[#1FC1DF] to-[#2896DD] hover:opacity-90 text-white gap-2 h-12"
              >
                <ShoppingCart className="w-5 h-5" />
                {t.purchaseNow}
              </Button>

              {batch.hasLabReport && (
                <Button variant="outline" className="w-full gap-2 bg-white">
                  <FileText className="w-4 h-4" />
                  {t.downloadReport}
                </Button>
              )}
            </div>

            {/* Right Column - Detailed Information */}
            <div className="lg:col-span-2 space-y-6">
              {/* Factory Information */}
              <Card className="p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <Factory className="w-5 h-5 text-[#1FC1DF]" />
                  <h3 className="font-bold text-slate-900 text-lg">{t.factoryInfo}</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-2xl font-bold text-slate-900">{batch.factory}</p>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <MapPin className="w-4 h-4" />
                    <span>{batch.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600"></div>
                  <div className="grid md:grid-cols-2 gap-4 pt-2">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Phone className="w-4 h-4" />
                      <span className="text-sm">{batch.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <Mail className="w-4 h-4" />
                      <span className="text-sm">{batch.email}</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Chemical Properties */}
              <Card className="p-6 space-y-4">
                <h3 className="font-bold text-slate-900 text-lg">{t.chemicalProperties}</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-slate-600">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-sm">{t.oilContent}</span>
                    </div>
                    <p className="text-2xl font-bold text-slate-900">{batch.oilContent}%</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Droplets className="w-4 h-4" />
                      <span className="text-sm">{t.moistureContent}</span>
                    </div>
                    <p className="text-2xl font-bold text-slate-900">{batch.moistureContent}%</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Flame className="w-4 h-4" />
                      <span className="text-sm">{t.ashContent}</span>
                    </div>
                    <p className="text-2xl font-bold text-slate-900">{batch.ashContent}%</p>
                  </div>
                </div>
                <div className="pt-2">
                  <p className="text-sm text-slate-600 mb-2">{t.oilType}</p>
                  <Badge className="bg-blue-100 text-blue-700 border-blue-200 border">{batch.oilType}</Badge>
                </div>
              </Card>

              {/* Suitability */}
              <Card className="p-6 space-y-4">
                <h3 className="font-bold text-slate-900 text-lg">{t.suitability}</h3>
                <div className="flex flex-wrap gap-3">
                  {batch.suitableFor.map((use, idx) => (
                    <Badge key={idx} className="bg-green-100 text-green-700 border-green-200 border text-sm px-4 py-2">
                      {use}
                    </Badge>
                  ))}
                </div>
              </Card>

              {/* Environmental Impact */}
              <Card className="p-6 space-y-4 bg-gradient-to-br from-green-50 to-emerald-50">
                <div className="flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-green-600" />
                  <h3 className="font-bold text-slate-900 text-lg">{t.environmentalImpact}</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm text-slate-600">{t.co2Reduction}</p>
                    <p className="text-3xl font-bold text-green-600">
                      {batch.co2Reduction} {t.tons}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-slate-600">{t.equivalentTrees}</p>
                    <p className="text-3xl font-bold text-green-600">
                      {batch.equivalentTrees} {t.trees}
                    </p>
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

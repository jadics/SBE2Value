"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Globe,
  CheckCircle2,
  Leaf,
  Zap,
  Droplets,
  Package,
  MapPin,
  Truck,
  Calendar,
  Star,
  Download,
  Shield,
  Sparkles,
  Heart,
  X,
  ShoppingCart,
  Loader2,
} from "lucide-react"
import { useRouter, useParams } from "next/navigation"

export default function PurchaseDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const [lang, setLang] = useState<"ar" | "en">("ar")
  const [isDownloading, setIsDownloading] = useState(false)
  const [isDownloaded, setIsDownloaded] = useState(false)
  const [isPurchasing, setIsPurchasing] = useState(false)
  const [isPurchased, setIsPurchased] = useState(false)
  const [isAddingToFavorites, setIsAddingToFavorites] = useState(false)
  const [isAddedToFavorites, setIsAddedToFavorites] = useState(false)
  const isArabic = lang === "ar"

  const content = {
    ar: {
      title: "تفاصيل الدفعة",
      subtitle: "Batch Details",
      back: "رجوع للسوق",
      batchInfo: "معلومات الدفعة الأساسية",
      batchId: "رقم الدفعة",
      factory: "المصنع",
      availableQuantity: "الكمية المتاحة",
      oilContent: "نسبة الزيت المتبقي",
      moisture: "نسبة الرطوبة",
      ash: "نسبة الرماد",
      oilType: "نوع الزيت",
      analysisDate: "تاريخ التحليل",
      aiRecommendation: "توصية الذكاء الاصطناعي",
      bestPath: "أفضل مسار معالجة",
      confidence: "درجة ثقة الذكاء الاصطناعي",
      alternatives: "بدائل ممكنة",
      feasibility: "جدوى",
      environmentalImpact: "الأثر البيئي المتوقع",
      co2Avoided: "الانبعاثات المتجنّبة",
      energyRecovered: "الطاقة المستعادة",
      waterSaved: "المياه المحفوظة",
      barrels: "برميل وقود حيوي",
      liters: "لتر",
      comparedToBurning: "مقارنة بالحرق التقليدي",
      shippingInfo: "معلومات النقل والتسليم",
      factoryLocation: "موقع المصنع",
      deliveryMethod: "طريقة التسليم",
      expectedDelivery: "الوقت المتوقع للتسليم",
      logistics: "جهة النقل المقترحة",
      workDays: "أيام عمل",
      dedicatedTruck: "شاحنة ناقلة مخصصة",
      certified: "معتمدة من المنصة",
      qualityAssurance: "إشعارات الضمان والجودة",
      verified: "تم التحقق من مصدر الدفعة بواسطة SBE2Value",
      aiProcessed: "البيانات مدققة ومعالجة من خلال نموذج الذكاء الاصطناعي",
      secure: "جميع المعاملات محمية عبر نظام أمني مؤسسي",
      confirmPurchase: "تأكيد الشراء",
      confirming: "جاري تأكيد الشراء......",
      confirmed: "تم تأكيد شرائك للدفعة",
      addToFavorites: "إضافة إلى المفضلة",
      addingToFavorites: "جاري الإضافة إلى المفضلة......",
      addedToFavorites: "تمت الإضافة إلى المفضلة......",
      downloadReport: "تحميل تقرير التحليل (PDF)",
      downloading: "جاري تحميل التقرير...!",
      downloaded: "تم تحميل التقرير......",
      cancel: "إلغاء",
      viewAnother: "عرض دفعة أخرى",
      tons: "طن",
      biofuel: "وقود حيوي",
      activatedCarbon: "كربون نشط",
      construction: "مواد إنشائية",
      palmOil: "زيت نخيل",
    },
    en: {
      title: "Batch Details",
      subtitle: "تفاصيل الدفعة",
      back: "Back to Market",
      batchInfo: "Basic Batch Information",
      batchId: "Batch ID",
      factory: "Factory",
      availableQuantity: "Available Quantity",
      oilContent: "Remaining Oil Content",
      moisture: "Moisture Content",
      ash: "Ash Content",
      oilType: "Oil Type",
      analysisDate: "Analysis Date",
      aiRecommendation: "AI Recommendation",
      bestPath: "Best Processing Path",
      confidence: "AI Confidence Level",
      alternatives: "Possible Alternatives",
      feasibility: "Feasibility",
      environmentalImpact: "Expected Environmental Impact",
      co2Avoided: "CO₂ Emissions Avoided",
      energyRecovered: "Energy Recovered",
      waterSaved: "Water Saved",
      barrels: "barrels of biofuel",
      liters: "liters",
      comparedToBurning: "compared to traditional burning",
      shippingInfo: "Shipping & Delivery Information",
      factoryLocation: "Factory Location",
      deliveryMethod: "Delivery Method",
      expectedDelivery: "Expected Delivery Time",
      logistics: "Suggested Logistics Company",
      workDays: "business days",
      dedicatedTruck: "Dedicated transport truck",
      certified: "Platform certified",
      qualityAssurance: "Quality Assurance Notices",
      verified: "Batch source verified by SBE2Value",
      aiProcessed: "Data verified and processed through AI model",
      secure: "All transactions protected by enterprise security system",
      confirmPurchase: "Confirm Purchase",
      confirming: "Confirming purchase......",
      confirmed: "Your purchase has been confirmed",
      addToFavorites: "Add to Favorites",
      addingToFavorites: "Adding to favorites......",
      addedToFavorites: "Added to favorites......",
      downloadReport: "Download Analysis Report (PDF)",
      downloading: "Downloading report...!",
      downloaded: "Report downloaded......",
      cancel: "Cancel",
      viewAnother: "View Another Batch",
      tons: "tons",
      biofuel: "Biofuel",
      activatedCarbon: "Activated Carbon",
      construction: "Construction Fillers",
      palmOil: "Palm Oil",
    },
  }

  const t = content[lang]

  // Mock batch data
  const batch = {
    id: "SBE-2024-009",
    factory: isArabic ? "مصنع زيت عافية" : "Afia Oil Factory",
    quantity: 60,
    oilContent: 12,
    moisture: 5,
    ash: 8,
    oilType: t.palmOil,
    analysisDate: isArabic ? "12 أكتوبر 2025" : "October 12, 2025",
    aiRecommendation: {
      bestPath: t.biofuel,
      confidence: 93,
      alternatives: [
        { name: t.activatedCarbon, feasibility: 80 },
        { name: t.construction, feasibility: 65 },
      ],
    },
    environmental: {
      co2Avoided: 19,
      energyRecovered: 230,
      waterSaved: 5200,
    },
    shipping: {
      location: isArabic ? "الجبيل الصناعية" : "Jubail Industrial City",
      deliveryTime: isArabic ? "3-5" : "3-5",
      logistics: isArabic ? "شركة نواقل الدولية NIC" : "Nawaql International Company (NIC)",
    },
  }

  const handleDownload = () => {
    setIsDownloading(true)
    setTimeout(() => {
      setIsDownloading(false)
      setIsDownloaded(true)
      setTimeout(() => {
        setIsDownloaded(false)
      }, 3000)
    }, 2000)
  }

  const handlePurchase = () => {
    setIsPurchasing(true)
    setTimeout(() => {
      setIsPurchasing(false)
      setIsPurchased(true)
    }, 2500)
  }

  const handleAddToFavorites = () => {
    setIsAddingToFavorites(true)
    setTimeout(() => {
      setIsAddingToFavorites(false)
      setIsAddedToFavorites(true)
      setTimeout(() => {
        setIsAddedToFavorites(false)
      }, 3000)
    }, 2000)
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
          <div className="text-center space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900">{t.title}</h1>
            <p className="text-slate-600">{t.subtitle}</p>
          </div>

          <div className="flex justify-center gap-3">
            <Button
              variant="outline"
              className={`gap-2 px-6 h-12 ${
                isDownloaded
                  ? "bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
                  : "bg-white hover:bg-slate-50"
              }`}
              onClick={handleDownload}
              disabled={isDownloading || isDownloaded}
            >
              {isDownloading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {t.downloading}
                </>
              ) : isDownloaded ? (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  {t.downloaded}
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  {t.downloadReport}
                </>
              )}
            </Button>
            <Button
              variant="outline"
              className={`gap-2 px-6 h-12 ${
                isAddedToFavorites
                  ? "bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
                  : "bg-white hover:bg-red-50 border-red-200 text-red-600 hover:text-red-700"
              }`}
              onClick={handleAddToFavorites}
              disabled={isAddingToFavorites || isAddedToFavorites}
            >
              {isAddingToFavorites ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {t.addingToFavorites}
                </>
              ) : isAddedToFavorites ? (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  {t.addedToFavorites}
                </>
              ) : (
                <>
                  <Heart className="w-5 h-5" />
                  {t.addToFavorites}
                </>
              )}
            </Button>
          </div>

          {/* Section 1: Basic Batch Information */}
          <Card className="p-6 space-y-4">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Package className="w-5 h-5 text-[#1FC1DF]" />
              {t.batchInfo}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                <span className="text-slate-600">{t.batchId}</span>
                <Badge className="bg-[#1FC1DF] text-white">{batch.id}</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                <span className="text-slate-600">{t.factory}</span>
                <span className="font-semibold text-slate-900">{batch.factory}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                <span className="text-slate-600">{t.availableQuantity}</span>
                <span className="font-semibold text-slate-900">
                  {batch.quantity} {t.tons}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                <span className="text-slate-600">{t.oilContent}</span>
                <span className="font-semibold text-slate-900">{batch.oilContent}%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                <span className="text-slate-600">{t.moisture}</span>
                <span className="font-semibold text-slate-900">{batch.moisture}%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                <span className="text-slate-600">{t.ash}</span>
                <span className="font-semibold text-slate-900">{batch.ash}%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                <span className="text-slate-600">{t.oilType}</span>
                <span className="font-semibold text-slate-900">{batch.oilType}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                <span className="text-slate-600">{t.analysisDate}</span>
                <span className="font-semibold text-slate-900">{batch.analysisDate}</span>
              </div>
            </div>
          </Card>

          {/* Section 2: AI Recommendation */}
          <Card className="p-6 space-y-4 bg-gradient-to-br from-[#1FC1DF]/5 to-[#2896DD]/5 border-[#1FC1DF]/20">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#1FC1DF]" />
              {t.aiRecommendation}
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                <span className="font-semibold text-slate-900">{t.bestPath}:</span>
                <Badge className="bg-green-500 text-white text-base px-4 py-1">{batch.aiRecommendation.bestPath}</Badge>
              </div>
              <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                <span className="font-semibold text-slate-900">{t.confidence}:</span>
                <span className="text-2xl font-bold text-[#1FC1DF]">{batch.aiRecommendation.confidence}%</span>
              </div>
              <div className="space-y-2">
                <p className="font-semibold text-slate-900">{t.alternatives}:</p>
                <div className="grid gap-2">
                  {batch.aiRecommendation.alternatives.map((alt, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <span className="text-slate-700">{alt.name}</span>
                      <span className="text-slate-600">
                        {t.feasibility} {alt.feasibility}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Section 3: Environmental Impact */}
          <Card className="p-6 space-y-4 bg-gradient-to-br from-green-50 to-emerald-50">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Leaf className="w-5 h-5 text-green-600" />
              {t.environmentalImpact}
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded-lg text-center space-y-2">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Leaf className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-sm text-slate-600">{t.co2Avoided}</p>
                <p className="text-xl font-bold text-green-600">
                  {batch.environmental.co2Avoided} {isArabic ? "طن من" : "tons of"} CO₂
                </p>
              </div>
              <div className="p-4 bg-white rounded-lg text-center space-y-2">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto">
                  <Zap className="w-6 h-6 text-amber-600" />
                </div>
                <p className="text-sm text-slate-600">{t.energyRecovered}</p>
                <p className="text-xl font-bold text-amber-600">
                  {isArabic ? "ما يعادل" : "equivalent to"} {batch.environmental.energyRecovered} {t.barrels}
                </p>
              </div>
              <div className="p-4 bg-white rounded-lg text-center space-y-2">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <Droplets className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-sm text-slate-600">{t.waterSaved}</p>
                <p className="text-xl font-bold text-blue-600">
                  {batch.environmental.waterSaved.toLocaleString()} {t.liters}
                </p>
                <p className="text-xs text-slate-500">{t.comparedToBurning}</p>
              </div>
            </div>
          </Card>

          {/* Section 4: Shipping & Delivery */}
          <Card className="p-6 space-y-4">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Truck className="w-5 h-5 text-[#1FC1DF]" />
              {t.shippingInfo}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                <MapPin className="w-5 h-5 text-[#1FC1DF] mt-1" />
                <div>
                  <p className="text-sm text-slate-600">{t.factoryLocation}</p>
                  <p className="font-semibold text-slate-900">{batch.shipping.location}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                <Truck className="w-5 h-5 text-[#1FC1DF] mt-1" />
                <div>
                  <p className="text-sm text-slate-600">{t.deliveryMethod}</p>
                  <p className="font-semibold text-slate-900">{t.dedicatedTruck}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                <Calendar className="w-5 h-5 text-[#1FC1DF] mt-1" />
                <div>
                  <p className="text-sm text-slate-600">{t.expectedDelivery}</p>
                  <p className="font-semibold text-slate-900">
                    {isArabic ? "خلال" : "within"} {batch.shipping.deliveryTime} {t.workDays}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                <Star className="w-5 h-5 text-[#1FC1DF] mt-1" />
                <div>
                  <p className="text-sm text-slate-600">{t.logistics}</p>
                  <p className="font-semibold text-slate-900">
                    {batch.shipping.logistics} <span className="text-xs text-green-600">({t.certified})</span>
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Section 5: Quality Assurance */}
          <Card className="p-6 space-y-4 bg-gradient-to-br from-blue-50 to-cyan-50">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-600" />
              {t.qualityAssurance}
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                <p className="text-slate-700">{t.verified}</p>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                <Sparkles className="w-5 h-5 text-[#1FC1DF] flex-shrink-0" />
                <p className="text-slate-700">{t.aiProcessed}</p>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                <Shield className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <p className="text-slate-700">{t.secure}</p>
              </div>
            </div>
          </Card>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-8 pb-12">
            <Button
              size="lg"
              className={`px-8 h-14 text-lg gap-2 w-full sm:w-auto ${
                isPurchased ? "bg-green-600 hover:bg-green-700" : "bg-green-600 hover:bg-green-700"
              }`}
              onClick={handlePurchase}
              disabled={isPurchasing || isPurchased}
            >
              {isPurchasing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {t.confirming}
                </>
              ) : isPurchased ? (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  {t.confirmed}
                </>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5" />
                  {t.confirmPurchase}
                </>
              )}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-slate-300 hover:bg-slate-100 px-8 h-14 text-lg gap-2 w-full sm:w-auto bg-transparent"
              onClick={() => router.push("/processor/marketplace")}
            >
              <Package className="w-5 h-5" />
              {t.viewAnother}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700 px-8 h-14 text-lg gap-2 w-full sm:w-auto bg-transparent"
              onClick={() => router.push("/processor/marketplace")}
            >
              <X className="w-5 h-5" />
              {t.cancel}
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

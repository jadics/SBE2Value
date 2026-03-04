"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  ArrowLeft,
  Search,
  Filter,
  MapPin,
  Package,
  TrendingUp,
  Leaf,
  Globe,
  ShoppingCart,
  X,
  Flame,
  Droplet,
  Building2,
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function MarketplacePage() {
  const router = useRouter()
  const [lang, setLang] = useState<"ar" | "en">(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("sbe2value-lang") as "ar" | "en") || "ar"
    }
    return "ar"
  })
  const [searchQuery, setSearchQuery] = useState("")
  const [filterModalOpen, setFilterModalOpen] = useState(false)
  const [filters, setFilters] = useState({
    oilContent: null as [number, number] | null,
    quantity: null as [number, number] | null,
    suitableFor: [] as string[],
    location: [] as string[],
  })
  const isArabic = lang === "ar"

  const content = {
    ar: {
      title: "سوق SBE المستهلك",
      subtitle: "تصفح واشترِ دفعات SBE من المصانع المنتجة",
      search: "ابحث عن دفعات...",
      filters: "الفلاتر",
      filterTitle: "تصفية النتائج",
      filterDesc: "اختر المعايير المناسبة لتصفية الدفعات",
      allBatches: "جميع الدفعات",
      available: "متاح",
      quantity: "الكمية",
      location: "الموقع",
      oilContent: "نسبة الزيت",
      suitableFor: "مناسب لـ",
      co2Impact: "تأثير CO₂",
      viewDetails: "عرض التفاصيل",
      purchase: "شراء",
      tons: "طن",
      biofuel: "وقود حيوي",
      activatedCarbon: "كربون منشط",
      construction: "مواد بناء",
      riyadh: "الرياض",
      jeddah: "جدة",
      dammam: "الدمام",
      results: "نتيجة",
      back: "رجوع",
      applyFilters: "تطبيق الفلاتر",
      reset: "إعادة تعيين",
      activeFilters: "فلاتر نشطة",
      clearAll: "مسح الكل",
    },
    en: {
      title: "Spent Bleaching Earth Marketplace",
      subtitle: "Browse and purchase SBE batches from producing factories",
      search: "Search for batches...",
      filters: "Filters",
      filterTitle: "Filter Results",
      filterDesc: "Select criteria to filter batches",
      allBatches: "All Batches",
      available: "Available",
      quantity: "Quantity",
      location: "Location",
      oilContent: "Oil Content",
      suitableFor: "Suitable For",
      co2Impact: "CO₂ Impact",
      viewDetails: "View Details",
      purchase: "Purchase",
      tons: "tons",
      biofuel: "Biofuel",
      activatedCarbon: "Activated Carbon",
      construction: "Construction",
      riyadh: "Riyadh",
      jeddah: "Jeddah",
      dammam: "Dammam",
      results: "results",
      back: "Back",
      applyFilters: "Apply Filters",
      reset: "Reset",
      activeFilters: "Active Filters",
      clearAll: "Clear All",
    },
  }

  const t = content[lang]

  // Mock marketplace data
  const batches = [
    {
      id: "SBE-2024-003",
      factory: isArabic ? "مصنع زيت عافية" : "Afia Oil Factory",
      quantity: 60,
      price: 675,
      location: isArabic ? "جدة" : "Jeddah",
      oilContent: 28,
      moistureContent: 12,
      suitableFor: [t.biofuel, t.activatedCarbon],
      co2Reduction: 3.2,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E2%80%8F%D9%84%D9%82%D8%B7%D8%A9%20%D8%A7%D9%84%D8%B4%D8%A7%D8%B4%D8%A9%20%D9%A1%D9%A4%D9%A4%D9%A7-%D9%A0%D9%A4-%D9%A0%D9%A9%20%D9%81%D9%8A%20%D9%A1%D9%A2.%D9%A4%D9%A0.%D9%A2%D9%A6%C2%A0%D9%85.png-kl8tYBEDy6VrHlhgkWtFHuIhYax6yI.jpeg",
    },
    {
      id: "SBE-2024-005",
      factory: isArabic ? "مصنع زيت عافية" : "Afia Oil Factory",
      quantity: 35,
      price: 619,
      location: isArabic ? "جدة" : "Jeddah",
      oilContent: 22,
      moistureContent: 15,
      suitableFor: [t.activatedCarbon, t.construction],
      co2Reduction: 2.1,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E2%80%8F%D9%84%D9%82%D8%B7%D8%A9%20%D8%A7%D9%84%D8%B4%D8%A7%D8%B4%D8%A9%20%D9%A1%D9%A4%D9%A4%D9%A7-%D9%A0%D9%A4-%D9%A0%D9%A9%20%D9%81%D9%8A%20%D9%A1%D9%A2.%D9%A3%D9%A8.%D9%A1%D9%A3%C2%A0%D9%85.png-T8Wj8ZsmBdighRd5a7YQcHsdl2tfiK.jpeg",
    },
    {
      id: "SBE-2024-007",
      factory: isArabic ? "مصنع زيت عافية" : "Afia Oil Factory",
      quantity: 50,
      price: 656,
      location: isArabic ? "جدة" : "Jeddah",
      oilContent: 30,
      moistureContent: 10,
      suitableFor: [t.biofuel],
      co2Reduction: 2.8,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E2%80%8F%D9%84%D9%82%D8%B7%D8%A9%20%D8%A7%D9%84%D8%B4%D8%A7%D8%B4%D8%A9%20%D9%A1%D9%A4%D9%A4%D9%A7-%D9%A0%D9%A4-%D9%A0%D9%A9%20%D9%81%D9%8A%20%D9%A1.%D9%A0%D9%A2.%D9%A2%D9%A8%C2%A0%D9%85.png-cPZO3Kpcfw8cpzV9WfOkDcWK6Vg5my.jpeg",
    },
    {
      id: "SBE-2024-009",
      factory: isArabic ? "مصنع زيت عافية" : "Afia Oil Factory",
      quantity: 45,
      price: 581,
      location: isArabic ? "جدة" : "Jeddah",
      oilContent: 20,
      moistureContent: 18,
      suitableFor: [t.construction, t.activatedCarbon],
      co2Reduction: 2.5,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E2%80%8F%D9%84%D9%82%D8%B7%D8%A9%20%D8%A7%D9%84%D8%B4%D8%A7%D8%B4%D8%A9%20%D9%A1%D9%A4%D9%A4%D9%A7-%D9%A0%D9%A4-%D9%A0%D9%A9%20%D9%81%D9%8A%20%D9%A1.%D9%A0%D9%A2.%D9%A1%D9%A8%C2%A0%D9%85.png-xb79gW2LBJmc3yaKYvxtbxpcLwhEsA.jpeg",
    },
    {
      id: "SBE-2024-011",
      factory: isArabic ? "مصنع زيت عافية" : "Afia Oil Factory",
      quantity: 70,
      price: 713,
      location: isArabic ? "جدة" : "Jeddah",
      oilContent: 32,
      moistureContent: 8,
      suitableFor: [t.biofuel, t.activatedCarbon],
      co2Reduction: 3.8,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E2%80%8F%D9%84%D9%82%D8%B7%D8%A9%20%D8%A7%D9%84%D8%B4%D8%A7%D8%B4%D8%A9%20%D9%A1%D9%A4%D9%A4%D9%A7-%D9%A0%D9%A4-%D9%A0%D9%A9%20%D9%81%D9%8A%20%D9%A1.%D9%A0%D9%A1.%D9%A2%D9%A1%C2%A0%D9%85.png-CS0KtxC4XbIbMNgRv4ryHIq17qt848.jpeg",
    },
    {
      id: "SBE-2024-013",
      factory: isArabic ? "مصنع زيت عافية" : "Afia Oil Factory",
      quantity: 40,
      price: 638,
      location: isArabic ? "جدة" : "Jeddah",
      oilContent: 25,
      moistureContent: 14,
      suitableFor: [t.biofuel, t.construction],
      co2Reduction: 2.3,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E2%80%8F%D9%84%D9%82%D8%B7%D8%A9%20%D8%A7%D9%84%D8%B4%D8%A7%D8%B4%D8%A9%20%D9%A1%D9%A4%D9%A4%D9%A7-%D9%A0%D9%A4-%D9%A0%D9%A9%20%D9%81%D9%8A%20%D9%A1.%D9%A0%D9%A4.%D9%A0%D9%A1%C2%A0%D9%85.png-NFo139gyiA2bZr7nLJ0kl1ql8SIN5a.jpeg",
    },
  ]

  const filteredBatches = batches.filter((batch) => {
    // Search filter
    const matchesSearch =
      !searchQuery ||
      batch.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      batch.factory.toLowerCase().includes(searchQuery.toLowerCase())

    // Oil content filter
    const matchesOilContent =
      !filters.oilContent || (batch.oilContent >= filters.oilContent[0] && batch.oilContent <= filters.oilContent[1])

    // Quantity filter
    const matchesQuantity =
      !filters.quantity || (batch.quantity >= filters.quantity[0] && batch.quantity <= filters.quantity[1])

    // Suitable for filter (OR logic - batch must have at least one selected use)
    const matchesSuitableFor =
      filters.suitableFor.length === 0 || filters.suitableFor.some((use) => batch.suitableFor.includes(use))

    // Location filter (OR logic - batch location must match one of selected locations)
    const matchesLocation = filters.location.length === 0 || filters.location.includes(batch.location)

    return matchesSearch && matchesOilContent && matchesQuantity && matchesSuitableFor && matchesLocation
  })

  const activeFilterCount =
    (filters.oilContent ? 1 : 0) + (filters.quantity ? 1 : 0) + filters.suitableFor.length + filters.location.length

  const resetFilters = () => {
    setFilters({
      oilContent: null,
      quantity: null,
      suitableFor: [],
      location: [],
    })
  }

  const toggleSuitableFor = (use: string) => {
    setFilters((prev) => ({
      ...prev,
      suitableFor: prev.suitableFor.includes(use)
        ? prev.suitableFor.filter((u) => u !== use)
        : [...prev.suitableFor, use],
    }))
  }

  const toggleLocation = (loc: string) => {
    setFilters((prev) => ({
      ...prev,
      location: prev.location.includes(loc) ? prev.location.filter((l) => l !== loc) : [...prev.location, loc],
    }))
  }

  useEffect(() => {
    const handleLanguageChange = (e: CustomEvent) => {
      setLang(e.detail.lang)
    }
    window.addEventListener("languageChange", handleLanguageChange as EventListener)
    return () => window.removeEventListener("languageChange", handleLanguageChange as EventListener)
  }, [])

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

      {/* Marketplace Content */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900">{t.title}</h1>
            <p className="text-slate-600 text-pretty max-w-2xl mx-auto">{t.subtitle}</p>
          </div>

          {/* Search and Filters */}
          <Card className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search
                  className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 ${isArabic ? "right-3" : "left-3"}`}
                />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.search}
                  className={`${isArabic ? "pr-10" : "pl-10"}`}
                />
              </div>

              <Dialog open={filterModalOpen} onOpenChange={setFilterModalOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="gap-2 relative bg-white hover:bg-[#1FC1DF]/10 hover:border-[#1FC1DF] hover:text-[#1FC1DF]"
                  >
                    <Filter className="w-4 h-4" />
                    {t.filters}
                    {activeFilterCount > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center bg-[#1FC1DF] text-white text-xs">
                        {activeFilterCount}
                      </Badge>
                    )}
                  </Button>
                </DialogTrigger>

                <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto bg-white">
                  <DialogHeader>
                    <DialogTitle className="text-2xl">{t.filterTitle}</DialogTitle>
                    <DialogDescription>{t.filterDesc}</DialogDescription>
                  </DialogHeader>

                  <div className="space-y-6 py-4">
                    {/* Oil Content Filter */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-full bg-[#1FC1DF]/10 flex items-center justify-center">
                            <TrendingUp className="w-5 h-5 text-[#1FC1DF]" />
                          </div>
                          <h3 className="font-semibold text-slate-900">{t.oilContent}</h3>
                        </div>
                        {filters.oilContent && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setFilters((prev) => ({ ...prev, oilContent: null }))}
                            className="h-8 text-xs"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        )}
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <Button
                          variant={
                            filters.oilContent?.[0] === 0 && filters.oilContent?.[1] === 20 ? "default" : "outline"
                          }
                          size="sm"
                          className={
                            filters.oilContent?.[0] === 0 && filters.oilContent?.[1] === 20
                              ? "bg-[#1FC1DF] hover:bg-[#1FC1DF]/90"
                              : ""
                          }
                          onClick={() => setFilters((prev) => ({ ...prev, oilContent: [0, 20] }))}
                        >
                          {isArabic ? "منخفض (< 20%)" : "Low (< 20%)"}
                        </Button>
                        <Button
                          variant={
                            filters.oilContent?.[0] === 20 && filters.oilContent?.[1] === 30 ? "default" : "outline"
                          }
                          size="sm"
                          className={
                            filters.oilContent?.[0] === 20 && filters.oilContent?.[1] === 30
                              ? "bg-[#1FC1DF] hover:bg-[#1FC1DF]/90"
                              : ""
                          }
                          onClick={() => setFilters((prev) => ({ ...prev, oilContent: [20, 30] }))}
                        >
                          {isArabic ? "متوسط (20-30%)" : "Medium (20-30%)"}
                        </Button>
                        <Button
                          variant={
                            filters.oilContent?.[0] === 30 && filters.oilContent?.[1] === 100 ? "default" : "outline"
                          }
                          size="sm"
                          className={
                            filters.oilContent?.[0] === 30 && filters.oilContent?.[1] === 100
                              ? "bg-[#1FC1DF] hover:bg-[#1FC1DF]/90"
                              : ""
                          }
                          onClick={() => setFilters((prev) => ({ ...prev, oilContent: [30, 100] }))}
                        >
                          {isArabic ? "مرتفع (> 30%)" : "High (> 30%)"}
                        </Button>
                      </div>
                    </div>

                    {/* Quantity Filter */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <Package className="w-5 h-5 text-blue-600" />
                          </div>
                          <h3 className="font-semibold text-slate-900">
                            {isArabic ? "الكمية (طن)" : "Quantity (tons)"}
                          </h3>
                        </div>
                        {filters.quantity && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setFilters((prev) => ({ ...prev, quantity: null }))}
                            className="h-8 text-xs"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        )}
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <Button
                          variant={filters.quantity?.[0] === 0 && filters.quantity?.[1] === 40 ? "default" : "outline"}
                          size="sm"
                          className={
                            filters.quantity?.[0] === 0 && filters.quantity?.[1] === 40
                              ? "bg-blue-600 hover:bg-blue-700"
                              : ""
                          }
                          onClick={() => setFilters((prev) => ({ ...prev, quantity: [0, 40] }))}
                        >
                          {isArabic ? "< 40 طن" : "< 40 tons"}
                        </Button>
                        <Button
                          variant={filters.quantity?.[0] === 40 && filters.quantity?.[1] === 60 ? "default" : "outline"}
                          size="sm"
                          className={
                            filters.quantity?.[0] === 40 && filters.quantity?.[1] === 60
                              ? "bg-blue-600 hover:bg-blue-700"
                              : ""
                          }
                          onClick={() => setFilters((prev) => ({ ...prev, quantity: [40, 60] }))}
                        >
                          {isArabic ? "40 - 60 طن" : "40 - 60 tons"}
                        </Button>
                        <Button
                          variant={
                            filters.quantity?.[0] === 60 && filters.quantity?.[1] === 100 ? "default" : "outline"
                          }
                          size="sm"
                          className={
                            filters.quantity?.[0] === 60 && filters.quantity?.[1] === 100
                              ? "bg-blue-600 hover:bg-blue-700"
                              : ""
                          }
                          onClick={() => setFilters((prev) => ({ ...prev, quantity: [60, 100] }))}
                        >
                          {isArabic ? "> 60 طن" : "> 60 tons"}
                        </Button>
                      </div>
                    </div>

                    {/* Suitable For Filter */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                            <Leaf className="w-5 h-5 text-emerald-600" />
                          </div>
                          <h3 className="font-semibold text-slate-900">{t.suitableFor}</h3>
                        </div>
                        {filters.suitableFor.length > 0 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setFilters((prev) => ({ ...prev, suitableFor: [] }))}
                            className="h-8 text-xs"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        )}
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <Button
                          variant={filters.suitableFor.includes(t.biofuel) ? "default" : "outline"}
                          size="sm"
                          className={
                            filters.suitableFor.includes(t.biofuel)
                              ? "bg-orange-500 hover:bg-orange-600 gap-2"
                              : "gap-2"
                          }
                          onClick={() => toggleSuitableFor(t.biofuel)}
                        >
                          <Flame className="w-4 h-4" />
                          {isArabic ? "وقود حيوي" : "Biofuel"}
                        </Button>
                        <Button
                          variant={filters.suitableFor.includes(t.activatedCarbon) ? "default" : "outline"}
                          size="sm"
                          className={
                            filters.suitableFor.includes(t.activatedCarbon)
                              ? "bg-cyan-500 hover:bg-cyan-600 gap-2"
                              : "gap-2"
                          }
                          onClick={() => toggleSuitableFor(t.activatedCarbon)}
                        >
                          <Droplet className="w-4 h-4" />
                          {isArabic ? "كربون منشط" : "Activated Carbon"}
                        </Button>
                        <Button
                          variant={filters.suitableFor.includes(t.construction) ? "default" : "outline"}
                          size="sm"
                          className={
                            filters.suitableFor.includes(t.construction)
                              ? "bg-slate-600 hover:bg-slate-700 gap-2"
                              : "gap-2"
                          }
                          onClick={() => toggleSuitableFor(t.construction)}
                        >
                          <Building2 className="w-4 h-4" />
                          {isArabic ? "مواد بناء" : "Construction"}
                        </Button>
                      </div>
                    </div>

                    {/* Location Filter */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                            <MapPin className="w-5 h-5 text-red-600" />
                          </div>
                          <h3 className="font-semibold text-slate-900">{t.location}</h3>
                        </div>
                        {filters.location.length > 0 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setFilters((prev) => ({ ...prev, location: [] }))}
                            className="h-8 text-xs"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        )}
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <Button
                          variant={filters.location.includes(t.jeddah) ? "default" : "outline"}
                          size="sm"
                          className={filters.location.includes(t.jeddah) ? "bg-red-600 hover:bg-red-700" : ""}
                          onClick={() => toggleLocation(t.jeddah)}
                        >
                          {isArabic ? "جدة" : "Jeddah"}
                        </Button>
                        <Button
                          variant={filters.location.includes(t.riyadh) ? "default" : "outline"}
                          size="sm"
                          className={filters.location.includes(t.riyadh) ? "bg-red-600 hover:bg-red-700" : ""}
                          onClick={() => toggleLocation(t.riyadh)}
                        >
                          {isArabic ? "الرياض" : "Riyadh"}
                        </Button>
                        <Button
                          variant={filters.location.includes(t.dammam) ? "default" : "outline"}
                          size="sm"
                          className={filters.location.includes(t.dammam) ? "bg-red-600 hover:bg-red-700" : ""}
                          onClick={() => toggleLocation(t.dammam)}
                        >
                          {isArabic ? "الدمام" : "Dammam"}
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Modal Footer */}
                  <div className="flex gap-3 pt-4 border-t">
                    <Button
                      variant="outline"
                      className="flex-1 bg-transparent"
                      onClick={resetFilters}
                      disabled={activeFilterCount === 0}
                    >
                      {t.reset}
                    </Button>
                    <Button
                      className="flex-1 bg-gradient-to-r from-[#1FC1DF] to-[#2896DD] hover:opacity-90 text-white"
                      onClick={() => setFilterModalOpen(false)}
                    >
                      {t.applyFilters}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Active Filters Display */}
            {activeFilterCount > 0 && (
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="text-sm text-slate-600 font-medium">{t.activeFilters}:</span>
                {filters.oilContent && (
                  <Badge variant="secondary" className="gap-1">
                    {isArabic ? "نسبة الزيت" : "Oil Content"}: {filters.oilContent[0]}-{filters.oilContent[1]}%
                    <button
                      onClick={() => setFilters((prev) => ({ ...prev, oilContent: null }))}
                      className="ml-1 hover:text-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                )}
                {filters.quantity && (
                  <Badge variant="secondary" className="gap-1">
                    {isArabic ? "الكمية" : "Quantity"}: {filters.quantity[0]}-{filters.quantity[1]} {t.tons}
                    <button
                      onClick={() => setFilters((prev) => ({ ...prev, quantity: null }))}
                      className="ml-1 hover:text-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                )}
                {filters.suitableFor.map((use) => (
                  <Badge key={use} variant="secondary" className="gap-1">
                    {use}
                    <button onClick={() => toggleSuitableFor(use)} className="ml-1 hover:text-red-600">
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
                {filters.location.map((loc) => (
                  <Badge key={loc} variant="secondary" className="gap-1">
                    {loc}
                    <button onClick={() => toggleLocation(loc)} className="ml-1 hover:text-red-600">
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetFilters}
                  className="h-7 text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  {t.clearAll}
                </Button>
              </div>
            )}
          </Card>

          {/* Results Count */}
          <div className="flex items-center justify-between">
            <p className="text-slate-600">
              {filteredBatches.length} {t.results}
            </p>
            <Badge className="bg-green-100 text-green-700 border-green-200 border">{t.available}</Badge>
          </div>

          {/* Batches Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBatches.map((batch, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                {/* Image */}
                <div className="relative h-48 bg-slate-200 overflow-hidden">
                  <img
                    src={batch.image || "/placeholder.svg"}
                    alt={batch.factory}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 flex gap-2">
                    <Badge className="bg-white/90 text-slate-900 border-0">{batch.id}</Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  {/* Factory Name */}
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg mb-1">{batch.factory}</h3>
                    <div className="flex items-center gap-1 text-sm text-slate-600">
                      <MapPin className="w-4 h-4" />
                      {batch.location}
                    </div>
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-xs text-slate-600">
                        <Package className="w-3 h-3" />
                        {t.quantity}
                      </div>
                      <p className="font-bold text-slate-900">
                        {batch.quantity} {t.tons}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-xs text-slate-600">
                        <TrendingUp className="w-3 h-3" />
                        {t.oilContent}
                      </div>
                      <p className="font-bold text-slate-900">{batch.oilContent}%</p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-xs text-slate-600">
                        <Leaf className="w-3 h-3" />
                        {t.co2Impact}
                      </div>
                      <p className="font-bold text-[#1FC1DF]">
                        {batch.co2Reduction} {t.tons}
                      </p>
                    </div>
                  </div>

                  {/* Suitable For */}
                  <div className="space-y-2">
                    <p className="text-xs text-slate-600">{t.suitableFor}</p>
                    <div className="flex flex-wrap gap-2">
                      {batch.suitableFor.map((use, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {use}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      className="flex-1 bg-transparent"
                      size="sm"
                      onClick={() => router.push(`/processor/marketplace/${batch.id}`)}
                    >
                      {t.viewDetails}
                    </Button>
                    <Button
                      className="flex-1 bg-gradient-to-r from-[#1FC1DF] to-[#2896DD] hover:opacity-90 text-white gap-2"
                      size="sm"
                      onClick={() => router.push(`/processor/purchase/${batch.id}`)}
                    >
                      <ShoppingCart className="w-4 h-4" />
                      {t.purchase}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

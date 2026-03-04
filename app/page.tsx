"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Factory,
  Recycle,
  Leaf,
  ArrowRight,
  Flame,
  Globe2,
  Sparkles,
  User,
  Mail,
  Droplet,
  Building2,
} from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  const [lang, setLang] = useState<"ar" | "en">(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("sbe2value-lang") as "ar" | "en") || "ar"
    }
    return "ar"
  })

  const isArabic = lang === "ar"

  // AI Demo form state
  const [oilType, setOilType] = useState("")
  const [showCustomOilType, setShowCustomOilType] = useState(false)
  const [customOilType, setCustomOilType] = useState("")
  const [labReportFile, setLabReportFile] = useState<File | null>(null)
  const [demoFormData, setDemoFormData] = useState({
    factoryName: "",
    quantity: "",
    moistureContent: "",
    oilContent: "",
    ashContent: "",
    additionalNotes: "",
  })

  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmittingContact, setIsSubmittingContact] = useState(false)
  const [contactSubmitted, setContactSubmitted] = useState(false)

  const content = {
    ar: {
      // Navigation
      navAbout: "عن المنصة",
      navHowItWorks: "كيف تعمل",
      navDemo: "تجربة العرض التوضيحي",
      navContact: "تواصل معنا",
      navLogin: "تسجيل الدخول",
      navImpact: "عرض الأثر البيئي",

      // Hero Section
      heroTitle: "SBE من نفاية وعبء الى.. قيمة مستدامة!",
      heroDesc: "سنوات من الهدر انتهت اليوم. منصتنا تفتح لك بابًا جديدًا لتحويل هذه المادة إلى مصدر دخل واستدامة.",
      heroBtn1: "جرّب التحليل الذكي الآن",
      heroBtn2: "اكتشف كيف تعمل المنصة",

      // Problem Section
      problemTitle: "من نفاية خطرة إلى فرصة اقتصادية",
      problemDesc:
        "تنتج مصانع الزيوت في السعودية أكثر من 100,000 طن سنويًا من بودرة التبييض المستهلكة — نفاية مشبعة بالزيوت، قابلة للاشتعال، وغالبًا تُدفن أو تُحرق. تحتوي على ما يصل إلى 15٪ من الزيت القابل للاستعادة، ما يعني موارد مهدرة وفرص ضائعة.",

      // Solution Section
      solutionTitle: "التقنية الذكية التي تغيّر مفهوم إدارة النفايات الصناعية",
      solutionDesc:
        "تستخدم SBE2Value خوارزميات الذكاء الاصطناعي لتحليل خصائص SBE والتوصية بأفضل طريقة لإعادة الاستخدام، مما يخلق اقتصادًا دائريًا مستدامًا.",
      solutionStep1: "مصنع",
      solutionStep2: "تحليل بالذكاء الاصطناعي",
      solutionStep3: "معالجة صناعية",
      solutionStep4: "منتج مستدام",

      // How It Works
      howTitle: "أربع خطوات لتحويل نفاياتك إلى قيمة مستدامة",
      step1Title: "إدخال بيانات المصنع",
      step1Desc: "املأ خصائص البودرة مثل الكمية، نسبة الزيت، والخ...",
      step2Title: "تحليل بالذكاء الاصطناعي",
      step2Desc: "تقوم المنصة بتحليل البيانات واقتراح أفضل مسار لإعادة الاستخدام.",
      step3Title: "نتائج تفاعلية",
      step3Desc: "تعرض لوحة التحكم الأرباح المحتملة، والانبعاثات المتجنّبة، والطاقة المستعادة.",
      step4Title: "الربط مع شركات المعالجة",
      step4Desc: "تتصل بالمصانع والشركات لمعالجة الدُفعات وتحقيق العائد.",
      howBtn: "ابدأ الآن وجرّب التحليل التجريبي!",

      // Impact Section
      impactTitle: "توقعات مدروسة، نحو تأثير مستدام!",
      impact1: "+100,000 طن من بودرة SBE تُنتج سنويًا في السعودية",
      impact2: "حتى 15٪ من الزيت القابل للاستعادة في كل دفعة",
      impact3: "315 طن من CO₂ يتم تجنبها لكل 1000 طن معالجة",
      impact4: "أكثر من 200,000 ريال سعودي أرباح محتملة لكل دفعة معالجة",

      // AI Demo Section
      demoTitle: "جرّب نموذج الذكاء الاصطناعي بنفسك",
      demoSubtitle: "تم تدريب نموذج الذكاء الاصطناعي بواسطة فريق SBE2VALUE",
      demoDesc: "أدخل بياناتك عن بودرة التبييض، واختر نوع الزيت، ودع النظام الذكي يقترح أفضل مسار لإعادة التدوير.",
      demoFactoryName: "اسم المصنع",
      demoFactoryPlaceholder: "مثال: مصنع زيت عافية",
      demoQuantity: "الكمية المتاحة (طن)",
      demoQuantityPlaceholder: "مثال: 50",
      demoOilType: "نوع الزيت",
      demoOilPlaceholder: "اختر نوع الزيت",
      demoOilTypes: {
        palm: "زيت النخيل (Palm Oil)",
        soybean: "زيت الصويا (Soybean Oil)",
        sunflower: "زيت دوّار الشمس (Sunflower Oil)",
        canola: "زيت الكانولا (Canola / Rapeseed Oil)",
        corn: "زيت الذرة (Corn Oil)",
        olive: "زيت الزيتون (Olive Oil)",
        other: "نوع آخر",
      },
      demoCustomOilPlaceholder: "اكتب نوع الزيت",
      demoMoisture: "نسبة الرطوبة (%)",
      demoMoisturePlaceholder: "مثال: 15",
      demoOilContent: "نسبة الزيت المتبقي (%)",
      demoOilContentPlaceholder: "مثال: 25",
      demoAsh: "نسبة الرماد (%)",
      demoAshPlaceholder: "مثال: 10",
      demoLabReport: "تقرير المختبر (اختياري)",
      demoLabReportDesc: "يمكنك رفع ملف PDF أو Excel",
      demoUploadFile: "اختر ملف",
      demoRemoveFile: "إزالة",
      demoNotes: "ملاحظات إضافية",
      demoNotesPlaceholder: "أي معلومات إضافية قد تكون مفيدة...",
      demoBtn: "تحليل بالذكاء الاصطناعي",

      // Team Section
      teamTitle: "فريقنا",

      // Contact Section
      contactTitle: "تواصل معنا",
      contactDesc: "هل ترغب في معرفة المزيد أو التعاون معنا؟ أرسل لنا رسالة وسنعود إليك قريبًا.",
      contactName: "الاسم",
      contactEmail: "البريد الإلكتروني",
      contactMessage: "الرسالة",
      contactBtn: "إرسال",

      // Footer
      footerAbout: "عن المنصة",
      footerHow: "كيف تعمل",
      footerContact: "تواصل معنا",
      footerCopyright: "© 2025 SBE2Value. جميع الحقوق محفوظة.",
      footerTagline: "نحو اقتصاد أكثر استدامة… خطوة بخطوة",

      // What is SBE Section
      whatIsSBETitle: "ما هي SBE؟",
      whatIsSBEDesc:
        'مادة تُعرف بـ"Spent Bleaching Earth" تنتج من عمليات تكرير الزيوت، وتُعتبر في أغلب الصناعات نفاية لا فائدة منها. لكن الحقيقة؟',
      whatIsSBESubtitle:
        'هي مادة صناعية ناتجة من تكرير الزيوت النباتية، وغالبًا تُعتبر "نفاية" رغم إنها تحمل خصائص كيميائية وفيزيائية تجعلها منجم فرص مهدر!',
      whatIsSBEPropertiesTitle: "الخصائص الفيزيائية والكيميائية لـSBE:",
      whatIsSBEProperty1: "بودرة بنية داكنة ذات رائحة زيتية",
      whatIsSBEProperty2: "pH شبه متعادل (5–7)",
      whatIsSBEProperty3: "غير قابلة للذوبان في الماء",
      whatIsSBEProperty4: "قابلة للاشتعال الذاتي (عند درجات حرارة 50–90°C) بسبب محتوى الزيت العالي",
      whatIsSBEUsesTitle: "استخدامات SBE الصناعية:",
      whatIsSBEUse1: "استخراج الزيوت المتبقية",
      whatIsSBEUse2: "إنتاج وقود حيوي أو طاقة حرارية",
      whatIsSBEUse3: "تصنيع الطوب الإسمنتي والإضافات الزراعية",
      whatIsSBEUse4: "إعادة التدوير في صناعات مستدامة",

      // Real Problem Section
      realProblemTitle: "المشكلة الحقيقية",
      realProblemDesc: (
        <>
          الجهل بقيمة الـSBE هو التحدي الأكبر!
          <br />
          وهذه هي المشكلة الحقيقـية
        </>
      ),
      realProblemPoint:
        "كل يوم تُهدر كميات ضخمة من SBE وتُدفن، رغم قدرتها على دعم الاقتصاد وتقليل الانبعاثات. وفي ظل هذا الجهل، تضيع فرص استثمارية وبيئية كبيرة.",

      // Platform Solution Section
      platformSolutionTitle: "المنصة هي الحل",
      platformSolutionSubtitle: "نحوّل SBE من عبء إلى فرصة عبر:",
      platformPoint1Title: "تحليل دقيق لخصائص SBE",
      platformPoint1Desc: "نسبة الزيت، الحموضة، الاستخدام الأمثل",
      platformPoint2Title: "ربط مباشر مع شركات المعالجة والمصانع",
      platformPoint2Desc: "نربطك بالشركات المناسبة لمعالجة SBE",
      platformPoint3Title: "توصية بأفضل طريقة معالجة",
      platformPoint3Desc: "حسب هدف المصنع واحتياجاته",
      platformPoint4Title: "احتساب الأثر البيئي والعائد الاقتصادي",
      platformPoint4Desc: "نقيس التأثير الحقيقي لكل قرار",

      // Why Process SBE Section
      whyProcessTitle: "ليش تعالج الـSBE؟",
      whyPoint1: "تقلل التكاليف البيئية",
      whyPoint2: 'تخلق منتجات جديدة من "نفاية"',
      whyPoint3: "تدعم أهداف الاستدامة وتقلل البصمة الكربونية",
      whyPoint4: "تفتح سوقًا جديدًا في الاقتصاد الدائري",

      // Conclusion Section
      conclusionTitle: "البداية الحقيقية",
      conclusionLine1: "في عالم أهدر قيمة هذه المادة لسنوات،",
      conclusionLine2: "وُلدت منصتنا لتغيّر هذه النظرة تمامًا.",
      conclusionLine3: "هنا… تبدأ البداية الحقيقية لتحويل SBE إلى قيمة مستدامة.",

      // Environmental Impact Section (Removed as per update)
      // impactSectionTitle: "عرض الأثر البيئي",
      // sdgAlignment: "التوافق مع أهداف التنمية المستدامة (SDGs) بناء على رؤية السعودية",
      // circularEconomy: "تعزيز الاقتصاد الدائري",
      // emissionsReduction: "تقليل الانبعاثات والتلوث البيئي",
      // saudiGreenInitiative: "دعم مبادرة السعودية الخضراء",
      // energyEfficiency: "تعزيز كفاءة الطاقة والاستخدام الذكي للموارد",
    },
    en: {
      // Navigation
      navAbout: "About",
      navHowItWorks: "How It Works",
      navDemo: "Demo",
      navContact: "Contact",
      navLogin: "Login",
      navImpact: "View Impact",

      // Hero Section
      heroTitle: "SBE from Waste and Burden to... Sustainable Value!",
      heroDesc:
        "Years of waste ended today. Our platform opens a new door for you to transform this material into a source of income and sustainability.",
      heroBtn1: "Try Smart Analysis Now",
      heroBtn2: "Discover How It Works",

      // Problem Section
      problemTitle: "From Hazardous Waste to Economic Opportunity",
      problemDesc:
        "Oil factories in Saudi Arabia produce over 100,000 tons annually of spent bleaching earth — oil-saturated waste that is flammable and often buried or burned. It contains up to 15% recoverable oil, meaning wasted resources and lost opportunities.",

      // Solution Section
      solutionTitle: "Smart Technology Changing Industrial Waste Management",
      solutionDesc:
        "SBE2Value uses AI algorithms to analyze SBE properties and recommend the best reuse method, creating a sustainable circular economy.",
      solutionStep1: "Factory",
      solutionStep2: "AI Analysis",
      solutionStep3: "Industrial Processing",
      solutionStep4: "Sustainable Product",

      // How It Works
      howTitle: "Four Steps to Transform Your Waste into Sustainable Value",
      step1Title: "Input Factory Data",
      step1Desc: "Fill in powder properties like quantity, oil percentage, etc...",
      step2Title: "AI Analysis",
      step2Desc: "The platform analyzes data and suggests the best reuse pathway.",
      step3Title: "Interactive Results",
      step3Desc: "Dashboard displays potential profits, avoided emissions, and recovered energy.",
      step4Title: "Connect with Processors",
      step4Desc: "Connect with factories and companies to process batches and achieve returns.",
      howBtn: "Start Now and Try the Demo!",

      // Impact Section
      impactTitle: "Studied Expectations, Towards Sustainable Impact!",
      impact1: "+100,000 tons of SBE powder produced annually in Saudi Arabia",
      impact2: "Up to 15% recoverable oil in each batch",
      impact3: "315 tons of CO₂ avoided per 1000 tons processed",
      impact4: "Over 200,000 SAR potential profit per processed batch",

      // AI Demo Section
      demoTitle: "Try the AI Model Yourself",
      demoSubtitle: "The AI model was trained by the SBE2VALUE team",
      demoDesc:
        "Enter your bleaching earth data, choose oil type, and let the smart system suggest the best recycling pathway.",
      demoFactoryName: "Factory Name",
      demoFactoryPlaceholder: "Example: Afia Oil Factory",
      demoQuantity: "Available Quantity (tons)",
      demoQuantityPlaceholder: "Example: 50",
      demoOilType: "Oil Type",
      demoOilPlaceholder: "Select oil type",
      demoOilTypes: {
        palm: "Palm Oil (زيت النخيل)",
        soybean: "Soybean Oil (زيت الصويا)",
        sunflower: "Sunflower Oil (زيت دوّار الشمس)",
        canola: "Canola / Rapeseed Oil (زيت الكانولا)",
        corn: "Corn Oil (زيت الذرة)",
        olive: "Olive Oil (زيت الزيتون)",
        other: "Other Type",
      },
      demoCustomOilPlaceholder: "Enter oil type",
      demoMoisture: "Moisture Content (%)",
      demoMoisturePlaceholder: "Example: 15",
      demoOilContent: "Residual Oil Content (%)",
      demoOilContentPlaceholder: "Example: 25",
      demoAsh: "Ash Content (%)",
      demoAshPlaceholder: "Example: 10",
      demoLabReport: "Lab Report (Optional)",
      demoLabReportDesc: "You can upload a PDF or Excel file",
      demoUploadFile: "Choose File",
      demoRemoveFile: "Remove",
      demoNotes: "Additional Notes",
      demoNotesPlaceholder: "Any additional information that might be helpful...",
      demoBtn: "Analyze with AI",

      // Team Section
      teamTitle: "Our Team",

      // Contact Section
      contactTitle: "Contact Us",
      contactDesc: "Want to learn more or collaborate with us? Send us a message and we'll get back to you soon.",
      contactName: "Name",
      contactEmail: "Email",
      contactMessage: "Message",
      contactBtn: "Send",

      // Footer
      footerAbout: "About",
      footerHow: "How It Works",
      footerContact: "Contact",
      footerCopyright: "© 2025 SBE2Value. All rights reserved.",
      footerTagline: "Towards a more sustainable economy… step by step",

      // What is SBE Section
      whatIsSBETitle: "What is SBE?",
      whatIsSBEDesc:
        'A material known as "Spent Bleaching Earth" produced from oil refining processes, considered in most industries as useless waste. But the truth?',
      whatIsSBESubtitle:
        "It is an industrial material resulting from vegetable oil refining, often considered 'waste' despite having chemical and physical properties that make it a wasted mine of opportunities!",
      whatIsSBEPropertiesTitle: "Physical and Chemical Properties of SBE:",
      whatIsSBEProperty1: "Dark brown powder with oily smell",
      whatIsSBEProperty2: "Nearly neutral pH (5-7)",
      whatIsSBEProperty3: "Not soluble in water",
      whatIsSBEProperty4: "Self-ignitable (at temperatures 50-90°C) due to high oil content",
      whatIsSBEUsesTitle: "Industrial Uses of SBE:",
      whatIsSBEUse1: "Extraction of residual oils",
      whatIsSBEUse2: "Production of biofuel or thermal energy",
      whatIsSBEUse3: "Manufacturing of cement bricks and agricultural additives",
      whatIsSBEUse4: "Recycling in sustainable industries",

      // Real Problem Section
      realProblemTitle: "The Real Problem",
      realProblemDesc: (
        <>
          Ignorance about SBE's value is the biggest challenge!
          <br />
          And this is the real problem
        </>
      ),
      realProblemPoint:
        "Every day, massive amounts of SBE are wasted and buried, despite their ability to support the economy and reduce emissions. In this ignorance, major investment and environmental opportunities are lost.",

      // Platform Solution Section
      platformSolutionTitle: "The Platform is the Solution",
      platformSolutionSubtitle: "We transform SBE from burden to opportunity through:",
      platformPoint1Title: "Precise analysis of SBE characteristics",
      platformPoint1Desc: "Oil percentage, acidity, optimal use",
      platformPoint2Title: "Direct connection with processing companies and factories",
      platformPoint2Desc: "We connect you with the right companies to process SBE",
      platformPoint3Title: "Recommendation of best processing method",
      platformPoint3Desc: "Based on factory goals and needs",
      platformPoint4Title: "Calculation of environmental impact and economic return",
      platformPoint4Desc: "We measure the real impact of every decision",

      // Why Process SBE Section
      whyProcessTitle: "Why Process SBE?",
      whyPoint1: "Reduces environmental costs",
      whyPoint2: 'Creates new products from "waste"',
      whyPoint3: "Supports sustainability goals and reduces carbon footprint",
      whyPoint4: "Opens a new market in the circular economy",

      // Conclusion Section
      conclusionTitle: "The Real Beginning",
      conclusionLine1: "In a world that wasted the value of this material for years,",
      conclusionLine2: "Our platform was born to completely change this perspective.",
      conclusionLine3: "Here… begins the real journey of transforming SBE into sustainable value.",

      // Environmental Impact Section (Removed as per update)
      // impactSectionTitle: "Environmental Impact",
      // sdgAlignment: "Alignment with SDGs based on Saudi Vision",
      // circularEconomy: "Promoting Circular Economy",
      // emissionsReduction: "Reducing Emissions and Environmental Pollution",
      // saudiGreenInitiative: "Supporting Saudi Green Initiative",
      // energyEfficiency: "Enhancing Energy Efficiency and Smart Resource Use",
    },
  }

  const t = content[lang]

  const teamMembers = [
    { name: "جمانة الدريهم", nameEn: "Jumana Al-Duraihim" },
    { name: "جوهرة الحقباني", nameEn: "Jawhara Al-Haqbani" },
    { name: "ريما آل سعيد", nameEn: "Rima Al Saeed" },
    { name: "ربى العتيبي", nameEn: "Ruba Al-Otaibi" },
    { name: "فاطمة الكعبي", nameEn: "Fatima Al-Kaabi" },
  ]

  const handleDemoOilTypeChange = (value: string) => {
    setOilType(value)
    if (value === "other") {
      setShowCustomOilType(true)
    } else {
      setShowCustomOilType(false)
      setCustomOilType("")
    }
  }

  const handleDemoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const validTypes = [
        "application/pdf",
        "application/ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ]
      if (validTypes.includes(file.type)) {
        setLabReportFile(file)
      } else {
        alert(isArabic ? "يرجى اختيار ملف PDF أو Excel فقط" : "Please select only PDF or Excel files")
      }
    }
  }

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Store demo data and redirect to factory input page
    const dataToStore = {
      ...demoFormData,
      oilType: oilType === "other" ? customOilType : oilType,
    }
    sessionStorage.setItem("sbeData", JSON.stringify(dataToStore))
    window.location.href = "/factory/analysis"
  }

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmittingContact(true)

    try {
      // Send email using mailto (opens user's email client)
      const subject = encodeURIComponent(
        isArabic ? `رسالة من ${contactForm.name} - SBE2Value` : `Message from ${contactForm.name} - SBE2Value`,
      )
      const body = encodeURIComponent(
        `${isArabic ? "الاسم" : "Name"}: ${contactForm.name}\n${isArabic ? "البريد الإلكتروني" : "Email"}: ${contactForm.email}\n\n${isArabic ? "الرسالة" : "Message"}:\n${contactForm.message}`,
      )

      // Open mailto link
      window.location.href = `mailto:jumanaaldurayhim@gmail.com?subject=${subject}&body=${body}`

      // Show success message
      setContactSubmitted(true)
      setContactForm({ name: "", email: "", message: "" })

      // Reset success message after 5 seconds
      setTimeout(() => {
        setContactSubmitted(false)
      }, 5000)
    } catch (error) {
      console.error("Error sending message:", error)
      alert(isArabic ? "حدث خطأ أثناء إرسال الرسالة" : "An error occurred while sending the message")
    } finally {
      setIsSubmittingContact(false)
    }
  }

  useEffect(() => {
    const handleLanguageChange = (e: CustomEvent) => {
      setLang(e.detail.lang)
    }
    window.addEventListener("languageChange", handleLanguageChange as EventListener)
    return () => window.removeEventListener("languageChange", handleLanguageChange as EventListener)
  }, [])

  const handleLanguageToggle = () => {
    const newLang = lang === "ar" ? "en" : "ar"
    setLang(newLang)
    localStorage.setItem("sbe2value-lang", newLang)
    window.dispatchEvent(new CustomEvent("languageChange", { detail: { lang: newLang } }))
  }

  return (
    <div className={`min-h-screen bg-white ${isArabic ? "rtl" : "ltr"}`} dir={isArabic ? "rtl" : "ltr"}>
      {/* Navigation Bar */}
      <header className="border-b bg-white sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                <img src="/logo.png" alt="SBE2Value Logo" className="w-10 h-10 object-contain" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[#1FC1DF] to-[#2896DD] bg-clip-text text-transparent">
                SBE2Value
              </h1>
            </div>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center gap-6">
              <a href="#about" className="text-slate-700 hover:text-[#1FC1DF] transition-colors">
                {t.navAbout}
              </a>
              <a href="#how-it-works" className="text-slate-700 hover:text-[#1FC1DF] transition-colors">
                {t.navHowItWorks}
              </a>
              <a href="#demo" className="text-slate-700 hover:text-[#1FC1DF] transition-colors">
                {t.navDemo}
              </a>
              <a href="#contact" className="text-slate-700 hover:text-[#1FC1DF] transition-colors">
                {t.navContact}
              </a>
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <Link href="/impact">
                <Button variant="outline" size="sm" className="gap-2 text-green-600 border-green-600 bg-transparent">
                  {t.navImpact}
                </Button>
              </Link>
              <Link href="/login">
                <Button size="sm" className="bg-gradient-to-r from-[#1FC1DF] to-[#2896DD] text-white">
                  {t.navLogin}
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={handleLanguageToggle} className="gap-2">
                <Globe2 className="w-4 h-4" />
                {lang === "ar" ? "EN" : "ع"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-50 via-green-50/30 to-blue-50/30 py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-64 h-64 bg-[#1FC1DF] rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#2896DD] rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-6xl font-bold text-balance leading-tight text-cyan-500">{t.heroTitle}</h2>
            <p className="text-lg md:text-xl text-slate-600 text-pretty max-w-3xl mx-auto leading-relaxed">
              {t.heroDesc}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <a href="#demo">
                <Button size="lg" className="bg-gradient-to-r from-[#1FC1DF] to-[#2896DD] text-white gap-2 px-8">
                  <Sparkles className="w-5 h-5" />
                  {t.heroBtn1}
                </Button>
              </a>
              <a href="#how-it-works">
                <Button size="lg" variant="outline" className="gap-2 px-8 bg-transparent">
                  {t.heroBtn2}
                  <ArrowRight className={`w-5 h-5 ${isArabic ? "rotate-180" : ""}`} />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section - Moved to top */}
      <section className="relative py-20 bg-gradient-to-br from-slate-900 via-[#1FC1DF]/30 to-[#2896DD]/40 text-white overflow-hidden">
        {/* Background overlay for better text contrast */}
        <div className="absolute inset-0 bg-slate-900/60" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
              {/* Stat 1 */}
              <div className="space-y-3">
                <div className="text-5xl md:text-6xl font-bold text-white">+100,000</div>
                <p className="text-lg text-slate-200 leading-relaxed">
                  {isArabic
                    ? "طن من بودرة SBE تُنتج سنويًا في السعودية"
                    : "tons of SBE powder produced annually in Saudi Arabia"}
                </p>
              </div>

              {/* Stat 2 */}
              <div className="space-y-3">
                <div className="text-5xl md:text-6xl font-bold text-white">+15%</div>
                <p className="text-lg text-slate-200 leading-relaxed">
                  {isArabic ? "من الزيت القابل للاستعادة في كل دفعة" : "recoverable oil in each batch"}
                </p>
              </div>

              {/* Stat 3 */}
              <div className="space-y-3">
                <div className="text-5xl md:text-6xl font-bold text-white">+315</div>
                <p className="text-lg text-slate-200 leading-relaxed">
                  {isArabic ? "طن من CO₂ يتم تجنبها لكل 1000 طن معالجة" : "tons of CO₂ avoided per 1000 tons processed"}
                </p>
              </div>

              {/* Stat 4 */}
              <div className="space-y-3">
                <div className="text-5xl md:text-6xl font-bold text-white">+200,000</div>
                <p className="text-lg text-slate-200 leading-relaxed">
                  {isArabic ? "ريال سعودي أرباح محتملة لكل دفعة معالجة" : "SAR potential profit per processed batch"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Combined Real Problem + What is SBE Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-16">
            <div className={`flex flex-col ${isArabic ? "md:flex-row-reverse" : "md:flex-row"} items-start gap-12`}>
              {/* Image on left (right in RTL) - larger and without box */}
              <div className="w-full md:w-1/2">
                <img
                  src="/images/design-mode/c5316eb5-4938-4b96-9d71-e93532d1147d.png"
                  alt="SBE Powder"
                  className="w-full h-auto"
                />
              </div>

              {/* Text on right (left in RTL) */}
              <div className="w-full md:w-1/2 space-y-8">
                {/* Real Problem */}
                <div className="space-y-4">
                  <p className="text-red-600 leading-relaxed font-black tracking-normal text-3xl">
                    {t.realProblemDesc}
                  </p>
                  <p className="text-lg text-slate-700 leading-relaxed">{t.realProblemPoint}</p>
                </div>

                {/* What is SBE */}
                <div className="space-y-4 pt-6 border-t border-slate-200">
                  <h3 className="text-2xl font-bold text-cyan-500 md:text-5xl">{t.whatIsSBETitle}</h3>
                  <p className="text-lg text-slate-600 leading-relaxed">{t.whatIsSBEDesc}</p>
                  <p className="text-lg font-semibold text-[#1FC1DF]">{t.whatIsSBESubtitle}</p>

                  <div className="space-y-6 pt-4">
                    {/* Physical and Chemical Properties */}
                    <div className="space-y-3">
                      <h4 className="text-xl font-bold text-slate-900">{t.whatIsSBEPropertiesTitle}</h4>
                      <ul className="space-y-2 text-lg text-slate-700">
                        <li className="flex items-start gap-3">
                          <span className="text-[#1FC1DF] mt-1">•</span>
                          <span>{t.whatIsSBEProperty1}</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-[#1FC1DF] mt-1">•</span>
                          <span>{t.whatIsSBEProperty2}</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-[#1FC1DF] mt-1">•</span>
                          <span>{t.whatIsSBEProperty3}</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-[#1FC1DF] mt-1">•</span>
                          <span>{t.whatIsSBEProperty4}</span>
                        </li>
                      </ul>
                    </div>

                    {/* Industrial Uses */}
                    <div className="space-y-4">
                      <h4 className="text-xl font-bold text-slate-900">{t.whatIsSBEUsesTitle}</h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Use 1: Oil Extraction */}
                        <div className="p-5 rounded-xl bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200 hover:shadow-lg transition-shadow">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#1FC1DF] to-[#2896DD] flex items-center justify-center flex-shrink-0">
                              <Droplet className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                              <p className="text-base font-semibold text-slate-900 leading-relaxed">
                                {t.whatIsSBEUse1}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Use 2: Biofuel/Energy */}
                        <div className="p-5 rounded-xl bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200 hover:shadow-lg transition-shadow">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#1FC1DF] to-[#2896DD] flex items-center justify-center flex-shrink-0">
                              <Flame className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                              <p className="text-base font-semibold text-slate-900 leading-relaxed">
                                {t.whatIsSBEUse2}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Use 3: Cement/Agriculture */}
                        <div className="p-5 rounded-xl bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200 hover:shadow-lg transition-shadow">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#1FC1DF] to-[#2896DD] flex items-center justify-center flex-shrink-0">
                              <Building2 className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                              <p className="text-base font-semibold text-slate-900 leading-relaxed">
                                {t.whatIsSBEUse3}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Use 4: Sustainable Recycling */}
                        <div className="p-5 rounded-xl bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200 hover:shadow-lg transition-shadow">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#1FC1DF] to-[#2896DD] flex items-center justify-center flex-shrink-0">
                              <Recycle className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                              <p className="text-base font-semibold text-slate-900 leading-relaxed">
                                {t.whatIsSBEUse4}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Solution Section */}
      

      {/* Environmental Impact Section (Removed as per update) */}
      {/* <section className="py-20 bg-gradient-to-br from-green-50 via-emerald-50/50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-green-600 to-emerald-600 mb-4">
                <Globe2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-slate-900">{t.impactSectionTitle}</h3>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* SDG Alignment */}
      {/*         <Card className="p-6 hover:shadow-lg transition-shadow bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center">
                    <Globe2 className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">{t.sdgAlignment}</h4>
                </div>
              </Card>

              {/* Circular Economy */}
      {/*         <Card className="p-6 hover:shadow-lg transition-shadow bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center">
                    <Recycle className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">{t.circularEconomy}</h4>
                </div>
              </Card>

              {/* Emissions Reduction */}
      {/*         <Card className="p-6 hover:shadow-lg transition-shadow bg-gradient-to-br from-teal-50 to-cyan-50 border-teal-200">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-teal-600 to-cyan-600 flex items-center justify-center">
                    <Leaf className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">{t.emissionsReduction}</h4>
                </div>
              </Card>

              {/* Saudi Green Initiative */}
      {/*         <Card className="p-6 hover:shadow-lg transition-shadow bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-600 to-green-700 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">{t.saudiGreenInitiative}</h4>
                </div>
              </Card>

              {/* Energy Efficiency */}
      {/*         <Card className="p-6 hover:shadow-lg transition-shadow bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-600 to-orange-600 flex items-center justify-center">
                    <Flame className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">{t.energyEfficiency}</h4>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section> */}

      {/* Why Process SBE Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-100 mb-4">
                <Flame className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-slate-900">{t.problemTitle}</h3>
              <p className="text-lg text-slate-600 leading-relaxed text-pretty">{t.problemDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1FC1DF] to-[#2896DD] mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-slate-900">{t.solutionTitle}</h3>
              <p className="text-lg text-slate-600 leading-relaxed text-pretty max-w-3xl mx-auto">{t.solutionDesc}</p>
            </div>

            {/* Process Flow */}
            <div className="flex items-center justify-center gap-4 pt-8 flex-wrap">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center mx-auto">
                  <Factory className="w-8 h-8 text-[#1FC1DF]" />
                </div>
                <p className="font-semibold text-slate-900">{t.solutionStep1}</p>
              </div>

              <div className="relative">
                <ArrowRight
                  className={`w-10 h-10 ${isArabic ? "rotate-180" : ""}`}
                  style={{
                    filter: "drop-shadow(0 2px 8px rgba(31, 193, 223, 0.3))",
                    animation: "flowArrow 2s ease-in-out infinite",
                  }}
                  stroke="url(#arrowGradient1)"
                  strokeWidth={2.5}
                />
                <svg width="0" height="0">
                  <defs>
                    <linearGradient id="arrowGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#1FC1DF" />
                      <stop offset="100%" stopColor="#2896DD" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              <div className="text-center space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center mx-auto">
                  <Sparkles className="w-8 h-8 text-[#2896DD]" />
                </div>
                <p className="font-semibold text-slate-900">{t.solutionStep2}</p>
              </div>

              <div className="relative">
                <ArrowRight
                  className={`w-10 h-10 ${isArabic ? "rotate-180" : ""}`}
                  style={{
                    filter: "drop-shadow(0 2px 8px rgba(40, 150, 221, 0.3))",
                    animation: "flowArrow 2s ease-in-out infinite 0.3s",
                  }}
                  stroke="url(#arrowGradient2)"
                  strokeWidth={2.5}
                />
                <svg width="0" height="0">
                  <defs>
                    <linearGradient id="arrowGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#2896DD" />
                      <stop offset="100%" stopColor="#22c55e" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              <div className="text-center space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center mx-auto">
                  <Recycle className="w-8 h-8 text-green-600" />
                </div>
                <p className="font-semibold text-slate-900">{t.solutionStep3}</p>
              </div>

              <div className="relative">
                <ArrowRight
                  className={`w-10 h-10 ${isArabic ? "rotate-180" : ""}`}
                  style={{
                    filter: "drop-shadow(0 2px 8px rgba(34, 197, 94, 0.3))",
                    animation: "flowArrow 2s ease-in-out infinite 0.6s",
                  }}
                  stroke="url(#arrowGradient3)"
                  strokeWidth={2.5}
                />
                <svg width="0" height="0">
                  <defs>
                    <linearGradient id="arrowGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#22c55e" />
                      <stop offset="100%" stopColor="#15803d" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              <div className="text-center space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center mx-auto">
                  <Leaf className="w-8 h-8 text-green-700" />
                </div>
                <p className="font-semibold text-slate-900">{t.solutionStep4}</p>
              </div>
            </div>
            <style jsx>{`
              @keyframes flowArrow {
                0%, 100% {
                  transform: translateX(0) scale(1);
                  opacity: 1;
                }
                50% {
                  transform: translateX(${isArabic ? "-8px" : "8px"}) scale(1.1);
                  opacity: 0.8;
                }
              }
            `}</style>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1FC1DF] to-[#2896DD] mb-4">
                <ArrowRight className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-slate-900">{t.howTitle}</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Step 1 */}
              <div className="text-center md:text-right space-y-4">
                <div className="text-5xl font-bold text-cyan-500/30">01</div>
                <h4 className="text-2xl font-bold text-slate-900">{t.step1Title}</h4>
                <p className="text-lg text-slate-600 leading-relaxed">{t.step1Desc}</p>
              </div>

              {/* Step 2 */}
              <div className="text-center md:text-left space-y-4">
                <div className="text-5xl font-bold text-cyan-500/30">02</div>
                <h4 className="text-2xl font-bold text-slate-900">{t.step2Title}</h4>
                <p className="text-lg text-slate-600 leading-relaxed">{t.step2Desc}</p>
              </div>

              {/* Step 3 */}
              <div className="text-center md:text-right space-y-4">
                <div className="text-5xl font-bold text-cyan-500/30">03</div>
                <h4 className="text-2xl font-bold text-slate-900">{t.step3Title}</h4>
                <p className="text-lg text-slate-600 leading-relaxed">{t.step3Desc}</p>
              </div>

              {/* Step 4 */}
              <div className="text-center md:text-left space-y-4">
                <div className="text-5xl font-bold text-cyan-500/30">04</div>
                <h4 className="text-2xl font-bold text-slate-900">{t.step4Title}</h4>
                <p className="text-lg text-slate-600 leading-relaxed">{t.step4Desc}</p>
              </div>
            </div>

            <div className="text-center pt-8">
              <a href="#demo">
                <Button size="lg" className="bg-gradient-to-r from-[#1FC1DF] to-[#2896DD] text-white gap-2 px-8">
                  {t.howBtn}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      

      {/* AI Demo Section */}
      <section id="demo" className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1FC1DF] to-[#2896DD] mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-slate-900">{t.demoTitle}</h3>
              <p className="text-sm text-slate-500">{t.demoSubtitle}</p>

              <Card className="p-8 shadow-xl text-right">
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h4 className="text-xl font-bold text-slate-900 text-center">
                      {isArabic ? "المواصفات التقنية للنموذج" : "Model Technical Specifications"}
                    </h4>

                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      {/* Model Type */}
                      <div className="p-4 bg-gradient-to-br from-[#1FC1DF]/10 to-[#2896DD]/10 rounded-lg border border-[#1FC1DF]/20">
                        <p className="text-slate-500 mb-1">{isArabic ? "نوع النموذج" : "Model Type"}</p>
                        <p className="font-semibold text-slate-900">Random Forest Classifier</p>
                      </div>

                      {/* Model Version */}
                      <div className="p-4 bg-gradient-to-br from-[#1FC1DF]/10 to-[#2896DD]/10 rounded-lg border border-[#1FC1DF]/20">
                        <p className="text-slate-500 mb-1">{isArabic ? "إصدار النموذج" : "Model Version"}</p>
                        <p className="font-semibold text-slate-900">v1</p>
                      </div>

                      {/* Last Training Date */}
                      <div className="p-4 bg-gradient-to-br from-[#1FC1DF]/10 to-[#2896DD]/10 rounded-lg border border-[#1FC1DF]/20">
                        <p className="text-slate-500 mb-1">{isArabic ? "تاريخ آخر تدريب" : "Last Training Date"}</p>
                        <p className="font-semibold text-blue-700">{isArabic ? "أكتوبر 2025" : "October 2025"}</p>
                      </div>

                      {/* Error Rate */}
                      
                    </div>

                    {/* Additional Info */}
                    <div className="pt-4 border-t text-slate-600 space-y-2 leading-relaxed">
                      <span className="inline-flex items-center justify-center w-4 h-4 text-[#1FC1DF]" />
                      <span>
                        {isArabic
                          ? "يتم تحديث النموذج بشكل دوري لتحسين الدقة والأداء"
                          : "Model is updated periodically to improve accuracy and performance"}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-12">
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 text-center">{t.teamTitle}</h3>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {teamMembers.map((member, index) => (
                <Card key={index} className="p-6 text-center space-y-4 hover:shadow-lg transition-shadow">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#1FC1DF] to-[#2896DD] flex items-center justify-center mx-auto">
                    <User className="w-10 h-10 text-white" />
                  </div>
                  <p className="font-semibold text-slate-900">{isArabic ? member.name : member.nameEn}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Conclusion Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-green-50/50 to-cyan-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1FC1DF] to-[#2896DD] mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900">{t.conclusionTitle}</h3>
            <div className="space-y-4 text-lg md:text-xl text-slate-700 leading-relaxed">
              <p>{t.conclusionLine1}</p>
              <p className="text-2xl font-bold text-[#1FC1DF]">{t.conclusionLine2}</p>
              <p className="text-xl text-slate-900">{t.conclusionLine3}</p>
            </div>
            <div className="pt-8">
              <Link href="/login">
                <Button size="lg" className="bg-gradient-to-r from-[#1FC1DF] to-[#2896DD] text-white gap-2 px-8">
                  <Sparkles className="w-5 h-5" />
                  {isArabic ? "ابدأ الآن" : "Start Now"}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center space-y-6 mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#1FC1DF] mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-slate-900">{t.contactTitle}</h3>
              <p className="text-lg text-slate-600 leading-relaxed">{t.contactDesc}</p>
            </div>

            <Card className="p-8 shadow-xl">
              {contactSubmitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                    <Mail className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="text-2xl font-bold text-green-600">
                    {isArabic ? "تم إرسال رسالتك بنجاح!" : "Message sent successfully!"}
                  </h4>
                  <p className="text-slate-600">
                    {isArabic
                      ? "شكراً لتواصلك معنا. سنعود إليك قريباً."
                      : "Thank you for contacting us. We'll get back to you soon."}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name">{t.contactName}</Label>
                    <Input
                      id="name"
                      type="text"
                      className="bg-white"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email">{t.contactEmail}</Label>
                    <Input
                      id="email"
                      type="email"
                      className="bg-white"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      required
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message">{t.contactMessage}</Label>
                    <Textarea
                      id="message"
                      rows={5}
                      className="bg-white"
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-to-r from-[#1FC1DF] to-[#2896DD] text-white gap-2"
                    disabled={isSubmittingContact}
                  >
                    {isSubmittingContact ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        {isArabic ? "جاري الإرسال..." : "Sending..."}
                      </>
                    ) : (
                      <>
                        <Mail className="w-5 h-5" />
                        {t.contactBtn}
                      </>
                    )}
                  </Button>
                </form>
              )}
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-8">
            {/* Quick Links */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <a href="#about" className="hover:text-[#1FC1DF] transition-colors">
                {t.footerAbout}
              </a>
              <span className="text-slate-600">|</span>
              <a href="#how-it-works" className="hover:text-[#1FC1DF] transition-colors">
                {t.footerHow}
              </a>
              <span className="text-slate-600">|</span>
              <a href="#contact" className="hover:text-[#1FC1DF] transition-colors">
                {t.footerContact}
              </a>
            </div>

            {/* Copyright */}
            <div className="text-center space-y-2 text-sm text-slate-400">
              <p>{t.footerCopyright}</p>
              <p className="text-slate-500">{t.footerTagline}</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

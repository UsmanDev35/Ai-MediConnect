import { useState, useEffect } from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import {
  Activity,
  Ambulance,
  Bell,
  HeartPulse,
  LayoutDashboard,
  Moon,
  Search,
  Settings,
  Sun,
  Stethoscope,
  Brain,
  FileText,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ArrowUpRight,
  Heart,
  Eye,
  MapPin,
  PhoneCall,
  LogOut,
  User,
  Mic,
  Send,
  Star,
  Building2,
  ChevronRight,
  Pill,
  Thermometer,
  Droplets,
  Clock3,
  CreditCard,
  Sparkles,
  Filter,
  Phone,
  Menu,
  X,
  ShieldCheck,
  CalendarDays,
  MessageCircleMore,
  HelpCircle,
  Mail,
  
} from "lucide-react";


const LIGHT = {
  bg: "bg-[#F0F4F8]",
  sidebar: "bg-[#0A1628]",
  sidebarBorder: "border-[#1E2D45]",
  card: "bg-white",
  cardBorder: "border-[#E2E8F0]",
  text: "text-[#0A1628]",
  subtext: "text-[#64748B]",
  soft: "bg-[#F1F5F9]",
  topbar: "bg-white",
  topbarBorder: "border-[#E2E8F0]",
  inputBg: "bg-[#F8FAFC]",
  sideText: "text-[#94A3B8]",
  tableRow: "hover:bg-[#F8FAFC]",
  tableHead: "bg-[#F1F5F9] text-[#475569]",
  badge: {
    critical: "bg-[#FEE2E2] text-[#991B1B]",
    warning: "bg-[#FEF3C7] text-[#92400E]",
    stable: "bg-[#DCFCE7] text-[#166534]",
    info: "bg-[#DBEAFE] text-[#1E40AF]",
  },
};

const DARK = {
  bg: "bg-[#060D18]",
  sidebar: "bg-[#080F1E]",
  sidebarBorder: "border-[#112035]",
  card: "bg-[#0D1F35]",
  cardBorder: "border-[#162940]",
  text: "text-[#E2E8F0]",
  subtext: "text-[#64748B]",
  soft: "bg-[#0A1628]",
  topbar: "bg-[#0D1F35]",
  topbarBorder: "border-[#162940]",
  inputBg: "bg-[#0A1628]",
  sideText: "text-[#4A6080]",
  tableRow: "hover:bg-[#0A1628]",
  tableHead: "bg-[#0A1628] text-[#4A6080]",
  badge: {
    critical: "bg-[#7F1D1D]/30 text-[#FCA5A5]",
    warning: "bg-[#78350F]/30 text-[#FCD34D]",
    stable: "bg-[#14532D]/30 text-[#86EFAC]",
    info: "bg-[#1E3A8A]/30 text-[#93C5FD]",
  },
};

// ─── SPARKLINE ───
const Sparkline = ({ data, color }: { data: number[]; color: string }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const h = 40;
  const w = 100;
  const pts = data
    .map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / (max - min + 1)) * h}`)
    .join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-20 h-8">
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

const PatientDashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [symptomText, setSymptomText] = useState("");
  const [aiResult, setAiResult] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(true);
  const [selectedSpec, setSelectedSpec] = useState("All");
  const [isListening, setIsListening] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const t = darkMode ? DARK : LIGHT;

  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem("user") || '{"fullName":"Patient","email":"patient@example.com"}');

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (d: Date) =>
    d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  const formatDate = (d: Date) =>
    d.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  // Simulate Gemini AI analysis
  const handleSymptomSubmit = async () => {
    if (!symptomText.trim()) return;
    setAiLoading(true);
    setAiResult("");
    await new Promise((r) => setTimeout(r, 1800));
    setAiResult(
      "Based on your symptoms — " + symptomText + " — this could potentially be a seasonal flu or a viral infection. We recommend taking Paracetamol 500mg, increasing fluid intake, and monitoring your condition. If symptoms persist for more than 2-3 days, please consult a physician. This is an AI-generated suggestion, not professional medical advice."
    );
    setAiLoading(false);
  };

  // Voice input simulation
  const handleVoiceInput = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setTimeout(() => {
        setSymptomText("I am experiencing a headache, fever, and a persistent cough.");
        setIsListening(false);
      }, 2000);
    }
  };

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard" },
    { icon: Brain, label: "Symptoms" },
    { icon: Stethoscope, label: "Doctors" },
    { icon: Building2, label: "Hospitals" },
    { icon: Ambulance, label: "Ambulance" },
    { icon: CreditCard, label: "Payments" },
    { icon: FileText, label: "Reports" },
    { icon: Settings, label: "Settings" },
  ];

  const quickStats = [
    { title: "Next Appointment", value: "Tomorrow", sub: "Dr. Sarah — 10:30 AM", icon: Clock3, accent: "#0891B2", sparkData: [2, 3, 2, 4, 3, 5, 4] },
    { title: "Active Prescriptions", value: "3", sub: "2 due today", icon: Pill, accent: "#7C3AED", sparkData: [1, 2, 2, 3, 3, 3, 3] },
    { title: "Last Checkup", value: "12 days", sub: "ago — All normal", icon: CheckCircle2, accent: "#059669", sparkData: [5, 8, 6, 9, 7, 10, 12] },
    { title: "Health Score", value: "86/100", sub: "+4 this month", icon: HeartPulse, accent: "#C8102E", sparkData: [70, 74, 78, 80, 82, 84, 86] },
  ];

  const doctors = [
    { name: "Dr. Sarah Chen", spec: "Cardiologist", rating: 4.9, patients: 320, status: "Available", avatar: "SC", color: "#C8102E", fee: "Rs. 1,500" },
    { name: "Dr. James Park", spec: "Neurologist", rating: 4.7, patients: 280, status: "On Call", avatar: "JP", color: "#0891B2", fee: "Rs. 2,000" },
    { name: "Dr. Emily White", spec: "General", rating: 4.8, patients: 410, status: "Available", avatar: "EW", color: "#059669", fee: "Rs. 800" },
    { name: "Dr. Raj Patel", spec: "Orthopedic", rating: 4.6, patients: 195, status: "In Surgery", avatar: "RP", color: "#7C3AED", fee: "Rs. 1,800" },
    { name: "Dr. Liu Wei", spec: "Pediatrician", rating: 4.9, patients: 350, status: "Available", avatar: "LW", color: "#F59E0B", fee: "Rs. 1,200" },
    { name: "Dr. Anna Müller", spec: "Dermatologist", rating: 4.5, patients: 220, status: "Available", avatar: "AM", color: "#EC4899", fee: "Rs. 1,100" },
  ];

  

  const specializations = ["All", "Cardiologist", "Neurologist", "General", "Orthopedic", "Pediatrician", "Dermatologist"];

  const filteredDoctors = selectedSpec === "All"
    ? doctors
    : doctors.filter((d) => d.spec === selectedSpec);

  const hospitals = [
    { name: "Gujranwala General Hospital", dist: "2.1 km", rating: 4.5, type: "Government", emergency: true, phone: "055-1234567" },
    { name: "Allied Hospital", dist: "3.8 km", rating: 4.2, type: "Government", emergency: true, phone: "055-7654321" },
    { name: "City Care Clinic", dist: "1.2 km", rating: 4.7, type: "Private", emergency: false, phone: "055-9876543" },
    { name: "Medicare Hospital", dist: "4.5 km", rating: 4.4, type: "Private", emergency: true, phone: "055-1122334" },
  ];

  const ambulances = [
    { driver: "Kamran Ali", vehicle: "AMB-221", dist: "1.2 km", eta: "4 min", status: "Available", phone: "0300-1234567" },
    { driver: "Shahid Raza", vehicle: "AMB-185", dist: "2.8 km", eta: "8 min", status: "Available", phone: "0301-7654321" },
    { driver: "Tariq Mehmood", vehicle: "AMB-309", dist: "3.5 km", eta: "11 min", status: "On Call", phone: "0302-9988776" },
  ];

  const myVitals = [
    { label: "Heart Rate", value: "72 bpm", normal: true, icon: Heart, color: "#C8102E" },
    { label: "Blood Pressure", value: "118/76", normal: true, icon: Activity, color: "#0891B2" },
    { label: "O₂ Saturation", value: "98%", normal: true, icon: Droplets, color: "#059669" },
    { label: "Temperature", value: "36.8°C", normal: true, icon: Thermometer, color: "#F59E0B" },
  ];

  const pendingPayments = [
    { doctor: "Dr. Sarah Chen", type: "Cardiology Consult", amount: "Rs. 1,500", date: "Today", status: "Pending" },
    { doctor: "Dr. Emily White", type: "General Checkup", amount: "Rs. 800", date: "Yesterday", status: "Paid" },
  ];

  const cardClass = `rounded-2xl border ${t.cardBorder} ${t.card} transition-colors duration-200`;

  return (
    <div
      className={`min-h-screen flex font-sans transition-colors duration-300 ${t.bg}`}
      style={{ fontFamily: "'DM Sans', 'Segoe UI', system-ui, sans-serif" }}
      
    >
        <style>
{`
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }

  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`}
</style>

      {/* ─── COLLAPSIBLE SIDEBAR ─── */}
<div
  className={`
    flex flex-col h-screen sticky top-0
    ${sidebarOpen ? "w-[260px]" : "w-[88px]"}
    ${t.sidebar}
    border-r ${t.sidebarBorder}
    transition-all duration-300 overflow-hidden
  `}
>

  {/* TOP */}
  <div className="p-4 border-b border-[#1E2D45] flex items-center justify-between">

    {sidebarOpen && (
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#C8102E] flex items-center justify-center">
          <HeartPulse size={20} className="text-white" />
        </div>

        <div>
          <h2 className="text-white font-bold">
            MediConnect
          </h2>

          <p className="text-[#4A6080] text-xs">
            Patient Portal
          </p>
        </div>
      </div>
    )}

    <button
      onClick={() => setSidebarOpen(!sidebarOpen)}
      className="w-10 h-10 rounded-xl bg-[#0A1628] text-white flex items-center justify-center hover:bg-[#1E2D45] transition-all"
    >
      {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
    </button>
  </div>

  {/* NAV */}
  <div className="flex-1 overflow-y-auto no-scrollbar p-3 space-y-2">

    {[
      { icon: LayoutDashboard, label: "Dashboard" },
      { icon: User, label: "Profile" },
      { icon: Brain, label: "AI Symptoms" },
      { icon: Stethoscope, label: "Doctors" },
      { icon: Building2, label: "Hospitals" },
      { icon: Ambulance, label: "Emergency" },
      { icon: FileText, label: "Reports" },
      { icon: CreditCard, label: "Payments" },
      { icon: Settings, label: "Settings" },
    ].map((item, i) => {
      const Icon = item.icon;

      return (
        <button
          key={i}
          className={`
            w-full flex items-center
            ${sidebarOpen ? "justify-start px-4" : "justify-center"}
            gap-3 py-3 rounded-xl
            text-[#94A3B8]
            hover:bg-[#1E2D45]
            hover:text-white
            transition-all
          `}
        >
          <Icon size={18} />

          {sidebarOpen && (
            <span className="text-sm font-medium">
              {item.label}
            </span>
          )}
        </button>
      );
    })}
  </div>

  {/* BOTTOM */}
  <div className="p-3 border-t border-[#1E2D45]">

    <button
      onClick={handleLogout}
      className={`
        w-full flex items-center
        ${sidebarOpen ? "justify-start px-4" : "justify-center"}
        gap-3 py-3 rounded-xl
        bg-[#C8102E]
        text-white
        hover:bg-[#A30D26]
        transition-all
      `}
    >
      <LogOut size={18} />

      {sidebarOpen && (
        <span className="text-sm font-semibold">
          Logout
        </span>
      )}
    </button>
  </div>
</div>

      {/* ─── MAIN ─── */}
      <main className="flex-1 min-w-0 overflow-x-hidden">
        {/* ─── PROFESSIONAL HEADER ─── */}

<div
  className={`w-full border-b ${t.topbarBorder} sticky top-0 z-50 backdrop-blur-xl`}
  style={{
    background: darkMode
      ? "linear-gradient(to right, rgba(35,8,12,0.96), rgba(60,10,20,0.94))"
: "linear-gradient(to right, #FFF1F2, #FFE4E6)",
  }}
>
  <div className="px-6 py-3 flex items-center justify-between">

    {/* LEFT */}
    <div className="flex items-center gap-4">

            {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-2xl bg-[#C8102E] flex items-center justify-center shadow-lg shadow-[#C8102E]/20">
          <HeartPulse size={22} className="text-white" />
        </div>

        <div>
          <h1 className={`text-lg font-bold tracking-tight ${t.text}`}>
            MediConnect
          </h1>
          <p className={`text-xs ${t.subtext}`}>
            Smart Healthcare Portal
          </p>
        </div>
      </div>
    </div>

    {/* CENTER NAV */}
    <div className="hidden lg:flex items-center gap-6">
      {[
        { label: "Appointments", icon: CalendarDays },
        // { label: "Consultation", icon: Stethoscope },
        { label: "Emergency", icon: Ambulance },
        { label: "AI Support", icon: Brain },
      ].map((item, i) => {
        const Icon = item.icon;

        return (
          <button
            key={i}
            className={`flex items-center gap-2 text-sm font-semibold ${t.subtext} hover:text-[#C8102E] transition-colors`}
          >
            <Icon size={15} />
            {item.label}
          </button>
        );
      })}
    </div>

    {/* RIGHT */}
    <div className="flex items-center gap-3">
        {/* Search */}
<div className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-2xl border ${t.cardBorder} ${t.inputBg} w-[280px]`}>
  <Search size={16} className={t.subtext} />

  <input
    type="text"
    placeholder="Search doctors, hospitals..."
    className={`bg-transparent outline-none text-sm w-full ${t.text} placeholder:text-slate-400`}
  />
</div>

      {/* Security Badge
      <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl bg-[#059669]/10">
        <ShieldCheck size={15} className="text-[#059669]" />
        <span className="text-xs font-bold text-[#059669]">
          Secure Portal
        </span>
      </div> */}

      {/* Theme Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`w-10 h-10 rounded-xl border ${t.cardBorder} ${t.card} flex items-center justify-center hover:scale-105 transition-all`}
      >
        {darkMode ? (
          <Sun size={17} className="text-[#F59E0B]" />
        ) : (
          <Moon size={17} className={t.text} />
        )}
      </button>

      {/* User */}
      <div className="hidden sm:flex items-center gap-2">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#C8102E] to-[#0891B2] flex items-center justify-center text-white text-xs font-bold">
          {user.fullName?.slice(0, 2).toUpperCase() || "PT"}
        </div>

        <div>
          <p className={`text-xs font-bold ${t.text}`}>
            {user.fullName}
          </p>

          <p className={`text-[11px] ${t.subtext}`}>
            Patient Account
          </p>
        </div>
      </div>
    </div>
  </div>
</div>

       

        <div className="p-6 space-y-6">

          {/* WELCOME BANNER */}
          {alertVisible && (
            <div className="rounded-xl bg-[#0A1628] text-white px-5 py-4 flex items-center justify-between shadow-lg">
              <div className="flex items-center gap-3">
                <HeartPulse size={20} className="text-[#C8102E]" />
                <div>
                  <p className="text-sm font-bold">Hey, {user.fullName || "Patient"}! </p>
                  <p className="text-[#4A6080] text-xs mt-0.5">Your health portal is ready. Check your symptoms or schedule a consultation with a doctor.</p>
                </div>
              </div>
              <button onClick={() => setAlertVisible(false)} className="text-[#4A6080] hover:text-white transition-colors">
                <XCircle size={18} />
              </button>
            </div>
          )}

          {/* QUICK STATS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickStats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className={`${cardClass} p-4 hover:shadow-lg transition-shadow`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${stat.accent}15` }}>
                      <Icon size={16} style={{ color: stat.accent }} />
                    </div>
                    <Sparkline data={stat.sparkData} color={stat.accent} />
                  </div>
                  <p className={`text-xl font-bold ${t.text}`}>{stat.value}</p>
                  <p className={`text-xs ${t.subtext} mt-0.5`}>{stat.title}</p>
                  <p className={`text-xs mt-1 font-semibold`} style={{ color: stat.accent }}>{stat.sub}</p>
                </div>
              );
            })}
          </div>

          {/* MAIN GRID */}
          <div className="grid xl:grid-cols-3 gap-6">

            {/* LEFT: AI Symptoms + Doctors */}
            <div className="xl:col-span-2 space-y-6">

              {/* AI SYMPTOM CHECKER */}
              <div className={`${cardClass} p-6`}>
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h3 className={`text-base font-bold ${t.text}`}>AI Symptom Checker</h3>
                    <p className={`text-xs ${t.subtext} mt-0.5`}>Powered by Google Gemini — describe your symptoms below</p>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#C8102E]/10">
                    <Sparkles size={13} className="text-[#C8102E]" />
                    <span className="text-xs font-semibold text-[#C8102E]">Gemini AI</span>
                  </div>
                </div>

                {/* Input area */}
                <div className={`rounded-xl border ${t.cardBorder} ${t.inputBg} p-4`}>
                  <textarea
                    rows={3}
                    value={symptomText}
                    onChange={(e) => setSymptomText(e.target.value)}
                    placeholder="Describe your symptoms here... (e.g. headache, fever, cough)"
                    className={`w-full bg-transparent text-sm outline-none resize-none ${t.text} placeholder:text-slate-400`}
                  />
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#E2E8F0]">
                    <button
                      onClick={handleVoiceInput}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                        isListening
                          ? "bg-[#C8102E] text-white animate-pulse"
                          : `border ${t.cardBorder} ${t.subtext} hover:opacity-80`
                      }`}
                    >
                      <Mic size={14} />
                      {isListening ? "Listening…" : "Voice Input"}
                    </button>
                    <button
                      onClick={handleSymptomSubmit}
                      disabled={aiLoading || !symptomText.trim()}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0A1628] text-white text-xs font-bold hover:bg-[#C8102E] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {aiLoading ? (
                        <><span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Analyzing…</>
                      ) : (
                        <><Send size={13} /> Submit for Analysis</>
                      )}
                    </button>
                  </div>
                </div>

                {/* AI Result */}
                {aiResult && (
                  <div className="mt-4 rounded-xl border border-[#F59E0B]/30 bg-[#FEF3C7]/30 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles size={14} className="text-[#F59E0B]" />
                      <span className="text-xs font-bold text-[#92400E]">Gemini AI Health Suggestion</span>
                    </div>
                    <p className={`text-sm ${t.text} leading-relaxed`}>{aiResult}</p>
                    <div className="mt-3 flex items-center gap-2">
                      <AlertTriangle size={12} className="text-[#F59E0B]" />
                      <p className="text-xs text-[#92400E]">Note: This is an AI suggestion. Please seek professional medical advice.</p>
                    </div>
                  </div>
                )}
              </div>

              {/* DOCTORS LIST */}
              <div className={`${cardClass} overflow-hidden`}>
                <div className={`flex items-center justify-between p-5 border-b ${t.cardBorder}`}>
                  <div>
                    <h3 className={`text-base font-bold ${t.text}`}>Available Doctors</h3>
                    <p className={`text-xs ${t.subtext} mt-0.5`}>Filter by specialization</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Filter size={13} className={t.subtext} />
                    <span className={`text-xs ${t.subtext}`}>Filter</span>
                  </div>
                </div>

                {/* Specialization Filter Pills */}
                <div className={`px-5 py-3 border-b ${t.cardBorder} flex gap-2 flex-wrap`}>
                  {specializations.map((spec) => (
                    <button
                      key={spec}
                      onClick={() => setSelectedSpec(spec)}
                      className={`text-xs px-3 py-1.5 rounded-full font-semibold transition-all ${
                        selectedSpec === spec
                          ? "bg-[#C8102E] text-white"
                          : `border ${t.cardBorder} ${t.subtext} hover:opacity-80`
                      }`}
                    >
                      {spec}
                    </button>
                  ))}
                </div>

                {/* Doctors Grid */}
                <div className="p-5 grid md:grid-cols-2 gap-4">
                  {filteredDoctors.map((doc, i) => (
                    <div key={i} className={`rounded-xl border ${t.cardBorder} p-4 ${t.soft} hover:border-[#C8102E]/30 transition-all cursor-pointer`}>
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                          style={{ background: doc.color }}
                        >
                          {doc.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-bold ${t.text} truncate`}>{doc.name}</p>
                          <p className={`text-xs ${t.subtext}`}>{doc.spec}</p>
                        </div>
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                          doc.status === "Available" ? "bg-[#DCFCE7] text-[#166534]" :
                          doc.status === "On Call" ? "bg-[#FEF3C7] text-[#92400E]" :
                          "bg-[#FEE2E2] text-[#991B1B]"
                        }`}>{doc.status}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Star size={12} className="text-[#F59E0B]" fill="#F59E0B" />
                          <span className={`text-xs font-semibold ${t.text}`}>{doc.rating}</span>
                          <span className={`text-xs ${t.subtext}`}>· {doc.patients} patients</span>
                        </div>
                        <span className={`text-xs font-bold`} style={{ color: "#059669" }}>{doc.fee}</span>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <button className={`flex-1 py-2 rounded-xl text-xs font-semibold border ${t.cardBorder} ${t.subtext} hover:opacity-80 transition-opacity`}>
                          View Profile
                        </button>
                        <button className="flex-1 py-2 rounded-xl text-xs font-bold bg-[#C8102E] text-white hover:bg-[#A30D26] transition-colors">
                          Contact
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* HOSPITALS */}
              <div className={`${cardClass} overflow-hidden`}>
                <div className={`flex items-center justify-between p-5 border-b ${t.cardBorder}`}>
                  <div>
                    <h3 className={`text-base font-bold ${t.text}`}>Nearby Hospitals</h3>
                    <p className={`text-xs ${t.subtext} mt-0.5`}>Location-based results from Google Maps</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-[#0891B2] font-semibold">
                    <MapPin size={13} />
                    Gujranwala
                  </div>
                </div>
                <div className="divide-y divide-[#E2E8F0]">
                  {hospitals.map((h, i) => (
                    <div key={i} className={`flex items-center gap-4 px-5 py-4 ${t.tableRow} transition-colors cursor-pointer`}>
                      <div className="w-10 h-10 rounded-xl bg-[#0891B2]/10 flex items-center justify-center flex-shrink-0">
                        <Building2 size={18} className="text-[#0891B2]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-bold ${t.text}`}>{h.name}</p>
                        <div className="flex items-center gap-3 mt-0.5">
                          <span className={`text-xs ${t.subtext} flex items-center gap-1`}><MapPin size={10} />{h.dist}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${h.type === "Government" ? "bg-[#DBEAFE] text-[#1E40AF]" : "bg-[#F3E8FF] text-[#6B21A8]"}`}>{h.type}</span>
                          {h.emergency && <span className="text-xs px-2 py-0.5 rounded-full bg-[#FEE2E2] text-[#991B1B] font-semibold">24/7 Emergency</span>}
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="flex items-center gap-1 justify-end mb-1">
                          <Star size={11} className="text-[#F59E0B]" fill="#F59E0B" />
                          <span className={`text-xs font-bold ${t.text}`}>{h.rating}</span>
                        </div>
                        <p className={`text-xs ${t.subtext}`}>{h.phone}</p>
                      </div>
                      <button className="ml-2 p-2 rounded-xl bg-[#C8102E]/10 text-[#C8102E] hover:bg-[#C8102E]/20 transition-colors">
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* RIGHT PANEL */}
            <div className="space-y-5">

              {/* EMERGENCY AMBULANCE */}
              <div className="rounded-2xl bg-[#0A1628] p-5 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-[#C8102E]/10 -mr-10 -mt-10" />
                <div className="absolute bottom-0 left-0 w-20 h-20 rounded-full bg-[#C8102E]/5 -ml-8 -mb-8" />
                <div className="relative">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full bg-[#C8102E] animate-ping" />
                    <span className="text-[#C8102E] text-xs font-bold uppercase tracking-wider">Emergency Services</span>
                  </div>
                  <h3 className="text-lg font-bold mt-2">Ambulance Services</h3>
                  <p className="text-[#4A6080] text-xs mt-1">{ambulances.filter(a => a.status === "Available").length} ambulances are available in your vicinity</p>

                  <div className="mt-4 space-y-3">
                    {ambulances.map((amb, i) => (
                      <div key={i} className="flex items-center justify-between py-2.5 border-b border-[#1E2D45] last:border-0">
                        <div>
                          <p className="text-white text-xs font-semibold">{amb.driver}</p>
                          <p className="text-[#4A6080] text-xs">{amb.vehicle} · {amb.dist} · ETA {amb.eta}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                            amb.status === "Available" ? "bg-[#14532D]/40 text-[#86EFAC]" : "bg-[#78350F]/40 text-[#FCD34D]"
                          }`}>{amb.status}</span>
                          <a href={`tel:${amb.phone}`} className="w-7 h-7 rounded-lg bg-[#C8102E] flex items-center justify-center hover:bg-[#A30D26] transition-colors">
                            <Phone size={13} className="text-white" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button className="mt-4 w-full py-2.5 rounded-xl bg-[#C8102E] text-white text-xs font-bold hover:bg-[#A30D26] transition-colors flex items-center justify-center gap-2">
                    <PhoneCall size={14} /> Call Nearest Ambulance
                  </button>
                </div>
              </div>

              {/* MY VITALS */}
              <div className={`${cardClass} p-5`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`text-sm font-bold ${t.text}`}>My Vitals</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#059669] animate-pulse" />
                    <span className="text-xs text-[#059669] font-semibold">Last Updated</span>
                  </div>
                </div>
                <div className="space-y-3">
                  {myVitals.map((v, i) => {
                    const Icon = v.icon;
                    return (
                      <div key={i} className={`flex items-center justify-between p-2.5 rounded-xl ${t.soft}`}>
                        <div className="flex items-center gap-2.5">
                          <Icon size={14} style={{ color: v.color }} />
                          <span className={`text-xs ${t.subtext}`}>{v.label}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-bold ${t.text}`}>{v.value}</span>
                          <span className={`text-xs font-semibold ${v.normal ? "text-[#059669]" : "text-[#F59E0B]"}`}>
                            {v.normal ? "Normal" : "Warning"}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* ... remaining code ... */}
            </div>
          </div>
        </div>

        {/* ─── PROFESSIONAL FOOTER ─── */}

<footer
  className={`mt-8 border-t ${t.topbarBorder}`}
  style={{
    background: darkMode
     ? "linear-gradient(to bottom, #22070C, #140408)"
: "linear-gradient(to bottom, #FFE4E6, #FFF1F2)",
  }}
>
  <div className="px-6 py-10">

    <div className="grid md:grid-cols-4 gap-8">

      {/* Brand */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-2xl bg-[#C8102E] flex items-center justify-center">
            <HeartPulse size={22} className="text-white" />
          </div>

          <div>
            <h2 className={`font-bold text-lg ${t.text}`}>
              MediConnect
            </h2>

            <p className={`text-xs ${t.subtext}`}>
              Advanced Healthcare Platform
            </p>
          </div>
        </div>

        <p className={`text-sm leading-relaxed ${t.subtext}`}>
          Providing secure digital healthcare services including AI symptom analysis,
          doctor consultations, ambulance support, and patient management.
        </p>
      </div>

      {/* Services */}
      <div>
        <h3 className={`font-bold mb-4 ${t.text}`}>
          Services
        </h3>

        <div className="space-y-2">
          {[
            "Doctor Consultation",
            "Emergency Support",
            "AI Symptom Checker",
            "Medical Reports",
            "Online Payments",
          ].map((item, i) => (
            <p
              key={i}
              className={`text-sm ${t.subtext} hover:text-[#C8102E] cursor-pointer transition-colors`}
            >
              {item}
            </p>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div>
        <h3 className={`font-bold mb-4 ${t.text}`}>
          Contact
        </h3>

        <div className="space-y-3">
          <div className={`flex items-center gap-2 text-sm ${t.subtext}`}>
            <MapPin size={15} />
            Gujranwala, Pakistan
          </div>

          <div className={`flex items-center gap-2 text-sm ${t.subtext}`}>
            <Phone size={15} />
            +92 300 1234567
          </div>

          <div className={`flex items-center gap-2 text-sm ${t.subtext}`}>
            <Mail size={15} />
            support@mediconnect.com
          </div>
        </div>
      </div>

      {/* Social */}
      <div>
        <h3 className={`font-bold mb-4 ${t.text}`}>
          Follow Us
        </h3>

        <div className="flex items-center gap-3">
          {[
            FaFacebook,
            FaTwitter,
            FaInstagram,
            FaLinkedin,
           ].map((Icon, i) => (
            <button
               key={i}
               className={`w-10 h-10 rounded-xl border ${t.cardBorder} ${t.card} flex items-center justify-center hover:bg-[#C8102E] hover:text-white transition-all`}
            >
            <Icon size={16} />
            </button>
        ))}

        </div>

        <div className="mt-5">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#059669]/10 w-fit">
            <ShieldCheck size={15} className="text-[#059669]" />
            <span className="text-xs font-bold text-[#059669]">
              HIPAA Protected
            </span>
          </div>
        </div>
      </div>
    </div>

    {/* Bottom */}
    <div className={`mt-8 pt-5 border-t ${t.cardBorder} flex flex-col md:flex-row items-center justify-between gap-3`}>
      <p className={`text-xs ${t.subtext}`}>
        © 2026 MediConnect. All rights reserved.
      </p>

      <div className="flex items-center gap-5">
        <button className={`text-xs ${t.subtext} hover:text-[#C8102E]`}>
          Privacy Policy
        </button>

        <button className={`text-xs ${t.subtext} hover:text-[#C8102E]`}>
          Terms of Service
        </button>

        <button className={`text-xs ${t.subtext} hover:text-[#C8102E]`}>
          Support
        </button>
      </div>
    </div>
  </div>
</footer>
      </main>
    </div>
  );
};

export default PatientDashboard;
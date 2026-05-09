


import React, { useState, useEffect, useRef } from "react";
import {
  Activity,
  Ambulance,
  Bell,
  CalendarDays,
  ChevronRight,
  ClipboardList,
  HeartPulse,
  LayoutDashboard,
  Moon,
  Search,
  Settings,
  ShieldCheck,
  Sun,
  Users,
  Stethoscope,
  TrendingUp,
  Siren,
  BedDouble,
  Clock3,
  Plus,
  Thermometer,
  Pill,
  FileText,
  Zap,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  MoreHorizontal,
  Wifi,
  WifiOff,
  Heart,
  Brain,
  Bone,
  Baby,
  Eye,
  Microscope,
  FlaskConical,
  Droplets,
  Radio,
  UserCheck,
  UserX,
  Building2,
  PhoneCall,
  MapPin,
  Timer,
  TrendingDown,
  RefreshCw,
  ChevronDown,
  Star,
  Award,
  Layers,
  PieChart,
} from "lucide-react";

/* ─────────────── COLOR PALETTE ──────────────────────────────────────────────
   Light mode: Navy (#0A1628), Crimson (#C8102E), Slate (#1E3A5F), Warm White (#F8F9FC)
   Dark mode:  Deep Navy (#060D18), Card (#0D1F35), Accent Crimson (#E53E5A)
   Accent: Amber (#F59E0B), Teal (#0891B2), Lavender (#7C3AED)
───────────────────────────────────────────────────────────────────────────── */

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
  sideTextActive: "text-white",
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
  sideTextActive: "text-white",
  tableRow: "hover:bg-[#0A1628]",
  tableHead: "bg-[#0A1628] text-[#4A6080]",
  badge: {
    critical: "bg-[#7F1D1D]/30 text-[#FCA5A5]",
    warning: "bg-[#78350F]/30 text-[#FCD34D]",
    stable: "bg-[#14532D]/30 text-[#86EFAC]",
    info: "bg-[#1E3A8A]/30 text-[#93C5FD]",
  },
};

const CHART_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const CHART_IN = [280, 340, 295, 420, 390, 480, 355];
const CHART_OUT = [210, 270, 240, 310, 290, 360, 280];

// Radial gauge SVG
const RadialGauge = ({ value, max, label, color }: { value: number; max: number; label: string; color: string }) => {
  const pct = value / max;
  const r = 52;
  const circ = 2 * Math.PI * r;
  const dash = pct * circ * 0.75;
  const gap = circ - dash;
  return (
    <svg viewBox="0 0 130 130" className="w-full h-full">
      <circle cx="65" cy="65" r={r} fill="none" stroke="#1E3A5F" strokeWidth="12" strokeDasharray={`${circ * 0.75} ${circ}`} strokeDashoffset={-circ * 0.125} strokeLinecap="round" />
      <circle cx="65" cy="65" r={r} fill="none" stroke={color} strokeWidth="12"
        strokeDasharray={`${dash} ${circ - dash}`}
        strokeDashoffset={-circ * 0.125}
        strokeLinecap="round"
        style={{ transition: "stroke-dasharray 1s ease" }}
      />
      <text x="65" y="60" textAnchor="middle" fill="currentColor" fontSize="22" fontWeight="700" className="fill-current">{value}%</text>
      <text x="65" y="80" textAnchor="middle" fill="#64748B" fontSize="10">{label}</text>
    </svg>
  );
};

// Mini sparkline
const Sparkline = ({ data, color }: { data: number[]; color: string }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const h = 40;
  const w = 100;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / (max - min + 1)) * h}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-20 h-8">
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [alertVisible, setAlertVisible] = useState(true);
  const [selectedDept, setSelectedDept] = useState<string | null>(null);

  const t = darkMode ? DARK : LIGHT;

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (d: Date) =>
    d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  const formatDate = (d: Date) =>
    d.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard" },
    { icon: Users, label: "Patients" },
    { icon: Stethoscope, label: "Doctors" },
    { icon: Ambulance, label: "Ambulance" },
    { icon: CalendarDays, label: "Appointments" },
    { icon: ClipboardList, label: "Reports" },
    { icon: FlaskConical, label: "Laboratory" },
    { icon: Microscope, label: "Pathology" },
    { icon: FileText, label: "Billing" },
    { icon: Settings, label: "Settings" },
  ];

  const kpiStats = [
    { title: "Total Patients", value: "12,841", change: "+8.2%", up: true, icon: Users, accent: "#0891B2", sparkData: [120, 145, 132, 198, 175, 220, 185] },
    { title: "Emergency Cases", value: "32", change: "+3 today", up: false, icon: Siren, accent: "#C8102E", sparkData: [18, 24, 20, 35, 28, 40, 32] },
    { title: "Active Doctors", value: "284", change: "+12 shift", up: true, icon: Stethoscope, accent: "#7C3AED", sparkData: [240, 260, 250, 275, 268, 290, 284] },
    { title: "Revenue MTD", value: "$284K", change: "+14.5%", up: true, icon: TrendingUp, accent: "#059669", sparkData: [180, 200, 195, 230, 220, 260, 284] },
    { title: "Avg Wait Time", value: "18 min", change: "-4 min", up: true, icon: Clock3, accent: "#F59E0B", sparkData: [28, 25, 22, 20, 24, 19, 18] },
    { title: "Satisfaction", value: "96.4%", change: "+1.2%", up: true, icon: Star, accent: "#EC4899", sparkData: [92, 93, 94, 95, 95, 96, 96] },
  ];

  const departments = [
    { name: "Cardiology", icon: Heart, patients: 142, beds: 45, load: 88, status: "critical", doctors: 18 },
    { name: "Neurology", icon: Brain, patients: 98, beds: 40, load: 72, status: "stable", doctors: 12 },
    { name: "Emergency", icon: Siren, patients: 32, beds: 20, load: 95, status: "critical", doctors: 24 },
    { name: "Orthopedics", icon: Bone, patients: 76, beds: 35, load: 64, status: "stable", doctors: 10 },
    { name: "Pediatrics", icon: Baby, patients: 54, beds: 30, load: 58, status: "stable", doctors: 14 },
    { name: "Radiology", icon: Radio, patients: 210, beds: 10, load: 45, status: "info", doctors: 8 },
    { name: "Ophthalmology", icon: Eye, patients: 38, beds: 15, load: 53, status: "stable", doctors: 6 },
    { name: "Pathology", icon: Microscope, patients: 0, beds: 0, load: 78, status: "info", doctors: 9 },
  ];

  const recentPatients = [
    { id: "P-10421", name: "Robert Thornton", age: 58, dept: "Cardiology", status: "Critical", doctor: "Dr. Sarah Chen", admitted: "09:14 AM", blood: "A+", ward: "ICU-3" },
    { id: "P-10420", name: "Maria Gonzalez", age: 34, dept: "Neurology", status: "Stable", doctor: "Dr. James Park", admitted: "08:52 AM", blood: "O-", ward: "W-12" },
    { id: "P-10419", name: "David Kim", age: 45, dept: "Orthopedics", status: "Recovering", doctor: "Dr. Emily White", admitted: "08:31 AM", blood: "B+", ward: "W-8" },
    { id: "P-10418", name: "Lisa Harper", age: 29, dept: "Emergency", status: "Critical", doctor: "Dr. Raj Patel", admitted: "08:10 AM", blood: "AB+", ward: "ER-5" },
    { id: "P-10417", name: "Michael Torres", age: 67, dept: "Cardiology", status: "Stable", doctor: "Dr. Sarah Chen", admitted: "07:44 AM", blood: "A-", ward: "W-15" },
    { id: "P-10416", name: "Anna Müller", age: 52, dept: "Pathology", status: "Monitoring", doctor: "Dr. Liu Wei", admitted: "07:22 AM", blood: "O+", ward: "W-6" },
  ];

  const upcomingAppointments = [
    { time: "10:30 AM", patient: "James Okafor", type: "Cardiology Consult", doctor: "Dr. Chen", room: "C-204", priority: "high" },
    { time: "11:00 AM", patient: "Nina Patel", type: "Post-Op Review", doctor: "Dr. White", room: "O-112", priority: "normal" },
    { time: "11:30 AM", patient: "George Walsh", type: "MRI Scan", doctor: "Dr. Park", room: "RAD-3", priority: "normal" },
    { time: "12:00 PM", patient: "Sophie Larson", type: "Pediatric Check", doctor: "Dr. Rivera", room: "P-107", priority: "low" },
    { time: "02:00 PM", patient: "Omar Hassan", type: "Emergency Follow-up", doctor: "Dr. Patel", room: "ER-2", priority: "high" },
  ];

  const staffOnDuty = [
    { name: "Dr. Sarah Chen", dept: "Cardiology", patients: 12, status: "In Surgery" },
    { name: "Dr. James Park", dept: "Neurology", patients: 8, status: "Available" },
    { name: "Dr. Raj Patel", dept: "Emergency", patients: 15, status: "On Call" },
    { name: "Dr. Emily White", dept: "Orthopedics", patients: 7, status: "Available" },
    { name: "Dr. Liu Wei", dept: "Pathology", patients: 0, status: "In Lab" },
  ];

  const getStatusStyle = (status: string) => {
    const s = status.toLowerCase();
    if (s === "critical") return t.badge.critical;
    if (s === "warning" || s === "monitoring") return t.badge.warning;
    if (s === "stable" || s === "recovering" || s === "available") return t.badge.stable;
    return t.badge.info;
  };

  const getPriorityDot = (p: string) => {
    if (p === "high") return "bg-[#C8102E]";
    if (p === "normal") return "bg-[#0891B2]";
    return "bg-[#059669]";
  };

  const cardClass = `rounded-2xl border ${t.cardBorder} ${t.card} transition-colors duration-200`;

  return (
    <div className={`min-h-screen flex font-sans transition-colors duration-300 ${t.bg}`} style={{ fontFamily: "'DM Sans', 'Segoe UI', system-ui, sans-serif" }}>

      {/* ─── SIDEBAR ─── */}
      <aside className={`w-[260px] flex-shrink-0 hidden xl:flex flex-col h-screen sticky top-0 ${t.sidebar} border-r ${t.sidebarBorder}`}>
        {/* Logo */}
        <div className="p-6 border-b border-[#1E2D45]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#C8102E] flex items-center justify-center shadow-lg shadow-[#C8102E]/30">
              <HeartPulse size={22} className="text-white" />
            </div>
            <div>
              <h1 className="text-white text-lg font-bold tracking-tight">MediCore</h1>
              <p className="text-[#4A6080] text-xs">Enterprise Health OS</p>
            </div>
          </div>
        </div>

        {/* Live status */}
        <div className="mx-4 mt-4 px-4 py-3 rounded-xl bg-[#0A1628] border border-[#1E2D45] flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs font-semibold">Live — All Systems Normal</p>
            <p className="text-[#4A6080] text-xs truncate">{formatTime(currentTime)}</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto mt-2">
          <p className="text-[#2D4A6A] text-[10px] font-bold uppercase tracking-widest px-3 mb-3">Main Menu</p>
          {navItems.slice(0, 6).map((item) => {
            const Icon = item.icon;
            const active = activeNav === item.label;
            return (
              <button
                key={item.label}
                onClick={() => setActiveNav(item.label)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left ${
                  active
                    ? "bg-[#C8102E] text-white shadow-lg shadow-[#C8102E]/20"
                    : "text-[#4A6080] hover:text-white hover:bg-[#1E2D45]"
                }`}
              >
                <Icon size={17} />
                <span className="text-sm font-medium">{item.label}</span>
                {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white opacity-70" />}
              </button>
            );
          })}

          <p className="text-[#2D4A6A] text-[10px] font-bold uppercase tracking-widest px-3 mb-3 mt-6">Clinical</p>
          {navItems.slice(6, 9).map((item) => {
            const Icon = item.icon;
            const active = activeNav === item.label;
            return (
              <button
                key={item.label}
                onClick={() => setActiveNav(item.label)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left ${
                  active
                    ? "bg-[#C8102E] text-white shadow-lg shadow-[#C8102E]/20"
                    : "text-[#4A6080] hover:text-white hover:bg-[#1E2D45]"
                }`}
              >
                <Icon size={17} />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="p-4 border-t border-[#1E2D45] space-y-3">
          <button
            onClick={() => setActiveNav("Settings")}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#4A6080] hover:text-white hover:bg-[#1E2D45] transition-all text-left"
          >
            <Settings size={17} />
            <span className="text-sm font-medium">Settings</span>
          </button>
          <div className="flex items-center gap-3 px-3 py-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C8102E] to-[#0891B2] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">AD</div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-semibold truncate">Admin Director</p>
              <p className="text-[#4A6080] text-xs truncate">admin@medicore.io</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ─── MAIN ─── */}
      <main className="flex-1 min-w-0 overflow-x-hidden">

        {/* TOPBAR */}
        <header className={`sticky top-0 z-30 ${t.topbar} border-b ${t.topbarBorder} px-6 py-3 flex items-center justify-between backdrop-blur-sm`}>
          <div>
            <h2 className={`text-xl font-bold tracking-tight ${t.text}`}>Healthcare Operations Center</h2>
            <p className={`text-xs ${t.subtext}`}>{formatDate(currentTime)}</p>
          </div>
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${t.cardBorder} ${t.inputBg} w-64`}>
              <Search size={15} className={t.subtext} />
              <input placeholder="Search patients, doctors, rooms…" className={`bg-transparent text-sm outline-none ${t.text} placeholder:text-slate-400 w-full`} />
            </div>
            {/* Notification */}
            <button className={`relative w-9 h-9 rounded-xl border ${t.cardBorder} ${t.card} flex items-center justify-center hover:opacity-80 transition-opacity`}>
              <Bell size={16} className={t.text} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#C8102E] rounded-full" />
            </button>
            {/* Dark mode */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`w-9 h-9 rounded-xl border ${t.cardBorder} ${t.card} flex items-center justify-center hover:opacity-80 transition-opacity`}
            >
              {darkMode ? <Sun size={16} className="text-[#F59E0B]" /> : <Moon size={16} className={t.text} />}
            </button>
            {/* Refresh */}
            <button className={`w-9 h-9 rounded-xl border ${t.cardBorder} ${t.card} flex items-center justify-center hover:opacity-80 transition-opacity`}>
              <RefreshCw size={15} className={t.text} />
            </button>
          </div>
        </header>

        <div className="p-6 space-y-6">

          {/* CRITICAL ALERT BANNER */}
          {alertVisible && (
            <div className="rounded-xl bg-[#C8102E] text-white px-5 py-3 flex items-center justify-between shadow-lg shadow-[#C8102E]/20 animate-pulse-slow">
              <div className="flex items-center gap-3">
                <Siren size={18} />
                <span className="text-sm font-semibold">CRITICAL: Patient Robert Thornton — ICU-3 — Cardiac Event in Progress — Dr. Chen Responding</span>
              </div>
              <button onClick={() => setAlertVisible(false)} className="text-white/70 hover:text-white transition-colors">
                <XCircle size={18} />
              </button>
            </div>
          )}

          {/* STATUS BAR */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Emergency Active", value: "12", icon: Siren, color: "#C8102E" },
              { label: "ICU Occupancy", value: "82%", icon: BedDouble, color: "#0891B2" },
              { label: "Ambulances Online", value: "14 / 18", icon: Ambulance, color: "#059669" },
              { label: "Available Doctors", value: "128", icon: UserCheck, color: "#7C3AED" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className={`${cardClass} p-4 flex items-center gap-4`}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${item.color}15` }}>
                    <Icon size={20} style={{ color: item.color }} />
                  </div>
                  <div>
                    <p className={`text-xs ${t.subtext}`}>{item.label}</p>
                    <p className={`text-xl font-bold ${t.text}`}>{item.value}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* KPI CARDS */}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
            {kpiStats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className={`${cardClass} p-4 hover:shadow-lg transition-shadow`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${stat.accent}15` }}>
                      <Icon size={16} style={{ color: stat.accent }} />
                    </div>
                    <Sparkline data={stat.sparkData} color={stat.accent} />
                  </div>
                  <p className={`text-xl font-bold ${t.text}`}>{stat.value}</p>
                  <p className={`text-xs ${t.subtext} mt-0.5`}>{stat.title}</p>
                  <div className={`flex items-center gap-1 mt-2 text-xs font-semibold ${stat.up ? "text-[#059669]" : "text-[#C8102E]"}`}>
                    {stat.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                    {stat.change}
                  </div>
                </div>
              );
            })}
          </div>

          {/* MAIN GRID */}
          <div className="grid xl:grid-cols-3 gap-6">

            {/* LEFT: Chart + Patients table */}
            <div className="xl:col-span-2 space-y-6">

              {/* PATIENT ANALYTICS CHART */}
              <div className={`${cardClass} p-6`}>
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className={`text-base font-bold ${t.text}`}>Patient Analytics — Weekly Overview</h3>
                    <p className={`text-xs ${t.subtext} mt-1`}>Admissions vs Discharges</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5"><div className="w-3 h-1.5 rounded-full bg-[#0A1628]" /><span className={`text-xs ${t.subtext}`}>Admitted</span></div>
                    <div className="flex items-center gap-1.5"><div className="w-3 h-1.5 rounded-full bg-[#C8102E]" /><span className={`text-xs ${t.subtext}`}>Discharged</span></div>
                    <button className={`text-xs px-3 py-1.5 rounded-lg border ${t.cardBorder} ${t.soft} ${t.subtext} hover:opacity-80 transition-opacity`}>
                      Generate Report
                    </button>
                  </div>
                </div>

                {/* Bar chart */}
                <div className="h-56 flex items-end gap-3">
                  {CHART_DAYS.map((day, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full flex items-end gap-1" style={{ height: "200px" }}>
                        <div
                          className="flex-1 rounded-t-lg transition-all duration-700 hover:opacity-80"
                          style={{ height: `${(CHART_IN[i] / 480) * 200}px`, background: darkMode ? "#1E3A5F" : "#0A1628" }}
                        />
                        <div
                          className="flex-1 rounded-t-lg transition-all duration-700 hover:opacity-80"
                          style={{ height: `${(CHART_OUT[i] / 480) * 200}px`, background: "#C8102E" }}
                        />
                      </div>
                      <span className={`text-xs ${t.subtext}`}>{day}</span>
                    </div>
                  ))}
                </div>

                {/* Chart bottom stats */}
                <div className={`mt-4 pt-4 border-t ${t.cardBorder} grid grid-cols-3 gap-4`}>
                  {[
                    { label: "Peak Day", value: "Saturday", sub: "480 admissions" },
                    { label: "Weekly Total", value: "2,265", sub: "admissions" },
                    { label: "Discharge Rate", value: "74.2%", sub: "+2.1% vs last week" },
                  ].map((s, i) => (
                    <div key={i}>
                      <p className={`text-xs ${t.subtext}`}>{s.label}</p>
                      <p className={`text-base font-bold ${t.text}`}>{s.value}</p>
                      <p className={`text-xs ${t.subtext}`}>{s.sub}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* RECENT PATIENTS TABLE */}
              <div className={`${cardClass} overflow-hidden`}>
                <div className={`flex items-center justify-between p-5 border-b ${t.cardBorder}`}>
                  <div>
                    <h3 className={`text-base font-bold ${t.text}`}>Recent Admissions</h3>
                    <p className={`text-xs ${t.subtext} mt-0.5`}>Live patient intake — refreshed every 60 seconds</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border ${t.cardBorder} ${t.soft} ${t.subtext}`}>
                      <Filter size={13} /> Filter
                    </button>
                    <button className={`text-xs px-3 py-1.5 rounded-lg bg-[#C8102E] text-white font-semibold`}>
                      + New Admission
                    </button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className={`${t.tableHead} text-xs uppercase tracking-wider`}>
                        {["Patient ID", "Name", "Age", "Department", "Status", "Doctor", "Admitted", "Ward"].map((h) => (
                          <th key={h} className="px-4 py-3 text-left font-semibold whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className={`divide-y ${t.cardBorder}`}>
                      {recentPatients.map((p, i) => (
                        <tr key={i} className={`${t.tableRow} transition-colors cursor-pointer`}>
                          <td className={`px-4 py-3 font-mono text-xs ${t.subtext} whitespace-nowrap`}>{p.id}</td>
                          <td className={`px-4 py-3 font-semibold ${t.text} whitespace-nowrap`}>{p.name}</td>
                          <td className={`px-4 py-3 ${t.subtext} whitespace-nowrap`}>{p.age}</td>
                          <td className={`px-4 py-3 ${t.text} whitespace-nowrap`}>{p.dept}</td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${getStatusStyle(p.status)}`}>{p.status}</span>
                          </td>
                          <td className={`px-4 py-3 ${t.subtext} whitespace-nowrap text-xs`}>{p.doctor}</td>
                          <td className={`px-4 py-3 ${t.subtext} whitespace-nowrap text-xs`}>{p.admitted}</td>
                          <td className={`px-4 py-3 font-mono text-xs ${t.text} whitespace-nowrap`}>{p.ward}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className={`px-5 py-3 border-t ${t.cardBorder} flex items-center justify-between`}>
                  <p className={`text-xs ${t.subtext}`}>Showing 6 of 1,284 admissions today</p>
                  <button className="text-xs text-[#C8102E] font-semibold hover:opacity-80 transition-opacity">View All Patients →</button>
                </div>
              </div>

              {/* DEPARTMENTS GRID */}
              <div className={`${cardClass} p-6`}>
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h3 className={`text-base font-bold ${t.text}`}>Department Status</h3>
                    <p className={`text-xs ${t.subtext} mt-0.5`}>Real-time capacity and performance</p>
                  </div>
                  <button className={`text-xs ${t.subtext} hover:${t.text} transition-colors`}>View All</button>
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  {departments.map((dept, i) => {
                    const Icon = dept.icon;
                    const loadColor = dept.load >= 90 ? "#C8102E" : dept.load >= 70 ? "#F59E0B" : "#059669";
                    return (
                      <div
                        key={i}
                        onClick={() => setSelectedDept(selectedDept === dept.name ? null : dept.name)}
                        className={`rounded-xl border ${t.cardBorder} p-4 cursor-pointer transition-all hover:border-[#C8102E]/30 ${selectedDept === dept.name ? "border-[#C8102E]/50 " + t.soft : t.soft}`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-[#C8102E]/10 flex items-center justify-center">
                              <Icon size={16} className="text-[#C8102E]" />
                            </div>
                            <div>
                              <h4 className={`text-sm font-bold ${t.text}`}>{dept.name}</h4>
                              <p className={`text-xs ${t.subtext}`}>{dept.doctors} physicians</p>
                            </div>
                          </div>
                          <span className={`text-xs font-bold`} style={{ color: loadColor }}>{dept.load}%</span>
                        </div>
                        <div className={`w-full h-1.5 rounded-full ${darkMode ? "bg-[#1E3A5F]" : "bg-slate-200"} overflow-hidden`}>
                          <div className="h-full rounded-full transition-all duration-700" style={{ width: `${dept.load}%`, backgroundColor: loadColor }} />
                        </div>
                        {dept.patients > 0 && (
                          <div className="flex items-center justify-between mt-2">
                            <span className={`text-xs ${t.subtext}`}>{dept.patients} patients</span>
                            <span className={`text-xs ${t.subtext}`}>{dept.beds} beds</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="space-y-5">

              {/* LIVE EMERGENCY */}
              <div className="rounded-2xl bg-[#0A1628] p-5 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-[#C8102E]/10 -mr-10 -mt-10" />
                <div className="absolute bottom-0 left-0 w-20 h-20 rounded-full bg-[#C8102E]/5 -ml-8 -mb-8" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#C8102E] animate-ping" />
                      <span className="text-[#C8102E] text-xs font-bold uppercase tracking-wider">LIVE Emergency</span>
                    </div>
                    <PhoneCall size={16} className="text-[#4A6080]" />
                  </div>
                  <h3 className="text-lg font-bold mt-2">Critical Heart Patient</h3>
                  <p className="text-[#4A6080] text-xs mt-1">Robert Thornton • 58y • A+</p>
                  <div className="mt-4 space-y-2.5">
                    {[
                      { label: "Ambulance", value: "A-221 En Route" },
                      { label: "ETA", value: "4 Minutes" },
                      { label: "Location", value: "Downtown Plaza" },
                      { label: "Responding", value: "Dr. Sarah Chen" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span className="text-[#4A6080] text-xs">{item.label}</span>
                        <span className="text-white text-xs font-semibold">{item.value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <button className="py-2.5 rounded-xl bg-[#C8102E] text-white text-xs font-bold hover:bg-[#A30D26] transition-colors">View Emergency</button>
                    <button className="py-2.5 rounded-xl border border-[#1E3A5F] text-[#4A6080] text-xs font-semibold hover:border-white hover:text-white transition-colors">Dispatch More</button>
                  </div>
                </div>
              </div>

              {/* ICU + OCCUPANCY GAUGES */}
              <div className={`${cardClass} p-5`}>
                <h3 className={`text-sm font-bold ${t.text} mb-4`}>Ward Occupancy</h3>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "ICU", value: 82, color: "#C8102E" },
                    { label: "General", value: 68, color: "#0891B2" },
                    { label: "Surgical", value: 91, color: "#F59E0B" },
                  ].map((g, i) => (
                    <div key={i} className={`rounded-xl p-3 ${t.soft} text-center`}>
                      <div className={`w-full aspect-square ${t.text}`}>
                        <RadialGauge value={g.value} max={100} label={g.label} color={g.color} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* APPOINTMENTS */}
              <div className={`${cardClass} p-5`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`text-sm font-bold ${t.text}`}>Today's Schedule</h3>
                  <button className="text-xs text-[#C8102E] font-semibold">View Calendar</button>
                </div>
                <div className="space-y-3">
                  {upcomingAppointments.map((appt, i) => (
                    <div key={i} className={`flex items-start gap-3 p-3 rounded-xl ${t.soft} cursor-pointer hover:opacity-80 transition-opacity`}>
                      <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${getPriorityDot(appt.priority)}`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className={`text-xs font-bold ${t.text} truncate`}>{appt.patient}</p>
                          <span className={`text-xs ${t.subtext} flex-shrink-0 ml-2`}>{appt.time}</span>
                        </div>
                        <p className={`text-xs ${t.subtext} truncate`}>{appt.type}</p>
                        <p className={`text-xs ${t.subtext}`}>{appt.doctor} · {appt.room}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* STAFF ON DUTY */}
              <div className={`${cardClass} p-5`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`text-sm font-bold ${t.text}`}>Staff On Duty</h3>
                  <span className={`text-xs ${t.subtext}`}>284 active</span>
                </div>
                <div className="space-y-3">
                  {staffOnDuty.map((s, i) => {
                    const initials = s.name.split(" ").slice(1).map(n => n[0]).join("").slice(0,2);
                    const colors = ["#C8102E", "#0891B2", "#7C3AED", "#059669", "#F59E0B"];
                    const statusColor = s.status === "Available" ? "text-[#059669]" : s.status === "In Surgery" ? "text-[#C8102E]" : "text-[#F59E0B]";
                    return (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: colors[i] }}>
                          {initials}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-xs font-semibold ${t.text} truncate`}>{s.name}</p>
                          <p className={`text-xs ${t.subtext}`}>{s.dept}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className={`text-xs font-semibold ${statusColor}`}>{s.status}</p>
                          {s.patients > 0 && <p className={`text-xs ${t.subtext}`}>{s.patients} pts</p>}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <button className={`mt-4 w-full py-2 rounded-xl border ${t.cardBorder} text-xs font-semibold ${t.subtext} hover:opacity-80 transition-opacity`}>View All Staff</button>
              </div>

              {/* QUICK ACTIONS */}
              <div className={`${cardClass} p-5`}>
                <h3 className={`text-sm font-bold ${t.text} mb-4`}>Quick Actions</h3>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: "Add Patient", icon: Plus, color: "#C8102E" },
                    { label: "Dispatch Ambulance", icon: Ambulance, color: "#0891B2" },
                    { label: "Lab Request", icon: FlaskConical, color: "#7C3AED" },
                    { label: "Schedule Surgery", icon: CalendarDays, color: "#059669" },
                    { label: "Generate Report", icon: FileText, color: "#F59E0B" },
                    { label: "Alert Broadcast", icon: Siren, color: "#EC4899" },
                  ].map((action, i) => {
                    const Icon = action.icon;
                    return (
                      <button
                        key={i}
                        className={`flex flex-col items-center gap-2 p-3 rounded-xl ${t.soft} hover:opacity-80 transition-opacity text-center`}
                      >
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${action.color}15` }}>
                          <Icon size={15} style={{ color: action.color }} />
                        </div>
                        <span className={`text-xs font-semibold ${t.text} leading-tight`}>{action.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* SYSTEM HEALTH */}
              <div className={`${cardClass} p-5`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`text-sm font-bold ${t.text}`}>System Health</h3>
                  <ShieldCheck size={16} className="text-[#059669]" />
                </div>
                <div className="space-y-4">
                  {[
                    { name: "Core Database", load: 94, status: "Optimal" },
                    { name: "Emergency Services", load: 100, status: "Active" },
                    { name: "Patient Records", load: 88, status: "Optimal" },
                    { name: "Lab Systems", load: 76, status: "Normal" },
                    { name: "Billing Engine", load: 62, status: "Normal" },
                  ].map((item, i) => {
                    const loadColor = item.load === 100 ? "#059669" : item.load >= 80 ? "#0891B2" : "#F59E0B";
                    return (
                      <div key={i}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className={`text-xs font-medium ${t.text}`}>{item.name}</span>
                          <span className="text-xs font-bold" style={{ color: loadColor }}>{item.status}</span>
                        </div>
                        <div className={`w-full h-1 rounded-full ${darkMode ? "bg-[#1E3A5F]" : "bg-slate-200"} overflow-hidden`}>
                          <div className="h-full rounded-full transition-all duration-700" style={{ width: `${item.load}%`, backgroundColor: loadColor }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* LIVE VITALS MONITOR */}
              <div className={`${cardClass} p-5`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`text-sm font-bold ${t.text}`}>ICU Vitals Monitor</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#059669] animate-pulse" />
                    <span className="text-xs text-[#059669] font-semibold">Live</span>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { label: "Heart Rate", value: "78 bpm", normal: true, icon: Heart, color: "#C8102E" },
                    { label: "Blood Pressure", value: "124/82", normal: true, icon: Activity, color: "#0891B2" },
                    { label: "O₂ Saturation", value: "97%", normal: true, icon: Droplets, color: "#059669" },
                    { label: "Temperature", value: "37.8°C", normal: false, icon: Thermometer, color: "#F59E0B" },
                  ].map((v, i) => {
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
                            {v.normal ? "Normal" : "Watch"}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* RECENT ACTIVITIES */}
          <div className={`${cardClass} p-6`}>
            <div className="flex items-center justify-between mb-5">
              <h3 className={`text-base font-bold ${t.text}`}>Recent Activity Log</h3>
              <button className={`text-xs ${t.subtext} hover:opacity-80 transition-opacity`}>View Full Log →</button>
            </div>
            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
              {[
                { activity: "Emergency patient admitted", sub: "Robert Thornton — ICU-3", time: "9:14 AM", icon: Siren, color: "#C8102E" },
                { activity: "Doctor assigned to ICU", sub: "Dr. Sarah Chen reassigned", time: "9:10 AM", icon: Stethoscope, color: "#0891B2" },
                { activity: "Ambulance A-221 dispatched", sub: "Downtown Plaza — ETA 4min", time: "9:08 AM", icon: Ambulance, color: "#7C3AED" },
                { activity: "Patient successfully discharged", sub: "Maria Santos — Room W-9", time: "8:52 AM", icon: CheckCircle2, color: "#059669" },
                { activity: "Lab results uploaded", sub: "Pathology — 12 samples", time: "8:45 AM", icon: FlaskConical, color: "#F59E0B" },
                { activity: "Surgical suite booked", sub: "OR-3 — Dr. White 11:30 AM", time: "8:30 AM", icon: CalendarDays, color: "#EC4899" },
                { activity: "Blood bank alert", sub: "O- stock low — 8 units", time: "8:15 AM", icon: AlertTriangle, color: "#F59E0B" },
                { activity: "New staff shift started", sub: "128 doctors now active", time: "8:00 AM", icon: UserCheck, color: "#059669" },
              ].map((a, i) => {
                const Icon = a.icon;
                return (
                  <div key={i} className={`flex items-start gap-3 p-3 rounded-xl ${t.soft}`}>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${a.color}15` }}>
                      <Icon size={15} style={{ color: a.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-semibold ${t.text} leading-snug`}>{a.activity}</p>
                      <p className={`text-xs ${t.subtext} mt-0.5 truncate`}>{a.sub}</p>
                      <p className={`text-xs ${t.subtext} mt-1 font-medium`}>{a.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;

















// green and white dashboard 

// import React, { useState } from "react";
// import {
//   Activity,
//   Ambulance,
//   Bell,
//   CalendarDays,
//   ChevronRight,
//   ClipboardList,
//   HeartPulse,
//   LayoutDashboard,
//   Moon,
//   Search,
//   Settings,
//   ShieldCheck,
//   Sun,
//   Users,
//   Stethoscope,
//   TrendingUp,
//   Siren,
//   BedDouble,
//   Clock3,
//   Plus,
// } from "lucide-react";

// const Dashboard = () => {
//   const [darkMode, setDarkMode] = useState(false);

//   const theme = darkMode
//     ? {
//         bg: "bg-[#0B1215]",
//         sidebar: "bg-[#10181D]",
//         card: "bg-[#121B22]",
//         border: "border-[#22303A]",
//         text: "text-white",
//         subtext: "text-[#94A3B8]",
//         soft: "bg-[#17232C]",
//       }
//     : {
//         bg: "bg-[#F6F8F7]",
//         sidebar: "bg-white",
//         card: "bg-white",
//         border: "border-[#DCE5DE]",
//         text: "text-[#1C2A24]",
//         subtext: "text-[#5B6B63]",
//         soft: "bg-[#EEF4F0]",
//       };

//   const stats = [
//     {
//       title: "Patients Today",
//       value: "1,284",
//       icon: Users,
//       color: "bg-emerald-100 text-emerald-700",
//     },
//     {
//       title: "Emergency Cases",
//       value: "32",
//       icon: Siren,
//       color: "bg-orange-100 text-orange-700",
//     },
//     {
//       title: "Doctors Active",
//       value: "284",
//       icon: Stethoscope,
//       color: "bg-teal-100 text-teal-700",
//     },
//     {
//       title: "Revenue",
//       value: "$48.2K",
//       icon: TrendingUp,
//       color: "bg-lime-100 text-lime-700",
//     },
//   ];

//   const departments = [
//     "Cardiology",
//     "Neurology",
//     "Emergency",
//     "Orthopedics",
//     "Pediatrics",
//     "Radiology",
//   ];

//   return (
//     <div
//       className={`min-h-screen flex transition-all duration-300 ${theme.bg}`}
//     >
//       {/* SIDEBAR */}
//       <aside
//         className={`w-[290px] border-r ${theme.border} ${theme.sidebar} p-6 hidden lg:flex flex-col`}
//       >
//         {/* LOGO */}
//         <div className="flex items-center gap-4 mb-10">
//           <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#14532D] to-[#0F766E] flex items-center justify-center shadow-lg">
//             <HeartPulse className="text-white" size={28} />
//           </div>

//           <div>
//             <h1 className={`text-2xl font-black ${theme.text}`}>
//               MediCore
//             </h1>
//             <p className={`text-sm ${theme.subtext}`}>
//               Healthcare System
//             </p>
//           </div>
//         </div>

//         {/* MENU */}
//         <div className="space-y-2">
//           {[
//             {
//               icon: LayoutDashboard,
//               label: "Dashboard",
//               active: true,
//             },
//             {
//               icon: Users,
//               label: "Patients",
//             },
//             {
//               icon: Stethoscope,
//               label: "Doctors",
//             },
//             {
//               icon: Ambulance,
//               label: "Ambulance",
//             },
//             {
//               icon: ClipboardList,
//               label: "Reports",
//             },
//             {
//               icon: CalendarDays,
//               label: "Appointments",
//             },
//             {
//               icon: Settings,
//               label: "Settings",
//             },
//           ].map((item, i) => {
//             const Icon = item.icon;

//             return (
//               <button
//                 key={i}
//                 className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl transition-all ${
//                   item.active
//                     ? "bg-gradient-to-r from-[#14532D] to-[#0F766E] text-white shadow-lg"
//                     : `${theme.text} hover:bg-[#14532D]/10`
//                 }`}
//               >
//                 <div className="flex items-center gap-3">
//                   <Icon size={20} />
//                   <span className="font-semibold">
//                     {item.label}
//                   </span>
//                 </div>

//                 {item.active && (
//                   <div className="w-2 h-2 rounded-full bg-white" />
//                 )}
//               </button>
//             );
//           })}
//         </div>

//         {/* SYSTEM STATUS */}
//         <div
//           className={`mt-auto rounded-3xl p-6 border ${theme.border} ${theme.soft}`}
//         >
//           <div className="flex items-center gap-3">
//             <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />

//             <p className={`font-semibold ${theme.text}`}>
//               System Operational
//             </p>
//           </div>

//           <p className={`mt-3 text-sm ${theme.subtext}`}>
//             All healthcare systems are functioning normally.
//           </p>
//         </div>
//       </aside>

//       {/* MAIN */}
//       <main className="flex-1 p-8">
//         {/* TOPBAR */}
//         <div className="flex items-center justify-between mb-8">
//           <div>
//             <h2
//               className={`text-4xl font-black tracking-tight ${theme.text}`}
//             >
//               Healthcare Operations Center
//             </h2>

//             <p className={`mt-2 ${theme.subtext}`}>
//               Operational Overview — Sunday, 8:45 PM
//             </p>
//           </div>

//           <div className="flex items-center gap-4">
//             {/* SEARCH */}
//             <div
//               className={`flex items-center gap-3 px-5 py-3 rounded-2xl border ${theme.border} ${theme.card}`}
//             >
//               <Search size={18} className={theme.subtext} />

//               <input
//                 placeholder="Search patients, doctors..."
//                 className={`bg-transparent outline-none ${theme.text}`}
//               />
//             </div>

//             {/* DARK MODE */}
//             <button
//               onClick={() => setDarkMode(!darkMode)}
//               className={`w-14 h-14 rounded-2xl border ${theme.border} ${theme.card} flex items-center justify-center`}
//             >
//               {darkMode ? (
//                 <Sun className="text-yellow-400" />
//               ) : (
//                 <Moon className={theme.text} />
//               )}
//             </button>

//             {/* NOTIFICATION */}
//             <button
//               className={`relative w-14 h-14 rounded-2xl border ${theme.border} ${theme.card} flex items-center justify-center`}
//             >
//               <Bell className={theme.text} />

//               <div className="absolute top-3 right-3 w-3 h-3 bg-red-500 rounded-full" />
//             </button>
//           </div>
//         </div>

//         {/* HOSPITAL STATUS BAR */}
//         <div className="grid grid-cols-4 gap-5 mb-8">
//           {[
//             {
//               label: "Emergency Cases",
//               value: "12 Active",
//             },
//             {
//               label: "ICU Occupancy",
//               value: "82%",
//             },
//             {
//               label: "Ambulances Online",
//               value: "14",
//             },
//             {
//               label: "Available Doctors",
//               value: "128",
//             },
//           ].map((item, i) => (
//             <div
//               key={i}
//               className={`rounded-3xl p-5 border ${theme.border} ${theme.card}`}
//             >
//               <p className={`text-sm ${theme.subtext}`}>
//                 {item.label}
//               </p>

//               <h3
//                 className={`text-3xl font-black mt-3 ${theme.text}`}
//               >
//                 {item.value}
//               </h3>
//             </div>
//           ))}
//         </div>

//         {/* STATS */}
//         <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-6 mb-8">
//           {stats.map((item, i) => {
//             const Icon = item.icon;

//             return (
//               <div
//                 key={i}
//                 className={`rounded-[28px] border ${theme.border} ${theme.card} p-6 shadow-sm hover:shadow-xl transition-all`}
//               >
//                 <div className="flex items-start justify-between">
//                   <div>
//                     <p className={`${theme.subtext}`}>
//                       {item.title}
//                     </p>

//                     <h3
//                       className={`text-4xl font-black mt-4 ${theme.text}`}
//                     >
//                       {item.value}
//                     </h3>
//                   </div>

//                   <div
//                     className={`w-14 h-14 rounded-2xl flex items-center justify-center ${item.color}`}
//                   >
//                     <Icon size={24} />
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* MAIN GRID */}
//         <div className="grid xl:grid-cols-3 gap-6">
//           {/* LEFT */}
//           <div className="xl:col-span-2 space-y-6">
//             {/* ANALYTICS */}
//             <div
//               className={`rounded-[30px] border ${theme.border} ${theme.card} p-7`}
//             >
//               <div className="flex items-center justify-between mb-10">
//                 <div>
//                   <h3
//                     className={`text-2xl font-black ${theme.text}`}
//                   >
//                     Patient Analytics
//                   </h3>

//                   <p className={`mt-2 ${theme.subtext}`}>
//                     Hospital activity and admissions
//                   </p>
//                 </div>

//                 <button className="px-5 py-3 rounded-2xl bg-[#14532D] text-white font-semibold">
//                   Generate Report
//                 </button>
//               </div>

//               {/* CHART */}
//               <div className="h-[320px] flex items-end gap-4">
//                 {[80, 140, 110, 220, 180, 260, 190].map(
//                   (height, i) => (
//                     <div
//                       key={i}
//                       className="flex-1 rounded-t-3xl bg-gradient-to-t from-[#14532D] to-[#0F766E]"
//                       style={{ height }}
//                     />
//                   )
//                 )}
//               </div>
//             </div>

//             {/* DEPARTMENTS */}
//             <div
//               className={`rounded-[30px] border ${theme.border} ${theme.card} p-7`}
//             >
//               <div className="flex items-center justify-between mb-8">
//                 <div>
//                   <h3
//                     className={`text-2xl font-black ${theme.text}`}
//                   >
//                     Department Overview
//                   </h3>

//                   <p className={`mt-2 ${theme.subtext}`}>
//                     Hospital department performance
//                   </p>
//                 </div>
//               </div>

//               <div className="grid md:grid-cols-2 gap-5">
//                 {departments.map((dept, i) => (
//                   <div
//                     key={i}
//                     className={`rounded-3xl border ${theme.border} p-5 ${theme.soft}`}
//                   >
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <h4
//                           className={`text-lg font-black ${theme.text}`}
//                         >
//                           {dept}
//                         </h4>

//                         <p
//                           className={`text-sm mt-1 ${theme.subtext}`}
//                         >
//                           42 Active Patients
//                         </p>
//                       </div>

//                       <div className="w-3 h-3 rounded-full bg-emerald-500" />
//                     </div>

//                     <div className="mt-5">
//                       <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden">
//                         <div className="w-[72%] h-full rounded-full bg-gradient-to-r from-[#14532D] to-[#0F766E]" />
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* RECENT ACTIVITIES */}
//             <div
//               className={`rounded-[30px] border ${theme.border} ${theme.card} p-7`}
//             >
//               <h3
//                 className={`text-2xl font-black mb-8 ${theme.text}`}
//               >
//                 Recent Activities
//               </h3>

//               <div className="space-y-6">
//                 {[
//                   "Emergency patient admitted",
//                   "Doctor assigned to ICU",
//                   "Ambulance dispatched downtown",
//                   "Patient successfully discharged",
//                 ].map((activity, i) => (
//                   <div
//                     key={i}
//                     className="flex items-start gap-4"
//                   >
//                     <div className="w-3 h-3 rounded-full bg-[#14532D] mt-2" />

//                     <div>
//                       <h4 className={`font-semibold ${theme.text}`}>
//                         {activity}
//                       </h4>

//                       <p
//                         className={`text-sm mt-1 ${theme.subtext}`}
//                       >
//                         {i + 2}:15 PM
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* RIGHT */}
//           <div className="space-y-6">
//             {/* LIVE EMERGENCY */}
//             <div className="rounded-[30px] bg-gradient-to-br from-[#14532D] to-[#0F766E] p-7 text-white shadow-2xl">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-white/70">
//                     Emergency Alert
//                   </p>

//                   <h3 className="text-3xl font-black mt-2">
//                     Critical Heart Patient
//                   </h3>
//                 </div>

//                 <div className="w-4 h-4 rounded-full bg-red-400 animate-pulse" />
//               </div>

//               <div className="mt-8 space-y-5">
//                 <div className="flex items-center justify-between">
//                   <span className="text-white/70">
//                     Ambulance
//                   </span>

//                   <span className="font-bold">
//                     A-221 Active
//                   </span>
//                 </div>

//                 <div className="flex items-center justify-between">
//                   <span className="text-white/70">ETA</span>

//                   <span className="font-bold">4 Minutes</span>
//                 </div>

//                 <div className="flex items-center justify-between">
//                   <span className="text-white/70">
//                     Location
//                   </span>

//                   <span className="font-bold">Downtown</span>
//                 </div>
//               </div>

//               <button className="mt-8 w-full py-4 rounded-2xl bg-white text-[#14532D] font-black">
//                 View Emergency
//               </button>
//             </div>

//             {/* BED OCCUPANCY */}
//             <div
//               className={`rounded-[30px] border ${theme.border} ${theme.card} p-7`}
//             >
//               <div className="flex items-center justify-between">
//                 <div>
//                   <h3
//                     className={`text-2xl font-black ${theme.text}`}
//                   >
//                     ICU Occupancy
//                   </h3>

//                   <p className={`mt-2 ${theme.subtext}`}>
//                     Bed management status
//                   </p>
//                 </div>

//                 <BedDouble className="text-[#14532D]" />
//               </div>

//               <div className="flex justify-center py-10">
//                 <div className="relative w-52 h-52 rounded-full bg-gradient-to-br from-[#14532D] to-[#0F766E] flex items-center justify-center">
//                   <div
//                     className={`absolute inset-5 rounded-full ${theme.card} flex flex-col items-center justify-center`}
//                   >
//                     <h2
//                       className={`text-5xl font-black ${theme.text}`}
//                     >
//                       82%
//                     </h2>

//                     <p className={`${theme.subtext} mt-2`}>
//                       Occupied
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* QUICK ACTIONS */}
//             <div
//               className={`rounded-[30px] border ${theme.border} ${theme.card} p-7`}
//             >
//               <h3
//                 className={`text-2xl font-black mb-6 ${theme.text}`}
//               >
//                 Quick Actions
//               </h3>

//               <div className="space-y-4">
//                 {[
//                   "Add Patient",
//                   "Dispatch Ambulance",
//                   "Generate Report",
//                   "Schedule Surgery",
//                 ].map((item, i) => (
//                   <button
//                     key={i}
//                     className={`w-full flex items-center justify-between p-4 rounded-2xl ${theme.soft} hover:bg-[#14532D]/10 transition-all`}
//                   >
//                     <div className="flex items-center gap-3">
//                       <Plus size={18} />

//                       <span className={`font-semibold ${theme.text}`}>
//                         {item}
//                       </span>
//                     </div>

//                     <ChevronRight size={18} />
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* SYSTEM HEALTH */}
//             <div
//               className={`rounded-[30px] border ${theme.border} ${theme.card} p-7`}
//             >
//               <div className="flex items-center justify-between">
//                 <div>
//                   <h3
//                     className={`text-2xl font-black ${theme.text}`}
//                   >
//                     System Health
//                   </h3>

//                   <p className={`mt-2 ${theme.subtext}`}>
//                     Operational monitoring
//                   </p>
//                 </div>

//                 <ShieldCheck className="text-emerald-600" />
//               </div>

//               <div className="space-y-5 mt-8">
//                 {[
//                   "Database",
//                   "Emergency Services",
//                   "Patient Records",
//                 ].map((item, i) => (
//                   <div key={i}>
//                     <div className="flex items-center justify-between mb-2">
//                       <span className={`${theme.text}`}>
//                         {item}
//                       </span>

//                       <span className="text-emerald-600 font-bold">
//                         Healthy
//                       </span>
//                     </div>

//                     <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
//                       <div className="w-[92%] h-full bg-emerald-600 rounded-full" />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;
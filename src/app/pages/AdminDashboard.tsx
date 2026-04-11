import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { supabase, RSVPEntry, GIFT_OPTIONS } from "../../lib/supabase";

const giftLabel = (id: string | null) => {
  if (!id) return "—";
  return GIFT_OPTIONS.find((g) => g.id === id)?.label ?? id;
};

export function AdminDashboard() {
  const navigate = useNavigate();
  const [rsvps, setRsvps] = useState<RSVPEntry[]>([]);
  const [search, setSearch] = useState("");
  const [focused, setFocused] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    const auth = sessionStorage.getItem("wedding_admin_auth");
    if (!auth) { navigate("/admin"); return; }
    fetchRSVPs();
  }, [navigate]);

  const fetchRSVPs = async () => {
    setLoading(true);
    setFetchError(null);
    try {
      const { data, error } = await supabase
        .from("rsvps")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setRsvps(data || []);
    } catch (err) {
      console.error(err);
      setFetchError("Failed to load RSVPs. Please refresh and try again.");
    } finally {
      setLoading(false);
    }
  };

  const filtered = rsvps.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.email.toLowerCase().includes(search.toLowerCase()) ||
    r.phone.includes(search)
  );

  const total = rsvps.length;

  // Gift breakdown counts
  const giftBreakdown = GIFT_OPTIONS.map((g) => ({
    ...g,
    count: rsvps.filter((r) => r.gift === g.id).length,
  }));

  const exportCSV = () => {
    const header = "Name,Email,Phone,Gift,Message,Date Submitted";
    const rows = filtered.map((r) =>
      [
        `"${r.name}"`,
        r.email,
        r.phone,
        `"${giftLabel(r.gift)}"`,
        `"${r.message.replace(/"/g, '""')}"`,
        new Date(r.created_at).toLocaleDateString(),
      ].join(",")
    );
    const csv = [header, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "wedding_rsvps.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("wedding_admin_auth");
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0]">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-[#9CAF88]/20 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <span className="font-['Great_Vibes'] text-2xl text-[#2D2D2D]">Amara & James</span>
            <span className="ml-3 font-['DM_Sans'] text-xs tracking-widest uppercase text-[#2D2D2D]/45 hidden sm:inline">RSVP Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={fetchRSVPs} className="font-['DM_Sans'] text-xs tracking-widest uppercase text-[#2D2D2D]/50 hover:text-[#C9A84C] transition-colors hidden sm:block">↻ Refresh</button>
            <a href="/" className="font-['DM_Sans'] text-xs tracking-widest uppercase text-[#2D2D2D]/50 hover:text-[#C9A84C] transition-colors hidden sm:block">View Site</a>
            <button onClick={handleLogout} className="font-['DM_Sans'] text-xs tracking-widest uppercase text-[#2D2D2D]/50 hover:text-red-400 transition-colors">Sign Out</button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Title */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-8">
          <h1 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl text-[#2D2D2D] font-light">Guest Responses</h1>
          <p className="font-['DM_Sans'] text-sm text-[#2D2D2D]/50 mt-1">Manage and view all RSVP submissions</p>
        </motion.div>

        {fetchError && (
          <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 rounded-xl">
            <p className="font-['DM_Sans'] text-sm text-red-600 text-center">{fetchError}</p>
          </div>
        )}

        {/* Summary + Gift Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
          {/* Total RSVPs card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="rounded-2xl p-6 shadow-sm flex items-center gap-5"
            style={{ background: "#9CAF8820", border: "1.5px solid #9CAF8833" }}
          >
            <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#9CAF8833" }}>
              <span className="font-['Cormorant_Garamond'] text-2xl font-light text-[#9CAF88]">{total}</span>
            </div>
            <div>
              <p className="font-['DM_Sans'] text-xs tracking-widest uppercase text-[#2D2D2D]/55">Total RSVPs</p>
              <p className="font-['Cormorant_Garamond'] text-3xl font-light text-[#9CAF88]">{total}</p>
            </div>
          </motion.div>

          {/* Gift breakdown card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2 rounded-2xl p-6 shadow-sm"
            style={{ background: "#D4AF6A0A", border: "1.5px solid #D4AF6A33" }}
          >
            <p className="font-['DM_Sans'] text-xs tracking-widest uppercase text-[#C9A84C] mb-4">Gift Reservations</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-2">
              {giftBreakdown.map((g) => (
                <div key={g.id} className="flex items-center justify-between gap-2">
                  <span className="font-['DM_Sans'] text-xs text-[#2D2D2D]/65 truncate">{g.label}</span>
                  <span className={`flex-shrink-0 font-['DM_Sans'] text-xs font-semibold px-2 py-0.5 rounded-full ${
                    g.count > 0 ? "bg-[#C9A84C]/15 text-[#C9A84C]" : "bg-[#9CAF88]/10 text-[#2D2D2D]/35"
                  }`}>
                    {g.count}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Search & Export */}
        <motion.div
          initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-3 mb-6"
        >
          <div className="relative flex-1">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CAF88]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search by name, email, or phone…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              className={`w-full pl-10 pr-4 py-3 rounded-xl font-['DM_Sans'] text-sm text-[#2D2D2D] bg-white outline-none transition-all duration-300 placeholder-[#2D2D2D]/35 ${
                focused ? "shadow-[0_0_0_2.5px_#D4AF6A] border-transparent" : "border border-[#9CAF88]/35 hover:border-[#9CAF88]/60"
              }`}
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={exportCSV}
            className="relative overflow-hidden px-5 py-2 bg-[#C9A84C] text-white font-['DM_Sans'] text-xs tracking-widest uppercase rounded-full shadow-sm hover:bg-[#D4AF6A] transition-colors duration-300 group whitespace-nowrap"
          >
            <span className="relative z-10 flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Export CSV
            </span>
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent group-hover:translate-x-full transition-transform duration-600 ease-in-out" />
          </motion.button>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-2xl shadow-sm overflow-hidden"
          style={{ border: "1.5px solid #D4AF6A22" }}
        >
          {loading ? (
            <div className="py-20 text-center">
              <p className="font-['Cormorant_Garamond'] text-xl text-[#2D2D2D]/40 italic animate-pulse">Loading responses…</p>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#9CAF88]/20 bg-[#9CAF88]/5">
                      {["Name", "Email", "Phone", "Gift Reserved", "Message", "Date"].map((h) => (
                        <th key={h} className="text-left px-6 py-4 font-['DM_Sans'] text-xs tracking-widest uppercase text-[#2D2D2D]/50">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="text-center py-16">
                          <p className="font-['Cormorant_Garamond'] text-xl text-[#2D2D2D]/40 italic">No responses found</p>
                        </td>
                      </tr>
                    ) : filtered.map((r) => (
                      <tr key={r.id} className="border-b border-[#9CAF88]/10 transition-colors hover:bg-[#FAF6F0]/80">
                        <td className="px-6 py-4 font-['DM_Sans'] text-sm text-[#2D2D2D]">{r.name}</td>
                        <td className="px-6 py-4 font-['DM_Sans'] text-sm text-[#2D2D2D]/70">{r.email}</td>
                        <td className="px-6 py-4 font-['DM_Sans'] text-sm text-[#2D2D2D]/70">{r.phone}</td>
                        <td className="px-6 py-4">
                          {r.gift ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-['DM_Sans'] text-xs font-medium bg-[#C9A84C]/12 text-[#9A7A2A]">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
                              {giftLabel(r.gift)}
                            </span>
                          ) : (
                            <span className="font-['DM_Sans'] text-sm text-[#2D2D2D]/30">—</span>
                          )}
                        </td>
                        <td className="px-6 py-4 font-['DM_Sans'] text-sm text-[#2D2D2D]/60 max-w-xs">
                          <span className="truncate block max-w-[180px]">{r.message || "—"}</span>
                        </td>
                        <td className="px-6 py-4 font-['DM_Sans'] text-xs text-[#2D2D2D]/50 whitespace-nowrap">
                          {new Date(r.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden divide-y divide-[#9CAF88]/10">
                {filtered.length === 0 ? (
                  <div className="py-16 text-center">
                    <p className="font-['Cormorant_Garamond'] text-xl text-[#2D2D2D]/40 italic">No responses found</p>
                  </div>
                ) : filtered.map((r) => (
                  <div key={r.id} className="p-5">
                    <p className="font-['DM_Sans'] text-sm font-medium text-[#2D2D2D] mb-1">{r.name}</p>
                    <p className="font-['DM_Sans'] text-xs text-[#2D2D2D]/60 mb-1">{r.email}</p>
                    <p className="font-['DM_Sans'] text-xs text-[#2D2D2D]/50 mb-2">{r.phone}</p>
                    {r.gift && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-['DM_Sans'] text-xs font-medium bg-[#C9A84C]/12 text-[#9A7A2A] mb-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
                        {giftLabel(r.gift)}
                      </span>
                    )}
                    {r.message && <p className="font-['DM_Sans'] text-xs text-[#2D2D2D]/55 italic mb-2">"{r.message}"</p>}
                    <p className="font-['DM_Sans'] text-xs text-[#2D2D2D]/35">
                      {new Date(r.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}

          <div className="px-6 py-3 border-t border-[#9CAF88]/10 bg-[#9CAF88]/5 flex items-center justify-between">
            <p className="font-['DM_Sans'] text-xs text-[#2D2D2D]/45">Showing {filtered.length} of {total} responses</p>
            <p className="font-['Great_Vibes'] text-sm text-[#9CAF88]">Amara & James · June 2026</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
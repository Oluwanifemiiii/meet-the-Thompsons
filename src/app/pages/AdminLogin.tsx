import { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { BotanicalCornerTL, BotanicalCornerBR } from "../components/BotanicalElements";
import { supabase } from "../../lib/supabase";

export function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });

      if (authError) {
        setError("Invalid credentials. Please try again.");
        return;
      }

      sessionStorage.setItem("wedding_admin_auth", "true");
      navigate("/admin/dashboard");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputBase = (field: string) =>
    `w-full px-4 py-3.5 rounded-xl font-['DM_Sans'] text-sm text-[#2D2D2D] bg-[#FAF6F0] outline-none transition-all duration-300 placeholder-[#2D2D2D]/35 ${
      focused === field
        ? "shadow-[0_0_0_2.5px_#D4AF6A] border-transparent"
        : "border border-[#9CAF88]/40 hover:border-[#9CAF88]/70"
    }`;

  return (
    <div className="min-h-screen bg-[#FAF6F0] flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-48 h-48 pointer-events-none opacity-40">
        <BotanicalCornerTL className="w-full h-full" />
      </div>
      <div className="absolute bottom-0 right-0 w-48 h-48 pointer-events-none opacity-40">
        <BotanicalCornerBR className="w-full h-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-10">
          <p className="font-['Great_Vibes'] text-3xl text-[#9CAF88] mb-1">Amara & James</p>
          <h1 className="font-['Cormorant_Garamond'] text-3xl text-[#2D2D2D] font-light tracking-wide mb-2">
            Admin Portal
          </h1>
          <p className="font-['DM_Sans'] text-xs text-[#2D2D2D]/45 tracking-widest uppercase">
            RSVP Management
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8" style={{ border: "1.5px solid #D4AF6A33" }}>
          <form onSubmit={handleLogin}>
            <div className="space-y-4">
              <div>
                <label className="block font-['DM_Sans'] text-xs tracking-widest uppercase text-[#2D2D2D]/55 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused(null)}
                  placeholder="admin@wedding.com"
                  className={inputBase("email")}
                  required
                />
              </div>
              <div>
                <label className="block font-['DM_Sans'] text-xs tracking-widest uppercase text-[#2D2D2D]/55 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocused("password")}
                  onBlur={() => setFocused(null)}
                  placeholder="••••••••"
                  className={inputBase("password")}
                  required
                />
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-['DM_Sans'] text-xs text-red-500 text-center"
                >
                  {error}
                </motion.p>
              )}

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative w-full py-4 bg-[#C9A84C] text-white font-['DM_Sans'] text-sm tracking-[0.25em] uppercase rounded-xl shadow-md hover:bg-[#D4AF6A] transition-colors duration-300 overflow-hidden group mt-2 disabled:opacity-70"
              >
                <span className="relative z-10">{loading ? "Signing in…" : "Sign In"}</span>
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
              </motion.button>
            </div>
          </form>
        </div>

        <div className="text-center mt-6">
          <a
            href="/"
            className="font-['DM_Sans'] text-xs tracking-widest uppercase text-[#2D2D2D]/40 hover:text-[#C9A84C] transition-colors duration-300"
          >
            ← Back to Wedding Site
          </a>
        </div>
      </motion.div>
    </div>
  );
}

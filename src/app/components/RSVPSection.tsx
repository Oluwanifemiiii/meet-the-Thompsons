import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";
import { supabase, GIFT_OPTIONS, MONEY_GIFT_DETAILS, GiftId } from "../../lib/supabase";

interface RSVPFormData {
  name: string;
  email: string;
  phone: string;
  gift: GiftId | null;
  message: string;
}

function CopyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
    </svg>
  );
}

export function RSVPSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const navigate = useNavigate();

  const [form, setForm] = useState<RSVPFormData>({
    name: "",
    email: "",
    phone: "",
    gift: null,
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof RSVPFormData, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [focused, setFocused] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Track which gifts are already claimed
  const [claimedGifts, setClaimedGifts] = useState<Set<string>>(new Set());
  const [loadingGifts, setLoadingGifts] = useState(true);

  // Fetch already-claimed gifts on mount
  useEffect(() => {
    const fetchClaimedGifts = async () => {
      try {
        const { data, error } = await supabase
          .from("rsvps")
          .select("gift")
          .not("gift", "is", null)
          .neq("gift", "money");

        if (error) throw error;

        const claimed = new Set<string>(
          (data || []).map((r: { gift: string }) => r.gift).filter(Boolean)
        );
        setClaimedGifts(claimed);
      } catch (err) {
        console.error("Failed to fetch claimed gifts:", err);
      } finally {
        setLoadingGifts(false);
      }
    };

    fetchClaimedGifts();
  }, []);

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!form.name.trim()) newErrors.name = "Full name is required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "A valid email is required";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitting(true);

    try {
      const { error } = await supabase.from("rsvps").insert([
        {
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          phone: form.phone.trim(),
          gift: form.gift,
          message: form.message.trim(),
        },
      ]);

      if (error) throw error;
      navigate("/success");
    } catch (err: unknown) {
      console.error("RSVP submission error:", err);
      setSubmitError("Something went wrong submitting your RSVP. Please try again.");
      setSubmitting(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(MONEY_GIFT_DETAILS.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const inputBase = (fieldName: string) =>
    `w-full px-4 py-3.5 rounded-xl font-['DM_Sans'] text-sm text-[#2D2D2D] bg-[#FAF6F0] outline-none transition-all duration-300 placeholder-[#2D2D2D]/35 ${
      focused === fieldName
        ? "shadow-[0_0_0_2.5px_#D4AF6A] border-transparent"
        : "border border-[#9CAF88]/40 hover:border-[#9CAF88]/70"
    } ${errors[fieldName as keyof typeof errors] ? "border-red-300 bg-red-50/30" : ""}`;

  const fields = [
    { name: "name", label: "Full Name", type: "text", placeholder: "Your full name" },
    { name: "email", label: "Email Address", type: "email", placeholder: "your@email.com" },
    { name: "phone", label: "Phone Number", type: "tel", placeholder: "+234 800 000 0000" },
  ];

  const isMoneySelected = form.gift === "money";

  return (
    <section id="rsvp" className="relative py-24 px-6 bg-[#9CAF88]/12">
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#9CAF88]/20 via-[#D4AF6A]/30 to-[#9CAF88]/20" />

      <div className="text-center mb-12">
        <p className="font-['Great_Vibes'] text-3xl text-[#9CAF88] mb-2">Will you be there?</p>
        <h2 className="font-['Cormorant_Garamond'] text-4xl md:text-5xl text-[#2D2D2D] tracking-wide font-light">
          RSVP
        </h2>
        <p className="font-['DM_Sans'] text-sm text-[#2D2D2D]/60 mt-3 tracking-wide">
          Kindly respond by May 1st, 2026
        </p>
      </div>

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="max-w-lg mx-auto bg-[#FAF6F0] rounded-2xl shadow-xl p-8 md:p-10"
        style={{ border: "1.5px solid #D4AF6A33" }}
      >
        <form onSubmit={handleSubmit} noValidate>
          <div className="space-y-5">

            {/* Name / Email / Phone */}
            {fields.map((field, i) => (
              <motion.div
                key={field.name}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.1, ease: "easeOut" }}
              >
                <label className="block font-['DM_Sans'] text-xs tracking-widest uppercase text-[#2D2D2D]/60 mb-2">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  value={form[field.name as keyof RSVPFormData] as string}
                  onChange={(e) => {
                    setForm({ ...form, [field.name]: e.target.value });
                    if (errors[field.name as keyof typeof errors])
                      setErrors({ ...errors, [field.name]: undefined });
                  }}
                  onFocus={() => setFocused(field.name)}
                  onBlur={() => setFocused(null)}
                  className={inputBase(field.name)}
                />
                {errors[field.name as keyof typeof errors] && (
                  <p className="mt-1 text-xs text-red-500 font-['DM_Sans']">
                    {errors[field.name as keyof typeof errors]}
                  </p>
                )}
              </motion.div>
            ))}

            {/* Gift Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
            >
              <label className="block font-['DM_Sans'] text-xs tracking-widest uppercase text-[#2D2D2D]/60 mb-1">
                Gift Reservation{" "}
                <span className="normal-case tracking-normal text-[#2D2D2D]/40">(optional)</span>
              </label>
              <p className="font-['DM_Sans'] text-xs text-[#2D2D2D]/45 mb-3">
                Reserve a gift for the couple. Greyed out items have already been claimed.
              </p>

              {loadingGifts ? (
                <div className="space-y-2">
                  {GIFT_OPTIONS.map((g) => (
                    <div key={g.id} className="h-12 rounded-xl bg-[#9CAF88]/10 animate-pulse" />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-2">
                  {GIFT_OPTIONS.map((gift) => {
                    const isClaimed = gift.preReserved || (gift.id !== "money" && claimedGifts.has(gift.id));
                    const isSelected = form.gift === gift.id;

                    return (
                      <button
                        key={gift.id}
                        type="button"
                        disabled={isClaimed}
                        onClick={() => !isClaimed && setForm({ ...form, gift: isSelected ? null : gift.id })}
                        className={`relative flex items-center gap-3 w-full px-4 py-3 rounded-xl text-left transition-all duration-200
                          ${isClaimed
                            ? "bg-[#e8e8e8] border border-[#d0d0d0] cursor-not-allowed opacity-60"
                            : isSelected
                              ? "bg-[#C9A84C]/10 border-[1.5px] border-[#C9A84C] shadow-sm cursor-pointer"
                              : "bg-white border border-[#9CAF88]/30 hover:border-[#9CAF88]/60 hover:bg-[#9CAF88]/5 cursor-pointer"
                          }`}
                      >
                        {/* Checkbox / lock indicator */}
                        <span className={`flex-shrink-0 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all duration-200
                          ${isClaimed
                            ? "border-[#aaa] bg-[#ccc]"
                            : isSelected
                              ? "border-[#C9A84C] bg-[#C9A84C]"
                              : "border-[#9CAF88]/50"
                          }`}
                        >
                          {isClaimed ? (
                            /* Lock icon */
                            <svg width="7" height="8" viewBox="0 0 7 8" fill="none">
                              <rect x="1" y="3.5" width="5" height="4" rx="0.8" fill="white"/>
                              <path d="M2 3.5V2.5a1.5 1.5 0 013 0v1" stroke="white" strokeWidth="1" fill="none"/>
                            </svg>
                          ) : isSelected ? (
                            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                              <path d="M1.5 4L3 5.5L6.5 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          ) : null}
                        </span>

                        <span className={`font-['DM_Sans'] text-sm transition-colors duration-200
                          ${isClaimed
                            ? "text-[#aaa] line-through"
                            : isSelected
                              ? "text-[#C9A84C] font-medium"
                              : "text-[#2D2D2D]/75"
                          }`}
                        >
                          {gift.label}
                        </span>

                        {/* Right-side badges */}
                        <span className="ml-auto flex-shrink-0">
                          {isClaimed ? (
                            <span className="font-['DM_Sans'] text-[10px] tracking-widest uppercase text-[#aaa] bg-[#ddd] px-2 py-0.5 rounded-full">
                              Taken
                            </span>
                          ) : gift.id === "money" ? (
                            <span className="font-['DM_Sans'] text-[10px] tracking-widest uppercase text-[#9CAF88] bg-[#9CAF88]/10 px-2 py-0.5 rounded-full">
                              Bank Transfer
                            </span>
                          ) : null}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Money gift details panel */}
              <AnimatePresence>
                {isMoneySelected && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: "auto", marginTop: 12 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="rounded-xl p-4" style={{ background: "#D4AF6A0F", border: "1.5px solid #D4AF6A40" }}>
                      <p className="font-['DM_Sans'] text-xs tracking-widest uppercase text-[#C9A84C] mb-3">
                        Bank Transfer Details
                      </p>
                      <div className="space-y-1.5">
                        <div className="flex justify-between">
                          <span className="font-['DM_Sans'] text-xs text-[#2D2D2D]/55">Bank</span>
                          <span className="font-['DM_Sans'] text-xs text-[#2D2D2D] font-medium">{MONEY_GIFT_DETAILS.bank}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-['DM_Sans'] text-xs text-[#2D2D2D]/55">Account Name</span>
                          <span className="font-['DM_Sans'] text-xs text-[#2D2D2D] font-medium">{MONEY_GIFT_DETAILS.accountName}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-['DM_Sans'] text-xs text-[#2D2D2D]/55">Account Number</span>
                          <div className="flex items-center gap-2">
                            <span className="font-['DM_Sans'] text-xs text-[#2D2D2D] font-medium tracking-wider">
                              {MONEY_GIFT_DETAILS.accountNumber}
                            </span>
                            <button
                              type="button"
                              onClick={handleCopy}
                              className="text-[#C9A84C] hover:text-[#D4AF6A] transition-colors"
                              title="Copy account number"
                            >
                              {copied ? (
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="20 6 9 17 4 12" />
                                </svg>
                              ) : (
                                <CopyIcon />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.55, ease: "easeOut" }}
            >
              <label className="block font-['DM_Sans'] text-xs tracking-widest uppercase text-[#2D2D2D]/60 mb-2">
                Message to the couple{" "}
                <span className="normal-case tracking-normal text-[#2D2D2D]/40">(optional)</span>
              </label>
              <textarea
                placeholder="Share your wishes or a note for the couple…"
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                onFocus={() => setFocused("message")}
                onBlur={() => setFocused(null)}
                className={`${inputBase("message")} resize-none`}
              />
            </motion.div>

            {submitError && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-red-500 font-['DM_Sans'] text-center"
              >
                {submitError}
              </motion.p>
            )}

            {/* Submit */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.65, ease: "easeOut" }}
            >
              <motion.button
                type="submit"
                disabled={submitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative w-full py-4 bg-[#C9A84C] text-white font-['DM_Sans'] text-sm tracking-[0.25em] uppercase rounded-xl shadow-md hover:bg-[#D4AF6A] transition-colors duration-300 overflow-hidden group disabled:opacity-70"
              >
                <span className="relative z-10">
                  {submitting ? "Sending…" : "Send My RSVP"}
                </span>
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
              </motion.button>
            </motion.div>

          </div>
        </form>
      </motion.div>
    </section>
  );
}
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const GIFT_OPTIONS = [
  { id: "washing_machine", label: "8kg Washing Machine" },
  { id: "gas_cooker", label: "Gas Cooker with Oven" },
  { id: "refrigerator", label: "Refrigerator" },
  { id: "ac", label: "1.5 HP Air Conditioner" },
  { id: "sound_system", label: "Sound System" },
  { id: "money", label: "Money Gift" },
] as const;

export type GiftId = typeof GIFT_OPTIONS[number]["id"];

export const MONEY_GIFT_DETAILS = {
  accountNumber: "0263369595",
  bank: "Wema Bank",
  accountName: "Onifeloluwa Adebajo",
};

export type RSVPEntry = {
  id: string;
  name: string;
  email: string;
  phone: string;
  gift: GiftId | null;
  message: string;
  created_at: string;
};
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
  { id: "washing_machine",  label: "8kg Front Loader Washing Machine",           preReserved: false },
  { id: "gas_cooker",       label: "4-Burner Gas Cooker with Oven",               preReserved: false },
  { id: "refrigerator",     label: "200L Double Door Refrigerator",               preReserved: false },
  { id: "ac",               label: "1.5 HP Hisense Inverter AC",                  preReserved: false },
  { id: "soundbar",         label: "Hisense Soundbar with Subwoofer",             preReserved: false },
  { id: "blender",          label: "Silver Crest SC-1589 Multifunction Blender",  preReserved: false },
  { id: "tv",               label: "50 Inches LG Smart TV",                       preReserved: true  },
  { id: "deep_freezer",     label: "250L Haier Thermocool Deep Freezer",          preReserved: true  },
  { id: "airfryer",         label: "Airfryer",                                    preReserved: true  },
  { id: "money",            label: "Cash Gift",                                   preReserved: false },
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
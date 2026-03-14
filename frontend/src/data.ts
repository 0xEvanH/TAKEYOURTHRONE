import { GOLD } from "./constants";

export type PageName = "home" | "teams" | "news" | "shop" | "partners" | "org";

export interface Player {
  num: string;
  handle: string;
  nat: string;
  since: string;
  role?: string;
  earnings?: string;
  pr?: number;
}

export interface DivisionStat {
  label: string;
  value: string;
  highlight?: boolean;
}

export interface Division {
  id: string;
  name: string;
  shortName: string;
  titles?: number;
  rank?: string;
  wins?: number;
  color: string;
  players: Player[];
  stats: DivisionStat[];
}

export interface StaffMember {
  id: number;
  name: string;
  role: string;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  img: string;
  badge: string | null;
  colors: string[];
}

export interface Partner {
  name: string;
  desc: string;
  since: string;
  logo: string;
}

export interface PartnerTier {
  tier: string;
  color: string;
  partners: Partner[];
}

export interface NavItem {
  key: string;
  label: string;
  page: PageName;
}

export interface SocialPost {
  url: string | undefined;
  id: number;
  platform: "x";
  handle: string;
  date: string;
  content: string;
  likes: string;
  comments: string;
  shares: string;
  views?: string;
  img?: string;
  videoThumb?: string;
  tag?: string;
  pinned?: boolean;
}

export const DIVISIONS: Division[] = [
  {
    id: "fortnite",
    name: "FORTNITE",
    shortName: "FN",
    titles: 1,
    rank: "39th",
    wins: 16,
    color: "#00d4ff",
    stats: [
      { label: "NAC RANK", value: "39th" },
      { label: "TITLES", value: "1" },
      { label: "TOURNAMENT WINS", value: "16 W" },
      { label: "ROSTER SIZE", value: "3 Players" },
      { label: "STATUS", value: "ACTIVE", highlight: true },
    ],
    players: [
      { num: "01", handle: "tinytawn", nat: "NA", earnings: "$1,400", pr: 21, since: "2025" },
      { num: "02", handle: "Qkay", nat: "MX", earnings: "$2,275", pr: 20, since: "2026" },
      { num: "03", handle: "rxlphy", nat: "NA", earnings: "$2,500", pr: 15, since: "2026" },
    ],
  },
  {
    id: "siege",
    name: "SIEGE",
    shortName: "SG",
    color: "#ff6b00",
    stats: [
      { label: "ROSTER SIZE", value: "5 Players" },
      { label: "STATUS", value: "ACTIVE", highlight: true },
    ],
    players: [
      { num: "01", handle: "Ziggy", role: "Player", nat: "NA", since: "2026" },
      { num: "02", handle: "grug", role: "Player", nat: "NA", since: "2026" },
      { num: "03", handle: "Pexrcs", role: "Player", nat: "NA", since: "2026" },
      { num: "04", handle: "Zonked", role: "Player", nat: "NA", since: "2026" },
      { num: "05", handle: "Danny", role: "Player", nat: "NA", since: "2026" },
      { num: "06", handle: "Thekidrambo", role: "Coach", nat: "NA", since: "2026" },
    ],
  },
];

export const STAFF: StaffMember[] = [
  { id: 1, name: "KRONOS", role: "Founder" },
  { id: 2, name: "Shortcake", role: "Owner" },
  { id: 3, name: "Kaden", role: "Future Team Owner" },
  { id: 4, name: "Cellar", role: "Future Team Owner" },
  { id: 5, name: "Zyko", role: "Chief of Staff" },
  { id: 6, name: "Blxst", role: "Recruiters/Management" },
  { id: 7, name: "Cruz", role: "Recruiters/Management" },
  { id: 8, name: "Flixy", role: "Recruiters/Management" },
  { id: 9, name: "Rodri", role: "Recruiters/Management" },
  { id: 10, name: "Jared6k", role: "Recruiters/Management" },
];

export const SHOP_PRODUCTS: Product[] = [];

export const PARTNER_TIERS: PartnerTier[] = [
  {
    tier: "TITLE PARTNER",
    color: GOLD,
    partners: [
      { name: "LATENNCY TWEAKS", desc: "Official tweaking partner. Powering every clutch moment.", since: "2026", logo: "LT" },
    ],
  },
];

export const SOCIAL_POSTS: SocialPost[] = [];

export const NAV_ITEMS: NavItem[] = [
  { key: "H", label: "HOME", page: "home" },
  { key: "T", label: "TEAMS", page: "teams" },
  { key: "N", label: "NEWS", page: "news" },
  { key: "O", label: "ORG", page: "org" },
  { key: "S", label: "SHOP", page: "shop" },
  { key: "P", label: "PARTNERS", page: "partners" },
];
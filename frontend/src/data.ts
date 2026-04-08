import { GOLD } from "./constants";

export type PageName = "home" | "teams" | "news" | "shop" | "partners" | "org" | "privacy" | "terms";

import kronos from "/pfps/kronos.jpg";
import shortcake from "/pfps/shortcake.jpg";
import zyko from "/pfps/zyko.jpg";
import pxr from "/pfps/pxr.png";
import cellar from "/pfps/cellar.jpg";
import kaden from "/pfps/kaden.jpg";
import blxst from "/pfps/blxst.jpg";
import cruz from "/pfps/cruz.jpg";

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
  icon: any;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  img: string;
  badge: string | null;
  url: string;
}

export interface Partner {
  name: string;
  desc: string;
  since: string;
  logo: string;
  url: string;
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
  { id: 1, name: "KRONOS", role: "Founder", icon: kronos },
  { id: 2, name: "Shortcake", role: "Owner", icon: shortcake },
  { id: 3, name: "Zyko", role: "Owner", icon: zyko },
  { id: 4, name: "Pxr", role: "Board of Directors", icon: pxr },
  { id: 5, name: "Cellar", role: "Future Team Owner", icon: cellar },
  { id: 6, name: "Kaden", role: "Future Team Owner", icon: kaden },
  { id: 7, name: "Blxst", role: "Recruiters/Management", icon: blxst },
  { id: 8, name: "Cruz", role: "Recruiters/Management", icon: cruz },
  { id: 9, name: "Flixy", role: "Recruiters/Management", icon: null },
  { id: 10, name: "Rodri", role: "Recruiters/Management", icon: null },
  { id: 11, name: "Jared6k", role: "Recruiters/Management", icon: null },
];

export const SHOP_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Take Your Throne 2026 Jersey",
    category: "JERSEYS",
    price: "$55.00",
    img: "/tytjersey.png",
    badge: "Best Seller",
    url: "https://tytapparel.store/products/take-your-throne-2026-jersey?variant=48643830710501",
  },
  {
    id: 2,
    name: "Throne Tee",
    category: "APPAREL",
    price: "$40.00",
    img: "/thronetee.png",
    badge: "",
    url: "https://tytapparel.store/products/throne-tee?variant=48643863412965",
  },
  {
    id: 3,
    name: "Send Tee",
    category: "APPAREL",
    price: "$35.00",
    img: "/sendtee.png",
    badge: "",
    url: "https://tytapparel.store/products/send-tee?variant=48643848012005",
  },
];

export const PARTNER_TIERS: PartnerTier[] = [
  {
    tier: "TITLE PARTNER",
    color: GOLD,
    partners: [
      { name: "PARAGON TWEAKS", desc: "Official tweaking partner. Powering every clutch moment.", since: "2026", logo: "PT", url: "https://paragontweaks.net/utilities?ref=TYT26" },
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
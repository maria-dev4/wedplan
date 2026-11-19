import {
  CalendarCheck,
  CirclePlus,
  ClipboardCheck,
  CreditCard,
  Crown,
  Inbox,
  LayoutDashboard,
  Package,
  Settings,
  Users,
  type LucideIcon,
} from "lucide-react";

export type NavItem = { href: string; label: string; icon: LucideIcon };

const overview: NavItem = { href: "/dashboard", label: "Overview", icon: LayoutDashboard };
const profile: NavItem = { href: "/dashboard/profile", label: "Profile Settings", icon: Settings };

export const navByRole: Record<string, NavItem[]> = {
  vendor: [
    overview,
    { href: "/dashboard/my-services", label: "My Services", icon: Package },
    { href: "/dashboard/add-service", label: "Add Service", icon: CirclePlus },
    { href: "/dashboard/booking-requests", label: "Booking Requests", icon: Inbox },
    { href: "/dashboard/subscription", label: "Subscription", icon: Crown },
    profile,
  ],
  customer: [
    overview,
    { href: "/dashboard/my-bookings", label: "My Bookings", icon: CalendarCheck },
    profile,
  ],
  admin: [
    overview,
    { href: "/dashboard/manage-users", label: "Manage Users", icon: Users },
    { href: "/dashboard/manage-services", label: "Manage Services", icon: ClipboardCheck },
    { href: "/dashboard/transactions", label: "Transactions", icon: CreditCard },
  ],
};
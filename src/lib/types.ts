export type Service = {
  _id: string;
  serviceName: string;
  category: string;
  description: string;
  price: number;
  location: string;
  images: string[];
  status: string;
  isActive: boolean;
  vendorId: string;
  vendorName: string;
  vendorEmail: string;
  vendorImage?: string;
  vendorPremium?: boolean;
  createdAt: string;
};

export type Booking = {
  _id: string;
  serviceId: string;
  vendorId: string;
  customerId: string;
  eventDate: string;
  eventLocation: string;
  message: string;
  status: "pending" | "accepted" | "rejected" | "cancelled";
  createdAt: string;
  service: {
    _id: string;
    serviceName: string;
    category: string;
    price: number;
    location: string;
    image: string;
  } | null;
  customer: { name: string; email: string; image?: string } | null;
  vendor: { name: string; email: string; image?: string } | null;
};
export type AdminUser = {
  _id: string;
  name: string;
  email: string;
  image?: string;
  role: "admin" | "vendor" | "customer";
  isBlocked?: boolean;
  businessName?: string;
  subscriptionPlan?: string;
  subscriptionExpiresAt?: string | null;
  createdAt: string;
};

export type Transaction = {
  _id: string;
  vendorId: string;
  plan: string;
  amount: number;
  currency: string;
  stripeSessionId: string;
  stripeSubscriptionId: string | null;
  status: string;
  createdAt: string;
  vendor: { name: string; email: string; image?: string } | null;
};


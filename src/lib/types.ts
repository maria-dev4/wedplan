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
  createdAt: string;
};
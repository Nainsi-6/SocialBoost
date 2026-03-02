export interface Package {
  id: string;
  quantity: number;
  quantityLabel: string;
  price: number;
  description: string;
  deliveryTime: string;
  quality: string;
}

export interface Service {
  id: string;
  name: string;
  slug: string;
  icon: string;
  isOfferActive?: boolean;
  description: string;
  isPrimary: boolean;
  bgGradient: string;
  packages: Package[];
}

export interface Order {
  orderId: string;
  serviceId: string;
  serviceName: string;
  packageId: string;
  packageLabel: string;
  quantity: number;
  price: number;
  instagramProfile?: string;
  status: 'pending' | 'processing' | 'completed';
  timestamp: number;
  date: string;
}

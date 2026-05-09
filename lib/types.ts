export interface Provider {
  id: string;
  name: string;
  businessName: string;
  email: string;
  phone: string;
  serviceCategory: string;
  bookingUrl: string;
}

export interface Job {
  id: string;
  clientName: string;
  email: string;
  phone: string;
  serviceType: string;
  eventDate: string;
  location: string;
  packageName: string;
  packagePrice: number;
  depositAmount: number;
  depositPaid: boolean;
  balanceAmount: number;
  balancePaid: boolean;
  contractSigned: boolean;
  status: "pending" | "in-progress" | "completed" | "cancelled";
  completedDate?: string;
}

export interface Package {
  id: string;
  name: string;
  serviceType: string;
  description: string;
  price: number;
  depositPercentage: number;
  inclusions: string[];
  contractId?: string;
}

export interface Contract {
  id: string;
  title: string;
  description: string;
  content: string;
  fields: {
    full_name: string;
    signature: string;
  };
}

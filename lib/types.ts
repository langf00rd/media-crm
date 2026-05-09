export interface Organization {
  id: string;
  name: string;
  logo: string | null;
  category: string;
  phone: string | null;
  email: string | null;
  slug: string;
  created_dt: string;
  updated_dt: string;
}

export interface Request {
  id: string;
  first_name: string;
  last_name: string;
  signature: string;
  package_id: string;
  organization_id: string;
  terms_accepted: boolean;
  status: string;
  completed_dt: string;
  created_dt: string;
  updated_dt: string;
}

export interface Package {
  id: string;
  name: string;
  description: string;
  price: number;
  deposit_percentage: number;
  features: string[];
  contract_id?: string;
  created_dt: string;
  updated_dt: string;
}

export interface Contract {
  id: string;
  title: string;
  description: string;
  content: string;
  created_dt: string;
  updated_dt: string;
  fields: Record<string, string>;
}

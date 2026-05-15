export interface Organization {
  id: string;
  name: string;
  logo: string | null;
  cover_photo: string | null;
  category: string;
  phone: string | null;
  email: string | null;
  slug: string;
  created_dt: string;
  updated_dt: string;
}

export interface RequestWithPackage extends Request {
  packages: Package;
}

export interface Request {
  id: string;
  first_name: string;
  last_name: string;
  package_id: string;
  organization_id: string;
  terms_accepted: boolean;
  status: string;
  completed_dt: string;
  created_dt: string;
  updated_dt: string;
  contract_data: Record<string, string>;
}

export interface Package {
  id: string;
  name: string;
  description: string;
  price: number;
  deposit_percentage: number;
  features: string[];
  contract_id?: string;
  contract_fields?: Record<string, string>;
  currency: string;
  status: string;
  created_dt: string;
  updated_dt: string;
}

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
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
  fields: {
    internal: string[];
    external: string[];
  };
}

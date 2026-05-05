export interface Provider {
  id: string
  name: string
  businessName: string
  email: string
  phone: string
  serviceCategory: string
  bookingUrl: string
}

export interface Job {
  id: string
  clientName: string
  email: string
  phone: string
  serviceType: string
  eventDate: string
  location: string
  packageName: string
  packagePrice: number
  depositAmount: number
  depositPaid: boolean
  balanceAmount: number
  balancePaid: boolean
  contractSigned: boolean
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled'
  completedDate?: string
}

export interface Package {
  id: string
  name: string
  serviceType: string
  description: string
  price: number
  depositPercentage: number
  inclusions: string[]
}

export interface Contract {
  id: string
  clientName: string
  eventDate: string
  eventLocation: string
  serviceType: string
  totalPrice: number
  depositAmount: number
  status: 'draft' | 'pending-signature' | 'signed' | 'cancelled'
  content: {
    provider: string
    client: string
    services: string
    investment: {
      total: number
      deposit: number
      balanceDueDate: string
    }
    terms: string
  }
}

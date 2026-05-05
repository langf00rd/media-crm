import type { Contract, Job, Package, Provider } from "./types";

export type { Contract, Job, Package, Provider };

export const mockProvider: Provider = {
  id: "sarah-captures",
  name: "Sarah Mensah",
  businessName: "Sarah Captures",
  email: "sarah@captures.com",
  phone: "+233541234567",
  serviceCategory: "Photography",
  bookingUrl: "app.com/book/sarah-captures",
};

export const mockJobs: Job[] = [
  {
    id: "job-001",
    clientName: "Ama Owusu",
    email: "ama@email.com",
    phone: "+233542222222",
    serviceType: "Wedding Photography",
    eventDate: "June 15, 2024",
    location: "Accra, Ghana",
    packageName: "Premium Wedding",
    packagePrice: 2500,
    depositAmount: 625,
    depositPaid: true,
    balanceAmount: 1875,
    balancePaid: false,
    contractSigned: true,
    status: "in-progress",
  },
  {
    id: "job-002",
    clientName: "Kwame Asante",
    email: "kwame@email.com",
    phone: "+233543333333",
    serviceType: "Corporate Event",
    eventDate: "May 20, 2024",
    location: "Kumasi, Ghana",
    packageName: "Standard Corporate",
    packagePrice: 1200,
    depositAmount: 300,
    depositPaid: true,
    balanceAmount: 900,
    balancePaid: true,
    contractSigned: true,
    status: "completed",
    completedDate: "May 21, 2024",
  },
  {
    id: "job-003",
    clientName: "Abena Boateng",
    email: "abena@email.com",
    phone: "+233544444444",
    serviceType: "Engagement Session",
    eventDate: "June 8, 2024",
    location: "Accra, Ghana",
    packageName: "Engagement Package",
    packagePrice: 800,
    depositAmount: 200,
    depositPaid: false,
    balanceAmount: 600,
    balancePaid: false,
    contractSigned: false,
    status: "pending",
  },
  {
    id: "job-004",
    clientName: "Kofi Mensah",
    email: "kofi@email.com",
    phone: "+233545555555",
    serviceType: "Product Photography",
    eventDate: "May 10, 2024",
    location: "Tema, Ghana",
    packageName: "Standard Product",
    packagePrice: 400,
    depositAmount: 100,
    depositPaid: true,
    balanceAmount: 300,
    balancePaid: true,
    contractSigned: true,
    status: "cancelled",
  },
];

export const mockPackages: Package[] = [
  {
    id: "pkg-001",
    name: "Premium Wedding",
    serviceType: "Wedding Photography",
    description: "Full-day coverage with album and prints",
    price: 2500,
    depositPercentage: 25,
    inclusions: [
      "8 hours coverage",
      "500+ photos",
      "Digital album",
      "Print package",
    ],
  },
  {
    id: "pkg-002",
    name: "Standard Corporate",
    serviceType: "Corporate Event",
    description: "Half-day event coverage",
    price: 1200,
    depositPercentage: 25,
    inclusions: ["4 hours coverage", "200+ photos", "Digital delivery"],
  },
];

export const mockContracts: Contract[] = [
  {
    id: "service_agreement",
    title: "Service Agreement",
    description:
      "A standard agreement outlining the scope of services, deliverables, timelines, and payment terms between a service provider and client.",
    excerpt:
      "Defines services, timelines, fees, and responsibilities of both parties.",
    content: `
  # Service Agreement

  This Service Agreement ("Agreement") is entered into by and between the **Service Provider** and the **Client**.

  ## 1. Scope of Services
  The Service Provider agrees to perform the services outlined in an attached statement of work or as otherwise agreed in writing.

  ## 2. Payment Terms
  The Client agrees to pay all fees as specified. Late payments may incur penalties.

  ## 3. Timeline
  Services will commence and conclude as agreed by both parties.

  ## 4. Responsibilities
  Both parties agree to act in good faith and fulfill their respective obligations.

  ## 5. Termination
  Either party may terminate this Agreement with written notice.

  ---

  **Client Name:** {{full_name}}
  **Signature:** {{signature}}
  `,
    fields: {
      full_name: "",
      signature: "",
    },
  },
  {
    id: "retainer_agreement",
    title: "Retainer Agreement",
    description:
      "An ongoing contract where the client pays a recurring fee for continuous access to services over a defined period.",
    excerpt: "Covers ongoing services billed on a recurring basis.",
    content: `
  # Retainer Agreement

  This Retainer Agreement ("Agreement") establishes an ongoing relationship between the **Service Provider** and the **Client**.

  ## 1. Retainer Fee
  The Client agrees to pay a recurring fee for continued access to services.

  ## 2. Scope
  Services covered under this Agreement will be defined and may evolve over time.

  ## 3. Availability
  The Service Provider agrees to allocate a specified amount of time or resources.

  ## 4. Term
  This Agreement remains in effect until terminated by either party.

  ## 5. Termination
  Either party may terminate with prior written notice.

  ---

  **Client Name:** {{full_name}}
  **Signature:** {{signature}}
  `,
    fields: {
      full_name: "",
      signature: "",
    },
  },
  {
    id: "nda",
    title: "Non-Disclosure Agreement (NDA)",
    description:
      "A legal contract that ensures confidentiality of sensitive information shared between the service provider and client.",
    excerpt: "Protects confidential information from being disclosed.",
    content: `
  # Non-Disclosure Agreement (NDA)

  This Non-Disclosure Agreement ("Agreement") is made between the **Disclosing Party** and the **Receiving Party**.

  ## 1. Confidential Information
  All non-public information shared is considered confidential.

  ## 2. Obligations
  The receiving party agrees not to disclose or misuse the confidential information.

  ## 3. Exclusions
  Information already public or independently developed is excluded.

  ## 4. Term
  This Agreement remains effective for a specified period.

  ## 5. Remedies
  Breach of this Agreement may result in legal action.

  ---

  **Client Name:** {{full_name}}
  **Signature:** {{signature}}
  `,
    fields: {
      full_name: "",
      signature: "",
    },
  },
  {
    id: "independent_contractor",
    title: "Independent Contractor Agreement",
    description:
      "Defines the relationship between a business and a contractor, clarifying that the contractor is not an employee and outlining obligations and payment terms.",
    excerpt:
      "Establishes terms for working with non-employee service providers.",
    content: `
  # Independent Contractor Agreement

  This Independent Contractor Agreement ("Agreement") is between the **Company** and the **Contractor**.

  ## 1. Relationship
  The Contractor is an independent entity and not an employee.

  ## 2. Services
  The Contractor agrees to perform services as outlined.

  ## 3. Compensation
  Payment will be made as agreed upon completion or milestones.

  ## 4. Taxes
  The Contractor is responsible for all applicable taxes.

  ## 5. Termination
  Either party may terminate this Agreement with notice.

  ---

  **Client Name:** {{full_name}}
  **Signature:** {{signature}}
  `,
    fields: {
      full_name: "",
      signature: "",
    },
  },
];

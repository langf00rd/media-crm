import type { Contract, Organization, Package, Request } from "./types";

export type { Contract, Organization, Package, Request };

export const mockOrganization: Organization = {
  id: "1",
  name: "Sarah Captures",
  logo: null,
  category: "Photography",
  phone: "+233541234567",
  email: "sarah@captures.com",
  slug: "sarah-captures",
  created_dt: "2024-01-01T00:00:00Z",
  updated_dt: "2024-01-01T00:00:00Z",
};

export const mockPackages: Package[] = [
  {
    id: "pkg-001",
    name: "Premium Wedding",
    description: "Full-day coverage with album and prints",
    price: 2500,
    deposit_percentage: 25,
    features: [
      "8 hours coverage",
      "500+ photos",
      "Digital album",
      "Print package",
    ],
    currency: "GHS",
    contract_id: "contract-001",
    created_dt: "2024-01-01T00:00:00Z",
    updated_dt: "2024-01-01T00:00:00Z",
  },
  {
    id: "pkg-002",
    name: "Standard Corporate",
    description: "Half-day event coverage",
    price: 1200,
    deposit_percentage: 25,
    features: ["4 hours coverage", "200+ photos", "Digital delivery"],
    currency: "GHS",
    contract_id: "contract-002",
    created_dt: "2024-01-01T00:00:00Z",
    updated_dt: "2024-01-01T00:00:00Z",
  },
  {
    id: "pkg-003",
    name: "Engagement Package",
    description: "A beautiful engagement shoot",
    price: 800,
    deposit_percentage: 25,
    features: ["2 hours coverage", "100+ photos", "Online gallery"],
    currency: "GHS",
    created_dt: "2024-01-01T00:00:00Z",
    updated_dt: "2024-01-01T00:00:00Z",
  },
  {
    id: "pkg-004",
    name: "Standard Product",
    description: "Product photography for small businesses",
    price: 400,
    deposit_percentage: 25,
    features: ["1 hour coverage", "20 edited photos", "Usage rights"],
    currency: "GHS",
    created_dt: "2024-01-01T00:00:00Z",
    updated_dt: "2024-01-01T00:00:00Z",
  },
];

export const mockContracts: Contract[] = [
  {
    id: "contract-001",
    title: "Service Agreement",
    description:
      "A comprehensive agreement defining scope, deliverables, timelines, and payment obligations.",
    content: `
# Service Agreement

This Service Agreement ("Agreement") is entered into by and between the **Service Provider** and the **Client**.

## 1. Scope of Services
The Service Provider agrees to deliver services as defined in an attached scope of work (SOW).

## 2. Deliverables
Deliverables, formats, and acceptance criteria shall be agreed upon before work begins.

## 3. Payment Terms
- Fees shall be agreed in **GHS, NGN, USD, or other mutually agreed currency**.
- A deposit of **30%–70%** may be required before work begins.
- Final payment is due upon delivery or milestone completion.

## 4. Client Responsibilities
The Client agrees to provide accurate requirements and timely feedback.

## 5. Timeline
Project timelines depend on Client responsiveness.

## 6. Revisions & Scope Creep
A limited number of revisions may be included.

## 7. Termination
Either party may terminate this Agreement with written notice.

## 8. Liability
The Service Provider shall not be liable for indirect or consequential damages.

## 9. Dispute Resolution
Disputes shall first be resolved through negotiation.

---

**Client First Name:** {{first_name}}
**Client Last Name:** {{last_name}}
**Signature:** {{signature}}
`,
    fields: {
      last_name: "string",
      first_name: "string",
      signature: "string",
    },
    created_dt: "2024-01-01T00:00:00Z",
    updated_dt: "2024-01-01T00:00:00Z",
  },
  {
    id: "contract-002",
    title: "Independent Contractor Agreement",
    description:
      "Defines the relationship between a business and a contractor, clarifying non-employment status.",
    content: `
# Independent Contractor Agreement

This Agreement is entered into between the **Company** and the **Contractor**.

## 1. Relationship
The Contractor is an independent entity and not an employee.

## 2. Services
The Contractor agrees to perform services as outlined in a separate scope.

## 3. Compensation
- Payment may be fixed, hourly, or milestone-based.

## 4. Taxes & Compliance
The Contractor is solely responsible for personal income taxes.

## 5. Tools & Equipment
The Contractor shall provide their own tools and equipment.

## 6. Confidentiality
The Contractor agrees to maintain confidentiality of all Company information.

## 7. Termination
Either party may terminate with notice.

## 8. Liability
The Contractor assumes responsibility for the quality of their work.

## 9. Dispute Resolution
Disputes shall be resolved through negotiation, mediation, or arbitration.

---

**Client First Name:** {{first_name}}
**Client Last Name:** {{last_name}}
**Signature:** {{signature}}
`,
    fields: {
      last_name: "string",
      first_name: "string",
      signature: "string",
    },
    created_dt: "2024-01-01T00:00:00Z",
    updated_dt: "2024-01-01T00:00:00Z",
  },
  {
    id: "contract-003",
    title: "Retainer Agreement",
    description:
      "An ongoing service agreement with recurring payments for continued access to services.",
    content: `
# Retainer Agreement

This Retainer Agreement establishes an ongoing working relationship between the **Service Provider** and the **Client**.

## 1. Retainer Fee
The Client agrees to pay a recurring fee for access to services.

## 2. Scope of Work
The retainer covers a predefined scope or number of service hours.

## 3. Priority Access
Retainer clients receive prioritized service delivery.

## 4. Payment Terms
Payments are due in advance of each billing cycle.

---

**Client First Name:** {{first_name}}
**Client Last Name:** {{last_name}}
**Signature:** {{signature}}
`,
    fields: {
      last_name: "string",
      first_name: "string",
      signature: "string",
    },
    created_dt: "2024-01-01T00:00:00Z",
    updated_dt: "2024-01-01T00:00:00Z",
  },
  {
    id: "contract-004",
    title: "Non-Disclosure Agreement (NDA)",
    description:
      "A confidentiality agreement protecting sensitive business information shared between parties.",
    content: `
# Non-Disclosure Agreement (NDA)

This Agreement is made between the **Disclosing Party** and the **Receiving Party**.

## 1. Definition of Confidential Information
Confidential Information includes all non-public, proprietary, or sensitive information.

## 2. Obligations
The Receiving Party agrees to not disclose confidential information to third parties.

## 3. Exclusions
Confidential Information does not include information already in the public domain.

## 4. Duration
This Agreement remains in effect for 2–5 years or as agreed.

## 5. Breach
Any breach may result in legal action.

---

**Client First Name:** {{first_name}}
**Client Last Name:** {{last_name}}
**Signature:** {{signature}}
`,
    fields: {
      last_name: "string",
      first_name: "string",
      signature: "string",
    },
    created_dt: "2024-01-01T00:00:00Z",
    updated_dt: "2024-01-01T00:00:00Z",
  },
];

export const mockRequests: Request[] = [
  {
    id: "req-001",
    first_name: "Ama",
    last_name: "Owusu",
    signature: "",
    package_id: "pkg-001",
    organization_id: "1",
    terms_accepted: true,
    status: "in-progress",
    completed_dt: "",
    created_dt: "2024-05-01T00:00:00Z",
    updated_dt: "2024-05-01T00:00:00Z",
  },
  {
    id: "req-002",
    first_name: "Kwame",
    last_name: "Asante",
    signature: "",
    package_id: "pkg-002",
    organization_id: "1",
    terms_accepted: true,
    status: "completed",
    completed_dt: "2024-05-21T00:00:00Z",
    created_dt: "2024-04-15T00:00:00Z",
    updated_dt: "2024-05-21T00:00:00Z",
  },
  {
    id: "req-003",
    first_name: "Abena",
    last_name: "Boateng",
    signature: "",
    package_id: "pkg-003",
    organization_id: "1",
    terms_accepted: false,
    status: "pending",
    completed_dt: "",
    created_dt: "2024-06-01T00:00:00Z",
    updated_dt: "2024-06-01T00:00:00Z",
  },
  {
    id: "req-004",
    first_name: "Kofi",
    last_name: "Mensah",
    signature: "",
    package_id: "pkg-004",
    organization_id: "1",
    terms_accepted: true,
    status: "cancelled",
    completed_dt: "",
    created_dt: "2024-04-20T00:00:00Z",
    updated_dt: "2024-05-10T00:00:00Z",
  },
];

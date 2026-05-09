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
    contractId: "service_agreement",
  },
  {
    id: "pkg-002",
    name: "Standard Corporate",
    serviceType: "Corporate Event",
    description: "Half-day event coverage",
    price: 1200,
    depositPercentage: 25,
    inclusions: ["4 hours coverage", "200+ photos", "Digital delivery"],
    contractId: "independent_contractor",
  },
];

export const mockContracts: Contract[] = [
  {
    id: "service_agreement",
    title: "Service Agreement",
    description:
      "A comprehensive agreement defining scope, deliverables, timelines, and payment obligations between a service provider and client.",
    excerpt:
      "Defines services, timelines, fees, and responsibilities of both parties.",
    content: `
# Service Agreement

This Service Agreement ("Agreement") is entered into by and between the **Service Provider** and the **Client**.

## 1. Scope of Services
The Service Provider agrees to deliver services as defined in an attached scope of work (SOW). Any work outside this scope will require written approval and may incur additional charges.

## 2. Deliverables
Deliverables, formats, and acceptance criteria shall be agreed upon before work begins. The Client agrees to review and approve deliverables within a reasonable timeframe.

## 3. Payment Terms
- Fees shall be agreed in **GHS, NGN, USD, or other mutually agreed currency**.
- A deposit of **30%–70%** may be required before work begins.
- Final payment is due upon delivery or milestone completion.
- Late payments beyond **7–14 days** may incur penalties or service suspension.

## 4. Client Responsibilities
The Client agrees to:
- Provide accurate requirements and timely feedback
- Supply necessary materials or access
- Avoid delays that impact delivery timelines

## 5. Timeline
Project timelines depend on Client responsiveness. Delays caused by the Client may extend delivery dates.

## 6. Revisions & Scope Creep
A limited number of revisions may be included. Additional revisions or scope changes will be billed separately.

## 7. Termination
Either party may terminate this Agreement with written notice. Any completed work must be paid for prior to termination.

## 8. Liability
The Service Provider shall not be liable for indirect or consequential damages arising from the use of delivered work.

## 9. Dispute Resolution
Disputes shall first be resolved through negotiation. If unresolved, parties may pursue mediation or arbitration under applicable local laws.

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
      "An ongoing service agreement with recurring payments for continued access to services.",
    excerpt: "Covers ongoing services billed on a recurring basis.",
    content: `
# Retainer Agreement

This Retainer Agreement ("Agreement") establishes an ongoing working relationship between the **Service Provider** and the **Client**.

## 1. Retainer Fee
The Client agrees to pay a recurring fee (monthly or quarterly) for access to services.

## 2. Scope of Work
The retainer covers a predefined scope or number of service hours. Unused hours may not roll over unless agreed otherwise.

## 3. Priority Access
Retainer clients receive prioritized service delivery compared to non-retainer clients.

## 4. Payment Terms
- Payments are due in advance of each billing cycle.
- Failure to pay may result in suspension of services.
- Fees may be adjusted with prior notice.

## 5. Availability
The Service Provider will allocate reasonable time and resources based on the agreed retainer level.

## 6. Term & Renewal
This Agreement renews automatically unless terminated by either party with prior notice (typically 7–30 days).

## 7. Termination
Upon termination, all outstanding balances must be settled immediately.

## 8. Dispute Resolution
Disputes shall be handled through negotiation, mediation, or arbitration under applicable regional laws.

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
      "A confidentiality agreement protecting sensitive business information shared between parties.",
    excerpt: "Protects confidential information from being disclosed.",
    content: `
# Non-Disclosure Agreement (NDA)

This Agreement is made between the **Disclosing Party** and the **Receiving Party**.

## 1. Definition of Confidential Information
Confidential Information includes all non-public, proprietary, or sensitive information shared in any form.

## 2. Obligations
The Receiving Party agrees to:
- Not disclose confidential information to third parties
- Use the information solely for the intended purpose
- Take reasonable steps to protect the information

## 3. Exclusions
Confidential Information does not include:
- Information already in the public domain
- Information independently developed without access
- Information disclosed with prior consent

## 4. Duration
This Agreement remains in effect for **2–5 years** or as agreed.

## 5. Breach
Any breach may result in legal action, including claims for damages or injunctions.

## 6. Jurisdiction
This Agreement shall be governed by the laws of the applicable country or jurisdiction agreed upon by both parties.

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
      "Defines the relationship between a business and a contractor, clarifying non-employment status and responsibilities.",
    excerpt:
      "Establishes terms for working with non-employee service providers.",
    content: `
# Independent Contractor Agreement

This Agreement is entered into between the **Company** and the **Contractor**.

## 1. Relationship
The Contractor is an independent entity and not an employee. Nothing in this Agreement creates a partnership or employment relationship.

## 2. Services
The Contractor agrees to perform services as outlined in a separate scope or agreement.

## 3. Compensation
- Payment may be fixed, hourly, or milestone-based.
- Payments shall be made in agreed currency (GHS, NGN, USD, etc.).
- The Contractor is responsible for invoicing unless otherwise agreed.

## 4. Taxes & Compliance
The Contractor is solely responsible for:
- Personal income taxes
- Business registration (if applicable)
- Compliance with local regulations

## 5. Tools & Equipment
The Contractor shall provide their own tools, equipment, and resources unless otherwise agreed.

## 6. Confidentiality
The Contractor agrees to maintain confidentiality of all Company information.

## 7. Termination
Either party may terminate with notice. Outstanding work must be compensated accordingly.

## 8. Liability
The Contractor assumes responsibility for the quality and legality of their work.

## 9. Dispute Resolution
Disputes shall be resolved through negotiation, mediation, or arbitration in the agreed jurisdiction.

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

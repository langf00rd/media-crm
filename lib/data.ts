import type { Contract, Organization, Package, Request } from "./types";

export type { Contract, Organization, Package, Request };

export const mockContracts: Contract[] = [
  {
    id: "service-agreement",
    title: "Service Agreement",
    description:
      "A lean general-purpose service agreement for one-time or project-based services between a service provider and a client.",
    content:
      '# SERVICE AGREEMENT\n\nThis Service Agreement ("Agreement") is entered into between {{full_name}} ("Service Provider") and {{first_name}} {{last_name}} ("Client").\n\n## 1. Services\nThe Service Provider agrees to provide the following services:\n\n{{service_description}}\n\n## 2. Payment\nThe Client agrees to pay a total amount of {{fee}} for the services described in this Agreement.\n\nA deposit of {{deposit_amount}} is required before work begins. Work will not commence until the deposit is received.\n\n## 3. Client Responsibilities\nThe Client agrees to provide all necessary information, materials, and cooperation required for the Service Provider to perform the services. Delays caused by the Client may affect execution of the services.\n\n## 4. Cancellation\nIf the Client cancels after work has started, the deposit is non-refundable. The Client remains liable for payment of any work already completed up to the cancellation date.\n\n## 5. Ownership\nFull ownership of final deliverables transfers to the Client only after full payment has been received.\n\nThe Service Provider retains the right to display the work in portfolios or promotional materials unless otherwise agreed in writing.\n\n## 6. Confidentiality\nBoth parties agree not to disclose confidential information shared during the course of this Agreement to any third party without prior written consent.\n\n## 7. Liability\nThe Service Provider shall not be liable for any indirect, incidental, or consequential damages arising from this Agreement or the services provided.\n\n## 8. Governing Law\nThis Agreement shall be governed by the laws of the Republic of Ghana.\n\n## 9. Acceptance\nBy signing below, both parties agree to be bound by the terms of this Agreement.\n\n---\n\nSERVICE PROVIDER\n\nName: {{full_name}}\n\n---\n\nCLIENT\n\nName: {{first_name}} {{last_name}}\n\nDate: {{date}}',
    created_dt: "2026-05-15T00:00:00Z",
    updated_dt: "2026-05-15T00:00:00Z",
    fields: {
      internal: ["full_name", "service_description", "fee", "deposit_amount"],
      external: ["first_name", "last_name"],
    },
  },
  {
    id: "retainer-agreement",
    title: "Retainer Agreement",
    description:
      "A lean agreement for ongoing monthly service relationships between a service provider and a client.",
    content:
      '# RETAINER AGREEMENT\n\nThis Retainer Agreement ("Agreement") is entered into between {{full_name}} ("Service Provider") and {{first_name}} {{last_name}} ("Client").\n\n## 1. Services\nThe Service Provider agrees to provide ongoing services as described below:\n\n{{service_description}}\n\n## 2. Retainer Fee\nThe Client agrees to pay a recurring monthly retainer fee of {{monthly_fee}}.\n\nPayment is due at the start of each billing period. Services may be paused if payment is not received.\n\n## 3. Scope Boundaries\nThe services included under this retainer are limited to the agreed scope above. Any work outside this scope will be treated as additional work and may require separate agreement or additional charges.\n\n## 4. Client Responsibilities\nThe Client agrees to provide timely feedback, materials, and approvals required for service delivery. Delays from the Client may affect ongoing service performance.\n\n## 5. Termination\nEither party may terminate this Agreement by providing written notice.\n\nIf the Client terminates the Agreement mid-cycle, no refund is required for the current billing period.\n\n## 6. Ownership\nAny deliverables created during the retainer period transfer to the Client only after full payment has been received.\n\nThe Service Provider may use non-confidential work for portfolio or promotional purposes unless otherwise agreed.\n\n## 7. Confidentiality\nBoth parties agree to keep confidential information shared during this Agreement private and not disclose it to third parties without consent.\n\n## 8. Liability\nThe Service Provider is not liable for indirect, incidental, or consequential damages arising from services provided under this Agreement.\n\n## 9. Governing Law\nThis Agreement shall be governed by the laws of the Republic of Ghana.\n\n## 10. Acceptance\nBy signing below, both parties agree to be bound by the terms of this Agreement.\n\n---\n\nSERVICE PROVIDER\n\nName: {{full_name}}\n\n---\n\nCLIENT\n\nName: {{first_name}} {{last_name}}\n\nDate: {{date}}',
    created_dt: "2026-05-15T00:00:00Z",
    updated_dt: "2026-05-15T00:00:00Z",
    fields: {
      internal: ["full_name", "service_description", "monthly_fee"],
      external: ["first_name", "last_name"],
    },
  },
  {
    id: "independent-contractor-agreement",
    title: "Independent Contractor Agreement",
    description:
      "A lean agreement defining an independent contractor relationship for freelance or outsourced services, clarifying non-employment status and ownership terms.",
    content:
      '# INDEPENDENT CONTRACTOR AGREEMENT\n\nThis Independent Contractor Agreement ("Agreement") is entered into between {{full_name}} ("Contractor") and {{first_name}} {{last_name}} ("Client").\n\n## 1. Services\nThe Contractor agrees to provide the following services:\n\n{{service_description}}\n\n## 2. Compensation\nThe Client agrees to pay the Contractor a fee of {{fee}} for the services described in this Agreement.\n\nPayment terms and structure are agreed separately between both parties.\n\n## 3. Independent Relationship\nThe Contractor is engaged as an independent contractor and not as an employee, partner, or agent of the Client.\n\nNothing in this Agreement creates an employment relationship. The Contractor is responsible for their own taxes, insurance, and operational costs.\n\n## 4. Control of Work\nThe Contractor retains control over how the services are performed, provided that agreed outcomes and requirements are met.\n\n## 5. Ownership\nUpon full payment, ownership of final deliverables transfers to the Client unless otherwise agreed.\n\nThe Contractor retains the right to use non-confidential work for portfolio or promotional purposes.\n\n## 6. Confidentiality\nBoth parties agree not to disclose confidential information obtained during the course of this Agreement to any third party without prior written consent.\n\n## 7. Termination\nEither party may terminate this Agreement with written notice. The Client must pay for all work completed up to the termination date.\n\n## 8. Liability\nThe Contractor shall not be liable for indirect, incidental, or consequential damages arising from this Agreement.\n\n## 9. Governing Law\nThis Agreement shall be governed by the laws of the Republic of Ghana.\n\n## 10. Acceptance\nBy signing below, both parties agree to the terms of this Agreement.\n\n---\n\nCONTRACTOR\n\nName: {{full_name}}\n\n---\n\nCLIENT\n\nName: {{first_name}} {{last_name}}\n\nDate: {{date}}',
    created_dt: "2026-05-15T00:00:00Z",
    updated_dt: "2026-05-15T00:00:00Z",
    fields: {
      internal: ["full_name", "service_description", "fee"],
      external: ["first_name", "last_name"],
    },
  },
  {
    id: "nda",
    title: "Non-Disclosure Agreement (NDA)",
    description:
      "A lean confidentiality agreement to protect sensitive information shared between parties during discussions or service engagement.",
    content:
      '# NON-DISCLOSURE AGREEMENT (NDA)\n\nThis Non-Disclosure Agreement ("Agreement") is entered into between {{full_name}} ("Disclosing Party") and {{first_name}} {{last_name}} ("Receiving Party").\n\n## 1. Purpose\nThe parties intend to share confidential information for the purpose of discussing or executing potential or ongoing services.\n\n## 2. Confidential Information\n"Confidential Information" includes any non-public information disclosed during the course of engagement, including business, technical, financial, or operational information.\n\n## 3. Obligations\nThe Receiving Party agrees to:\n- Keep all Confidential Information strictly confidential\n- Not disclose it to any third party without prior written consent\n- Use the information only for the intended purpose of the Agreement\n\n## 4. Exclusions\nConfidential Information does not include information that:\n- Is publicly available without breach of this Agreement\n- Was already known to the Receiving Party before disclosure\n- Is independently developed without use of Confidential Information\n\n## 5. Duration\nThis Agreement remains in effect for a period of {{duration}} from the date of signing, unless otherwise agreed in writing.\n\n## 6. Return of Information\nUpon request, the Receiving Party agrees to return or destroy any confidential materials received.\n\n## 7. No License\nNothing in this Agreement grants any ownership or license rights to the Receiving Party over the Confidential Information.\n\n## 8. Liability\nAny breach of this Agreement may result in legal action and claims for damages.\n\n## 9. Governing Law\nThis Agreement shall be governed by the laws of the Republic of Ghana.\n\n## 10. Acceptance\nBy signing below, both parties agree to be bound by the terms of this Agreement.\n\n---\n\nDISCLOSING PARTY\n\nName: {{full_name}}\n\n---\n\nRECEIVING PARTY\n\nName: {{first_name}} {{last_name}}\n\nDate: {{date}}',
    created_dt: "2026-05-15T00:00:00Z",
    updated_dt: "2026-05-15T00:00:00Z",
    fields: {
      internal: ["full_name", "duration"],
      external: ["first_name", "last_name"],
    },
  },
];

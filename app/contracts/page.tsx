"use client";

import ContractItem from "@/components/contract";
import Main from "@/components/main";
import { mockContracts } from "@/lib/data";

export default function ContractsPage() {
  const statusColors: Record<Contract["status"], string> = {
    draft: "bg-gray-100 text-gray-600",
    "pending-signature": "bg-yellow-100 text-warning",
    signed: "bg-green-100 text-success",
    cancelled: "bg-red-100 text-danger",
  };

  return (
    <Main title="Contracts">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockContracts.map((a) => (
          <ContractItem contract={a} />
          // <Link
          //   key={contract.id}
          //   href={`/contracts/${contract.id}`}
          //   className="bg-card-bg backdrop-blur-lg rounded-card shadow-card overflow-hidden cursor-pointer hover:shadow-card-lg transition-all group"
          // >
          //   <div className="p-4 border-b border-gray-200 bg-gray-50">
          //     <div className="flex items-start gap-3">
          //       <FileText
          //         size={20}
          //         className="text-primary mt-0.5 flex-shrink-0"
          //       />
          //       <div className="flex-1 min-w-0">
          //         <h3 className="font-semibold text-foreground truncate">
          //           {contract.clientName}
          //         </h3>
          //         <p className="text-sm text-text-secondary">
          //           {contract.serviceType}
          //         </p>
          //       </div>
          //     </div>
          //   </div>

          //   <div className="p-4 space-y-3">
          //     <div className="text-xs text-text-secondary space-y-1 font-mono bg-white p-3 rounded border border-gray-100 line-clamp-4">
          //       <p>
          //         <span className="font-sans font-medium">Provider:</span>{" "}
          //         {contract.content.provider}
          //       </p>
          //       <p>
          //         <span className="font-sans font-medium">Client:</span>{" "}
          //         {contract.content.client}
          //       </p>
          //       <p>
          //         <span className="font-sans font-medium">Date:</span>{" "}
          //         {contract.eventDate}
          //       </p>
          //       <p>
          //         <span className="font-sans font-medium">Location:</span>{" "}
          //         {contract.eventLocation}
          //       </p>
          //       <p className="line-clamp-2">
          //         <span className="font-sans font-medium">Services:</span>{" "}
          //         {contract.content.services}
          //       </p>
          //     </div>

          //     <div className="flex items-center justify-between pt-2">
          //       <span className="text-sm font-semibold text-primary">
          //         ${contract.totalPrice}
          //       </span>
          //       <span
          //         className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[contract.status]}`}
          //       >
          //         {contract.status === "pending-signature"
          //           ? "Pending Signature"
          //           : contract.status.charAt(0).toUpperCase() +
          //             contract.status.slice(1)}
          //       </span>
          //     </div>
          //   </div>
          // </Link>
        ))}
      </div>
    </Main>
  );
}

'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { ArrowLeft, Download, Check, Send, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { mockContracts, Contract } from '@/lib/data'

const statusColors: Record<Contract['status'], string> = {
  draft: 'bg-gray-100 text-gray-600',
  'pending-signature': 'bg-yellow-100 text-warning',
  signed: 'bg-green-100 text-success',
  cancelled: 'bg-red-100 text-danger',
}

export default function ContractDetailPage() {
  const params = useParams<{ id: string }>()
  const contract = mockContracts.find((c) => c.id === params.id)
  const [downloaded, setDownloaded] = useState(false)
  const [sent, setSent] = useState(false)

  if (!contract) return <div className="p-6">Contract not found</div>

  const handleDownload = () => {
    setDownloaded(true)
    setTimeout(() => setDownloaded(false), 2000)
  }

  const handleSend = () => {
    setSent(true)
    setTimeout(() => setSent(false), 2000)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="link" onClick={() => window.history.back()}>
          <ArrowLeft size={20} />
          Back to Contracts
        </Button>
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[contract.status]}`}>
            {contract.status === 'pending-signature' ? 'Pending Signature' : contract.status.charAt(0).toUpperCase() + contract.status.slice(1)}
          </span>
          <Button variant="outline" size="sm" onClick={handleDownload}>
            {downloaded ? <Check size={16} className="text-success" /> : <Download size={16} />}
            {downloaded ? 'Downloaded!' : 'Download'}
          </Button>
        </div>
      </div>

      <div className="flex gap-2">
        <Button variant="outline" onClick={handleSend}>
          {sent ? <Check size={16} /> : <Send size={16} />}
          {sent ? 'Sent!' : 'Send to Client'}
        </Button>
        <Button variant="outline">
          <Eye size={16} />
          Preview
        </Button>
      </div>

      <div className="bg-card-bg backdrop-blur-lg rounded-card shadow-card p-8 max-w-3xl space-y-6">
        <div className="text-center pb-6 border-b-2 border-gray-200">
          <h2 className="text-2xl font-bold text-foreground">SERVICE AGREEMENT</h2>
          <p className="text-text-secondary mt-2">This agreement is entered into between:</p>
        </div>

        <div className="space-y-4 text-sm text-foreground">
          <p>
            <strong>Service Provider:</strong> <span className="text-primary">{contract.content.provider}</span>
          </p>
          <p>
            <strong>Client Name:</strong> <span className="text-primary">{contract.content.client}</span>
          </p>
          <p>
            <strong>Event Date:</strong> <span className="text-primary">{contract.eventDate}</span>
          </p>
          <p>
            <strong>Event Location:</strong> <span className="text-primary">{contract.eventLocation}</span>
          </p>

          <div className="pt-4">
            <h3 className="font-bold mb-2">1. SERVICES TO BE PROVIDED</h3>
            <p>{contract.content.services}</p>
          </div>

          <div>
            <h3 className="font-bold mb-2">2. INVESTMENT</h3>
            <p>Total Investment: <span className="text-primary">${contract.content.investment.total}</span></p>
            <p>Deposit (Due upon signing): <span className="text-primary">${contract.content.investment.deposit}</span></p>
            <p>Balance (Due by): <span className="text-primary">{contract.content.investment.balanceDueDate}</span></p>
          </div>

          <div>
            <h3 className="font-bold mb-2">3. TERMS & CONDITIONS</h3>
            <p>{contract.content.terms}</p>
          </div>

          <div className="pt-6 border-t-2 border-gray-200 flex gap-12">
            <div>
              <p className="text-xs text-text-secondary mb-8">Provider Signature</p>
              <p className="border-b-2 border-gray-400 w-48" />
            </div>
            <div>
              <p className="text-xs text-text-secondary mb-8">Client Signature</p>
              <p className="border-b-2 border-gray-400 w-48" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

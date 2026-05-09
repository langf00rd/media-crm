'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { ArrowLeft, CheckCircle2, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { mockJobs } from '@/lib/data'

export default function JobDetailPage() {
  const params = useParams<{ id: string }>()
  const job = mockJobs.find((j) => j.id === params.id)
  const [completed, setCompleted] = useState(false)

  if (!job) return <div className="p-6">Job not found</div>

  const handleMarkComplete = () => {
    setCompleted(true)
  }

  return (
    <div className="p-6 space-y-6">
      <Button variant="link" onClick={() => window.history.back()} className="mb-4">
        <ArrowLeft size={20} />
        Back to Jobs
      </Button>

      <div className="bg-card-bg backdrop-blur-lg rounded-card shadow-card p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{job.clientName}</h1>
          <p className="text-text-secondary mt-2">{job.serviceType}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <InfoItem label="Event Date" value={job.eventDate} />
          <InfoItem label="Location" value={job.location} />
          <InfoItem label="Email" value={job.email} />
          <InfoItem label="Phone" value={job.phone} />
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-xl font-bold text-foreground mb-4">Package Details</h2>
          <div className="space-y-3">
            <InfoItem label="Package" value={job.packageName} />
            <InfoItem label="Package Price" value={`$${job.packagePrice}`} />
            <InfoItem label="Deposit (25%)" value={`$${job.depositAmount}`} />
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-input">
              <span className="text-foreground font-medium">Deposit Paid</span>
              <span className={job.depositPaid ? 'text-success' : 'text-danger'}>
                {job.depositPaid ? '✓ Yes' : 'Pending'}
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-xl font-bold text-foreground mb-4">Balance</h2>
          <div className="space-y-3">
            <InfoItem label="Balance Due" value={`$${job.balanceAmount}`} />
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-input">
              <span className="text-foreground font-medium">Balance Paid</span>
              <span className={job.balancePaid ? 'text-success' : 'text-danger'}>
                {job.balancePaid ? '✓ Yes' : 'Pending'}
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-xl font-bold text-foreground mb-4">Contract</h2>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-input">
            <span className="text-foreground font-medium">Contract Signed</span>
            <span className={job.contractSigned ? 'text-success' : 'text-warning'}>
              {job.contractSigned ? '✓ Signed' : 'Pending'}
            </span>
          </div>
        </div>

        {job.status !== 'completed' && !completed && (
          <Button className="w-full bg-success text-white hover:bg-green-600" onClick={handleMarkComplete}>
            Mark as Complete
          </Button>
        )}

        {completed && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-input text-success font-medium flex items-center gap-2">
            <Check size={18} />
            Job marked as complete
          </div>
        )}

        {job.status === 'completed' && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-input text-success font-medium flex items-center gap-2">
            <CheckCircle2 size={20} />
            Completed on {job.completedDate}
          </div>
        )}
      </div>
    </div>
  )
}

function InfoItem({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-input">
      <span className="text-text-secondary font-medium">{label}</span>
      <span className="text-foreground font-semibold">{value}</span>
    </div>
  )
}

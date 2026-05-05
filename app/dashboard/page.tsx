'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { mockJobs, mockPackages, mockContracts, mockProvider } from '@/lib/data'

export default function DashboardPage() {
  const [copied, setCopied] = useState(false)
  const activeJobs = mockJobs.filter((j) => j.status === 'in-progress' || j.status === 'pending')
  const completedJobs = mockJobs.filter((j) => j.status === 'completed')
  const pendingPayments = mockJobs.filter((j) => !j.balancePaid && j.status !== 'cancelled')
  const pendingContracts = mockContracts.filter((c) => c.status === 'pending-signature')

  const bookingUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'app.com'}/book/${mockProvider.id}`

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(bookingUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
      </div>

      <div className="bg-card-bg backdrop-blur-lg rounded-card shadow-card p-4 flex items-center gap-2">
        <code className="flex-1 text-primary font-mono text-sm break-all">{bookingUrl}</code>
        <Button variant="ghost" size="icon" onClick={handleCopyLink}>
          {copied ? <Check size={18} className="text-success" /> : <Copy size={18} />}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard label="Active Jobs" value={activeJobs.length} color="primary" href="/jobs" />
        <StatCard label="Pending Payments" value={pendingPayments.length} color="warning" href="/jobs" />
        <StatCard label="Completed" value={completedJobs.length} color="success" href="/jobs?filter=completed" />
        <StatCard label="Pending Contracts" value={pendingContracts.length} color="warning" href="/contracts" />
      </div>

      <div className="bg-card-bg backdrop-blur-lg rounded-card shadow-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-foreground">Recent Bookings</h2>
          <Button variant="ghost" size="sm" onClick={() => window.location.href = '/jobs'}>View All <ChevronRight size={16} /></Button>
        </div>
        <div className="space-y-3">
          {mockJobs.slice(0, 3).map((job) => (
            <Link
              key={job.id}
              href={`/jobs/${job.id}`}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-input hover:bg-gray-100 cursor-pointer transition-all"
            >
              <div>
                <p className="font-semibold text-foreground">{job.clientName}</p>
                <p className="text-sm text-text-secondary">{job.serviceType}</p>
              </div>
              <ChevronRight size={20} className="text-primary" />
            </Link>
          ))}
        </div>
      </div>

      <div className="bg-card-bg backdrop-blur-lg rounded-card shadow-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-foreground">Recent Contracts</h2>
          <Button variant="ghost" size="sm" onClick={() => window.location.href = '/contracts'}>View All <ChevronRight size={16} /></Button>
        </div>
        <div className="space-y-3">
          {mockContracts.slice(0, 2).map((contract) => (
            <Link
              key={contract.id}
              href={`/contracts/${contract.id}`}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-input hover:bg-gray-100 cursor-pointer transition-all"
            >
              <div>
                <p className="font-semibold text-foreground">{contract.clientName}</p>
                <p className="text-sm text-text-secondary">{contract.serviceType}</p>
              </div>
              <ChevronRight size={20} className="text-primary" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

function StatCard({
  label,
  value,
  color,
  href,
}: {
  label: string
  value: number
  color: 'primary' | 'warning' | 'success'
  href: string
}) {
  const colorMap = {
    primary: 'text-primary bg-blue-50 border-blue-200',
    warning: 'text-warning bg-yellow-50 border-yellow-200',
    success: 'text-success bg-green-50 border-green-200',
  }

  return (
    <Link href={href} className={`p-6 rounded-card border-2 ${colorMap[color]} shadow-card hover:shadow-card-lg transition-all cursor-pointer block`}>
      <p className="text-text-secondary text-sm font-medium mb-2">{label}</p>
      <p className="text-4xl font-bold">{value}</p>
    </Link>
  )
}

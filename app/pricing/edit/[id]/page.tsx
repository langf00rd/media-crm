'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { mockPackages } from '@/lib/data'

export default function EditPackagePage() {
  const params = useParams<{ id: string }>()
  const pkg = mockPackages.find((p) => p.id === params.id)
  const [packageForm, setPackageForm] = useState({
    name: pkg?.name || '',
    serviceType: pkg?.serviceType || '',
    description: pkg?.description || '',
    price: pkg?.price?.toString() || '',
    depositPercentage: pkg?.depositPercentage?.toString() || '25',
    inclusions: pkg?.inclusions.join('\n') || '',
  })
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  if (!pkg) {
    return (
      <div className="p-6 space-y-6">
        <p className="text-text-secondary">Package not found</p>
        <Link href="/pricing">
          <Button variant="link"><ArrowLeft size={20} /> Back to Packages</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <Button variant="link" onClick={() => window.history.back()}>
        <ArrowLeft size={20} />
        Back to Packages
      </Button>

      <div className="bg-card-bg backdrop-blur-lg rounded-card shadow-card p-8 max-w-2xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">Edit Package</h1>
          <Button onClick={handleSave}>
            {saved ? <Check size={16} /> : null}
            {saved ? 'Saved!' : 'Save Changes'}
          </Button>
        </div>

        <div className="space-y-2">
          <Label>Package Name</Label>
          <Input
            type="text"
            value={packageForm.name}
            onChange={(e) => setPackageForm({ ...packageForm, name: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label>Service Type</Label>
          <Select value={packageForm.serviceType} onValueChange={(value) => { if (value) setPackageForm({ ...packageForm, serviceType: value }) }}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Wedding Photography">Wedding Photography</SelectItem>
              <SelectItem value="Corporate Event">Corporate Event</SelectItem>
              <SelectItem value="Portrait Session">Portrait Session</SelectItem>
              <SelectItem value="Product Photography">Product Photography</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Description</Label>
          <Textarea
            value={packageForm.description}
            onChange={(e) => setPackageForm({ ...packageForm, description: e.target.value })}
            rows={3}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Price ($)</Label>
            <Input
              type="number"
              value={packageForm.price}
              onChange={(e) => setPackageForm({ ...packageForm, price: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>Deposit Percentage (%)</Label>
            <Input
              type="number"
              value={packageForm.depositPercentage}
              onChange={(e) => setPackageForm({ ...packageForm, depositPercentage: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Inclusions (one per line)</Label>
          <Textarea
            value={packageForm.inclusions}
            onChange={(e) => setPackageForm({ ...packageForm, inclusions: e.target.value })}
            rows={4}
          />
        </div>
      </div>
    </div>
  )
}

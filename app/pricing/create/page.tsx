'use client'

import { useState } from 'react'
import { ArrowLeft, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function CreatePackagePage() {
  const [packageForm, setPackageForm] = useState({
    name: '',
    serviceType: '',
    description: '',
    price: '',
    depositPercentage: '25',
    inclusions: '',
  })
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => {
      setSaved(false)
      window.location.href = '/pricing'
    }, 1500)
  }

  return (
    <div className="p-6 space-y-6">
      <Button variant="link" onClick={() => window.history.back()}>
        <ArrowLeft size={20} />
        Back to Packages
      </Button>

      <div className="bg-card-bg backdrop-blur-lg rounded-card shadow-card p-8 max-w-2xl space-y-6">
        <h1 className="text-3xl font-bold text-foreground">Create New Package</h1>

        <div className="space-y-2">
          <Label>Package Name</Label>
          <Input
            type="text"
            value={packageForm.name}
            onChange={(e) => setPackageForm({ ...packageForm, name: e.target.value })}
            placeholder="e.g., Premium Wedding Package"
          />
        </div>

        <div className="space-y-2">
          <Label>Service Type</Label>
          <Select value={packageForm.serviceType} onValueChange={(value) => { if (value) setPackageForm({ ...packageForm, serviceType: value }) }}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a service type" />
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
            placeholder="Describe what this package includes"
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label>Price ($)</Label>
          <Input
            type="number"
            value={packageForm.price}
            onChange={(e) => setPackageForm({ ...packageForm, price: e.target.value })}
            placeholder="0.00"
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

        <div className="space-y-2">
          <Label>Inclusions (one per line)</Label>
          <Textarea
            value={packageForm.inclusions}
            onChange={(e) => setPackageForm({ ...packageForm, inclusions: e.target.value })}
            placeholder="4 hours coverage&#10;200+ photos&#10;Digital delivery"
            rows={4}
          />
        </div>

        <div className="flex gap-3 pt-4">
          <Button onClick={handleSave}>
            {saved ? <Check size={16} /> : null}
            {saved ? 'Saved!' : 'Save Package'}
          </Button>
          <Button variant="outline" onClick={() => window.history.back()}>Cancel</Button>
        </div>
      </div>
    </div>
  )
}

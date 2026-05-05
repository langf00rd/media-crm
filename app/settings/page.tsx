"use client";

import Main from "@/components/main";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { mockProvider } from "@/lib/data";
import {
  Bell,
  Briefcase,
  Building2,
  Check,
  Clock,
  Mail,
  Phone,
} from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
  const [formData, setFormData] = useState({
    businessName: mockProvider.businessName,
    serviceCategory: mockProvider.serviceCategory,
    email: mockProvider.email,
    phone: mockProvider.phone,
    reminderDays: "7",
  });
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [smsNotifs, setSmsNotifs] = useState(false);
  const [autoReminders, setAutoReminders] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <Main title="Settings">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <Button onClick={handleSave}>
          {saved ? <Check size={16} /> : null}
          {saved ? "Saved!" : "Save Changes"}
        </Button>
      </div>

      <div className="bg-card-bg backdrop-blur-lg rounded-card shadow-card p-8 max-w-2xl space-y-8">
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Building2 size={24} />
            Business Information
          </h2>

          <div className="space-y-2">
            <Label>Business Name</Label>
            <Input
              type="text"
              value={formData.businessName}
              onChange={(e) =>
                setFormData({ ...formData, businessName: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Service Category</Label>
            <Input
              type="text"
              value={formData.serviceCategory}
              onChange={(e) =>
                setFormData({ ...formData, serviceCategory: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Mail size={16} />
                Email
              </Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Phone size={16} />
                Phone
              </Label>
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Bell size={24} />
            Notifications
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">
                  Email Notifications
                </p>
                <p className="text-sm text-text-secondary">
                  Receive booking updates via email
                </p>
              </div>
              <Switch checked={emailNotifs} onCheckedChange={setEmailNotifs} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">SMS Notifications</p>
                <p className="text-sm text-text-secondary">
                  Receive booking updates via text
                </p>
              </div>
              <Switch checked={smsNotifs} onCheckedChange={setSmsNotifs} />
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Clock size={24} />
            Payment Reminders
          </h2>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Auto-send reminders</p>
              <p className="text-sm text-text-secondary">
                Automatically remind clients before due dates
              </p>
            </div>
            <Switch
              checked={autoReminders}
              onCheckedChange={setAutoReminders}
            />
          </div>

          <div className="space-y-2">
            <Label>Days before due date to send reminder</Label>
            <Input
              type="number"
              value={formData.reminderDays}
              onChange={(e) =>
                setFormData({ ...formData, reminderDays: e.target.value })
              }
            />
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Briefcase size={24} />
            Booking Link
          </h2>

          <div className="bg-gray-50 rounded-input p-3 flex items-center gap-2">
            <code className="flex-1 text-primary font-mono text-sm break-all">
              {`${process.env.NEXT_PUBLIC_APP_URL || "app.com"}/book/${mockProvider.id}`}
            </code>
          </div>
          <p className="text-sm text-text-secondary">
            Share this link with clients to access your public booking page
          </p>
        </div>
      </div>
    </Main>
  );
}

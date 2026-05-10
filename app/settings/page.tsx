"use client";

import Main from "@/components/main";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useUser } from "@/hooks/use-user";
import { signOut } from "@/lib/supabase/auth";
import { updateOrganization } from "@/lib/supabase/queries";
import { Check, Mail, Phone } from "lucide-react";
import { useEffect, useState } from "react";

export default function SettingsPage() {
  const { org, refresh } = useUser();
  const [autoReminders, setAutoReminders] = useState(true);
  const [saved, setSaved] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    email: "",
    phone: "",
    reminderDays: "7",
  });

  useEffect(() => {
    if (org) {
      setFormData({
        name: org.name,
        category: org.category,
        email: org.email || "",
        phone: org.phone || "",
        reminderDays: "7",
      });
    }
  }, [org]);

  const handleSave = async () => {
    if (!org) return;
    await updateOrganization(org.id, {
      name: formData.name,
      category: formData.category,
      email: formData.email,
      phone: formData.phone,
    });
    await refresh();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (!org) return <div className="p-6">Loading...</div>;

  const handleLogout = async () => {
    await signOut();
    window.location.href = "/auth/sign-in";
  };

  return (
    <Main
      title="Account settings"
      slotRight={
        <Button onClick={handleSave}>
          {saved ? <Check size={16} /> : null}
          {saved ? "Saved!" : "Save Changes"}
        </Button>
      }
    >
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Business Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label>Business Name</Label>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Category</Label>
              <Input
                type="text"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
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
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Payment Reminders
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">
                  Auto-send reminders
                </p>
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
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Booking Link
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="bg-gray-50 rounded-input p-3 flex items-center gap-2">
              <code className="flex-1 text-primary font-mono text-sm break-all">
                {`${window.location.origin}/${org?.slug || ""}`}
              </code>
            </div>
            <p className="text-sm text-text-secondary">
              Share this link with clients to access your public booking page
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sign Out</CardTitle>
          </CardHeader>
          <CardContent>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </CardContent>
        </Card>
      </div>
    </Main>
  );
}

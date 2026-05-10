"use client";

import Main from "@/components/main";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Spinner } from "@/components/ui/spinner";
import { useUser } from "@/hooks/use-user";
import { signOut } from "@/lib/supabase/auth";
import {
  deleteCoverPhoto,
  deleteLogo,
  updateOrganization,
  uploadCoverPhoto,
  uploadLogo,
} from "@/lib/supabase/queries";
import { Check, Mail, Phone, Upload, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function SettingsPage() {
  const { org, refresh } = useUser();
  const [autoReminders, setAutoReminders] = useState(true);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [logoRemoved, setLogoRemoved] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [coverUrl, setCoverUrl] = useState<string | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [coverRemoved, setCoverRemoved] = useState(false);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    email: "",
    phone: "",
    reminderDays: "7",
  });

  // Clean up object URLs on unmount
  useEffect(() => {
    return () => {
      if (logoPreview) URL.revokeObjectURL(logoPreview);
      if (coverPreview) URL.revokeObjectURL(coverPreview);
    };
  }, [logoPreview, coverPreview]);

  useEffect(() => {
    if (org) {
      setFormData({
        name: org.name,
        category: org.category,
        email: org.email || "",
        phone: org.phone || "",
        reminderDays: "7",
      });
      setLogoUrl(org.logo);
      setLogoRemoved(false);
      setCoverUrl(org.cover_photo);
      setCoverRemoved(false);
    }
  }, [org]);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLogoFile(file);
    setLogoRemoved(false);
    if (logoPreview) URL.revokeObjectURL(logoPreview);
    setLogoPreview(URL.createObjectURL(file));
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCoverFile(file);
    setCoverRemoved(false);
    if (coverPreview) URL.revokeObjectURL(coverPreview);
    setCoverPreview(URL.createObjectURL(file));
  };

  const handleRemoveCover = () => {
    setCoverFile(null);
    if (coverPreview) URL.revokeObjectURL(coverPreview);
    setCoverPreview(null);
    setCoverRemoved(true);
    if (coverInputRef.current) coverInputRef.current.value = "";
  };

  const handleRemoveLogo = () => {
    setLogoFile(null);
    if (logoPreview) URL.revokeObjectURL(logoPreview);
    setLogoPreview(null);
    setLogoRemoved(true);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSave = async () => {
    if (!org) return;
    setSaving(true);

    let newLogoUrl: string | null = logoUrl;
    let newCoverUrl: string | null = coverUrl;

    if (logoRemoved) {
      await deleteLogo(org.id);
      newLogoUrl = null;
    } else if (logoFile) {
      const url = await uploadLogo(org.id, logoFile);
      if (url) newLogoUrl = url;
    }

    if (coverRemoved) {
      await deleteCoverPhoto(org.id);
      newCoverUrl = null;
    } else if (coverFile) {
      const url = await uploadCoverPhoto(org.id, coverFile);
      if (url) newCoverUrl = url;
    }

    await updateOrganization(org.id, {
      name: formData.name,
      category: formData.category,
      email: formData.email,
      phone: formData.phone,
      logo: newLogoUrl,
      cover_photo: newCoverUrl,
    });
    await refresh();
    setLogoFile(null);
    setLogoRemoved(false);
    if (logoPreview) URL.revokeObjectURL(logoPreview);
    setLogoPreview(null);
    setCoverFile(null);
    setCoverRemoved(false);
    if (coverPreview) URL.revokeObjectURL(coverPreview);
    setCoverPreview(null);
    setSaving(false);
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
        <Button onClick={handleSave} disabled={saving}>
          {saving ? <Spinner /> : saved ? <Check size={16} /> : null}
          {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
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

            <div className="space-y-2">
              <Label>Business Logo</Label>
              <div className="flex items-center gap-4">
                {(logoUrl && !logoRemoved) || logoPreview ? (
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden border">
                    <img
                      src={logoPreview || logoUrl || ""}
                      alt="Business logo"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveLogo}
                      className="absolute top-0.5 right-0.5 bg-background/80 rounded-full p-0.5"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <div className="w-20 h-20 rounded-xl border border-dashed flex items-center justify-center text-muted-foreground">
                    <Upload size={20} />
                  </div>
                )}
                <div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {(logoUrl && !logoRemoved) || logoPreview ? "Change Logo" : "Upload Logo"}
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="hidden"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    PNG, JPG or WebP
                  </p>
                </div>
              </div>
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
            <CardTitle>Cover Photo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {(coverUrl && !coverRemoved) || coverPreview ? (
              <div className="relative w-full aspect-[3/1] rounded-xl overflow-hidden border">
                <img
                  src={coverPreview || coverUrl || ""}
                  alt="Cover photo"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={handleRemoveCover}
                  className="absolute top-2 right-2 bg-background/80 rounded-full p-1"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div className="w-full aspect-[3/1] rounded-xl border border-dashed flex items-center justify-center text-muted-foreground">
                <Upload size={24} />
              </div>
            )}
            <div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => coverInputRef.current?.click()}
              >
                {(coverUrl && !coverRemoved) || coverPreview ? "Change Cover" : "Upload Cover"}
              </Button>
              <input
                ref={coverInputRef}
                type="file"
                accept="image/*"
                onChange={handleCoverChange}
                className="hidden"
              />
              <p className="text-xs text-muted-foreground mt-1">
                PNG, JPG or WebP. Recommended 3:1 aspect ratio.
              </p>
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

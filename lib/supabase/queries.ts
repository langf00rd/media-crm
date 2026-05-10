import { supabase } from "./client";
import type { Contract, Organization, Package, Request, RequestWithPackage, User } from "@/lib/types";

// ------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------

function mapRow<T>(row: Record<string, unknown>): T {
  return row as unknown as T;
}

// ------------------------------------------------------------------
// Users
// ------------------------------------------------------------------

export async function createUser(
  input: Pick<User, "id" | "email" | "first_name" | "last_name">,
): Promise<{ data: User | null; error: Error | null }> {
  const { data, error } = await supabase
    .from("users")
    .insert(input)
    .select()
    .single();
  if (error) return { data: null, error: new Error(error.message) };
  return { data: data ? mapRow<User>(data) : null, error: null };
}

// ------------------------------------------------------------------
// Organizations
// ------------------------------------------------------------------

export async function getOrganizationBySlug(
  slug: string,
): Promise<Organization | null> {
  const { data } = await supabase
    .from("organizations")
    .select("*")
    .eq("slug", slug)
    .single();
  return data ? mapRow<Organization>(data) : null;
}

export async function getOrganizationById(
  id: string,
): Promise<Organization | null> {
  const { data } = await supabase
    .from("organizations")
    .select("*")
    .eq("id", id)
    .single();
  return data ? mapRow<Organization>(data) : null;
}

export async function hasOrganization(): Promise<boolean> {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.user) return false;
  const user = session.user;
  const { data } = await supabase
    .from("organizations")
    .select("id")
    .eq("id", user.id)
    .maybeSingle();
  return !!data;
}

export async function createOrganization(
  input: Pick<Organization, "name" | "slug" | "category" | "phone" | "email">,
): Promise<{ data: Organization | null; error: Error | null }> {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.user) return { data: null, error: new Error("Not authenticated") };
  const user = session.user;
  const { data, error } = await supabase
    .from("organizations")
    .insert({ id: user.id, ...input })
    .select()
    .single();
  if (error) return { data: null, error: new Error(error.message) };
  return { data: data ? mapRow<Organization>(data) : null, error: null };
}

export async function updateOrganization(
  id: string,
  updates: Partial<Pick<Organization, "name" | "category" | "email" | "phone">>,
): Promise<void> {
  await supabase.from("organizations").update(updates).eq("id", id);
}

// ------------------------------------------------------------------
// Packages
// ------------------------------------------------------------------

export async function getPackages(): Promise<Package[]> {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.user) return [];
  const { data } = await supabase
    .from("packages")
    .select("*")
    .eq("organization_id", session.user.id)
    .order("created_dt", { ascending: false });
  return (data ?? []).map((r) => mapRow<Package>(r));
}

export async function getPackage(id: string): Promise<Package | null> {
  const { data } = await supabase.from("packages").select("*").eq("id", id).single();
  return data ? mapRow<Package>(data) : null;
}

export async function createPackage(
  input: Omit<Package, "id" | "created_dt" | "updated_dt">,
): Promise<Package | null> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data } = await supabase
    .from("packages")
    .insert({ ...input, organization_id: user.id })
    .select()
    .single();
  return data ? mapRow<Package>(data) : null;
}

export async function updatePackage(
  id: string,
  updates: Partial<Pick<Package, "name" | "description" | "price" | "deposit_percentage" | "features" | "contract_id" | "currency">>,
): Promise<void> {
  await supabase.from("packages").update(updates).eq("id", id);
}

export async function deletePackage(id: string): Promise<void> {
  await supabase.from("packages").delete().eq("id", id);
}

export async function getPackagesByOrg(
  orgId: string,
): Promise<Package[]> {
  const { data } = await supabase
    .from("packages")
    .select("*")
    .eq("organization_id", orgId)
    .order("created_dt", { ascending: false });
  return (data ?? []).map((r) => mapRow<Package>(r));
}

// ------------------------------------------------------------------
// Contracts
// ------------------------------------------------------------------

export async function getContracts(): Promise<Contract[]> {
  const { data } = await supabase
    .from("contracts")
    .select("*")
    .order("created_dt", { ascending: false });
  return (data ?? []).map((r) => mapRow<Contract>(r));
}

export async function getContract(id: string): Promise<Contract | null> {
  const { data } = await supabase.from("contracts").select("*").eq("id", id).single();
  return data ? mapRow<Contract>(data) : null;
}

// ------------------------------------------------------------------
// Requests
// ------------------------------------------------------------------

export async function getRequests(
  statusFilter?: string,
): Promise<RequestWithPackage[]> {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.user) return [];
  let query = supabase
    .from("requests")
    .select("*, packages(*)")
    .eq("organization_id", session.user.id);
  if (statusFilter && statusFilter !== "all") {
    if (statusFilter === "active") {
      query = query.in("status", ["pending", "in-progress"]);
    } else {
      query = query.eq("status", statusFilter);
    }
  }
  const { data } = await query.order("created_dt", { ascending: false });
  return (data ?? []).map((r) => mapRow<RequestWithPackage>(r));
}

export async function getRequest(id: string): Promise<RequestWithPackage | null> {
  const { data } = await supabase.from("requests").select("*, packages(*)").eq("id", id).single();
  return data ? mapRow<RequestWithPackage>(data) : null;
}

export async function updateRequestStatus(
  id: string,
  status: string,
): Promise<void> {
  const updates: Record<string, unknown> = { status };
  if (status === "completed") {
    updates.completed_dt = new Date().toISOString();
  }
  await supabase.from("requests").update(updates).eq("id", id);
}

export async function createRequest(
  input: Pick<Request, "first_name" | "last_name" | "signature" | "package_id" | "organization_id" | "terms_accepted">,
): Promise<Request | null> {
  const { data } = await supabase
    .from("requests")
    .insert(input)
    .select()
    .single();
  return data ? mapRow<Request>(data) : null;
}

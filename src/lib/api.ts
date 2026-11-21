import type { TEquipment } from "@/types";

/**
 * lib/api — all GET requests go through here.
 * Runs on the server (server components) — never expose secrets.
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export type TEquipmentFilters = {
  search?: string;
  category?: string;
  rentalType?: string;
  minPrice?: string;
  maxPrice?: string;
  availability?: string;
  sortBy?: string;
};

async function apiRequest<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, { cache: "no-store" });

  const body = await res.json().catch(() => null);

  if (!res.ok || !body?.success) {
    throw new ApiError(
      body?.message || `Request failed with status ${res.status}`,
      res.status
    );
  }

  return body.data as T;
}

/** GET /equipments — public list of all equipments */
export async function getEquipments(): Promise<TEquipment[]> {
  return apiRequest<TEquipment[]>("/equipments");
}

/** GET /equipments with filters applied by MongoDB */
export async function getFilteredEquipments(
  filters: TEquipmentFilters
): Promise<TEquipment[]> {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(filters)) {
    if (value?.trim()) {
      params.set(key, value.trim());
    }
  }

  return apiRequest<TEquipment[]>(`/equipments?${params.toString()}`);
}

/** GET /equipments/featured — up to six recently added equipment items */
export async function getFeaturedEquipments(): Promise<TEquipment[]> {
  return apiRequest<TEquipment[]>("/equipments/featured");
}

/** GET /equipments/:id — one equipment item */
export async function getEquipmentById(id: string): Promise<TEquipment> {
  return apiRequest<TEquipment>(`/equipments/${encodeURIComponent(id)}`);
}

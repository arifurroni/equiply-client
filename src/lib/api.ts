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

/** GET /equipments/featured — up to six recently approved equipment items */
export async function getFeaturedEquipments(): Promise<TEquipment[]> {
  return apiRequest<TEquipment[]>("/equipments/featured");
}

/** GET /equipments/:id — one approved equipment item */
export async function getEquipmentById(id: string): Promise<TEquipment> {
  return apiRequest<TEquipment>(`/equipments/${encodeURIComponent(id)}`);
}

import type { TEquipment } from "@/types";

/**
 * lib/api — all GET requests go through here.
 * Runs on the server (server components) — never expose secrets.
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/** How long we wait for the Express API before failing fast (ms). */
const DEFAULT_TIMEOUT_MS = 8000;

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

type FetchInit = NonNullable<Parameters<typeof fetch>[1]>;

/**
 * fetch() with a hard timeout.
 *
 * A slow or sleeping backend must never hang a Vercel serverless
 * function until the platform kills it — that is exactly what produces
 * Vercel's generic "This page couldn't load ... ERROR <number>" page.
 * Instead we fail fast with a friendly, catchable ApiError so pages can
 * render their error state and offer a retry.
 */
export async function fetchWithTimeout(
  url: string,
  init: FetchInit = {},
  timeoutMs: number = DEFAULT_TIMEOUT_MS
): Promise<Response> {
  try {
    return await fetch(url, {
      ...init,
      signal: AbortSignal.timeout(timeoutMs),
    });
  } catch (error) {
    if (
      error instanceof Error &&
      (error.name === "TimeoutError" || error.name === "AbortError")
    ) {
      throw new ApiError(
        "The server took too long to respond. Please try again.",
        504
      );
    }

    throw new ApiError(
      "Could not reach the server. Please try again in a moment.",
      503
    );
  }
}

async function apiRequest<T>(path: string): Promise<T> {
  if (!API_URL) {
    throw new ApiError(
      "Server configuration error: NEXT_PUBLIC_API_URL is not set.",
      500
    );
  }

  const res = await fetchWithTimeout(`${API_URL}${path}`, {
    next: { revalidate: 60 },
  });

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

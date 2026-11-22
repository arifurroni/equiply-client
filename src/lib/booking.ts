import type { TRentalType } from "@/types";

export const RENTAL_BILLING_DAYS: Record<TRentalType, number> = {
  daily: 1,
  weekly: 7,
  monthly: 30,
};

export function dhakaDateString(date = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Dhaka",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));

  return `${values.year}-${values.month}-${values.day}`;
}

export function getRentalDays(startDate: string, endDate: string): number {
  if (
    !isDateOnly(startDate) ||
    !isDateOnly(endDate) ||
    endDate <= startDate
  ) {
    return 0;
  }

  const start = Date.parse(`${startDate}T00:00:00.000Z`);
  const end = Date.parse(`${endDate}T00:00:00.000Z`);
  return (end - start) / 86_400_000;
}

export function getRentalBillingUnits(
  rentalDays: number,
  rentalType: TRentalType
): number {
  return Math.ceil(rentalDays / RENTAL_BILLING_DAYS[rentalType]);
}

export function isDateOnly(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;

  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

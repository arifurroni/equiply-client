export const LOCATIONS = ["Dhaka", "Chittagong", "Khulna", "Sylhet"] as const;

export type TLocation = (typeof LOCATIONS)[number];
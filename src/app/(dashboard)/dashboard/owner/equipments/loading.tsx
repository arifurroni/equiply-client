import { Skeleton } from "@/components/ui/skeleton";

export default function OwnerEquipmentsLoading() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 p-4 sm:p-6">
      {/* Header skeleton */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48 bg-[#f0fdf4]" />
          <Skeleton className="h-4 w-72 bg-[#f0fdf4]" />
        </div>
        <Skeleton className="h-11 w-36 rounded-xl bg-[#f0fdf4]" />
      </div>

      {/* Table skeleton */}
      <div className="rounded-xl border border-[#dce9df] bg-white p-4 shadow-sm">
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton
              key={index}
              className="h-12 w-full rounded-lg bg-[#f0fdf4]"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

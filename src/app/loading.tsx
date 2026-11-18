import Image from "next/image";
import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <main
      aria-busy="true"
      className="flex flex-1 items-center justify-center bg-[#f0fdf4] px-4 py-16"
    >
      <div className="flex flex-col items-center text-center">
        <div className="mb-6 flex size-20 items-center justify-center rounded-3xl border border-[#dce9df] bg-white shadow-sm">
          <Image
            src="/images/logo.png"
            alt=""
            width={60}
            height={50}
            priority
            className="h-12 w-14 object-contain"
          />
        </div>
        <Spinner className="size-7 text-[#166534]" />
        <p className="mt-4 text-sm font-semibold text-[#102a24]">
          Getting things ready
        </p>
        <p className="mt-1 text-sm text-[#64756b]">
          Your next project is just a moment away.
        </p>
      </div>
    </main>
  );
}

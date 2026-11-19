import Link from "next/link";
import { headers } from "next/headers";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { auth } from "@/lib/auth";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return (
      <main className="flex flex-1 items-center justify-center bg-[#f0fdf4] px-4 py-16">
        <section className="w-full max-w-md rounded-3xl border border-[#dce9df] bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold tracking-tight text-[#102a24]">
            Sign in to view your profile
          </h1>
          <p className="mt-3 text-sm leading-6 text-[#64756b]">
            Your account details will appear here after you sign in.
          </p>
          <Link
            href="/signin"
            className="mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-[#166534] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#102a24]"
          >
            Sign in
          </Link>
        </section>
      </main>
    );
  }

  const { user } = session;
  const profileInitial = user.name?.trim().charAt(0).toUpperCase() || "U";

  return (
    <main className="flex flex-1 items-center justify-center bg-[#f0fdf4] px-4 py-12 sm:px-6">
      <section className="w-full max-w-2xl overflow-hidden rounded-3xl border border-[#dce9df] bg-white shadow-[0_24px_80px_-32px_rgba(16,42,36,0.28)]">
        <div className="bg-[#102a24] px-6 py-8 text-white sm:px-10 sm:py-10">
          <p className="text-sm font-semibold text-[#6ee7a5]">Your account</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">Profile</h1>
          <p className="mt-2 text-sm text-white/70">
            Your Equiply account information.
          </p>
        </div>

        <div className="flex flex-col items-center gap-5 p-6 sm:flex-row sm:p-10">
          <Avatar size="lg" className="ring-4 ring-[#f0fdf4]">
            {user.image && <AvatarImage src={user.image} alt="" />}
            <AvatarFallback className="bg-[#f0fdf4] text-lg font-semibold text-[#166534]">
              {profileInitial}
            </AvatarFallback>
          </Avatar>

          <dl className="w-full min-w-0 space-y-4 text-center sm:text-left">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-[#64756b]">
                Name
              </dt>
              <dd className="mt-1 wrap-break-word text-lg font-semibold text-[#102a24]">
                {user.name || "Equiply member"}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-[#64756b]">
                Email
              </dt>
              <dd className="mt-1 break-all text-sm text-[#52645a]">
                {user.email}
              </dd>
            </div>
          </dl>
        </div>
      </section>
    </main>
  );
}

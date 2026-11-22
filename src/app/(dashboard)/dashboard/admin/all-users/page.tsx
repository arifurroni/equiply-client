import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import AdminUsersTable from "@/components/dashboard/admin/AdminUsersTable";
import { getAdminUsers } from "./actions";
import { auth } from "@/lib/auth";
import type { TAdminUser } from "@/types";

export default async function AdminAllUsersPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    redirect("/signin");
  }

  if (session.user.role !== "admin") {
    redirect(`/dashboard/${session.user.role ?? "customer"}`);
  }

  let users: TAdminUser[] = [];
  let loadError: string | null = null;

  try {
    users = await getAdminUsers();
  } catch (error) {
    loadError =
      error instanceof Error ? error.message : "Failed to load registered users.";
  }

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 p-4 sm:p-6">
      <header>
        <p className="text-sm font-semibold text-[#166534]">Administration</p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#102a24]">
          All Users
        </h1>
        <p className="mt-1 text-sm text-[#64756b]">
          Review registered accounts and manage their role and location.
        </p>
      </header>

      {loadError ? (
        <section
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 p-6"
        >
          <h2 className="font-semibold text-red-700">
            Could not load registered users
          </h2>
          <p className="mt-1 text-sm text-red-600">{loadError}</p>
          <Link
            href="/dashboard/admin/all-users"
            className="mt-4 inline-block rounded-xl border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-100"
          >
            Try again
          </Link>
        </section>
      ) : users.length === 0 ? (
        <section className="rounded-xl border border-[#dce9df] bg-white p-10 text-center shadow-sm">
          <h2 className="text-lg font-semibold text-[#102a24]">
            No registered users yet
          </h2>
          <p className="mt-1 text-sm text-[#64756b]">
            User accounts will appear here after they register.
          </p>
        </section>
      ) : (
        <AdminUsersTable users={users} />
      )}
    </main>
  );
}
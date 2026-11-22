import type { Metadata } from "next";
import { Mail, MessageCircle, Phone } from "lucide-react";

import ContactMessageForm from "@/components/shared/ContactMessageForm";

export const metadata: Metadata = {
  title: "Contact Equiply",
  description: "Get in touch with the Equiply team.",
};

const contactExamples = [
  {
    title: "Email",
    detail: "hello@equiply.example",
    note: "Sample address for this demo",
    icon: Mail,
  },
  {
    title: "Phone",
    detail: "+1 (202) 555-0147",
    note: "Sample number for this demo",
    icon: Phone,
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-[60vh] bg-[#f8fbf8] px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#166534]">
            Contact
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#102a24] sm:text-4xl">
            We&apos;re here to hear from you.
          </h1>
          <p className="mt-4 text-base leading-7 text-[#52645a]">
            This demo page shows sample contact details and a form layout. No
            real messages are sent.
          </p>
        </header>

        <div className="mx-auto mt-10 grid max-w-5xl gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <aside className="space-y-4">
            {contactExamples.map((contact) => {
              const Icon = contact.icon;

              return (
                <section
                  key={contact.title}
                  className="rounded-2xl border border-[#dce9df] bg-white p-5 shadow-sm"
                >
                  <span className="flex size-11 items-center justify-center rounded-xl bg-[#e8f7ed] text-[#166534]">
                    <Icon aria-hidden="true" size={21} />
                  </span>
                  <h2 className="mt-4 text-base font-bold text-[#102a24]">
                    {contact.title}
                  </h2>
                  <p className="mt-1 break-all text-sm font-semibold text-[#166534]">
                    {contact.detail}
                  </p>
                  <p className="mt-2 text-xs text-[#64756b]">{contact.note}</p>
                </section>
              );
            })}

            <section className="rounded-2xl border border-[#dce9df] bg-[#f0fdf4] p-5">
              <span className="flex size-11 items-center justify-center rounded-xl bg-white text-[#166534]">
                <MessageCircle aria-hidden="true" size={21} />
              </span>
              <h2 className="mt-4 text-base font-bold text-[#102a24]">
                Need help with a listing?
              </h2>
              <p className="mt-2 text-sm leading-6 text-[#52645a]">
                When a support channel is connected, include the equipment
                name and your question to help the team understand what you
                need.
              </p>
            </section>
          </aside>

          <ContactMessageForm />
        </div>
      </div>
    </main>
  );
}

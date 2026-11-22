"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";

export default function ContactMessageForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.currentTarget.reset();
    setSubmitted(true);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-[#dce9df] bg-white p-5 shadow-sm sm:p-7"
    >
      <div>
        <h2 className="text-xl font-bold text-[#102a24]">Send a message</h2>
        <p className="mt-2 text-sm leading-6 text-[#64756b]">
          Demo form only. Messages are not sent or stored.
        </p>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <label
            htmlFor="contact-name"
            className="text-sm font-medium text-[#172b24]"
          >
            Your name
          </label>
          <input
            id="contact-name"
            name="name"
            autoComplete="name"
            required
            className="h-11 w-full rounded-xl border border-[#dce9df] bg-white px-3.5 text-sm text-[#172b24] outline-none focus-visible:border-[#166534] focus-visible:ring-2 focus-visible:ring-[#166534]/10"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="contact-email"
            className="text-sm font-medium text-[#172b24]"
          >
            Email address
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="h-11 w-full rounded-xl border border-[#dce9df] bg-white px-3.5 text-sm text-[#172b24] outline-none focus-visible:border-[#166534] focus-visible:ring-2 focus-visible:ring-[#166534]/10"
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <label
            htmlFor="contact-subject"
            className="text-sm font-medium text-[#172b24]"
          >
            Subject
          </label>
          <input
            id="contact-subject"
            name="subject"
            required
            className="h-11 w-full rounded-xl border border-[#dce9df] bg-white px-3.5 text-sm text-[#172b24] outline-none focus-visible:border-[#166534] focus-visible:ring-2 focus-visible:ring-[#166534]/10"
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <label
            htmlFor="contact-message"
            className="text-sm font-medium text-[#172b24]"
          >
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            required
            className="w-full resize-y rounded-xl border border-[#dce9df] bg-white px-3.5 py-3 text-sm text-[#172b24] outline-none focus-visible:border-[#166534] focus-visible:ring-2 focus-visible:ring-[#166534]/10"
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#166534] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#102a24] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#166534]"
      >
        <Send aria-hidden="true" size={16} />
        Preview form
      </button>

      {submitted && (
        <p role="status" className="mt-4 text-sm font-medium text-[#64756b]">
          This demo form is not connected, so your message was not sent.
        </p>
      )}
    </form>
  );
}

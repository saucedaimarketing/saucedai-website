"use client";

import { useState } from "react";
import { ButtonColorful } from "@/components/ui/button-colorful";
import { TypewriterHeading } from "@/components/ui/typewriter-heading";

const APPLY_EMAIL = "saucedaimarketing@gmail.com";

const INPUT_CLASSES =
  "w-full rounded-xl border border-edge bg-panel px-4 py-3 text-fg outline-none transition-colors placeholder:text-fg-faint focus:border-gold";

export default function ApplyForm() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);
  const [form, setForm] = useState({
    restaurant: "",
    name: "",
    email: "",
    phone: "",
    about: "",
  });

  function update(key: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setError(false);

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Request failed");
      setSent(true);
    } catch {
      setError(true);
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    return (
      <div className="rounded-3xl border border-edge bg-panel p-10 text-center">
        <TypewriterHeading
          as="h2"
          text="Got it — we'll be in touch."
          className="font-display text-2xl font-bold tracking-tight text-fg"
        />
        <p className="mt-4 text-[15px] leading-relaxed text-fg-dim">
          Your application has been sent. If you don&apos;t hear back soon,
          email us directly at{" "}
          <a
            href={`mailto:${APPLY_EMAIL}`}
            className="text-gold transition-colors hover:text-gold-hover"
          >
            {APPLY_EMAIL}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <Field label="Restaurant name" required>
        <input
          type="text"
          required
          value={form.restaurant}
          onChange={update("restaurant")}
          className={INPUT_CLASSES}
        />
      </Field>

      <Field label="Your name" required>
        <input
          type="text"
          required
          value={form.name}
          onChange={update("name")}
          className={INPUT_CLASSES}
        />
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Email" required>
          <input
            type="email"
            required
            value={form.email}
            onChange={update("email")}
            className={INPUT_CLASSES}
          />
        </Field>

        <Field label="Phone">
          <input
            type="tel"
            value={form.phone}
            onChange={update("phone")}
            className={INPUT_CLASSES}
          />
        </Field>
      </div>

      <Field label="Tell us about your restaurant" required>
        <textarea
          required
          rows={4}
          value={form.about}
          onChange={update("about")}
          placeholder="What do you serve, where are you, what's the one thing people say about you?"
          className={`${INPUT_CLASSES} resize-none`}
        />
      </Field>

      {error && (
        <p className="text-sm text-fg-dim">
          Something went wrong sending your application. Try again, or email
          us directly at{" "}
          <a
            href={`mailto:${APPLY_EMAIL}`}
            className="text-gold transition-colors hover:text-gold-hover"
          >
            {APPLY_EMAIL}
          </a>
          .
        </p>
      )}

      <ButtonColorful type="submit" disabled={sending} className="mt-2">
        {sending ? "Sending…" : "Apply now"}
      </ButtonColorful>
    </form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-fg">
        {label}
        {required && <span className="text-gold"> *</span>}
      </span>
      {children}
    </label>
  );
}

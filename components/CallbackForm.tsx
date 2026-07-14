"use client";

import { useState } from "react";

/*
 * "Request a Callback" form. This is NOT a live scheduler — staff call the
 * patient back to confirm a real slot, and the confirmation copy says so.
 * Config values arrive as props so the component stays brand-agnostic.
 */

const inputClasses =
  "mt-2 w-full rounded-lg border-2 border-secondary-light bg-card px-4 py-3.5 text-lg focus:border-primary-dark";
const labelClasses = "block text-lg font-semibold";

export default function CallbackForm({
  reasonsForVisit,
  confirmationMessage,
  hipaaNote,
  productContext,
}: {
  reasonsForVisit: string[];
  confirmationMessage: string;
  hipaaNote: string;
  /** Set when arriving from a store product's "Ask About This" link — the
   * reason-for-visit question is redundant then, so it's replaced with a
   * confirmation of which product this is about (also sent to staff). */
  productContext?: string;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [preferredTime, setPreferredTime] = useState<"morning" | "afternoon">("morning");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/callback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, preferredTime, productContext }),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="rounded-xl border-2 border-secondary bg-secondary-light p-8 text-center">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true" className="mx-auto h-14 w-14 text-primary-darker">
          <circle cx="12" cy="12" r="10" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12.5l2.5 2.5L16 9.5" />
        </svg>
        <p className="mt-4 text-2xl font-semibold">{confirmationMessage}</p>
        <p className="mt-2 text-lg text-muted">
          Prefer not to wait? Call us during office hours instead.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" aria-label="Request a callback">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClasses}>
            Your name <span aria-hidden="true" className="text-primary-dark">*</span>
          </label>
          <input id="name" name="name" type="text" required autoComplete="name" className={inputClasses} />
        </div>
        <div>
          <label htmlFor="phone" className={labelClasses}>
            Phone number <span aria-hidden="true" className="text-primary-dark">*</span>
          </label>
          <input id="phone" name="phone" type="tel" required autoComplete="tel" className={inputClasses} />
        </div>
      </div>

      <div>
        <label htmlFor="email" className={labelClasses}>
          Email <span className="font-normal text-muted">(optional)</span>
        </label>
        <input id="email" name="email" type="email" autoComplete="email" className={inputClasses} />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="preferredDay" className={labelClasses}>
            Best day to call you
          </label>
          <select id="preferredDay" name="preferredDay" className={inputClasses} defaultValue="Any weekday">
            {["Any weekday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => (
              <option key={day}>{day}</option>
            ))}
          </select>
        </div>
        <fieldset>
          <legend className={labelClasses}>Best time of day</legend>
          <div className="mt-2 grid grid-cols-2 gap-3" role="group">
            {(["morning", "afternoon"] as const).map((time) => (
              <button
                key={time}
                type="button"
                onClick={() => setPreferredTime(time)}
                aria-pressed={preferredTime === time}
                className={`min-h-[56px] rounded-lg border-2 px-4 text-lg font-semibold capitalize transition-colors ${
                  preferredTime === time
                    ? "border-primary-dark bg-primary-dark text-white"
                    : "border-secondary-light bg-card text-body hover:border-secondary"
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      {productContext ? (
        <div className="rounded-lg border-2 border-secondary-light bg-secondary-light/40 px-4 py-3">
          <p className="text-lg">
            <span className="font-semibold">Asking about:</span> {productContext}
          </p>
        </div>
      ) : (
        <div>
          <label htmlFor="reason" className={labelClasses}>
            Reason for your visit
          </label>
          <select id="reason" name="reason" className={inputClasses} defaultValue={reasonsForVisit[0]}>
            {reasonsForVisit.map((reason) => (
              <option key={reason}>{reason}</option>
            ))}
          </select>
        </div>
      )}

      <fieldset>
        <legend className={labelClasses}>Have you visited us before?</legend>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          {["I'm a new patient", "I'm a returning patient"].map((option, i) => (
            <label
              key={option}
              className="flex min-h-[56px] flex-1 cursor-pointer items-center gap-3 rounded-lg border-2 border-secondary-light bg-card px-4 text-lg has-checked:border-primary-dark has-checked:bg-secondary-light"
            >
              <input
                type="radio"
                name="patientType"
                value={option}
                defaultChecked={i === 0}
                className="h-6 w-6 accent-(--site-primary-dark)"
              />
              {option}
            </label>
          ))}
        </div>
      </fieldset>

      <p className="rounded-lg bg-cream px-4 py-3 text-muted">{hipaaNote}</p>

      {status === "error" && (
        <p role="alert" className="rounded-lg border-2 border-red-300 bg-red-50 px-4 py-3 text-lg text-red-800">
          Something went wrong sending your request. Please try again, or simply give us a call during office hours.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-lg bg-primary-dark px-8 py-4 text-xl font-semibold text-white transition-colors hover:bg-primary-darker disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? "Sending…" : productContext ? "Ask My Question" : "Request My Callback"}
      </button>
    </form>
  );
}

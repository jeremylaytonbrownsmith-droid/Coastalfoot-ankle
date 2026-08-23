"use client";

import { useState } from "react";

/*
 * Request form for Coastal Mobile Podiatry house calls. Separate from
 * CallbackForm: this needs a service-area location and a lightweight,
 * patient-friendly version of the Medicare home-visit eligibility
 * checklist, so staff can tell at a glance whether a request is likely
 * Medicare-covered or self-pay before they call back — neither of which
 * the general callback form asks for.
 *
 * The eligibility checkboxes are informational only — this form doesn't
 * declare anyone "covered" or "self-pay" itself; that determination is
 * always made by the practice on the callback.
 */

const inputClasses =
  "mt-2 w-full rounded-lg border-2 border-secondary-light bg-card px-4 py-3.5 text-lg focus:border-primary-dark";
const labelClasses = "block text-lg font-semibold";

export default function MobileVisitRequestForm({ eligibilityOptions }: { eligibilityOptions: string[] }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [patientType, setPatientType] = useState<"new" | "returning">("new");
  const [eligibility, setEligibility] = useState<string[]>([]);

  function toggleEligibility(option: string) {
    setEligibility((prev) => (prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/mobile-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, patientType, eligibility }),
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
        <p className="mt-4 text-2xl font-semibold">
          Thanks — our team will review your request and call you back within one business day.
        </p>
        <p className="mt-2 text-lg text-muted">
          Prefer not to wait? Call us during office hours instead.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" aria-label="Request a home visit">
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

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="location" className={labelClasses}>
            Your city or ZIP code <span aria-hidden="true" className="text-primary-dark">*</span>
          </label>
          <input id="location" name="location" type="text" required autoComplete="postal-code" className={inputClasses} />
        </div>
        <div>
          <label htmlFor="email" className={labelClasses}>
            Email <span className="font-normal text-muted">(optional)</span>
          </label>
          <input id="email" name="email" type="email" autoComplete="email" className={inputClasses} />
        </div>
      </div>

      <fieldset>
        <legend className={labelClasses}>Have you visited us before?</legend>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          {(
            [
              { value: "new", label: "I'm a new patient" },
              { value: "returning", label: "I'm a returning patient" },
            ] as const
          ).map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setPatientType(option.value)}
              aria-pressed={patientType === option.value}
              className={`min-h-[56px] flex-1 rounded-lg border-2 px-4 text-lg font-semibold transition-colors ${
                patientType === option.value
                  ? "border-primary-dark bg-primary-dark text-white"
                  : "border-secondary-light bg-card text-body hover:border-secondary"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className={labelClasses}>
          Which of these describe your situation? <span className="font-normal text-muted">(optional — select any that apply)</span>
        </legend>
        <div className="mt-3 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {eligibilityOptions.map((option) => (
            <label
              key={option}
              className="flex min-h-[52px] cursor-pointer items-center gap-3 rounded-lg border-2 border-secondary-light bg-card px-4 text-base has-checked:border-primary-dark has-checked:bg-secondary-light"
            >
              <input
                type="checkbox"
                checked={eligibility.includes(option)}
                onChange={() => toggleEligibility(option)}
                className="h-6 w-6 shrink-0 accent-(--site-primary-dark)"
              />
              {option}
            </label>
          ))}
        </div>
        <p className="mt-2 text-base text-muted">
          Not sure, or none of these apply? That&apos;s fine — a home visit is still available as a self-pay
          service. Leave this blank and we&apos;ll go over everything on the phone.
        </p>
      </fieldset>

      <div>
        <label htmlFor="note" className={labelClasses}>
          Anything else we should know? <span className="font-normal text-muted">(optional)</span>
        </label>
        <textarea id="note" name="note" rows={3} className={inputClasses} />
      </div>

      <p className="rounded-lg bg-cream px-4 py-3 text-muted">
        This form doesn&apos;t decide coverage or pricing — our team confirms Medicare eligibility or self-pay
        pricing with you on the phone. Please don&apos;t include detailed medical history here.
      </p>

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
        {status === "sending" ? "Sending…" : "Request a Home Visit"}
      </button>
    </form>
  );
}

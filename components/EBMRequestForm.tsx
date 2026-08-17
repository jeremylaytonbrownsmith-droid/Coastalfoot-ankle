"use client";

import { useState } from "react";
import type { EBMProduct } from "@/lib/site-config";

/*
 * Request form for EBM Medical's prescription-only products. Deliberately
 * separate from CallbackForm: this collects date of birth (needed so staff
 * can pull/verify the right patient chart before calling back) and asks
 * which phone to use for texting vs. calling, neither of which the general
 * callback form needs.
 */

const inputClasses =
  "mt-2 w-full rounded-lg border-2 border-secondary-light bg-card px-4 py-3.5 text-lg focus:border-primary-dark";
const labelClasses = "block text-lg font-semibold";

export default function EBMRequestForm({ products }: { products: EBMProduct[] }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [phoneType, setPhoneType] = useState<"cell" | "home">("cell");
  const [requestType, setRequestType] = useState<"info" | "prescription">("info");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/ebm-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, phoneType, requestType }),
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
    <form onSubmit={handleSubmit} className="space-y-6" aria-label="Request EBM Medical product info or a prescription">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className={labelClasses}>
            First name <span aria-hidden="true" className="text-primary-dark">*</span>
          </label>
          <input id="firstName" name="firstName" type="text" required autoComplete="given-name" className={inputClasses} />
        </div>
        <div>
          <label htmlFor="lastName" className={labelClasses}>
            Last name <span aria-hidden="true" className="text-primary-dark">*</span>
          </label>
          <input id="lastName" name="lastName" type="text" required autoComplete="family-name" className={inputClasses} />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="dob" className={labelClasses}>
            Date of birth <span aria-hidden="true" className="text-primary-dark">*</span>
          </label>
          <input id="dob" name="dob" type="date" required autoComplete="bday" className={inputClasses} />
        </div>
        <div>
          <label htmlFor="email" className={labelClasses}>
            Email <span className="font-normal text-muted">(optional)</span>
          </label>
          <input id="email" name="email" type="email" autoComplete="email" className={inputClasses} />
        </div>
      </div>

      <div>
        <label htmlFor="phone" className={labelClasses}>
          Phone number <span aria-hidden="true" className="text-primary-dark">*</span>
        </label>
        <input id="phone" name="phone" type="tel" required autoComplete="tel" className={inputClasses} />
        <fieldset className="mt-3">
          <legend className="text-base font-medium text-muted">Is this a cell phone or a home phone?</legend>
          <div className="mt-2 grid grid-cols-2 gap-3" role="group">
            {(
              [
                { value: "cell", label: "Cell (OK to text)" },
                { value: "home", label: "Home (please call)" },
              ] as const
            ).map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setPhoneType(option.value)}
                aria-pressed={phoneType === option.value}
                className={`min-h-[56px] rounded-lg border-2 px-4 text-lg font-semibold transition-colors ${
                  phoneType === option.value
                    ? "border-primary-dark bg-primary-dark text-white"
                    : "border-secondary-light bg-card text-body hover:border-secondary"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      <fieldset>
        <legend className={labelClasses}>What are you requesting?</legend>
        <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2" role="group">
          {(
            [
              { value: "info", label: "More information" },
              { value: "prescription", label: "A prescription" },
            ] as const
          ).map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setRequestType(option.value)}
              aria-pressed={requestType === option.value}
              className={`min-h-[56px] rounded-lg border-2 px-4 text-lg font-semibold transition-colors ${
                requestType === option.value
                  ? "border-primary-dark bg-primary-dark text-white"
                  : "border-secondary-light bg-card text-body hover:border-secondary"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="product" className={labelClasses}>
          Which product?
        </label>
        <select id="product" name="product" className={inputClasses} defaultValue={products[0]?.name ?? ""}>
          {products.map((product) => (
            <option key={product.name} value={product.name}>
              {product.name}
            </option>
          ))}
          <option value="Not sure / other">Not sure / other</option>
        </select>
      </div>

      <div>
        <label htmlFor="note" className={labelClasses}>
          Anything else we should know? <span className="font-normal text-muted">(optional)</span>
        </label>
        <textarea id="note" name="note" rows={3} className={inputClasses} />
      </div>

      <p className="rounded-lg bg-cream px-4 py-3 text-muted">
        A prescription can only be issued after one of our doctors reviews your case — submitting this
        form doesn&apos;t guarantee one. Please don&apos;t include detailed medical history here; we&apos;ll
        talk through everything on the phone.
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
        {status === "sending" ? "Sending…" : "Send My Request"}
      </button>
    </form>
  );
}

import React from "react";
import { FiHelpCircle } from "react-icons/fi";

const faqs = [
  {
    q: "Is the donation request details page public?",
    a: "Yes. You can view request details publicly, but confirming donation requires login.",
  },
  {
    q: "How do I become a donor?",
    a: "Register an account, complete your profile with blood group and location, and keep availability updated.",
  },
  {
    q: "Can I donate to my own request?",
    a: "No. The platform prevents donating to your own request to avoid misuse.",
  },
  {
    q: "What if a request is already in progress?",
    a: "If it’s not pending, it’s already assigned or completed. You’ll see that status clearly.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-12 md:py-16">
      {/* Header */}
      <div className="text-center mb-10">
        <div
          className="
            inline-flex items-center gap-2 rounded-full px-3 py-1
            border border-base-200 bg-base-200/40
            text-[11px] font-semibold uppercase tracking-wide
            text-base-content/70
          "
        >
          <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
          FAQ
        </div>

        <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-base-content">
          Questions people ask most
        </h2>
        <p className="mt-3 text-sm md:text-base text-base-content/70 max-w-2xl mx-auto">
          Clear answers to common platform and donation questions.
        </p>
      </div>

      {/* Card */}
      <div
        className="
          relative overflow-hidden
          rounded-3xl border border-base-200 bg-base-100
          shadow-2xl p-6 md:p-8
        "
      >
        {/* Premium soft glows (light + dark safe) */}
        <div
          className="
            pointer-events-none absolute -top-20 -right-24 h-56 w-56 rounded-full
            bg-gradient-to-br from-rose-500/15 via-orange-400/10 to-transparent
            blur-3xl
          "
          aria-hidden="true"
        />
        <div
          className="
            pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full
            bg-gradient-to-tr from-sky-400/10 via-emerald-400/10 to-transparent
            blur-3xl
          "
          aria-hidden="true"
        />

        <div className="relative">
          {/* Optional top hint row */}
          <div className="mb-5 flex items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 text-xs text-base-content/70">
              <FiHelpCircle className="h-4 w-4" />
              Quick answers for donors, volunteers, and requesters
            </div>
            <span className="hidden sm:inline text-[11px] text-base-content/60">
              Updated regularly
            </span>
          </div>

          <div className="space-y-3">
            {faqs.map((f, idx) => (
              <div
                key={idx}
                className="
                  collapse collapse-arrow rounded-2xl
                  border border-base-200
                  bg-base-100/60 backdrop-blur
                  hover:bg-base-200/30 transition
                "
              >
                <input
                  type="radio"
                  name="faq-accordion"
                  defaultChecked={idx === 0}
                />

                <div
                  className="
                    collapse-title text-sm md:text-base font-semibold text-base-content
                    flex items-center gap-2
                  "
                >
                  <span className="h-7 w-7 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center text-[12px] font-extrabold">
                    {idx + 1}
                  </span>
                  <span>{f.q}</span>
                </div>

                <div className="collapse-content">
                  <p className="text-sm text-base-content/70 leading-6">
                    {f.a}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-base-200 bg-base-200/30 p-4">
            <p className="text-[11px] text-base-content/70 leading-relaxed">
              For urgent medical emergencies, contact your local hospital immediately.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;

import React from "react";

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
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-rose-100 px-3 py-1 bg-rose-50/60 text-[11px] font-semibold uppercase tracking-wide text-rose-700">
          <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
          FAQ
        </div>
        <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-slate-900">
          Questions people ask most
        </h2>
        <p className="mt-3 text-sm md:text-base text-slate-500 max-w-2xl mx-auto">
          Clear answers to common platform and donation questions.
        </p>
      </div>

      <div className="rounded-3xl border border-slate-100 bg-base-100 shadow-2xl p-6 md:p-8">
        <div className="space-y-3">
          {faqs.map((f, idx) => (
            <div key={idx} className="collapse collapse-arrow border border-slate-100 rounded-2xl">
              <input type="radio" name="faq-accordion" defaultChecked={idx === 0} />
              <div className="collapse-title text-sm md:text-base font-semibold text-slate-900">
                {f.q}
              </div>
              <div className="collapse-content">
                <p className="text-sm text-slate-600 leading-6">{f.a}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-[11px] text-slate-500">
          For urgent medical emergencies, contact your local hospital immediately.
        </p>
      </div>
    </section>
  );
};

export default FAQSection;

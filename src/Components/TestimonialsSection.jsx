import React from "react";
import { FiStar } from "react-icons/fi";

const testimonials = [
  {
    name: "Rahim H.",
    role: "Donor",
    quote:
      "The request details page is clear and fast. I confirmed a donation in seconds and the requester contacted me immediately.",
  },
  {
    name: "Sadia A.",
    role: "Volunteer",
    quote:
      "Filtering donors by district and upazila saved us time. This platform makes coordination far easier during emergencies.",
  },
  {
    name: "Nafis R.",
    role: "Requester",
    quote:
      "I posted a request late at night and got a donor response quickly. The status updates kept us confident.",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-12 md:py-16">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-rose-100 px-3 py-1 bg-rose-50/60 text-[11px] font-semibold uppercase tracking-wide text-rose-700">
          <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
          Testimonials
        </div>
        <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-slate-900">
          Trusted by donors and volunteers
        </h2>
        <p className="mt-3 text-sm md:text-base text-slate-500 max-w-2xl mx-auto">
          Real feedback from people who use the platform to help others.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {testimonials.map((t) => (
          <div key={t.name} className="rounded-3xl border border-slate-100 bg-base-100 shadow-xl p-6">
            <div className="flex items-center gap-1 text-amber-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <FiStar key={i} className="w-4 h-4" />
              ))}
            </div>
            <p className="mt-4 text-sm text-slate-700 leading-6">“{t.quote}”</p>
            <div className="mt-5 pt-4 border-t border-slate-100">
              <p className="font-bold text-slate-900">{t.name}</p>
              <p className="text-xs text-slate-500">{t.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;

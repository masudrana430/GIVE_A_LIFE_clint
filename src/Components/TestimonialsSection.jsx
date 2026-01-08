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
        <div className="inline-flex items-center gap-2 rounded-full border border-base-200 px-3 py-1 bg-base-100 text-[11px] font-semibold uppercase tracking-wide text-base-content/70">
          <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
          Testimonials
        </div>

        <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-base-content">
          Trusted by donors and volunteers
        </h2>

        <p className="mt-3 text-sm md:text-base text-base-content/70 max-w-2xl mx-auto">
          Real feedback from people who use the platform to help others.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {testimonials.map((t, idx) => (
          <div
            key={t.name}
            className="
              group relative overflow-hidden
              rounded-3xl border border-base-200 bg-base-100
              shadow-xl p-6 transition-all duration-200
              hover:shadow-2xl hover:-translate-y-0.5
            "
          >
            {/* soft accent glow */}
            <div
              className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full
                         bg-gradient-to-br from-rose-500/15 via-orange-400/10 to-transparent blur-3xl"
              aria-hidden="true"
            />

            {/* rating */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FiStar key={i} className="w-4 h-4" />
                ))}
              </div>

              <span className="text-[11px] font-semibold text-base-content/50">
                Verified feedback
              </span>
            </div>

            {/* quote */}
            <p className="mt-4 text-sm text-base-content/80 leading-6">
              “{t.quote}”
            </p>

            {/* footer */}
            <div className="mt-5 pt-4 border-t border-base-200 flex items-center justify-between gap-3">
              <div>
                <p className="font-bold text-base-content">{t.name}</p>
                <p className="text-xs text-base-content/60">{t.role}</p>
              </div>

              <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full border border-base-200 bg-base-200/40 text-base-content/70">
                #{String(idx + 1).padStart(2, "0")}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;

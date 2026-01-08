import React from "react";
import { FiZap, FiClock, FiLock } from "react-icons/fi";

const items = [
  {
    icon: FiZap,
    title: "Faster Matching",
    desc: "Quickly connect urgent requests with available donors.",
    chip: "border-rose-500/20 bg-rose-500/10 text-rose-500",
  },
  {
    icon: FiClock,
    title: "Time-Saving Flow",
    desc: "Simple request creation and clear donation status updates.",
    chip: "border-sky-500/20 bg-sky-500/10 text-sky-500",
  },
  {
    icon: FiLock,
    title: "Trusted Platform",
    desc: "Protected actions and structured data reduce spam and confusion.",
    chip: "border-emerald-500/20 bg-emerald-500/10 text-emerald-500",
  },
];

const HighlightsSection = () => {
  return (
    <section className="py-12 md:py-16">
      <div className="grid gap-4 lg:grid-cols-3">
        {items.map((it) => {
          const Icon = it.icon;
          return (
            <div
              key={it.title}
              className="
                rounded-3xl border border-base-200 bg-base-100
                shadow-xl p-6 transition-all duration-200
                hover:shadow-2xl hover:-translate-y-0.5
              "
            >
              <div
                className={`
                  inline-flex items-center gap-2 rounded-2xl border px-3 py-2
                  ${it.chip}
                `}
              >
                <Icon className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wide">
                  Highlight
                </span>
              </div>

              <h3 className="mt-4 text-xl font-extrabold text-base-content">
                {it.title}
              </h3>

              <p className="mt-2 text-sm text-base-content/70 leading-6">
                {it.desc}
              </p>

              {/* subtle divider for premium feel */}
              <div className="mt-5 h-px w-full bg-base-200" />

              <p className="mt-3 text-xs text-base-content/60">
                Built for speed, clarity, and trust in urgent situations.
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HighlightsSection;

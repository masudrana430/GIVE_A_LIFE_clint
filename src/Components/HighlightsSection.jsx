import React from "react";
import { FiZap, FiClock, FiLock } from "react-icons/fi";

const items = [
  {
    icon: FiZap,
    title: "Faster Matching",
    desc: "Quickly connect urgent requests with available donors.",
    tone: "bg-rose-50 text-rose-700 border-rose-100",
  },
  {
    icon: FiClock,
    title: "Time-Saving Flow",
    desc: "Simple request creation and clear donation status updates.",
    tone: "bg-sky-50 text-sky-700 border-sky-100",
  },
  {
    icon: FiLock,
    title: "Trusted Platform",
    desc: "Protected actions and structured data reduce spam and confusion.",
    tone: "bg-emerald-50 text-emerald-700 border-emerald-100",
  },
];

const HighlightsSection = () => {
  return (
    <section className="py-12 md:py-16">
      <div className="grid gap-4 lg:grid-cols-3">
        {items.map((it) => {
          const Icon = it.icon;
          return (
            <div key={it.title} className="rounded-3xl border border-slate-100 bg-base-100 shadow-xl p-6">
              <div className={`inline-flex items-center gap-2 rounded-2xl border px-3 py-2 ${it.tone}`}>
                <Icon className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wide">Highlight</span>
              </div>
              <h3 className="mt-4 text-xl font-extrabold text-slate-900">{it.title}</h3>
              <p className="mt-2 text-sm text-slate-600 leading-6">{it.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HighlightsSection;

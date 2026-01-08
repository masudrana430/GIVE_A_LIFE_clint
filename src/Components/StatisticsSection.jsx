import React from "react";

const stats = [
  { label: "Registered Donors", value: "12,000+" },
  { label: "Requests Created", value: "4,500+" },
  { label: "Donations Confirmed", value: "2,800+" },
  { label: "Avg. Response Time", value: "< 20 mins" },
];

const StatisticsSection = () => {
  return (
    <section className="py-12 md:py-16">
      <div
        className="
          relative overflow-hidden
          rounded-3xl border border-base-200 bg-base-100
          shadow-2xl p-6 md:p-8
        "
      >
        {/* soft premium glow (works in both themes) */}
        <div
          className="pointer-events-none absolute -top-20 -right-20 h-56 w-56 rounded-full
                     bg-gradient-to-br from-rose-500/15 via-orange-400/10 to-transparent blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full
                     bg-gradient-to-tr from-sky-400/10 via-emerald-400/10 to-transparent blur-3xl"
          aria-hidden="true"
        />

        <div className="relative flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div
              className="
                inline-flex items-center gap-2 rounded-full px-3 py-1
                border border-base-200 bg-base-200/40
                text-[11px] font-semibold uppercase tracking-wide text-base-content/70
              "
            >
              <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
              Statistics
            </div>

            <h2 className="mt-3 text-2xl md:text-3xl font-extrabold text-base-content">
              Impact you can measure
            </h2>

            <p className="mt-2 text-sm text-base-content/70 max-w-xl">
              Transparent activity metrics help build trust and encourage participation.
            </p>
          </div>

          <div className="text-xs text-base-content/60">
            Updated in near real-time
          </div>
        </div>

        <div className="relative mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="
                rounded-2xl border border-base-200 bg-base-100
                p-5 shadow-lg transition-all duration-200
                hover:shadow-2xl hover:-translate-y-0.5
              "
            >
              <div className="text-2xl md:text-3xl font-extrabold text-base-content">
                {s.value}
              </div>
              <div className="mt-1 text-xs md:text-sm text-base-content/60">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;

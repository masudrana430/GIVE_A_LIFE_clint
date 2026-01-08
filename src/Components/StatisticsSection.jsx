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
      <div className="rounded-3xl border border-slate-100 bg-gradient-to-br from-rose-50 via-white to-orange-50 shadow-2xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-rose-100 px-3 py-1 bg-white/70 text-[11px] font-semibold uppercase tracking-wide text-rose-700">
              <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
              Statistics
            </div>
            <h2 className="mt-3 text-2xl md:text-3xl font-extrabold text-slate-900">
              Impact you can measure
            </h2>
            <p className="mt-2 text-sm text-slate-600 max-w-xl">
              Transparent activity metrics help build trust and encourage participation.
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl border border-slate-100 bg-base-100 p-5 shadow-lg">
              <div className="text-2xl md:text-3xl font-extrabold text-slate-900">{s.value}</div>
              <div className="mt-1 text-xs md:text-sm text-slate-500">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;

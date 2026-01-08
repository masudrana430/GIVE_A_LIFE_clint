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
      rounded-3xl border border-base-200 shadow-2xl p-6 md:p-8
      bg-base-100
      bg-gradient-to-br from-base-100 via-base-100 to-base-200
      dark:from-base-200 dark:via-base-100 dark:to-base-300
    "
  >
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
      <div>
        <div
          className="
            inline-flex items-center gap-2 rounded-full px-3 py-1
            border border-base-200
            bg-base-100/70
            text-[11px] font-semibold uppercase tracking-wide
            text-base-content/70
            backdrop-blur
          "
        >
          <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
          Statistics
        </div>

        <h2 className="mt-3 text-2xl md:text-3xl font-extrabold text-base-content">
          Impact you can measure
        </h2>

        <p className="mt-2 text-sm text-base-content/70 max-w-xl">
          Transparent activity metrics help build trust and encourage
          participation.
        </p>
      </div>
    </div>

    <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s) => (
        <div
          key={s.label}
          className="
            rounded-2xl border border-base-200 p-5
            bg-base-100/80 dark:bg-base-100/60
            shadow-lg
            hover:shadow-xl transition
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

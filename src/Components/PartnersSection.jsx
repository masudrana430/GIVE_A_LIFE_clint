import React from "react";

const partners = [
  "City Hospital",
  "Care Clinic",
  "Blood Bank BD",
  "Health NGO",
  "Volunteer Team",
];

const PartnersSection = () => {
  return (
    <section className="py-12 md:py-16">
      <div className="rounded-3xl border border-base-200 bg-base-100 shadow-2xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div
              className="
            inline-flex items-center gap-2 rounded-full px-3 py-1
            border border-base-200
            bg-base-100/70 backdrop-blur
            text-[11px] font-semibold uppercase tracking-wide
            text-base-content/70
          "
            >
              <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
              Partners
            </div>

            <h2 className="mt-3 text-2xl md:text-3xl font-extrabold text-base-content">
              Working with hospitals & volunteers
            </h2>

            <p className="mt-2 text-sm text-base-content/70 max-w-xl">
              Collaboration helps requests get verified and matched faster.
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {partners.map((p) => (
            <span
              key={p}
              className="
            px-4 py-2 rounded-full text-sm font-semibold
            border border-base-200
            bg-base-200/70 dark:bg-base-200/40
            text-base-content/80
            shadow-sm hover:shadow-md transition
          "
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;

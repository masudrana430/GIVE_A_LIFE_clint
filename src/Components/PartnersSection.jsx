import React from "react";

const partners = ["City Hospital", "Care Clinic", "Blood Bank BD", "Health NGO", "Volunteer Team"];

const PartnersSection = () => {
  return (
    <section className="py-12 md:py-16">
      <div className="rounded-3xl border border-slate-100 bg-base-100 shadow-2xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-rose-100 px-3 py-1 bg-rose-50/60 text-[11px] font-semibold uppercase tracking-wide text-rose-700">
              <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
              Partners
            </div>
            <h2 className="mt-3 text-2xl md:text-3xl font-extrabold text-slate-900">
              Working with hospitals & volunteers
            </h2>
            <p className="mt-2 text-sm text-slate-500 max-w-xl">
              Collaboration helps requests get verified and matched faster.
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {partners.map((p) => (
            <span
              key={p}
              className="px-4 py-2 rounded-full border border-slate-100 bg-slate-50 text-slate-700 text-sm font-semibold"
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

import React from "react";
import { FiHeart, FiShield } from "react-icons/fi";

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
      <div
        className="
          rounded-3xl border border-base-200 shadow-2xl p-6 md:p-8
          bg-base-100
          bg-gradient-to-br from-base-100 via-base-100 to-base-200/70
          dark:from-base-200/40 dark:via-base-100 dark:to-base-300/40
        "
      >
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div
              className="
                inline-flex items-center gap-2 rounded-full px-3 py-1
                border border-base-200 bg-base-100/70 backdrop-blur
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
              Collaboration helps requests get verified, prioritized, and matched faster.
            </p>

            <div className="mt-4 flex flex-wrap gap-2 text-[11px] text-base-content/70">
              <span className="inline-flex items-center gap-2 rounded-full border border-base-200 bg-base-100/70 px-3 py-1">
                <FiShield className="h-3.5 w-3.5" />
                Verified coordination
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-base-200 bg-base-100/70 px-3 py-1">
                <FiHeart className="h-3.5 w-3.5" />
                Community-driven support
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {partners.map((p) => (
            <span
              key={p}
              className="
                group inline-flex items-center gap-2
                rounded-full px-4 py-2 text-sm font-semibold
                border border-base-200
                bg-base-100/70 dark:bg-base-100/40
                text-base-content/80
                shadow-sm hover:shadow-md
                hover:-translate-y-[1px] transition
              "
            >
              <span
                className="
                  h-2 w-2 rounded-full
                  bg-rose-500/80
                  shadow-[0_0_0_4px_rgba(244,63,94,0.15)]
                "
              />
              {p}
            </span>
          ))}
        </div>

        <p className="mt-6 text-[11px] text-base-content/60">
          Partner names shown here are placeholders—replace them with real organizations or fetch dynamically later.
        </p>
      </div>
    </section>
  );
};

export default PartnersSection;

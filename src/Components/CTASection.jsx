import React from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiDroplet } from "react-icons/fi";

const CTASection = () => {
  return (
    <section className="py-12 md:py-16">
      <div
        className="
          relative overflow-hidden rounded-3xl
          border border-base-200 shadow-2xl
          bg-gradient-to-br from-[#DC2626] via-[#EA384D] to-[#F97316]
          p-6 md:p-10 text-white
        "
      >
        {/* Theme-safe overlays to improve readability (especially dark mode) */}
        <div
          className="pointer-events-none absolute inset-0 bg-black/5 dark:bg-black/25"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/15 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-28 -left-28 h-80 w-80 rounded-full bg-black/15 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="max-w-2xl">
            <div
              className="
                inline-flex items-center gap-2 rounded-full
                bg-white/10 border border-white/15
                px-3 py-1 text-[11px] font-semibold
                uppercase tracking-[0.25em] backdrop-blur
              "
            >
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10">
                <FiDroplet className="h-3.5 w-3.5" />
              </span>
              Ready to help
            </div>

            <h2 className="mt-3 text-2xl md:text-3xl font-extrabold leading-tight">
              Join the donor community and save lives
            </h2>

            <p className="mt-2 text-sm md:text-base text-white/90">
              Register today, keep your profile updated, and respond quickly when a request appears.
            </p>

            {/* Optional micro trust row */}
            <div className="mt-4 flex flex-wrap gap-3 text-[11px] text-white/80">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 border border-white/15">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                Verified donors respond faster
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 border border-white/15">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-300" />
                Real-time status updates
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/auth/register"
              className="
                btn rounded-full border-0 px-6 font-semibold
                bg-white text-slate-900
                shadow-lg shadow-black/10
                hover:bg-white/95 hover:shadow-black/20
                active:scale-[0.99]
                transition
              "
            >
              Become a Donor
              <FiArrowRight className="ml-2" />
            </Link>

            <Link
              to="/donation-requests"
              className="
                btn rounded-full px-6
                bg-transparent text-white
                border border-white/40
                hover:bg-white/10 hover:border-white/70
                active:scale-[0.99]
                transition
              "
            >
              View Requests
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

import React from "react";
import { FiUserPlus, FiFileText, FiCheckCircle, FiHeart } from "react-icons/fi";
import { Link } from "react-router-dom";

const steps = [
  {
    icon: FiUserPlus,
    title: "Register",
    desc: "Create your donor profile and set your location & blood group.",
    chip: "border-rose-500/20 bg-rose-500/10 text-rose-500",
  },
  {
    icon: FiFileText,
    title: "Request",
    desc: "Patients/volunteers create a request with full donation details.",
    chip: "border-amber-500/20 bg-amber-500/10 text-amber-500",
  },
  {
    icon: FiCheckCircle,
    title: "Confirm",
    desc: "Donors confirm the request and status becomes in progress.",
    chip: "border-sky-500/20 bg-sky-500/10 text-sky-500",
  },
  {
    icon: FiHeart,
    title: "Donate",
    desc: "Complete the donation and mark it done to help close the request.",
    chip: "border-emerald-500/20 bg-emerald-500/10 text-emerald-500",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-12 md:py-16">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-base-200 px-3 py-1 bg-base-100 text-[11px] font-semibold uppercase tracking-wide text-base-content/70">
          <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
          How it works
        </div>

        <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-base-content">
          A simple flow that saves time
        </h2>

        <p className="mt-3 text-sm md:text-base text-base-content/70 max-w-2xl mx-auto">
          Designed to reduce delay during emergencies by keeping actions clear
          and fast.
        </p>
      </div>

      {/* Steps */}
      <div className="relative">
        {/* connector line (desktop) */}
        <div className="pointer-events-none hidden lg:block absolute left-0 right-0 top-[44px] h-px bg-base-200" />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, idx) => {
            const Icon = s.icon;

            return (
              <div
                key={s.title}
                className="
                  rounded-3xl border border-base-200 bg-base-100
                  shadow-xl p-6 transition-all duration-200
                  hover:shadow-2xl hover:-translate-y-0.5
                "
              >
                <div className="flex items-start justify-between">
                  <span
                    className={`
                      inline-flex h-11 w-11 items-center justify-center
                      rounded-2xl border ${s.chip}
                    `}
                  >
                    <Icon className="w-5 h-5" />
                  </span>

                  <span className="text-xs font-extrabold tracking-widest text-base-content/40">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="mt-4 text-lg font-bold text-base-content">
                  {s.title}
                </h3>

                <p className="mt-2 text-sm text-base-content/70 leading-6">
                  {s.desc}
                </p>

                <div className="mt-5 h-px w-full bg-base-200" />
                <p className="mt-3 text-[11px] text-base-content/60">
                  Step {idx + 1} of {steps.length}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/auth/register"
          className="
            btn rounded-full border-0 px-6
            bg-gradient-to-r from-rose-500 via-red-500 to-orange-400
            text-white font-semibold shadow-lg shadow-rose-300/60
            hover:shadow-rose-400/80 transition
          "
        >
          Become a Donor
        </Link>

        <Link
          to="/donation-requests"
          className="btn btn-outline rounded-full border-base-200 text-base-content hover:bg-base-200/60"
        >
          View Requests
        </Link>
      </div>
    </section>
  );
};

export default HowItWorksSection;

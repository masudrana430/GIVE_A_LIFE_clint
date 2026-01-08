import React from "react";
import { FiUserPlus, FiFileText, FiCheckCircle, FiHeart } from "react-icons/fi";
import { Link } from "react-router-dom";

const steps = [
  {
    icon: FiUserPlus,
    title: "Register",
    desc: "Create your donor profile and set your location & blood group.",
  },
  {
    icon: FiFileText,
    title: "Request",
    desc: "Patients/volunteers create a request with full donation details.",
  },
  {
    icon: FiCheckCircle,
    title: "Confirm",
    desc: "Donors confirm the request and status becomes in progress.",
  },
  {
    icon: FiHeart,
    title: "Donate",
    desc: "Complete the donation and mark it done to help close the request.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-12 md:py-16">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-rose-100 px-3 py-1 bg-rose-50/60 text-[11px] font-semibold uppercase tracking-wide text-rose-700">
          <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
          How it works
        </div>
        <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-base-content">
          A simple flow that saves time
        </h2>
        <p className="mt-3 text-sm md:text-base text-base-content/60 max-w-2xl mx-auto">
          Designed to reduce delay during emergencies by keeping actions clear
          and fast.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={s.title}
              className="rounded-3xl border border-base-200 bg-base-100 shadow-xl p-6"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 border border-rose-100">
                  <Icon className="w-5 h-5" />
                </span>
                <span className="text-xs font-extrabold text-slate-300">
                  0{idx + 1}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-bold text-base-content">
                {s.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-6">{s.desc}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/auth/register"
          className="btn rounded-full border-0 px-6
            bg-gradient-to-r from-rose-500 via-red-500 to-orange-400
            text-white font-semibold shadow-lg shadow-rose-300/60
            hover:shadow-rose-400/80 transition"
        >
          Become a Donor
        </Link>
        <Link to="/donation-requests" className="btn btn-outline rounded-full">
          View Requests
        </Link>
      </div>
    </section>
  );
};

export default HowItWorksSection;

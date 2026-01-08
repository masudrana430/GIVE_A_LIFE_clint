import React from "react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-12 md:py-16">
      <div className="rounded-3xl overflow-hidden border border-slate-100 shadow-2xl bg-gradient-to-br from-[#DC2626] via-[#EA384D] to-[#F97316] p-6 md:p-10 text-white">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em]">
              READY TO HELP
            </div>
            <h2 className="mt-3 text-2xl md:text-3xl font-extrabold">
              Join the donor community and save lives
            </h2>
            <p className="mt-2 text-sm text-white/90 max-w-xl">
              Register today, keep your profile updated, and respond quickly when a request appears.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/auth/register"
              className="btn rounded-full border-0 px-6 bg-white text-black font-semibold"
            >
              Become a Donor
            </Link>
            <Link to="/donation-requests" className="btn btn-outline rounded-full text-white border-white/40">
              View Requests
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

import React from "react";
import { FiShield, FiSearch, FiEdit3, FiBell, FiMapPin, FiHeart } from "react-icons/fi";
import { Link } from "react-router-dom";

const services = [
  {
    icon: FiSearch,
    title: "Find Donors Fast",
    desc: "Search by blood group and location to find nearby registered donors quickly.",
    to: "/search-donors",
    badge: "Search",
  },
  {
    icon: FiEdit3,
    title: "Create Blood Requests",
    desc: "Post a request with hospital, time, and location so donors can respond faster.",
    to: "/dashboard/create-donation-request",
    badge: "Request",
  },
  {
    icon: FiBell,
    title: "Real-Time Updates",
    desc: "Track request status and donor assignment in a clean, organized dashboard.",
    to: "/dashboard",
    badge: "Dashboard",
  },
  {
    icon: FiShield,
    title: "Secure Access",
    desc: "Role-based access and protected actions help keep the platform safe and reliable.",
    to: "/auth/login",
    badge: "Security",
  },
  {
    icon: FiMapPin,
    title: "Location-Based Matching",
    desc: "District and upazila filters improve donor matching and response time.",
    to: "/search-donors",
    badge: "Location",
  },
  {
    icon: FiHeart,
    title: "Community Impact",
    desc: "Every confirmed donation is one step closer to saving a life in need.",
    to: "/donation-requests",
    badge: "Impact",
  },
];

const ServicesSection = () => {
  return (
    <section className="py-12 md:py-16">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-rose-100 px-3 py-1 bg-rose-50/60 text-[11px] font-semibold uppercase tracking-wide text-rose-700">
          <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
          Services
        </div>
        <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-slate-900">
          Everything you need to{" "}
          <span className="bg-gradient-to-r from-rose-500 via-red-500 to-orange-400 bg-clip-text text-transparent">
            donate & connect
          </span>
        </h2>
        <p className="mt-3 text-sm md:text-base text-slate-500 max-w-2xl mx-auto">
          Built to help donors, patients, and volunteers coordinate faster with less friction.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.title}
              className="rounded-3xl border border-slate-100 bg-base-100 shadow-xl p-6 hover:shadow-2xl transition"
            >
              <div className="flex items-start justify-between">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 border border-rose-100">
                  <Icon className="w-5 h-5" />
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wide px-2 py-1 rounded-full bg-slate-100 text-slate-700">
                  {s.badge}
                </span>
              </div>

              <h3 className="mt-4 text-lg font-bold text-slate-900">{s.title}</h3>
              <p className="mt-2 text-sm text-slate-600 leading-6">{s.desc}</p>

              <div className="mt-4">
                <Link
                  to={s.to}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-rose-600 hover:text-rose-700"
                >
                  Learn more <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ServicesSection;

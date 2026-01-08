// AboutUs.jsx
import React from "react";

// If you're using react-router, you can swap <a> with <Link> easily.
// import { Link } from "react-router-dom";

const defaultStats = [
  { label: "Donors Connected", value: "10K+" },
  { label: "Requests Fulfilled", value: "3.2K+" },
  { label: "Partner Hospitals", value: "120+" },
  { label: "Avg. Response Time", value: "< 15 min" },
];

const defaultFeatures = [
  {
    title: "Donor Registration",
    desc: "Simple onboarding with profile details, blood group, availability, and location.",
  },
  {
    title: "Blood Request Matching",
    desc: "Connect urgent requests with eligible donors quickly and reliably.",
  },
  {
    title: "Donor & Request Management",
    desc: "Track requests, manage donors, and keep everything organized in one place.",
  },
  {
    title: "Awareness & Content",
    desc: "Share campaigns, eligibility tips, and donation guidelines through CMS content.",
  },
  {
    title: "Role-Based Access Control",
    desc: "Secure access for Admin, Volunteer/Staff, and Donor with controlled permissions.",
  },
  {
    title: "Built with MERN",
    desc: "Fast, scalable architecture using MongoDB, Express, React, and Node.js.",
  },
];

function Icon({ name }) {
  // Minimal inline icons (no deps)
  const common = "h-5 w-5";
  if (name === "heart")
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 21s-7.5-4.6-9.5-9.1C.9 8.6 3.1 6 6 6c1.8 0 3.1 1 4 2.2C10.9 7 12.2 6 14 6c2.9 0 5.1 2.6 3.5 5.9C19.5 16.4 12 21 12 21z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    );

  if (name === "shield")
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 3l8 4v6c0 5-3.4 9-8 10-4.6-1-8-5-8-10V7l8-4z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    );

  if (name === "bolt")
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M13 2L3 14h7l-1 8 12-14h-7l-1-6z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    );

  return null;
}

export default function AboutUs({
  appName = "Blood Donation Application",
  stats = defaultStats,
  features = defaultFeatures,
  primaryCta = { label: "Become a Donor", href: "/register" },
  secondaryCta = { label: "Request Blood", href: "/request-blood" },
}) {
  return (
    <section className="w-full bg-base-100">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-base-300 px-3 py-1 text-sm text-base-content/80">
              <span className="text-error">
                <Icon name="heart" />
              </span>
              About {appName}
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Connecting donors with those in need—fast, secure, and human-first.
            </h2>

            <p className="mt-4 text-base leading-7 text-base-content/70">
              Our mission is to make blood donation coordination simple and reliable.
              We help donors register easily, enable urgent blood requests, and support
              organizations with tools to manage donors, content, and access securely.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={primaryCta.href}
                className="inline-flex items-center gap-2
                            rounded-full px-6 py-2.5
                            bg-gradient-to-r from-[#DC2626] via-[#EA384D] to-[#F97316]
                            text-sm sm:text-base font-semibold text-white
                            shadow-lg shadow-red-300/60
                            transition
                            hover:shadow-red-400/80"
              >
                {primaryCta.label}
              </a>
              <a
                href={secondaryCta.href}
                className="btn btn-outline"
              >
                {secondaryCta.label}
              </a>
            </div>

            <div className="mt-6 flex flex-wrap gap-6 text-sm text-base-content/70">
              <div className="inline-flex items-center gap-2">
                <span className="text-success">
                  <Icon name="bolt" />
                </span>
                Faster matching for urgent needs
              </div>
              <div className="inline-flex items-center gap-2">
                <span className="text-info">
                  <Icon name="shield" />
                </span>
                Role-based secure access
              </div>
            </div>
          </div>

          {/* Stats Card */}
          <div className="rounded-2xl border border-base-300 bg-base-200/40 p-6 shadow-sm">
            <h3 className="text-lg font-semibold">Our Impact</h3>
            <p className="mt-1 text-sm text-base-content/70">
              A snapshot of what we aim to improve every day.
            </p>

            <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-2">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-base-300 bg-base-100 p-4"
                >
                  <div className="text-2xl font-bold">{s.value}</div>
                  <div className="mt-1 text-xs text-base-content/70">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-xl bg-base-100 p-4">
              <h4 className="font-semibold">What we believe</h4>
              <ul className="mt-2 space-y-2 text-sm text-base-content/70">
                <li className="flex gap-2">
                  <span className="mt-0.5 text-error">•</span>
                  Every minute matters in an emergency.
                </li>
                <li className="flex gap-2">
                  <span className="mt-0.5 text-error">•</span>
                  Privacy and consent must be respected.
                </li>
                <li className="flex gap-2">
                  <span className="mt-0.5 text-error">•</span>
                  Simple UX leads to more real-world impact.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-14">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold">What this platform includes</h3>
              <p className="mt-2 max-w-2xl text-sm text-base-content/70">
                Core features designed to support donors, recipients, and organizers.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm"
              >
                <h4 className="text-base font-semibold">{f.title}</h4>
                <p className="mt-2 text-sm leading-6 text-base-content/70">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-14 rounded-2xl border border-base-300 bg-base-200/40 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-xl font-bold">Want to help save lives?</h3>
              <p className="mt-1 text-sm text-base-content/70">
                Register as a donor or submit a request in just a few steps.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href={primaryCta.href} className="inline-flex items-center gap-2
                            rounded-full px-6 py-2.5
                            bg-gradient-to-r from-[#DC2626] via-[#EA384D] to-[#F97316]
                            text-sm sm:text-base font-semibold text-white
                            shadow-lg shadow-red-300/60
                            transition
                            hover:shadow-red-400/80">
                {primaryCta.label}
              </a>
              <a href={secondaryCta.href} className="btn btn-outline">
                {secondaryCta.label}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

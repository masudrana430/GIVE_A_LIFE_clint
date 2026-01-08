// src/Components/FeaturedSection.jsx
import { Link } from "react-router-dom";
import {
  FiDroplet,
  FiMapPin,
  FiHeart,
  FiArrowRight,
  FiShield,
} from "react-icons/fi";
import Container from "./Container";

const FeaturedSection = () => {
  return (
    <section className="py-10 md:py-16">
      <Container>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <p
              className="
                inline-flex items-center gap-2 px-2.5 py-1 rounded-full
                border border-base-200 bg-base-100/70 backdrop-blur
                text-[11px] font-semibold uppercase tracking-[0.25em]
                text-base-content/70
              "
            >
              <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
              Featured for you
            </p>

            <h2 className="mt-3 text-2xl md:text-3xl font-extrabold text-base-content">
              Make every drop count
            </h2>

            <p className="mt-2 text-sm md:text-base text-base-content/70 max-w-2xl">
              Discover key actions you can take right now—donate blood, respond
              to urgent requests, or support the platform that connects donors
              and patients.
            </p>
          </div>

          <div className="text-xs md:text-sm text-base-content/60">
            <p className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Real-time data from your account
            </p>
            <p className="mt-1">
              Actions here are tailored to how people typically use BloodCare-style
              platforms.
            </p>
          </div>
        </div>

        {/* Featured cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Urgent Requests */}
          <div
            className="
              group rounded-2xl overflow-hidden
              border border-base-200
              bg-base-100
              bg-gradient-to-br from-base-100 via-base-100 to-base-200
              dark:from-base-200 dark:via-base-100 dark:to-base-300
              shadow-sm hover:shadow-xl hover:-translate-y-0.5
              transition-all duration-200
            "
          >
            <div className="p-5 h-full flex flex-col">
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-rose-600 text-white text-[11px] font-semibold">
                  <FiDroplet className="w-3.5 h-3.5" />
                  Urgent requests
                </div>
                <span className="text-[11px] font-semibold text-base-content/70">
                  High impact
                </span>
              </div>

              <h3 className="text-sm md:text-base font-semibold text-base-content">
                Respond to pending blood requests
              </h3>

              <p className="mt-2 text-xs md:text-sm text-base-content/70 flex-1">
                View all pending blood donation requests and volunteer when you
                are available and eligible to donate.
              </p>

              <div className="mt-4 flex items-center justify-between text-xs text-base-content/70">
                <div className="inline-flex items-center gap-1">
                  <FiMapPin className="w-3.5 h-3.5 text-rose-500" />
                  Filter by district &amp; upazila
                </div>

                <Link
                  to="/public-donation-requests"
                  className="
                    inline-flex items-center gap-1 font-semibold
                    text-rose-500 hover:text-rose-400
                  "
                >
                  View requests
                  <FiArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>

              <div
                className="
                  pointer-events-none mt-5 h-px w-full
                  bg-gradient-to-r from-transparent via-rose-500/30 to-transparent
                  opacity-0 group-hover:opacity-100 transition
                "
                aria-hidden="true"
              />
            </div>
          </div>

          {/* Card 2: Donor profile */}
          <div
            className="
              group rounded-2xl overflow-hidden
              border border-base-200
              bg-base-100
              bg-gradient-to-br from-base-100 via-base-100 to-base-200
              dark:from-base-200 dark:via-base-100 dark:to-base-300
              shadow-sm hover:shadow-xl hover:-translate-y-0.5
              transition-all duration-200
            "
          >
            <div className="p-5 h-full flex flex-col">
              <div className="flex items-center justify-between gap-2 mb-3">
                <div
                  className="
                    inline-flex items-center gap-2 px-2.5 py-1 rounded-full
                    bg-rose-500/10 text-rose-500 border border-rose-500/20
                    text-[11px] font-semibold
                  "
                >
                  <FiHeart className="w-3.5 h-3.5" />
                  Donor profile
                </div>
                <span className="text-[11px] font-semibold text-rose-500">
                  Recommended
                </span>
              </div>

              <h3 className="text-sm md:text-base font-semibold text-base-content">
                Strengthen your donor identity
              </h3>

              <p className="mt-2 text-xs md:text-sm text-base-content/70 flex-1">
                Keep your name, avatar and contact details up-to-date so
                patients and volunteers can recognise and trust your offers to
                donate.
              </p>

              <ul className="mt-3 space-y-1.5 text-xs text-base-content/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-rose-500" />
                  Use a clear display name that matches your ID.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-rose-400" />
                  Add a recognisable profile image for easier coordination.
                </li>
              </ul>

              <div className="mt-4 flex items-center justify-between text-xs text-base-content/70">
                <span>Visible on requests you create or respond to.</span>
                <Link
                  to="/my-profile"
                  className="
                    inline-flex items-center gap-1 font-semibold
                    text-rose-500 hover:text-rose-400
                  "
                >
                  Edit profile
                  <FiArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>

              <div
                className="
                  pointer-events-none mt-5 h-px w-full
                  bg-gradient-to-r from-transparent via-rose-500/30 to-transparent
                  opacity-0 group-hover:opacity-100 transition
                "
                aria-hidden="true"
              />
            </div>
          </div>

          {/* Card 3: Funding */}
          <div
            className="
              group rounded-2xl overflow-hidden
              border border-base-200
              bg-base-100
              bg-gradient-to-br from-base-100 via-base-100 to-base-200
              dark:from-base-200 dark:via-base-100 dark:to-base-300
              shadow-sm hover:shadow-xl hover:-translate-y-0.5
              transition-all duration-200
            "
          >
            <div className="p-5 h-full flex flex-col">
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-neutral text-neutral-content text-[11px] font-semibold">
                  <FiShield className="w-3.5 h-3.5" />
                  Platform support
                </div>
                <span className="text-[11px] font-semibold text-base-content/70">
                  Optional
                </span>
              </div>

              <h3 className="text-sm md:text-base font-semibold text-base-content">
                Help keep the service running
              </h3>

              <p className="mt-2 text-xs md:text-sm text-base-content/70 flex-1">
                If you cannot donate blood right now, you can still support the
                platform through secure funding to maintain infrastructure and
                outreach.
              </p>

              <div className="mt-3 text-xs text-base-content/60 space-y-1.5">
                <p>• Stripe-powered payments, encrypted end-to-end.</p>
                <p>• Funds go towards system maintenance and awareness campaigns.</p>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-base-content/70">
                <span className="inline-flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Secure &amp; audited
                </span>
                <Link
                  to="/funding"
                  className="
                    inline-flex items-center gap-1 font-semibold
                    text-base-content hover:text-base-content/80
                  "
                >
                  Open funding
                  <FiArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>

              <div
                className="
                  pointer-events-none mt-5 h-px w-full
                  bg-gradient-to-r from-transparent via-base-content/15 to-transparent
                  opacity-0 group-hover:opacity-100 transition
                "
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default FeaturedSection;

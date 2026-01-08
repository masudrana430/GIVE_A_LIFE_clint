import React from "react";
import Container from "../Components/Container";
import { FiLock, FiShield, FiMail } from "react-icons/fi";

const PrivacyPolicy = () => {
  const updated = "January 8, 2026";

  return (
    <section className="py-12 md:py-16">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="rounded-3xl border border-base-200 bg-base-100 shadow-2xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-rose-100 px-3 py-1 bg-rose-50/60 text-[11px] font-semibold uppercase tracking-wide text-rose-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                  Privacy Policy
                </div>

                <h1 className="mt-3 text-3xl md:text-4xl font-extrabold text-base-content">
                  Your privacy matters
                </h1>

                <p className="mt-3 text-sm md:text-base text-base-content/60 leading-6">
                  This Privacy Policy explains what information we collect, how
                  we use it, and the choices you have. If you have questions,
                  contact us any time.
                </p>
              </div>

              <div className="rounded-2xl border border-base-200 bg-base-200/60 px-4 py-3">
                <p className="text-[11px] uppercase tracking-wide text-base-content/60 font-semibold">
                  Last updated
                </p>
                <p className="text-sm font-bold text-base-content mt-1">
                  {updated}
                </p>
              </div>
            </div>

            {/* Highlights */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="rounded-2xl border border-base-200 bg-base-200/60 p-4">
                <p className="font-semibold text-base-content flex items-center gap-2">
                  <FiLock className="w-4 h-4 text-rose-600" />
                  Data minimization
                </p>
                <p className="mt-1 text-xs text-base-content/60">
                  We collect only what is needed to run the platform.
                </p>
              </div>

              <div className="rounded-2xl border border-base-200 bg-base-200/60 p-4">
                <p className="font-semibold text-base-content flex items-center gap-2">
                  <FiShield className="w-4 h-4 text-emerald-600" />
                  Secure handling
                </p>
                <p className="mt-1 text-xs text-base-content/60">
                  We use standard security controls to protect accounts.
                </p>
              </div>

              <div className="rounded-2xl border border-base-200 bg-base-200/60 p-4">
                <p className="font-semibold text-base-content flex items-center gap-2">
                  <FiMail className="w-4 h-4 text-sky-600" />
                  Support contact
                </p>
                <p className="mt-1 text-xs text-base-content/60">
                  Email us for privacy requests or questions.
                </p>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="mt-6 rounded-3xl border border-base-200 bg-base-100 shadow-2xl p-6 md:p-8 space-y-6">
            <div>
              <h2 className="text-xl font-extrabold text-base-content">
                1. Information we collect
              </h2>
              <ul className="mt-2 list-disc pl-5 text-sm text-slate-600 space-y-2">
                <li>
                  <span className="font-semibold text-base-content">
                    Account data:
                  </span>{" "}
                  name, email, and authentication details (e.g., Firebase user
                  ID).
                </li>
                <li>
                  <span className="font-semibold text-base-content">
                    Profile data:
                  </span>{" "}
                  blood group, district, upazila, and availability (if you
                  provide it).
                </li>
                <li>
                  <span className="font-semibold text-base-content">
                    Request data:
                  </span>{" "}
                  donation requests you create (recipient info, hospital, time,
                  location, message).
                </li>
                <li>
                  <span className="font-semibold text-base-content">
                    Usage data:
                  </span>{" "}
                  basic logs needed for reliability, security, and debugging.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-extrabold text-base-content">
                2. How we use your information
              </h2>
              <ul className="mt-2 list-disc pl-5 text-sm text-slate-600 space-y-2">
                <li>
                  Provide core features like donor search and request
                  management.
                </li>
                <li>Authenticate users and prevent unauthorized access.</li>
                <li>
                  Show relevant donor/request information to enable
                  coordination.
                </li>
                <li>
                  Improve platform performance, reliability, and user
                  experience.
                </li>
                <li>
                  Respond to support inquiries and communicate important
                  updates.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-extrabold text-base-content">
                3. What we share (and what we do not)
              </h2>
              <p className="mt-2 text-sm text-slate-600 leading-6">
                We do not sell your personal information. Limited information
                may be shared only to support the donation coordination
                workflow.
              </p>
              <ul className="mt-2 list-disc pl-5 text-sm text-slate-600 space-y-2">
                <li>
                  When you confirm a donation, your name and email may be shown
                  to the requester.
                </li>
                <li>
                  When you create a request, request details are visible to
                  donors/volunteers to enable response.
                </li>
                <li>
                  We may share information if required by law or to protect
                  platform safety.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-extrabold text-base-content">
                4. Data security
              </h2>
              <p className="mt-2 text-sm text-slate-600 leading-6">
                We use common security practices (authentication, access
                control, encrypted transport) to help protect your data. No
                method is 100% secure; please use strong passwords and keep your
                device safe.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-extrabold text-base-content">
                5. Data retention
              </h2>
              <p className="mt-2 text-sm text-slate-600 leading-6">
                We retain information as long as needed to provide the service,
                comply with legal obligations, resolve disputes, and enforce
                agreements.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-extrabold text-base-content">
                6. Your choices
              </h2>
              <ul className="mt-2 list-disc pl-5 text-sm text-slate-600 space-y-2">
                <li>Update your profile information from your dashboard.</li>
                <li>Choose what details you share in requests and profile.</li>
                <li>
                  Request account deletion or data export by contacting support.
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-base-200 bg-base-200/60 p-4">
              <h3 className="font-bold text-base-content">Contact</h3>
              <p className="mt-1 text-sm text-slate-600">
                For privacy questions or requests, email:{" "}
                <span className="font-semibold text-rose-600">
                  support@blood-donation.app
                </span>
              </p>
            </div>

            <p className="text-[11px] text-base-content/60">
              This page is a general template for your project. For production
              use, review with your organization/legal advisor and match your
              actual data flows.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default PrivacyPolicy;

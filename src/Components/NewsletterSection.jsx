import React, { useState } from "react";
import { FiMail } from "react-icons/fi";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ type: "", msg: "" });

  const onSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setStatus({ type: "error", msg: "Please enter a valid email." });
      return;
    }

    setStatus({ type: "success", msg: "Subscribed! You’ll receive updates soon." });
    setEmail("");
    setTimeout(() => setStatus({ type: "", msg: "" }), 2500);
  };

  return (
    <section className="py-12 md:py-16">
      <div
        className="
          relative overflow-hidden
          rounded-3xl border border-base-200
          bg-base-100 shadow-2xl
          p-6 md:p-8
        "
      >
        {/* Premium background glows (works in dark + light) */}
        <div
          className="
            pointer-events-none absolute -top-20 -right-20 h-56 w-56 rounded-full
            bg-gradient-to-br from-rose-500/15 via-orange-400/10 to-transparent
            blur-3xl
          "
          aria-hidden="true"
        />
        <div
          className="
            pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full
            bg-gradient-to-tr from-sky-400/10 via-emerald-400/10 to-transparent
            blur-3xl
          "
          aria-hidden="true"
        />

        <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Left content */}
          <div>
            <div
              className="
                inline-flex items-center gap-2 rounded-full px-3 py-1
                border border-base-200 bg-base-200/40
                text-[11px] font-semibold uppercase tracking-wide
                text-base-content/70
              "
            >
              <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
              Newsletter
            </div>

            <h2 className="mt-3 text-2xl md:text-3xl font-extrabold text-base-content">
              Get donation tips & updates
            </h2>

            <p className="mt-2 text-sm text-base-content/70 max-w-xl">
              Receive safety tips, campaign updates, and new feature announcements.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} className="w-full lg:max-w-md">
            <div className="flex flex-col sm:flex-row gap-2">
              <label
                className="
                  input input-bordered rounded-full
                  flex items-center gap-2 w-full
                  bg-base-100/70 border-base-200
                  backdrop-blur
                  focus-within:outline-none focus-within:ring-2 focus-within:ring-rose-500 focus-within:ring-offset-2
                "
              >
                <FiMail className="text-base-content/50" />
                <input
                  type="email"
                  className="grow text-sm bg-transparent outline-none placeholder:text-base-content/40"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>

              <button
                type="submit"
                className="
                  btn rounded-full border-0 px-6 text-white font-semibold
                  bg-gradient-to-r from-rose-500 via-red-500 to-orange-400
                  shadow-lg shadow-rose-500/20
                  hover:shadow-rose-500/35
                  transition-all duration-200
                "
              >
                Subscribe
              </button>
            </div>

            {status.msg && (
              <p
                className={`mt-2 text-xs ${
                  status.type === "success" ? "text-success" : "text-error"
                }`}
              >
                {status.msg}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;

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
    // Hook your API here later
    setStatus({ type: "success", msg: "Subscribed! You’ll receive updates soon." });
    setEmail("");
    setTimeout(() => setStatus({ type: "", msg: "" }), 2500);
  };

  return (
    <section className="py-12 md:py-16">
      <div className="rounded-3xl border border-slate-100 shadow-2xl bg-gradient-to-br from-rose-50 via-white to-orange-50 p-6 md:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-rose-100 px-3 py-1 bg-white/70 text-[11px] font-semibold uppercase tracking-wide text-rose-700">
              <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
              Newsletter
            </div>
            <h2 className="mt-3 text-2xl md:text-3xl font-extrabold text-slate-900">
              Get donation tips & updates
            </h2>
            <p className="mt-2 text-sm text-slate-600 max-w-xl">
              Receive safety tips, campaign updates, and new feature announcements.
            </p>
          </div>

          <form onSubmit={onSubmit} className="w-full lg:max-w-md">
            <div className="flex gap-2">
              <label className="input input-bordered rounded-full flex items-center gap-2 w-full">
                <FiMail className="text-slate-400" />
                <input
                  type="email"
                  className="grow text-sm"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <button
                type="submit"
                className="btn rounded-full border-0 px-6
                  bg-gradient-to-r from-rose-500 via-red-500 to-orange-400
                  text-white font-semibold shadow-lg shadow-rose-300/60
                  hover:shadow-rose-400/80 transition"
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

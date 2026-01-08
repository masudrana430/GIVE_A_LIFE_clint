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
    setStatus({
      type: "success",
      msg: "Subscribed! You’ll receive updates soon.",
    });
    setEmail("");
    setTimeout(() => setStatus({ type: "", msg: "" }), 2500);
  };

  return (
    <section className="py-12 md:py-16">
      <div
        className="
      rounded-3xl border border-base-200 shadow-2xl p-6 md:p-8
      bg-base-100
      bg-gradient-to-br from-base-100 via-base-100 to-base-200
      dark:from-base-200 dark:via-base-100 dark:to-base-300
    "
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <div
              className="
            inline-flex items-center gap-2 rounded-full px-3 py-1
            border border-base-200 bg-base-100/70 backdrop-blur
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
              Receive safety tips, campaign updates, and new feature
              announcements.
            </p>
          </div>

          <form onSubmit={onSubmit} className="w-full lg:max-w-md">
            <div className="flex flex-col sm:flex-row gap-2">
              <label
                className="
              input input-bordered rounded-full flex items-center gap-2 w-full
              bg-base-100/70 dark:bg-base-100/50
              border-base-200
            "
              >
                <FiMail className="text-base-content/50" />
                <input
                  type="email"
                  className="grow text-sm bg-transparent outline-none"
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
              shadow-lg transition
              bg-gradient-to-r from-rose-500 via-red-500 to-orange-400
              hover:shadow-rose-400/60
              dark:hover:shadow-rose-500/30
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

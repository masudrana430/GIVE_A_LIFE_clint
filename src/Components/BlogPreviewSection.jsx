import React from "react";
import { Link } from "react-router-dom";

const posts = [
  {
    title: "Who can donate blood? Basic eligibility",
    desc: "Learn the common rules and what to check before donating.",
    date: "Updated recently",
    to: "/blogs/eligibility",
    tag: "Guide",
  },
  {
    title: "What to eat before and after donation",
    desc: "Simple nutrition tips for better recovery and safety.",
    date: "Health",
    to: "/blogs/nutrition",
    tag: "Tips",
  },
  {
    title: "Emergency requests: how to respond fast",
    desc: "A checklist for donors when time is critical.",
    date: "Urgent",
    to: "/blogs/emergency",
    tag: "Emergency",
  },
];

const BlogPreviewSection = () => {
  return (
    <section className="py-12 md:py-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
        <div>
          <div
            className="
              inline-flex items-center gap-2 rounded-full
              border border-base-200 bg-base-200/40
              px-3 py-1 text-[11px] font-semibold uppercase tracking-wide
              text-base-content/70
            "
          >
            <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
            Blogs
          </div>

          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-base-content">
            Learn and donate safely
          </h2>

          <p className="mt-3 text-sm md:text-base text-base-content/70 max-w-2xl">
            Practical guides that help donors and requesters follow best
            practices.
          </p>
        </div>

        <Link
          to="/blogs"
          className="
            btn btn-outline rounded-full
            border-base-200
          "
        >
          View all posts
        </Link>
      </div>

      {/* Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {posts.map((p) => (
          <Link
            key={p.title}
            to={p.to}
            className="
              group relative overflow-hidden
              rounded-3xl border border-base-200 bg-base-100
              p-6 shadow-lg transition-all duration-200
              hover:shadow-2xl hover:-translate-y-0.5
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-rose-500
            "
          >
            {/* Premium glow */}
            <span
              className="
                pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full
                bg-gradient-to-br from-rose-500/15 via-orange-400/10 to-transparent
                blur-3xl opacity-0 transition-opacity duration-200
                group-hover:opacity-100
              "
              aria-hidden="true"
            />

            <div className="relative">
              <div className="flex items-center justify-between gap-3">
                <span
                  className="
                    text-[11px] font-bold uppercase tracking-wide
                    px-2 py-1 rounded-full
                    bg-base-200/60 text-base-content/70
                    border border-base-200
                  "
                >
                  {p.tag}
                </span>

                <span className="text-xs text-base-content/50">{p.date}</span>
              </div>

              <h3 className="mt-4 text-lg font-extrabold text-base-content">
                {p.title}
              </h3>

              <p className="mt-2 text-sm text-base-content/70 leading-6">
                {p.desc}
              </p>

              <div
                className="
                  mt-4 inline-flex items-center gap-2 text-sm font-semibold
                  text-rose-600 transition
                  group-hover:text-rose-500
                "
              >
                Read more <span aria-hidden="true">→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default BlogPreviewSection;

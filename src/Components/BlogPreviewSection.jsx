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
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-rose-100 px-3 py-1 bg-rose-50/60 text-[11px] font-semibold uppercase tracking-wide text-rose-700">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
            Blogs
          </div>
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-base-content">
            Learn and donate safely
          </h2>
          <p className="mt-3 text-sm md:text-base text-base-content/60 max-w-2xl">
            Practical guides that help donors and requesters follow best
            practices.
          </p>
        </div>

        <Link to="/blogs" className="btn btn-outline rounded-full">
          View all posts
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {posts.map((p) => (
          <Link
            key={p.title}
            to={p.to}
            className="rounded-3xl border border-base-200 bg-base-100 shadow-xl p-6 hover:shadow-2xl transition"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wide px-2 py-1 rounded-full bg-base-200/60 text-slate-700">
                {p.tag}
              </span>
              <span className="text-xs text-slate-400">{p.date}</span>
            </div>
            <h3 className="mt-4 text-lg font-extrabold text-base-content">
              {p.title}
            </h3>
            <p className="mt-2 text-sm text-slate-600 leading-6">{p.desc}</p>
            <div className="mt-4 text-sm font-semibold text-rose-600">
              Read more →
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default BlogPreviewSection;

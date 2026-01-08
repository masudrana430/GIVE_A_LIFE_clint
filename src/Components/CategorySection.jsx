import React from "react";
import { Link } from "react-router-dom";

const groups = [
  { name: "A+" },
  { name: "A-" },
  { name: "B+" },
  { name: "B-" },
  { name: "AB+" },
  { name: "AB-" },
  { name: "O+" },
  { name: "O-" },
];

const CategoriesSection = () => {
  return (
    <section className="py-12 md:py-16">
      <div className="rounded-3xl border border-base-200 bg-base-100 shadow-2xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div
              className="
                inline-flex items-center gap-2 rounded-full
                border border-rose-500/20 bg-rose-500/10
                px-3 py-1 text-[11px] font-semibold uppercase tracking-wide
                text-rose-500
              "
            >
              <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
              Categories
            </div>

            <h2 className="mt-3 text-2xl md:text-3xl font-extrabold text-base-content">
              Search donors by{" "}
              <span className="bg-gradient-to-r from-rose-500 via-red-500 to-orange-400 bg-clip-text text-transparent">
                blood group
              </span>
            </h2>

            <p className="mt-2 text-sm text-base-content/70 max-w-xl">
              Pick a group and jump into filtered search instantly.
            </p>
          </div>

          <Link
            to="/search-donors"
            className="
              btn rounded-full border-0 px-6
              bg-gradient-to-r from-rose-500 via-red-500 to-orange-400
              text-white font-semibold shadow-lg shadow-rose-500/20
              hover:shadow-rose-500/35 transition
            "
          >
            Browse All Donors
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {groups.map((g) => (
            <Link
              key={g.name}
              to={`/search-donors?bloodGroup=${encodeURIComponent(g.name)}`}
              title={`Search donors for ${g.name}`}
              className="
                group rounded-2xl border border-base-200 bg-base-100
                px-3 py-3 text-center font-extrabold text-lg text-base-content
                shadow-sm transition-all duration-200
                hover:-translate-y-0.5 hover:shadow-lg
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/60
              "
            >
              <span
                className="
                  inline-flex w-full items-center justify-center rounded-xl
                  border border-rose-500/20 bg-rose-500/10
                  py-2 text-rose-500
                  group-hover:bg-rose-500/15 group-hover:border-rose-500/30
                  transition
                "
              >
                {g.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;

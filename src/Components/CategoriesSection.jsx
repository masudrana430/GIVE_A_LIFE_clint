import React from "react";
import { Link } from "react-router-dom";

const groups = [
  { name: "A+", tone: "bg-rose-50 text-rose-700 border-rose-100" },
  { name: "A-", tone: "bg-amber-50 text-amber-700 border-amber-100" },
  { name: "B+", tone: "bg-sky-50 text-sky-700 border-sky-100" },
  { name: "B-", tone: "bg-emerald-50 text-emerald-700 border-emerald-100" },
  { name: "AB+", tone: "bg-purple-50 text-purple-700 border-purple-100" },
  { name: "AB-", tone: "bg-lime-50 text-lime-700 border-lime-100" },
  { name: "O+", tone: "bg-orange-50 text-orange-700 border-orange-100" },
  { name: "O-", tone: "bg-red-50 text-red-700 border-red-100" },
];

const CategoriesSection = () => {
  return (
    <section className="py-12 md:py-16">
      <div className="rounded-3xl border border-slate-100 bg-base-100 shadow-2xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-rose-100 px-3 py-1 bg-rose-50/60 text-[11px] font-semibold uppercase tracking-wide text-rose-700">
              <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
              Categories
            </div>
            <h2 className="mt-3 text-2xl md:text-3xl font-extrabold text-slate-900">
              Search donors by{" "}
              <span className="bg-gradient-to-r from-rose-500 via-red-500 to-orange-400 bg-clip-text text-transparent">
                blood group
              </span>
            </h2>
            <p className="mt-2 text-sm text-slate-500 max-w-xl">
              Pick a group and jump into filtered search instantly.
            </p>
          </div>

          <Link
            to="/search-donors"
            className="btn rounded-full border-0 px-6
              bg-gradient-to-r from-rose-500 via-red-500 to-orange-400
              text-white font-semibold shadow-lg shadow-rose-300/60
              hover:shadow-rose-400/80 transition"
          >
            Browse All Donors
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {groups.map((g) => (
            <Link
              key={g.name}
              to={`/search-donors?bloodGroup=${encodeURIComponent(g.name)}`}
              className={`rounded-2xl border px-3 py-3 text-center font-extrabold text-lg hover:scale-[1.02] transition ${g.tone}`}
              title={`Search donors for ${g.name}`}
            >
              {g.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;

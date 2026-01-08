// src/pages/SearchDonors.jsx
import { useState } from "react";
import bdLocations from "../data/bdLocations.json";
import Container from "../Components/Container";
import Lottie from "lottie-react";
import Find from "./../animation/Hematology.json";
import NotFound from "./../animation/Data Analysis.json";

const API_BASE = "https://b12-a11-server.vercel.app";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const SearchDonors = () => {
  const [bloodGroup, setBloodGroup] = useState("");
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [searched, setSearched] = useState(false);

  const districts = bdLocations.map((d) => d.district);

  const selectedDistrictObj = bdLocations.find((d) => d.district === district);
  const upazilaOptions = selectedDistrictObj ? selectedDistrictObj.upazilas : [];

  const handleDistrictChange = (value) => {
    setDistrict(value);
    setUpazila("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setDonors([]);
    setSearched(false);

    if (!bloodGroup || !district || !upazila) {
      setErr("Please select blood group, district and upazila.");
      return;
    }

    try {
      setLoading(true);
      const params = new URLSearchParams({ bloodGroup, district, upazila });
      const res = await fetch(`${API_BASE}/donors/search?${params.toString()}`);

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Failed to search donors.");
      }

      const data = await res.json();
      setDonors(data || []);
      setSearched(true);
    } catch (error) {
      console.error(error);
      setErr(error.message || "Search failed.");
    } finally {
      setLoading(false);
    }
  };

  const softCard =
    "rounded-3xl border border-base-200 bg-base-100 shadow-2xl";
  const softText = "text-base-content/70";
  const softMuted = "text-base-content/60";

  return (
    <section className="py-12 md:py-16">
      <Container>
        {/* page header */}
        <div className="text-center mb-10">
          <p
            className="
              inline-flex items-center gap-2 px-3 py-1 rounded-full
              border border-base-200 bg-base-100/70 backdrop-blur
              text-[11px] font-semibold uppercase tracking-wide
              text-base-content/70
            "
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Donor Directory
          </p>

          <h1 className="mt-3 text-3xl md:text-4xl font-extrabold text-base-content">
            Find a Blood Donor Near You
          </h1>

          <p className={`mt-2 text-sm md:text-base ${softText} max-w-2xl mx-auto`}>
            Search by blood group, district and upazila to connect with available donors
            in just a few seconds.
          </p>
        </div>

        {/* main layout: left form, right results */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 items-start">
          {/* left: search form card */}
          <div className="lg:col-span-2">
            <div className={`${softCard} p-6 md:p-7`}>
              <h2 className="text-lg font-semibold text-base-content mb-1">
                Filter donors
              </h2>
              <p className={`text-xs ${softMuted} mb-4`}>
                Choose a blood group and location to start your search.
              </p>

              <form onSubmit={handleSubmit} className="space-y-3">
                {/* Blood */}
                <div className="form-control">
                  <label className="label pb-1">
                    <span className={`label-text text-xs font-semibold uppercase tracking-wide ${softMuted}`}>
                      Blood Group
                    </span>
                  </label>
                  <select
                    className="
                      select select-bordered w-full rounded-xl
                      bg-base-100/80 dark:bg-base-100/60
                    "
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value)}
                  >
                    <option value="">Select blood group</option>
                    {bloodGroups.map((bg) => (
                      <option key={bg} value={bg}>
                        {bg}
                      </option>
                    ))}
                  </select>
                </div>

                {/* District */}
                <div className="form-control">
                  <label className="label pb-1">
                    <span className={`label-text text-xs font-semibold uppercase tracking-wide ${softMuted}`}>
                      District
                    </span>
                  </label>
                  <select
                    className="
                      select select-bordered w-full rounded-xl
                      bg-base-100/80 dark:bg-base-100/60
                    "
                    value={district}
                    onChange={(e) => handleDistrictChange(e.target.value)}
                  >
                    <option value="">Select district</option>
                    {districts.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Upazila */}
                <div className="form-control">
                  <label className="label pb-1">
                    <span className={`label-text text-xs font-semibold uppercase tracking-wide ${softMuted}`}>
                      Upazila
                    </span>
                  </label>
                  <select
                    className="
                      select select-bordered w-full rounded-xl
                      bg-base-100/80 dark:bg-base-100/60
                      disabled:opacity-60
                    "
                    value={upazila}
                    onChange={(e) => setUpazila(e.target.value)}
                    disabled={!district}
                  >
                    <option value="">
                      {district ? "Select upazila" : "Select district first"}
                    </option>
                    {upazilaOptions.map((u) => (
                      <option key={u} value={u}>
                        {u}
                      </option>
                    ))}
                  </select>
                </div>

                {err && <p className="text-error text-xs mt-1">{err}</p>}

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="
                      btn w-full md:w-auto rounded-full border-0
                      bg-gradient-to-r from-[#DC2626] via-[#EA384D] to-[#F97316]
                      text-white font-semibold shadow-lg shadow-red-300/60
                      hover:shadow-red-400/80 transition
                    "
                    disabled={loading}
                  >
                    {loading ? "Searching..." : "Search donors"}
                  </button>
                </div>
              </form>

              <div className="mt-4 border-t border-base-200 pt-3 text-xs text-base-content/60">
                Tip: Start with the exact hospital area (e.g.{" "}
                <span className="font-medium text-base-content">Dhaka – Dhanmondi</span>) for
                faster responses.
              </div>
            </div>
          </div>

          {/* right: results list */}
          <div className="lg:col-span-3">
            <div className="rounded-3xl border border-base-200 bg-base-100 shadow-xl p-6 md:p-7 min-h-[260px]">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                <div>
                  <h2 className="text-base md:text-lg font-semibold text-base-content">
                    Matching donors
                  </h2>
                  <p className={`text-xs ${softMuted}`}>
                    We only show donors that match your selected filters.
                  </p>
                </div>

                {searched && (
                  <div className={`flex items-center gap-3 text-xs ${softMuted}`}>
                    <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-base-200/60">
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          donors.length > 0 ? "bg-success" : "bg-warning"
                        }`}
                      />
                      {donors.length > 0
                        ? `${donors.length} donor${donors.length > 1 ? "s" : ""} found`
                        : "No donors found"}
                    </span>
                  </div>
                )}
              </div>

              {!searched && !loading && (
                <div>
                  <Lottie
                    animationData={Find}
                    loop
                    style={{ width: "190px", height: "190px", margin: "0 auto" }}
                  />
                  <div className={`h-40 flex items-center justify-center text-sm ${softMuted}`}>
                    Start by selecting a blood group, district and upazila.
                  </div>
                </div>
              )}

              {loading && (
                <div className={`h-40 flex flex-col items-center justify-center gap-2 text-sm ${softMuted}`}>
                  <span className="loading loading-spinner loading-md" />
                  Searching nearby donors…
                </div>
              )}

              {!loading && searched && donors.length === 0 && (
                <div className={`h-40 flex flex-col items-center justify-center gap-2 text-sm ${softMuted}`}>
                  <Lottie
                    animationData={NotFound}
                    loop
                    style={{ width: "150px", height: "150px", margin: "0 auto" }}
                  />
                  <p>No donors found for this combination.</p>
                  <p className="text-xs">Try a nearby upazila or broaden your district.</p>
                </div>
              )}

              {!loading && donors.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {donors.map((d) => (
                    <div
                      key={d._id}
                      className="
                        group rounded-2xl border border-base-200
                        bg-base-100
                        bg-gradient-to-br from-base-100 via-base-100 to-base-200/50
                        dark:from-base-100 dark:via-base-100 dark:to-base-200/30
                        shadow-sm hover:shadow-lg transition overflow-hidden
                      "
                    >
                      <div className="flex flex-row items-center gap-4 p-4">
                        {/* Avatar */}
                        <div className="avatar">
                          <div
                            className="
                              w-14 h-14 rounded-full overflow-hidden bg-base-200
                              ring-2 ring-primary/25
                              ring-offset-[3px] ring-offset-base-100
                            "
                          >
                            {d.avatar ? (
                              <img
                                src={d.avatar}
                                alt={d.name || "Donor"}
                                loading="lazy"
                                referrerPolicy="no-referrer"
                                onError={(e) => {
                                  e.currentTarget.onerror = null;
                                  e.currentTarget.src =
                                    "https://cdn-icons-png.freepik.com/512/6596/6596121.png";
                                }}
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-lg font-semibold text-base-content/70">
                                {(d.name || "U")[0]}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <h3 className="font-semibold text-sm sm:text-base text-base-content truncate">
                              {d.name || "Unknown donor"}
                            </h3>

                            <span
                              className="
                                badge badge-lg border-0 text-[11px] font-bold text-white
                                bg-gradient-to-r from-[#DC2626] to-[#F97316]
                              "
                            >
                              {d.bloodGroup}
                            </span>
                          </div>

                          <p className={`text-xs ${softMuted} mt-1 truncate`}>
                            {d.email}
                          </p>

                          <div className={`mt-2 flex flex-wrap gap-2 text-[11px] ${softMuted}`}>
                            <span className="inline-flex items-center gap-2 px-2 py-0.5 rounded-full bg-base-200/60">
                              <span className="h-1.5 w-1.5 rounded-full bg-success" />
                              {d.district}, {d.upazila}
                            </span>

                            {d.status && (
                              <span className="inline-flex items-center gap-2 px-2 py-0.5 rounded-full bg-success/10 text-success">
                                <span className="h-1.5 w-1.5 rounded-full bg-success" />
                                {d.status}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="h-1 bg-gradient-to-r from-primary/50 via-primary/20 to-info/20 opacity-0 group-hover:opacity-100 transition" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default SearchDonors;

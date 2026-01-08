// src/pages/dashboard/DashboardHome.jsx
import { useContext, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import useCurrentUser from "../../hooks/useCurrentUser";
import { AuthContext } from "../../Provider/AuthProvider";
import { FiUsers, FiDollarSign, FiDroplet, FiActivity } from "react-icons/fi";
import LoadingSpinner2nd from "../../Components/LoadingSpinner2nd";
import LoadingSpinnercopy from "../../Components/LoadingSpinnercopy";
import Lottie from "lottie-react";
import Doctor from "./../../animation/Doctor.json";
import Data from "./../../animation/Data Analysis.json";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const API_BASE = "https://b12-a11-server.vercel.app";

// Premium palette (brand-friendly)
const CHART_COLORS = [
  "#F43F5E",
  "#FB7185",
  "#F97316",
  "#34D399",
  "#38BDF8",
  "#A78BFA",
  "#FBBF24",
];

// ✅ Theme-safe chart colors using daisyUI CSS vars
const CHART_GRID = "hsl(var(--bc) / 0.12)";
const CHART_AXIS = "hsl(var(--bc) / 0.22)";
const CHART_TICK = "hsl(var(--bc) / 0.70)";
const CHART_TOOLTIP_BG = "hsl(var(--b1))";
const CHART_TOOLTIP_BORDER = "hsl(var(--b2))";
const CHART_TOOLTIP_TEXT = "hsl(var(--bc) / 0.9)";

const DashboardHome = () => {
  const { user } = useContext(AuthContext);
  const { dbUser, loadingDbUser } = useCurrentUser();

  const [recentRequests, setRecentRequests] = useState([]);
  const [analyticsRequests, setAnalyticsRequests] = useState([]); // ✅ for charts
  const [stats, setStats] = useState(null);

  const [error, setError] = useState("");
  const [loadingSection, setLoadingSection] = useState(false);

  const role = dbUser?.role || "donor";
  const roleLabel =
    role === "admin"
      ? "Administrator"
      : role === "volunteer"
      ? "Volunteer"
      : "Donor";

  useEffect(() => {
    if (!user?.email || !dbUser) return;

    const load = async () => {
      try {
        setError("");
        setLoadingSection(true);
        const token = await user.getIdToken();

        if (role === "donor") {
          const res = await fetch(`${API_BASE}/donation-requests/me?limit=60`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (!res.ok) throw new Error("Failed to load recent requests.");
          const data = await res.json();

          const items = data.items || [];
          setAnalyticsRequests(items);
          setRecentRequests(items.slice(0, 3));
        } else {
          const res = await fetch(`${API_BASE}/stats/summary`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (!res.ok) throw new Error("Failed to load stats.");
          const data = await res.json();
          setStats(data);
        }
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to load dashboard data.");
      } finally {
        setLoadingSection(false);
      }
    };

    load();
  }, [user?.email, dbUser, role]);

  // ---------- Helpers ----------
  const toDateKey = (dateStr) => {
    if (!dateStr) return null;
    const d = new Date(dateStr);
    if (Number.isNaN(d.getTime())) return dateStr;
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const lastNDaysKeys = (n) => {
    const out = [];
    const now = new Date();
    for (let i = n - 1; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const dd = String(d.getDate()).padStart(2, "0");
      out.push(`${yyyy}-${mm}-${dd}`);
    }
    return out;
  };

  const shortLabel = (yyyyMmDd) => {
    if (!yyyyMmDd || yyyyMmDd.length < 10) return yyyyMmDd;
    return `${yyyyMmDd.slice(5, 7)}/${yyyyMmDd.slice(8, 10)}`;
  };

  const countBy = (arr, getKey) => {
    const map = {};
    for (const item of arr) {
      const k = (getKey(item) || "Unknown").toString();
      map[k] = (map[k] || 0) + 1;
    }
    return Object.entries(map)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  };

  // ---------- Donor charts ----------
  const donorStatusPie = useMemo(() => {
    if (!analyticsRequests?.length) return [];
    return countBy(analyticsRequests, (r) =>
      (r.status || "pending").toLowerCase()
    );
  }, [analyticsRequests]);

  const donorBloodBar = useMemo(() => {
    if (!analyticsRequests?.length) return [];
    return countBy(analyticsRequests, (r) => r.bloodGroup || "Unknown").slice(
      0,
      8
    );
  }, [analyticsRequests]);

  const donorRequestsLine = useMemo(() => {
    const days = lastNDaysKeys(7);
    const base = days.map((k) => ({ day: shortLabel(k), requests: 0 }));

    if (!analyticsRequests?.length) return base;

    const counts = {};
    for (const r of analyticsRequests) {
      const k = toDateKey(r.donationDate);
      if (!k) continue;
      counts[k] = (counts[k] || 0) + 1;
    }

    return days.map((k) => ({ day: shortLabel(k), requests: counts[k] || 0 }));
  }, [analyticsRequests]);

  // ---------- Admin/Volunteer charts ----------
  const kpiBar = useMemo(() => {
    if (!stats) return [];
    return [
      { name: "Donors", value: Number(stats.totalUsers || 0) },
      { name: "Requests", value: Number(stats.totalRequests || 0) },
    ];
  }, [stats]);

  const fundingLine = useMemo(() => {
    if (!stats) return [];
    const v = Number(stats.totalFunding || 0);
    return [{ point: "Total", funding: v }];
  }, [stats]);

  const adminPie = useMemo(() => {
    if (!stats) return [];
    if (Array.isArray(stats.requestsByStatus) && stats.requestsByStatus.length) {
      return stats.requestsByStatus.map((x) => ({
        name: String(x.name || x.status || "unknown"),
        value: Number(x.value || x.count || 0),
      }));
    }
    return [
      { name: "Donors", value: Number(stats.totalUsers || 0) },
      { name: "Requests", value: Number(stats.totalRequests || 0) },
    ];
  }, [stats]);

  // ---------- UI: chart card ----------
  const ChartCard = ({ title, subtitle, children, right }) => (
    <div className="rounded-3xl border border-base-200 bg-base-100 shadow-xl p-5 md:p-6">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <h3 className="text-sm md:text-base font-extrabold text-base-content">
            {title}
          </h3>
          {subtitle && (
            <p className="mt-1 text-[11px] md:text-xs text-base-content/60">
              {subtitle}
            </p>
          )}
        </div>
        {right}
      </div>
      <div className="h-[260px]">{children}</div>
    </div>
  );

  const tooltipStyle = {
    backgroundColor: CHART_TOOLTIP_BG,
    border: `1px solid ${CHART_TOOLTIP_BORDER}`,
    borderRadius: 12,
    color: CHART_TOOLTIP_TEXT,
  };

  if (loadingDbUser) {
    return (
      <div className="min-h-[200px] flex items-center justify-center">
        <LoadingSpinnercopy />
      </div>
    );
  }

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Welcome / hero card */}
      <section className="relative overflow-hidden rounded-3xl border border-rose-100/80 dark:border-rose-500/20 bg-base-100 shadow-[0_18px_45px_rgba(15,23,42,0.10)]">
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-gradient-to-br from-rose-500/25 via-rose-400/10 to-transparent blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-10 bottom-[-60px] h-48 w-48 rounded-full bg-gradient-to-tr from-rose-400/20 via-rose-500/10 to-transparent blur-3xl"
          aria-hidden="true"
        />

        <div className="relative flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between md:p-8">
          <div className="max-w-xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-rose-100 dark:border-rose-500/20 bg-rose-50 dark:bg-rose-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-rose-700 dark:text-rose-300">
              <span className="h-1.5 w-1.5 rounded-full bg-rose-500 shadow-[0_0_0_4px_rgba(244,63,94,0.35)]" />
              BloodCare Dashboard
            </div>

            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-base-content md:text-3xl">
                Welcome back,{" "}
                <span className="text-rose-600">{dbUser?.name || "User"}</span>.
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-base-content/70 md:text-[0.95rem]">
                You are logged in as{" "}
                <span className="font-semibold capitalize text-base-content">
                  {roleLabel}
                </span>
                . Review donation activity, manage requests, and keep every drop
                of blood accounted for.
              </p>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs md:text-[13px]">
              <span className="inline-flex items-center gap-2 rounded-full bg-base-200/60 px-3 py-1 text-base-content/70">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span className="font-medium text-base-content">Status:</span>{" "}
                Active session
              </span>

              <span className="inline-flex items-center gap-2 rounded-full bg-base-200/60 px-3 py-1 text-base-content/60">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
                <span className="font-medium text-base-content">Email:</span>
                <span className="truncate max-w-[190px] md:max-w-[250px]">
                  {dbUser?.email || user?.email || "No email available"}
                </span>
              </span>

              <span className="inline-flex items-center gap-2 rounded-full bg-base-200/60 px-3 py-1 text-base-content/60">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                <span className="font-medium text-base-content">Role:</span>
                <span className="capitalize">{roleLabel}</span>
              </span>
            </div>
          </div>

          <div className="flex w-full justify-start md:w-auto md:justify-end">
            <div className="relative rounded-2xl border border-rose-100/70 dark:border-rose-500/20 bg-base-100/70 p-3 shadow-lg backdrop-blur-sm md:p-4">
              <div className="pointer-events-none absolute -top-3 -right-3 h-10 w-10 rounded-full bg-gradient-to-br from-rose-500/60 to-rose-400/40 opacity-80 blur-sm" />
              <Lottie
                animationData={Doctor}
                loop
                style={{ width: "190px", height: "190px" }}
              />
              <div className="mt-2 flex items-center justify-between gap-2 text-[11px] text-base-content/60">
                <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 dark:bg-rose-500/10 px-2 py-1 text-rose-700 dark:text-rose-300 border border-rose-100 dark:border-rose-500/20">
                  <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                  Live overview
                </span>
                <span className="hidden text-[11px] text-base-content/60 md:inline">
                  Dedicated to safe blood management
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CHARTS SECTION */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg md:text-xl font-extrabold text-base-content flex items-center gap-2">
              <FiActivity className="text-rose-600" />
              Analytics
            </h2>
            <p className="text-xs text-base-content/60">
              Charts reflect your current data from the server (auto-updates as
              data changes).
            </p>
          </div>
        </div>

        {loadingSection && role === "donor" && analyticsRequests.length === 0 ? (
          <div className="flex justify-center py-6">
            <LoadingSpinner2nd />
          </div>
        ) : role === "donor" ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <ChartCard
              title="Request Status Distribution"
              subtitle="Based on your recent requests (up to 60)."
              right={
                <span className="text-[11px] px-2 py-1 rounded-full bg-base-200/60 text-base-content/70 font-semibold">
                  Pie
                </span>
              }
            >
              {donorStatusPie.length ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend wrapperStyle={{ color: CHART_TICK }} />
                    <Pie
                      data={donorStatusPie}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={55}
                      outerRadius={85}
                      paddingAngle={3}
                    >
                      {donorStatusPie.map((_, idx) => (
                        <Cell
                          key={idx}
                          fill={CHART_COLORS[idx % CHART_COLORS.length]}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-sm text-base-content/60">
                  No chart data yet.
                </div>
              )}
            </ChartCard>

            <ChartCard
              title="Blood Group Frequency"
              subtitle="Which blood groups appear most in your requests."
              right={
                <span className="text-[11px] px-2 py-1 rounded-full bg-base-200/60 text-base-content/70 font-semibold">
                  Bar
                </span>
              }
            >
              {donorBloodBar.length ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={donorBloodBar}
                    margin={{ top: 10, right: 10, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid stroke={CHART_GRID} strokeDasharray="3 3" />
                    <XAxis
                      dataKey="name"
                      stroke={CHART_AXIS}
                      tick={{ fill: CHART_TICK, fontSize: 12 }}
                    />
                    <YAxis
                      allowDecimals={false}
                      stroke={CHART_AXIS}
                      tick={{ fill: CHART_TICK, fontSize: 12 }}
                    />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend wrapperStyle={{ color: CHART_TICK }} />
                    <Bar dataKey="value" name="Requests">
                      {donorBloodBar.map((_, idx) => (
                        <Cell
                          key={idx}
                          fill={CHART_COLORS[idx % CHART_COLORS.length]}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-sm text-base-content/60">
                  No chart data yet.
                </div>
              )}
            </ChartCard>

            <ChartCard
              title="Requests Over Last 7 Days"
              subtitle="Counts by donation date (last 7 days)."
              right={
                <span className="text-[11px] px-2 py-1 rounded-full bg-base-200/60 text-base-content/70 font-semibold">
                  Line
                </span>
              }
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={donorRequestsLine}
                  margin={{ top: 10, right: 10, left: 0, bottom: 5 }}
                >
                  <CartesianGrid stroke={CHART_GRID} strokeDasharray="3 3" />
                  <XAxis
                    dataKey="day"
                    stroke={CHART_AXIS}
                    tick={{ fill: CHART_TICK, fontSize: 12 }}
                  />
                  <YAxis
                    allowDecimals={false}
                    stroke={CHART_AXIS}
                    tick={{ fill: CHART_TICK, fontSize: 12 }}
                  />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend wrapperStyle={{ color: CHART_TICK }} />
                  <Line
                    type="monotone"
                    dataKey="requests"
                    stroke={CHART_COLORS[0]}
                    strokeWidth={3}
                    dot
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <ChartCard
              title="Platform KPI (Counts)"
              subtitle="Dynamic counts from stats summary."
              right={
                <span className="text-[11px] px-2 py-1 rounded-full bg-base-200/60 text-base-content/70 font-semibold">
                  Bar
                </span>
              }
            >
              {!stats ? (
                <div className="h-full flex items-center justify-center text-sm text-base-content/60">
                  No statistics available yet.
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={kpiBar}
                    margin={{ top: 10, right: 10, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid stroke={CHART_GRID} strokeDasharray="3 3" />
                    <XAxis
                      dataKey="name"
                      stroke={CHART_AXIS}
                      tick={{ fill: CHART_TICK, fontSize: 12 }}
                    />
                    <YAxis
                      allowDecimals={false}
                      stroke={CHART_AXIS}
                      tick={{ fill: CHART_TICK, fontSize: 12 }}
                    />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend wrapperStyle={{ color: CHART_TICK }} />
                    <Bar dataKey="value" name="Total">
                      {kpiBar.map((_, idx) => (
                        <Cell
                          key={idx}
                          fill={CHART_COLORS[idx % CHART_COLORS.length]}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </ChartCard>

            <ChartCard
              title="Total Funding"
              subtitle="Real-time total from stats summary."
              right={
                <span className="text-[11px] px-2 py-1 rounded-full bg-base-200/60 text-base-content/70 font-semibold">
                  Line
                </span>
              }
            >
              {!stats ? (
                <div className="h-full flex items-center justify-center text-sm text-base-content/60">
                  No funding data yet.
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={fundingLine}
                    margin={{ top: 10, right: 10, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid stroke={CHART_GRID} strokeDasharray="3 3" />
                    <XAxis
                      dataKey="point"
                      stroke={CHART_AXIS}
                      tick={{ fill: CHART_TICK, fontSize: 12 }}
                    />
                    <YAxis
                      stroke={CHART_AXIS}
                      tick={{ fill: CHART_TICK, fontSize: 12 }}
                    />
                    <Tooltip
                      contentStyle={tooltipStyle}
                      formatter={(v) => [`$${Number(v).toFixed(2)}`, "Funding"]}
                    />
                    <Legend wrapperStyle={{ color: CHART_TICK }} />
                    <Line
                      type="monotone"
                      dataKey="funding"
                      stroke={CHART_COLORS[2]}
                      strokeWidth={3}
                      dot
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </ChartCard>

            <ChartCard
              title="Platform Mix"
              subtitle={
                Array.isArray(stats?.requestsByStatus) &&
                stats.requestsByStatus.length
                  ? "Requests by status (from API)."
                  : "Fallback mix: Donors vs Requests."
              }
              right={
                <span className="text-[11px] px-2 py-1 rounded-full bg-base-200/60 text-base-content/70 font-semibold">
                  Pie
                </span>
              }
            >
              {!stats ? (
                <div className="h-full flex items-center justify-center text-sm text-base-content/60">
                  No chart data yet.
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend wrapperStyle={{ color: CHART_TICK }} />
                    <Pie
                      data={adminPie}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={55}
                      outerRadius={85}
                      paddingAngle={3}
                    >
                      {adminPie.map((_, idx) => (
                        <Cell
                          key={idx}
                          fill={CHART_COLORS[idx % CHART_COLORS.length]}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              )}
            </ChartCard>
          </div>
        )}

        {error && (
          <p className="text-error text-sm mt-2">
            Failed to load data: {error}
          </p>
        )}
      </section>

      {/* Donor view: recent 3 requests */}
      {role === "donor" && (
        <section className="rounded-3xl shadow-xl border border-base-200 bg-base-100 p-6 md:p-7">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <div>
              <h2 className="font-semibold text-lg md:text-xl text-base-content">
                Recent Donation Requests
              </h2>
              <p className="text-xs text-base-content/60">
                Shows your last 3 requests. Use this to quickly monitor and
                update their status.
              </p>
            </div>
            <div className="flex gap-2">
              <Link
                to="/dashboard/create-donation-request"
                className="btn btn-sm rounded-full border-0 bg-slate-900 text-slate-50 hover:bg-slate-800"
              >
                New Request
              </Link>
              <Link
                to="/dashboard/my-donation-requests"
                className="btn btn-sm rounded-full btn-outline"
              >
                View all
              </Link>
            </div>
          </div>

          {loadingSection ? (
            <div className="flex justify-center py-6">
              <LoadingSpinner2nd />
            </div>
          ) : recentRequests.length === 0 ? (
            <div className="py-8 text-center text-sm text-base-content/60">
              <div className="mt-6 flex items-center justify-center">
                <Lottie
                  animationData={Data}
                  loop
                  style={{ width: "190px", height: "190px" }}
                />
              </div>
              You have not created any donation request yet.
              <div className="mt-3">
                <Link
                  to="/dashboard/create-donation-request"
                  className="btn btn-sm rounded-full border-0 bg-gradient-to-r from-[#DC2626] via-[#EA384D] to-[#F97316] text-white font-semibold"
                >
                  Create your first request
                </Link>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-base-200">
              <table className="table table-zebra-zebra">
                <thead className="bg-base-200/60 text-xs uppercase tracking-wide text-base-content/60">
                  <tr>
                    <th>Recipient</th>
                    <th>Location</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Blood</th>
                    <th>Status</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {recentRequests.map((req) => (
                    <tr key={req._id}>
                      <td>
                        <div className="flex flex-col">
                          <span className="font-medium text-base-content">
                            {req.recipientName}
                          </span>
                          {req.hospitalName && (
                            <span className="text-xs text-base-content/60">
                              {req.hospitalName}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="text-xs sm:text-sm text-base-content/70">
                        {req.recipientDistrict}, {req.recipientUpazila}
                      </td>
                      <td className="text-xs sm:text-sm text-base-content/70">
                        {req.donationDate}
                      </td>
                      <td className="text-xs sm:text-sm text-base-content/70">
                        {req.donationTime}
                      </td>
                      <td>
                        <span className="badge badge-sm border-0 text-white bg-gradient-to-r from-[#DC2626] to-[#F97316]">
                          {req.bloodGroup}
                        </span>
                      </td>
                      <td className="capitalize text-xs sm:text-sm">
                        {req.status}
                      </td>
                      <td className="text-right space-x-1">
                        <Link
                          to={`/dashboard/edit-donation-request/${req._id}`}
                          className="btn btn-xs rounded-full btn-outline"
                        >
                          Edit
                        </Link>
                        <Link
                          to={`/donation-requests/${req._id}`}
                          className="btn btn-xs rounded-full border-0 bg-slate-900 text-slate-50 hover:bg-slate-800"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {error && (
            <p className="text-error text-sm mt-3">
              Failed to load data: {error}
            </p>
          )}
        </section>
      )}

      {/* Admin / Volunteer: stats cards */}
      {(role === "admin" || role === "volunteer") && (
        <section className="rounded-3xl shadow-xl border border-base-200 bg-base-100 p-6 md:p-7">
          <div className="flex items-center justify-between gap-3 mb-4">
            <div>
              <h2 className="font-semibold text-lg md:text-xl text-base-content">
                Overview
              </h2>
              <p className="text-xs text-base-content/60">
                High-level metrics across users, funding, and blood donation
                requests.
              </p>
            </div>
          </div>

          {loadingSection && !stats ? (
            <div className="flex justify-center py-6">
              <LoadingSpinner2nd />
            </div>
          ) : !stats ? (
            <p className="text-sm text-base-content/60">
              No statistics available yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <div className="rounded-2xl border border-base-200 bg-gradient-to-br from-slate-900 to-slate-800 text-slate-50 p-4 flex items-center gap-4 shadow-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-700/60">
                  <FiUsers className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-300">
                    Total Donors
                  </p>
                  <p className="text-2xl font-bold leading-tight">
                    {stats.totalUsers ?? 0}
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-rose-100/70 dark:border-rose-500/20 bg-gradient-to-br from-rose-500 to-orange-400 text-white p-4 flex items-center gap-4 shadow-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                  <FiDollarSign className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-white/80">
                    Total Funding
                  </p>
                  <p className="text-2xl font-bold leading-tight">
                    ${Number(stats.totalFunding || 0).toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-emerald-100/70 dark:border-emerald-500/20 bg-gradient-to-br from-emerald-500 to-teal-400 text-white p-4 flex items-center gap-4 shadow-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                  <FiDroplet className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-white/80">
                    Total Requests
                  </p>
                  <p className="text-2xl font-bold leading-tight">
                    {stats.totalRequests ?? 0}
                  </p>
                </div>
              </div>
            </div>
          )}

          {error && (
            <p className="text-error text-sm mt-3">
              Failed to load data: {error}
            </p>
          )}
        </section>
      )}
    </div>
  );
};

export default DashboardHome;

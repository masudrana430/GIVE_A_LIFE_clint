// src/layouts/DashboardLayout.jsx
import { Link, NavLink, Outlet } from "react-router-dom";
import {
  FiHome,
  FiUser,
  FiUsers,
  FiList,
  FiPlusCircle,
  FiMenu,
} from "react-icons/fi";
import useCurrentUser from "../hooks/useCurrentUser";
import logo from "../assets/Group 427320775.png";
import LoadingSpinner2nd from "../Components/LoadingSpinner2nd";
import ThemeToggle from "../Components/ThemeToggle";

const DashboardLayout = () => {
  const { dbUser, loadingDbUser } = useCurrentUser();

  if (loadingDbUser) return <LoadingSpinner2nd />;

  const role = dbUser?.role || "donor";

  const navLinkBase =
    "flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition";

  // ✅ theme-safe active/inactive styles (works in dark mode)
  const navLinkClasses = ({ isActive }) =>
    [
      navLinkBase,
      isActive
        ? "bg-rose-500/10 text-rose-500 border border-rose-500/20"
        : "text-base-content/70 hover:bg-base-200/60 hover:text-base-content",
    ].join(" ");

  return (
    <div className="min-h-screen bg-base-200">
      <div className="drawer lg:drawer-open">
        <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

        {/* MAIN CONTENT */}
        <div className="drawer-content flex flex-col">
          {/* Top bar */}
          <header className="w-full flex items-center justify-between px-4 md:px-8 py-3 border-b border-base-200 bg-base-100/70 backdrop-blur z-10">
            <div className="flex items-center gap-3">
              <label
                htmlFor="dashboard-drawer"
                className="btn btn-ghost btn-square lg:hidden"
                aria-label="Open sidebar"
              >
                <FiMenu className="h-5 w-5" />
              </label>

              <div>
                <p className="text-[11px] uppercase tracking-wide text-base-content/60">
                  Dashboard
                </p>
                <h1 className="text-lg font-semibold capitalize text-base-content">
                  {role} panel
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* ✅ Dark/Light toggle */}
              <ThemeToggle />

              {/* ✅ theme-safe button (no slate colors) */}
              <Link
                to="/"
                className="btn btn-xs sm:btn-sm rounded-full border border-base-200 bg-base-100 hover:bg-base-200 text-base-content"
              >
                Back to Home
              </Link>
            </div>
          </header>

          <main className="flex-1 p-4 md:p-8">
            <Outlet />
          </main>
        </div>

        {/* SIDEBAR */}
        <div className="drawer-side">
          <label
            htmlFor="dashboard-drawer"
            className="drawer-overlay"
            aria-label="Close sidebar"
          />
          <aside className="w-72 bg-base-100 border-r border-base-200 min-h-full flex flex-col">
            {/* Brand / Role */}
            <div className="px-5 py-6 border-b border-base-200">
              <Link
                to="/"
                className="flex items-center gap-3 sm:gap-4 normal-case"
                aria-label="BloodCare Home"
              >
                <div className="bg-base-100 rounded-full shadow-lg w-10 h-10 flex items-center justify-center">
                  <img src={logo} alt="Give a Life logo" className="h-10 w-auto" />
                </div>

                <div>
                  <h2 className="font-bold text-lg leading-tight text-base-content">
                    <span className="text-rose-500">GIVE</span> A LIFE
                  </h2>
                  <p className="text-[11px] text-base-content/60">
                    Role:{" "}
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-base-200/60 capitalize">
                      {role}
                    </span>
                  </p>
                </div>
              </Link>

              {/* Optional: put toggle in sidebar too (desktop) */}
              <div className="mt-4 hidden lg:flex">
                <ThemeToggle className="w-full justify-center" />
              </div>
            </div>

            {/* NAVIGATION */}
            <nav className="flex-1 px-3 py-4 space-y-3 overflow-y-auto">
              {/* General */}
              <div>
                <p className="px-3 mb-1 text-[11px] font-semibold uppercase tracking-wide text-base-content/60">
                  General
                </p>
                <ul className="space-y-1">
                  <li>
                    <NavLink to="/dashboard" end className={navLinkClasses}>
                      <FiHome className="h-4 w-4" />
                      <span>Home</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/profile" className={navLinkClasses}>
                      <FiUser className="h-4 w-4" />
                      <span>Profile</span>
                    </NavLink>
                  </li>
                </ul>
              </div>

              {/* Donor-only */}
              {role === "donor" && (
                <div>
                  <p className="px-3 mt-3 mb-1 text-[11px] font-semibold uppercase tracking-wide text-base-content/60">
                    Donor
                  </p>
                  <ul className="space-y-1">
                    <li>
                      <NavLink
                        to="/dashboard/my-donation-requests"
                        className={navLinkClasses}
                      >
                        <FiList className="h-4 w-4" />
                        <span>My Donation Requests</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/dashboard/create-donation-request"
                        className={navLinkClasses}
                      >
                        <FiPlusCircle className="h-4 w-4" />
                        <span>Create Donation Request</span>
                      </NavLink>
                    </li>
                  </ul>
                </div>
              )}

              {/* Admin-only */}
              {role === "admin" && (
                <div>
                  <p className="px-3 mt-3 mb-1 text-[11px] font-semibold uppercase tracking-wide text-base-content/60">
                    Admin
                  </p>
                  <ul className="space-y-1">
                    <li>
                      <NavLink to="/dashboard/all-users" className={navLinkClasses}>
                        <FiUsers className="h-4 w-4" />
                        <span>All Users</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/dashboard/all-blood-donation-request"
                        className={navLinkClasses}
                      >
                        <FiList className="h-4 w-4" />
                        <span>All Donation Requests</span>
                      </NavLink>
                    </li>
                  </ul>
                </div>
              )}

              {/* Volunteer-only */}
              {role === "volunteer" && (
                <div>
                  <p className="px-3 mt-3 mb-1 text-[11px] font-semibold uppercase tracking-wide text-base-content/60">
                    Volunteer
                  </p>
                  <ul className="space-y-1">
                    <li>
                      <NavLink
                        to="/dashboard/all-blood-donation-request"
                        className={navLinkClasses}
                      >
                        <FiList className="h-4 w-4" />
                        <span>All Donation Requests</span>
                      </NavLink>
                    </li>
                  </ul>
                </div>
              )}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-base-200 text-[11px] text-base-content/60">
              <p className="mb-0.5">Logged in as:</p>
              <p className="font-medium truncate text-base-content">
                {dbUser?.name || dbUser?.email || "User"}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

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
// import LoadingSpinner from "../Components/LoadingSpinner";
import logo from "../assets/Group 427320775.png";
import LoadingSpinner2nd from "../Components/LoadingSpinner2nd";

const DashboardLayout = () => {
  const { dbUser, loadingDbUser } = useCurrentUser();

  if (loadingDbUser) return <LoadingSpinner2nd />;

  const role = dbUser?.role || "donor";

  const navLinkBase =
    "flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-colors";

  const navLinkClasses = ({ isActive }) =>
    `${navLinkBase} ${
      isActive
        ? "bg-rose-50 text-rose-600 border border-rose-100"
        : "text-slate-600 hover:bg-slate-100"
    }`;

  return (
    <div className="min-h-screen bg-base-200">
      <div className="drawer lg:drawer-open">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />

        {/* MAIN CONTENT */}
        <div className="drawer-content flex flex-col">
          {/* Top bar (only for mobile/tablet) */}
          <header className="w-full flex items-center justify-between px-4 md:px-8 py-3 border-b bg-base-100/90 backdrop-blur z-10">
            <div className="flex items-center gap-3">
              <label
                htmlFor="dashboard-drawer"
                className="btn btn-ghost btn-square lg:hidden"
                aria-label="Open sidebar"
              >
                <FiMenu className="h-5 w-5" />
              </label>
              <div>
                <p className="text-[11px] uppercase tracking-wide text-slate-500">
                  Dashboard
                </p>
                <h1 className="text-lg font-semibold capitalize text-slate-900">
                  {role} panel
                </h1>
              </div>
            </div>

            <Link
              to="/"
              className="btn btn-xs sm:btn-sm rounded-full border-0 bg-slate-900 text-slate-50 hover:bg-slate-800"
            >
              Back to Home
            </Link>
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
          <aside className="w-72 bg-base-100 border-r min-h-full flex flex-col">
            {/* Brand / Role */}
            <div className="px-5 py-6 border-b">
              <Link
                to="/"
                className="flex items-center gap-3 sm:gap-4 normal-case"
                aria-label="BloodCare Home"
              >
                
                <div
                  className="
                              bg-white rounded-full shadow-lg
                              w-10 h-10 lg:w-10 lg:h-10
                              flex items-center justify-center
                            "
                >
                  <img
                    src={logo}
                    alt="Give a Life logo"
                    className="h-10 lg:h-14 w-auto"
                  />
                </div>
                <div>
                  <h2 className="font-bold text-lg leading-tight">
                    <span className="text-red-600">GIVE</span> A LIFE
                  </h2>
                  <p className="text-[11px] text-slate-500">
                    Role:{" "}
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-slate-100 capitalize">
                      {role}
                    </span>
                  </p>
                </div>
              </Link>
            </div>

            {/* NAVIGATION */}
            <nav className="flex-1 px-3 py-4 space-y-3 overflow-y-auto">
              {/* General section */}
              <div>
                <p className="px-3 mb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
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
                  <p className="px-3 mt-3 mb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
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
                  <p className="px-3 mt-3 mb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                    Admin
                  </p>
                  <ul className="space-y-1">
                    <li>
                      <NavLink
                        to="/dashboard/all-users"
                        className={navLinkClasses}
                      >
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
                  <p className="px-3 mt-3 mb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
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

            {/* Footer / user info */}
            <div className="p-4 border-t text-[11px] text-slate-500">
              <p className="mb-0.5">Logged in as:</p>
              <p className="font-medium truncate">
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

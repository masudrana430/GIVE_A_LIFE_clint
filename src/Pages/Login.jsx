import React, { useContext, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import { FiEye, FiEyeOff, FiDroplet, FiShield, FiUser } from "react-icons/fi";
import Container from "../Components/Container";

import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase/firebase.config";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// ✅ Set your real demo credentials here
const DEMO_USERS = {
  donor: {
    label: "Demo Donor",
    roleTag: "Donor",
    email: "donor@demo.com",
    password: "Donor@12345",
    tone: "bg-rose-50 text-rose-700 border-rose-100 hover:bg-rose-100",
    dot: "bg-rose-500",
  },
  volunteer: {
    label: "Demo Volunteer",
    roleTag: "Volunteer",
    email: "volunteer@example.com",
    password: "Volunteer@123",
    tone: "bg-sky-50 text-sky-700 border-sky-100 hover:bg-sky-100",
    dot: "bg-sky-500",
  },
  admin: {
    label: "Demo Admin",
    roleTag: "Admin",
    email: "admin@example.com",
    password: "Admin@123",
    tone: "bg-amber-50 text-amber-700 border-amber-100 hover:bg-amber-100",
    dot: "bg-amber-500",
  },
};

const Login = () => {
  const { signIn } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/"; // defaults to Home

  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [show, setShow] = useState(false);

  const clearMessages = () => {
    setErr("");
    setToast(null);
  };

  const scheduleToastClear = (ms = 2500) => {
    setTimeout(() => setToast(null), ms);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    clearMessages();
    setLoading(true);

    const email = emailInput.trim();
    const password = passwordInput;

    try {
      await signIn(email, password);

      setToast({ type: "success", message: "Welcome back! Redirecting…" });
      setEmailInput("");
      setPasswordInput("");

      navigate(from, { replace: true }); // Home or previous protected route
    } catch (error) {
      const map = {
        "auth/invalid-credential": "Invalid email or password.",
        "auth/user-not-found": "No account with that email.",
        "auth/wrong-password": "Incorrect password.",
        "auth/too-many-requests": "Too many attempts, try again later.",
      };

      const msg = map[error.code] || error.message;
      setErr(msg);
      setToast({ type: "error", message: msg });
    } finally {
      setLoading(false);
      scheduleToastClear();
    }
  };

  const goToForgot = () => {
    const q = emailInput ? `?email=${encodeURIComponent(emailInput)}` : "";
    navigate(`/auth/forgot${q}`, { state: { email: emailInput } });
  };

  const handleGoogleSignin = async () => {
    clearMessages();
    setLoading(true);

    try {
      await signInWithPopup(auth, googleProvider);

      setToast({
        type: "success",
        message: "Logged in with Google! Redirecting…",
      });

      navigate(from, { replace: true });
    } catch (error) {
      const map = {
        "auth/popup-closed-by-user": "Google sign-in popup was closed.",
        "auth/account-exists-with-different-credential":
          "Account exists with a different sign-in method.",
      };
      const msg = map[error.code] || error.message;
      setErr(msg);
      setToast({ type: "error", message: msg });
    } finally {
      setLoading(false);
      scheduleToastClear();
    }
  };

  const fillDemo = (roleKey) => {
    const demo = DEMO_USERS[roleKey];
    if (!demo) return;

    clearMessages();
    setEmailInput(demo.email);
    setPasswordInput(demo.password);

    setToast({ type: "success", message: `${demo.label} credentials filled.` });
    scheduleToastClear(2000);
  };

  const fillAndLoginDemo = async (roleKey) => {
    const demo = DEMO_USERS[roleKey];
    if (!demo) return;

    clearMessages();
    setLoading(true);

    // Fill first (nice UX)
    setEmailInput(demo.email);
    setPasswordInput(demo.password);

    try {
      await signIn(demo.email, demo.password);

      setToast({
        type: "success",
        message: `Logged in as ${demo.label}. Redirecting…`,
      });

      navigate(from, { replace: true });
    } catch (error) {
      const msg = error?.message || "Demo login failed.";
      setErr(msg);
      setToast({ type: "error", message: msg });
    } finally {
      setLoading(false);
      scheduleToastClear();
    }
  };

  const demoList = useMemo(() => Object.entries(DEMO_USERS), []);

  return (
    <section className="py-10 md:py-16">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1.1fr)] gap-8 items-stretch">
          {/* Left: brand / trust panel */}
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#DC2626] via-[#EA384D] to-[#F97316] text-white shadow-2xl">
            <div className="absolute -top-10 -right-16 h-40 w-40 rounded-full bg-base-100/10 blur-2xl" />
            <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-black/10 blur-2xl" />

            <div className="relative px-7 py-7 md:px-9 md:py-9 flex flex-col h-full justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-base-100/10 text-[11px] font-semibold uppercase tracking-[0.25em]">
                  <FiDroplet className="w-3.5 h-3.5" />
                  BloodCare Login
                </div>

                <h1 className="mt-4 text-2xl md:text-3xl font-extrabold leading-snug">
                  Sign back in and stay ready to help.
                </h1>

                <p className="mt-3 text-sm md:text-base text-white/90 max-w-md">
                  Access your dashboard, manage donation requests, and keep your
                  availability updated so patients and volunteers can reach you
                  faster when blood is urgently needed.
                </p>

                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs md:text-sm">
                  <div className="rounded-2xl bg-black/10 p-3.5 border border-white/15">
                    <p className="font-semibold flex items-center gap-2">
                      <FiShield className="w-4 h-4" />
                      Secure authentication
                    </p>
                    <p className="mt-1 text-white/85">
                      Your login is protected with modern security practices to
                      keep your account safe.
                    </p>
                  </div>
                  <div className="rounded-2xl bg-black/10 p-3.5 border border-white/15">
                    <p className="font-semibold flex items-center gap-2">
                      <FiDroplet className="w-4 h-4" />
                      Donor-first experience
                    </p>
                    <p className="mt-1 text-white/85">
                      See your requests, status, and impact in one place with a
                      donor-centric dashboard.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/15 text-xs md:text-sm flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-300" />
                  Active donors respond faster to new requests.
                </span>
                <span className="opacity-80">
                  Log in regularly to keep your contact information fresh.
                </span>
              </div>
            </div>
          </div>

          {/* Right: login card */}
          <div className="card bg-base-100 w-full max-w-xl mx-auto shadow-xl border border-base-200/70 rounded-3xl">
            <div className="card-body px-6 py-6 md:px-8 md:py-7">
              <div className="mb-4 text-center">
                <h2 className="text-xl md:text-2xl font-bold">
                  Login to your account
                </h2>
                <p className="mt-1 text-xs md:text-sm text-base-content/60">
                  Enter your credentials to access your BloodCare dashboard.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                {/* Email */}
                <div className="form-control">
                  <label className="label" htmlFor="email">
                    <span className="label-text text-xs font-semibold uppercase tracking-wide text-base-content/60">
                      Email
                    </span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="input input-bordered rounded-xl"
                    placeholder="you@example.com"
                    value={emailInput}
                    onChange={(e) => {
                      setEmailInput(e.target.value);
                      setErr("");
                    }}
                    required
                  />
                </div>

                {/* Password */}
                <div className="form-control">
                  <label className="label" htmlFor="password">
                    <span className="label-text text-xs font-semibold uppercase tracking-wide text-base-content/60">
                      Password
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={show ? "text" : "password"}
                      className="input input-bordered w-full rounded-xl"
                      placeholder="Your password"
                      value={passwordInput}
                      onChange={(e) => {
                        setPasswordInput(e.target.value);
                        setErr("");
                      }}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShow((s) => !s)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/60"
                      aria-label={show ? "Hide password" : "Show password"}
                    >
                      {show ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                </div>

                {err && <p className="text-error text-sm mt-1">{err}</p>}

                <div className="flex items-center justify-between mt-1">
                  <button
                    type="button"
                    className="text-xs md:text-sm text-rose-600 hover:text-rose-700 underline-offset-2 hover:underline"
                    onClick={goToForgot}
                  >
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  className="btn w-full mt-2 rounded-full border-0
                    bg-gradient-to-r from-[#DC2626] via-[#EA384D] to-[#F97316]
                    text-white font-semibold shadow-lg shadow-red-300/60
                    hover:shadow-red-400/80 transition"
                  disabled={loading}
                >
                  {loading ? "Logging in…" : "Login"}
                </button>

                <p className="text-center font-semibold mt-4 text-xs md:text-sm">
                  or
                </p>

                {/* Google */}
                <button
                  type="button"
                  onClick={handleGoogleSignin}
                  className="btn bg-base-100 text-black border-[#e5e5e5] gap-2 rounded-full flex justify-center items-center w-full"
                  disabled={loading}
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 533.5 544.3"
                    aria-hidden="true"
                  >
                    <path
                      fill="#4285F4"
                      d="M533.5 278.4c0-17.6-1.6-35.5-4.9-52.5H272v99.5h146.9c-6.3 34-25.4 62.8-54.1 82v68h87.4c51.2-47.2 81.3-116.7 81.3-197z"
                    />
                    <path
                      fill="#34A853"
                      d="M272 544.3c73.6 0 135.3-24.3 180.4-66.9l-87.4-68c-24.3 16.4-55.3 26-93 26-71.5 0-132.2-48.3-153.9-113.3H27.1v71.2c45.1 89.4 137.7 150.9 244.9 150.9z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M118.1 322.1c-10.9-32.6-10.9-67.9 0-100.5V150.4H27.1c-39.1 77.9-39.1 170.1 0 248l91-71.3z"
                    />
                    <path
                      fill="#EA4335"
                      d="M272 107.7c40 0 76.2 13.8 104.7 40.9l78.5-78.5C407.1 24.7 345.5 0 272 0 164.8 0 72.2 61.6 27.1 150.4l91 71.2C139.9 156 200.6 107.7 272 107.7z"
                    />
                  </svg>
                  Continue with Google
                </button>

                {/* ✅ Demo Accounts (Premium block) */}
                <div className="mt-5 rounded-2xl border border-base-200 bg-base-200/60 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-extrabold uppercase tracking-wide text-slate-700">
                        Demo login
                      </p>
                      <p className="mt-1 text-[11px] text-base-content/60 leading-5">
                        Explore the app quickly using demo roles. You can either
                        autofill or one-click login.
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-2 text-[11px] px-2 py-1 rounded-full bg-base-200/60 text-slate-700 font-semibold">
                      <FiUser className="w-3.5 h-3.5" />
                      Role-based
                    </span>
                  </div>

                  {/* Autofill buttons */}
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {demoList.map(([key, demo]) => (
                      <button
                        key={key}
                        type="button"
                        disabled={loading}
                        onClick={() => fillDemo(key)}
                        className={`w-full rounded-full border px-3 py-2 text-sm font-semibold transition ${demo.tone}`}
                        title={`Autofill ${demo.label}`}
                      >
                        <span className="inline-flex items-center gap-2 justify-center">
                          <span
                            className={`h-2 w-2 rounded-full ${demo.dot}`}
                          />
                          Autofill {demo.roleTag}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* One-click demo login */}
                  <div className="mt-3 rounded-2xl border border-base-200 bg-base-100 p-3">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <p className="text-[11px] text-base-content/60">
                        One-click: fills credentials and logs you in instantly.
                      </p>

                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          disabled={loading}
                          onClick={() => fillAndLoginDemo("donor")}
                          className="btn btn-sm rounded-full border-0
                            bg-gradient-to-r from-[#DC2626] via-[#EA384D] to-[#F97316]
                            text-white font-semibold shadow-md shadow-red-200/70
                            hover:shadow-red-300/80 transition"
                        >
                          Login as Donor
                        </button>

                        <button
                          type="button"
                          disabled={loading}
                          onClick={() => fillAndLoginDemo("volunteer")}
                          className="btn btn-sm rounded-full border border-sky-200 bg-sky-50 text-sky-700 hover:bg-sky-100"
                        >
                          Login as Volunteer
                        </button>

                        <button
                          type="button"
                          disabled={loading}
                          onClick={() => fillAndLoginDemo("admin")}
                          className="btn btn-sm rounded-full border border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100"
                        >
                          Login as Admin
                        </button>

                        <button
                          type="button"
                          disabled={loading}
                          onClick={() => {
                            clearMessages();
                            setEmailInput("");
                            setPasswordInput("");
                          }}
                          className="btn btn-sm btn-ghost rounded-full"
                        >
                          Clear
                        </button>
                      </div>
                    </div>
                  </div>

                  <p className="mt-3 text-[11px] text-base-content/60">
                    Note: Demo accounts must exist in Firebase Auth
                    (Email/Password) with the same credentials.
                  </p>
                </div>

                <p className="text-center text-xs md:text-sm mt-4">
                  Don&apos;t have an account?{" "}
                  <Link
                    to="/auth/register"
                    className="font-semibold text-rose-600 hover:text-rose-700"
                  >
                    Sign up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </Container>

      {toast && (
        <div className="toast toast-top toast-end z-50">
          <div
            className={`alert ${
              toast.type === "success" ? "alert-success" : "alert-error"
            }`}
          >
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </section>
  );
};

export default Login;

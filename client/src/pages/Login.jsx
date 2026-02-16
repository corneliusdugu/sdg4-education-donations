import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiPost, setToken } from "../api/api";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("testuser@example.com");
  const [password, setPassword] = useState("Computer0070");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setStatus("Signing you in...");

    try {
      const data = await apiPost("/api/auth/login", { email, password }, false);
      setToken(data.token);

      setStatus("Login successful ✅ Redirecting...");
      navigate("/dashboard");
    } catch (err) {
      setStatus("");

      const rawMsg = err && err.message ? String(err.message) : "Login failed";
      const lowered = rawMsg.toLowerCase();

      const looksLikeInvalidCreds =
        lowered.includes("invalid") ||
        lowered.includes("credentials") ||
        lowered.includes("unauthorized") ||
        lowered.includes("401");

      if (looksLikeInvalidCreds) {
        setError(
          "Incorrect email or password. If you recently changed your password, make sure you use the new one."
        );
      } else {
        setError(rawMsg || "Login failed");
      }
    }
  };

  return (
    <section className="relative isolate">
      {/* Soft green background that fills the empty space */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-green-50 via-white to-white" />
      <div className="absolute -z-10 left-1/2 top-[-140px] h-[360px] w-[360px] -translate-x-1/2 rounded-full bg-green-200/40 blur-3xl" />
      <div className="absolute -z-10 right-[-120px] top-[180px] h-[320px] w-[320px] rounded-full bg-emerald-200/30 blur-3xl" />
      <div className="absolute -z-10 left-[-140px] bottom-[120px] h-[340px] w-[340px] rounded-full bg-green-100/60 blur-3xl" />

      {/* IMPORTANT: centers content vertically */}
      <div className="mx-auto flex min-h-[calc(100vh-160px)] max-w-6xl items-center justify-center px-4 py-14">
        <div className="grid w-full max-w-5xl gap-6 md:grid-cols-2">
          {/* LEFT: charity intro panel */}
          <div className="rounded-3xl border border-green-100 bg-white/70 p-8 shadow-sm backdrop-blur">
            <div className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700 ring-1 ring-green-100">
              True Tuition • SDG 4
            </div>

            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900">
              Welcome back
            </h1>

            <p className="mt-2 text-sm text-slate-600">
              Sign in to donate to <b>SDG 4 (Quality Education)</b> and track your donation history in
              your dashboard.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-green-100 bg-white p-4">
                <div className="text-xs text-slate-500">Secure</div>
                <div className="mt-1 text-sm font-bold text-slate-900">JWT Authentication</div>
              </div>
              <div className="rounded-2xl border border-green-100 bg-white p-4">
                <div className="text-xs text-slate-500">Transparent</div>
                <div className="mt-1 text-sm font-bold text-slate-900">Donation Records</div>
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-green-50 p-4 text-sm text-slate-700 ring-1 ring-green-100">
              <p className="font-semibold text-slate-900">Why this matters</p>
              <p className="mt-1 text-slate-600">
                Your support helps fund learning materials, school supplies, and safer classrooms for
                children in developing countries.
              </p>
            </div>
          </div>

          {/* RIGHT: login form card */}
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-lg font-extrabold text-slate-900">Log in</h2>
            <p className="mt-1 text-sm text-slate-600">Enter your email and password.</p>

            <form onSubmit={handleLogin} className="mt-6 grid gap-4">
              <div>
                <label className="text-sm font-semibold text-slate-700">Email</label>
                <input
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-green-200"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="name@example.com"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700">Password</label>
                <input
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-green-200"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="••••••••"
                  required
                />
              </div>

              <button className="mt-2 rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white hover:bg-green-700">
                Log in
              </button>

              {(status || error) && (
                <div className="space-y-2">
                  {status && (
                    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                      <b>Status:</b> {status}
                    </div>
                  )}
                  {error && (
                    <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
                      <b>Error:</b> {error}
                    </div>
                  )}
                </div>
              )}

              <p className="text-sm text-slate-600">
                Don&apos;t have an account?{" "}
                <Link to="/register" className="font-semibold text-green-700 hover:underline">
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

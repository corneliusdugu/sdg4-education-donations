import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiPost, setToken } from "../api/api";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setStatus("Creating your account...");

    if (name.trim().length < 2) {
      setStatus("");
      setError("Please enter your full name.");
      return;
    }
    if (!email.includes("@")) {
      setStatus("");
      setError("Please enter a valid email address.");
      return;
    }
    if (String(password).length < 6) {
      setStatus("");
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      const data = await apiPost("/api/auth/register", { name, email, password }, false);

      setToken(data.token);
      setStatus("Account created ✅ Redirecting...");
      navigate("/dashboard");
    } catch (err) {
      setStatus("");

      const rawMsg = err && err.message ? String(err.message) : "Registration failed";
      const lowered = rawMsg.toLowerCase();

      const looksLikeEmailExists =
        lowered.includes("exists") ||
        lowered.includes("already") ||
        lowered.includes("duplicate") ||
        lowered.includes("e11000") ||
        lowered.includes("email");

      if (looksLikeEmailExists) {
        setError("That email is already registered. Please sign in instead.");
      } else if (lowered.includes("password") && lowered.includes("6")) {
        setError("Password must be at least 6 characters.");
      } else if (lowered.includes("valid") && lowered.includes("email")) {
        setError("Please enter a valid email address.");
      } else {
        setError(rawMsg || "Registration failed");
      }
    }
  };

  return (
    <section className="relative isolate">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-green-50 via-white to-white" />
      <div className="absolute -z-10 left-1/2 top-[-140px] h-[360px] w-[360px] -translate-x-1/2 rounded-full bg-green-200/40 blur-3xl" />
      <div className="absolute -z-10 right-[-120px] top-[180px] h-[320px] w-[320px] rounded-full bg-emerald-200/30 blur-3xl" />
      <div className="absolute -z-10 left-[-140px] bottom-[120px] h-[340px] w-[340px] rounded-full bg-green-100/60 blur-3xl" />

      <div className="mx-auto flex min-h-[calc(100vh-160px)] max-w-6xl items-center justify-center px-4 py-14">
        <div className="grid w-full max-w-5xl gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-green-100 bg-white/70 p-8 shadow-sm backdrop-blur">
            <div className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700 ring-1 ring-green-100">
              True Tuition • SDG 4
            </div>

            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900">
              Join our mission
            </h1>

            <p className="mt-2 text-sm text-slate-600">
              Create an account to donate toward <b>Quality Education</b> and track your impact over
              time.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-green-100 bg-white p-4">
                <div className="text-xs text-slate-500">SDG4 only</div>
                <div className="mt-1 text-sm font-bold text-slate-900">Focused Giving</div>
              </div>
              <div className="rounded-2xl border border-green-100 bg-white p-4">
                <div className="text-xs text-slate-500">Dashboard</div>
                <div className="mt-1 text-sm font-bold text-slate-900">Track Donations</div>
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-green-50 p-4 text-sm text-slate-700 ring-1 ring-green-100">
              <p className="font-semibold text-slate-900">What you can do</p>
              <p className="mt-1 text-slate-600">
                Donate for learning materials, school supplies, and safe classroom support — all linked
                to your account.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-lg font-extrabold text-slate-900">Create account</h2>
            <p className="mt-1 text-sm text-slate-600">Enter your details to get started.</p>

            <form onSubmit={handleRegister} className="mt-6 grid gap-4">
              <div>
                <label className="text-sm font-semibold text-slate-700">Full name</label>
                <input
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-green-200"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Your name"
                  required
                />
              </div>

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
                  placeholder="Minimum 6 characters"
                  required
                />
              </div>

              <button className="mt-2 rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white hover:bg-green-700">
                Create account
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
                      {String(error).toLowerCase().includes("already registered") && (
                        <div className="mt-2">
                          <Link
                            to="/login"
                            className="font-semibold text-green-700 hover:underline"
                          >
                            Go to Login
                          </Link>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              <p className="text-sm text-slate-600">
                Already have an account?{" "}
                <Link to="/login" className="font-semibold text-green-700 hover:underline">
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useMemo, useState } from "react";
import { apiGet, apiPost } from "../api/api";
import { Link, useNavigate } from "react-router-dom";

export default function Donate() {
  const navigate = useNavigate();

  const [amount, setAmount] = useState(20);
  const [message, setMessage] = useState("Supporting school supplies for children");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [lastDonation, setLastDonation] = useState(null);

  const presets = [10, 20, 50, 100];

  const impactText = useMemo(() => {
    const a = Number(amount || 0);
    if (a >= 100) return "Supports larger learning resources and classroom support.";
    if (a >= 50) return "Helps fund a small classroom resource fund.";
    if (a >= 20) return "Helps provide school supplies for a learner.";
    if (a >= 10) return "Helps provide basic learning materials.";
    return "Supports education access through practical learning support.";
  }, [amount]);

  const donate = async (e) => {
    e.preventDefault();
    setError("");
    setStatus("Recording your donation...");

    try {
      await apiPost("/api/donations", { amount: Number(amount), message }, true);
      const mine = await apiGet("/api/donations/mine", true);
      const newest = mine.donations?.[0] || null;

      setLastDonation(newest);
      setStatus("Thank you! Your donation has been recorded ✅");
      setMessage("");
    } catch (err) {
      setStatus("");
      setError(err.message || "Donation failed");
    }
  };

  return (
    <div>
      <section className="bg-gradient-to-b from-green-50 to-white">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="inline-flex rounded-full bg-white px-3 py-1 text-xs font-semibold text-green-700 ring-1 ring-green-100">
                SDG 4 • Quality Education
              </div>
              <h1 className="mt-3 text-3xl font-extrabold text-slate-900">Make a Donation</h1>
              <p className="mt-2 max-w-2xl text-slate-600">
                Your donation supports education access — learning materials, school supplies, and safer
                learning environments for children in developing countries.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link
                to="/dashboard"
                className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-slate-50"
              >
                Dashboard
              </Link>
              <button
                onClick={() => navigate(-1)}
                className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-slate-50"
              >
                Go back
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 pb-14">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-extrabold text-slate-900">Donation details</h2>
                    <p className="mt-1 text-sm text-slate-600">
                      Choose an amount, add a short message if you want, and submit your donation.
                    </p>
                  </div>

                  <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                    Education-focused
                  </span>
                </div>

                <div className="mt-5">
                  <div className="text-sm font-bold text-slate-700">Quick amounts</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {presets.map((p) => {
                      const active = Number(amount) === p;
                      return (
                        <button
                          key={p}
                          type="button"
                          onClick={() => setAmount(p)}
                          className={`rounded-xl px-4 py-2 text-sm font-semibold border ${
                            active
                              ? "border-green-600 bg-green-600 text-white"
                              : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          £{p}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <form onSubmit={donate} className="mt-6 grid gap-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-sm font-bold text-slate-700">Amount (GBP)</label>
                      <div className="mt-1 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 focus-within:ring-2 focus-within:ring-green-200">
                        <span className="text-slate-500 font-semibold">£</span>
                        <input
                          className="w-full outline-none"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          type="number"
                          min="1"
                          step="1"
                          required
                        />
                      </div>
                      <p className="mt-2 text-xs text-slate-500">{impactText}</p>
                    </div>

                    <div>
                      <label className="text-sm font-bold text-slate-700">Message (optional)</label>
                      <input
                        className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:ring-2 focus:ring-green-200"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        type="text"
                        placeholder="e.g., Supporting learning materials"
                      />
                      <p className="mt-2 text-xs text-slate-500">
                        This appears in your donation history (dashboard).
                      </p>
                    </div>
                  </div>

                  <button className="mt-1 rounded-xl bg-green-600 px-5 py-3 text-sm font-extrabold text-white hover:bg-green-700">
                    Donate now
                  </button>

                  {(status || error) && (
                    <div className="mt-2 space-y-2 text-sm">
                      {status && (
                        <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 font-semibold text-green-800">
                          {status}
                        </div>
                      )}
                      {error && (
                        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 font-semibold text-red-700">
                          {error}
                        </div>
                      )}
                    </div>
                  )}
                </form>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 p-5">
                  <div className="text-xs font-bold text-green-700">TRANSPARENCY</div>
                  <p className="mt-2 text-sm text-slate-700">
                    Donations are saved to your account so you can track them in your dashboard.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 p-5">
                  <div className="text-xs font-bold text-green-700">FOCUS</div>
                  <p className="mt-2 text-sm text-slate-700">
                    Giving is education-focused and aligned to SDG 4 (Quality Education).
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 p-5">
                  <div className="text-xs font-bold text-green-700">SIMPLE</div>
                  <p className="mt-2 text-sm text-slate-700">
                    Pick an amount, submit, then view your donation history instantly.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="rounded-2xl border border-slate-200 bg-green-50 p-6">
                  <h3 className="text-lg font-extrabold text-slate-900">Donation summary</h3>

                  <div className="mt-4 space-y-2 text-sm text-slate-700">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Amount</span>
                      <span className="font-extrabold text-slate-900">£{Number(amount || 0) || 0}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Focus</span>
                      <span className="font-semibold text-slate-900">Quality Education</span>
                    </div>
                    <div className="pt-3 border-t border-green-200">
                      <div className="text-xs font-bold text-green-800">IMPACT NOTE</div>
                      <p className="mt-1 text-sm text-slate-700">{impactText}</p>
                    </div>
                  </div>
                </div>

                {lastDonation && (
                  <div className="rounded-2xl border border-slate-200 bg-white p-6">
                    <h3 className="text-lg font-extrabold text-slate-900">Latest receipt</h3>

                    <div className="mt-4 space-y-2 text-sm text-slate-700">
                      <div>
                        <span className="text-slate-600">Amount:</span>{" "}
                        <span className="font-extrabold text-slate-900">£{lastDonation.amount}</span>
                      </div>
                      <div>
                        <span className="text-slate-600">Date:</span>{" "}
                        <span className="font-semibold">
                          {new Date(lastDonation.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-600">Status:</span>{" "}
                        <span className="font-semibold">{lastDonation.status}</span>
                      </div>
                      {lastDonation.message ? (
                        <div>
                          <span className="text-slate-600">Message:</span>{" "}
                          <span className="font-semibold">{lastDonation.message}</span>
                        </div>
                      ) : null}
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                      <Link
                        to="/dashboard"
                        className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
                      >
                        View dashboard
                      </Link>
                      <Link
                        to="/"
                        className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-slate-50"
                      >
                        Home
                      </Link>
                    </div>
                  </div>
                )}

                {!lastDonation && (
                  <div className="rounded-2xl border border-slate-200 bg-white p-6">
                    <h3 className="text-lg font-extrabold text-slate-900">After you donate</h3>
                    <p className="mt-2 text-sm text-slate-600">
                      You’ll see a receipt here and your donation history will be available in the dashboard.
                    </p>

                    <div className="mt-4">
                      <Link
                        to="/dashboard"
                        className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-slate-50"
                      >
                        Go to dashboard
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

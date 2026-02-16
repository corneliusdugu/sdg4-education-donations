import { useEffect, useMemo, useState } from "react";
import { apiGet, apiPut } from "../api/api";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [me, setMe] = useState(null);
  const [donations, setDonations] = useState([]);

  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  // Profile edit form
  const [editName, setEditName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);

  const total = useMemo(
    () => donations.reduce((sum, d) => sum + Number(d.amount || 0), 0),
    [donations]
  );

  const count = donations.length;

  const lastDonationDate = useMemo(() => {
    if (!donations.length) return null;
    const d = donations[0];
    return d?.createdAt ? new Date(d.createdAt).toLocaleString() : null;
  }, [donations]);

  const load = async () => {
    setError("");
    setStatus("Loading dashboard...");

    try {
      const profile = await apiGet("/api/auth/me", true);
      const mine = await apiGet("/api/donations/mine", true);

      setMe(profile.user);
      setDonations(mine.donations || []);
      setStatus("");
    } catch (err) {
      setStatus("");
      setError(err.message || "Failed to load dashboard");
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // When profile loads, prefill edit name
  useEffect(() => {
    if (me?.name) setEditName(me.name);
  }, [me]);

  const saveProfile = async (e) => {
    e.preventDefault();
    setError("");
    setStatus("");
    setSaving(true);

    try {
      const payload = {};

      const trimmedName = (editName || "").trim();
      if (trimmedName.length > 0 && trimmedName !== me?.name) payload.name = trimmedName;

      // Password is optional
      const p1 = (newPassword || "").trim();
      const p2 = (confirmPassword || "").trim();

      if (p1.length > 0 || p2.length > 0) {
        if (p1.length < 6) throw new Error("Password must be at least 6 characters");
        if (p1 !== p2) throw new Error("Passwords do not match");
        payload.password = p1;
      }

      if (Object.keys(payload).length === 0) {
        throw new Error("No changes to save");
      }

      const data = await apiPut("/api/auth/me", payload, true);

      // Update UI with returned user
      setMe(data.user);
      setEditName(data.user.name);

      // Clear password boxes after success
      setNewPassword("");
      setConfirmPassword("");

      setStatus("Profile updated ✅");
    } catch (err) {
      setError(err.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      {/* Page header */}
      <section className="bg-gradient-to-b from-green-50 to-white">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="inline-flex rounded-full bg-white px-3 py-1 text-xs font-semibold text-green-700 ring-1 ring-green-100">
                My account
              </div>

              <h1 className="mt-3 text-3xl font-extrabold text-slate-900">Dashboard</h1>

              <p className="mt-2 text-slate-600">
                View your donation history, totals, and account details in one place.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link
                to="/donate"
                className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
              >
                Make a Donation
              </Link>

              <button
                onClick={load}
                className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-slate-50"
              >
                Refresh
              </button>
            </div>
          </div>

          {/* Stats row */}
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-green-100 bg-white p-6">
              <div className="text-xs font-bold text-green-700">TOTAL DONATED</div>
              <div className="mt-2 text-2xl font-extrabold text-slate-900">£{total}</div>
              <p className="mt-1 text-sm text-slate-600">Your total recorded giving.</p>
            </div>

            <div className="rounded-2xl border border-green-100 bg-white p-6">
              <div className="text-xs font-bold text-green-700">DONATIONS</div>
              <div className="mt-2 text-2xl font-extrabold text-slate-900">{count}</div>
              <p className="mt-1 text-sm text-slate-600">Number of donations made.</p>
            </div>

            <div className="rounded-2xl border border-green-100 bg-white p-6">
              <div className="text-xs font-bold text-green-700">LATEST DONATION</div>
              <div className="mt-2 text-base font-extrabold text-slate-900">
                {lastDonationDate || "—"}
              </div>
              <p className="mt-1 text-sm text-slate-600">Most recent donation timestamp.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 pb-14">
          {(error || status) && (
            <div className="mt-6 space-y-2">
              {status && (
                <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-800">
                  {status}
                </div>
              )}
              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                  {error}
                </div>
              )}
            </div>
          )}

          <div className="mt-10 grid gap-8 lg:grid-cols-3">
            {/* Account panel */}
            <div className="space-y-6 lg:col-span-1">
              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <h2 className="text-lg font-extrabold text-slate-900">Account</h2>
                <p className="mt-1 text-sm text-slate-600">Your profile details.</p>

                {!me ? (
                  <div className="mt-5 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
                    Loading...
                  </div>
                ) : (
                  <div className="mt-5 space-y-3 text-sm text-slate-700">
                    <div className="rounded-xl bg-green-50 p-4">
                      <div className="text-xs font-bold text-green-700">SIGNED IN AS</div>
                      <div className="mt-2 text-base font-extrabold text-slate-900">{me.name}</div>
                      <div className="mt-1 text-sm text-slate-700">{me.email}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Edit Profile */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <h2 className="text-lg font-extrabold text-slate-900">Edit account</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Update your name and (optionally) change your password.
                </p>

                <form onSubmit={saveProfile} className="mt-5 grid gap-4">
                  <div>
                    <label className="text-sm font-bold text-slate-700">Name</label>
                    <input
                      className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:ring-2 focus:ring-green-200"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      type="text"
                      placeholder="Your full name"
                      required
                      disabled={!me}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-bold text-slate-700">New password (optional)</label>
                    <input
                      className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:ring-2 focus:ring-green-200"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      type="password"
                      placeholder="Minimum 6 characters"
                      disabled={!me}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-bold text-slate-700">Confirm new password</label>
                    <input
                      className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:ring-2 focus:ring-green-200"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      type="password"
                      placeholder="Repeat new password"
                      disabled={!me}
                    />
                  </div>

                  <button
                    disabled={!me || saving}
                    className={`rounded-xl px-4 py-3 text-sm font-extrabold text-white ${
                      !me || saving ? "bg-slate-300 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    {saving ? "Saving..." : "Save changes"}
                  </button>

                  <p className="text-xs text-slate-500">
                    Tip: Leave password fields blank if you only want to change your name.
                  </p>
                </form>
              </div>
            </div>

            {/* Donations table */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 lg:col-span-2">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h2 className="text-lg font-extrabold text-slate-900">Donation history</h2>
                  <p className="mt-1 text-sm text-slate-600">
                    A record of your donations supporting quality education.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Link
                    to="/donate"
                    className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-slate-50"
                  >
                    Donate
                  </Link>
                  <Link
                    to="/sdg4"
                    className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-slate-50"
                  >
                    About SDG 4
                  </Link>
                </div>
              </div>

              <div className="mt-5 overflow-x-auto rounded-xl border border-slate-200">
                <table className="min-w-full text-sm">
                  <thead className="bg-slate-50 text-left text-slate-600">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Date</th>
                      <th className="px-4 py-3 font-semibold">Amount</th>
                      <th className="px-4 py-3 font-semibold">Purpose</th>
                      <th className="px-4 py-3 font-semibold">Message</th>
                      <th className="px-4 py-3 font-semibold">Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {donations.length === 0 ? (
                      <tr>
                        <td className="px-4 py-5 text-slate-600" colSpan={5}>
                          No donations yet.{" "}
                          <Link className="text-green-700 font-semibold" to="/donate">
                            Make your first donation
                          </Link>
                          .
                        </td>
                      </tr>
                    ) : (
                      donations.map((d) => (
                        <tr key={d._id} className="border-t">
                          <td className="px-4 py-3">{new Date(d.createdAt).toLocaleString()}</td>
                          <td className="px-4 py-3 font-extrabold text-slate-900">£{d.amount}</td>
                          <td className="px-4 py-3">{d.purpose}</td>
                          <td className="px-4 py-3 text-slate-600">{d.message || "-"}</td>
                          <td className="px-4 py-3">
                            <span className="inline-flex rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-700">
                              {d.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs text-slate-500">
                  Showing <b>{donations.length}</b> donation(s)
                </div>

                <button
                  onClick={load}
                  className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-slate-50"
                >
                  Refresh table
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

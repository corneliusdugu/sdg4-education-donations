// client/src/ui/SiteFooter.jsx
import { Link } from "react-router-dom";

export default function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand + Mission */}
          <div>
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-green-700 text-white font-extrabold">
                TT
              </div>
              <div className="text-lg font-extrabold text-slate-900">
                True<span className="text-green-600">Tuition</span>
              </div>
            </div>

            <p className="mt-3 text-sm text-slate-600">
              Supporting <b>UN SDG 4</b> — Quality Education — by helping improve access to learning
              materials, school supplies, and safer learning environments for children in developing
              countries.
            </p>

            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
              ✔ Education-focused giving
            </div>
          </div>

          {/* Quick links */}
          <div>
            <div className="text-sm font-extrabold text-slate-900">Quick links</div>
            <div className="mt-3 grid gap-2 text-sm">
              <Link className="text-slate-600 hover:text-green-700" to="/">
                Home
              </Link>
              <Link className="text-slate-600 hover:text-green-700" to="/sdg4">
                About SDG 4
              </Link>
              <Link className="text-slate-600 hover:text-green-700" to="/donate">
                Donate
              </Link>
              <Link className="text-slate-600 hover:text-green-700" to="/dashboard">
                Dashboard
              </Link>
              <Link className="text-slate-600 hover:text-green-700" to="/register">
                Create account
              </Link>
              <Link className="text-slate-600 hover:text-green-700" to="/login">
                Login
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <div className="text-sm font-extrabold text-slate-900">Contact</div>
            <div className="mt-3 space-y-2 text-sm text-slate-600">
              <p>
                <span className="font-semibold text-slate-800">Email:</span> c.dugu@rgu.ac.uk
              </p>
              <p>
                <span className="font-semibold text-slate-800">Phone:</span> 07823950074
              </p>
              <p>
                <span className="font-semibold text-slate-800">Location:</span> Aberdeen, Scotland
              </p>
            </div>

            <div className="mt-5 rounded-xl bg-green-50 p-4">
              <div className="text-xs font-extrabold text-green-800">Transparency</div>
              <p className="mt-1 text-xs text-green-900/90">
                We aim for clear giving—your donations are recorded and visible in your dashboard history.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-6 text-xs text-slate-500">
          © {new Date().getFullYear()} True Tuition. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

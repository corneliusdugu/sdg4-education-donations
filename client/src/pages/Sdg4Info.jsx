// client/src/pages/Sdg4Info.jsx

import { Link } from "react-router-dom";

export default function Sdg4Info() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-green-50 to-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-green-700 ring-1 ring-green-100">
                UN Sustainable Development Goal 4
              </div>

              <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900">
                SDG 4: Quality Education
              </h1>

              <p className="mt-4 max-w-xl text-slate-600">
                SDG 4 is about ensuring inclusive and equitable quality education and promoting
                lifelong learning opportunities for all. True Tuition focuses donations on SDG 4
                support for children in developing countries.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  to="/donate"
                  className="rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white hover:bg-green-700"
                >
                  Donate to SDG 4
                </Link>
                <Link
                  to="/"
                  className="rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Back to Home
                </Link>
              </div>
            </div>

            {/* Right highlight panel */}
            <div className="rounded-2xl border border-green-100 bg-white p-6">
              <h2 className="text-lg font-extrabold text-slate-900">What “Quality Education” means</h2>
              <p className="mt-2 text-sm text-slate-600">
                It means learners have access to the resources, support, and safe environments needed
                to learn and thrive.
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl bg-green-50 p-4">
                  <div className="text-xs font-bold text-green-700">ACCESS</div>
                  <div className="mt-1 text-sm font-extrabold text-slate-900">Attendance</div>
                </div>
                <div className="rounded-xl bg-green-50 p-4">
                  <div className="text-xs font-bold text-green-700">RESOURCES</div>
                  <div className="mt-1 text-sm font-extrabold text-slate-900">Materials</div>
                </div>
                <div className="rounded-xl bg-green-50 p-4">
                  <div className="text-xs font-bold text-green-700">SAFETY</div>
                  <div className="mt-1 text-sm font-extrabold text-slate-900">Classrooms</div>
                </div>
              </div>

              <div className="mt-6 rounded-xl border border-green-200 bg-white p-4">
                <div className="text-xs font-bold text-green-700">FOCUS</div>
                <p className="mt-1 text-sm text-slate-700">
                  True Tuition supports <b>SDG 4 only</b> — no multi-cause donations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why it matters + Key points */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="grid gap-10 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 p-6">
              <h2 className="text-2xl font-extrabold text-slate-900">Why it matters</h2>
              <p className="mt-3 text-slate-600">
                Education improves opportunities and helps communities grow stronger over time.
                When students have supplies, learning resources, and safe spaces, outcomes improve.
              </p>

              <ul className="mt-5 space-y-3 text-sm text-slate-700">
                <li className="flex gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-green-600" />
                  <span>Education supports better long-term life opportunities.</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-green-600" />
                  <span>Learning materials and supplies improve engagement and progress.</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-green-600" />
                  <span>Safe classrooms help learners attend and stay in school.</span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 p-6">
              <h2 className="text-2xl font-extrabold text-slate-900">How donations help</h2>
              <p className="mt-3 text-slate-600">
                Donations support education needs aligned to SDG 4, such as supplies and materials.
              </p>

              <div className="mt-5 grid gap-3">
                <div className="rounded-xl bg-green-50 p-4">
                  <div className="text-xs font-bold text-green-700">£10</div>
                  <div className="mt-1 text-sm font-extrabold text-slate-900">
                    Basic learning materials
                  </div>
                  <div className="mt-1 text-sm text-slate-700">Books, stationery, and essentials.</div>
                </div>

                <div className="rounded-xl bg-green-50 p-4">
                  <div className="text-xs font-bold text-green-700">£20</div>
                  <div className="mt-1 text-sm font-extrabold text-slate-900">
                    School supplies for a learner
                  </div>
                  <div className="mt-1 text-sm text-slate-700">Supplies to support attendance and study.</div>
                </div>

                <div className="rounded-xl bg-green-50 p-4">
                  <div className="text-xs font-bold text-green-700">£50</div>
                  <div className="mt-1 text-sm font-extrabold text-slate-900">
                    Classroom resource fund
                  </div>
                  <div className="mt-1 text-sm text-slate-700">Small improvements that support learning.</div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/donate"
                  className="rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white hover:bg-green-700"
                >
                  Donate now
                </Link>
                <Link
                  to="/register"
                  className="rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Create an account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="bg-green-50">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="rounded-2xl bg-white p-6 border border-green-100 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-xl font-extrabold text-slate-900">
                Support quality education today
              </h3>
              <p className="mt-1 text-slate-600">
                Join True Tuition and help improve learning access for children in developing countries.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/donate"
                className="rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white hover:bg-green-700"
              >
                Donate
              </Link>
              <Link
                to="/dashboard"
                className="rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                View dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

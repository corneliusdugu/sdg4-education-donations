import { Link } from "react-router-dom";
import { getToken } from "../api/api";
import HeroSlider from "../ui/HeroSlider";

export default function Home() {
  const authed = Boolean(getToken());

  // Images served from /public (no imports needed)
  const slides = [
    { src: "/images/hero-1.jpeg", alt: "Children learning in a classroom" },
    { src: "/images/hero-2.jpeg", alt: "School supplies supporting education" },
    { src: "/images/hero-3.jpeg", alt: "Students reading and studying" },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-green-50 to-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-2 md:items-center">
          {/* LEFT */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-green-700 ring-1 ring-green-100">
              UN SDG 4 • Quality Education
            </div>

            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900">
              Help children access quality education in developing countries.
            </h1>

            <p className="mt-4 text-slate-600">
              <b>True Tuition</b> is a donation platform focused on education support — helping provide
              learning materials, school supplies, and safer learning environments.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to={authed ? "/donate" : "/register"}
                className="rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white hover:bg-green-700"
              >
                {authed ? "Make a donation" : "Get started"}
              </Link>

              <Link
                to="/sdg4"
                className="rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Learn about SDG 4
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3 text-sm">
              <div className="rounded-xl border border-green-100 bg-white p-4">
                <div className="text-xs text-slate-500">Focus</div>
                <div className="mt-1 font-bold">School Supplies</div>
              </div>
              <div className="rounded-xl border border-green-100 bg-white p-4">
                <div className="text-xs text-slate-500">Focus</div>
                <div className="mt-1 font-bold">Learning Materials</div>
              </div>
              <div className="rounded-xl border border-green-100 bg-white p-4">
                <div className="text-xs text-slate-500">Focus</div>
                <div className="mt-1 font-bold">Safe Classrooms</div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <HeroSlider slides={slides} />

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl bg-green-50 p-4">
                <div className="text-xs text-slate-500">Mission</div>
                <div className="mt-1 font-extrabold text-slate-900">Quality Education</div>
              </div>
              <div className="rounded-xl bg-green-50 p-4">
                <div className="text-xs text-slate-500">Program</div>
                <div className="mt-1 font-extrabold text-slate-900">School Supplies</div>
              </div>
              <div className="rounded-xl bg-green-50 p-4">
                <div className="text-xs text-slate-500">Impact</div>
                <div className="mt-1 font-extrabold text-slate-900">Better Outcomes</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About True Tuition */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="grid gap-10 md:grid-cols-2 md:items-start">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                About True Tuition
              </div>

              <h2 className="mt-4 text-2xl md:text-3xl font-extrabold text-slate-900">
                A focused platform supporting SDG 4: Quality Education.
              </h2>

              <p className="mt-3 text-slate-600">
                True Tuition supports education access for children in developing countries through
                clear, education-focused giving and transparent donation tracking.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-slate-200 p-5">
                  <div className="text-xs font-bold text-green-700">MISSION</div>
                  <p className="mt-2 text-sm text-slate-700">
                    Support education access through supplies, learning materials, and safer learning spaces.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 p-5">
                  <div className="text-xs font-bold text-green-700">VISION</div>
                  <p className="mt-2 text-sm text-slate-700">
                    A world where every child can learn with the resources they need to succeed.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 p-5">
                  <div className="text-xs font-bold text-green-700">VALUES</div>
                  <p className="mt-2 text-sm text-slate-700">
                    Transparency, accountability, and meaningful education impact.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-green-50 p-6">
              <h3 className="text-lg font-extrabold text-slate-900">What donations support</h3>
              <p className="mt-2 text-sm text-slate-700">
                Donations go toward practical education support that helps children learn and thrive.
              </p>

              <ul className="mt-5 space-y-3 text-sm text-slate-800">
                <li className="flex gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-green-600" />
                  <div>
                    <b>Learning materials</b>
                    <div className="text-slate-700">Books, stationery, and curriculum resources.</div>
                  </div>
                </li>

                <li className="flex gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-green-600" />
                  <div>
                    <b>School supplies</b>
                    <div className="text-slate-700">Bags, pens, and essential classroom supplies.</div>
                  </div>
                </li>

                <li className="flex gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-green-600" />
                  <div>
                    <b>Safe learning environments</b>
                    <div className="text-slate-700">Basic improvements that support safe learning.</div>
                  </div>
                </li>
              </ul>

              <div className="mt-6 rounded-xl bg-white p-4 border border-green-200">
                <div className="text-xs font-bold text-green-700">OUR COMMITMENT</div>
                <p className="mt-1 text-sm text-slate-700">
                  We keep our focus on education so donations are simple and easy to understand.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-2xl font-extrabold text-slate-900">How it works</h2>
          <p className="mt-2 max-w-2xl text-slate-600">
            A simple donation journey: create an account → donate → track your giving.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-slate-200 p-6">
              <div className="text-xs font-bold text-green-700">STEP 1</div>
              <div className="mt-2 text-lg font-extrabold">Create an account</div>
              <p className="mt-2 text-sm text-slate-600">
                Sign up to donate and access your personal dashboard.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 p-6">
              <div className="text-xs font-bold text-green-700">STEP 2</div>
              <div className="mt-2 text-lg font-extrabold">Make a donation</div>
              <p className="mt-2 text-sm text-slate-600">
                Support education with an amount and an optional message.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 p-6">
              <div className="text-xs font-bold text-green-700">STEP 3</div>
              <div className="mt-2 text-lg font-extrabold">Track your giving</div>
              <p className="mt-2 text-sm text-slate-600">
                View donation history, totals, and updates in your dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA (no border line above) */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="rounded-3xl bg-gradient-to-r from-green-700 to-green-600 p-6 md:p-8 text-white">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-2xl font-extrabold">Ready to support True Tuition?</h3>
                <p className="mt-2 max-w-2xl text-white/90">
                  Join in and help improve access to quality education through practical support.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  to={authed ? "/donate" : "/register"}
                  className="rounded-xl bg-white px-5 py-3 text-sm font-extrabold text-green-700 hover:bg-green-50"
                >
                  {authed ? "Donate now" : "Create account"}
                </Link>
                <Link
                  to="/sdg4"
                  className="rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-bold text-white hover:bg-white/20"
                >
                  About SDG 4
                </Link>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-2 border-t border-white/20 pt-6 text-sm text-white/90 md:flex-row md:items-center md:justify-between">
              <div>
                <span className="font-extrabold text-white">Contact:</span>{" "}
                c.dugu@rgu.ac.uk • 07823950074
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  to="/dashboard"
                  className="rounded-xl bg-white/10 px-4 py-2 text-sm font-bold text-white hover:bg-white/20"
                >
                  Dashboard
                </Link>
                <Link
                  to="/donate"
                  className="rounded-xl bg-white/10 px-4 py-2 text-sm font-bold text-white hover:bg-white/20"
                >
                  Donate
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <h1 className="text-3xl font-extrabold">Page not found</h1>
        <p className="mt-2 text-slate-600">That route doesn’t exist.</p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white hover:bg-green-700"
        >
          Go Home
        </Link>
      </div>
    </section>
  );
}

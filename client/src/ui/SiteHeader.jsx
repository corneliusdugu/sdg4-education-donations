import { Link, NavLink, useNavigate } from "react-router-dom";
import { clearToken, getToken } from "../api/api";

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-3">
      <div className="grid h-10 w-10 place-items-center rounded-full bg-green-600 text-white font-black">
        TT
      </div>
      <div className="leading-tight">
        <div className="font-extrabold text-slate-900">
          True<span className="text-green-600">Tuition</span>
        </div>
        <div className="text-xs text-slate-500">SDG 4 • Quality Education</div>
      </div>
    </Link>
  );
}

function NavItem({ to, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `rounded-lg px-3 py-2 text-sm font-semibold transition ${
          isActive
            ? "bg-green-50 text-green-700"
            : "text-slate-700 hover:bg-slate-50"
        }`
      }
    >
      {label}
    </NavLink>
  );
}

export default function SiteHeader() {
  const navigate = useNavigate();
  const authed = Boolean(getToken());

  const logout = () => {
    clearToken();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-40 border-b bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Logo />

        <nav className="hidden md:flex items-center gap-1">
          <NavItem to="/" label="Home" />
          <NavItem to="/sdg4" label="About SDG 4" />
          <NavItem to="/donate" label="Donate" />
          <NavItem to="/dashboard" label="Dashboard" />
        </nav>

        <div className="flex items-center gap-2">
          {!authed ? (
            <>
              <Link
                to="/login"
                className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
              >
                Sign up
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/donate"
                className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
              >
                Donate
              </Link>
              <button
                onClick={logout}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold hover:bg-slate-50"
              >
                Log out
              </button>
            </>
          )}
        </div>
      </div>

      <div className="md:hidden border-t">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2">
          <NavLink className="text-sm font-semibold text-slate-700" to="/">
            Home
          </NavLink>
          <NavLink className="text-sm font-semibold text-slate-700" to="/sdg4">
            SDG4
          </NavLink>
          <NavLink className="text-sm font-semibold text-slate-700" to="/donate">
            Donate
          </NavLink>
          <NavLink className="text-sm font-semibold text-slate-700" to="/dashboard">
            Dashboard
          </NavLink>
        </div>
      </div>
    </header>
  );
}

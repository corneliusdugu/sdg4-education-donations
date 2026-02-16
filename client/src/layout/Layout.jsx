import { Outlet } from "react-router-dom";
import SiteHeader from "../ui/SiteHeader.jsx";
import SiteFooter from "../ui/SiteFooter.jsx";

export default function Layout() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <SiteHeader />
      <main className="min-h-[70vh]">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}

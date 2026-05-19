import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-charcoal-950 text-zinc-300 font-sans flex flex-col selection:bg-sandstone-500/20 selection:text-white">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <footer className="border-t border-charcoal-800/40 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-zinc-500 font-light tracking-wide">
            Sthapatya-Kavach &copy; {new Date().getFullYear()} &mdash; Environmental Vulnerability Assessment Framework
          </p>
          <div className="flex gap-4 text-xs font-light tracking-wider text-sandstone-600/60 uppercase">
            <span>Research Platform</span>
            <span>&bull;</span>
            <span>Heritage Conservation</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

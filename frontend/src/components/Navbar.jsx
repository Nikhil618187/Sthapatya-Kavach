import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Monument Analysis", path: "/analysis" },
    { name: "Validation", path: "/validation" },
    { name: "Methodology", path: "/methodology" },
    { name: "Limitations", path: "/limitations" },
  ];

  return (
    <nav className="border-b border-charcoal-800/60 bg-charcoal-950/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-xl font-medium tracking-wide text-zinc-100 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sandstone-500 opacity-80"></span>
              Sthapatya-Kavach
            </Link>
          </div>
          <div className="hidden md:flex space-x-6">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-sm tracking-wide transition-colors duration-200 ${
                    isActive
                      ? "text-sandstone-400 font-medium"
                      : "text-zinc-400 hover:text-zinc-200 font-light"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}

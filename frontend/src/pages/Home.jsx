import { Link } from "react-router-dom";
import PageContainer from "../components/PageContainer";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-32 lg:pt-40 lg:pb-48 border-b border-charcoal-800/40 bg-charcoal-950">
        {/* Subtle, elegant atmospheric lighting */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-sandstone-500/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-sandstone-600/30 to-transparent"></div>
        
        <PageContainer className="relative z-10 text-center">
          <p className="text-sandstone-500/80 text-sm tracking-[0.2em] uppercase mb-4 font-light">Environmental Intelligence</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-zinc-100 mb-6">
            Sthapatya<span className="text-sandstone-400 font-serif italic ml-1">Kavach</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-zinc-400 mx-auto font-light leading-relaxed">
            An advanced vulnerability assessment framework for heritage monuments, bridging conservation science with precise environmental analytics.
          </p>
          <div className="mt-12 flex justify-center gap-6">
            <Link
              to="/analysis"
              className="group relative inline-flex items-center justify-center px-8 py-3 text-sm font-medium text-zinc-100 transition-all duration-200 bg-charcoal-900 border border-sandstone-600/30 hover:border-sandstone-400/50 hover:bg-charcoal-800"
            >
              <span className="relative z-10 tracking-wide">Launch Dashboard</span>
            </Link>
            <Link
              to="/methodology"
              className="inline-flex items-center justify-center px-8 py-3 text-sm font-light text-zinc-400 transition-all duration-200 hover:text-zinc-200"
            >
              <span className="tracking-wide">Review Methodology &rarr;</span>
            </Link>
          </div>
        </PageContainer>
      </section>

      {/* Dashboard Overview Placeholder */}
      <section className="py-20 relative bg-charcoal-950">
        <PageContainer>
          <div className="mb-12 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-normal text-zinc-200 tracking-wide">System Overview</h2>
              <p className="text-zinc-500 text-sm mt-1 font-light">Live assessment metrics and structural health proxies.</p>
            </div>
            <div className="hidden sm:block text-xs tracking-widest text-zinc-600 uppercase">
              Status: Operational
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Metric Card Placeholder 1 */}
            <div className="bg-charcoal-900/30 border border-charcoal-800/60 p-8 hover:border-sandstone-700/30 transition-colors duration-300">
              <h3 className="text-xs font-medium text-zinc-500 uppercase tracking-widest mb-4">Monuments Monitored</h3>
              <div className="text-3xl font-light text-zinc-200 font-serif">--</div>
              <p className="text-xs text-sandstone-600 mt-4 tracking-wide">Awaiting spatial data</p>
            </div>
            {/* Metric Card Placeholder 2 */}
            <div className="bg-charcoal-900/30 border border-charcoal-800/60 p-8 hover:border-sandstone-700/30 transition-colors duration-300">
              <h3 className="text-xs font-medium text-zinc-500 uppercase tracking-widest mb-4">Environmental Variables</h3>
              <div className="text-3xl font-light text-zinc-200 font-serif">--</div>
              <p className="text-xs text-sandstone-600 mt-4 tracking-wide">Awaiting sensor uplink</p>
            </div>
            {/* Metric Card Placeholder 3 */}
            <div className="bg-charcoal-900/30 border border-charcoal-800/60 p-8 hover:border-sandstone-700/30 transition-colors duration-300">
              <h3 className="text-xs font-medium text-zinc-500 uppercase tracking-widest mb-4">Global Vulnerability Index</h3>
              <div className="text-3xl font-light text-zinc-200 font-serif">--</div>
              <p className="text-xs text-sandstone-600 mt-4 tracking-wide">System calibrating</p>
            </div>
          </div>
        </PageContainer>
      </section>
    </div>
  );
}

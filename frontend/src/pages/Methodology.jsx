import PageContainer from "../components/PageContainer";

export default function Methodology() {
  const pipelineSteps = [
    { title: "Geospatial Data Ingestion", desc: "Assimilation of NASA POWER climate telemetry and high-resolution historical atmospheric datasets." },
    { title: "Environmental Stress Indices", desc: "Derivation of fundamental climatic stress vectors (Thermal, Moisture, Precipitation)." },
    { title: "Parametric Modifiers", desc: "Application of localized scalars for Material type, Structural integrity, Soil dynamics, and Pollution exposure." },
    { title: "Deterministic Risk Computation", desc: "Synthesis via transparent multifactorial equations to compute cumulative environmental burden." },
    { title: "Vulnerability Categorization", desc: "Generation of normalized (0-100) Environmental Vulnerability Score and tiered Risk Level." },
    { title: "Empirical Grounding", desc: "Continuous cross-validation against historically observed deterioration patterns to refine scalar weights." }
  ];

  const indices = [
    { abbr: "TFI", name: "Thermal Fatigue Index", mech: "Micro-fracturing via extreme diurnal expansion/contraction cycles.", interp: "Higher index correlates with accelerated mechanical weathering in rigid stone matrices." },
    { abbr: "MVI", name: "Moisture Vulnerability Index", mech: "Capillary rise and persistent dampness facilitating biological colonization.", interp: "Indicates susceptibility to deep-pore saturation and vegetative intrusion." },
    { abbr: "RII", name: "Rain Impact Index", mech: "Kinetic surface erosion and dissolution of calcareous binders.", interp: "Correlates directly with surface material loss in softer sandstone and limestone." },
    { abbr: "SAT", name: "Saturation Index", mech: "Chronic water retention preventing adequate material drying.", interp: "Flags persistent micro-environments highly conducive to mold and rot." },
    { abbr: "SSI", name: "Seasonal Shock Index", mech: "Rapid onset of climatic extremes (e.g., sudden monsoon inundation following severe drought).", interp: "Highlights acute stress events that often trigger macro-structural failures." }
  ];

  return (
    <PageContainer>
      <div className="border-b border-charcoal-800/50 pb-8 mb-16 mt-4">
        <p className="text-sandstone-500/80 text-xs tracking-[0.2em] uppercase mb-4 font-light">Theoretical Framework</p>
        <h1 className="text-3xl sm:text-4xl font-light text-zinc-100 tracking-tight font-serif">Scientific Methodology</h1>
        <p className="mt-4 text-zinc-400 font-light max-w-3xl leading-relaxed text-lg">
          An interpretable, deterministic screening framework for heritage conservation. We translate complex geospatial climate telemetry into actionable vulnerability indices through transparent, peer-reviewable conservation physics.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Left Column: Pipeline Flow */}
        <div className="lg:col-span-5">
          <h2 className="text-sm uppercase tracking-widest font-medium text-zinc-300 mb-10 border-b border-charcoal-800/60 pb-4">Architectural Pipeline</h2>
          
          <div className="relative border-l border-charcoal-800/60 ml-3 md:ml-4 space-y-10 pb-4">
            {pipelineSteps.map((step, index) => (
              <div key={index} className="relative pl-8">
                {/* Connector Node */}
                <div className="absolute w-2 h-2 bg-charcoal-950 border border-sandstone-500 rounded-full -left-[4.5px] top-1.5 ring-4 ring-charcoal-950"></div>
                
                <h3 className="text-zinc-200 font-medium tracking-wide text-sm mb-2">{step.title}</h3>
                <p className="text-zinc-500 font-light text-sm leading-relaxed">{step.desc}</p>
                
                {/* Connecting arrow indicator for all but the last item */}
                {index < pipelineSteps.length - 1 && (
                  <div className="absolute -left-1.5 top-10 text-charcoal-700">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 5v14M19 12l-7 7-7-7"/>
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Detailed Explanations */}
        <div className="lg:col-span-7 space-y-16">
          
          {/* Risk Computation */}
          <section>
            <h2 className="text-sm uppercase tracking-widest font-medium text-zinc-300 mb-8 border-b border-charcoal-800/60 pb-4">Deterministic Risk Computation</h2>
            
            <div className="bg-charcoal-900/30 border border-charcoal-800/50 p-6 md:p-8 font-serif text-center">
              <div className="text-zinc-300 text-lg md:text-xl font-light tracking-wide flex flex-col sm:flex-row items-center justify-center gap-3">
                <span>Vulnerability Score</span>
                <span className="text-sandstone-400">=</span>
                <span className="italic text-zinc-400">f</span>
                <span className="text-zinc-500">(</span>
                <span className="text-sandstone-300">Climate Stress</span>
                <span className="text-zinc-500">)</span>
                <span className="text-sandstone-400">&times;</span>
                <span className="text-zinc-400 border-b border-dashed border-charcoal-600 pb-1">Modifiers</span>
              </div>
            </div>
            
            <div className="mt-6 text-zinc-400 font-light text-sm leading-relaxed space-y-4">
              <p>
                The core of the framework is strictly deterministic. We do not employ black-box deep learning models. Instead, baseline <strong>Climate Stress</strong> is established via historical geospatial data, which is then amplified or mitigated by discrete parametric modifiers:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 list-none p-0">
                <li className="bg-charcoal-900/20 border border-charcoal-800/30 p-4">
                  <strong className="text-zinc-300 font-normal block mb-1">Material Composition</strong>
                  <span className="text-xs text-zinc-500">Porosity and compressive strength coefficients (e.g., Sandstone vs. Granite).</span>
                </li>
                <li className="bg-charcoal-900/20 border border-charcoal-800/30 p-4">
                  <strong className="text-zinc-300 font-normal block mb-1">Structural Typology</strong>
                  <span className="text-xs text-zinc-500">Surface-area-to-volume ratio and exposure profiles.</span>
                </li>
                <li className="bg-charcoal-900/20 border border-charcoal-800/30 p-4">
                  <strong className="text-zinc-300 font-normal block mb-1">Soil Dynamics</strong>
                  <span className="text-xs text-zinc-500">Sub-surface moisture retention and foundation settlement risks.</span>
                </li>
                <li className="bg-charcoal-900/20 border border-charcoal-800/30 p-4">
                  <strong className="text-zinc-300 font-normal block mb-1">Pollution Exposure</strong>
                  <span className="text-xs text-zinc-500">Localized AQI and acid rain deposition multipliers.</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Environmental Indices */}
          <section>
            <h2 className="text-sm uppercase tracking-widest font-medium text-zinc-300 mb-8 border-b border-charcoal-800/60 pb-4">Core Environmental Indices</h2>
            
            <div className="space-y-6">
              {indices.map((idx) => (
                <div key={idx.abbr} className="group border-l-2 border-charcoal-800 hover:border-sandstone-500/50 pl-5 transition-colors duration-300">
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-sandstone-400 font-medium tracking-wider">{idx.abbr}</span>
                    <h3 className="text-zinc-200 font-medium text-sm">{idx.name}</h3>
                  </div>
                  <div className="space-y-2">
                    <p className="text-zinc-400 font-light text-sm"><span className="text-zinc-500 text-xs uppercase tracking-widest mr-2">Mechanism:</span> {idx.mech}</p>
                    <p className="text-zinc-400 font-light text-sm"><span className="text-zinc-500 text-xs uppercase tracking-widest mr-2">Interpretation:</span> {idx.interp}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Boundaries & Limitations */}
          <section>
            <h2 className="text-sm uppercase tracking-widest font-medium text-zinc-300 mb-8 border-b border-charcoal-800/60 pb-4">Boundary Conditions & Scope</h2>
            
            <div className="bg-charcoal-950 border border-charcoal-800/60 p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-charcoal-700"></div>
              <p className="text-zinc-400 font-light text-sm leading-relaxed mb-4">
                To maintain scientific rigor and prevent misinterpretation of the data, the framework explicitly acknowledges the following scope boundaries:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm text-zinc-500 font-light">
                <div className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-charcoal-600"></span>
                  No Finite Element Method (FEM) simulation
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-charcoal-600"></span>
                  No micro-crack propagation modeling
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-charcoal-600"></span>
                  No real-time Structural Health Monitoring (SHM)
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-charcoal-600"></span>
                  No on-site IoT physical sensors
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-charcoal-600"></span>
                  No marine salt crystallization physics
                </div>
              </div>
              <p className="text-zinc-500 font-light text-xs mt-6 italic">
                *Outputs represent large-scale environmental vulnerability trends designed to prioritize engineering resources, not replace physical condition surveys.
              </p>
            </div>
          </section>

        </div>
      </div>
    </PageContainer>
  );
}

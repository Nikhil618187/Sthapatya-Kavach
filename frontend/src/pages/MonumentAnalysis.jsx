import { useState, useEffect } from "react";
import axios from "axios";
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
  ResponsiveContainer, Tooltip as RechartsTooltip 
} from "recharts";
import PageContainer from "../components/PageContainer";
import MetricCard from "../components/MetricCard";
import { monumentsData } from "../data/monuments";

export default function MonumentAnalysis() {
  const [selectedId, setSelectedId] = useState(monumentsData[0].id);
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Keep local description for UI context since backend only returns raw math
  const selectedLocalData = monumentsData.find(m => m.id === selectedId);

  useEffect(() => {
    let isMounted = true;
    
    const fetchAnalysis = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`http://127.0.0.1:8000/analyze/${selectedId}`);
        if (isMounted) {
          setAnalysisData(response.data);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          console.error("Backend connection error:", err);
          setError("Failed to establish telemetry with the environmental risk computation engine. The backend service may be offline or unreachable.");
          setLoading(false);
        }
      }
    };

    fetchAnalysis();
    
    return () => { isMounted = false; };
  }, [selectedId]);

  const radarData = analysisData ? [
    { subject: 'Thermal Fatigue', A: analysisData.indices.tfi, fullMark: 100 },
    { subject: 'Moisture Risk', A: analysisData.indices.mvi, fullMark: 100 },
    { subject: 'Rain Impact', A: analysisData.indices.rii, fullMark: 100 },
    { subject: 'Saturation', A: analysisData.indices.sat, fullMark: 100 },
    { subject: 'Seasonal Shock', A: analysisData.indices.ssi, fullMark: 100 },
  ] : [];

  // Custom tooltip for radar chart to match our dark theme
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-charcoal-900 border border-charcoal-800 p-3 shadow-xl">
          <p className="text-zinc-300 text-xs uppercase tracking-widest mb-1">{payload[0].payload.subject}</p>
          <p className="text-sandstone-400 font-serif text-lg">{payload[0].value} <span className="text-zinc-500 text-xs font-sans">/ 100</span></p>
        </div>
      );
    }
    return null;
  };

  return (
    <PageContainer>
      <div className="border-b border-charcoal-800/50 pb-8 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-light text-zinc-100 tracking-tight font-serif">Monument Analysis</h1>
          <p className="mt-3 text-zinc-400 font-light max-w-2xl">
            Live environmental vulnerability assessments, querying the deterministic computation engine for spatial decay patterns and temporal climate stresses.
          </p>
        </div>
        
        <div className="flex-shrink-0">
          <label htmlFor="monument-select" className="block text-xs uppercase tracking-widest font-medium text-zinc-500 mb-2">
            Target Structure
          </label>
          <div className="relative">
            <select
              id="monument-select"
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
              className="appearance-none bg-charcoal-900 border border-charcoal-700 text-zinc-200 py-2.5 pl-4 pr-10 rounded-none focus:outline-none focus:ring-1 focus:ring-sandstone-500 focus:border-sandstone-500 w-full sm:w-64 tracking-wide font-light cursor-pointer"
            >
              {monumentsData.map((monument) => (
                <option key={monument.id} value={monument.id}>
                  {monument.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-zinc-500">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {loading ? (
        <div className="min-h-[500px] flex flex-col items-center justify-center border border-charcoal-800/30 bg-charcoal-900/10">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-6">
            <span className="block w-8 h-8 rounded-full border-[1px] border-sandstone-600/30 border-t-sandstone-400 animate-spin"></span>
          </div>
          <h3 className="text-sm tracking-widest uppercase font-medium text-zinc-300">Querying Risk Engine</h3>
          <p className="text-zinc-500 mt-3 font-light text-sm">
            Fetching deterministic parameters for {selectedLocalData.name}...
          </p>
        </div>
      ) : error ? (
        <div className="min-h-[500px] flex items-center justify-center border border-charcoal-800/30 bg-charcoal-900/10 p-8">
          <div className="bg-charcoal-900/50 border border-charcoal-700/50 p-8 max-w-lg w-full text-center">
            <div className="inline-flex items-center justify-center w-10 h-10 border border-charcoal-600 mb-4 text-zinc-400 font-serif">!</div>
            <h3 className="text-sm tracking-widest uppercase font-medium text-zinc-300 mb-3">Connection Severed</h3>
            <p className="text-zinc-400 font-light text-sm leading-relaxed">
              {error}
            </p>
            <button 
              onClick={() => setSelectedId(selectedId)} // Triggers re-render and fetch
              className="mt-6 px-6 py-2 border border-charcoal-600 text-xs uppercase tracking-widest text-zinc-300 hover:border-sandstone-500/50 hover:text-sandstone-400 transition-colors"
            >
              Retry Connection
            </button>
          </div>
        </div>
      ) : analysisData ? (
        <>
          {/* Metrics Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <MetricCard 
              title="Global Risk Score" 
              value={analysisData.finalRisk} 
              unit="/ 100"
              level={analysisData.riskLevel}
              subtext="Computed vulnerability index"
            />
            <MetricCard 
              title="Vulnerability Level" 
              value={analysisData.riskLevel} 
              level={analysisData.riskLevel}
              subtext={`+${(analysisData.modifiers.total_penalty * 100).toFixed(0)}% scalar penalty`}
            />
            <MetricCard 
              title="Base Climate Stress" 
              value={analysisData.climateScore} 
              unit="/ 100"
              subtext="Unmodified index average"
            />
            <MetricCard 
              title="Primary Modifier" 
              value={(Math.max(analysisData.modifiers.material, analysisData.modifiers.pollution, analysisData.modifiers.soil, analysisData.modifiers.structure) * 100).toFixed(0)} 
              unit="%"
              subtext="Highest structural penalty"
            />
          </div>

          {/* Analysis Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            
            {/* Radar Chart Panel */}
            <div className="lg:col-span-2 bg-charcoal-900/20 border border-charcoal-800/40 p-8 flex flex-col relative">
              <h3 className="text-sm uppercase tracking-widest font-medium text-zinc-300 mb-6">Multivariate Stress Profile</h3>
              
              <div className="flex-grow w-full h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                    <PolarGrid stroke="#27272a" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#a1a1aa', fontSize: 12, fontWeight: 300, letterSpacing: '0.05em' }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#52525b', fontSize: 10 }} tickCount={6} />
                    <RechartsTooltip content={<CustomTooltip />} />
                    <Radar 
                      name="Stress Level" 
                      dataKey="A" 
                      stroke="#c1a661" 
                      strokeWidth={1.5}
                      fill="#c1a661" 
                      fillOpacity={0.15} 
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Scientific Context Panel */}
            <div className="bg-charcoal-900/30 border border-charcoal-800/40 p-8">
              <h3 className="text-sm uppercase tracking-widest font-medium text-zinc-300 mb-6 pb-4 border-b border-charcoal-800/60">Diagnostic Synthesis</h3>
              
              <div className="prose prose-invert prose-sm">
                <h4 className="text-sandstone-400 font-serif text-xl font-light mb-4">{analysisData.monument}</h4>
                <p className="text-zinc-400 font-light leading-relaxed mb-6">
                  {selectedLocalData?.description || "Awaiting structural synthesis."}
                </p>
                
                <h5 className="text-xs uppercase tracking-widest font-medium text-zinc-500 mb-3 mt-8">Computed Parameters</h5>
                <ul className="text-zinc-500 font-light text-xs space-y-2 list-none p-0 border-l-2 border-charcoal-800 pl-3">
                  <li>Material Base: <span className="text-zinc-400 uppercase">{analysisData.traits.material}</span> ({(analysisData.modifiers.material * 100).toFixed(0)}% penalty)</li>
                  <li>Structural Form: <span className="text-zinc-400 uppercase">{analysisData.traits.structure}</span> ({(analysisData.modifiers.structure * 100).toFixed(0)}% penalty)</li>
                  <li>Soil Profile: <span className="text-zinc-400 uppercase">{analysisData.traits.soil}</span> ({(analysisData.modifiers.soil * 100).toFixed(0)}% penalty)</li>
                  <li>Pollution Load: <span className="text-zinc-400 uppercase">{analysisData.traits.pollution}</span> ({(analysisData.modifiers.pollution * 100).toFixed(0)}% penalty)</li>
                </ul>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </PageContainer>
  );
}

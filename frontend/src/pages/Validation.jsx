import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, Cell
} from "recharts";
import PageContainer from "../components/PageContainer";
import MetricCard from "../components/MetricCard";
import { validationData } from "../data/validationData";

export default function Validation() {
  const totalCases = validationData.length;
  const alignedCases = validationData.filter(d => d.aligned).length;
  const accuracy = Math.round((alignedCases / totalCases) * 100);

  // Custom Y-Axis formatting for categorical visualization
  const formatYAxis = (tickItem) => {
    switch(tickItem) {
      case 1: return "LOW";
      case 2: return "MODERATE";
      case 3: return "HIGH";
      default: return "";
    }
  };

  // Custom tooltip to show categorical values instead of numeric scores
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-charcoal-900 border border-charcoal-800 p-4 shadow-xl">
          <p className="text-zinc-300 text-xs uppercase tracking-widest mb-3 border-b border-charcoal-800/60 pb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className={`text-sm mb-1 ${entry.dataKey === 'expectedScore' ? 'text-zinc-400' : 'text-sandstone-400'}`}>
              <span className="font-light">{entry.name}:</span> <span className="font-medium">{entry.payload[entry.dataKey === 'expectedScore' ? 'expected' : 'predicted']}</span>
            </p>
          ))}
          {payload[0].payload.aligned ? (
            <p className="text-emerald-500/80 text-xs tracking-wider mt-3 font-medium uppercase">Model Aligned</p>
          ) : (
            <p className="text-red-400/80 text-xs tracking-wider mt-3 font-medium uppercase">Validation Mismatch</p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <PageContainer>
      <div className="border-b border-charcoal-800/50 pb-8 mb-10">
        <h1 className="text-3xl font-light text-zinc-100 tracking-tight font-serif">Model Validation & Empirical Grounding</h1>
        <p className="mt-3 text-zinc-400 font-light max-w-3xl leading-relaxed">
          Comparing the framework's theoretical environmental vulnerability indices against historically observed structural degradation. This is an interpretable screening framework, not a definitive collapse predictor.
        </p>
      </div>
      
      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        <MetricCard 
          title="Validation Cohort" 
          value={totalCases} 
          unit="Sites"
          subtext="Geographically diverse sample"
        />
        <MetricCard 
          title="Empirical Alignment" 
          value={alignedCases} 
          unit={`/ ${totalCases}`}
          subtext="Correct vulnerability categorization"
        />
        <MetricCard 
          title="Diagnostic Accuracy" 
          value={accuracy} 
          unit="%"
          subtext="Baseline model confidence"
          trend={accuracy >= 80 ? "Sufficient for screening" : "Refinement required"}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10 mb-16">
        {/* Chart Panel */}
        <div className="xl:col-span-2 bg-charcoal-900/20 border border-charcoal-800/40 p-6 sm:p-8 flex flex-col">
          <h3 className="text-sm uppercase tracking-widest font-medium text-zinc-300 mb-8 border-b border-charcoal-800/60 pb-4">Theoretical vs. Observed Vulnerability</h3>
          
          <div className="flex-grow w-full h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={validationData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis 
                  dataKey="monument" 
                  tick={{ fill: '#a1a1aa', fontSize: 11, fontWeight: 300 }} 
                  angle={-45} 
                  textAnchor="end"
                  tickMargin={15}
                  axisLine={{ stroke: '#3f3f46' }}
                  tickLine={false}
                />
                <YAxis 
                  domain={[0, 4]} 
                  ticks={[1, 2, 3]} 
                  tickFormatter={formatYAxis}
                  tick={{ fill: '#a1a1aa', fontSize: 10, letterSpacing: '0.05em' }} 
                  axisLine={false}
                  tickLine={false}
                />
                <RechartsTooltip content={<CustomTooltip />} cursor={{ fill: '#27272a', opacity: 0.4 }} />
                <Legend wrapperStyle={{ paddingTop: '20px', fontSize: '12px', fontWeight: 300, color: '#a1a1aa' }} />
                
                <Bar name="Observed Ground Truth" dataKey="expectedScore" fill="#3f3f46" radius={[2, 2, 0, 0]} maxBarSize={40} />
                <Bar name="Predicted Model Output" dataKey="predictedScore" radius={[2, 2, 0, 0]} maxBarSize={40}>
                  {
                    validationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.aligned ? '#c1a661' : '#b91c1c'} opacity={entry.aligned ? 0.8 : 0.6} />
                    ))
                  }
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Scientific Interpretation Panel */}
        <div className="bg-charcoal-900/30 border border-charcoal-800/40 p-6 sm:p-8 flex flex-col">
          <h3 className="text-sm uppercase tracking-widest font-medium text-zinc-300 mb-6 border-b border-charcoal-800/60 pb-4">Scientific Interpretation</h3>
          
          <div className="prose prose-invert prose-sm flex-grow">
            <h4 className="text-sandstone-400 font-serif font-light mb-3">Model Alignment Analytics</h4>
            <p className="text-zinc-400 font-light leading-relaxed mb-6">
              The framework demonstrates strong baseline alignment ({accuracy}%) in correctly categorizing standard 
              environmental vulnerabilities (e.g., pollution deposition, thermal cycling). It successfully functions 
              as an interpretable screening tool to prioritize structural engineering surveys.
            </p>
            
            <h4 className="text-sandstone-400 font-serif font-light mb-3">Analysis of Mismatches</h4>
            <p className="text-zinc-400 font-light leading-relaxed mb-2">
              Explainable divergence is a critical feature of deterministic scientific models. 
              The current iteration exhibits a known limitation with complex coastal microclimates.
            </p>
            <ul className="text-zinc-500 font-light space-y-2 list-disc pl-4 mt-3">
              <li><strong>Marine Aerosol Deficit:</strong> The model currently underestimates degradation vectors tied to high-salinity coastal winds.</li>
              <li><strong>Salt Crystallization:</strong> Deep-pore salt crystallization cycling, observed critically at the Konark Sun Temple, is not yet explicitly parameterized in the equations.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Validation Case Log */}
      <div className="bg-charcoal-900/20 border border-charcoal-800/40 overflow-hidden">
        <div className="px-6 py-5 border-b border-charcoal-800/60 bg-charcoal-900/50">
          <h3 className="text-sm uppercase tracking-widest font-medium text-zinc-300">Empirical Case Log</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-charcoal-950/50 text-zinc-500 font-light tracking-wider text-xs uppercase border-b border-charcoal-800/40">
              <tr>
                <th className="px-6 py-4 font-medium">Structure</th>
                <th className="px-6 py-4 font-medium">Model Prediction</th>
                <th className="px-6 py-4 font-medium">Observed Truth</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Diagnostic Explanation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal-800/30">
              {validationData.map((case_data) => (
                <tr key={case_data.id} className="hover:bg-charcoal-900/40 transition-colors">
                  <td className="px-6 py-4 font-serif text-zinc-200">{case_data.monument}</td>
                  <td className="px-6 py-4 font-light text-zinc-400">{case_data.predicted}</td>
                  <td className="px-6 py-4 font-light text-zinc-400">{case_data.expected}</td>
                  <td className="px-6 py-4">
                    {case_data.aligned ? (
                      <span className="inline-flex items-center gap-1.5 text-emerald-500/80 text-xs tracking-wider font-medium uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80"></span> Aligned
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-red-400/80 text-xs tracking-wider font-medium uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500/80"></span> Mismatch
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 font-light text-zinc-500 max-w-md leading-relaxed">{case_data.explanation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageContainer>
  );
}

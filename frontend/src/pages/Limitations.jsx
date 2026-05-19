import PageContainer from "../components/PageContainer";

export default function Limitations() {
  return (
    <PageContainer>
      <div className="border-b border-charcoal-800/50 pb-8 mb-12">
        <h1 className="text-3xl font-light text-zinc-100 tracking-tight font-serif">System Limitations</h1>
        <p className="mt-3 text-zinc-400 font-light max-w-3xl">
          Known constraints and scope boundaries of the current framework.
        </p>
      </div>
      
      <div className="bg-charcoal-900/20 border border-sandstone-700/20 p-8 sm:p-10 relative overflow-hidden">
        {/* Subtle decorative accent */}
        <div className="absolute top-0 left-0 w-1 h-full bg-sandstone-600/40"></div>
        
        <div className="flex items-start">
          <div className="flex-shrink-0 mt-1">
            <span className="inline-flex w-6 h-6 border border-sandstone-500/50 items-center justify-center text-sandstone-400 font-serif text-xs">i</span>
          </div>
          <div className="ml-6">
            <h3 className="text-sm tracking-widest uppercase font-medium text-zinc-200">Important Disclaimers</h3>
            <ul className="mt-6 space-y-5 text-zinc-400 font-light list-none p-0">
              <li className="relative pl-5">
                <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-charcoal-700"></span>
                <strong className="text-zinc-300 font-normal block mb-1">Not a collapse prediction system</strong>
                This tool evaluates environmental vulnerability trends, not immediate structural failure risks.
              </li>
              <li className="relative pl-5">
                <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-charcoal-700"></span>
                <strong className="text-zinc-300 font-normal block mb-1">Not a replacement for structural engineers</strong>
                All outputs require professional interpretation by qualified conservation architects or structural engineers.
              </li>
              <li className="relative pl-5">
                <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-charcoal-700"></span>
                <strong className="text-zinc-300 font-normal block mb-1">Data dependency</strong>
                The accuracy of vulnerability indices is strictly bound by the quality and temporal resolution of the input climate data.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

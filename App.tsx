import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ROICalculator from './components/ROICalculator';
import GeminiAdvisor from './components/GeminiAdvisor';
import { ViewState, KPI } from './types';
import { KPIS, PLAYBOOK } from './constants';
import { 
  ArrowRight, 
  CheckCircle2, 
  BarChart, 
  TrendingUp, 
  ShieldCheck, 
  DollarSign,
  Search
} from 'lucide-react';
import { ResponsiveContainer, BarChart as ReBarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, AreaChart, Area } from 'recharts';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [kpiSearch, setKpiSearch] = useState('');

  // Case Study Data for Chart
  const caseStudyData = [
    { name: 'Year 0', Cost: 330000, NetValue: -330000 },
    { name: 'Year 1', Cost: 0, NetValue: -95625 }, // -330k + 234,375
    { name: 'Year 2', Cost: 0, NetValue: 138750 }, // -95k + 234,375
    { name: 'Year 3', Cost: 0, NetValue: 373125 }, // 138k + 234,375
  ];

  const renderContent = () => {
    switch (currentView) {
      case ViewState.HOME:
        return (
          <div className="space-y-8 animate-fade-in">
            {/* Hero */}
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-slate-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 transform translate-x-1/2 -translate-y-1/2"></div>
              <div className="relative z-10 max-w-2xl">
                <span className="text-blue-600 font-semibold tracking-wide uppercase text-sm mb-2 block">Enterprise Guide</span>
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                  Get the Most Bang for Your Buck: A Guide to AI ROI
                </h1>
                <p className="text-lg text-slate-600 mb-8">
                  The playbook for measuring, modeling, and realizing AI’s value within your organization.
                  Measurement + Adoption = AI ROI.
                </p>
                <button 
                  onClick={() => setCurrentView(ViewState.FRAMEWORK)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center"
                >
                  Start the Framework <ArrowRight className="ml-2 w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="text-3xl font-bold text-slate-900 mb-2">1 in 4</h3>
                <p className="text-slate-600">AI initiatives achieve expected ROI on growth.</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="text-3xl font-bold text-slate-900 mb-2">95%</h3>
                <p className="text-slate-600">Of GenAI initiatives deliver no measurable ROI at all initially.</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="text-3xl font-bold text-slate-900 mb-2">2.3x</h3>
                <p className="text-slate-600">Average ROI over three years for enterprise investments.</p>
              </div>
            </div>

            {/* Value Drivers */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <ValueCard 
                icon={DollarSign} 
                title="Save Money" 
                desc="Automate routine tasks to reduce cycle time and unit costs." 
                color="text-emerald-600"
                bg="bg-emerald-50"
              />
              <ValueCard 
                icon={TrendingUp} 
                title="Make Money" 
                desc="Accelerate top line growth through higher conversion and retention." 
                color="text-blue-600"
                bg="bg-blue-50"
              />
               <ValueCard 
                icon={ShieldCheck} 
                title="Reduce Risk" 
                desc="Detect anomalies and enforce compliance to avoid costly incidents." 
                color="text-rose-600"
                bg="bg-rose-50"
              />
            </div>
          </div>
        );

      case ViewState.FRAMEWORK:
        return (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">AI ROI Measurement Framework</h2>
              <p className="text-slate-600">A step-by-step blueprint to getting C-suite signoff and measuring impact.</p>
            </div>
            
            {[
              { num: 1, title: 'Set the Business Objective', desc: 'Select the workflow to improve (Save, Make, or Reduce Risk).' },
              { num: 2, title: 'Select the Right KPIs', desc: 'Pick 3-5 metrics that prove impact on your primary goal.' },
              { num: 3, title: 'Establish Your Baseline', desc: 'Pull historical data (8-12 weeks) before AI implementation.' },
              { num: 4, title: 'Define the Future State', desc: 'Set targets for each KPI reflecting expected improvements.' },
              { num: 5, title: 'Measure Early, Measure Often', desc: 'Monitor weekly to spot early wins and adjust.' },
              { num: 6, title: 'Translate to Financial Impact', desc: 'Convert KPI movement into dollars (e.g., hours saved × rate).' },
              { num: 7, title: 'Apply Net ROI Calculations', desc: 'Calculate Simple ROI, Payback, NPV, and IRR.' },
              { num: 8, title: 'Model Sensitivities', desc: 'Calculate conservative, base, and optimistic scenarios.' },
            ].map((step, idx) => (
              <div key={idx} className="flex gap-6 group">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xl border border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  {step.num}
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex-grow group-hover:border-indigo-200 transition-colors">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-slate-600">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        );

      case ViewState.KPI_LIBRARY:
        const filteredKPIs = KPIS.filter(k => 
          k.industry.toLowerCase().includes(kpiSearch.toLowerCase()) || 
          k.metric.toLowerCase().includes(kpiSearch.toLowerCase())
        );
        return (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <h2 className="text-3xl font-bold text-slate-900">Industry KPI Library</h2>
                <p className="text-slate-600 mt-1">Metrics that matter in the context of your industry.</p>
              </div>
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-2.5 text-slate-400 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Search industry or metric..."
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={kpiSearch}
                  onChange={(e) => setKpiSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="grid gap-4">
              {filteredKPIs.map((kpi, idx) => (
                <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
                    <h3 className="text-lg font-bold text-slate-900">{kpi.metric}</h3>
                    <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold mt-2 md:mt-0 w-fit">
                      {kpi.industry}
                    </span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Formula</span>
                      <p className="text-sm font-mono bg-slate-50 p-2 rounded mt-1 border border-slate-100 text-slate-700">
                        {kpi.formula}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Impact Example</span>
                      <p className="text-sm text-slate-600 mt-1 italic">
                        "{kpi.example}"
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {filteredKPIs.length === 0 && (
                <div className="text-center py-12 text-slate-500">
                  No KPIs found matching your search.
                </div>
              )}
            </div>
          </div>
        );

      case ViewState.CALCULATOR:
        return (
          <div className="space-y-6">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-slate-900">ROI Calculator</h2>
              <p className="text-slate-600 mt-1">Calculate Simple ROI, Payback Period, NPV, and IRR.</p>
            </div>
            <ROICalculator />
          </div>
        );

      case ViewState.CASE_STUDY:
        return (
          <div className="space-y-8">
             <div className="bg-indigo-900 text-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Consulting Firm Case Study</h2>
                <div className="grid md:grid-cols-3 gap-6 text-indigo-100">
                  <div>
                    <div className="text-sm uppercase tracking-wider opacity-70">Scenario</div>
                    <div className="font-semibold mt-1">35 Analysts automating research & drafting</div>
                  </div>
                  <div>
                    <div className="text-sm uppercase tracking-wider opacity-70">Investment</div>
                    <div className="font-semibold mt-1">$330,000 upfront</div>
                  </div>
                   <div>
                    <div className="text-sm uppercase tracking-wider opacity-70">Outcome</div>
                    <div className="font-semibold mt-1">1,875 hours saved/yr = $234k/yr</div>
                  </div>
                </div>
             </div>

             <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-6">Cumulative Net Value Over 3 Years</h3>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={caseStudyData}>
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis tickFormatter={(val) => `$${val/1000}k`} />
                      <Tooltip formatter={(val: number) => `$${val.toLocaleString()}`} />
                      <Legend />
                      <Area type="monotone" dataKey="NetValue" stroke="#4f46e5" fillOpacity={1} fill="url(#colorValue)" name="Net Value (NPV Trend)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <div className="text-2xl font-bold text-slate-900">1.41 Years</div>
                    <div className="text-xs text-slate-500 uppercase mt-1">Payback Period</div>
                  </div>
                   <div className="p-4 bg-slate-50 rounded-lg">
                    <div className="text-2xl font-bold text-slate-900">32%</div>
                    <div className="text-xs text-slate-500 uppercase mt-1">IRR</div>
                  </div>
                   <div className="p-4 bg-slate-50 rounded-lg">
                    <div className="text-2xl font-bold text-slate-900">$274,000</div>
                    <div className="text-xs text-slate-500 uppercase mt-1">3-Year NPV</div>
                  </div>
                </div>
             </div>
          </div>
        );

      case ViewState.PLAYBOOK:
        return (
          <div className="space-y-8">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-slate-900">90-Day Adoption Playbook</h2>
              <p className="text-slate-600 mt-1">Measurement + Adoption = AI ROI. Here is how to scale.</p>
            </div>

            <div className="relative border-l-2 border-indigo-200 ml-4 space-y-12">
              {PLAYBOOK.map((phase, idx) => (
                <div key={idx} className="relative pl-8">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-indigo-600 border-4 border-white shadow-sm"></div>
                  
                  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                      <div>
                        <span className="text-sm font-bold text-indigo-600 uppercase tracking-wider">{phase.duration}</span>
                        <h3 className="text-xl font-bold text-slate-900 mt-1">{phase.title}</h3>
                      </div>
                    </div>
                    
                    <p className="text-slate-600 italic mb-6 border-l-4 border-indigo-100 pl-4 py-1">
                      Goal: {phase.goal}
                    </p>

                    <div className="grid md:grid-cols-2 gap-3">
                      {phase.items.map((item, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case ViewState.AI_ADVISOR:
        return <GeminiAdvisor />;
      
      default:
        return <div>View not found</div>;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar 
        currentView={currentView} 
        onNavigate={setCurrentView}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />
      
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 lg:p-8 overflow-y-auto">
        {/* Mobile Header Spacer */}
        <div className="h-12 lg:hidden"></div>
        
        {renderContent()}
      </main>
    </div>
  );
};

// Helper Components
const ValueCard = ({ icon: Icon, title, desc, color, bg }: any) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
    <div className={`w-12 h-12 rounded-lg ${bg} ${color} flex items-center justify-center mb-4`}>
      <Icon className="w-6 h-6" />
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
    <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
  </div>
);

export default App;
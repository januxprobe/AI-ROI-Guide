import React, { useState, useEffect } from 'react';
import { ROIScenario, ROIResults } from '../types';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import { Info } from 'lucide-react';

interface ROICalculatorProps {
  onResultsChange?: (scenario: ROIScenario, results: ROIResults) => void;
}

const ROICalculator: React.FC<ROICalculatorProps> = ({ onResultsChange }) => {
  const [scenario, setScenario] = useState<ROIScenario>({
    initialInvestment: 330000,
    annualBenefit: 234375,
    years: 3,
    discountRate: 8,
  });

  const [results, setResults] = useState<ROIResults>({
    simpleROI: 0,
    paybackPeriod: 0,
    npv: 0,
    irr: 0,
  });

  const calculate = () => {
    const { initialInvestment, annualBenefit, years, discountRate } = scenario;
    
    // Simple ROI = (Net Benefit / Investment) * 100
    // Net Benefit over lifespan = (Annual * Years) - Investment
    const totalBenefit = annualBenefit * years;
    const netBenefit = totalBenefit - initialInvestment;
    const simpleROI = (netBenefit / initialInvestment) * 100;

    // Payback Period = Investment / Annual Benefit
    const paybackPeriod = initialInvestment / annualBenefit;

    // NPV = Sum(CashFlow / (1+r)^t) - Investment
    let npvVal = -initialInvestment;
    const r = discountRate / 100;
    
    // Data for Chart
    const chartData = [];
    let cumulativeCashFlow = -initialInvestment;

    for (let t = 1; t <= years; t++) {
      npvVal += annualBenefit / Math.pow(1 + r, t);
      cumulativeCashFlow += annualBenefit;
      chartData.push({
        year: `Year ${t}`,
        CashFlow: annualBenefit,
        Cumulative: cumulativeCashFlow,
        Discounted: annualBenefit / Math.pow(1 + r, t)
      });
    }

    // IRR Approximation
    // Finding rate where NPV = 0
    let irrVal = 0;
    let low = -0.99; 
    let high = 5.0; // 500%
    for(let i=0; i<100; i++) {
        const mid = (low + high) / 2;
        let testNPV = -initialInvestment;
        for(let t=1; t<=years; t++) {
            testNPV += annualBenefit / Math.pow(1 + mid, t);
        }
        if(testNPV > 0) low = mid;
        else high = mid;
    }
    irrVal = low * 100;

    const newResults = {
      simpleROI,
      paybackPeriod,
      npv: npvVal,
      irr: irrVal
    };

    setResults(newResults);
    if (onResultsChange) onResultsChange(scenario, newResults);

    return chartData;
  };

  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    const data = calculate();
    setChartData(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scenario]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setScenario(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Inputs */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
            <CalculatorIcon className="w-5 h-5 mr-2 text-blue-600" />
            Input Parameters
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Initial Investment ($)</label>
              <input
                type="number"
                name="initialInvestment"
                value={scenario.initialInvestment}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Estimated Annual Benefit ($)</label>
              <input
                type="number"
                name="annualBenefit"
                value={scenario.annualBenefit}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Project Lifespan (Years)</label>
              <input
                type="number"
                name="years"
                value={scenario.years}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Discount Rate / Hurdle Rate (%)</label>
              <div className="relative">
                <input
                  type="number"
                  name="discountRate"
                  value={scenario.discountRate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                />
                <div className="group absolute right-3 top-2.5 cursor-help">
                  <Info className="w-4 h-4 text-slate-400" />
                  <div className="hidden group-hover:block absolute right-0 bottom-full mb-2 w-48 p-2 bg-slate-800 text-white text-xs rounded z-10">
                    The minimum acceptable rate of return. Typically 8-12% for enterprise projects.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Cards */}
        <div className="grid grid-cols-2 gap-4">
          <ResultCard 
            title="Simple ROI" 
            value={`${results.simpleROI.toFixed(1)}%`}
            description="Total return on investment percentage."
            color="text-blue-600"
          />
          <ResultCard 
            title="Payback Period" 
            value={`${results.paybackPeriod.toFixed(2)} Years`}
            description="Time to recover initial cost."
            color="text-emerald-600"
          />
          <ResultCard 
            title="Net Present Value (NPV)" 
            value={`$${results.npv.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
            description="Total value added in today's dollars."
            color="text-indigo-600"
            highlight
          />
          <ResultCard 
            title="Internal Rate of Return (IRR)" 
            value={`${results.irr.toFixed(1)}%`}
            description="Annualized effective compounded return rate."
            color="text-violet-600"
          />
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800 mb-6">Cash Flow Projection</h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="year" axisLine={false} tickLine={false} />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tickFormatter={(val) => `$${val/1000}k`} 
              />
              <Tooltip 
                formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Legend />
              <Bar dataKey="Cumulative" fill="#cbd5e1" name="Cumulative Net Flow" radius={[4, 4, 0, 0]} />
              <Bar dataKey="CashFlow" fill="#3b82f6" name="Annual Benefit" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const ResultCard = ({ title, value, description, color, highlight = false }: any) => (
  <div className={`p-5 rounded-xl border ${highlight ? 'bg-indigo-50 border-indigo-200' : 'bg-white border-slate-200'} shadow-sm flex flex-col justify-between`}>
    <div>
      <h4 className="text-sm font-medium text-slate-500 uppercase tracking-wider">{title}</h4>
      <div className={`text-2xl font-bold mt-2 ${color}`}>{value}</div>
    </div>
    <p className="text-xs text-slate-400 mt-2">{description}</p>
  </div>
);

const CalculatorIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
  </svg>
);

export default ROICalculator;
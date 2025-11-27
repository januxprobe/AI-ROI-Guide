import React, { useState } from 'react';
import { generateROIAnalysis } from '../services/geminiService';
import { ROIScenario, ROIResults } from '../types';
import { Bot, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

// Mock simple internal calculator logic to feed the AI if not using the main calculator
const calculateInternal = (scenario: ROIScenario): ROIResults => {
    const { initialInvestment, annualBenefit, years, discountRate } = scenario;
    const totalBenefit = annualBenefit * years;
    const netBenefit = totalBenefit - initialInvestment;
    const simpleROI = (netBenefit / initialInvestment) * 100;
    const paybackPeriod = initialInvestment / annualBenefit;
    let npvVal = -initialInvestment;
    const r = discountRate / 100;
    for (let t = 1; t <= years; t++) npvVal += annualBenefit / Math.pow(1 + r, t);
    
    // Quick approximation for IRR for display context
    const irrVal = simpleROI / years; // Very rough proxy for context only

    return { simpleROI, paybackPeriod, npv: npvVal, irr: irrVal };
};

const GeminiAdvisor: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [inputs, setInputs] = useState<ROIScenario & { context: string }>({
    initialInvestment: 330000,
    annualBenefit: 234375,
    years: 3,
    discountRate: 8,
    context: "Consulting firm implementing AI agents to assist analysts with research and drafting."
  });

  const handleAnalyze = async () => {
    setLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      if (!process.env.API_KEY) {
        throw new Error("API Key is missing. Please check your configuration.");
      }

      const results = calculateInternal(inputs);
      const text = await generateROIAnalysis(inputs, results, inputs.context);
      setAnalysis(text);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl p-8 text-white mb-8 shadow-lg">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <Bot className="w-8 h-8" />
              AI ROI Consultant
            </h2>
            <p className="text-indigo-100 max-w-xl">
              Leverage the power of Gemini 3 Pro to generate an executive-ready investment analysis based on your project parameters.
            </p>
          </div>
          <Sparkles className="w-16 h-16 text-white/20" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-4">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-semibold text-slate-800 mb-4">Project Parameters</h3>
            
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase">Investment ($)</label>
                <input 
                  type="number" 
                  value={inputs.initialInvestment}
                  onChange={e => setInputs({...inputs, initialInvestment: parseFloat(e.target.value)})}
                  className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-md text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase">Annual Benefit ($)</label>
                <input 
                  type="number" 
                  value={inputs.annualBenefit}
                  onChange={e => setInputs({...inputs, annualBenefit: parseFloat(e.target.value)})}
                  className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-md text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase">Years</label>
                <input 
                  type="number" 
                  value={inputs.years}
                  onChange={e => setInputs({...inputs, years: parseFloat(e.target.value)})}
                  className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-md text-sm"
                />
              </div>
               <div>
                <label className="text-xs font-semibold text-slate-500 uppercase">Hurdle Rate (%)</label>
                <input 
                  type="number" 
                  value={inputs.discountRate}
                  onChange={e => setInputs({...inputs, discountRate: parseFloat(e.target.value)})}
                  className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-md text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase">Context / Use Case</label>
                <textarea 
                  value={inputs.context}
                  onChange={e => setInputs({...inputs, context: e.target.value})}
                  className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-md text-sm h-24 resize-none"
                  placeholder="Describe your use case..."
                />
              </div>

              <button 
                onClick={handleAnalyze}
                disabled={loading}
                className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? <RefreshCw className="animate-spin w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                {loading ? 'Analyzing...' : 'Generate Analysis'}
              </button>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          {error && (
             <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg flex items-center gap-3">
               <AlertCircle className="w-5 h-5 flex-shrink-0" />
               <p>{error}</p>
             </div>
          )}

          {!analysis && !loading && !error && (
            <div className="bg-slate-50 border border-dashed border-slate-300 rounded-xl p-12 text-center text-slate-400">
              <Bot className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Enter your project details and click "Generate Analysis" to receive an AI-powered ROI assessment.</p>
            </div>
          )}

          {analysis && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
               <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                 <h3 className="font-semibold text-slate-800">Generated Report</h3>
                 <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">Gemini 3 Pro</span>
               </div>
               <div className="p-8 prose prose-indigo max-w-none text-slate-700">
                  <ReactMarkdown>{analysis}</ReactMarkdown>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GeminiAdvisor;
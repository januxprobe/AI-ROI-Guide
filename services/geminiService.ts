import { GoogleGenAI } from "@google/genai";
import { ROIScenario, ROIResults } from "../types";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found in environment variables");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateROIAnalysis = async (
  scenario: ROIScenario,
  results: ROIResults,
  context?: string
): Promise<string> => {
  try {
    const ai = getClient();
    
    const prompt = `
      You are a senior financial analyst specializing in AI investments.
      
      Task: Provide a concise executive summary and risk assessment for the following AI investment scenario.
      
      Financial Data:
      - Initial Investment: $${scenario.initialInvestment.toLocaleString()}
      - Annual Benefit: $${scenario.annualBenefit.toLocaleString()}
      - Project Lifespan: ${scenario.years} years
      - Discount Rate: ${scenario.discountRate}%
      
      Calculated Metrics:
      - Simple ROI: ${results.simpleROI.toFixed(1)}%
      - Payback Period: ${results.paybackPeriod.toFixed(2)} years
      - NPV: $${results.npv.toLocaleString()}
      - IRR: ${results.irr.toFixed(1)}%
      
      ${context ? `Additional Context: ${context}` : ''}
      
      Please analyze these figures. Is this a sound investment? What are the primary sensitivity risks?
      Format the output with bold headings for "Executive Summary", "Financial Strengths", and "Risk Factors".
      Keep the tone professional and persuasive for a C-suite audience.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Unable to generate analysis at this time.";
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Error generating analysis. Please ensure your API key is configured correctly.";
  }
};
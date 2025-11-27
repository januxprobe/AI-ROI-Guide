export interface KPI {
  industry: string;
  metric: string;
  formula: string;
  example: string;
}

export interface ROIScenario {
  initialInvestment: number;
  annualBenefit: number;
  years: number;
  discountRate: number; // Percentage
}

export interface ROIResults {
  simpleROI: number;
  paybackPeriod: number;
  npv: number;
  irr: number;
}

export enum ViewState {
  HOME = 'HOME',
  FRAMEWORK = 'FRAMEWORK',
  KPI_LIBRARY = 'KPI_LIBRARY',
  CALCULATOR = 'CALCULATOR',
  PLAYBOOK = 'PLAYBOOK',
  AI_ADVISOR = 'AI_ADVISOR',
  CASE_STUDY = 'CASE_STUDY'
}

export interface PlaybookPhase {
  title: string;
  duration: string;
  goal: string;
  items: string[];
}
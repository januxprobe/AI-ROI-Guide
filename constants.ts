import { KPI, PlaybookPhase } from './types';

export const KPIS: KPI[] = [
  {
    industry: 'Manufacturing',
    metric: 'Process Efficiency',
    formula: '(Value-Added Time ÷ Total Process Time) × 100',
    example: 'Predictive maintenance reduces downtime, increasing efficiency from 72% → 85%.'
  },
  {
    industry: 'Manufacturing',
    metric: 'Resource Utilization',
    formula: '(Used Resources ÷ Available Resources) × 100',
    example: 'AI scheduling system boosts machine uptime from 65% → 80%.'
  },
  {
    industry: 'Manufacturing',
    metric: 'Cost per Transaction',
    formula: 'Total Process Costs ÷ Number of Transactions',
    example: 'Automated quality checks cut inspection cost per unit by 18%.'
  },
  {
    industry: 'Retail / Services',
    metric: 'Conversion Rate',
    formula: 'Conversions ÷ Visitors × 100',
    example: 'AI recommendations increase conversion from 2% → 3% on 1M visits = +10K sales.'
  },
  {
    industry: 'Retail / Services',
    metric: 'Customer Acquisition Cost (CAC)',
    formula: '(Sales + Marketing Spend ÷ New Customers)',
    example: 'AI ad targeting reduces CAC from $120 → $95.'
  },
  {
    industry: 'Customer Support',
    metric: 'Deflection Rate',
    formula: '% of inquiries resolved by automation',
    example: 'AI chatbot deflects 35% of Tier 1 inquiries = 10K fewer calls/month.'
  },
  {
    industry: 'Sales',
    metric: 'Sales Cycle Length',
    formula: 'Σ Days from Lead → Close ÷ Closed Deals',
    example: 'AI lead scoring shortens cycle from 90 days → 65 days.'
  },
  {
    industry: 'Risk / Compliance',
    metric: 'Security Incident Rate',
    formula: 'Number of Incidents ÷ Time Period',
    example: 'AI monitoring reduces incident frequency by 40%.'
  }
];

export const PLAYBOOK: PlaybookPhase[] = [
  {
    title: 'Set Up and Secure',
    duration: 'Weeks 0–2',
    goal: 'Build a measurable foundation for AI experimentation.',
    items: [
      'Centralize access (SSO & permissions)',
      'Approve tools and models',
      'Establish guardrails & safe-use policy',
      'Define success criteria linked to KPIs'
    ]
  },
  {
    title: 'Train and Certify',
    duration: 'Weeks 3–6',
    goal: 'Build user competency that converts predicted ROI into realized results.',
    items: [
      'Deliver role-based training',
      'Develop core skills (prompting, verification)',
      'Certify competency',
      'Support adoption (office hours, champions)'
    ]
  },
  {
    title: 'Prove and Expand',
    duration: 'Weeks 7–12',
    goal: 'Quantify AI’s business impact and validate ROI assumptions.',
    items: [
      'Measure performance (cycle time, error reduction)',
      'Link usage to value',
      'Share results to build executive trust',
      'Refine assumptions vs. forecasted ROI'
    ]
  }
];
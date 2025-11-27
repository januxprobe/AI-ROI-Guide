
import { KPI, PlaybookPhase, CaseStudy, ViewState } from './types';

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

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'consulting',
    title: 'Analyst Efficiency at Scale',
    industry: 'Consulting / Professional Services',
    challenge: 'High labor costs and burnout. 35 analysts spending 30 hours/week drafting memos manually.',
    solution: 'Deployed GenAI agents for research synthesis and initial drafting, integrated into existing document workflows.',
    outcome: 'Saved 1,875 hours per year, freeing up time for higher-value client strategy work.',
    metrics: [
      { label: 'Time Saved', value: '25%', desc: 'Reduction in drafting time per case.' },
      { label: 'Annual Savings', value: '$234k', desc: 'Direct labor cost reduction.' },
      { label: 'Output', value: '1.2x', desc: 'Increase in cases handled per analyst.' }
    ],
    financialData: [
      { year: 'Year 0', cost: 330000, benefit: 0, netValue: -330000 },
      { year: 'Year 1', cost: 20000, benefit: 234375, netValue: -115625 },
      { year: 'Year 2', cost: 20000, benefit: 234375, netValue: 98750 },
      { year: 'Year 3', cost: 20000, benefit: 234375, netValue: 313125 },
    ],
    roiHighlights: {
      payback: '1.41 Years',
      irr: '32%',
      npv: '$274,000'
    },
    linkToTool: ViewState.CALCULATOR
  },
  {
    id: 'manufacturing',
    title: 'Predictive Maintenance on the Line',
    industry: 'Manufacturing',
    challenge: 'Unplanned downtime was costing $15k/hour. Reactive repairs led to expensive expedited parts shipping.',
    solution: 'AI model analyzing IoT sensor data (vibration, temp) to predict failure 48 hours in advance.',
    outcome: 'Reduced unplanned downtime by 40% and parts inventory costs by 15%.',
    metrics: [
      { label: 'Uptime', value: '+12%', desc: 'Increase in machine availability.' },
      { label: 'Maintenance Cost', value: '-18%', desc: 'Reduction in emergency repair spend.' },
      { label: 'Accuracy', value: '94%', desc: 'True positive rate on failure prediction.' }
    ],
    financialData: [
      { year: 'Year 0', cost: 500000, benefit: 0, netValue: -500000 },
      { year: 'Year 1', cost: 50000, benefit: 450000, netValue: -100000 },
      { year: 'Year 2', cost: 50000, benefit: 600000, netValue: 450000 },
      { year: 'Year 3', cost: 50000, benefit: 650000, netValue: 1050000 },
    ],
    roiHighlights: {
      payback: '1.2 Years',
      irr: '85%',
      npv: '$940,000'
    },
    linkToTool: ViewState.KPI_LIBRARY
  },
  {
    id: 'fintech',
    title: 'Fraud Detection & Risk',
    industry: 'Financial Services',
    challenge: 'Rule-based systems were flagging too many false positives, requiring a massive manual review team.',
    solution: 'Implemented machine learning models to detect complex fraud patterns in real-time transactions.',
    outcome: 'Massive reduction in manual reviews while catching 20% more actual fraud attempts.',
    metrics: [
      { label: 'False Positives', value: '-60%', desc: 'Reduction in legitimate transactions blocked.' },
      { label: 'Review Time', value: '-75%', desc: 'Faster resolution for flagged items.' },
      { label: 'Fraud Loss', value: '-$2M', desc: 'Avoided losses in Year 1.' }
    ],
    financialData: [
      { year: 'Year 0', cost: 1200000, benefit: 0, netValue: -1200000 },
      { year: 'Year 1', cost: 150000, benefit: 2000000, netValue: 650000 },
      { year: 'Year 2', cost: 150000, benefit: 2200000, netValue: 2700000 },
      { year: 'Year 3', cost: 150000, benefit: 2400000, netValue: 4950000 },
    ],
    roiHighlights: {
      payback: '0.7 Years',
      irr: '145%',
      npv: '$3.8M'
    },
    linkToTool: ViewState.FRAMEWORK
  }
];

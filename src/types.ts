export type ProspectStatus =
  | 'new'
  | 'contacted'
  | 'meeting_scheduled'
  | 'proposal_sent'
  | 'negotiation'
  | 'won'
  | 'lost';

export type ProspectType = 'business' | 'government';
export type Language = 'ka' | 'en';

export interface CostHistoryEntry {
  date: string;
  amount: number;
}

export interface Prospect {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  status: ProspectStatus;
  type: ProspectType;
  country: string;
  monthlyFee: number;
  integrationFee: number;
  monthlyCost: number;
  logoUrl: string;
  notes: string;
  integrationStartDate: string;
  paymentDayOfMonth: number;
  paymentDelayed: boolean;
  paymentDelayNotes: string;
  costHistory: CostHistoryEntry[];
  createdAt: string;
  updatedAt: string;
}

export interface Country {
  code: string;
  flag: string;
  ka: string;
  en: string;
}

export const COUNTRIES: Country[] = [
  { code: 'GE', flag: '\u{1F1EC}\u{1F1EA}', ka: '\u10E1\u10D0\u10E5\u10D0\u10E0\u10D7\u10D5\u10D4\u10DA\u10DD', en: 'Georgia' },
  { code: 'US', flag: '\u{1F1FA}\u{1F1F8}', ka: '\u10D0\u10E8\u10E8', en: 'USA' },
  { code: 'DE', flag: '\u{1F1E9}\u{1F1EA}', ka: '\u10D2\u10D4\u10E0\u10DB\u10D0\u10DC\u10D8\u10D0', en: 'Germany' },
  { code: 'TR', flag: '\u{1F1F9}\u{1F1F7}', ka: '\u10D7\u10E3\u10E0\u10E5\u10D4\u10D7\u10D8', en: 'Turkey' },
  { code: 'AZ', flag: '\u{1F1E6}\u{1F1FF}', ka: '\u10D0\u10D6\u10D4\u10E0\u10D1\u10D0\u10D8\u10EF\u10D0\u10DC\u10D8', en: 'Azerbaijan' },
  { code: 'AM', flag: '\u{1F1E6}\u{1F1F2}', ka: '\u10E1\u10DD\u10DB\u10EE\u10D4\u10D7\u10D8', en: 'Armenia' },
  { code: 'UA', flag: '\u{1F1FA}\u{1F1E6}', ka: '\u10E3\u10D9\u10E0\u10D0\u10D8\u10DC\u10D0', en: 'Ukraine' },
  { code: 'IL', flag: '\u{1F1EE}\u{1F1F1}', ka: '\u10D8\u10E1\u10E0\u10D0\u10D4\u10DA\u10D8', en: 'Israel' },
  { code: 'GB', flag: '\u{1F1EC}\u{1F1E7}', ka: '\u10D3\u10D8\u10D3\u10D8 \u10D1\u10E0\u10D8\u10E2\u10D0\u10DC\u10D4\u10D7\u10D8', en: 'United Kingdom' },
  { code: 'FR', flag: '\u{1F1EB}\u{1F1F7}', ka: '\u10E1\u10D0\u10E4\u10E0\u10D0\u10DC\u10D2\u10D4\u10D7\u10D8', en: 'France' },
  { code: 'IT', flag: '\u{1F1EE}\u{1F1F9}', ka: '\u10D8\u10E2\u10D0\u10DA\u10D8\u10D0', en: 'Italy' },
  { code: 'ES', flag: '\u{1F1EA}\u{1F1F8}', ka: '\u10D4\u10E1\u10DE\u10D0\u10DC\u10D4\u10D7\u10D8', en: 'Spain' },
  { code: 'AE', flag: '\u{1F1E6}\u{1F1EA}', ka: '\u10D0\u10E0\u10D0\u10D1\u10D4\u10D7\u10D8 (UAE)', en: 'UAE' },
  { code: 'KZ', flag: '\u{1F1F0}\u{1F1FF}', ka: '\u10E7\u10D0\u10D6\u10D0\u10EE\u10D4\u10D7\u10D8', en: 'Kazakhstan' },
  { code: 'OTHER', flag: '\u{1F30D}', ka: '\u10E1\u10EE\u10D5\u10D0', en: 'Other' },
];

export function getCountryByCode(code: string): Country | undefined {
  return COUNTRIES.find(c => c.code === code);
}

export const STATUS_LABELS: Record<ProspectStatus, { ka: string; en: string }> = {
  new: { ka: '\u10D0\u10EE\u10D0\u10DA\u10D8', en: 'New' },
  contacted: { ka: '\u10D3\u10D0\u10D9\u10D0\u10D5\u10E8\u10D8\u10E0\u10D4\u10D1\u10E3\u10DA\u10D8', en: 'Contacted' },
  meeting_scheduled: { ka: '\u10E8\u10D4\u10EE\u10D5\u10D4\u10D3\u10E0\u10D0 \u10D3\u10D0\u10DC\u10D8\u10E8\u10DC\u10E3\u10DA\u10D8', en: 'Meeting Scheduled' },
  proposal_sent: { ka: '\u10EC\u10D8\u10DC\u10D0\u10D3\u10D0\u10D3\u10D4\u10D1\u10D0 \u10D2\u10D0\u10D2\u10D6\u10D0\u10D5\u10DC\u10D8\u10DA\u10D8', en: 'Proposal Sent' },
  negotiation: { ka: '\u10DB\u10DD\u10DA\u10D0\u10DE\u10D0\u10E0\u10D0\u10D9\u10D4\u10D1\u10D0', en: 'Negotiation' },
  won: { ka: '\u10DB\u10DD\u10D2\u10D4\u10D1\u10E3\u10DA\u10D8', en: 'Won' },
  lost: { ka: '\u10EC\u10D0\u10D2\u10D4\u10D1\u10E3\u10DA\u10D8', en: 'Lost' },
};

export const STATUS_COLORS: Record<ProspectStatus, string> = {
  new: '#8E8E93',
  contacted: '#007AFF',
  meeting_scheduled: '#AF52DE',
  proposal_sent: '#FF9500',
  negotiation: '#FF2D55',
  won: '#34C759',
  lost: '#FF3B30',
};

export const TYPE_LABELS: Record<ProspectType, { ka: string; en: string }> = {
  business: { ka: '\u10D1\u10D8\u10D6\u10DC\u10D4\u10E1\u10D8', en: 'Business' },
  government: { ka: '\u10E1\u10D0\u10EE\u10D4\u10DA\u10DB\u10EC\u10D8\u10E4\u10DD', en: 'Government' },
};

type TranslationKey = string;
export const T: Record<TranslationKey, { ka: string; en: string }> = {
  appSubtitle: { ka: '\u10DE\u10E0\u10DD\u10E1\u10DE\u10D4\u10E5\u10E2\u10D4\u10D1\u10D8\u10E1 \u10DB\u10D0\u10E0\u10D7\u10D5\u10D0', en: 'Prospect Management' },
  addProspect: { ka: '+ \u10D3\u10D0\u10DB\u10D0\u10E2\u10D4\u10D1\u10D0', en: '+ Add Prospect' },
  total: { ka: '\u10E1\u10E3\u10DA', en: 'Total' },
  active: { ka: '\u10D0\u10E5\u10E2\u10D8\u10E3\u10E0\u10D8', en: 'Active' },
  won: { ka: '\u10DB\u10DD\u10D2\u10D4\u10D1\u10E3\u10DA\u10D8', en: 'Won' },
  prospects: { ka: '\u10DE\u10E0\u10DD\u10E1\u10DE\u10D4\u10E5\u10E2\u10D4\u10D1\u10D8', en: 'Prospects' },
  financials: { ka: '\u10E4\u10D8\u10DC\u10D0\u10DC\u10E1\u10D4\u10D1\u10D8', en: 'Financials' },
  search: { ka: '\u10EB\u10D8\u10D4\u10D1\u10D0...', en: 'Search...' },
  allStatuses: { ka: '\u10E7\u10D5\u10D4\u10DA\u10D0 \u10E1\u10E2\u10D0\u10E2\u10E3\u10E1\u10D8', en: 'All Statuses' },
  allTypes: { ka: '\u10E7\u10D5\u10D4\u10DA\u10D0 \u10E2\u10D8\u10DE\u10D8', en: 'All Types' },
  allCountries: { ka: '\u10E7\u10D5\u10D4\u10DA\u10D0 \u10E5\u10D5\u10D4\u10E7\u10D0\u10DC\u10D0', en: 'All Countries' },
  noProspects: { ka: '\u10DE\u10E0\u10DD\u10E1\u10DE\u10D4\u10E5\u10E2\u10D4\u10D1\u10D8 \u10EF\u10D4\u10E0 \u10D0\u10E0 \u10D0\u10E0\u10D8\u10E1', en: 'No prospects yet' },
  noResults: { ka: '\u10E8\u10D4\u10D3\u10D4\u10D2\u10D8 \u10D5\u10D4\u10E0 \u10DB\u10DD\u10D8\u10EB\u10D4\u10D1\u10DC\u10D0', en: 'No matching results' },
  addFirst: { ka: '\u10D3\u10D0\u10D0\u10DB\u10D0\u10E2\u10D4\u10D7 \u10DE\u10D8\u10E0\u10D5\u10D4\u10DA\u10D8 \u10DE\u10E0\u10DD\u10E1\u10DE\u10D4\u10E5\u10E2\u10D8 \u10D3\u10D0\u10E1\u10D0\u10EC\u10E7\u10D4\u10D1\u10D0\u10D3.', en: 'Add your first prospect to get started.' },
  tryAdjust: { ka: '\u10E1\u10EA\u10D0\u10D3\u10D4\u10D7 \u10EB\u10D8\u10D4\u10D1\u10D8\u10E1 \u10D0\u10DC \u10E4\u10D8\u10DA\u10E2\u10E0\u10D8\u10E1 \u10E8\u10D4\u10EA\u10D5\u10DA\u10D0.', en: 'Try adjusting your search or filter.' },
  confirmDelete: { ka: '\u10DC\u10D0\u10DB\u10D3\u10D5\u10D8\u10DA\u10D0\u10D3 \u10D2\u10E1\u10E3\u10E0\u10D7 \u10EC\u10D0\u10E8\u10DA\u10D0?', en: 'Are you sure you want to delete?' },
  newProspect: { ka: '\u10D0\u10EE\u10D0\u10DA\u10D8 \u10DE\u10E0\u10DD\u10E1\u10DE\u10D4\u10E5\u10E2\u10D8', en: 'New Prospect' },
  editProspect: { ka: '\u10DE\u10E0\u10DD\u10E1\u10DE\u10D4\u10E5\u10E2\u10D8\u10E1 \u10E0\u10D4\u10D3\u10D0\u10E5\u10E2\u10D8\u10E0\u10D4\u10D1\u10D0', en: 'Edit Prospect' },
  companyName: { ka: '\u10D9\u10DD\u10DB\u10DE\u10D0\u10DC\u10D8\u10D8\u10E1 \u10E1\u10D0\u10EE\u10D4\u10DA\u10D8', en: 'Company Name' },
  contactPerson: { ka: '\u10E1\u10D0\u10D9\u10DD\u10DC\u10E2\u10D0\u10E5\u10E2\u10DD \u10DE\u10D8\u10E0\u10D8', en: 'Contact Person' },
  email: { ka: '\u10D4\u10DA-\u10E4\u10DD\u10E1\u10E2\u10D0', en: 'Email' },
  phone: { ka: '\u10E2\u10D4\u10DA\u10D4\u10E4\u10DD\u10DC\u10D8', en: 'Phone' },
  type: { ka: '\u10E2\u10D8\u10DE\u10D8', en: 'Type' },
  country: { ka: '\u10E5\u10D5\u10D4\u10E7\u10D0\u10DC\u10D0', en: 'Country' },
  status: { ka: '\u10E1\u10E2\u10D0\u10E2\u10E3\u10E1\u10D8', en: 'Status' },
  monthlyFee: { ka: '\u10E7\u10DD\u10D5\u10D4\u10DA\u10D7\u10D5\u10D8\u10E3\u10E0\u10D8 ($)', en: 'Monthly Fee ($)' },
  integrationFee: { ka: '\u10D8\u10DC\u10E2\u10D4\u10D2\u10E0\u10D0\u10EA\u10D8\u10D8\u10E1 \u10E1\u10D0\u10E4\u10D0\u10E1\u10E3\u10E0\u10D8 ($)', en: 'Integration Fee ($)' },
  monthlyCost: { ka: '\u10E7\u10DD\u10D5\u10D4\u10DA\u10D7\u10D5\u10D8\u10E3\u10E0\u10D8 \u10EE\u10D0\u10E0\u10EF\u10D8 ($)', en: 'Monthly Cost ($)' },
  integrationDate: { ka: '\u10D8\u10DC\u10E2\u10D4\u10D2\u10E0\u10D0\u10EA\u10D8\u10D8\u10E1 \u10D7\u10D0\u10E0\u10D8\u10E6\u10D8', en: 'Integration Start Date' },
  paymentDay: { ka: '\u10D2\u10D0\u10D3\u10D0\u10EE\u10D3\u10D8\u10E1 \u10D3\u10E6\u10D4 (\u10D7\u10D5\u10D4\u10E8\u10D8)', en: 'Payment Day (of month)' },
  paymentDelayed: { ka: '\u10D2\u10D0\u10D3\u10D0\u10EE\u10D3\u10D0 \u10D3\u10D0\u10D2\u10D5\u10D8\u10D0\u10DC\u10D4\u10D1\u10E3\u10DA\u10D8\u10D0', en: 'Payment Delayed' },
  delayNotes: { ka: '\u10D3\u10D0\u10D2\u10D5\u10D8\u10D0\u10DC\u10D4\u10D1\u10D8\u10E1 \u10E8\u10D4\u10DC\u10D8\u10E8\u10D5\u10DC\u10D0', en: 'Delay Notes' },
  notes: { ka: '\u10E8\u10D4\u10DC\u10D8\u10E8\u10D5\u10DC\u10D4\u10D1\u10D8', en: 'Notes' },
  logo: { ka: '\u10DA\u10DD\u10D2\u10DD (\u10D0\u10D8\u10E0\u10E9\u10D8\u10D4\u10D7)', en: 'Logo (select)' },
  logoHint: { ka: '\u10D0\u10DC \u10E9\u10D0\u10E1\u10D5\u10D8\u10D7 \u10DA\u10DD\u10D2\u10DD\u10E1 \u10D1\u10DB\u10E3\u10DA\u10D8:', en: 'Or paste logo URL:' },
  cancel: { ka: '\u10D2\u10D0\u10E3\u10E5\u10DB\u10D4\u10D1\u10D0', en: 'Cancel' },
  add: { ka: '\u10D3\u10D0\u10DB\u10D0\u10E2\u10D4\u10D1\u10D0', en: 'Add' },
  update: { ka: '\u10D2\u10D0\u10DC\u10D0\u10EE\u10DA\u10D4\u10D1\u10D0', en: 'Update' },
  edit: { ka: '\u10E0\u10D4\u10D3\u10D0\u10E5\u10E2\u10D8\u10E0\u10D4\u10D1\u10D0', en: 'Edit' },
  delete: { ka: '\u10EC\u10D0\u10E8\u10DA\u10D0', en: 'Delete' },
  added: { ka: '\u10D3\u10D0\u10DB\u10D0\u10E2\u10D4\u10D1\u10E3\u10DA\u10D8\u10D0', en: 'Added' },
  updated: { ka: '\u10D2\u10D0\u10DC\u10D0\u10EE\u10DA\u10D4\u10D1\u10E3\u10DA\u10D8\u10D0', en: 'Updated' },
  monthly: { ka: '\u10E7\u10DD\u10D5\u10D4\u10DA\u10D7\u10D5\u10D8\u10E3\u10E0\u10D8', en: 'Monthly' },
  integration: { ka: '\u10D8\u10DC\u10E2\u10D4\u10D2\u10E0\u10D0\u10EA\u10D8\u10D0', en: 'Integration' },
  cost: { ka: '\u10EE\u10D0\u10E0\u10EF\u10D8', en: 'Cost' },
  months: { ka: '\u10D7\u10D5\u10D4', en: 'months' },
  totalPaid: { ka: '\u10E1\u10E3\u10DA \u10D2\u10D0\u10D3\u10D0\u10EE\u10D3\u10D8\u10DA\u10D8', en: 'Total Paid' },
  delayed: { ka: '\u10D3\u10D0\u10D2\u10D5\u10D8\u10D0\u10DC\u10D4\u10D1\u10E3\u10DA\u10D8', en: 'Delayed' },
  nextPayment: { ka: '\u10E8\u10D4\u10DB\u10D3\u10D4\u10D2\u10D8 \u10D2\u10D0\u10D3\u10D0\u10EE\u10D3\u10D0', en: 'Next Payment' },
  mrr: { ka: '\u10E7\u10DD\u10D5\u10D4\u10DA\u10D7\u10D5\u10D8\u10E3\u10E0\u10D8 \u10E8\u10D4\u10DB\u10DD\u10E1\u10D0\u10D5\u10D0\u10DA\u10D8 (MRR)', en: 'Monthly Recurring Revenue (MRR)' },
  arr: { ka: '\u10EC\u10DA\u10D8\u10E3\u10E0\u10D8 \u10E8\u10D4\u10DB\u10DD\u10E1\u10D0\u10D5\u10D0\u10DA\u10D8 (ARR)', en: 'Annual Recurring Revenue (ARR)' },
  totalExpected: { ka: '\u10E1\u10E3\u10DA \u10DB\u10DD\u10E1\u10D0\u10DA\u10DD\u10D3\u10DC\u10D4\u10DA\u10D8 (\u10EC\u10DA\u10D8\u10E3\u10E0\u10D8)', en: 'Total Expected (Yearly)' },
  pipelineMRR: { ka: 'Pipeline MRR', en: 'Pipeline MRR' },
  fromWon: { ka: '\u10DB\u10DD\u10D2\u10D4\u10D1\u10E3\u10DA\u10D8 \u10D9\u10DA\u10D8\u10D4\u10DC\u10E2\u10D4\u10D1\u10D8\u10D3\u10D0\u10DC', en: 'From won clients' },
  totalCollected: { ka: '\u10E1\u10E3\u10DA \u10E8\u10D4\u10D2\u10E0\u10DD\u10D5\u10D4\u10D1\u10E3\u10DA\u10D8', en: 'Total Collected' },
  totalCosts: { ka: '\u10E1\u10E3\u10DA \u10EE\u10D0\u10E0\u10EF\u10D4\u10D1\u10D8', en: 'Total Costs' },
  netProfit: { ka: '\u10EC\u10DB\u10D8\u10DC\u10D3\u10D0 \u10DB\u10DD\u10D2\u10D4\u10D1\u10D0', en: 'Net Profit' },
  yes: { ka: '\u10D3\u10D8\u10D0\u10EE', en: 'Yes' },
  no: { ka: '\u10D0\u10E0\u10D0', en: 'No' },
  supabaseNotice: { ka: 'Supabase \u10D0\u10E0 \u10D0\u10E0\u10D8\u10E1 \u10D3\u10D0\u10D9\u10DD\u10DC\u10E4\u10D8\u10D2\u10E3\u10E0\u10D8\u10E0\u10D4\u10D1\u10E3\u10DA\u10D8 - \u10DB\u10DD\u10DC\u10D0\u10EA\u10D4\u10DB\u10D4\u10D1\u10D8 localStorage-\u10E8\u10D8 \u10D8\u10DC\u10D0\u10EE\u10D4\u10D1\u10D0', en: 'Supabase not configured - data saved in localStorage' },
  openTBC: { ka: 'TBC \u10D1\u10D0\u10DC\u10D9\u10D8', en: 'TBC Bank' },
  openKeepz: { ka: 'Keepz', en: 'Keepz' },
  exportData: { ka: '\u10D4\u10E5\u10E1\u10DE\u10DD\u10E0\u10E2\u10D8', en: 'Export' },
  costHistory: { ka: '\u10EE\u10D0\u10E0\u10EF\u10D4\u10D1\u10D8\u10E1 \u10D8\u10E1\u10E2\u10DD\u10E0\u10D8\u10D0', en: 'Cost History' },
  changeCost: { ka: '\u10EE\u10D0\u10E0\u10EF\u10D8\u10E1 \u10EA\u10D5\u10DA\u10D8\u10DA\u10D4\u10D1\u10D0', en: 'Change Cost' },
  currentCost: { ka: '\u10DB\u10D8\u10DB\u10D3\u10D8\u10DC\u10D0\u10E0\u10D4 \u10EE\u10D0\u10E0\u10EF\u10D8', en: 'Current Cost' },
  quickActions: { ka: '\u10E1\u10EC\u10E0\u10D0\u10E4\u10D8 \u10DB\u10DD\u10E5\u10DB\u10D4\u10D3\u10D4\u10D1\u10D4\u10D1\u10D8', en: 'Quick Actions' },
};

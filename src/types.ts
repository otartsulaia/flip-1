export type ProspectStatus =
  | 'new'
  | 'contacted'
  | 'meeting_scheduled'
  | 'proposal_sent'
  | 'negotiation'
  | 'won'
  | 'lost';

export type ProspectType = 'business' | 'government';

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
  logoUrl: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export const STATUS_LABELS: Record<ProspectStatus, string> = {
  new: 'ახალი',
  contacted: 'დაკავშირებული',
  meeting_scheduled: 'შეხვედრა დანიშნული',
  proposal_sent: 'წინადადება გაგზავნილი',
  negotiation: 'მოლაპარაკება',
  won: 'მოგებული',
  lost: 'წაგებული',
};

export const STATUS_COLORS: Record<ProspectStatus, string> = {
  new: '#6b7280',
  contacted: '#3b82f6',
  meeting_scheduled: '#8b5cf6',
  proposal_sent: '#f59e0b',
  negotiation: '#ec4899',
  won: '#10b981',
  lost: '#ef4444',
};

export const TYPE_LABELS: Record<ProspectType, string> = {
  business: 'ბიზნესი',
  government: 'სახელმწიფო',
};

export const COUNTRIES = [
  'საქართველო',
  'აშშ',
  'გერმანია',
  'თურქეთი',
  'აზერბაიჯანი',
  'სომხეთი',
  'უკრაინა',
  'ისრაელი',
  'დიდი ბრიტანეთი',
  'საფრანგეთი',
  'იტალია',
  'ესპანეთი',
  'არაბეთი (UAE)',
  'სხვა',
];

export type ProspectStatus =
  | 'new'
  | 'contacted'
  | 'meeting_scheduled'
  | 'proposal_sent'
  | 'negotiation'
  | 'won'
  | 'lost';

export interface Prospect {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  status: ProspectStatus;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export const STATUS_LABELS: Record<ProspectStatus, string> = {
  new: 'New',
  contacted: 'Contacted',
  meeting_scheduled: 'Meeting Scheduled',
  proposal_sent: 'Proposal Sent',
  negotiation: 'Negotiation',
  won: 'Won',
  lost: 'Lost',
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

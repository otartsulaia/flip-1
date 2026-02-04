import { useState, useEffect, useCallback } from 'react';
import { Prospect, ProspectStatus, CostHistoryEntry } from '../types';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const STORAGE_KEY = 'simpler_crm_prospects';

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Convert camelCase JS object to snake_case DB row
function toSnakeCase(prospect: Prospect): Record<string, unknown> {
  return {
    id: prospect.id,
    company_name: prospect.companyName,
    contact_name: prospect.contactName,
    email: prospect.email,
    phone: prospect.phone,
    status: prospect.status,
    type: prospect.type,
    country: prospect.country,
    monthly_fee: prospect.monthlyFee,
    integration_fee: prospect.integrationFee,
    monthly_cost: prospect.monthlyCost,
    logo_url: prospect.logoUrl,
    notes: prospect.notes,
    integration_start_date: prospect.integrationStartDate,
    payment_day_of_month: prospect.paymentDayOfMonth,
    payment_delayed: prospect.paymentDelayed,
    payment_delay_notes: prospect.paymentDelayNotes,
    cost_history: JSON.stringify(prospect.costHistory || []),
    created_at: prospect.createdAt,
    updated_at: prospect.updatedAt,
  };
}

// Convert snake_case DB row to camelCase JS object
function toCamelCase(row: Record<string, unknown>): Prospect {
  let costHistory: CostHistoryEntry[] = [];
  try {
    const raw = row.cost_history;
    if (typeof raw === 'string') {
      costHistory = JSON.parse(raw) as CostHistoryEntry[];
    } else if (Array.isArray(raw)) {
      costHistory = raw as CostHistoryEntry[];
    }
  } catch {
    costHistory = [];
  }

  return {
    id: row.id as string,
    companyName: (row.company_name as string) || '',
    contactName: (row.contact_name as string) || '',
    email: (row.email as string) || '',
    phone: (row.phone as string) || '',
    status: (row.status as ProspectStatus) || 'new',
    type: (row.type as Prospect['type']) || 'business',
    country: (row.country as string) || 'GE',
    monthlyFee: Number(row.monthly_fee) || 0,
    integrationFee: Number(row.integration_fee) || 0,
    monthlyCost: Number(row.monthly_cost) || 0,
    logoUrl: (row.logo_url as string) || '',
    notes: (row.notes as string) || '',
    integrationStartDate: (row.integration_start_date as string) || '',
    paymentDayOfMonth: Number(row.payment_day_of_month) || 1,
    paymentDelayed: Boolean(row.payment_delayed),
    paymentDelayNotes: (row.payment_delay_notes as string) || '',
    costHistory,
    createdAt: (row.created_at as string) || '',
    updatedAt: (row.updated_at as string) || '',
  };
}

// localStorage helpers
function loadFromLocalStorage(): Prospect[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveToLocalStorage(prospects: Prospect[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prospects));
}

export function useProspects() {
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load prospects on mount
  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (isSupabaseConfigured && supabase) {
        try {
          const { data, error } = await supabase
            .from('prospects')
            .select('*')
            .order('created_at', { ascending: false });

          if (error) throw error;
          if (!cancelled && data) {
            setProspects(data.map((row: Record<string, unknown>) => toCamelCase(row)));
          }
        } catch (err) {
          console.error('Failed to load from Supabase, falling back to localStorage:', err);
          if (!cancelled) {
            setProspects(loadFromLocalStorage());
          }
        }
      } else {
        if (!cancelled) {
          setProspects(loadFromLocalStorage());
        }
      }
      if (!cancelled) {
        setIsLoaded(true);
      }
    }

    load();
    return () => { cancelled = true; };
  }, []);

  // Sync to localStorage whenever prospects change (as backup / fallback)
  useEffect(() => {
    if (isLoaded) {
      saveToLocalStorage(prospects);
    }
  }, [prospects, isLoaded]);

  const addProspect = useCallback(async (data: Omit<Prospect, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const newProspect: Prospect = {
      ...data,
      costHistory: data.costHistory || [],
      id: generateId(),
      createdAt: now,
      updatedAt: now,
    };

    setProspects(prev => [newProspect, ...prev]);

    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase
          .from('prospects')
          .insert(toSnakeCase(newProspect));
        if (error) throw error;
      } catch (err) {
        console.error('Failed to insert into Supabase:', err);
      }
    }

    return newProspect;
  }, []);

  const updateProspect = useCallback(async (id: string, data: Partial<Omit<Prospect, 'id' | 'createdAt'>>) => {
    const updatedAt = new Date().toISOString();

    setProspects(prev =>
      prev.map(p =>
        p.id === id
          ? { ...p, ...data, updatedAt }
          : p
      )
    );

    if (isSupabaseConfigured && supabase) {
      try {
        // Build a snake_case partial update object
        const updateData: Record<string, unknown> = { updated_at: updatedAt };
        const keyMap: Record<string, string> = {
          companyName: 'company_name',
          contactName: 'contact_name',
          email: 'email',
          phone: 'phone',
          status: 'status',
          type: 'type',
          country: 'country',
          monthlyFee: 'monthly_fee',
          integrationFee: 'integration_fee',
          monthlyCost: 'monthly_cost',
          logoUrl: 'logo_url',
          notes: 'notes',
          integrationStartDate: 'integration_start_date',
          paymentDayOfMonth: 'payment_day_of_month',
          paymentDelayed: 'payment_delayed',
          paymentDelayNotes: 'payment_delay_notes',
          costHistory: 'cost_history',
        };

        for (const [key, value] of Object.entries(data)) {
          const snakeKey = keyMap[key];
          if (snakeKey) {
            if (key === 'costHistory') {
              updateData[snakeKey] = JSON.stringify(value);
            } else {
              updateData[snakeKey] = value;
            }
          }
        }

        const { error } = await supabase
          .from('prospects')
          .update(updateData)
          .eq('id', id);
        if (error) throw error;
      } catch (err) {
        console.error('Failed to update in Supabase:', err);
      }
    }
  }, []);

  const updateStatus = useCallback((id: string, status: ProspectStatus) => {
    updateProspect(id, { status });
  }, [updateProspect]);

  const deleteProspect = useCallback(async (id: string) => {
    setProspects(prev => prev.filter(p => p.id !== id));

    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase
          .from('prospects')
          .delete()
          .eq('id', id);
        if (error) throw error;
      } catch (err) {
        console.error('Failed to delete from Supabase:', err);
      }
    }
  }, []);

  const getProspectById = useCallback((id: string) => {
    return prospects.find(p => p.id === id);
  }, [prospects]);

  return {
    prospects,
    isLoaded,
    addProspect,
    updateProspect,
    updateStatus,
    deleteProspect,
    getProspectById,
  };
}

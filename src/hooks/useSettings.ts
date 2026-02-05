import { useState, useCallback, useEffect } from 'react';
import { CRMSettings } from '../types';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const SETTINGS_KEY = 'simpler_crm_settings';

const DEFAULT_SETTINGS: CRMSettings = {
  kzProfitSharePercent: 30,
};

function loadLocal(): CRMSettings {
  try {
    const stored = localStorage.getItem(SETTINGS_KEY);
    return stored ? { ...DEFAULT_SETTINGS, ...JSON.parse(stored) } : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function useSettings() {
  const [settings, setSettings] = useState<CRMSettings>(loadLocal);

  // Load from Supabase on mount
  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return;

    supabase
      .from('crm_settings')
      .select('*')
      .eq('id', 'global')
      .single()
      .then(({ data }) => {
        if (data) {
          const s: CRMSettings = {
            kzProfitSharePercent: data.kz_profit_share_percent ?? DEFAULT_SETTINGS.kzProfitSharePercent,
          };
          setSettings(s);
          localStorage.setItem(SETTINGS_KEY, JSON.stringify(s));
        }
      })
      .catch(() => {
        // Table might not exist yet – use localStorage
      });
  }, []);

  const updateSettings = useCallback(async (partial: Partial<CRMSettings>) => {
    const updated = { ...settings, ...partial };
    setSettings(updated);
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase
          .from('crm_settings')
          .upsert({
            id: 'global',
            kz_profit_share_percent: updated.kzProfitSharePercent,
          });
      } catch {
        // Supabase save failed, localStorage still has data
      }
    }
  }, [settings]);

  return { settings, updateSettings };
}

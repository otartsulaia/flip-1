import { useState, useEffect, useCallback } from 'react';
import { Language, T, STATUS_LABELS, TYPE_LABELS, Country } from '../types';

const LANG_KEY = 'simpler_crm_lang';

function loadLang(): Language {
  return (localStorage.getItem(LANG_KEY) as Language) || 'ka';
}

export function useLanguage() {
  const [lang, setLangState] = useState<Language>(loadLang);

  const setLang = useCallback((l: Language) => {
    localStorage.setItem(LANG_KEY, l);
    setLangState(l);
  }, []);

  const t = useCallback((key: string): string => {
    const entry = T[key];
    return entry ? entry[lang] : key;
  }, [lang]);

  const statusLabel = useCallback((status: string): string => {
    const entry = STATUS_LABELS[status as keyof typeof STATUS_LABELS];
    return entry ? entry[lang] : status;
  }, [lang]);

  const typeLabel = useCallback((type: string): string => {
    const entry = TYPE_LABELS[type as keyof typeof TYPE_LABELS];
    return entry ? entry[lang] : type;
  }, [lang]);

  const countryName = useCallback((country: Country): string => {
    return country[lang];
  }, [lang]);

  return { lang, setLang, t, statusLabel, typeLabel, countryName };
}

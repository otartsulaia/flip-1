import { useState, useEffect } from 'react';
import { Prospect, ProspectStatus } from '../types';

const STORAGE_KEY = 'simpler_crm_prospects';

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function loadProspects(): Prospect[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveProspects(prospects: Prospect[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prospects));
}

export function useProspects() {
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setProspects(loadProspects());
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      saveProspects(prospects);
    }
  }, [prospects, isLoaded]);

  const addProspect = (data: Omit<Prospect, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const newProspect: Prospect = {
      ...data,
      id: generateId(),
      createdAt: now,
      updatedAt: now,
    };
    setProspects(prev => [newProspect, ...prev]);
    return newProspect;
  };

  const updateProspect = (id: string, data: Partial<Omit<Prospect, 'id' | 'createdAt'>>) => {
    setProspects(prev =>
      prev.map(p =>
        p.id === id
          ? { ...p, ...data, updatedAt: new Date().toISOString() }
          : p
      )
    );
  };

  const updateStatus = (id: string, status: ProspectStatus) => {
    updateProspect(id, { status });
  };

  const deleteProspect = (id: string) => {
    setProspects(prev => prev.filter(p => p.id !== id));
  };

  const getProspectById = (id: string) => {
    return prospects.find(p => p.id === id);
  };

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

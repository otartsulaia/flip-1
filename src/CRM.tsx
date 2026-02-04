import React, { useState } from 'react';
import styled from 'styled-components';
import { useProspects } from './hooks/useProspects';
import { useLanguage } from './hooks/useLanguage';
import { Prospect, ProspectStatus, ProspectType, STATUS_LABELS, TYPE_LABELS, COUNTRIES, getCountryByCode } from './types';
import { ProspectForm } from './components/ProspectForm';
import { ProspectCard } from './components/ProspectCard';
import { Financials } from './components/Financials';
import { Button, Input, GlassCard } from './styles';

const PageWrapper = styled.div`
  min-height: 100vh;
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 28px;
  flex-wrap: wrap;
  gap: 16px;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const LogoImage = styled.img`
  height: 32px;
  width: auto;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Logo = styled.h1`
  font-size: 22px;
  font-weight: 700;
  color: #fafafa;
  margin: 0;
  span {
    color: #007AFF;
  }
`;

const Subtitle = styled.p`
  color: rgba(255, 255, 255, 0.3);
  font-size: 13px;
  margin: 4px 0 0 0;
`;

const LangButton = styled.button<{ $active?: boolean }>`
  padding: 6px 12px;
  border-radius: 8px;
  border: 1px solid ${({ $active }) => $active ? 'rgba(0, 122, 255, 0.4)' : 'rgba(255, 255, 255, 0.08)'};
  background: ${({ $active }) => $active ? 'rgba(0, 122, 255, 0.15)' : 'rgba(255, 255, 255, 0.04)'};
  color: ${({ $active }) => $active ? '#007AFF' : 'rgba(255, 255, 255, 0.5)'};
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  transition: all 0.2s ease;
  outline: none;
  &:hover {
    background: ${({ $active }) => $active ? 'rgba(0, 122, 255, 0.2)' : 'rgba(255, 255, 255, 0.08)'};
  }
`;

const QuickActionsBar = styled(GlassCard)`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 18px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`;

const QuickActionButton = styled.button`
  padding: 8px 16px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(10px);
  color: #e4e4e7;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.2s ease;
  outline: none;
  &:hover {
    background: rgba(0, 122, 255, 0.15);
    border-color: rgba(0, 122, 255, 0.3);
    color: #007AFF;
  }
  &:active {
    transform: scale(0.97);
  }
`;

const QuickActionsLabel = styled.span`
  font-size: 11px;
  color: rgba(255, 255, 255, 0.35);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-right: 6px;
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-bottom: 24px;
  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StatCard = styled(GlassCard)`
  padding: 16px 18px;
`;

const StatNumber = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: #fafafa;
`;

const StatLabel = styled.div`
  font-size: 11px;
  color: rgba(255, 255, 255, 0.35);
  margin-top: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Controls = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const SearchInput = styled(Input)`
  flex: 1;
  min-width: 180px;
  height: 44px;
`;

const FilterSelect = styled.select`
  padding: 10px 14px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.05);
  color: #e4e4e7;
  outline: none;
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s ease;
  &:focus {
    border-color: rgba(0, 122, 255, 0.4);
    background: rgba(255, 255, 255, 0.08);
  }
  option {
    background: #1a1d25;
    color: #e4e4e7;
  }
`;

const ProspectList = styled.div`
  display: grid;
  gap: 16px;
`;

const Modal = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  z-index: 100;
`;

const ModalContent = styled.div`
  background: rgba(20, 22, 30, 0.95);
  backdrop-filter: blur(30px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 28px;
  max-width: 540px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
`;

const ModalTitle = styled.h2`
  font-size: 20px;
  margin: 0 0 24px 0;
  color: #fafafa;
  font-weight: 600;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: rgba(255, 255, 255, 0.3);
`;

const EmptyTitle = styled.h3`
  font-size: 18px;
  color: rgba(255, 255, 255, 0.5);
  margin: 0 0 8px 0;
`;

const TabBar = styled.div`
  display: flex;
  gap: 0;
  margin-bottom: 24px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  overflow: hidden;
`;

const Tab = styled.button<{ $active?: boolean }>`
  flex: 1;
  padding: 12px 20px;
  border: none;
  background: ${({ $active }) => ($active ? 'rgba(0, 122, 255, 0.15)' : 'transparent')};
  color: ${({ $active }) => ($active ? '#007AFF' : 'rgba(255, 255, 255, 0.4)')};
  font-weight: ${({ $active }) => ($active ? '600' : '400')};
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
  outline: none;
  &:hover {
    background: ${({ $active }) => ($active ? 'rgba(0, 122, 255, 0.15)' : 'rgba(255, 255, 255, 0.04)')};
    color: ${({ $active }) => ($active ? '#007AFF' : 'rgba(255, 255, 255, 0.6)')};
  }
`;

type ViewTab = 'prospects' | 'financials';

export function CRM() {
  const { prospects, addProspect, updateProspect, updateStatus, deleteProspect } = useProspects();
  const { lang, setLang, t, statusLabel, typeLabel, countryName } = useLanguage();

  const [showForm, setShowForm] = useState(false);
  const [editingProspect, setEditingProspect] = useState<Prospect | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<ProspectStatus | 'all'>('all');
  const [typeFilter, setTypeFilter] = useState<ProspectType | 'all'>('all');
  const [countryFilter, setCountryFilter] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<ViewTab>('prospects');

  const handleAddProspect = (data: Omit<Prospect, 'id' | 'createdAt' | 'updatedAt'>) => {
    addProspect(data);
    setShowForm(false);
  };

  const handleUpdateProspect = (data: Omit<Prospect, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingProspect) {
      updateProspect(editingProspect.id, data);
      setEditingProspect(null);
    }
  };

  const handleEdit = (prospect: Prospect) => {
    setEditingProspect(prospect);
  };

  const handleDelete = (id: string) => {
    if (confirm(t('confirmDelete'))) {
      deleteProspect(id);
    }
  };

  const handleChangeCost = (id: string, newCost: number) => {
    const prospect = prospects.find(p => p.id === id);
    if (!prospect) return;
    const now = new Date().toISOString();
    const history = [...(prospect.costHistory || [])];
    history.push({ date: now, amount: newCost });
    updateProspect(id, { monthlyCost: newCost, costHistory: history });
  };

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(prospects, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `simpler-crm-export-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredProspects = prospects.filter(p => {
    const matchesSearch =
      p.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    const matchesType = typeFilter === 'all' || p.type === typeFilter;
    const matchesCountry = countryFilter === 'all' || p.country === countryFilter;
    return matchesSearch && matchesStatus && matchesType && matchesCountry;
  });

  const wonCount = prospects.filter(p => p.status === 'won').length;
  const activeCount = prospects.filter(p => !['won', 'lost'].includes(p.status)).length;
  const mrr = prospects
    .filter(p => p.status === 'won')
    .reduce((s, p) => s + (p.monthlyFee || 0), 0);

  const usedCountryCodes = [...new Set(prospects.map(p => p.country).filter(Boolean))];

  return (
    <PageWrapper>
      <Header>
        <HeaderLeft>
          <LogoImage src="/simpler-logo.svg" alt="simpler.ge" onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          <div>
            <Logo>
              simpler<span>.ge</span> CRM
            </Logo>
            <Subtitle>{t('appSubtitle')}</Subtitle>
          </div>
        </HeaderLeft>
        <HeaderRight>
          <LangButton $active={lang === 'ka'} onClick={() => setLang('ka')}>KA</LangButton>
          <LangButton $active={lang === 'en'} onClick={() => setLang('en')}>EN</LangButton>
          <Button $gradient onClick={() => setShowForm(true)}>
            {t('addProspect')}
          </Button>
        </HeaderRight>
      </Header>

      <QuickActionsBar>
        <QuickActionsLabel>{t('quickActions')}</QuickActionsLabel>
        <QuickActionButton onClick={() => window.open('https://business.tbcbank.ge', '_blank')}>
          {t('openTBC')}
        </QuickActionButton>
        <QuickActionButton onClick={() => window.open('https://dashboard.keepz.me', '_blank')}>
          {t('openKeepz')}
        </QuickActionButton>
        <QuickActionButton onClick={handleExport}>
          {t('exportData')}
        </QuickActionButton>
      </QuickActionsBar>

      <Stats>
        <StatCard>
          <StatNumber>{prospects.length}</StatNumber>
          <StatLabel>{t('total')}</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{activeCount}</StatNumber>
          <StatLabel>{t('active')}</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{wonCount}</StatNumber>
          <StatLabel>{t('won')}</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>${mrr.toLocaleString()}</StatNumber>
          <StatLabel>MRR</StatLabel>
        </StatCard>
      </Stats>

      <TabBar>
        <Tab $active={activeTab === 'prospects'} onClick={() => setActiveTab('prospects')}>
          {t('prospects')}
        </Tab>
        <Tab $active={activeTab === 'financials'} onClick={() => setActiveTab('financials')}>
          {t('financials')}
        </Tab>
      </TabBar>

      {activeTab === 'financials' ? (
        <Financials prospects={prospects} />
      ) : (
        <>
          <Controls>
            <SearchInput
              type="text"
              placeholder={t('search')}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <FilterSelect
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value as ProspectStatus | 'all')}
            >
              <option value="all">{t('allStatuses')}</option>
              {Object.keys(STATUS_LABELS).map(value => (
                <option key={value} value={value}>
                  {statusLabel(value)}
                </option>
              ))}
            </FilterSelect>
            <FilterSelect
              value={typeFilter}
              onChange={e => setTypeFilter(e.target.value as ProspectType | 'all')}
            >
              <option value="all">{t('allTypes')}</option>
              {Object.keys(TYPE_LABELS).map(value => (
                <option key={value} value={value}>
                  {typeLabel(value)}
                </option>
              ))}
            </FilterSelect>
            <FilterSelect
              value={countryFilter}
              onChange={e => setCountryFilter(e.target.value)}
            >
              <option value="all">{t('allCountries')}</option>
              {COUNTRIES.map(c => (
                <option key={c.code} value={c.code}>
                  {c.flag} {countryName(c)}
                </option>
              ))}
            </FilterSelect>
          </Controls>

          {filteredProspects.length === 0 ? (
            <EmptyState>
              <EmptyTitle>
                {prospects.length === 0 ? t('noProspects') : t('noResults')}
              </EmptyTitle>
              <p>
                {prospects.length === 0 ? t('addFirst') : t('tryAdjust')}
              </p>
            </EmptyState>
          ) : (
            <ProspectList>
              {filteredProspects.map(prospect => (
                <ProspectCard
                  key={prospect.id}
                  prospect={prospect}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onStatusChange={updateStatus}
                  onChangeCost={handleChangeCost}
                />
              ))}
            </ProspectList>
          )}
        </>
      )}

      {(showForm || editingProspect) && (
        <Modal onClick={() => { setShowForm(false); setEditingProspect(null); }}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <ModalTitle>{editingProspect ? t('editProspect') : t('newProspect')}</ModalTitle>
            <ProspectForm
              onSubmit={editingProspect ? handleUpdateProspect : handleAddProspect}
              onCancel={() => { setShowForm(false); setEditingProspect(null); }}
              initialData={editingProspect || undefined}
            />
          </ModalContent>
        </Modal>
      )}
    </PageWrapper>
  );
}

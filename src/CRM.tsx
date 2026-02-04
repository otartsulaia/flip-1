import React, { useState } from 'react';
import styled from 'styled-components';
import { useProspects } from './hooks/useProspects';
import { Prospect, ProspectStatus, ProspectType, STATUS_LABELS, TYPE_LABELS, COUNTRIES } from './types';
import { ProspectForm } from './components/ProspectForm';
import { ProspectCard } from './components/ProspectCard';
import { Financials } from './components/Financials';
import { Button, Input } from './styles';

const PageWrapper = styled.div`
  min-height: 100vh;
  padding: 20px;
  max-width: 960px;
  margin: 0 auto;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
`;

const Logo = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: white;
  margin: 0;
  span {
    color: #10b981;
  }
`;

const Subtitle = styled.p`
  color: #6b7280;
  font-size: 13px;
  margin: 4px 0 0 0;
`;

const Stats = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 24px;
`;

const StatCard = styled.div`
  background: rgb(47 51 60);
  padding: 14px 18px;
  border-radius: 10px;
  min-width: 90px;
  flex: 1;
`;

const StatNumber = styled.div`
  font-size: 26px;
  font-weight: bold;
  color: white;
`;

const StatLabel = styled.div`
  font-size: 11px;
  color: #9ca3af;
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
  border: none;
  background: rgb(47 51 60);
  color: white;
  outline: none;
  cursor: pointer;
  font-size: 13px;
  &:focus {
    background: rgb(58 63 75);
  }
`;

const ProspectList = styled.div`
  display: grid;
  gap: 16px;
`;

const Modal = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  z-index: 100;
`;

const ModalContent = styled.div`
  background: #191c23;
  border-radius: 16px;
  padding: 24px;
  max-width: 520px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalTitle = styled.h2`
  font-size: 18px;
  margin: 0 0 20px 0;
  color: white;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #6b7280;
`;

const EmptyTitle = styled.h3`
  font-size: 18px;
  color: #9ca3af;
  margin: 0 0 8px 0;
`;

const TabBar = styled.div`
  display: flex;
  gap: 0;
  margin-bottom: 24px;
  background: rgb(47 51 60);
  border-radius: 10px;
  overflow: hidden;
`;

const Tab = styled.button<{ $active?: boolean }>`
  flex: 1;
  padding: 12px 20px;
  border: none;
  background: ${({ $active }) => $active ? 'rgba(16, 185, 129, 0.2)' : 'transparent'};
  color: ${({ $active }) => $active ? '#10b981' : '#9ca3af'};
  font-weight: ${({ $active }) => $active ? '600' : '400'};
  cursor: pointer;
  font-size: 14px;
  transition: all 0.15s;
  &:hover {
    background: ${({ $active }) => $active ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255,255,255,0.05)'};
  }
`;

type ViewTab = 'prospects' | 'financials';

export function CRM() {
  const { prospects, addProspect, updateProspect, updateStatus, deleteProspect } = useProspects();
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
    if (confirm('ნამდვილად გსურთ წაშლა?')) {
      deleteProspect(id);
    }
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

  const usedCountries = [...new Set(prospects.map(p => p.country).filter(Boolean))];

  return (
    <PageWrapper>
      <Header>
        <div>
          <Logo>
            simpler<span>.ge</span> CRM
          </Logo>
          <Subtitle>პროსპექტების მართვა</Subtitle>
        </div>
        <Button $gradient onClick={() => setShowForm(true)}>
          + დამატება
        </Button>
      </Header>

      <Stats>
        <StatCard>
          <StatNumber>{prospects.length}</StatNumber>
          <StatLabel>სულ</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{activeCount}</StatNumber>
          <StatLabel>აქტიური</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{wonCount}</StatNumber>
          <StatLabel>მოგებული</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>
            ${prospects.filter(p => p.status === 'won').reduce((s, p) => s + (p.monthlyFee || 0), 0).toLocaleString()}
          </StatNumber>
          <StatLabel>MRR</StatLabel>
        </StatCard>
      </Stats>

      <TabBar>
        <Tab $active={activeTab === 'prospects'} onClick={() => setActiveTab('prospects')}>
          პროსპექტები
        </Tab>
        <Tab $active={activeTab === 'financials'} onClick={() => setActiveTab('financials')}>
          ფინანსები
        </Tab>
      </TabBar>

      {activeTab === 'financials' ? (
        <Financials prospects={prospects} />
      ) : (
        <>
          <Controls>
            <SearchInput
              type="text"
              placeholder="ძიება..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <FilterSelect
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value as ProspectStatus | 'all')}
            >
              <option value="all">ყველა სტატუსი</option>
              {Object.entries(STATUS_LABELS).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </FilterSelect>
            <FilterSelect
              value={typeFilter}
              onChange={e => setTypeFilter(e.target.value as ProspectType | 'all')}
            >
              <option value="all">ყველა ტიპი</option>
              {Object.entries(TYPE_LABELS).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </FilterSelect>
            {usedCountries.length > 0 && (
              <FilterSelect
                value={countryFilter}
                onChange={e => setCountryFilter(e.target.value)}
              >
                <option value="all">ყველა ქვეყანა</option>
                {usedCountries.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </FilterSelect>
            )}
          </Controls>

          {filteredProspects.length === 0 ? (
            <EmptyState>
              <EmptyTitle>
                {prospects.length === 0 ? 'პროსპექტები ჯერ არ არის' : 'შედეგი ვერ მოიძებნა'}
              </EmptyTitle>
              <p>
                {prospects.length === 0
                  ? 'დაამატეთ პირველი პროსპექტი დასაწყებად.'
                  : 'სცადეთ ძიების ან ფილტრის შეცვლა.'}
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
                />
              ))}
            </ProspectList>
          )}
        </>
      )}

      {(showForm || editingProspect) && (
        <Modal onClick={() => { setShowForm(false); setEditingProspect(null); }}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <ModalTitle>{editingProspect ? 'პროსპექტის რედაქტირება' : 'ახალი პროსპექტი'}</ModalTitle>
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

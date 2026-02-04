import React, { useState } from 'react';
import styled from 'styled-components';
import { useProspects } from './hooks/useProspects';
import { Prospect, ProspectStatus, STATUS_LABELS } from './types';
import { ProspectForm } from './components/ProspectForm';
import { ProspectCard } from './components/ProspectCard';
import { Button, Input } from './styles';

const PageWrapper = styled.div`
  min-height: 100vh;
  padding: 20px;
  max-width: 900px;
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
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 24px;
`;

const StatCard = styled.div`
  background: rgb(47 51 60);
  padding: 16px 20px;
  border-radius: 10px;
  min-width: 100px;
`;

const StatNumber = styled.div`
  font-size: 28px;
  font-weight: bold;
  color: white;
`;

const StatLabel = styled.div`
  font-size: 12px;
  color: #9ca3af;
`;

const Controls = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const SearchInput = styled(Input)`
  flex: 1;
  min-width: 200px;
  height: 44px;
`;

const FilterSelect = styled.select`
  padding: 12px 16px;
  border-radius: 10px;
  border: none;
  background: rgb(47 51 60);
  color: white;
  outline: none;
  cursor: pointer;
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
  max-width: 500px;
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

export function CRM() {
  const { prospects, addProspect, updateProspect, updateStatus, deleteProspect } = useProspects();
  const [showForm, setShowForm] = useState(false);
  const [editingProspect, setEditingProspect] = useState<Prospect | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<ProspectStatus | 'all'>('all');

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
    if (confirm('Are you sure you want to delete this prospect?')) {
      deleteProspect(id);
    }
  };

  const filteredProspects = prospects.filter(p => {
    const matchesSearch =
      p.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const wonCount = prospects.filter(p => p.status === 'won').length;
  const activeCount = prospects.filter(p => !['won', 'lost'].includes(p.status)).length;

  return (
    <PageWrapper>
      <Header>
        <div>
          <Logo>
            simpler<span>.ge</span> CRM
          </Logo>
          <Subtitle>Track your prospects and close more deals</Subtitle>
        </div>
        <Button $gradient onClick={() => setShowForm(true)}>
          + Add Prospect
        </Button>
      </Header>

      <Stats>
        <StatCard>
          <StatNumber>{prospects.length}</StatNumber>
          <StatLabel>Total Prospects</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{activeCount}</StatNumber>
          <StatLabel>Active</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{wonCount}</StatNumber>
          <StatLabel>Won</StatLabel>
        </StatCard>
      </Stats>

      <Controls>
        <SearchInput
          type="text"
          placeholder="Search prospects..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        <FilterSelect
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value as ProspectStatus | 'all')}
        >
          <option value="all">All Status</option>
          {Object.entries(STATUS_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </FilterSelect>
      </Controls>

      {filteredProspects.length === 0 ? (
        <EmptyState>
          <EmptyTitle>
            {prospects.length === 0 ? 'No prospects yet' : 'No matching prospects'}
          </EmptyTitle>
          <p>
            {prospects.length === 0
              ? 'Add your first prospect to get started.'
              : 'Try adjusting your search or filter.'}
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

      {(showForm || editingProspect) && (
        <Modal onClick={() => { setShowForm(false); setEditingProspect(null); }}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <ModalTitle>{editingProspect ? 'Edit Prospect' : 'Add New Prospect'}</ModalTitle>
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

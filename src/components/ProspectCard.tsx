import React from 'react';
import styled from 'styled-components';
import { Prospect, ProspectStatus, STATUS_LABELS } from '../types';
import { StatusBadge } from './StatusBadge';
import { SmallButton } from '../styles';

const Card = styled.div`
  background: rgb(47 51 60);
  border-radius: 12px;
  padding: 16px;
  text-align: left;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`;

const CompanyName = styled.h3`
  font-size: 16px;
  margin: 0 0 4px 0;
  color: white;
`;

const ContactName = styled.p`
  font-size: 13px;
  color: #9ca3af;
  margin: 0;
`;

const InfoRow = styled.div`
  display: flex;
  gap: 16px;
  margin: 12px 0;
  flex-wrap: wrap;
`;

const InfoItem = styled.div`
  font-size: 13px;
  color: #d1d5db;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const Notes = styled.p`
  font-size: 13px;
  color: #9ca3af;
  margin: 12px 0;
  padding: 10px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  white-space: pre-wrap;
`;

const CardActions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 12px;
  flex-wrap: wrap;
`;

const StatusSelect = styled.select`
  padding: 6px 10px;
  border-radius: 6px;
  border: none;
  background: rgb(58 63 75);
  color: white;
  font-size: 12px;
  cursor: pointer;
  outline: none;
`;

const DateInfo = styled.div`
  font-size: 11px;
  color: #6b7280;
  margin-top: 12px;
`;

interface ProspectCardProps {
  prospect: Prospect;
  onEdit: (prospect: Prospect) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: ProspectStatus) => void;
}

export function ProspectCard({ prospect, onEdit, onDelete, onStatusChange }: ProspectCardProps) {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <Card>
      <CardHeader>
        <div>
          <CompanyName>{prospect.companyName}</CompanyName>
          {prospect.contactName && <ContactName>{prospect.contactName}</ContactName>}
        </div>
        <StatusBadge status={prospect.status} />
      </CardHeader>

      <InfoRow>
        {prospect.email && (
          <InfoItem>
            <span>@</span> {prospect.email}
          </InfoItem>
        )}
        {prospect.phone && (
          <InfoItem>
            <span>#</span> {prospect.phone}
          </InfoItem>
        )}
      </InfoRow>

      {prospect.notes && <Notes>{prospect.notes}</Notes>}

      <CardActions>
        <StatusSelect
          value={prospect.status}
          onChange={e => onStatusChange(prospect.id, e.target.value as ProspectStatus)}
        >
          {Object.entries(STATUS_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </StatusSelect>
        <SmallButton onClick={() => onEdit(prospect)}>Edit</SmallButton>
        <SmallButton onClick={() => onDelete(prospect.id)}>Delete</SmallButton>
      </CardActions>

      <DateInfo>
        Added {formatDate(prospect.createdAt)}
        {prospect.updatedAt !== prospect.createdAt && ` | Updated ${formatDate(prospect.updatedAt)}`}
      </DateInfo>
    </Card>
  );
}

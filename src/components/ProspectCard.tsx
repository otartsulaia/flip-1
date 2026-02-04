import React from 'react';
import styled from 'styled-components';
import { Prospect, ProspectStatus, STATUS_LABELS, TYPE_LABELS } from '../types';
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
  gap: 12px;
`;

const CompanyInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  min-width: 0;
`;

const LogoImg = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: white;
  object-fit: contain;
  flex-shrink: 0;
`;

const LogoPlaceholder = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: rgba(255,255,255,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: bold;
  color: #9ca3af;
  flex-shrink: 0;
`;

const CompanyName = styled.h3`
  font-size: 16px;
  margin: 0 0 2px 0;
  color: white;
`;

const ContactName = styled.p`
  font-size: 13px;
  color: #9ca3af;
  margin: 0;
`;

const Tags = styled.div`
  display: flex;
  gap: 8px;
  margin: 10px 0;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  font-size: 11px;
  padding: 3px 10px;
  border-radius: 6px;
  background: rgba(255,255,255,0.06);
  color: #d1d5db;
`;

const InfoRow = styled.div`
  display: flex;
  gap: 16px;
  margin: 10px 0;
  flex-wrap: wrap;
`;

const InfoItem = styled.div`
  font-size: 13px;
  color: #d1d5db;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const FeeRow = styled.div`
  display: flex;
  gap: 20px;
  margin: 10px 0;
  flex-wrap: wrap;
`;

const FeeItem = styled.div`
  font-size: 13px;
  span {
    color: #6b7280;
    font-size: 11px;
  }
`;

const FeeValue = styled.div`
  color: #10b981;
  font-weight: 600;
  font-size: 15px;
`;

const Notes = styled.p`
  font-size: 13px;
  color: #9ca3af;
  margin: 10px 0;
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
    return new Date(dateStr).toLocaleDateString('ka-GE', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const initial = prospect.companyName.charAt(0).toUpperCase();

  return (
    <Card>
      <CardHeader>
        <CompanyInfo>
          {prospect.logoUrl ? (
            <LogoImg
              src={prospect.logoUrl}
              onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
          ) : (
            <LogoPlaceholder>{initial}</LogoPlaceholder>
          )}
          <div>
            <CompanyName>{prospect.companyName}</CompanyName>
            {prospect.contactName && <ContactName>{prospect.contactName}</ContactName>}
          </div>
        </CompanyInfo>
        <StatusBadge status={prospect.status} />
      </CardHeader>

      <Tags>
        <Tag>{TYPE_LABELS[prospect.type] || prospect.type}</Tag>
        {prospect.country && <Tag>{prospect.country}</Tag>}
      </Tags>

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

      {(prospect.monthlyFee > 0 || prospect.integrationFee > 0) && (
        <FeeRow>
          {prospect.monthlyFee > 0 && (
            <FeeItem>
              <span>ყოველთვიური</span>
              <FeeValue>${prospect.monthlyFee.toLocaleString()}</FeeValue>
            </FeeItem>
          )}
          {prospect.integrationFee > 0 && (
            <FeeItem>
              <span>ინტეგრაცია</span>
              <FeeValue>${prospect.integrationFee.toLocaleString()}</FeeValue>
            </FeeItem>
          )}
        </FeeRow>
      )}

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
        <SmallButton onClick={() => onEdit(prospect)}>რედაქტირება</SmallButton>
        <SmallButton onClick={() => onDelete(prospect.id)}>წაშლა</SmallButton>
      </CardActions>

      <DateInfo>
        დამატებულია {formatDate(prospect.createdAt)}
        {prospect.updatedAt !== prospect.createdAt && ` | განახლებულია ${formatDate(prospect.updatedAt)}`}
      </DateInfo>
    </Card>
  );
}

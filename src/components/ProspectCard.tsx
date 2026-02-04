import React from 'react';
import styled from 'styled-components';
import { Prospect, ProspectStatus, STATUS_LABELS, getCountryByCode } from '../types';
import { StatusBadge } from './StatusBadge';
import { SmallButton, GlassCard } from '../styles';
import { useLanguage } from '../hooks/useLanguage';

const Card = styled(GlassCard)`
  text-align: left;
  &:hover {
    background: rgba(255, 255, 255, 0.07);
    border-color: rgba(255, 255, 255, 0.12);
  }
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
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: white;
  object-fit: contain;
  flex-shrink: 0;
`;

const LogoPlaceholder = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 17px;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.4);
  flex-shrink: 0;
`;

const CompanyName = styled.h3`
  font-size: 16px;
  margin: 0 0 2px 0;
  color: #fafafa;
  font-weight: 600;
`;

const ContactName = styled.p`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.4);
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
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.06);
  color: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.04);
`;

const InfoRow = styled.div`
  display: flex;
  gap: 16px;
  margin: 10px 0;
  flex-wrap: wrap;
`;

const InfoItem = styled.div`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  gap: 6px;
`;

const FeeRow = styled.div`
  display: flex;
  gap: 20px;
  margin: 12px 0;
  flex-wrap: wrap;
`;

const FeeItem = styled.div`
  font-size: 13px;
  span {
    color: rgba(255, 255, 255, 0.35);
    font-size: 11px;
  }
`;

const FeeValue = styled.div`
  color: #10b981;
  font-weight: 600;
  font-size: 15px;
`;

const CostValue = styled.div`
  color: #ef4444;
  font-weight: 600;
  font-size: 15px;
`;

const IntegrationInfo = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin: 10px 0;
  padding: 10px 14px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.04);
`;

const IntegrationItem = styled.div`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.4);
  .value {
    color: #e4e4e7;
    font-weight: 600;
    font-size: 14px;
  }
`;

const DelayedBadge = styled.span`
  display: inline-block;
  padding: 3px 10px;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 600;
  background: rgba(239, 68, 68, 0.15);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.3);
`;

const Notes = styled.p`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.4);
  margin: 10px 0;
  padding: 10px 14px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.04);
  white-space: pre-wrap;
`;

const CardActions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 14px;
  flex-wrap: wrap;
  align-items: center;
`;

const StatusSelect = styled.select`
  padding: 6px 10px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.05);
  color: #e4e4e7;
  font-size: 12px;
  cursor: pointer;
  outline: none;
  transition: all 0.2s ease;
  &:focus {
    border-color: rgba(16, 185, 129, 0.4);
  }
  option {
    background: #1a1d25;
    color: #e4e4e7;
  }
`;

const DateInfo = styled.div`
  font-size: 11px;
  color: rgba(255, 255, 255, 0.2);
  margin-top: 14px;
  padding-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
`;

interface ProspectCardProps {
  prospect: Prospect;
  onEdit: (prospect: Prospect) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: ProspectStatus) => void;
}

export function ProspectCard({ prospect, onEdit, onDelete, onStatusChange }: ProspectCardProps) {
  const { lang, t, statusLabel, typeLabel, countryName } = useLanguage();

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString(lang === 'ka' ? 'ka-GE' : 'en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const initial = prospect.companyName.charAt(0).toUpperCase();
  const countryInfo = getCountryByCode(prospect.country);

  // Calculate integration months
  const getIntegrationMonths = (): number => {
    if (!prospect.integrationStartDate) return 0;
    const start = new Date(prospect.integrationStartDate);
    const now = new Date();
    const diffMs = now.getTime() - start.getTime();
    const diffMonths = diffMs / (1000 * 60 * 60 * 24 * 30.44);
    return Math.floor(diffMonths);
  };

  const integrationMonths = getIntegrationMonths();
  const totalPaid = (integrationMonths * (prospect.monthlyFee || 0)) + (prospect.integrationFee || 0);

  // Calculate next payment date from paymentDayOfMonth
  const getNextPaymentDate = (): string => {
    if (!prospect.paymentDayOfMonth) return '';
    const now = new Date();
    const day = prospect.paymentDayOfMonth;
    let nextDate = new Date(now.getFullYear(), now.getMonth(), day);
    if (nextDate <= now) {
      nextDate = new Date(now.getFullYear(), now.getMonth() + 1, day);
    }
    return formatDate(nextDate.toISOString());
  };

  return (
    <Card>
      <CardHeader>
        <CompanyInfo>
          {prospect.logoUrl ? (
            <LogoImg
              src={prospect.logoUrl}
              onError={e => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          ) : (
            <LogoPlaceholder>{initial}</LogoPlaceholder>
          )}
          <div>
            <CompanyName>
              {prospect.companyName}
              {countryInfo && <span style={{ marginLeft: 8 }}>{countryInfo.flag}</span>}
            </CompanyName>
            {prospect.contactName && <ContactName>{prospect.contactName}</ContactName>}
          </div>
        </CompanyInfo>
        <StatusBadge status={prospect.status} />
      </CardHeader>

      <Tags>
        <Tag>{typeLabel(prospect.type)}</Tag>
        {countryInfo && (
          <Tag>{countryInfo.flag} {countryName(countryInfo)}</Tag>
        )}
        {prospect.paymentDelayed && (
          <DelayedBadge>{t('delayed')}</DelayedBadge>
        )}
      </Tags>

      <InfoRow>
        {prospect.email && (
          <InfoItem>
            <span style={{ opacity: 0.5 }}>@</span> {prospect.email}
          </InfoItem>
        )}
        {prospect.phone && (
          <InfoItem>
            <span style={{ opacity: 0.5 }}>#</span> {prospect.phone}
          </InfoItem>
        )}
      </InfoRow>

      {(prospect.monthlyFee > 0 || prospect.integrationFee > 0 || prospect.monthlyCost > 0) && (
        <FeeRow>
          {prospect.monthlyFee > 0 && (
            <FeeItem>
              <span>{t('monthly')}</span>
              <FeeValue>${prospect.monthlyFee.toLocaleString()}</FeeValue>
            </FeeItem>
          )}
          {prospect.integrationFee > 0 && (
            <FeeItem>
              <span>{t('integration')}</span>
              <FeeValue>${prospect.integrationFee.toLocaleString()}</FeeValue>
            </FeeItem>
          )}
          {prospect.monthlyCost > 0 && (
            <FeeItem>
              <span>{t('cost')}</span>
              <CostValue>-${prospect.monthlyCost.toLocaleString()}</CostValue>
            </FeeItem>
          )}
        </FeeRow>
      )}

      {prospect.integrationStartDate && (
        <IntegrationInfo>
          <IntegrationItem>
            <div>{t('integration')}</div>
            <div className="value">{integrationMonths} {t('months')}</div>
          </IntegrationItem>
          <IntegrationItem>
            <div>{t('totalPaid')}</div>
            <div className="value">${totalPaid.toLocaleString()}</div>
          </IntegrationItem>
          {prospect.paymentDayOfMonth > 0 && (
            <IntegrationItem>
              <div>{t('nextPayment')}</div>
              <div className="value">{getNextPaymentDate()}</div>
            </IntegrationItem>
          )}
        </IntegrationInfo>
      )}

      {prospect.paymentDelayed && prospect.paymentDelayNotes && (
        <Notes style={{ borderColor: 'rgba(239, 68, 68, 0.2)' }}>
          {prospect.paymentDelayNotes}
        </Notes>
      )}

      {prospect.notes && <Notes>{prospect.notes}</Notes>}

      <CardActions>
        <StatusSelect
          value={prospect.status}
          onChange={e => onStatusChange(prospect.id, e.target.value as ProspectStatus)}
        >
          {Object.keys(STATUS_LABELS).map(value => (
            <option key={value} value={value}>
              {statusLabel(value)}
            </option>
          ))}
        </StatusSelect>
        <SmallButton onClick={() => onEdit(prospect)}>{t('edit')}</SmallButton>
        <SmallButton onClick={() => onDelete(prospect.id)}>{t('delete')}</SmallButton>
      </CardActions>

      <DateInfo>
        {t('added')} {formatDate(prospect.createdAt)}
        {prospect.updatedAt !== prospect.createdAt && ` | ${t('updated')} ${formatDate(prospect.updatedAt)}`}
      </DateInfo>
    </Card>
  );
}

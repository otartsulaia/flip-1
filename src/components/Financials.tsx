import React from 'react';
import styled from 'styled-components';
import { Prospect } from '../types';
import { GlassCard } from '../styles';
import { useLanguage } from '../hooks/useLanguage';

const Wrapper = styled(GlassCard)`
  margin-bottom: 24px;
`;

const Title = styled.h2`
  font-size: 18px;
  margin: 0 0 20px 0;
  color: #fafafa;
  font-weight: 600;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 14px;
`;

const Metric = styled.div`
  background: rgba(0, 0, 0, 0.25);
  border-radius: 12px;
  padding: 16px;
  border: 1px solid rgba(255, 255, 255, 0.04);
  transition: all 0.2s ease;
  &:hover {
    background: rgba(0, 0, 0, 0.3);
    border-color: rgba(255, 255, 255, 0.08);
  }
`;

const MetricLabel = styled.div`
  font-size: 11px;
  color: rgba(255, 255, 255, 0.4);
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const MetricValue = styled.div<{ $color?: string }>`
  font-size: 24px;
  font-weight: 700;
  color: ${({ $color }) => $color || '#fafafa'};
`;

const MetricSub = styled.div`
  font-size: 11px;
  color: rgba(255, 255, 255, 0.25);
  margin-top: 6px;
`;

interface FinancialsProps {
  prospects: Prospect[];
}

export function Financials({ prospects }: FinancialsProps) {
  const { t } = useLanguage();

  const won = prospects.filter(p => p.status === 'won');
  const active = prospects.filter(p => !['won', 'lost'].includes(p.status));

  // MRR from won prospects
  const wonMRR = won.reduce((sum, p) => sum + (p.monthlyFee || 0), 0);

  // Total integration fees from won prospects
  const wonIntegration = won.reduce((sum, p) => sum + (p.integrationFee || 0), 0);

  // ARR = MRR * 12 + total integration fees
  const wonARR = (wonMRR * 12) + wonIntegration;

  // Total collected = sum of (months_integrated * monthlyFee + integrationFee) for won prospects
  const totalCollected = won.reduce((sum, p) => {
    if (!p.integrationStartDate) return sum + (p.integrationFee || 0);
    const start = new Date(p.integrationStartDate);
    const now = new Date();
    const diffMs = now.getTime() - start.getTime();
    const months = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 30.44));
    return sum + (months * (p.monthlyFee || 0)) + (p.integrationFee || 0);
  }, 0);

  // Total monthly costs from won prospects
  const totalMonthlyCosts = won.reduce((sum, p) => sum + (p.monthlyCost || 0), 0);

  // Total costs = sum of (months * monthlyCost) for each won prospect
  const totalCosts = won.reduce((sum, p) => {
    if (!p.integrationStartDate) return sum;
    const start = new Date(p.integrationStartDate);
    const now = new Date();
    const diffMs = now.getTime() - start.getTime();
    const months = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 30.44));
    return sum + (months * (p.monthlyCost || 0));
  }, 0);

  // Net profit = total collected - total costs
  const netProfit = totalCollected - totalCosts;

  // Pipeline MRR (from active / non-won / non-lost prospects)
  const pipelineMRR = active.reduce((sum, p) => sum + (p.monthlyFee || 0), 0);

  // Number of delayed payments
  const delayedCount = won.filter(p => p.paymentDelayed).length;

  return (
    <Wrapper>
      <Title>{t('financials')}</Title>
      <Grid>
        <Metric>
          <MetricLabel>{t('mrr')}</MetricLabel>
          <MetricValue $color="#10b981">${wonMRR.toLocaleString()}</MetricValue>
          <MetricSub>{t('fromWon')}</MetricSub>
        </Metric>

        <Metric>
          <MetricLabel>{t('arr')}</MetricLabel>
          <MetricValue $color="#10b981">${wonARR.toLocaleString()}</MetricValue>
          <MetricSub>MRR x 12 + ${wonIntegration.toLocaleString()} {t('integration')}</MetricSub>
        </Metric>

        <Metric>
          <MetricLabel>{t('totalCollected')}</MetricLabel>
          <MetricValue $color="#f59e0b">${totalCollected.toLocaleString()}</MetricValue>
          <MetricSub>{t('fromWon')}</MetricSub>
        </Metric>

        <Metric>
          <MetricLabel>{t('totalCosts')}</MetricLabel>
          <MetricValue $color="#ef4444">${totalCosts.toLocaleString()}</MetricValue>
          <MetricSub>${totalMonthlyCosts.toLocaleString()}/{t('monthly')}</MetricSub>
        </Metric>

        <Metric>
          <MetricLabel>{t('netProfit')}</MetricLabel>
          <MetricValue $color={netProfit >= 0 ? '#10b981' : '#ef4444'}>
            ${netProfit.toLocaleString()}
          </MetricValue>
          <MetricSub>{t('totalCollected')} - {t('totalCosts')}</MetricSub>
        </Metric>

        <Metric>
          <MetricLabel>{t('pipelineMRR')}</MetricLabel>
          <MetricValue $color="#3b82f6">${pipelineMRR.toLocaleString()}</MetricValue>
          <MetricSub>{active.length} {t('prospects')}</MetricSub>
        </Metric>

        {delayedCount > 0 && (
          <Metric>
            <MetricLabel>{t('paymentDelayed')}</MetricLabel>
            <MetricValue $color="#ef4444">{delayedCount}</MetricValue>
            <MetricSub>{t('delayed')}</MetricSub>
          </Metric>
        )}
      </Grid>
    </Wrapper>
  );
}

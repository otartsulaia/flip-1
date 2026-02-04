import React from 'react';
import styled from 'styled-components';
import { Prospect } from '../types';

const Wrapper = styled.div`
  background: rgb(47 51 60);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 24px;
`;

const Title = styled.h2`
  font-size: 16px;
  margin: 0 0 16px 0;
  color: white;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 16px;
`;

const Metric = styled.div`
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 14px;
`;

const MetricLabel = styled.div`
  font-size: 11px;
  color: #9ca3af;
  margin-bottom: 6px;
`;

const MetricValue = styled.div<{ $color?: string }>`
  font-size: 22px;
  font-weight: bold;
  color: ${({ $color }) => $color || 'white'};
`;

const MetricSub = styled.div`
  font-size: 11px;
  color: #6b7280;
  margin-top: 4px;
`;

interface FinancialsProps {
  prospects: Prospect[];
}

export function Financials({ prospects }: FinancialsProps) {
  const won = prospects.filter(p => p.status === 'won');
  const active = prospects.filter(p => !['won', 'lost'].includes(p.status));

  const wonMRR = won.reduce((sum, p) => sum + (p.monthlyFee || 0), 0);
  const wonIntegration = won.reduce((sum, p) => sum + (p.integrationFee || 0), 0);
  const wonARR = wonMRR * 12;

  const pipelineMRR = active.reduce((sum, p) => sum + (p.monthlyFee || 0), 0);
  const pipelineIntegration = active.reduce((sum, p) => sum + (p.integrationFee || 0), 0);
  const pipelineARR = pipelineMRR * 12;

  const totalExpectedMonthly = wonMRR;
  const totalExpectedYearly = wonARR + wonIntegration;

  return (
    <Wrapper>
      <Title>ფინანსები</Title>
      <Grid>
        <Metric>
          <MetricLabel>ყოველთვიური შემოსავალი (MRR)</MetricLabel>
          <MetricValue $color="#10b981">${wonMRR.toLocaleString()}</MetricValue>
          <MetricSub>მოგებული კლიენტებიდან</MetricSub>
        </Metric>
        <Metric>
          <MetricLabel>წლიური შემოსავალი (ARR)</MetricLabel>
          <MetricValue $color="#10b981">${wonARR.toLocaleString()}</MetricValue>
          <MetricSub>+ ${wonIntegration.toLocaleString()} ინტეგრაცია</MetricSub>
        </Metric>
        <Metric>
          <MetricLabel>სულ მოსალოდნელი (წლიური)</MetricLabel>
          <MetricValue $color="#f59e0b">${totalExpectedYearly.toLocaleString()}</MetricValue>
          <MetricSub>${totalExpectedMonthly.toLocaleString()}/თვე</MetricSub>
        </Metric>
        <Metric>
          <MetricLabel>Pipeline MRR</MetricLabel>
          <MetricValue $color="#3b82f6">${pipelineMRR.toLocaleString()}</MetricValue>
          <MetricSub>ARR: ${pipelineARR.toLocaleString()} + ${pipelineIntegration.toLocaleString()} ინტ.</MetricSub>
        </Metric>
      </Grid>
    </Wrapper>
  );
}

import React from 'react';
import styled from 'styled-components';
import { ProspectStatus, STATUS_COLORS } from '../types';
import { useLanguage } from '../hooks/useLanguage';

const Badge = styled.span<{ $color: string }>`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  background: ${({ $color }) => $color}15;
  color: ${({ $color }) => $color};
  border: 1px solid ${({ $color }) => $color}30;
  backdrop-filter: blur(8px);
  white-space: nowrap;
`;

interface StatusBadgeProps {
  status: ProspectStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const { statusLabel } = useLanguage();

  return (
    <Badge $color={STATUS_COLORS[status]}>
      {statusLabel(status)}
    </Badge>
  );
}

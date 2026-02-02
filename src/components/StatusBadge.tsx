import React from 'react';
import styled from 'styled-components';
import { ProspectStatus, STATUS_LABELS, STATUS_COLORS } from '../types';

const Badge = styled.span<{ $color: string }>`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  background: ${({ $color }) => $color}22;
  color: ${({ $color }) => $color};
  border: 1px solid ${({ $color }) => $color}44;
`;

interface StatusBadgeProps {
  status: ProspectStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <Badge $color={STATUS_COLORS[status]}>
      {STATUS_LABELS[status]}
    </Badge>
  );
}

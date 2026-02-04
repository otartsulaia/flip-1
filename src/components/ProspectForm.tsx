import React, { useState } from 'react';
import styled from 'styled-components';
import { Prospect, ProspectStatus, STATUS_LABELS } from '../types';
import { Input, Textarea, Button } from '../styles';

const Form = styled.form`
  display: grid;
  gap: 16px;
`;

const FormGroup = styled.div`
  display: grid;
  gap: 6px;
  text-align: left;
`;

const Label = styled.label`
  font-size: 13px;
  color: #9ca3af;
`;

const Select = styled.select`
  padding: 15px;
  width: 100%;
  border-radius: 10px;
  border: none;
  background: rgb(47 51 60);
  color: white;
  outline: none;
  font-size: 14px;
  cursor: pointer;
  &:focus {
    background: rgb(58 63 75);
  }
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

interface ProspectFormProps {
  onSubmit: (data: Omit<Prospect, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
  initialData?: Prospect;
}

export function ProspectForm({ onSubmit, onCancel, initialData }: ProspectFormProps) {
  const [companyName, setCompanyName] = useState(initialData?.companyName || '');
  const [contactName, setContactName] = useState(initialData?.contactName || '');
  const [email, setEmail] = useState(initialData?.email || '');
  const [phone, setPhone] = useState(initialData?.phone || '');
  const [status, setStatus] = useState<ProspectStatus>(initialData?.status || 'new');
  const [notes, setNotes] = useState(initialData?.notes || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      companyName,
      contactName,
      email,
      phone,
      status,
      notes,
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label>Company Name *</Label>
        <Input
          type="text"
          value={companyName}
          onChange={e => setCompanyName(e.target.value)}
          placeholder="Enter company name"
          required
        />
      </FormGroup>

      <FormGroup>
        <Label>Contact Name</Label>
        <Input
          type="text"
          value={contactName}
          onChange={e => setContactName(e.target.value)}
          placeholder="Enter contact name"
        />
      </FormGroup>

      <FormGroup>
        <Label>Email</Label>
        <Input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Enter email"
        />
      </FormGroup>

      <FormGroup>
        <Label>Phone</Label>
        <Input
          type="tel"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          placeholder="Enter phone number"
        />
      </FormGroup>

      <FormGroup>
        <Label>Status</Label>
        <Select value={status} onChange={e => setStatus(e.target.value as ProspectStatus)}>
          {Object.entries(STATUS_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>
      </FormGroup>

      <FormGroup>
        <Label>Notes</Label>
        <Textarea
          value={notes}
          onChange={e => setNotes(e.target.value)}
          placeholder="Add notes about this prospect..."
          rows={4}
        />
      </FormGroup>

      <ButtonRow>
        <Button type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" $gradient>
          {initialData ? 'Update' : 'Add'} Prospect
        </Button>
      </ButtonRow>
    </Form>
  );
}

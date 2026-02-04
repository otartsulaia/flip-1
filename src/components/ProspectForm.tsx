import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Prospect, ProspectStatus, ProspectType, STATUS_LABELS, TYPE_LABELS, COUNTRIES } from '../types';
import { Input, Textarea, Button, Select } from '../styles';

const Form = styled.form`
  display: grid;
  gap: 14px;
`;

const FormGroup = styled.div`
  display: grid;
  gap: 6px;
  text-align: left;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

const Label = styled.label`
  font-size: 13px;
  color: #9ca3af;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const LogoPreview = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 4px;
`;

const LogoImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: white;
  object-fit: contain;
`;

const LogoHint = styled.span`
  font-size: 11px;
  color: #6b7280;
`;

const FeeInput = styled(Input)`
  height: 44px;
`;

interface ProspectFormProps {
  onSubmit: (data: Omit<Prospect, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
  initialData?: Prospect;
}

function guessLogoDomain(name: string): string {
  const cleaned = name.toLowerCase().replace(/[^a-z0-9]/g, '');
  return cleaned;
}

export function ProspectForm({ onSubmit, onCancel, initialData }: ProspectFormProps) {
  const [companyName, setCompanyName] = useState(initialData?.companyName || '');
  const [contactName, setContactName] = useState(initialData?.contactName || '');
  const [email, setEmail] = useState(initialData?.email || '');
  const [phone, setPhone] = useState(initialData?.phone || '');
  const [status, setStatus] = useState<ProspectStatus>(initialData?.status || 'new');
  const [type, setType] = useState<ProspectType>(initialData?.type || 'business');
  const [country, setCountry] = useState(initialData?.country || 'საქართველო');
  const [monthlyFee, setMonthlyFee] = useState(initialData?.monthlyFee?.toString() || '');
  const [integrationFee, setIntegrationFee] = useState(initialData?.integrationFee?.toString() || '');
  const [logoUrl, setLogoUrl] = useState(initialData?.logoUrl || '');
  const [notes, setNotes] = useState(initialData?.notes || '');
  const [logoSuggestions, setLogoSuggestions] = useState<string[]>([]);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (!companyName.trim()) {
      setLogoSuggestions([]);
      return;
    }
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const base = guessLogoDomain(companyName);
      const domains = [
        `${base}.com`,
        `${base}.ge`,
        `${base}.io`,
        `${base}.org`,
        `${base}.net`,
      ];
      setLogoSuggestions(domains.map(d => `https://logo.clearbit.com/${d}`));
    }, 400);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [companyName]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      companyName,
      contactName,
      email,
      phone,
      status,
      type,
      country,
      monthlyFee: parseFloat(monthlyFee) || 0,
      integrationFee: parseFloat(integrationFee) || 0,
      logoUrl,
      notes,
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label>კომპანიის სახელი *</Label>
        <Input
          type="text"
          value={companyName}
          onChange={e => setCompanyName(e.target.value)}
          placeholder="შეიყვანეთ კომპანიის სახელი"
          required
        />
      </FormGroup>

      {logoSuggestions.length > 0 && (
        <FormGroup>
          <Label>ლოგო (აირჩიეთ)</Label>
          <LogoPreview>
            {logoSuggestions.map(url => (
              <LogoImg
                key={url}
                src={url}
                onClick={() => setLogoUrl(url)}
                onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                style={{
                  cursor: 'pointer',
                  border: logoUrl === url ? '2px solid #10b981' : '2px solid transparent',
                }}
              />
            ))}
          </LogoPreview>
          <LogoHint>ან ჩასვით ლოგოს ბმული:</LogoHint>
          <Input
            type="url"
            value={logoUrl}
            onChange={e => setLogoUrl(e.target.value)}
            placeholder="https://logo.clearbit.com/example.com"
            style={{ height: 40, fontSize: 12 }}
          />
        </FormGroup>
      )}

      <FormGroup>
        <Label>საკონტაქტო პირი</Label>
        <Input
          type="text"
          value={contactName}
          onChange={e => setContactName(e.target.value)}
          placeholder="სახელი და გვარი"
        />
      </FormGroup>

      <FormRow>
        <FormGroup>
          <Label>ელ-ფოსტა</Label>
          <Input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="email@example.com"
          />
        </FormGroup>
        <FormGroup>
          <Label>ტელეფონი</Label>
          <Input
            type="tel"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            placeholder="+995..."
          />
        </FormGroup>
      </FormRow>

      <FormRow>
        <FormGroup>
          <Label>ტიპი</Label>
          <Select value={type} onChange={e => setType(e.target.value as ProspectType)}>
            {Object.entries(TYPE_LABELS).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </Select>
        </FormGroup>
        <FormGroup>
          <Label>ქვეყანა</Label>
          <Select value={country} onChange={e => setCountry(e.target.value)}>
            {COUNTRIES.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </Select>
        </FormGroup>
      </FormRow>

      <FormGroup>
        <Label>სტატუსი</Label>
        <Select value={status} onChange={e => setStatus(e.target.value as ProspectStatus)}>
          {Object.entries(STATUS_LABELS).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </Select>
      </FormGroup>

      <FormRow>
        <FormGroup>
          <Label>ყოველთვიური გადასახადი ($)</Label>
          <FeeInput
            type="number"
            value={monthlyFee}
            onChange={e => setMonthlyFee(e.target.value)}
            placeholder="0"
            min="0"
            step="0.01"
          />
        </FormGroup>
        <FormGroup>
          <Label>ინტეგრაციის საფასური ($)</Label>
          <FeeInput
            type="number"
            value={integrationFee}
            onChange={e => setIntegrationFee(e.target.value)}
            placeholder="0"
            min="0"
            step="0.01"
          />
        </FormGroup>
      </FormRow>

      <FormGroup>
        <Label>შენიშვნები</Label>
        <Textarea
          value={notes}
          onChange={e => setNotes(e.target.value)}
          placeholder="დაამატეთ შენიშვნა ამ პროსპექტის შესახებ..."
          rows={3}
        />
      </FormGroup>

      <ButtonRow>
        <Button type="button" onClick={onCancel}>
          გაუქმება
        </Button>
        <Button type="submit" $gradient>
          {initialData ? 'განახლება' : 'დამატება'}
        </Button>
      </ButtonRow>
    </Form>
  );
}

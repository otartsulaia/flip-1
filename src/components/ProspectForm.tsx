import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Prospect, ProspectStatus, ProspectType, STATUS_LABELS, TYPE_LABELS, COUNTRIES } from '../types';
import { Input, Textarea, Button, Select } from '../styles';
import { useLanguage } from '../hooks/useLanguage';

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
  color: rgba(255, 255, 255, 0.5);
  font-weight: 500;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const LogoPreview = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 4px;
  flex-wrap: wrap;
  max-height: 120px;
  overflow-y: auto;
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
  color: rgba(255, 255, 255, 0.3);
`;

const FeeInput = styled(Input)`
  height: 44px;
`;

const CheckboxRow = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-size: 14px;
  color: #e4e4e7;
  input[type="checkbox"] {
    width: 18px;
    height: 18px;
    accent-color: #007AFF;
    cursor: pointer;
  }
`;

interface ProspectFormProps {
  onSubmit: (data: Omit<Prospect, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
  initialData?: Prospect;
}

function guessLogoDomain(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]/g, '');
}

export function ProspectForm({ onSubmit, onCancel, initialData }: ProspectFormProps) {
  const { lang, t, statusLabel, typeLabel, countryName } = useLanguage();

  const [companyName, setCompanyName] = useState(initialData?.companyName || '');
  const [contactName, setContactName] = useState(initialData?.contactName || '');
  const [email, setEmail] = useState(initialData?.email || '');
  const [phone, setPhone] = useState(initialData?.phone || '');
  const [status, setStatus] = useState<ProspectStatus>(initialData?.status || 'new');
  const [type, setType] = useState<ProspectType>(initialData?.type || 'business');
  const [country, setCountry] = useState(initialData?.country || 'GE');
  const [monthlyFee, setMonthlyFee] = useState(initialData?.monthlyFee?.toString() || '');
  const [integrationFee, setIntegrationFee] = useState(initialData?.integrationFee?.toString() || '');
  const [monthlyCost, setMonthlyCost] = useState(initialData?.monthlyCost?.toString() || '');
  const [logoUrl, setLogoUrl] = useState(initialData?.logoUrl || '');
  const [notes, setNotes] = useState(initialData?.notes || '');
  const [integrationStartDate, setIntegrationStartDate] = useState(initialData?.integrationStartDate || '');
  const [paymentDayOfMonth, setPaymentDayOfMonth] = useState(initialData?.paymentDayOfMonth?.toString() || '1');
  const [paymentDelayed, setPaymentDelayed] = useState(initialData?.paymentDelayed || false);
  const [paymentDelayNotes, setPaymentDelayNotes] = useState(initialData?.paymentDelayNotes || '');
  const [loadedLogos, setLoadedLogos] = useState<string[]>([]);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (!companyName.trim()) {
      setLoadedLogos([]);
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
      // Use multiple logo APIs for reliability
      const urls = [
        ...domains.map(d => `https://logo.clearbit.com/${d}`),
        ...domains.map(d => `https://icon.horse/icon/${d}`),
        ...domains.map(d => `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${d}&size=128`),
      ];
      // Preload each image and only keep ones that load with real content
      setLoadedLogos([]);
      urls.forEach(url => {
        const img = new Image();
        img.onload = () => {
          // Filter out tiny default/placeholder icons (< 32px)
          if (img.naturalWidth >= 32 && img.naturalHeight >= 32) {
            setLoadedLogos(prev => prev.includes(url) ? prev : [...prev, url]);
          }
        };
        img.src = url;
      });
    }, 400);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
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
      monthlyCost: parseFloat(monthlyCost) || 0,
      logoUrl,
      notes,
      integrationStartDate,
      paymentDayOfMonth: parseInt(paymentDayOfMonth) || 1,
      paymentDelayed,
      paymentDelayNotes,
      costHistory: initialData?.costHistory || [],
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label>{t('companyName')} *</Label>
        <Input
          type="text"
          value={companyName}
          onChange={e => setCompanyName(e.target.value)}
          placeholder={t('companyName')}
          required
        />
      </FormGroup>

      <FormGroup>
        <Label>{t('logo')}</Label>
        {loadedLogos.length > 0 && (
          <>
            <LogoPreview>
              {loadedLogos.map(url => (
                <LogoImg
                  key={url}
                  src={url}
                  onClick={() => setLogoUrl(url)}
                  style={{
                    cursor: 'pointer',
                    border: logoUrl === url ? '2px solid #007AFF' : '2px solid transparent',
                  }}
                />
              ))}
            </LogoPreview>
            <LogoHint>{t('logoHint')}</LogoHint>
          </>
        )}
        {logoUrl && (
          <LogoPreview>
            <LogoImg src={logoUrl} onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          </LogoPreview>
        )}
        <Input
          type="url"
          value={logoUrl}
          onChange={e => setLogoUrl(e.target.value)}
          placeholder="https://logo.clearbit.com/example.com"
          style={{ height: 40, fontSize: 12 }}
        />
      </FormGroup>

      <FormGroup>
        <Label>{t('contactPerson')}</Label>
        <Input
          type="text"
          value={contactName}
          onChange={e => setContactName(e.target.value)}
          placeholder={t('contactPerson')}
        />
      </FormGroup>

      <FormRow>
        <FormGroup>
          <Label>{t('email')}</Label>
          <Input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="email@example.com"
          />
        </FormGroup>
        <FormGroup>
          <Label>{t('phone')}</Label>
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
          <Label>{t('type')}</Label>
          <Select value={type} onChange={e => setType(e.target.value as ProspectType)}>
            {Object.keys(TYPE_LABELS).map(value => (
              <option key={value} value={value}>
                {typeLabel(value)}
              </option>
            ))}
          </Select>
        </FormGroup>
        <FormGroup>
          <Label>{t('country')}</Label>
          <Select value={country} onChange={e => setCountry(e.target.value)}>
            {COUNTRIES.map(c => (
              <option key={c.code} value={c.code}>
                {c.flag} {countryName(c)}
              </option>
            ))}
          </Select>
        </FormGroup>
      </FormRow>

      <FormGroup>
        <Label>{t('status')}</Label>
        <Select value={status} onChange={e => setStatus(e.target.value as ProspectStatus)}>
          {Object.keys(STATUS_LABELS).map(value => (
            <option key={value} value={value}>
              {statusLabel(value)}
            </option>
          ))}
        </Select>
      </FormGroup>

      <FormRow>
        <FormGroup>
          <Label>{t('monthlyFee')}</Label>
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
          <Label>{t('integrationFee')}</Label>
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
        <Label>{t('monthlyCost')}</Label>
        <FeeInput
          type="number"
          value={monthlyCost}
          onChange={e => setMonthlyCost(e.target.value)}
          placeholder="0"
          min="0"
          step="0.01"
        />
      </FormGroup>

      <FormRow>
        <FormGroup>
          <Label>{t('integrationDate')}</Label>
          <Input
            type="date"
            value={integrationStartDate}
            onChange={e => setIntegrationStartDate(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>{t('paymentDay')}</Label>
          <FeeInput
            type="number"
            value={paymentDayOfMonth}
            onChange={e => setPaymentDayOfMonth(e.target.value)}
            placeholder="1"
            min="1"
            max="31"
          />
        </FormGroup>
      </FormRow>

      <FormGroup>
        <CheckboxRow>
          <input
            type="checkbox"
            checked={paymentDelayed}
            onChange={e => setPaymentDelayed(e.target.checked)}
          />
          {t('paymentDelayed')}
        </CheckboxRow>
      </FormGroup>

      {paymentDelayed && (
        <FormGroup>
          <Label>{t('delayNotes')}</Label>
          <Textarea
            value={paymentDelayNotes}
            onChange={e => setPaymentDelayNotes(e.target.value)}
            placeholder={t('delayNotes')}
            rows={2}
          />
        </FormGroup>
      )}

      <FormGroup>
        <Label>{t('notes')}</Label>
        <Textarea
          value={notes}
          onChange={e => setNotes(e.target.value)}
          placeholder={t('notes')}
          rows={3}
        />
      </FormGroup>

      <ButtonRow>
        <Button type="button" onClick={onCancel}>
          {t('cancel')}
        </Button>
        <Button type="submit" $gradient>
          {initialData ? t('update') : t('add')}
        </Button>
      </ButtonRow>
    </Form>
  );
}

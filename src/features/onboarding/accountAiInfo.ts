import { AIConfig, AIItemTransformer } from '@features/speech/AIParserManager';

export interface OnboardingAccount {
  id?: string;
  name?: string;
  bankName?: string;
  initialBalance?: number;
  includeInTotal?: boolean;
}

export const AccountAiConfig: AIConfig = {
  listDescription: 'user bank accounts to create during onboarding',
  additionalFields: [
    { name: 'name', description: 'account name or nickname', type: 'string' },
    { name: 'bankName', description: 'bank or institution name', type: 'string' },
    { name: 'initialBalance', description: 'initial balance of the account', type: 'number' },
    { name: 'includeInTotal', description: 'true if account should appear in totals', type: 'boolean' },
  ],
};

export const accountNormalizer: AIItemTransformer<OnboardingAccount> = (item) => {
  if (item.initialBalance !== undefined) {
    item.initialBalance = Number(item.initialBalance);
  }
  if (item.includeInTotal !== undefined) {
    item.includeInTotal = String(item.includeInTotal) === 'true';
  }
  return item;
};


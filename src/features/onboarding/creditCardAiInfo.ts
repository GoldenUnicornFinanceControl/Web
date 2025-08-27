import { AIConfig, AIItemTransformer } from '@features/speech/AIParserManager';

export interface OnboardingCreditCard {
  id?: string;
  name?: string;
  bankId?: string;
  bankName?: string;
  limit?: number;
}

export const CreditCardAiConfig: AIConfig = {
  listDescription: 'user credit cards to create during onboarding',
  additionalFields: [
    { name: 'name', description: 'credit card name or nickname', type: 'string' },
    { name: 'bankName', description: 'bank or issuer name', type: 'string' },
    { name: 'bankId', description: 'id of the bank, use tool search_bank', type: 'string' },
    { name: 'limit', description: 'credit limit of the card', type: 'number' },
  ],
};

export const creditCardNormalizer: AIItemTransformer<OnboardingCreditCard> = (item) => {
  if (item.limit !== undefined) {
    item.limit = Number(item.limit);
  }
  return item;
};


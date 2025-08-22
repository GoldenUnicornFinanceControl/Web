import { AIConfig } from '@features/speech/AIParserManager';

export type TimelineFilterSpeech = {
  accountId?: string;
  from?: string;
  to?: string;
  categories?: string[];
};

export const AITimelineFiltersConfig: AIConfig<'update' | 'remove'> = {
  listDescription: 'single timeline filter with account, date range and categories information',
  additionalFields: [
    { name: 'accountId', description: 'id of the account to filter by', type: 'string' },
    { name: 'from', description: 'start date in ISO 8601 format', type: 'string' },
    { name: 'to', description: 'end date in ISO 8601 format', type: 'string' },
    { name: 'categories', description: 'array of category ids to include', type: 'string[]' },
  ],
  availableActions: {
    update: 'set or change filter values',
    remove: 'clear all filters to defaults',
  },
};

import banks from '../../GetBankingInstitutionFiltered.json';
import { AITool } from '@features/speech/AIParserManager';

interface NamedItem { id: string; name: string }

function normalize(str: string): string {
  return str
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase();
}

function scoreName(name: string, query: string): number {
  const nName = normalize(name);
  const nQuery = normalize(query);
  if (nName === nQuery) return 100;
  const words = nQuery.split(/\s+/);
  let score = 0;
  for (const [i, w] of words.entries()) {
    if (!w) continue;
    const idx = nName.indexOf(w);
    if (idx === 0 && i === 0) score += 20; // starts with
    if (idx !== -1) score += 10; // contains word
  }
  return score;
}

function search(items: NamedItem[], query: string, limit = 10) {
  return items
    .map((i) => ({ ...i, score: scoreName(i.name, query) }))
    .filter((i) => i.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ score, ...rest }) => rest);
}

export const searchBankTool: AITool = {
  name: 'search_bank',
  description: 'Return possible bank ids given a name',
  parameters: {
    type: 'object',
    properties: { name: { type: 'string', description: 'partial bank name' } },
    required: ['name'],
  },
  handler: ({ name }: { name: string }) => {
    const items = (banks as any[]).map((b, i) => ({
      id: b.razao || String(i),
      name: b.nome,
    }));
    return search(items, name);
  },
};

// Placeholder categories; in real app this should query categories repository
const defaultCategories: NamedItem[] = [
  { id: 'food', name: 'Alimentação' },
  { id: 'rent', name: 'Aluguel' },
  { id: 'salary', name: 'Salário' },
  { id: 'shopping', name: 'Compras' },
];

export const searchCategoryTool: AITool = {
  name: 'search_category',
  description: 'Return possible category ids given a name',
  parameters: {
    type: 'object',
    properties: { name: { type: 'string', description: 'partial category name' } },
    required: ['name'],
  },
  handler: ({ name }: { name: string }) => search(defaultCategories, name),
};

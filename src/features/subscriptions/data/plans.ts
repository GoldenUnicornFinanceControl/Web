export interface Plan {
  slug: string;
  title: string;
  price: string;
  description: string;
  bullets: string[];
  cta: string;
  badge?: string;
  highlighted?: boolean;
}

export const AI_TOKENS_DISTRIBUTION = { input: 0.6, output: 0.4 } as const;

export const plans: Plan[] = [
  {
    slug: 'free',
    title: 'Free',
    price: 'R$0/mês',
    description: 'Grátis para sempre. Sync ativo, IA só no setup inicial.',
    bullets: [
      '5.000 registros totais',
      'IA no onboarding (1x) ou sua própria chave OpenAI',
      'Sync ativo + devices ilimitados (limite de novos devices por mês)',
    ],
    cta: 'Começar agora',
  },
  {
    slug: 'basic',
    title: 'Basic',
    price: 'R$7,90/mês (≈ $1.50)',
    description: 'Para começar com IA no dia a dia.',
    bullets: [
      '50.000 registros',
      '1M tokens de IA/mês (gerenciados pelo app)',
      'Devices ilimitados + novos devices sem limite prático (monitorado)',
      'Pode usar sua própria chave OpenAI se preferir',
    ],
    badge: 'Entrada',
    cta: 'Assinar Basic',
  },
  {
    slug: 'plus',
    title: 'Plus',
    price: 'R$14,90/mês (≈ $3.00)',
    description: 'Melhor custo‑benefício: assistente fluido.',
    bullets: [
      '200.000 registros',
      '5M tokens de IA/mês',
      'Devices ilimitados + novos devices sem limite prático',
      'Pode usar sua própria chave OpenAI',
    ],
    badge: 'Mais Popular',
    highlighted: true,
    cta: 'Assinar Plus',
  },
  {
    slug: 'pro',
    title: 'Pro',
    price: 'R$29,90/mês (≈ $6.00)',
    description: 'Para uso intenso e automações.',
    bullets: [
      '1.000.000 de registros',
      '10M tokens de IA/mês',
      'Devices ilimitados + novos devices sem limite prático',
      'Pode usar sua própria chave OpenAI',
    ],
    badge: 'Máximo',
    cta: 'Assinar Pro',
  },
];

export interface FeatureRow {
  feature: string;
  values: { [slug: string]: string };
}

export const featureTable: FeatureRow[] = [
  {
    feature: 'Sync na nuvem',
    values: { free: '✓', basic: '✓', plus: '✓', pro: '✓' },
  },
  {
    feature: 'Devices conectados ilimitados',
    values: { free: '✓', basic: '✓', plus: '✓', pro: '✓' },
  },
  {
    feature: 'Novos devices (full first sync)',
    values: {
      free: '5 vitalício',
      basic: 'Sem limite prático (monitorado)',
      plus: 'Sem limite prático',
      pro: 'Sem limite prático',
    },
  },
  {
    feature: 'Limite de registros',
    values: { free: '5.000', basic: '50.000', plus: '200.000', pro: '1.000.000' },
  },
  {
    feature: 'IA incluída (tokens/mês)',
    values: {
      free: 'Somente no onboarding (1x)',
      basic: '1M',
      plus: '5M',
      pro: '10M',
    },
  },
  {
    feature: 'Onboarding com IA (voz/texto)',
    values: { free: '✓ (1x)', basic: '✓', plus: '✓', pro: '✓' },
  },
  {
    feature: 'Usar a própria chave OpenAI (opcional)',
    values: { free: '✓', basic: '✓', plus: '✓', pro: '✓' },
  },
  {
    feature: 'Exportar/Importar dados',
    values: { free: '✓', basic: '✓', plus: '✓', pro: '✓' },
  },
];


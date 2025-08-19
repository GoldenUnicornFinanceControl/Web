import { Link } from 'react-router-dom';
import PlanCard from '../components/PlanCard';
import FeatureTable from '../components/FeatureTable';
import { plans } from '../data/plans';

const Plans: React.FC = () => {
  const t = Lang.subscriptions?.plans;
  return (
    <div style={{ padding: 16 }}>
      <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
        {plans.map((p) => (
          <PlanCard key={p.slug} plan={p} />
        ))}
      </div>
      <FeatureTable />
      <p style={{ marginTop: 24, textAlign: 'center' }}>
        {t?.disclaimer ||
          'Cobramos valores acessíveis para cobrir Firebase (leituras/escritas/armazenamento) e IA (tokens por uso). Assinantes pagos subsidiam o plano Free. Você pode usar sua própria chave OpenAI em qualquer plano.'}
      </p>
      <p style={{ marginTop: 16, textAlign: 'center' }}>
        <Link to="/subscriptions/why">{t?.links.why || 'Por que cobramos?'}</Link>
        {' | '}
        <Link to="/subscriptions/why/cots">{t?.links.costs || 'Custos detalhados'}</Link>
      </p>
    </div>
  );
};

export default Plans;

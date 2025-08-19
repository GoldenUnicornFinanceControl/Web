import { useNavigate } from 'react-router-dom';
import Badge from '@components/common/Badge';
import Button from '@components/common/Button';
import { Plan } from '../data/plans';
import './PlanCard.css';

interface PlanCardProps {
  plan: Plan;
}

const PlanCard: React.FC<PlanCardProps> = ({ plan }) => {
  const navigate = useNavigate();
  return (
    <div className={`PlanCard ${plan.highlighted ? 'highlighted' : ''}`}>
      {plan.badge && <Badge>{plan.badge}</Badge>}
      <h3>{plan.title}</h3>
      <div className="price">{plan.price}</div>
      <p>{plan.description}</p>
      <ul>
        {plan.bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
      <Button onClick={() => navigate(`/subscriptions/checkout/${plan.slug}`)}>
        {plan.cta}
      </Button>
    </div>
  );
};

export default PlanCard;

import './FeatureTable.css';
import { plans, featureTable } from '../data/plans';

const FeatureTable: React.FC = () => (
  <table className="FeatureTable">
    <thead>
      <tr>
        <th>Recurso</th>
        {plans.map((p) => (
          <th key={p.slug}>{p.title}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {featureTable.map((row) => (
        <tr key={row.feature}>
          <td>{row.feature}</td>
          {plans.map((p) => (
            <td key={p.slug}>{row.values[p.slug]}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

export default FeatureTable;

import { Navigate, Route, Routes } from 'react-router-dom';
import { OnboardingProvider } from './OnboardingContext';
import AccountsStep from './AccountsStep';
import CreditCardsStep from './CreditCardsStep';

export const onboardingSteps = [
  { path: 'accounts', element: <AccountsStep /> },
  { path: 'credit-cards', element: <CreditCardsStep /> },
];

const OnboardingRouter = () => (
  <OnboardingProvider>
    <Routes>
      {onboardingSteps.map((step) => (
        <Route key={step.path} path={step.path} element={step.element} />
      ))}
      <Route path="" element={<Navigate to={onboardingSteps[0].path} replace />} />
    </Routes>
  </OnboardingProvider>
);

export default OnboardingRouter;


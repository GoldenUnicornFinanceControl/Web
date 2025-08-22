import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, ContainerFixedContent, ContainerScrollContent } from '@components/conteiners';
import Button from '@components/Button';
import AIMicrophone from '@components/voice/AIMicrophone';
import AIActionsParser, { AIActionHandler } from '@features/speech/AIParserManager';
import { accountNormalizer, AccountAiConfig, OnboardingAccount } from './accountAiInfo';
import { useOnboarding } from './OnboardingContext';

const AccountsStep = () => {
  const navigate = useNavigate();
  const { data, update } = useOnboarding();
  const parser = useMemo(
    () => new AIActionsParser<OnboardingAccount>(AccountAiConfig, accountNormalizer),
    []
  );

  useEffect(() => {
    parser.items = data.accounts;
  }, [data.accounts, parser]);

  const handleAction: AIActionHandler<OnboardingAccount> = useCallback(() => {
    update({ accounts: [...parser.items] });
  }, [parser, update]);

  return (
    <Container screen spaced>
      <ContainerFixedContent>
        <h2>Bank accounts</h2>
      </ContainerFixedContent>
      <ContainerScrollContent spaced autoScroll>
        <ul>
          {parser.items.map((acc) => (
            <li key={acc.id || acc.name}>
              {acc.name}
              {acc.bankName ? ` - ${acc.bankName}` : ''}
              {acc.initialBalance != null ? ` - ${acc.initialBalance}` : ''}
            </li>
          ))}
        </ul>
        <AIMicrophone parser={parser} onAction={handleAction} />
        <div style={{ marginTop: 24 }}>
          <Button text="Next" onClick={() => navigate('../credit-cards')} />
        </div>
      </ContainerScrollContent>
    </Container>
  );
};

export default AccountsStep;


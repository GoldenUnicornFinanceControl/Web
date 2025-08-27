import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, ContainerFixedContent, ContainerScrollContent } from '@components/conteiners';
import Button from '@components/Button';
import AIMicrophone from '@components/voice/AIMicrophone';
import AIActionsParser, { AIActionHandler } from '@features/speech/AIParserManager';
import { accountNormalizer, AccountAiConfig, OnboardingAccount } from './accountAiInfo';
import { useOnboarding } from './OnboardingContext';
import Icon from '@components/Icons';
import { searchBankTool } from './searchTools';

const AccountsStep = () => {
  const navigate = useNavigate();
  const { data, update } = useOnboarding();
  const parser = useMemo(
    () =>
      new AIActionsParser<OnboardingAccount>(
        AccountAiConfig,
        accountNormalizer,
        undefined,
        [searchBankTool]
      ),
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
        <h2>
          <Icon icon={Icon.all.faUniversity} /> Bank accounts
        </h2>
        <p>Tell us which bank accounts you use and their starting balances.</p>
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


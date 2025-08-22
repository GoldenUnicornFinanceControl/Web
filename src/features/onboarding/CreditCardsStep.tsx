import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, ContainerFixedContent, ContainerScrollContent } from '@components/conteiners';
import Button from '@components/Button';
import AIMicrophone from '@components/voice/AIMicrophone';
import AIActionsParser, { AIActionHandler } from '@features/speech/AIParserManager';
import { CreditCardAiConfig, creditCardNormalizer, OnboardingCreditCard } from './creditCardAiInfo';
import { useOnboarding } from './OnboardingContext';

const CreditCardsStep = () => {
  const navigate = useNavigate();
  const { data, update } = useOnboarding();
  const parser = useMemo(
    () => new AIActionsParser<OnboardingCreditCard>(CreditCardAiConfig, creditCardNormalizer),
    []
  );

  useEffect(() => {
    parser.items = data.creditCards;
  }, [data.creditCards, parser]);

  const handleAction: AIActionHandler<OnboardingCreditCard> = useCallback(() => {
    update({ creditCards: [...parser.items] });
  }, [parser, update]);

  return (
    <Container screen spaced>
      <ContainerFixedContent>
        <h2>Credit cards</h2>
      </ContainerFixedContent>
      <ContainerScrollContent spaced autoScroll>
        <ul>
          {parser.items.map((card) => (
            <li key={card.id || card.name}>
              {card.name}
              {card.bankName ? ` - ${card.bankName}` : ''}
              {card.limit != null ? ` - ${card.limit}` : ''}
            </li>
          ))}
        </ul>
        <AIMicrophone parser={parser} onAction={handleAction} />
        <div style={{ marginTop: 24 }}>
          <Button text="Finish" onClick={() => navigate('/main/dashboard')} />
        </div>
      </ContainerScrollContent>
    </Container>
  );
};

export default CreditCardsStep;


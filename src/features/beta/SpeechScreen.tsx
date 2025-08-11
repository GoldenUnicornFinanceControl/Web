
// const Dictaphone = () => {
//   return (
//     <div>
//       <p>Microphone: {listening ? 'on' : 'off'}</p>
//       <button onClick={startListening}>Start</button>
//       <button onClick={SpeechRecognition.stopListening}>Stop</button>
//       <button onClick={resetTranscript}>Reset</button>
//       <p>{transcript}</p>
//     </div>
//   );
// };
// export default Dictaphone;

import './SpeechScreen.css';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getCurrentLangInfo } from '@lang';
import { GroceryItemModel } from '@models';

import Icon from '@components/Icons';
import { Container, ContainerFixedContent, ContainerScrollContent } from '@components/conteiners';

import GroceryList from '../../features/groceries/GroceryList';
import AIActionsParser, { AITokens } from './AIParserManager';
import { AIGroceryListConfig } from './GroceryListAiInfo';

/*
Input:
$0.050 / 1M tokens
Cached input:
$0.005 / 1M tokens
Output:
$0.400 / 1M tokens 
*/
const DOLAR_PRICE = 5.5;
const tokenPrice = {
  dolarPerInput: 0.050 / 1000000,
  dolarPerOutput: 0.400 / 1000000
};

const aiParser = new AIActionsParser<GroceryItemModel>(
  AIGroceryListConfig,
  (item) => {
    if (item.opened !== undefined) item.opened.toString() === "true"
    if (item.expirationDate !== undefined) item.expirationDate = new Date(item.expirationDate);

    return item;
  }
);

const SpeechScreen = () => {
  const navigate = useNavigate();
  const currentLangInfo = getCurrentLangInfo();
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const sendTimeOut = useRef<NodeJS.Timeout | null>(null);
  const [groceryItems, setGroceryItems] = useState<GroceryItemModel[]>([]);
  const [loading, setLoading] = useState(false);  
  const [usedTokens, setUsedTokens] = useState<AITokens>({input: 0, output: 0});

  useEffect(() => {
    if (sendTimeOut.current) clearTimeout(sendTimeOut.current);
    if (!transcript) return;

    sendTimeOut.current = setTimeout(async () => {
      setLoading(true);
      const result = await aiParser.parse(transcript);
      setUsedTokens({
        input: usedTokens.input + result.usedTokens.input,
        output: usedTokens.output + result.usedTokens.output
      });
      resetTranscript();
      setLoading(false);
    }, 1500);

  }, [transcript]);

  useEffect(() => {
    setGroceryItems(aiParser.items as GroceryItemModel[]);
    aiParser.onAction = (action) => {
      setGroceryItems([...aiParser.items] as GroceryItemModel[]);
    }

    return () => {
      SpeechRecognition.stopListening();
    };
  }, []);

  if (!browserSupportsSpeechRecognition) {
    return <span>{Lang.speech.browserNotSupported}</span>;
  }

  const startListening = () => SpeechRecognition.startListening({
    continuous: true,
    language: currentLangInfo.short
  });

  return (
    <Container screen spaced className="SpeechScreen">
      <ContainerFixedContent>
        <h2 style={{ marginBottom: 24 }}>{Lang.speech.title}</h2>
        <h3>{Lang.speech.howToUseTitle}</h3>
        <p>{Lang.speech.intro1}</p>
        <p>{Lang.speech.intro2}</p>
        <p>{Lang.speech.examplesTitle}</p>
        <ul>
          {Lang.speech.examples.map((ex, i) => <li key={i}>{ex}</li>)}
        </ul>
      </ContainerFixedContent>
      <ContainerScrollContent spaced>
        <GroceryList items={groceryItems as any} />
        <div style={{ height: 120 }}></div>
        <div className="speech-marquee glass-container speech-marquee--with-controls">
          <div className="glass-filter"></div>
          <div className="glass-overlay"></div>
          <div className="glass-specular"></div>
          <div className="glass-content glass-content--inline">
            <button
              className={`microphone-toggle${listening ? ' listening' : ''}`}
              onClick={listening ? SpeechRecognition.stopListening : startListening}
              aria-label={listening ? Lang.speech.micStop : Lang.speech.micStart}
              disabled={loading}
            >
              {loading ? ( 
                <span className="loading-spinner" />
              ) : (
                <Icon icon={listening ? Icon.all.faMicrophoneSlash : Icon.all.faMicrophone} />
              )}
            </button>
            {/* <div className="container"> */}
            <div className="speech-marquee-content">
              <span className="speech-marquee-text">
                {
                // {loading ? 'Processando itens...' : (
                  transcript || ( 
                    listening ? (groceryItems.length > 0 ? Lang.speech.placeholderListeningHasItems : Lang.speech.placeholderListeningNoItems) : 
                    Lang.speech.placeholderNotListening
                   )
                }
              </span>
              <div className="speech-marquee-lang" title={Lang.speech.changeLangTooltip} onClick={() => navigate('/main/settings')}>
                <span className="speech-marquee-lang-short">{currentLangInfo.short}</span>
                <span className="">
                  {Lang.speech.tokensUsed(usedTokens.input + usedTokens.output)}
                  R$ {(DOLAR_PRICE * (
                    (usedTokens.input * tokenPrice.dolarPerInput) + 
                    (usedTokens.output * tokenPrice.dolarPerOutput)
                  )).toFixed(4).replace('.', ',')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </ContainerScrollContent>
    </Container>
  );
};

export default SpeechScreen;

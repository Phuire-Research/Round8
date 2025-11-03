import { ActionStrategy, createActionNode, createStrategy, Deck, MuxiumDeck } from 'stratimux';
import { MUXDeck } from '../muX.concept';

export const muXSomeStrategyTopic = 'muX Some Error Correcting Strategy';
export const muXSomeStrategy = (d: Deck<MuxiumDeck & MUXDeck>): ActionStrategy => {
  const stepSuccess = createActionNode(d.muxium.e.muxiumLog());
  const stepFailure = createActionNode(d.muxium.e.muxiumKick(), {
    successNode: stepSuccess,
  });
  const stepBegin = createActionNode(d.muX.e.muXqOfMux({
    message: 'Muxification Hello World'
  }), {
    successNode: stepSuccess,
    failureNode: stepFailure
  });
  return createStrategy({
    topic: muXSomeStrategyTopic,
    initialNode: stepBegin
  });
};
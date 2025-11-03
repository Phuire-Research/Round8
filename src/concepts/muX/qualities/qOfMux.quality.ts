import {
  createMethodWithState,
  strategySuccess,
  strategyFailed,
  createQualityCardWithPayload,
  strategyData_muxifyData,
  Quality
} from 'stratimux';
import { MUXDeck, MUXState, } from '../muX.concept';

type muXOfMuxPayload = {
  message: string
}

// NEW v0.3.2: Explicit quality type export required
export type MuXqOfMux = Quality<MUXState, muXOfMuxPayload>;
export type uXqOfUxField = {
  state: MUXState
};

function getRandomRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export const muXqOfMux = createQualityCardWithPayload<MUXState, muXOfMuxPayload, MUXDeck>({
  type: 'muX allows for easy selection of your qualities, muXqOfMux is your quality, and Type is the distinction',
  reducer: (_, action) => {
    const {message} = action.payload;
    return {
      message
    };
  },
  methodCreator: () => createMethodWithState(({action, state}) => {
    if (action.strategy) {
      // P/NP?
      const even = Math.round(getRandomRange(1, 5)) % 2;
      if (even) {
        const strategy = strategySuccess(action.strategy, strategyData_muxifyData(action.strategy, {
          state
        }));
        return strategy;
      } else {
        const strategy = strategyFailed(action.strategy);
        return strategy;
      }
    }
    return action;
  })
});
/* Below are the default functions available for your quality */
// export const qOfUXQuality = createQuality(
//   qOfUXType,
//   defaultReducer,
// The method is optional and is an advanced behavior
//   defaultMethodCreator
// );
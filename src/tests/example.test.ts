import {
  countingStrategy,
  countingTopic,
  createCounterConcept,
  strategyBegin,
  muxification,
  MuxiumDeck,
  CounterDeck,
  getMuxiumState
} from 'stratimux';

test('Muxium Counting Strategy Test', (done) => {
  const muxium = muxification('muxiumStrategyTest', {counter: createCounterConcept()}, { logging: true, storeDialog: true });
  muxium.plan<MuxiumDeck & CounterDeck>('Counting Strategy Stage', ({stageO, stage, d__}) =>
    [
      stageO(() => d__.muxium.e.muxiumKick()),
      stage(({dispatch, d, stagePlanner}) => {
        const strategy = countingStrategy(d);
        if (strategy) {
          dispatch(strategyBegin(strategy), {
            iterateStage: true
          });
        } else {
          expect(false).toBe(true);
          stagePlanner.conclude();
        }
      }),
      stage(({concepts, d, stagePlanner}) => {
        const muxiumState = getMuxiumState(concepts);
        if (muxiumState.lastStrategy === countingTopic) {
          const counter = d.counter.k.getState(concepts);
          expect(counter?.count).toBe(1);
          setTimeout(() => {done();}, 500);
          stagePlanner.conclude();
          muxium.close();
        }
      })
    ]);
});
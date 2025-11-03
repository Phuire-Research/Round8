import {
  getMuxiumState,
  strategyBegin
} from 'stratimux';
import { muXName, MUXPrinciple } from './muX.concept';
import { muXSomeStrategy, muXSomeStrategyTopic } from './strategies/muXSome.strategy';

export const muXPrinciple: MUXPrinciple = ({
  plan
}) => {
  // There always needs to be atleast one subscriber or plan for the Muxium to be active.
  // NEW v0.3.2: Using staging helper for better composition
  const muxPlan = plan('muX Plan', ({staging, stageO, stage, d__}) =>
    staging(() => [
      // This will register this plan to the muxium, this allows for the muxium to close or remove your concept cleanly.
      stageO(() => (d__.muxium.e.muxiumRegisterStagePlanner({conceptName: muXName, stagePlanner: muxPlan}))),
      stage(({concepts, dispatch, k, d}) => {
        const state = k.getState(concepts);
        console.log(k.message.select());
        if (state) {
          dispatch(strategyBegin(muXSomeStrategy(d)), {
            iterateStage: true
          });
        }
      }, {beat: 30}),
      stage(({concepts, stagePlanner}) => {
        const {lastStrategy} = getMuxiumState(concepts);
        if (lastStrategy === muXSomeStrategyTopic) {
          stagePlanner.conclude();
        }
      })
    ])
  );
};
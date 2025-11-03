import { Concept, createConcept, MuxiumDeck, PrincipleFunction } from 'stratimux';
import { muXqOfMux, MuXqOfMux } from './qualities/qOfMux.quality';
import { muXPrinciple } from './muX.principle';

export type MUXState = {
  message: string
}

export const muXName = 'muX';

export const createMUXState = (): MUXState => {
  return {
    message: 'Hello World!'
  };
};

const qualities = {
  muXqOfMux
};

// NEW v0.3.2: Explicit quality type mapping required
export type MUXQualities = {
  muXqOfMux: MuXqOfMux,
};

export type MUXDeck = {
  muX: Concept<MUXState, MUXQualities>;
};

export type MUXPrinciple = PrincipleFunction<MUXQualities, MuxiumDeck & MUXDeck, MUXState>;

export const createMuXConcept = () => {
  return createConcept(
    muXName,
    createMUXState(),
    {
      muXqOfMux
    },
    [
      muXPrinciple,
    ],
  );
};
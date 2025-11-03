import { muxification } from 'stratimux';
import { createMuXConcept } from './concepts/muX/muX.concept';

(() => {
  const muxiumName = 'Your Muxium';
  // Sets logging to true and store dialog to true
  //  This will log to the console the dialog of each successive ActionStrategy
  //  And store the entire application context in the muxium's dialog.
  muxification(muxiumName, {muX: createMuXConcept()}, {logging: true, storeDialog: true});
})();

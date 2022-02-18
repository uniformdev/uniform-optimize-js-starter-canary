import { IntentTagStrength, IntentVector } from '@uniformdev/optimize-common';
import { localTracker } from './localTracker';
import { getPersonalizedContent } from './getPersonalizedContent';

/** Initializes the tracker and binds all event handlers */
async function initTracker() {
  // update the UI when intent scoring changes
  localTracker.addScoringChangeListener(onScoringChanged);

  // load intent data and initialize tracker
  await localTracker.initialize();

  // evaluate ambient signals (i.e. query strings, cookies, etc)
  // and update scoring if needed
  await localTracker.reevaluateSignals();

  // bind UI event handlers
  initBehaviorButtons();
  initEventButton();
  initForgetButton();
}

// start everything off
initTracker();

/** Called when the intent scoring data is changed for the current visitor */
function onScoringChanged(intentScores: IntentVector | null) {
  // update scoring display
  document.getElementById('scoring')!.innerHTML = JSON.stringify(
    intentScores,
    null,
    2,
  );

  // update personalized content
  document.getElementById('personalized')!.innerText = intentScores
    ? getPersonalizedContent(intentScores)
    : '';
}

/** Binds event handlers to track behaviors */
function initBehaviorButtons() {
  document.getElementById('behave-dev')?.addEventListener('click', async () => {
    localTracker.addBehaviorActivity({
      dev: { str: IntentTagStrength.Normal },
    });

    // behavior activity is not immediately updated when added, it is queued
    // (so you can track more than one behavior event at once)
    // so we re-evaluate signals when we are done
    await localTracker.reevaluateSignals();
  });

  document
    .getElementById('behave-marketer')
    ?.addEventListener('click', async () => {
      localTracker.addBehaviorActivity({
        marketer: { str: IntentTagStrength.Normal },
      });

      await localTracker.reevaluateSignals();
    });
}

/** Binds event handlers to delete tracking data */
function initForgetButton() {
  document.getElementById('forget')?.addEventListener('click', () => {
    localTracker.forgetMe();
  });
}

/** Binds event handler to trigger an event signal */
function initEventButton() {
  document
    .getElementById('event-signal')
    ?.addEventListener('click', async () => {
      await localTracker.addEvent({
        label: 'fire',
        category: 'anything',
        value: 'signal only cares about label=fire',
      });
    });
}

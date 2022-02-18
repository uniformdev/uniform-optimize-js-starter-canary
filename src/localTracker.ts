import {
  DeliveryAPIResult,
  EventSignal,
  IntentTagStrength,
  SignalType,
} from '@uniformdev/optimize-common';
import { createDefaultTracker } from '@uniformdev/optimize-tracker-browser';
import intentManifest from './intentManifest.json';

// this is an example of extending the intent manifest with custom intents
// known only to the app. In this case we're doing it to show an event signal.
// Note that intents defined this way cannot be tagged in CMSes since Uniform does not know about them.
//
// In most cases, you wouldn't need to do this and could use `intentManifest` directly
// in createDefaultTracker().
const finalIntentManifest: DeliveryAPIResult = {
  ...intentManifest,
  site: {
    ...intentManifest.site,
    intents: [
      ...intentManifest.site.intents,

      {
        id: 'extra-event-intent',
        signals: [
          {
            type: SignalType.Event,
            str: IntentTagStrength.Boost,
            // the event signal fires if an event
            // with label === 'fire' is sent to the tracker
            label: {
              expr: 'fire',
              type: 'exact',
            },
          } as EventSignal,
        ],
      },
    ],
  },
};

export const localTracker = createDefaultTracker({
  intentManifest: finalIntentManifest,
});

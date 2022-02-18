import { IntentTagStrength, IntentVector } from '@uniformdev/optimize-common';
import { personalizeList } from '@uniformdev/optimize-tracker';
import type { PersonalizableListItem } from '@uniformdev/optimize-tracker-common';

// Hard-coded content variations. In reality, these would likely be from a CMS
const variations: Array<{ content: string } & PersonalizableListItem> = [
  {
    content: 'Generic default content',
    intentTag: undefined,
  },
  {
    content: 'Personalized for Developers!',
    intentTag: {
      intents: {
        dev: {
          str: IntentTagStrength.Normal,
        },
      },
    },
  },
  {
    content: 'Personalized for Marketers!',
    intentTag: {
      intents: {
        marketer: {
          str: IntentTagStrength.Normal,
        },
      },
    },
  },
  {
    content: 'Personalized for Events!',
    intentTag: {
      intents: {
        'extra-event-intent': {
          str: IntentTagStrength.Normal,
        },
      },
    },
  },
  {
    content: 'Personalized for UTM!',
    intentTag: {
      intents: {
        cfp_utm: {
          str: IntentTagStrength.Normal,
        },
      },
    },
  },
];

/** Chooses a personalized content variation based on hard-coded variants */
export function getPersonalizedContent(intentScores: IntentVector): string {
  const personalizedList = personalizeList({
    intentScores,
    list: variations,
  });

  return personalizedList.result[0].item.content;
}

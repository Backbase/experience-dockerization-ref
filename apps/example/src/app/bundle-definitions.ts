import { LazyConfig } from '@backbase/foundation-ang/core';

export const bundlesDefinition: LazyConfig = [
  {
    module: 'SampleJourneyBundleModule',
    loadChildren: () => import('../bundles/sample-journey-bundle.module').then((m) => m.SampleJourneyBundleModule),
  },
];

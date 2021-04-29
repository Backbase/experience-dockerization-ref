import { createMocksInterceptor } from '@backbase/foundation-ang/data-http';

import { Container } from '@backbase/foundation-ang/web-sdk';
import { ExternalServices } from '@backbase/foundation-ang/start';

import * as pageModelMock from '../mocks/home.simplified.json';

const services: ExternalServices = {};

export const environment = {
  production: false,
  mockProviders: [createMocksInterceptor()],
  bootstrap: {
    pageModel: (pageModelMock as Container).children[0],
    services,
  },
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

import { createMocksInterceptor } from '@backbase/foundation-ang/data-http';

import { Container } from '@backbase/foundation-ang/web-sdk';
import { ExternalServices } from '@backbase/foundation-ang/start';

import * as pageModelMock from '../mocks/home.page.mock.json';

const services: ExternalServices = {};

export const environment = {
  production: false,
  mockProviders: [createMocksInterceptor()],
  bootstrap: {
    // 1. Type casting is needed to bring some clear structure to the imported mock file.
    // 2. The pageModel is wrapped into a manageable area container in the provisioning package.
    //    It is used only in the application/experience managers to bring some manageability rules.
    //    It is completely redundant in the local development.
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

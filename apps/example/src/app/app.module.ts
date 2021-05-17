import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BackbaseCoreModule } from '@backbase/foundation-ang/core';
import { WebSdkModule } from '@backbase/foundation-ang/web-sdk';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { bundlesDefinition } from './bundle-definitions';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    HttpClientModule,
    RouterModule.forRoot([], { initialNavigation: 'disabled', useHash: false }),
    WebSdkModule.forRoot({ ...environment, staticResourcesRoot: '' }),
    BackbaseCoreModule.forRoot({
      lazyModules: bundlesDefinition,
    }),
  ],
  providers: [...(environment.mockProviders || []), { provide: APP_BASE_HREF, useValue: '/' }],
  bootstrap: [AppComponent],
})
export class AppModule {}

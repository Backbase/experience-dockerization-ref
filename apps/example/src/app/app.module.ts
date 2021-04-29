import { DummySampleModule } from '@@example/dummy-sample';
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

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    HttpClientModule,
    BackbaseCoreModule,
    RouterModule.forRoot([], { initialNavigation: 'disabled', useHash: false }),
    WebSdkModule.forRoot({ ...environment, staticResourcesRoot: '' }),
    DummySampleModule,
  ],
  providers: [...(environment.mockProviders || []), { provide: APP_BASE_HREF, useValue: '/' }],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackbaseCoreModule } from '@backbase/foundation-ang/core';
import { DummySampleComponent } from './dummy-sample.component';

@NgModule({
  declarations: [DummySampleComponent],
  imports: [
    CommonModule,
    BackbaseCoreModule.withConfig({
      classMap: { DummySampleComponent }
    })
  ]
})
export class DummySampleModule { }
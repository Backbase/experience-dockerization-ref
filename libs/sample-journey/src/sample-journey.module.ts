import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SampleJourneyComponent } from './sample-journey.component';

@NgModule({
  declarations: [SampleJourneyComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: SampleJourneyComponent,
      },
    ]),
  ],
})
export class SampleJourneyModule {}

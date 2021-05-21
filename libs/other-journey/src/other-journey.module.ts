import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OtherJourneyComponent } from './other-journey.component';

@NgModule({
  declarations: [OtherJourneyComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: OtherJourneyComponent,
      },
    ]),
  ],
})
export class OtherJourneyModule {}

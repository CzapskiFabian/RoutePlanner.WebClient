import { ResultsComponent } from './results.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from 'angular2-google-maps/core';

@NgModule({
  declarations: [
    ResultsComponent
  ],
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBbevaAw-6wYaG_dKtLQdnwzeFzY_sokD8'
    }),
  ],
  exports:[
      ResultsComponent
  ],
  providers:[

  ]
})
export class ResultsModule {
}
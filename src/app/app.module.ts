import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ResultsComponent } from './results/results.component';
import { WorkspaceModule } from './workspace/workspace.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from 'angular2-google-maps/core';

@NgModule({
  declarations: [
    AppComponent,
    ResultsComponent
  ],
  imports: [
    CoreModule,
    BrowserModule,
    FormsModule,
    WorkspaceModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBbevaAw-6wYaG_dKtLQdnwzeFzY_sokD8'
    }),
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }

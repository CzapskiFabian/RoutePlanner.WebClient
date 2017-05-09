import { EngineerService } from '../domain/services/engineers.service';
import { JobsService } from '../domain/services/jobs.service';
import { RequestService } from './../domain/services/request.service';
import { ServerService } from '../integration/server.service';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ResultsComponent } from './results/results.component';
import { WorkspaceModule } from './workspace/workspace.module';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { AgmCoreModule } from 'angular2-google-maps/core';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ResultsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    WorkspaceModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBbevaAw-6wYaG_dKtLQdnwzeFzY_sokD8'
    })
  ],
  providers: [RequestService, ServerService, JobsService, EngineerService],
  bootstrap: [AppComponent]
})
export class AppModule { }

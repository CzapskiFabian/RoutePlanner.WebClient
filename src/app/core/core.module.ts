import { HeaderComponent } from '../header/header.component';
import { ServerService } from '../shared/integration/server.service';
import { EngineerService } from '../shared/services/engineers.service';
import { JobsService } from '../shared/services/jobs.service';
import { RequestService } from '../shared/services/request.service';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
    declarations: [
        HeaderComponent,
    ],
    imports: [
        HttpModule,
    ],
    exports: [
        HeaderComponent
    ],
    providers: [RequestService, ServerService, JobsService, EngineerService],
})
export class CoreModule { }

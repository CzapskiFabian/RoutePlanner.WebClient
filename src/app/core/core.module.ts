import { JobSetService } from '../shared/services/jobset.service';
import { HeaderComponent } from '../header/header.component';
import { ServerService } from '../shared/integration/server.service';
import { GreedyAlgorithmService } from '../shared/services/Algorithm/greedy-algorithm.service';
import { EngineerService } from '../shared/services/engineers.service';
import { JobsService } from '../shared/services/jobs.service';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';


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
    providers: [ServerService, JobsService, EngineerService, GreedyAlgorithmService, JobSetService],
})
export class CoreModule { }

import { DistanceMatrixService } from '../shared/services/workspace/distance-matrix.service';
import { HeaderComponent } from '../header/header.component';
import { MapComponent } from '../map/map.component';
import { GreedyAlgorithmService } from '../shared/services/Algorithm/greedy-algorithm.service';
import { GoogleMapsService } from '../shared/services/map/google-maps.service';
import { ExceptionHandler } from '../shared/services/plumbing/exception.handler';
import { LoggingService } from '../shared/services/plumbing/logging.service';
import { EngineerService } from '../shared/services/workspace/engineers.service';
import { JobsService } from '../shared/services/workspace/jobs.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';


@NgModule({
    declarations: [
        HeaderComponent,
        MapComponent,
    ],
    imports: [
        CommonModule,
        HttpModule,

    ],
    exports: [
        HeaderComponent,
        MapComponent,

    ],
    providers: [JobsService, EngineerService, GreedyAlgorithmService, GoogleMapsService, DistanceMatrixService, LoggingService, ExceptionHandler],

})
export class CoreModule { }

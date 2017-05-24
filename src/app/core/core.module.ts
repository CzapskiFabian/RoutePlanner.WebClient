import { HeaderComponent } from '../header/header.component';
import { MapComponent } from '../map/map.component';
import { GreedyAlgorithmService } from '../shared/services/Algorithm/greedy-algorithm.service';
import { EngineerService } from '../shared/services/engineers.service';
import { GoogleMapsService } from '../shared/services/google-maps-service';
import { JobsService } from '../shared/services/jobs.service';
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
    providers: [JobsService, EngineerService, GreedyAlgorithmService, GoogleMapsService],
})
export class CoreModule { }

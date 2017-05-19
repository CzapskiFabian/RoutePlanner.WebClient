import { MathsHelper } from './../helpers/mathematical.heper';
import { Injectable } from '@angular/core';
import { ItemListService } from './generic-item-list.service.';
import { MarkerStatus } from '../models/markerStatus.enum';
import { Job } from '../models/job.model';
import { Dictionary } from '../helpers/dictionary.type';
import { Subject } from 'rxjs/Rx';

@Injectable()
export class JobsService extends ItemListService<Job> {
    constructor() {
        super();
        // Load sample jobs
        for (var i = 0; i < 20; i++) {
            let currentLatitude:number = MathsHelper.GetRandomFloat(51, 52, 5);
            let currentLongitude:number = MathsHelper.GetRandomFloat(-1, 1, 5);

            this.add(
                new Job(
                    i + "",
                    "Some address",
                    MarkerStatus.Plotted,
                    90,
                    currentLatitude,
                    currentLongitude));
        }
    }
}
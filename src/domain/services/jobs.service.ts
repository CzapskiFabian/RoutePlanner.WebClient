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
        this.items.add("1", new Job("1", "Some address", MarkerStatus.Plotting, 90, 51.529865, -0.128092))
        this.items.add("2", new Job("2", "Some address", MarkerStatus.Plotting, 90, 51.539865, -0.128092))
        this.items.add("3", new Job("3", "Some address", MarkerStatus.Plotting, 90, 51.549865, -0.128092))
        this.items.add("4", new Job("4", "Some address", MarkerStatus.Plotting, 90, 51.559865, -0.128092))
    }
}
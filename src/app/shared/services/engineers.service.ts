import { Engineer } from '../models/engineer.model';
import { Job } from '../models/job.model';
import { JobSet } from '../models/jobset.model';
import { JobSetItem } from '../models/jobSetItem.model';
import { MarkerStatus } from '../models/markerStatus.enum';
import { MathsHelper } from './../helpers/mathematical.heper';
import { ItemListService } from './generic-item-list.service.';
import { Injectable } from '@angular/core';

@Injectable()
export class EngineerService extends ItemListService<Engineer> {
    constructor() {
        super();
        // Load sample engineers
        for (var i = 0; i < 1; i++) {
            let currentLatitude: number = MathsHelper.GetRandomFloat(51, 52, 5);
            let currentLongitude: number = MathsHelper.GetRandomFloat(-1, 1, 5);

            this.add(
                new Engineer(
                    "Some address",
                    MarkerStatus.Plotted,
                    currentLatitude,
                    currentLongitude,
                    currentLatitude,
                    currentLongitude));
        }
    }

    addJobToEngineersJobSet(engineer: Engineer, job: Job) {
        let jobOrder = engineer.jobSet.jobSetItems.length + 1;

        let jobSetItem = new JobSetItem(engineer, job, jobOrder);

        engineer.jobSet.jobSetItems.push(jobSetItem);
    }

    clearJobSets() {
        for(let engineer of this.items.values())
        {
            engineer.jobSet = new JobSet(new Array<JobSetItem>());
        }
    }
    private getLastJob(engineer: Engineer): Job {
        return engineer.jobSet.jobSetItems[engineer.jobSet.jobSetItems.length - 1].job;
    }

}
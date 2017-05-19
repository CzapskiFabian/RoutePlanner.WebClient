import { MathsHelper } from './../helpers/mathematical.heper';
import { JobSetItem } from '../models/jobSetItem.model';
import { Engineer } from '../models/engineer.model';
import { Job } from '../models/job.model';
import { JobSet } from '../models/jobset.model';
import { ItemListService } from './generic-item-list.service.';
import { Injectable } from '@angular/core';

@Injectable()
export class JobSetService extends ItemListService<JobSet>{
    constructor() {
        super();
    }

    addJobToEngineersJobSet(engineer: Engineer, job: Job) {
        let jobOrder = this.getNewJobOrder(engineer);

        let jobSetItem = new JobSetItem(jobOrder + "", engineer, job, jobOrder);

        // Create Jobset if empty; else add to existing jobset
        if (!this.get(engineer.id)) {
            let newJobSet = new Array<JobSetItem>();
            

            newJobSet.push(jobSetItem);

            this.add(new JobSet(
                engineer.id,
                newJobSet
            ));

        } else {
            this.get(engineer.id).jobSetItems.push(jobSetItem);
        }
        this.EmitItemsChanged();
    }

    private getLastJob(engineer: Engineer): Job{
        return this.get(engineer.id).jobSetItems[this.get(engineer.id).jobSetItems.length-1].job;
    }

    private getNewJobOrder(engineer: Engineer) {
        return this.get(engineer.id) ? this.get(engineer.id).jobSetItems.length + 1 : 1;
    }


}
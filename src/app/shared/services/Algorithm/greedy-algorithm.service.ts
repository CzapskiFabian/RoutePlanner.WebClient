import { JobSet } from '../../models/jobset.model';
import { JobSetItem } from '../../models/jobSetItem.model';
import { JobSetService } from './../jobset.service';
import { MathsHelpers } from './../../helpers/mathematical.hepers';
import { Engineer } from '../../models/engineer.model';
import { Job } from '../../models/job.model';
import { EngineerService } from '../engineers.service';
import { JobsService } from '../jobs.service';
import { Injectable } from '@angular/core';

@Injectable()
export class GreedyAlgorithmService {
    restart = false;

    constructor(private _engineerService: EngineerService, private _jobsService: JobsService, private _jobSetService: JobSetService) { }

    run() {
        this._jobSetService.clear();
        let availableJobs: Job[] = this._jobsService.getAll();

         while (this._engineerService.any() && this._jobsService.any() && !this.restart &&  availableJobs.length > 0) {
            for (let engineer of this._engineerService.getAll()) {
                if (availableJobs.length > 0) {
                    let chosen_job_index = this.getClosestJob(engineer, availableJobs);
                    this.addJobToEngineersJobSet(engineer, availableJobs[chosen_job_index]);
                    availableJobs.splice(chosen_job_index, 1);
                }    
            }
         }
    }

    private addJobToEngineersJobSet(engineer: Engineer, job: Job) {
        // Set job order
        let job_order = this._jobSetService.get(engineer.id)? this._jobSetService.get(engineer.id).jobSetItems.length + 1 : 1;

        // Create Job Set Item
        let job_set_item: JobSetItem = new JobSetItem(job_order + "", engineer, job, job_order);

        // Create Jobset if empty; else add to existing jobset
        if (!this._jobSetService.get(engineer.id)) {
            let new_job_set = new Array<JobSetItem>();
            new_job_set.push(job_set_item);

            this._jobSetService.add(new JobSet(
                engineer.id,
                new_job_set
            ));
        } else {
            this._jobSetService.get(engineer.id).jobSetItems.push(job_set_item);
        }

    }
    private getClosestJob(engineer: Engineer, jobs: Job[]) {
        let closestJobIndex = 0;
        for (var i = 0; i < jobs.length; i++) {
            let distance_to_closest_job = MathsHelpers.GetDistance(engineer.latitude, engineer.longitude, jobs[closestJobIndex].latitude, jobs[closestJobIndex].longitude);
            let distance_to_this_job = MathsHelpers.GetDistance(engineer.latitude, engineer.longitude, jobs[i].latitude, jobs[i].longitude);

            if (distance_to_closest_job > distance_to_this_job) {
                closestJobIndex = i;
            }
        }

        return closestJobIndex;
    }


}
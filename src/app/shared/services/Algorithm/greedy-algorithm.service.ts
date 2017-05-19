import { Dictionary } from '../../helpers/dictionary.type';
import { LocationPoint } from '../../models/location-point.model';
import { JobSet } from '../../models/jobset.model';
import { JobSetItem } from '../../models/jobSetItem.model';
import { JobSetService } from './../jobset.service';
import { MathsHelper } from './../../helpers/mathematical.heper';
import { Engineer } from '../../models/engineer.model';
import { Job } from '../../models/job.model';
import { EngineerService } from '../engineers.service';
import { JobsService } from '../jobs.service';
import { Injectable } from '@angular/core';

@Injectable()
export class GreedyAlgorithmService {
    private availableJobs: Job[];
    private engineerLocations: Dictionary<LocationPoint>;
    private firstRound: boolean = true;

    constructor(private _engineerService: EngineerService, private _jobsService: JobsService, private _jobSetService: JobSetService) { }

    run() {
        this.cleanBeforeNewRun();

        while (this._engineerService.any() && this._jobsService.any() && this.availableJobs.length > 0) {
            this.allocateClosestJobToEachEngineer();
        }
    }

    private cleanBeforeNewRun() {
        this._jobSetService.clear();
        this.availableJobs = this._jobsService.getAll();
        this.engineerLocations = new Dictionary<LocationPoint>();
        this.firstRound = true;
    }

    private allocateClosestJobToEachEngineer() {
        for (let engineer of this._engineerService.getAll()) {
            if (this.firstRound) {
                this.updateEngineerLocation(engineer, {latitude: engineer.homeLatitude, longitude: engineer.homeLongitude});
            }
            if (this.availableJobs.length > 0) {
                let lastLocation = this.getCurrentLocation(engineer);
                let chosenJobIndex = this.getClosestJob(lastLocation, this.availableJobs);
                let chosenJob = this.availableJobs[chosenJobIndex];

                this._jobSetService.addJobToEngineersJobSet(engineer, chosenJob);
                this.updateEngineerLocation(engineer, chosenJob);
                this.availableJobs.splice(chosenJobIndex, 1);
            }
        }

        if (this.firstRound) {
            this.firstRound = false;
        }
    }

    private getCurrentLocation(engineer: Engineer): LocationPoint {
        return this.engineerLocations[engineer.id];
    }
    private updateEngineerLocation(engineer: Engineer, lastLocation: LocationPoint) {
        if(this.engineerLocations[engineer.id]){
            this.engineerLocations[engineer.id] = lastLocation;
        }else{
            this.engineerLocations.add(engineer.id, lastLocation);
        }
    }

    private getClosestJob(lastLocation: LocationPoint, jobs: Job[]) {
        let closestJobIndex = 0;
        for (var i = 0; i < jobs.length; i++) {
            let distance_to_closest_job = MathsHelper.GetDistance(lastLocation.latitude, lastLocation.longitude, jobs[closestJobIndex].latitude, jobs[closestJobIndex].longitude);
            let distance_to_this_job = MathsHelper.GetDistance(lastLocation.latitude, lastLocation.longitude, jobs[i].latitude, jobs[i].longitude);

            if (distance_to_closest_job > distance_to_this_job) {
                closestJobIndex = i;
            }
        }

        return closestJobIndex;
    }


}
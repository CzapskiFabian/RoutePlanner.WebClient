import { Engineer } from '../../models/engineer.model';
import { Job } from '../../models/job.model';
import { LocationPoint } from '../../models/location-point.model';
import { EngineerService } from '../engineers.service';
import { JobsService } from '../jobs.service';
import { Injectable } from '@angular/core';
import * as Collections from 'typescript-collections';


@Injectable()
export class GreedyAlgorithmService {
    private availableJobs: Job[];
    private engineerLocations: Collections.Dictionary<string, LocationPoint> = new Collections.Dictionary<string, LocationPoint>();

    private firstRound: boolean = true;

    constructor(private _engineerService: EngineerService, private _jobsService: JobsService) { }

    run() {
        this.cleanBeforeNewRun();

        while (this._engineerService.any() && this._jobsService.any() && this.availableJobs.length > 0) {
            this.allocationRound();
        }
    }

    private cleanBeforeNewRun() {
        this._engineerService.clearJobSets();
        this.availableJobs = this._jobsService.getAll();
        this.engineerLocations.clear();
        this.firstRound = true;
    }

    private allocationRound() {
        for (let engineer of this._engineerService.getAll()) {
            if (this.firstRound) {
                this.updateEngineerLocation(engineer, { latitude: engineer.homeLatitude, longitude: engineer.homeLongitude });
            }
            if (this.availableJobs.length > 0) {
                let lastLocation = this.getCurrentLocation(engineer);
                let chosenJobIndex = this.getClosestJob(lastLocation, this.availableJobs);
                let chosenJob = this.availableJobs[chosenJobIndex];

                this._engineerService.addJobToEngineersJobSet(engineer, chosenJob);
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
        this.engineerLocations.setValue(engineer.id, lastLocation);
    }

    private getClosestJob(lastLocation: LocationPoint, jobs: Job[]) {
        return 0;
    }
}
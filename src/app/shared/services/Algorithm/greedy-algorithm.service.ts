import { DistanceMatrixService } from '../workspace/distance-matrix.service';
import { Engineer } from '../../models/engineer.model';
import { Job } from '../../models/job.model';
import { LocationPoint } from '../../models/location-point.model';
import { Result } from '../../models/result.model';
import { EngineerService } from '../workspace/engineers.service';
import { JobsService } from '../workspace/jobs.service';
import { IAlgorithm } from './algorithm.interface';
import { Injectable } from '@angular/core';
import * as Collections from 'typescript-collections';


@Injectable()
export class GreedyAlgorithmService implements IAlgorithm {
    private availableJobs: Job[];
    private engineerLocations: Collections.Dictionary<string, LocationPoint> = new Collections.Dictionary<string, LocationPoint>();

    private firstRound: boolean = true;

    constructor(private _engineerService: EngineerService, private _jobsService: JobsService, private _distanceMatrixService: DistanceMatrixService) { }


    public solve(): Result<void> {
        this.run();
        return new Result();
    }

    private run() {
        this.cleanBeforeNewRun();

        while (this._engineerService.any() && this._jobsService.any() && this.availableJobs.length > 0) {
            this.allocationRound();
        }

        this._engineerService.fireJobSetsChanged();
    }

    private getAllLocations(): LocationPoint[] {
        var locations = new Array<LocationPoint>();

        for (let engineer of this._engineerService.getAll()) {
            locations.push({ lat: engineer.lat, lng: engineer.lng, address: engineer.address });
            locations.push({ lat: engineer.homeLatitude, lng: engineer.homeLongitude, address: null });
        }
        for (let job of this._jobsService.getAll()) {
            locations.push({ lat: job.lat, lng: job.lng, address: job.address });
        }
        return locations;
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
                this.updateEngineerLocation(engineer, { lat: engineer.lat, lng: engineer.lng, address: null });
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
        this.firstRound = false;
    }

    private getCurrentLocation(engineer: Engineer): LocationPoint {
        return this.engineerLocations.getValue(engineer.id);
    }
    private updateEngineerLocation(engineer: Engineer, lastLocation: LocationPoint) {
        this.engineerLocations.setValue(engineer.id, lastLocation);
    }

    private getClosestJob(lastLocation: LocationPoint, jobs: Job[]): number {
        let first = true;
        let closestId = 0;
        let bestDistance = 0;
        for (let thisIndex = 0; thisIndex < jobs.length; thisIndex++) {
            if (first) {
                closestId = 0;
                bestDistance = this._distanceMatrixService.getDistance(lastLocation, { lat: jobs[thisIndex].lat, lng: jobs[thisIndex].lng, address: jobs[thisIndex].address });
                first = false;

            } else {
                let thisDistance = this._distanceMatrixService.getDistance(lastLocation, { lat: jobs[thisIndex].lat, lng: jobs[thisIndex].lng, address: jobs[thisIndex].address });

                if (thisDistance < bestDistance) {
                    closestId = thisIndex;
                    bestDistance = thisDistance;
                }
            }

        }
        return closestId;
    }


}
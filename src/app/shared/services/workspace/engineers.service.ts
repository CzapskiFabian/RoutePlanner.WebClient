import { DistanceMatrixService } from './distance-matrix.service';
import { Engineer } from '../../models/engineer.model';
import { GoogleMapsRoute, Waypoint } from '../../models/google-maps-route.model';
import { Job } from '../../models/job.model';
import { JobSet } from '../../models/jobset.model';
import { JobSetItem } from '../../models/jobSetItem.model';
import { GoogleMapsService } from '../map/google-maps.service';
import { ItemListService } from './generic-item-list.service.';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';


@Injectable()
export class EngineerService extends ItemListService<Engineer> {
    jobsetsReady = new Subject();

    constructor(private _googleMapsService: GoogleMapsService, private _distanceMatrixService: DistanceMatrixService) {
        super();
        // Load sample engineers
        
        this.add(
            new Engineer(
                "Silk St, London EC2Y 8DS, UK",
                51.5200768,
                -0.093262999999979,
                51.5200768,
                -0.093262999999979));
        // this.add(
        //     new Engineer(
        //         "Reading, UK",
        //         51.4542645,
        //         -0.9781302999999753,
        //         51.4542645,
        //         -0.9781302999999753));
        // this.add(
        //     new Engineer(
        //         "Enfield, UK",
        //         51.65229939999999,
        //         -0.08071189999998296,
        //         51.65229939999999,
        //         -0.08071189999998296));
    }

    add(newItem: Engineer){
        
        let id = super.add(newItem);
        newItem.homeLatitude = newItem.lat;
        newItem.homeLongitude = newItem.lng;

        this._distanceMatrixService.addLocation({lat: newItem.lat, lng: newItem.lng, address:newItem.address});
        this._distanceMatrixService.addLocation({lat: newItem.homeLatitude, lng: newItem.homeLongitude, address:null});
        return id;
    }

    deleteById(id: string){
        let deletedItem = this.items.getValue(id);
        this._distanceMatrixService.removeLocation({lat: deletedItem.lat, lng: deletedItem.lng, address:deletedItem.address})
        this._distanceMatrixService.removeLocation({lat: deletedItem.homeLatitude, lng: deletedItem.homeLongitude, address:deletedItem.address})
        super.deleteById(id);        
    }

    addJobToEngineersJobSet(engineer: Engineer, job: Job) {
        let jobOrder = engineer.jobSet.jobSetItems.length + 1;

        let jobSetItem = new JobSetItem(engineer, job, jobOrder);

        engineer.jobSet.jobSetItems.push(jobSetItem);
    }

    clearJobSets() {
        for (let engineer of this.items.values()) {
            engineer.jobSet = new JobSet(new Array<JobSetItem>());
        }
    }

    FireJobsetsReady() {
        this.jobsetsReady.next();
    }

    getGoogleMapRoutes(): GoogleMapsRoute[] {
        let routes = new Array<GoogleMapsRoute>();
        for (let engineer of this.getAll()) {
            routes.push(this.getGoogleMapRoute(engineer));
        }

        return routes;
    }

    private getGoogleMapRoute(engineer: Engineer): GoogleMapsRoute {
        let waypoints = new Array<Waypoint>();

        for (let jobsetitem of engineer.jobSet.jobSetItems) {
            waypoints.push({ location: jobsetitem.job.address, stopover: true });
        }

        return new GoogleMapsRoute(engineer.address, engineer.address, waypoints);
    }
    private getLastJob(engineer: Engineer): Job {
        return engineer.jobSet.jobSetItems[engineer.jobSet.jobSetItems.length - 1].job;
    }

}
import { GoogleMapsService } from './google-maps.service';
import { LocationMatrixService } from './location-matrix.service';
import { MathsHelper } from './../helpers/mathematical.heper';
import { Injectable } from '@angular/core';
import { ItemListService } from './generic-item-list.service.';
import { Job } from '../models/job.model';
import { Subject } from 'rxjs/Rx';

@Injectable()
export class JobsService extends ItemListService<Job> {
    constructor(private _locationMatrixService: LocationMatrixService, private _googleMapsService:GoogleMapsService) {
        super();
        // Load sample jobs
        for (var i = 0; i < 1; i++) {
            let currentLatitude: number = MathsHelper.GetRandomFloat(51, 52, 5);
            let currentLongitude: number = MathsHelper.GetRandomFloat(-1, 1, 5);
            this._googleMapsService.geocodeCoordinates({ lat: currentLatitude, lng: currentLongitude })
                .then((result) => {
                    this.add(
                        new Job(
                            result.formatted_address,
                            currentLatitude,
                            currentLongitude,
                            90));
                })    
                .catch((error)=>{
                    console.log(error);
                })          
        }
        // for (var i = 0; i < 1; i++) {
        //     let currentLatitude: number = MathsHelper.GetRandomFloat(51, 52, 5);
        //     let currentLongitude: number = MathsHelper.GetRandomFloat(-1, 1, 5);

        //     this.add(
        //         new Job(
        //             "Some address",
        //             MarkerStatus.Plotted,
        //             90,
        //             currentLatitude,
        //             currentLongitude));
        // }
    }

    deleteById(id: string) {
        let object = super.get(id);
        super.deleteById(id);
        // this._locationMatrixService.removeLocation({ lat: object.lat, lng: object.lng });
    }

    add(newItem: Job): string {
        let result = super.add(newItem);
        // this._locationMatrixService.addLocation({ lat: newItem.lat, lng: newItem.lng });
        return result;
    }
}
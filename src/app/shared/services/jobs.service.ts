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
         this.add(new Job(
                            "Luton, UK",
                            51.8786707,
                            -0.4200255000000652,
                            90));
             this.add(new Job(
                            "Harlow, UK",
                            51.76778699999999,
                            0.0878060000000005,
                            90));
             this.add(new Job(
                            "Cambridge, UK",
                            52.205337,
                            0.12181699999996454,
                            90));
             this.add(new Job(
                            "Oxford, UK",
                            51.7520209,
                            -1.2577263000000585,
                            90));
             this.add(new Job(
                            "Colchester, UK",
                            51.895927,
                            0.8918740000000298,
                            90));
             this.add(new Job(
                            "Bristol, UK",
                            51.454513,
                            -2.5879099999999653,
                            90));
             this.add(new Job(
                            "Great Cambridge Rd, Enfield EN1 4BZ, UK",
                            51.6646323,
                            -0.05752350000000206,
                            90));
             this.add(new Job(
                            "Sunbury-on-Thames TW16 7BD, UK",
                            51.41911409999999,
                            -0.42195440000000417,
                            90));
             this.add(new Job(
                            "Poplar, London E14 5BZ, UK",
                            51.5131966,
                            -0.028302299999950264,
                            90));
            this.add( new Job(
                            "Baker St, Marylebone, London W1U, UK",
                            51.52061140000001,
                            -0.15679959999999937,
                            90));
            
        
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
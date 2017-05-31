import { DistanceMatrixService } from './distance-matrix.service';
import { GoogleMapsService } from '../map/google-maps.service';
import { Injectable } from '@angular/core';
import { ItemListService } from './generic-item-list.service.';
import { Job } from '../../models/job.model';
import { Subject } from 'rxjs/Rx';

@Injectable()
export class JobsService extends ItemListService<Job> {
    constructor(private _googleMapsService: GoogleMapsService, private _distanceMatrixService: DistanceMatrixService) {
        super();
        // Load sample jobs
        // this.add(new Job(
        //     "Luton, UK",
        //     90,
        //     51.8786707,
        //     -0.4200255000000652));
        //  this.add(new Job(
        //                 "Harlow, UK",
        //                 90,
        //                 51.76778699999999,
        //                 0.0878060000000005,
        //                 ));
        //  this.add(new Job(
        //                 "Cambridge, UK",
        //                 90,
        //                 52.205337,
        //                 0.12181699999996454,
        //                 ));
        //  this.add(new Job(
        //                 "Oxford, UK",
        //                 90,
        //                 51.7520209,
        //                 -1.2577263000000585,
        //                 ));
        //  this.add(new Job(
        //                 "Colchester, UK",
        //                 90,
        //                 51.895927,
        //                 0.8918740000000298,
        //                 ));
        //  this.add(new Job(
        //                 "Bristol, UK",
        //                 90,
        //                 51.454513,
        //                 -2.5879099999999653,
        //                 ));
        //  this.add(new Job(
        //                 "Great Cambridge Rd, Enfield EN1 4BZ, UK",
        //                 90,
        //                 51.6646323,
        //                 -0.05752350000000206,
        //                 ));
        //  this.add(new Job(
        //                 "Sunbury-on-Thames TW16 7BD, UK",
        //                 90,
        //                 51.41911409999999,
        //                 -0.42195440000000417,
        //                 ));
        //  this.add(new Job(
        //                 "Poplar, London E14 5BZ, UK",
        //                 90,
        //                 51.5131966,
        //                 -0.028302299999950264,
        //                 ));
        // this.add( new Job(
        //                 "Baker St, Marylebone, London W1U, UK",
        //                 90,
        //                 51.52061140000001,
        //                 -0.15679959999999937,
        //                 ));


    }

    add(newItem: Job) {

        let id = super.add(newItem);
        this._distanceMatrixService.addLocation({ lat: newItem.lat, lng: newItem.lng, address: newItem.address });
        return id;

    }

    deleteById(id: string) {
        let deletedItem = this.items.getValue(id);
        this._distanceMatrixService.removeLocation({ lat: deletedItem.lat, lng: deletedItem.lng, address: deletedItem.address })
        super.deleteById(id);
    }

}
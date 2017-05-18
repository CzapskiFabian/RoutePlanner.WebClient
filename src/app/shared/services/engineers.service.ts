import { MathsHelpers } from './../helpers/mathematical.hepers';
import { Injectable } from '@angular/core';
import { ItemListService } from './generic-item-list.service.';
import { MarkerStatus } from '../models/markerStatus.enum';
import { Dictionary } from '../helpers/dictionary.type';
import { Engineer } from '../models/engineer.model';
import { Subject } from 'rxjs/Rx';

@Injectable()
export class EngineerService extends ItemListService<Engineer> {
    constructor() {
        super();
        // Load sample engineers
        for(var i = 0; i<3; i++){
            let currentLatitude:number = MathsHelpers.GetRandomFloat(51, 52, 5);
            let currentLongitude:number = MathsHelpers.GetRandomFloat(-1, 1, 5);

            this.add(
                new Engineer(
                    i+"", 
                    "Some address", 
                    MarkerStatus.Plotted, 
                    currentLatitude,
                    currentLongitude,
                    currentLatitude,
                    currentLongitude));
        }
    }
}
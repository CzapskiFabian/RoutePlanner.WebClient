import { DistanceMatrix } from '../../models/distance-matrix.model';
import { LocationPoint } from '../../models/location-point.model';
import { GoogleMapsService } from '../map/google-maps.service';
import { Injectable } from '@angular/core';
import * as Collections from 'typescript-collections';

@Injectable()
export class DistanceMatrixService  {
    private knownLocations: Collections.Dictionary<string, LocationPoint> = new Collections.Dictionary<string, LocationPoint>();
    private distances: Collections.Dictionary<string, number>
    = new Collections.Dictionary<string, number>();

    constructor(private _googleMapsService: GoogleMapsService) { }

    public getDistance(locationA: LocationPoint, locationB: LocationPoint): number {
        return this.distances.getValue(this.getDistanceKey(locationA, locationB));
    }

    public addLocation(locationPoint: LocationPoint) {
        if (!this.knownLocations.containsKey(this.stringifyLocation(locationPoint))) {
            if (this.knownLocations.values().length > 0) {
                this._googleMapsService.getDistanceMatrix([locationPoint], this.knownLocations.values().slice())
                    .then((matrix) => {
                        this.processMatrix(matrix, locationPoint, this.knownLocations.values().slice());
                    })
                    .catch((error)=>{
                        console.log(error);
                    });
            }
            this.knownLocations.setValue(this.stringifyLocation(locationPoint), locationPoint);
        }
    }

    // think about race condition
    public removeLocation(locationPoint: LocationPoint) {
        this.knownLocations.remove(this.stringifyLocation(locationPoint));
    }

    public processMatrix(distanceMatrix: DistanceMatrix, origin: LocationPoint, destinations: LocationPoint[]) {
        for (var d = 0; d < distanceMatrix.destinationAddresses.length; d++) {
            this.distances.setValue(this.getDistanceKey(origin, destinations[d]), distanceMatrix.rows[0].elements[d].distance.value);
        }
    }

    private getDistanceKey(locationA: LocationPoint, locationB: LocationPoint): string {
        var locs: string[] = new Array<string>();
        locs.push(this.stringifyLocation(locationA));
        locs.push(this.stringifyLocation(locationB));
        var sorted = locs.sort();

        return sorted.join(' - ');
    }

    private stringifyLocation(locationPoint: LocationPoint): string {
        return "{" + locationPoint.lat + "," + locationPoint.lng + "}";
    }


}
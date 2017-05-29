import { Result } from '../models/result.model';
import { ILocationMatrix } from './interfaces/location-materix.interface';
import { LocationPoint } from '../models/location-point.model';
import * as Collections from 'typescript-collections';
export class LocationMatrixService implements ILocationMatrix {
    private distances: Collections.Dictionary<string, number>;
    


    public addLocation(locationPoint: LocationPoint): Result<void> {
        throw new Error('Not implemented yet.');
    }

    public removeLocation(locationPoint: LocationPoint): Result<void> {
        throw new Error('Not implemented yet.');
    }

    public getDistance(locationA: LocationPoint, locationB: LocationPoint): Result<number> {
        throw new Error('Not implemented yet.');
    }
}
import { Result } from '../../models/result.model';
import { LocationPoint } from '../../models/location-point.model';
export interface IDistanceMatrixService{
    addLocation(locationPoint:LocationPoint);
    removeLocation(locationPoint:LocationPoint);
    getDistance(locationA:LocationPoint, locationB:LocationPoint): number;
}
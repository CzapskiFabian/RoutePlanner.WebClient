import { Result } from '../../models/result.model';
import { LocationPoint } from '../../models/location-point.model';
export interface ILocationMatrix{
    addLocation(locationPoint:LocationPoint):Result<void>;
    removeLocation(locationPoint:LocationPoint):Result<void>;
    getDistance(locationA:LocationPoint, locationB:LocationPoint):Result<number>;
}
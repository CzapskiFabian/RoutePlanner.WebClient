import { DistanceMatrix } from '../../models/distance-matrix.model';
import { GoogleMapsRoute } from '../../models/google-maps-route.model';
import { LocationPoint } from '../../models/location-point.model';
import { Result } from '../../models/result.model';
export interface IGoogleMaps {
    getDistanceMatrix(locationsA: LocationPoint[], locationsB: LocationPoint[]): Promise<DistanceMatrix> ;
    geocodeCoordinates(locationPoint: LocationPoint): Promise<any>;
}
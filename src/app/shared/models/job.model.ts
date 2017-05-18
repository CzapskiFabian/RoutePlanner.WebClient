import { ModelWithId } from './model-with-id.model';
import { MarkerStatus } from './markerStatus.enum';
import { LocationPoint } from './location-point.model';
export class Job implements LocationPoint, ModelWithId {

    constructor(public id: string,
        public address: string,
        public status: MarkerStatus,
        public duration: number,
        public latitude: number,
        public longitude: number){}


}
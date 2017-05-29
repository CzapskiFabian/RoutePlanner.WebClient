import { ModelWithId } from './model-with-id.model';
import { LocationPoint } from './location-point.model';
export class Job implements LocationPoint, ModelWithId {
    public id:string;
    constructor(
        public address: string,
        public duration: number,
        public lat: number,
        public lng: number){}


}
import { JobSet } from './jobset.model';
import { JobSetItem } from './jobSetItem.model';
import { LocationPoint } from './location-point.model';
import { ModelWithId } from './model-with-id.model';
export class Engineer implements LocationPoint, ModelWithId {

    public id: string;
    public jobSet: JobSet;
    constructor(
        public address: string,
        public homeLatitude: number,
        public homeLongitude: number,
        public lat: number,
        public lng: number) {

        this.jobSet = new JobSet(new Array<JobSetItem>());
    }
}
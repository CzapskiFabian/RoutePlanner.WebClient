import { JobSet } from './jobset.model';
import { JobSetItem } from './jobSetItem.model';
import { LocationPoint } from './location-point.model';
import { MarkerStatus } from './markerStatus.enum';
import { ModelWithId } from './model-with-id.model';
export class Engineer implements LocationPoint, ModelWithId {

    public id: string;
    public jobSet: JobSet;
    constructor(
        public address: string,
        public status: MarkerStatus,
        public homeLatitude: number,
        public homeLongitude: number,
        public latitude: number,
        public longitude: number) {

        this.jobSet = new JobSet(new Array<JobSetItem>());
    }
}
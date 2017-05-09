import { ModelWithId } from './model-with-id.model';
import { MarkerStatus } from './markerStatus.enum';
import { LocationPoint } from './locationPoint.model';
export class Job implements LocationPoint, ModelWithId {

    lat: number;
    lng: number;

    constructor(private _id: string,
        private _address: string,
        private _status: MarkerStatus,
        private _duration: number,
         _lat:number,
         _lng:number) {
            this.lat=_lat;
            this.lng=_lng
         }

    public get id(): string {
        return this._id;
    }

    public set id(value: string) {
        this._id = value;
    }

    public get address(): string {
        return this._address;
    }

    public set address(value: string) {
        this._address = value;
    }

    public get status():MarkerStatus {
        return this._status;
    }

    public set status(value: MarkerStatus) {
        this._status = value;
    }

    public get duration():number {
        return this._duration;
    }

    public set duration(value: number) {
        this._duration = value;
    }

}
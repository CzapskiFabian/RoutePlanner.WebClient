import { MarkerStatus } from './markerStatus.enum';
import { LocationPoint } from './locationPoint.model';
export class Engineer implements LocationPoint {

    lat: number;
    lng: number;

    constructor(private _id: string,
        private _address: string,
        private _status: MarkerStatus,
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

}
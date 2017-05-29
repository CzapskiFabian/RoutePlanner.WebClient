export class LocationPoint{
    lat:number;
    lng:number;

    public toString = () : string => {

        return `{lng:${this.lng}, lat:${this.lat}}`;
    }
}
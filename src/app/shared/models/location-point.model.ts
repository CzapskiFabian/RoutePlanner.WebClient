export class LocationPoint {
    lat: number;
    lng: number;
    address: string;

    public toString = (): string => {

        return `{lng:${this.lng}, lat:${this.lat}}`;
    }
}
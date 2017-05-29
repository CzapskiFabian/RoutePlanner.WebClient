export class GoogleMapsRoute {
    constructor(
        public start: string,
        public end: string,
        public waypoints: Waypoint[]) { }
}

export interface Waypoint {
    location: string;
    stopover: boolean;
}
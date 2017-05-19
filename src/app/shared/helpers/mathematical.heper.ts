export class MathsHelper {
    static GetRandomFloat(min, max, decimals) {
        let zeros = 10 * decimals;
        min = min * zeros;
        max = max * zeros;
        return (Math.floor(Math.random() * (max - min + 1)) + min)/zeros;

    }

    static GetDistance(a_lat:number, a_lng:number, b_lat: number, b_lng:number):number{
        return Math.sqrt((a_lat-b_lat)*(a_lat-b_lat)+(a_lng-b_lng)*(a_lng-b_lng));
    }
}
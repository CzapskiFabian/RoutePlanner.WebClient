export class MathsHelper {
    static GetRandomFloat(min, max, decimals) {
        let zeros = 10 * decimals;
        min = min * zeros;
        max = max * zeros;
        return (Math.floor(Math.random() * (max - min + 1)) + min)/zeros;

    }
}
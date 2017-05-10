    
interface IDictionary<U> {
    add(key: string, value: U): void;
    remove(key: string): void;
    containsKey(key: string): boolean;
    keys(): string[];
    values(): U[];
}

export class Dictionary<U> implements IDictionary<U> {



    private _keys: string[] = [];
    private _values: U[] = [];
    constructor(){
    }

    add(key: string, value: U) {
        if(this.containsKey(key)){
            throw new RangeError('duplicate key');
        }
        this[key] = value;
        this._keys.push(key);
        this._values.push(value);
    }

    remove(key: string) {
        var index = this._keys.indexOf(key, 0);
        this._keys.splice(index, 1);
        this._values.splice(index, 1);

        delete this[key];
    }

    keys(): string[] {
        return this._keys.slice();
    }

    values(): U[] {
        return this._values.slice();
    }

    containsKey(key: string) {
        if (typeof this[key] === "undefined") {
            return false;
        }

        return true;
    }
}
import { ModelWithId } from '../models/model-with-id.model';
import { MarkerStatus } from '../models/markerStatus.enum';
import { Dictionary } from '../helpers/dictionary.type';
import { Engineer } from '../models/engineer.model';
import { Subject } from 'rxjs/Rx';
export class ItemListService<U extends ModelWithId> {

    itemsChanged = new Subject<U[]>();
    protected items: Dictionary<U> = new Dictionary<U>();
    
    constructor(){
    }

    getAll(): U[] {
        return this.items.values();
    }

    add(newItem: U) {
        this.items.add(newItem.id, newItem);
        this.EmitItemsChanged();        
    }

    deleteById(id: string) {
        this.items.remove(id);
        this.EmitItemsChanged();
    }

    containsKey(id: string){
        return this.items.containsKey(id);
    }

    private EmitItemsChanged() {
        this.itemsChanged.next(this.items.values());
    }
}
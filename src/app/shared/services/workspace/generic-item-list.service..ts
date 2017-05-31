import { ModelWithId } from '../../models/model-with-id.model';
import { Engineer } from '../../models/engineer.model';
import { Subject } from 'rxjs/Rx';

import * as Collections from 'typescript-collections';

export class ItemListService<U extends ModelWithId> {

    itemsChanged = new Subject<U[]>();
    protected items: Collections.Dictionary<string, U> = new Collections.Dictionary<string, U>();
    
    constructor(){
    }

    clear(){
        this.items.clear();
        this.EmitItemsChanged();    
    }
    get(key: string): U {
        return this.items[key];
    }

    getAll(): U[] {
        return this.items.values().slice();
    }

    add(newItem: U):string {
        
        newItem.id = ""+(this.items.size()+1);
        this.items.setValue(newItem.id , newItem);
        this.EmitItemsChanged();  
        return  newItem.id;     
    }

    speculateNextId():string{
        return ""+(this.items.size()+1);
    }

    deleteById(id: string) {
        this.items.remove(id);
        this.EmitItemsChanged();
    }

    containsKey(id: string){
        return this.items.containsKey(id);
    }

    any(): Boolean{
        return this.items.size()>0;
    }

    protected EmitItemsChanged() {
        this.itemsChanged.next(this.items.values());
    }
}
import { ItemListService } from './generic-item-list.service.';
import { MarkerStatus } from '../models/markerStatus.enum';
import { Dictionary } from '../helpers/dictionary.type';
import { Engineer } from '../models/engineer.model';
import { Subject } from 'rxjs/Rx';
export class EngineerService extends ItemListService<Engineer> {
    constructor() {
        super();
        // Load sample engineers
        this.items.add("1", new Engineer("1", "Some address", MarkerStatus.Plotting, 51.529865, -0.118092))
        this.items.add("2", new Engineer("2", "Some address", MarkerStatus.Plotting, 51.539865, -0.118092))
        this.items.add("3", new Engineer("3", "Some address", MarkerStatus.Plotting, 51.549865, -0.118092))
        this.items.add("4", new Engineer("4", "Some address", MarkerStatus.Plotting, 51.559865, -0.118092))
    }
}
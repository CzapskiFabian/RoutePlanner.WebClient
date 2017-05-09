import { MarkerStatus } from '../models/markerStatus.enum';
import { Dictionary } from '../helpers/dictionary.type';
import { Engineer } from '../models/engineer.model';
import { Subject } from 'rxjs/Rx';
export class EngineerService {

    engineersChanged = new Subject<Engineer[]>();
    private engineers: Dictionary<Engineer> = new Dictionary<Engineer>();
    
    constructor(){
        // Load sample engineers
        this.engineers.add("1", new Engineer("1", "Some address", MarkerStatus.Plotting, 51.529865, -0.118092))
        this.engineers.add("2", new Engineer("2", "Some address", MarkerStatus.Plotting, 51.539865, -0.118092))
        this.engineers.add("3", new Engineer("3", "Some address", MarkerStatus.Plotting, 51.549865, -0.118092))
        this.engineers.add("4", new Engineer("4", "Some address", MarkerStatus.Plotting, 51.559865, -0.118092))
    }

    getEngineers() {
        return this.engineers.values();
    }

    addEngineer(newEngineer: Engineer) {
        this.engineers.add(newEngineer.id, newEngineer);
        this.emitEngineersChanged();        
    }

    // use a dict later
    deleteEngineerById(id: string) {
        this.engineers.remove(id);
        this.emitEngineersChanged();
    }

    private emitEngineersChanged() {
        this.engineersChanged.next(this.engineers.values());
    }
}
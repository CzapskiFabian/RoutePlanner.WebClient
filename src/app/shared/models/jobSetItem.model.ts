import { ModelWithId } from './model-with-id.model';
import { Engineer } from './engineer.model';
import { Job } from './job.model';
export class JobSetItem implements ModelWithId {
    constructor(public id:string, public engineer:Engineer, public job:Job, order:number){}

}
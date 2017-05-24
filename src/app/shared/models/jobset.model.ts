import { ModelWithId } from './model-with-id.model';
import { JobSetItem } from './jobSetItem.model';
export class JobSet implements ModelWithId {
     public id:string;
    constructor(public jobSetItems:JobSetItem[]){}
}
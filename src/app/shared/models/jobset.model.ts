import { ModelWithId } from './model-with-id.model';
import { JobSetItem } from './jobSetItem.model';
export class JobSet implements ModelWithId {
    constructor(public id:string, public jobSetItems:JobSetItem[]){}
}
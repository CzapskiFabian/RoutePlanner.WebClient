import { Engineer } from '../models/engineer.model';
import { Job } from '../models/job.model';
import { JobSet } from '../models/jobset.model';
import { ItemListService } from './generic-item-list.service.';
import { Injectable } from '@angular/core';

@Injectable()
export class JobSetService extends ItemListService<JobSet>{
    constructor() {
        super();
    }
    
}
import { ServerService } from '../integration/server.service';
import { Injectable } from '@angular/core';
import { EngineerService } from './engineers.service';
import { JobsService } from './jobs.service';

@Injectable()
export class RequestService {
    constructor(private _jobsService: JobsService, private _engineersService: EngineerService, private _serverService: ServerService) { }

    submitData() {
        let data = {
            'engineers': this._engineersService.getAll(),
            'jobs': this._jobsService.getAll()
        };
        this._serverService.put(data)
            .subscribe(
            (response) => console.log(response),
            (error) => console.log(error)
            );
    }
}
import { JobSet } from '../../shared/models/jobset.model';
import { JobSetService } from './../../shared/services/jobset.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  constructor(private _jobSetService: JobSetService) { }
  jobSets: JobSet[];

  ngOnInit() {
    this.jobSets = this._jobSetService.getAll();
    this._jobSetService.itemsChanged.subscribe(()=>{
      this.jobSets = this._jobSetService.getAll();
    })
  }

}


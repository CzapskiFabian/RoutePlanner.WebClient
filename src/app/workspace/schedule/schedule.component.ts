import { EngineerService } from '../../shared/services/workspace/engineers.service';
import { JobSet } from '../../shared/models/jobset.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  constructor(private _engineerService: EngineerService) { }
  jobSets: JobSet[];

  ngOnInit() {
    this.loadJobSets();
    this._engineerService.itemsChanged.subscribe(() => {
      this.loadJobSets();
    })
  }

  private loadJobSets() {
    this.jobSets = new Array<JobSet>();
    for (let engineer of this._engineerService.getAll()) {
      this.jobSets.push(engineer.jobSet);
    }
  }

}


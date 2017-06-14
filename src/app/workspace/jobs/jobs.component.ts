import { JobsService } from '../../shared/services/workspace/jobs.service';
import { Job } from '../../shared/models/job.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {
  jobs: Job[];
  defaultDuration = 90;

  constructor(private _jobsService: JobsService) {
  }

  ngOnInit() {
    this.jobs = this._jobsService.getAll();
    this._jobsService.itemsChanged.subscribe(() => {
      this.jobs = this._jobsService.getAll();
    });
  }


  onDeleteJob(index: number) {
    let id = this.jobs[index]['id'];
    this._jobsService.deleteById(id);
  }
}

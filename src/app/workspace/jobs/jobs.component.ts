import { CustomValidators } from './../../../domain/validators/custom.validators';
import { Job } from '../../../domain/models/job.model';
import { JobsService } from '../../../domain/services/jobs.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {
  private subscription: Subscription;
  jobsForm: FormGroup;

  constructor(private _jobsService: JobsService) { }

  ngOnInit() {
    this.loadJobs();
  }

  loadJobs() {
    let jobItems = new FormArray([]);

    for (let job of this._jobsService.getJobs()) {
      jobItems.push(
        new FormGroup({
          'id': new FormControl(job.id, Validators.required),
          'lat': new FormControl(job.lat, [Validators.required, CustomValidators.Latitude]),
          'lng': new FormControl(job.lng, [Validators.required, CustomValidators.Longitude]),
          'duration': new FormControl(job.duration, Validators.required),
        })
      )
    }  

    this.jobsForm = new FormGroup({
      'jobs': jobItems
    });
  }
  
  getJobs(): FormArray { return this.jobsForm.get('jobs') as FormArray; }

  onDeleteJob(index: number) {
    let id = (<FormArray>this.jobsForm.get('jobs')).controls[index].value['id'];
    (<FormArray>this.jobsForm.get('jobs')).removeAt(index);
    this._jobsService.deleteJobById(id);
  }

  onAddJob() {
    (<FormArray>this.jobsForm.get('jobs')).push(
        new FormGroup({
          'id': new FormControl(null, Validators.required),
          'lat': new FormControl(null, [Validators.required, CustomValidators.Latitude]),
          'lng': new FormControl(null, [Validators.required, CustomValidators.Longitude]),
          'duration': new FormControl(null, Validators.required),
        }));
    this._jobsService.addJob(new Job(null, null, null, null, null, null));
  }
}

import { ErrorCode, ErrorCodesHandler } from '../../shared/errors/error-code';
import { MarkerStatus } from '../../shared/models/markerStatus.enum';
import { CustomValidators } from '../../shared/validators/custom.validators';
import { JobsService } from '../../shared/services/jobs.service';
import { Job } from '../../shared/models/job.model';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {
   jobs: Job[];
  form: FormGroup;

  constructor(private _jobsService: JobsService) { }

  ngOnInit() {
    this.form = new FormGroup({
      'newName': new FormControl(null, [Validators.required, this.uniqueId.bind(this)]),
      'newLat': new FormControl(null, [Validators.required, CustomValidators.Latitude]),
      'newLng': new FormControl(null, [Validators.required, CustomValidators.Longitude]),
      'newDuration': new FormControl(null, [Validators.required]),
    });


    this.jobs = this._jobsService.getAll();
    this._jobsService.itemsChanged.subscribe(() => {
      this.jobs = this._jobsService.getAll();
    });
  }

  onDeleteJob(index: number) {
    let id = this.jobs[index]['id'];
    this._jobsService.deleteById(id);
  }

  onSubmit() {
    this._jobsService.add(new Job(null, MarkerStatus.Plotting, 90, this.form.value['newLat'], this.form.value['newLng']));
  }

  uniqueId(control: FormControl): { [s: string]: boolean } {
        if (!this._jobsService.containsKey(control.value)) {
            return null;
        } else {
            let message: string = ErrorCodesHandler.getErrorMessage(ErrorCode.DuplicateEngineerId);
            return { message : true };
        }
    }
}

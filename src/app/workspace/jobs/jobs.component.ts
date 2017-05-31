import { GoogleMapsService } from '../../shared/services/map/google-maps.service';
import { JobsService } from '../../shared/services/workspace/jobs.service';
import { SidebarBaseComponent } from '../shared/sidebar-base.component';
import { ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ErrorCode } from '../../shared/enums/error-code.enum';
import { CustomValidators } from '../../shared/validators/custom.validators';
import { Job } from '../../shared/models/job.model';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
declare var google: any;

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent extends SidebarBaseComponent<JobsService> implements OnInit {
  jobs: Job[];
  form: FormGroup;
  defaultDuration = 90;
  @ViewChild('newAddress') newAddress;

  constructor(private _jobsService: JobsService, protected _googleMapsService: GoogleMapsService) {
    super(_jobsService, _googleMapsService);
  }

  ngOnInit() {
    this.form = new FormGroup({
      'newId': new FormControl({ value: null, disabled: true }, [Validators.required]),
      'newAddress': new FormControl(null, [Validators.required]),
      'newDuration': new FormControl(90, [Validators.required]),
    });

    super.setAutocomplete(this.newAddress.nativeElement, this.form.controls['newAddress']);

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
    super.add(new Job(this.newAddress.nativeElement.value, 90, null, null));

  }

  getNextId() {
    return this._jobsService.speculateNextId();
  }

}

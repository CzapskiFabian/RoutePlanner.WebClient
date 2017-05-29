import { ViewChild } from '@angular/core';
import { GoogleMapsService } from './../../shared/services/google-maps.service';
import { Observable } from 'rxjs/Rx';
import { ErrorCode } from '../../shared/enums/error-code.enum';
import { ErrorCodesHandler } from '../../shared/errors/error-code';
import { CustomValidators } from '../../shared/validators/custom.validators';
import { JobsService } from '../../shared/services/jobs.service';
import { Job } from '../../shared/models/job.model';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
declare var google: any;

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {
  jobs: Job[];
  form: FormGroup;
  defaultDuration=90;
  @ViewChild('newAddress') newAddress;

  constructor(private _jobsService: JobsService, private _googleMapsService: GoogleMapsService) { }

  ngOnInit() {
    this.setAutocomplete();
    this.form = new FormGroup({
      'newId': new FormControl({ value: null, disabled: true }, [Validators.required]),
      'newAddress': new FormControl(null, [Validators.required], this.placeValidation.bind(this)),
      'newDuration': new FormControl(90, [Validators.required]),
    });


    this.jobs = this._jobsService.getAll();
    this._jobsService.itemsChanged.subscribe(() => {
      this.jobs = this._jobsService.getAll();
    });
  }

  setAutocomplete() {
    let autocomplete = new google.maps.places.Autocomplete(this.newAddress.nativeElement);
  }

  onDeleteJob(index: number) {
    let id = this.jobs[index]['id'];
    this._jobsService.deleteById(id);
  }

  onSubmit() {
    this._googleMapsService.geocodeAddress(this.newAddress.nativeElement.value)
      .then((result: any) => {
        this._jobsService.add(new Job(this.newAddress.nativeElement.value, this.form.value['newDuration'], result.geometry.location.lat(), result.geometry.location.lng()));
      })
      .catch(() => {
        console.log("Catch error");
      });
  }

  getNextId() {
    return this._jobsService.speculateNextId();
  }

  placeValidation(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      this._googleMapsService.geocodeAddress(control.value)
        .then(() => {
          resolve(null);
        })
        .catch(() => {
          resolve({ "invalid": true });
        })
    });
    return promise;
  }
}

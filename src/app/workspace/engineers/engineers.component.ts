import { LocationPoint } from '../../shared/models/location-point.model';
import { Observable, Subject } from 'rxjs/Rx';
import { ViewChild } from '@angular/core';
import { GoogleMapsService } from '../../shared/services/google-maps.service';
import { Engineer } from '../../shared/models/engineer.model';
import { EngineerService } from '../../shared/services/engineers.service';
import { CustomValidators } from '../../shared/validators/custom.validators';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

declare var google: any;


@Component({
  selector: 'app-engineers',
  templateUrl: './engineers.component.html',
  styleUrls: ['./engineers.component.css']
})
export class EngineersComponent implements OnInit {
  engineers: Engineer[];
  form: FormGroup;
  @ViewChild('newAddress') newAddress;

  constructor(private _engineersService: EngineerService, private _googleMapsService: GoogleMapsService) { }

  ngOnInit() {
    this.setAutocomplete();
    this.form = new FormGroup({
      'newId': new FormControl({value: null, disabled:true}, [Validators.required]),
      'newAddress': new FormControl(null, [Validators.required], this.placeValidation.bind(this)),
    });

    this.engineers = this._engineersService.getAll();
    this._engineersService.itemsChanged.subscribe(() => {
      this.engineers = this._engineersService.getAll();
    });
  }

  setAutocomplete() {
    let autocomplete = new google.maps.places.Autocomplete(this.newAddress.nativeElement);
  }

  onDeleteEngineer(index: number) {
    let id = this.engineers[index]['id'];
    this._engineersService.deleteById(id);
  }

  onSubmit() {
    this._googleMapsService.geocodeAddress(this.newAddress.nativeElement.value)
      .then((result: any) => {
        this._engineersService.add(new Engineer(this.newAddress.nativeElement.value, result.geometry.location.lat(), result.geometry.location.lng(), result.geometry.location.lat(), result.geometry.location.lng()));
      })
      .catch(() => {
        console.log("Catch error");
      });
  }

  getNextId(){
    return this._engineersService.speculateNextId();
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

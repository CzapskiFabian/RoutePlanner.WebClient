import { SidebarBaseComponent } from '../shared/sidebar-base.component';
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
export class EngineersComponent extends SidebarBaseComponent<EngineerService> implements OnInit {
  engineers: Engineer[];
  form: FormGroup;
  chosenPlace: any;
  @ViewChild('newAddress') newAddress;

  constructor(protected _engineersService: EngineerService, protected _googleMapsService: GoogleMapsService) {
    super(_engineersService, _googleMapsService);

  }

  ngOnInit() {
    
    this.form = new FormGroup({
      'newId': new FormControl({ value: null, disabled: true }, [Validators.required]),
      'newAddress': new FormControl(null, [Validators.required]),
    });
    super.setAutocomplete(this.newAddress.nativeElement, this.form.controls['newAddress']);
    
    this.engineers = this._engineersService.getAll();
    this._engineersService.itemsChanged.subscribe(() => {
      this.engineers = this._engineersService.getAll();
    });
  }


  onDeleteEngineer(index: number) {
    let id = this.engineers[index]['id'];
    super.deleteById(id);
  }

  onSubmit() {
    super.add(new Engineer(this.newAddress.nativeElement.value, null, null, null, null));

  }

  getNextId() {
    return this._engineersService.speculateNextId();
  }


}

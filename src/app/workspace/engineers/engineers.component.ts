import { CustomValidators } from '../../../domain/validators/custom.validators';
import { Engineer } from '../../../domain/models/engineer.model';
import { Subscription } from 'rxjs/Rx';
import { EngineerService } from '../../../domain/services/engineers.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-engineers',
  templateUrl: './engineers.component.html',
  styleUrls: ['./engineers.component.css']
})
export class EngineersComponent implements OnInit {
  private subscription: Subscription;
  engineerForm: FormGroup;

  constructor(private _engineersService: EngineerService) { }

  ngOnInit() {
    this.loadEngineers();
  }


  loadEngineers() {
    let engineerItems = new FormArray([]);

    for (let engineer of this._engineersService.getEngineers()) {
      engineerItems.push(
        new FormGroup({
          'id': new FormControl(engineer.id, Validators.required),
          'lat': new FormControl(engineer.lat, [Validators.required, CustomValidators.Latitude]),
          'lng': new FormControl(engineer.lng, [Validators.required, CustomValidators.Longitude]),
        })
      )
    }

    this.engineerForm = new FormGroup({
      'engineers': engineerItems
    });

    this.engineerForm.valueChanges.subscribe(()=>console.log('ccc'));
  }

  getEngineers(): FormArray { return this.engineerForm.get('engineers') as FormArray; }

  onDeleteEngineer(index: number) {
    let id = (<FormArray>this.engineerForm.get('engineers')).controls[index].value['id'];
    (<FormArray>this.engineerForm.get('engineers')).removeAt(index);
    this._engineersService.deleteEngineerById(id);
  }

  onAddEngineer() {
    (<FormArray>this.engineerForm.get('engineers')).push(
        new FormGroup({
          'id': new FormControl(null, Validators.required),
          'lat': new FormControl(null, [Validators.required, CustomValidators.Latitude]),
          'lng': new FormControl(null, [Validators.required, CustomValidators.Longitude]),
        }));
    this._engineersService.addEngineer(new Engineer(null, null, null, null, null));
  }
}

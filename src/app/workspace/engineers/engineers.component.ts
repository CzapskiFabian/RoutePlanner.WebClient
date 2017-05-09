import { ErrorCode, ErrorCodesHandler } from '../../../domain/errors/error-code';
import { EngineerService } from '../../../domain/services/engineers.service';
import { Engineer } from '../../../domain/models/engineer.model';
import { MarkerStatus } from '../../../domain/models/markerStatus.enum';
import { CustomValidators } from '../../../domain/validators/custom.validators';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-engineers',
  templateUrl: './engineers.component.html',
  styleUrls: ['./engineers.component.css']
})
export class EngineersComponent implements OnInit {
  engineers: Engineer[];
  form: FormGroup;

  constructor(private _engineersService: EngineerService) { }

  ngOnInit() {
    this.form = new FormGroup({
      'newId': new FormControl(null, [Validators.required, this.uniqueId.bind(this)]),
      'newLat': new FormControl(null, [Validators.required, CustomValidators.Latitude]),
      'newLng': new FormControl(null, [Validators.required, CustomValidators.Longitude]),
    });


    this.engineers = this._engineersService.getAll();
    this._engineersService.itemsChanged.subscribe(() => {
      this.engineers = this._engineersService.getAll();
    });
  }

  onDeleteEngineer(index: number) {
    let id = this.engineers[index]['id'];
    this._engineersService.deleteById(id);
  }

  onSubmit() {
    this._engineersService.add(new Engineer(this.form.value['newId'], null, MarkerStatus.Plotting, this.form.value['newLat'], this.form.value['newLng']));
  }

  uniqueId(control: FormControl): { [s: string]: boolean } {
        if (!this._engineersService.containsKey(control.value)) {
            return null;
        } else {
            let message: string = ErrorCodesHandler.getErrorMessage(ErrorCode.DuplicateEngineerId);
            return { message : true };
        }
    }
}

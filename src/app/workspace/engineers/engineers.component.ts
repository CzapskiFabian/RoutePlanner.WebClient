import { Engineer } from '../../shared/models/engineer.model';
import { MarkerStatus } from '../../shared/models/markerStatus.enum';
import { EngineerService } from '../../shared/services/engineers.service';
import { CustomValidators } from '../../shared/validators/custom.validators';
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
      'newName': new FormControl(null, [Validators.required]),
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
    this._engineersService.add(new Engineer(null, MarkerStatus.Plotting, this.form.value['newLat'], this.form.value['newLng'],  this.form.value['newLat'], this.form.value['newLng']));
  }
}

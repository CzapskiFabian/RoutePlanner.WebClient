import { Engineer } from '../../shared/models/engineer.model';
import { EngineerService } from '../../shared/services/workspace/engineers.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-engineers',
  templateUrl: './engineers.component.html',
  styleUrls: ['./engineers.component.css']
})
export class EngineersComponent implements OnInit {
  engineers: Engineer[];

  constructor(protected _engineersService: EngineerService) {

  }

  ngOnInit() {

    this.engineers = this._engineersService.getAll();
    this._engineersService.itemsChanged.subscribe(() => {
      this.engineers = this._engineersService.getAll();
    });
  }

  onDeleteEngineer(index: number) {
    let id = this.engineers[index]['id'];
    this._engineersService.deleteById(id);
  }

}

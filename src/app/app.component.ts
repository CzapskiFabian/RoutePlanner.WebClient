import { RequestService } from './shared/services/request.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private _requestService: RequestService){}
  onSubmit(){
    this._requestService.submitData();
  }
}

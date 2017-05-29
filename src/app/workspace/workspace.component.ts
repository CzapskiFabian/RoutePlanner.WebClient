import { GoogleMapsService } from './../shared/services/google-maps.service';
import { GreedyAlgorithmService } from './../shared/services/Algorithm/greedy-algorithm.service';
import { JobsService } from './../shared/services/jobs.service';
import { EngineerService } from './../shared/services/engineers.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})
export class WorkspaceComponent implements OnInit {

  constructor(private _engineerService:EngineerService, private _jobService:JobsService, private _algorithm:GreedyAlgorithmService, private _g: GoogleMapsService) { }
  ngOnInit() {
    // this._g.geocodeCoordinates({lat:51.9876, lng:0.8878})
    // .then((res)=>{
    //   console.log(res);
    // })
    this._engineerService.itemsChanged.subscribe(()=>{
      this._algorithm.solve();
    });
    this._jobService.itemsChanged.subscribe(()=>{
      this._algorithm.solve();
    });
   
  }




}

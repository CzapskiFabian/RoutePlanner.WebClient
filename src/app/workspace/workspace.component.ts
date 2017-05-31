import { DistanceMatrix } from '../shared/models/distance-matrix.model';
import { GoogleMapsService } from '../shared/services/map/google-maps.service';
import { EngineerService } from '../shared/services/workspace/engineers.service';
import { JobsService } from '../shared/services/workspace/jobs.service';
import { GreedyAlgorithmService } from './../shared/services/Algorithm/greedy-algorithm.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})
export class WorkspaceComponent implements OnInit {

  constructor(private _engineerService: EngineerService, private _jobService: JobsService, private _algorithm: GreedyAlgorithmService, private _g: GoogleMapsService) { }
  matrices: DistanceMatrix[] = new Array<DistanceMatrix>();
  ngOnInit() {

    // let origins: LocationPoint[] = [{ lat: 51.0000, lng: 0.000, address: null }, { lat: 52.0000, lng: 0.000, address: null }, { lat: 53.0000, lng: 0.000, address: null }];
    // var destinations: LocationPoint[] = [{ lat: 51.0000, lng: 1.000, address: null }, { lat: 52.0000, lng: 1.000, address: null }];

    // this._g.getDistanceMatrix(origins, destinations).then((response) => {
    //   this.matrices.push(response);
    //   console.log(this.matrices);
    // });
    this._algorithm.solve();
    
    this._engineerService.itemsChanged.subscribe(() => {
      setTimeout(() => {
        this._algorithm.solve();
      }, 1000);
    });
    this._jobService.itemsChanged.subscribe(() => {
      setTimeout(() => {
        this._algorithm.solve();
      }, 1000);
    });

  }




}

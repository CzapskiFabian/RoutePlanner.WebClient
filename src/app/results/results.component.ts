import { EngineerService } from '../shared/services/engineers.service';
import { JobsService } from '../shared/services/jobs.service';
import { Marker } from '../shared/models/marker.model';

import { Component, OnInit } from '@angular/core';
import { AgmCoreModule } from 'angular2-google-maps/core';
@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent {
  
 title: string = 'My first angular2-google-maps project';
  lat = 51.529865;
  lng = -0.128092;

  markers: Marker[] = [];
  constructor(private _jobsService: JobsService, private _engineersService: EngineerService) { }

  ngOnInit() {
    this.loadMarkers();

    this._engineersService.itemsChanged.subscribe(() => {
      this.loadMarkers();
    })
    this._jobsService.itemsChanged.subscribe(() => {
      this.loadMarkers();
    })
  }

  loadMarkers() {
    this.markers = [];
    for (let job of this._jobsService.getAll()) {
      this.markers.push(
        {
          name: "Job-" + job.id,
          lat: job.lat,
          lng: job.lng,
          draggable: false
        });
    }
    for (let engineer of this._engineersService.getAll()) {
      this.markers.push(
        {
          name: "Eng-" + engineer.id,
          lat: engineer.lat,
          lng: engineer.lng,
          draggable: false
        });
    }
  }
}

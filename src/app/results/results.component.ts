import { Marker } from '../../domain/models/marker.model';
import { EngineerService } from '../../domain/services/engineers.service';
import { JobsService } from '../../domain/services/jobs.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  title: string = 'My first angular2-google-maps project';
  lat = 51.529865;
  lng = -0.128092;

  markers: Marker[] = [];
  constructor(private _jobsService: JobsService, private _engineersService: EngineerService) { }

  ngOnInit() {
    this.loadMarkers();

    this._engineersService.engineersChanged.subscribe(() => {
      this.loadMarkers();
    })
    this._jobsService.jobsChanged.subscribe(() => {
      this.loadMarkers();
    })
  }

  loadMarkers() {
    this.markers = [];
    for (let job of this._jobsService.getJobs()) {
      this.markers.push(
        {
          name: "Job-" + job.id,
          lat: job.lat,
          lng: job.lng,
          draggable: false
        });
    }
    for (let engineer of this._engineersService.getEngineers()) {
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
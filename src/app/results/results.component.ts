import { Engineer } from '../shared/models/engineer.model';
import { LocationPoint } from '../shared/models/location-point.model';
import { Polyline } from './../shared/models/polyline.model';
import { JobSetService } from './../shared/services/jobset.service';
import { GreedyAlgorithmService } from './../shared/services/Algorithm/greedy-algorithm.service';
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
  polling = false;
  sessionId = "";

  markers: Marker[];
  polylines: Polyline[];

  constructor(private _jobsService: JobsService, private _engineersService: EngineerService, private _greedyAlgorithmService: GreedyAlgorithmService, private _jobSetService: JobSetService) { }

  ngOnInit() {
    this.drawMap();

    this._engineersService.itemsChanged.subscribe(() => {
      this.drawMap();
    })
    this._jobsService.itemsChanged.subscribe(() => {
      this.drawMap();
    })
  }

  private drawMap() {
    this._greedyAlgorithmService.run();
    this.loadMarkers();
    this.loadPolylines();
  }

  private loadPolylines() {
    this.polylines = [];

    for (let engineer of this._engineersService.getAll()) {
      let polyline = new Polyline(new Array<LocationPoint>());
      polyline.points.push(...this.getPolyPointsForEngineer(engineer));
      this.polylines.push(polyline);
    }
  }

  private getPolyPointsForEngineer(engineer: Engineer): LocationPoint[] {
    let points: LocationPoint[] = [];
    let job_set = this._jobSetService.get(engineer.id)

    if (job_set && job_set.jobSetItems) {

      // First point
      points.push({ latitude: engineer.latitude, longitude: engineer.longitude })

      for (let jobSetItem of job_set.jobSetItems) {
        points.push({latitude: jobSetItem.job.latitude, longitude: jobSetItem.job.longitude});
      }

      // Come back home point
      points.push({ latitude: engineer.homeLatitude, longitude: engineer.homeLongitude })

      return points;
    }
  }

  private loadMarkers() {
    this.markers = [];
    for (let job of this._jobsService.getAll()) {
      this.markers.push(
        {
          name: "Job-" + job.id,
          latitude: job.latitude,
          longitude: job.longitude,
          draggable: false,
          imagePath:"../../assets/images/redMarker.png"
        });
    }
    for (let engineer of this._engineersService.getAll()) {
      this.markers.push(
        {
          name: "Eng-" + engineer.id,
          latitude: engineer.latitude,
          longitude: engineer.longitude,
          draggable: false,
          imagePath:"../../assets/images/blueMarker.png"
        });
    }
    console.log(this._jobSetService.getAll());
  }


}

import { EngineerService } from '../shared/services/workspace/engineers.service';
import { GoogleMapsService } from '../shared/services/map/google-maps.service';
import { Component, OnInit, ViewChild } from '@angular/core';
declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  constructor(private _engineerService: EngineerService, private _googleMapsService: GoogleMapsService) { }
  @ViewChild('mymap') mymap;

  ngOnInit() {
    this._googleMapsService.drawMap(this.mymap.nativeElement, []);

    this._engineerService.jobsetsReady.subscribe(() => {
      this._googleMapsService.drawMap(this.mymap.nativeElement, this._engineerService.getGoogleMapRoutes());
    })
  }



}

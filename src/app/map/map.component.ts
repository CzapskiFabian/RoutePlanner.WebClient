import { Engineer } from '../shared/models/engineer.model';
import { Job } from '../shared/models/job.model';
import { JobsService } from '../shared/services/workspace/jobs.service';
import { GoogleMapsRoute } from '../shared/models/google-maps-route.model';
import { GoogleMapsService } from '../shared/services/map/google-maps.service';
import { EngineerService } from '../shared/services/workspace/engineers.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  constructor(private _engineerService: EngineerService, private _jobService: JobsService, private _googleMapsService: GoogleMapsService) { }
  @ViewChild('mymap') mymap;
  @ViewChild('newAddress') newAddress;
  @ViewChild('pacCard') pacCard;
  entries = [
    {
      id: "job",
      description: "New Job"
    },
    {
      id: "engineer",
      description: "New Engineer"
    },
  ];
  selectedEntry = "job";
  selectedPlace;
  form: FormGroup;


  ngOnInit() {

    this._engineerService.jobsetsReady.subscribe(() => {
      this.initMap(this._engineerService.getGoogleMapRoutes());
    })

    this.form = new FormGroup({
      'newAddress': new FormControl(null, [Validators.required]),
    });

    this.initMap(this._engineerService.getGoogleMapRoutes());
  }

  initMap(routes: GoogleMapsRoute[]) {
    var directionDisplay;
    var directionsService = new google.maps.DirectionsService();

    var mapElement = this.mymap.nativeElement;
    var autocompleteNativeElement = this.newAddress.nativeElement;


    var start = new google.maps.LatLng(51.47482547819850, -0.37739553384529);
    var myOptions = {
      zoom: 7,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      center: start
    }

    var map = new google.maps.Map(mapElement, myOptions);


    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(this.pacCard.nativeElement);

    let autocomplete = new google.maps.places.Autocomplete(autocompleteNativeElement);
    autocomplete.bindTo('bounds', map);

    var marker = new google.maps.Marker({
      map: map,
      anchorPoint: new google.maps.Point(0, -29),
    });

    google.maps.event.addListener(autocomplete, `place_changed`, () => {
      // marker = null;
      this.selectedPlace = autocomplete.getPlace();

      if (!this.selectedPlace.geometry) {

        return;
      } else {
        marker.setPosition(this.selectedPlace.geometry.location);
        marker.setVisible(true);
      }
    });



    function renderDirections(result) {
      var directionsRenderer = new google.maps.DirectionsRenderer();
      directionsRenderer.setMap(map);
      directionsRenderer.setDirections(result);
    }

    function requestDirections(start, end, myWaypoints) {
      directionsService.route({
        origin: start,
        destination: end,
        waypoints: myWaypoints,
        travelMode: google.maps.DirectionsTravelMode.DRIVING
      }, function (result) {
        renderDirections(result);
      });
    }
    for (let route of routes) {
      requestDirections(route.start, route.end, route.waypoints);
    }
  }


  onSelectionChange(entry) {
    this.selectedEntry = entry.id;
  }

  onAddClicked() {
    if (this.selectedPlace != null) {
      if (this.selectedEntry === "job") {
        this._jobService.add(
          new Job(
            this.selectedPlace.formatted_address,
            90,
            this.selectedPlace.geometry.location.lat(),
            this.selectedPlace.geometry.location.lng()));
      } else if (this.selectedEntry === "engineer") {
        this._engineerService.add(
          new Engineer(
            this.selectedPlace.formatted_address,
            this.selectedPlace.geometry.location.lat(),
            this.selectedPlace.geometry.location.lng(),
            this.selectedPlace.geometry.location.lat(),
            this.selectedPlace.geometry.location.lng()));

      }
    }
  }

  public ngAfterViewInit(): void {
    $(function () {
      $("#pac-card").draggable();
    });
  }



}

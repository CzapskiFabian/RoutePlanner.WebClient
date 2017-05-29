import { GoogleMapsRoute } from '../models/google-maps-route.model';
import { StatusCode } from '../enums/status-code.enum';
import { DistanceMatrix } from '../models/distance-matrix.model';
import { Result } from '../models/result.model';
import { IGoogleMaps } from './interfaces/google-maps.interface';
import { LocationPoint } from './../models/location-point.model';
import { NgZone } from '@angular/core';
import { Injectable } from '@angular/core';
import { MapsAPILoader } from 'angular2-google-maps/core';
import { Observable } from 'rxjs/Rx';
import * as Collections from 'typescript-collections';



declare var google: any;

@Injectable()
export class GoogleMapsService implements IGoogleMaps {


    private cachedDistances: Collections.Dictionary<string, number> = new Collections.Dictionary<string, number>();
    private geocoder: any;

    constructor() {

    }
    public getDistanceMatrix(locationsA: LocationPoint[], locationsB: LocationPoint[]): Result<DistanceMatrix> {
        var service = new google.maps.DistanceMatrixService();
        return service.getDistanceMatrix(
            {
                origins: locationsA,
                destinations: locationsB,
                travelMode: 'DRIVING',
                unitSystem: google.maps.UnitSystem.METRIC,
                avoidHighways: false,
                avoidTolls: false,
            }, function (response, status) {
                if (status !== 'OK') {
                    alert('Error was: ' + status);
                } else {
                    console.log("getDistanceMatrix:");
                    console.log(response);
                }
            });
    }

    public getDistance(locationA: LocationPoint, locationB: LocationPoint): Result<number> {
        throw new Error('Not implemented yet.');
    }

    public drawMap(mapElement: any, routes: GoogleMapsRoute[]): Result<void> {
        console.log("Draw Map");
        var directionDisplay;
        var directionsService = new google.maps.DirectionsService();
        var map;

        var start = new google.maps.LatLng(51.47482547819850, -0.37739553384529);
        var myOptions = {
            zoom: 7,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            center: start
        }
        map = new google.maps.Map(mapElement, myOptions);

        function renderDirections(result) {
            var directionsRenderer = new google.maps.DirectionsRenderer();
            directionsRenderer.setMap(map);
            directionsRenderer.setDirections(result);
        }

        function requestDirections(start, end, myWaypoints) {
            console.log("Request Directions");
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
        return new Result(StatusCode.Ok);
    }

    geocodeCoordinates(locationPoint: LocationPoint): Promise<any> {
        console.log("geocodeCoordinates");
        
        var latlng = new google.maps.LatLng(locationPoint.lat, locationPoint.lng);
        const promise = new Promise<any>((resolve, reject) => {
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'latLng': latlng }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    resolve(results[0]);
                } else {
                    console.log(status);
                    reject();
                }
            });
        })
        return promise;
    }

    geocodeAddress(address: string): Promise<any> {
        console.log("geocodeAddress");
        
        const promise = new Promise<any>((resolve, reject) => {
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'address': address }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    resolve(results[0]);
                } else {
                    reject();
                }
            });
        })

        return promise;
    }


    // getAddress(location: LocationPoint) {
    //     this.geocoder.geocode({ 'location': { lat: location.latitude, lng: location.longitude } }, function (results, status) {
    //         if (status == google.maps.GeocoderStatus.OK) {
    //             console.log("getAddress (" + location + ") returned: ");
    //             var latitude = results[0].geometry.location.lat();
    //             var longitude = results[0].geometry.location.lng();
    //         }
    //     });
    // }


}


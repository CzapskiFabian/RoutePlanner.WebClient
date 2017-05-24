import { LocationPoint } from './../models/location-point.model';
import { NgZone } from '@angular/core';
import { Injectable } from '@angular/core';
import { MapsAPILoader } from 'angular2-google-maps/core';
import { Observable } from 'rxjs/Rx';
import * as Collections from 'typescript-collections';



declare var google: any;

@Injectable()
export class GoogleMapsService {
    private cachedDistances: Collections.Dictionary<string, number> = new Collections.Dictionary<string, number>();
    private geocoder: any;

    constructor() {
        // this._loader.load().then(() => {
        //     var geocoder = new google.maps.Geocoder();
        // });
    }

     getLatLan(address: string){
            // var geocoder = new google.maps.Geocoder();
            // geocoder.geocode({ 'address': address }, function (results, status) {
            //     if (status == google.maps.GeocoderStatus.OK) {
            //         var latitude = results[0].geometry.location.lat();
            //         var longitude = results[0].geometry.location.lng();

            //     }
            // });
    }

    getDistance(origin: LocationPoint, destination: LocationPoint): number {
        // this.fetchDistances();
        return 0;
        // if (this.distanceCached(origin, destination)) {
        //     return this.retrieveFromCache(origin, destination);
        // } else {
        //     let distance = this.fetchDistance(origin, destination);
        //     this.cacheDistance(origin, destination, distance);
        //     return distance;
        // }
    }

    // getDistanceMatrix() {
    //     // this._loader.load().then(() => {
    //         var origin1 = new google.maps.LatLng(55.930385, -3.118425);
    //         var origin2 = 'Greenwich, England';
    //         var destinationA = 'Stockholm, Sweden';
    //         var destinationB = new google.maps.LatLng(50.087692, 14.421150);
    //         var service = new google.maps.DistanceMatrixService();
    //         service.getDistanceMatrix(
    //             {
    //                 origins: [origin1, origin2],
    //                 destinations: [destinationA, destinationB],
    //                 travelMode: 'DRIVING',
    //                 unitSystem: google.maps.UnitSystem.METRIC,
    //                 avoidHighways: false,
    //                 avoidTolls: false,
    //             }, function (response, status) {
    //                 if (status !== 'OK') {
    //                     alert('Error was: ' + status);
    //                 } else {
    //                     console.log("getDistanceMatrix:");
    //                     console.log(response);
    //                 }
    //             });
    //     // });


    // }
    // getAddress(location: LocationPoint) {
    //     this.geocoder.geocode({ 'location': { lat: location.latitude, lng: location.longitude } }, function (results, status) {
    //         if (status == google.maps.GeocoderStatus.OK) {
    //             console.log("getAddress (" + location + ") returned: ");
    //             var latitude = results[0].geometry.location.lat();
    //             var longitude = results[0].geometry.location.lng();
    //         }
    //     });
    // }
   

    // private retrieveFromCache(origin: LocationPoint, destination: LocationPoint) {
    //     let key = this.ConstructSmartKey(origin, destination);
    //     let key2 = this.ConstructSmartKey(destination, origin);
    //     return this.cachedDistances[key] ? this.cachedDistances[key] : this.cachedDistances[key2]
    // }

    // private cacheDistance(origin: LocationPoint, destination: LocationPoint, distance: number) {
    //     this.cachedDistances.setValue(this.ConstructSmartKey(origin, destination), distance);
    //     this.cachedDistances.setValue(this.ConstructSmartKey(destination, origin), distance);
    // }
    // private distanceCached(origin: LocationPoint, destination: LocationPoint): boolean {
    //     return this.cachedDistances.containsKey(this.ConstructSmartKey(origin, destination)) ||
    //         this.cachedDistances.containsKey(this.ConstructSmartKey(destination, origin))
    // }

    // private fetchDistances() {
    //     var origin1 = { lat: 55.93, lng: -3.118 };
    //     var origin2 = 'Greenwich, England';
    //     var destinationA = 'Stockholm, Sweden';
    //     var destinationB = { lat: 50.087, lng: 14.421 };

    //     var geocoder = new google.maps.Geocoder;

    //     var service = new google.maps.DistanceMatrixService;
    //     service.getDistanceMatrix({
    //         origins: [origin1, origin2],
    //         destinations: [destinationA, destinationB],
    //         travelMode: 'DRIVING',
    //         unitSystem: google.maps.UnitSystem.METRIC,
    //         avoidHighways: false,
    //         avoidTolls: false
    //     }, function (response, status) {
    //         if (status !== 'OK') {
    //             alert('Error was: ' + status);
    //         } else {
    //             var originList = response.originAddresses;
    //             var destinationList = response.destinationAddresses;

    //             for (var i = 0; i < originList.length; i++) { }

    //             for (var i = 0; i < originList.length; i++) {
    //                 var results = response.rows[i].elements;
    //                 for (var j = 0; j < results.length; j++) {
    //                     console.log(originList[i] + ' to ' + destinationList[j] +
    //                         ': ' + results[j].distance.text + ' in ' +
    //                         results[j].duration.text);
    //                 }
    //             }
    //         }
    //     });

    // }


    // private ConstructSmartKey(locationA: LocationPoint, locationB: LocationPoint): string {
    //     return locationA.longitude + "/" + locationA.latitude + "|" + locationB.longitude + "/" + locationA.latitude + "/";
    // }
}


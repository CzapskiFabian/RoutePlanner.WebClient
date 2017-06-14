import { StatusCode } from '../../enums/status-code.enum';
import { DistanceMatrix } from '../../models/distance-matrix.model';
import { GoogleMapsRoute } from '../../models/google-maps-route.model';
import { LocationPoint } from '../../models/location-point.model';
import { Result } from '../../models/result.model';
import { IGoogleMaps } from './google-maps.interface';
import { Injectable } from '@angular/core';
import * as Collections from 'typescript-collections';



declare var google: any;

@Injectable()
export class GoogleMapsService implements IGoogleMaps {


    private cachedDistances: Collections.Dictionary<string, number> = new Collections.Dictionary<string, number>();
    private geocoder: any;

    constructor() {

    }
    public getDistanceMatrix(locationsA: LocationPoint[], locationsB: LocationPoint[]): Promise<DistanceMatrix> {
        const promise = new Promise<any>((resolve, reject) => {

            var service = new google.maps.DistanceMatrixService();
            service.getDistanceMatrix(
                {
                    origins: locationsA,
                    destinations: locationsB,
                    travelMode: 'DRIVING',
                    unitSystem: google.maps.UnitSystem.METRIC,
                    avoidHighways: false,
                    avoidTolls: false,
                }, function (response, status) {
                    if (status !== 'OK') {
                        reject('Error was: ' + status);
                    } else {
                        resolve(response);
                    }
                });
        })
        return promise;
    }

    public getDistance(locationA: LocationPoint, locationB: LocationPoint): Result<number> {
        throw new Error('Not implemented yet.');
    }
    
    geocodeCoordinates(locationPoint: LocationPoint): Promise<any> {
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


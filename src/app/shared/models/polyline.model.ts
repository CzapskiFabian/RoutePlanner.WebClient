import { SebmGoogleMapPolyline } from 'angular2-google-maps/core';
import { LocationPoint } from './location-point.model';
export class Polyline{
    constructor(public points: LocationPoint[]){}
}
import { Observable } from 'rxjs/Observable';
import { ErrorCode } from '../enums/error-code.enum';
import { ErrorCodesHandler } from './../errors/error-code';
import { FormControl } from '@angular/forms';

export class CustomValidators {
    static Latitude(control: FormControl): { [s: string]: boolean } {
        if (control.value >= -90 && control.value <= 90) {
            return null;
        } else {
            let message: string = ErrorCodesHandler.getErrorMessage(ErrorCode.LatitudeOutOfRange);
            return { message: true };
        }
    }

    static Longitude(control: FormControl): { [s: string]: boolean } {
        if (control.value >= -180 && control.value <= 180) {
            return null;
        } else {
            let message: string = ErrorCodesHandler.getErrorMessage(ErrorCode.LongitudeOutOfRange);
            return { message: true };
        }
    }

    // static placeValidation(control: FormControl): Promise<any> | Observable<any> {
    //     const promise = new Promise<any>((resolve, reject) => {
    //         this._googleMapsService.geocodeAddress(control.value)
    //             .then(() => {
    //                 resolve(null);
    //             })
    //             .catch(() => {
    //                 resolve({ "invalid": true });
    //             })
    //     });
    //     return promise;
    // }
}

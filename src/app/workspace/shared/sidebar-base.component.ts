import { Subject } from 'rxjs/Rx';
import { LocationPoint } from '../../shared/models/location-point.model';
import { ItemListService } from '../../shared/services/workspace/generic-item-list.service.';
import { GoogleMapsService } from '../../shared/services/map/google-maps.service';
import { FormControl } from '@angular/forms';
declare var google: any;


export class SidebarBaseComponent<U extends ItemListService<any>>{

    chosenPlace: any;
    constructor(protected _itemListService: U, protected _googleMapsService: GoogleMapsService) {

    }

    add(newItem: any) {
        if (this.chosenPlace != null) {
            newItem.address = this.chosenPlace.formatted_address;
            newItem.lat = this.chosenPlace.geometry.location.lat();
            newItem.lng = this.chosenPlace.geometry.location.lng();
            this._itemListService.add(newItem);
            this.chosenPlace = null;
        }else{
            new Error('Not implemented yet.'); 
        }

    }

    deleteById(id: string) {
        this._itemListService.deleteById(id);
    }

    setAutocomplete(autocompleteNativeElement: any, autocompleteFormControl: any) {
        let autocomplete = new google.maps.places.Autocomplete(autocompleteNativeElement);
        const autocompleteFormField = autocompleteNativeElement;

        google.maps.event.addListener(autocomplete, `place_changed`, () => {
            const place = autocomplete.getPlace();
            this.updateChosenPlace(place);
        });
    }
    private updateChosenPlace(place: any) {
        this.chosenPlace = place;
    }

}
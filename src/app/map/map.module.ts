import { MapComponent } from './map.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [   
    MapComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    MapComponent
  ],
  providers: [

  ]
})
export class MapModule { }

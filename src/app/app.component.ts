import { Component, AfterViewInit } from '@angular/core';

declare var jBox: any;
declare var google: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    new jBox('Modal', {

      attach: '#myModal',
      width: 220,
      title: 'jBox',
      overlay: false,
      content: 'Drag me around by using the title',
      draggable: 'title',
      repositionOnOpen: false,
      repositionOnContent: false
    });

  }


  ngOnInit() {

  }
}

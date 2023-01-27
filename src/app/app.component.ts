import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environments } from 'src/environments/envrionments';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'mapasApp';

  constructor() {}

  ngOnInit(): void {
    const mapbox = mapboxgl as any;
    mapbox.accessToken = environments.contentful.accesToken;
  }
}

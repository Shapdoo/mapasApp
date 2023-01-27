import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-fullscreen',
  templateUrl: './fullscreen.component.html',
  styleUrls: ['./fullscreen.component.css'],
})
export class FullscreenComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [ -76.93436240601768, -12.068217867333557 ],
      zoom: 18
    });
  }
}

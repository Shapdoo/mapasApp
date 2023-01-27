import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface MarkAndColor {
  color: string;
  marker?: mapboxgl.Marker;
  center?: [number, number];
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styleUrls: ['./marcadores.component.css'],
})
export class MarcadoresComponent implements AfterViewInit {
  
  @ViewChild('map')
  public mapContainer!: ElementRef;

  public map!: mapboxgl.Map;

  public zoomLevel: number = 18;
  public center: [number, number] = [-76.96994158082707, -12.114357313039644];
  public color = '';
  public marks: Array<MarkAndColor> = [];

  constructor() {}

  ngAfterViewInit(): void {
    this.map = new mapboxgl.Map({
      container: this.mapContainer.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel,
    });

    // const markerHtml: HTMLElement = document.createElement('div')
    // markerHtml.innerHTML = 'Hola mundo'

    // const marker = new mapboxgl.Marker({
    //   element: markerHtml
    // }).setLngLat(this.center).addTo(this.map);

    this.readFromLocalStorage();
  }

  deleteMarker(i: number){
    const marksUpdate = this.marks.filter((_, index) => index !== i)
    this.marks[i].marker?.remove()
    this.marks = marksUpdate
    this.saveToLocalStorage()
  }

  addMark() {
    //Crea un nuevo color hexadecimal
    if (this.marks.length >= 10) {
      return;
    }

    this.color = this.colorHex;

    const newMark = new mapboxgl.Marker({
      draggable: true,
      color: this.color,
    })
      .setLngLat(this.center)
      .addTo(this.map);

    this.marks.push({
      marker: newMark,
      color: this.color,
    });

    this.saveToLocalStorage();

    newMark.on('dragend', () => {
      this.saveToLocalStorage()
    })
  }

  goToMark(mark: mapboxgl.Marker) {
    this.map.flyTo({
      center: mark.getLngLat(),
    });
  }

  get colorHex() {
    return '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );
  }

  saveToLocalStorage() {
    const lngLatArr: MarkAndColor[] = [];

    this.marks.forEach((mark) => {
      const color = mark.color;
      const { lng, lat } = mark.marker!.getLngLat();

      lngLatArr.push({
        color,
        center: [lng, lat],
      });
    });

    localStorage.setItem('marks', JSON.stringify(lngLatArr));
  }

  readFromLocalStorage() {
    if (!localStorage.getItem('marks')) {
      return;
    }

    const lngLatArr: MarkAndColor[] = JSON.parse(
      localStorage.getItem('marks')!
    );

    lngLatArr.forEach((mark) => {
      const newMarker = new mapboxgl.Marker({
        color: mark.color,
        draggable: true,
      })
        .setLngLat(mark.center!)
        .addTo(this.map);

      this.marks.push({
        marker: newMarker,
        color: mark.color,
      });

      newMarker.on('dragend', () => {
        this.saveToLocalStorage()
      })
    });
  }
}

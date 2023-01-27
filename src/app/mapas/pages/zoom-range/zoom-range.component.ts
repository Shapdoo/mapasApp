import { Component, ElementRef, ViewChild , AfterViewInit, OnDestroy} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';


@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styleUrls: ['./zoom-range.component.css']
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {

  @ViewChild('map')
  public mapContainer!: ElementRef

  public map!: mapboxgl.Map

  public zoomLevel: number = 18;
  public center: [number, number] = [ -76.96994158082707, -12.114357313039644 ]
  constructor() {
    console.log(this.mapContainer)
   }

  ngAfterViewInit(): void {
    this.map = new mapboxgl.Map({
      container: this.mapContainer.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    });

    this.map.on('zoom', (event) => this.zoomLevel = this.map.getZoom())

    this.map.on('zoomend', (event) => {
      if(this.map.getZoom() > 18){
        this.map.zoomTo( 18 )
      }
    })

    this.map.on('move', (event) => {
      const target = event.target
      const { lng, lat } = target.getCenter()
      this.center = [lng, lat]
    })

  }

  ngOnDestroy(): void {
    this.map.off('zoom', () => {})
    this.map.off('zoomend', () => {})
    this.map.off('move', () => {})
  }

  zoomChange(zoomValue: string){
    this.map.zoomTo(Number(zoomValue))
  }

  zoomIn() {
    this.map.zoomIn({
      animate: true
    })

    this.zoomLevel = this.map.getZoom()
  }

  zoomOut() {
    this.map.zoomOut({
      animate: true
    })

    this.zoomLevel = this.map.getZoom()
  }
}

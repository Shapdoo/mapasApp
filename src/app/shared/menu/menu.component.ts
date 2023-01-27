import { Component } from '@angular/core';
import { MenuItem } from './models/menu.interfaces';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  constructor(){ }

  public menuItems: Array<MenuItem> = [
    {
      name: "full screen",
      route: "/home/fullscreen",
      icon: "fullscreen_exit"
    },
    {
      name: "zoom range",
      route: "/home/zoom-range",
      icon: "swap_horiz"
    },
    {
      name: "marcadores",
      route: "/home/marcadores",
      icon: "pin_drop"
    },
    {
      name: "propiedades",
      route: "/home/propiedades",
      icon: "settings"
    },
  ]

}

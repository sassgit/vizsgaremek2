import { Injectable } from '@angular/core';

export interface IMenuItem {
  delimiter?: boolean;
  link?: string;
  title?: string;
  icon?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  sidebarMenu: IMenuItem[] = [
    {link: '/', title: 'Összesítés', icon: 'fa fa-gear'},
    {link: '/artist', title: 'Művészek', icon: 'fa fa-paint-brush'},
    {link: '/painting', title: 'Festmények', icon: 'fa fa-image'},
    {link: '/photo', title: 'Festményfotók', icon: 'fa fa-camera'},
    {link: '/customer', title: 'Vevők', icon: 'fa fa-address-card'},
    {link: '/order', title: 'Rendelések', icon: 'fa fa-credit-card'},
    {delimiter: true},
    {link: '/user', title: 'Felhaszálók', icon: 'fa fa-user'},
  ];

  constructor() { }
}

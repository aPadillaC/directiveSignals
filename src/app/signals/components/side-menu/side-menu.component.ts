import { Component, signal } from '@angular/core';

interface MenuItem {

  title: string;
  route: string
}

@Component({
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent {

  public menuItems = signal<MenuItem[]>([

    {route: '/signals/counter', title: 'Counter'},
    {route: '/signals/user-info', title: 'Usuario'},
    {route: '/signals/properties', title: 'Mutaciones'}
  ]);

  // --------- Manera tradicional ----------------

  // public menuItems: MenuItem [] = [

  //   {route: '/signals/counter', title: 'Counter'},
  //   {route: '/signals/user-info', title: 'Usuario'},
  //   {route: '/signals/properties', title: 'Mutaciones'}
  // ]
}

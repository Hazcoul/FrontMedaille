import { Component } from '@angular/core';

import { navItems } from './_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
})
export class DefaultLayoutComponent {

  public navItems = navItems;

  constructor() {}

  ngOnInit() {
   this.navItems = navItems.filter(menuItem => {
      if (this.hasAnyAuthority(menuItem?.authorities!)) {
        if (menuItem?.children?.length! > 0) {
          menuItem.children = menuItem.children?.filter(submenuItem => this.hasAnyAuthority(submenuItem?.authorities!));
        }
        return menuItem;
      }
      return null;
      // return menuItem;
    });
  }

  hasAnyAuthority(authorities: string[] | string): boolean {
    let userAutorities = []
    const roles = sessionStorage.getItem('USER_ROLES')! as any;
    userAutorities = roles.split(',');
    if (!userAutorities) {
      return false;
    }
    if (!Array.isArray(authorities)) {
      authorities = [authorities];
    }

    return userAutorities.some((authority: string) => authorities.includes(authority));
  }
}

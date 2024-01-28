import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {AuthentificationService} from "../../services/authentification.service";

@Directive({
  selector: '[appHasAnyAuthority]',
  standalone: true
})
export class HasAnyAuthorityDirective {
  private authorities: string[] = [];
  constructor( private accountService: AuthentificationService,
               private templateRef: TemplateRef<any>,
               private viewContainerRef: ViewContainerRef) { }

  @Input()
  set appHasAnyAuthority(value: string | string[]) {
    this.authorities = typeof value === 'string' ? [value] : value;
    this.updateView();
  }

  private updateView() {
    const hasAnyAuthority = this.accountService.hasAnyAuthority(this.authorities);
    this.viewContainerRef.clear();
    if (hasAnyAuthority) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemCountComponent } from './components/item-count/item-count.component';



@NgModule({
  declarations: [
    ItemCountComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ItemCountComponent
  ]
})
export class SharedModule { }

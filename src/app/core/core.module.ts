import { FilterPipe } from './pipes/filter.pipe';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';




@NgModule({
  declarations: [
    FilterPipe
  ],
  imports: [

  ],
  exports:[
    FilterPipe
  ],
  providers: [],
})
export class CoreModule { }

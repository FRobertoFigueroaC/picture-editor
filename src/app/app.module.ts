import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BasicComponent } from './views/basic/basic.component';
import { RectangleComponent } from './views/rectangle/rectangle.component';

@NgModule({
  declarations: [
    AppComponent,
    BasicComponent,
    RectangleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

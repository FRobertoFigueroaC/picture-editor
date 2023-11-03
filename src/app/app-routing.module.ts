import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicComponent } from './views/basic/basic.component';
import { RectangleComponent } from './views/rectangle/rectangle.component';

const routes: Routes = [
  {
    path: 'points',
    component: BasicComponent
  },
  {
    path: 'rectangle',
    component: RectangleComponent
  },
  {
    path: '**',
    redirectTo: 'basic'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

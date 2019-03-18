import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EventManagerComponent} from './components/event-manager/event-manager.component';

const routes: Routes = [
  {path: '/events', component: EventManagerComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})


export class AppRoutingModule {}
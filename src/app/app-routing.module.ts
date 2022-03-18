import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassesComponent } from './Components/classes/classes.component';
import { HomeComponent } from './Components/home/home.component';

const routes: Routes = [

  {path: '', component: HomeComponent},
  {path: 'classes', component: ClassesComponent},
  {path: 'home', component: HomeComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

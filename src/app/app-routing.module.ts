import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: 'home'
  },
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "fc/home",
    component: HomeComponent
  },
  {
    path: "**",
    redirectTo: window.location.href.indexOf("/fc") > -1 ? "fc/home" : "home",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

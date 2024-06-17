import { ApplicationRef, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { createCustomElement } from '@angular/elements';
import { HomeComponent } from './home/home.component';

@NgModule({
    declarations: [AppComponent, HomeComponent],
    providers: [],
    imports: [BrowserModule, AppRoutingModule]
})
export class AppModule {
    constructor(private injector: Injector){

    }

    ngDoBootstrap(appRef: ApplicationRef){
        if(window.location.href.indexOf("/fc") > -1){ //micro frontend mode ?
            console.log("AAAAAA")
            const ce = createCustomElement(AppComponent, {injector: this.injector});

            customElements.define("fc-element", ce);
        }
        else{// standalone mode ?
            console.log("BBBBBB")
            appRef.bootstrap(AppComponent, "fc-element");
        }
    }
}

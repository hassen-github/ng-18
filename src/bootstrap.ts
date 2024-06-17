import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { bootstrap } from '@angular-architects/module-federation-tools';
import { enableProdMode } from '@angular/core';

if(window.location.href.indexOf("/fc") > -1){// microfentend mode ?
  bootstrap(AppModule, {
    production: environment.production,
    appType: "microfrontend"
  }).then((res)=>{console.log("res = ", res)},(rej)=>{console.log("rej = ", rej)})
}
else{//standalone mode ?
  if(environment.production){
    enableProdMode();
  }

  platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));

}
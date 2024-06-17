import { Component } from '@angular/core';
import { BdwExternalMessage } from './bdw-external-message';

@Component({
  selector: 'fc-element',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  bdwToken: string = "";
  bdwLang: string = "";
  bdwData: any = [];

  constructor(){

    this.bdwToken = window.bdwToken || "";
    this.bdwLang = window.bdwLang || "";
    this.bdwData = window.bdwData || "";

    console.log("this.bdwToken = ", this.bdwToken);

    if(window.bdwTokenSubject){
      window.bdwTokenSubject.subscribe((res: BdwExternalMessage)=>{//Listen to token/lang/data changes
        if(res.bdwToken){
          this.bdwToken = res.bdwToken;
        }
      
        if(res.bdwLang){
          this.bdwLang = res.bdwLang;
        }
        
        if(res.bdwData){
          this.bdwData = res.bdwData;
        }
      });

    }
  }
}

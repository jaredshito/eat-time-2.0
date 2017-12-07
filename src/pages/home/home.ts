import { Component } from '@angular/core';
import { NavController,ModalController } from 'ionic-angular';
// We import the authentication provider to test the log-out function.
import { AuthProvider } from '../../providers/auth/auth';
import firebase from 'firebase';
import { VerKioskoPage } from '../ver-kiosko/ver-kiosko';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
Kioskos=[];
idKiosko="";
  constructor(public navCtrl: NavController, public authProvider: AuthProvider,
              public modalCtrl:ModalController) {

    firebase.database().ref('Kioskos/').on('value', data => {
      if(data.val() != null){
        var datos = data.val();
        var keys = Object.keys(datos)
  
          for(var i = 0; i < keys.length; i++) {
            var k = keys[i];
            
              var datoKiosko = datos[k];
              
              for(var w in datoKiosko){
                  //console.log(datoKiosko[w]);
                  this.Kioskos.push(
                    {
                      Nombre : datoKiosko[w].Nombre,
                      Descripcion : datoKiosko[w].Descripcion,
                      idKiosko : datoKiosko[w].idKiosko
                    }
                  );
                 
            }
            
              
            
          }
      }
    });
  }

  viewCard(Nombre : string,Descripcion : string){
    firebase.database().ref('Kioskos/').on('value', data => {
      if(data.val() != null){
        var datos = data.val();
        var keys = Object.keys(datos)
  
          for(var i = 0; i < keys.length; i++) {
            var k = keys[i];
            
              var datoKiosko = datos[k];
              
              for(var w in datoKiosko){
                if(datoKiosko[w].Nombre == Nombre){
                  
                  
                      this.idKiosko = datoKiosko[w].idKiosko
                      
                      
                    
              }
            }
            
              
            
          }
      }
    });
    let cardview = this.modalCtrl.create(VerKioskoPage, {Nombre : Nombre, Descripcion:Descripcion,idKiosko:this.idKiosko});
    cardview.present();

  }

  

}

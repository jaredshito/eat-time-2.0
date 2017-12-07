import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { HomeVendedorPage } from '../home-vendedor/home-vendedor';

/**
 * Generated class for the AddkioskoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addkiosko',
  templateUrl: 'addkiosko.html',
})
export class AddkioskoPage {
  Kiosko = {Nombre : "", Descripcion : "",Creador : "",idCreador:"",idKiosko:""};
  UserNombre="";
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
    firebase.database().ref('Usuario/'+firebase.auth().currentUser.uid).on('value', data =>{
      if(data.val() != null){
        var datos = data.val();
        var keys = Object.keys(datos)
    
        for(var i = 0; i < keys.length; i++) {
          var k = keys[i];
          
            var dataUsuario = datos[k];
            if(dataUsuario.nombreUsuario){
              this.UserNombre = dataUsuario.nombreUsuario;
            }
        }
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddkioskoPage');
  }
  guardar(){
    let Kiosko = {
      Nombre : this.Kiosko.Nombre,
      Descripcion : this.Kiosko.Descripcion,
      Creador : this.UserNombre,
      IdCreador : firebase.auth().currentUser.uid,
      idKiosko : Date.now()
    }
    firebase.database().ref('Kioskos/Kiosko/'+Kiosko.idKiosko).set(Kiosko);
    this.navCtrl.setRoot(HomeVendedorPage);
  }

}

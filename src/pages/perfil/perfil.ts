import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import firebase from 'firebase';
import { HomePage } from '../home/home';
import { HomeVendedorPage } from '../home-vendedor/home-vendedor';



@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  card = {nombreDeUsuario : "", PrimerNombre : "", apellido :"",TipoUsuario:""};
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public authProvider : AuthProvider,) {
    this.obtenerUsuario();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');
  }
  closeModal(){
    firebase.database().ref('Usuario/'+firebase.auth().currentUser.uid).on('value', data =>{
      if(data.val() != null){
        var datos = data.val();
        var keys = Object.keys(datos)
    
        for(var i = 0; i < keys.length; i++) {
          var k = keys[i];
          
            var datoQuestion = datos[k];
            if(datoQuestion.Tipo){
              console.log(datoQuestion.Tipo);
              var tipo = datoQuestion.Tipo;
              if( tipo =='Consumidor'){
                this.navCtrl.setRoot(HomePage);
                
              }
              else{
                this.navCtrl.setRoot(HomeVendedorPage);
                
              }
            }

        }
      }
    });
  }

  obtenerUsuario(){
    firebase.database().ref('Usuario/'+firebase.auth().currentUser.uid).on('value', data =>{
      if(data.val() != null){
        var datos = data.val();
        var keys = Object.keys(datos)
    
        for(var i = 0; i < keys.length; i++) {
          var k = keys[i];
          
            var datoQuestion = datos[k];
            if(datoQuestion.nombreUsuario){
              
              this.card.nombreDeUsuario = datoQuestion.nombreUsuario;
              this.card.apellido = datoQuestion.apellido;
              this.card.PrimerNombre = datoQuestion.primerNombre;
              this.card.TipoUsuario = datoQuestion.Tipo;
            }
        }
      }
    });
  }

  logMeOut() {
    this.authProvider.logoutUser().then( () => {
      this.navCtrl.setRoot('LoginPage');
    });
  }

}

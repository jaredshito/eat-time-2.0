import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, } from 'ionic-angular';
import { AngularFireDatabase} from 'angularfire2/database';
import { FirebaseDbProvider } from '../../providers/firebase-db/firebase-db'
import{ AuthProvider } from '../../providers/auth/auth'
import { HomePage } from '../home/home';
import firebase from 'firebase';
import { HomeVendedorPage } from '../home-vendedor/home-vendedor';

/**
 * Generated class for the AddUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-user',
  templateUrl: 'add-user.html',
})
export class AddUserPage {

  Usuario = {id:'',nombreUsuario : '',primerNombre : '', apellido : '',email : '',TipoUsuario:""};
  
    constructor(public navCtrl: NavController, public navParams: NavParams,
              private dbFirebase : FirebaseDbProvider,
            public afDb: AngularFireDatabase, 
          public auth : AuthProvider
        ) {
          this.Usuario = this.navParams.data;
    }
  
    ionViewDidLoad() {
      console.log('ionViewDidLoad AdduserPage');
    }
  
    
  
    guardar(){
      let Usuario = {
        id : this.Usuario.id,
        nombreUsuario : this.Usuario.nombreUsuario,
        primerNombre : this.Usuario.primerNombre,
        apellido : this.Usuario.apellido,
        email : firebase.auth().currentUser.email,
        Tipo : this.Usuario.TipoUsuario
        
        
        
  
      }  
      
    this.dbFirebase.guardarUsuario(Usuario).then(res=>{
    console.log('usuario guardado exitosamente:');
    if(this.Usuario.TipoUsuario == "Vendedor"){
      this.navCtrl.setRoot(HomeVendedorPage);
    }
    else{
      this.navCtrl.setRoot(HomePage);
    }
    
    
  })
  }
  
  
  
  
  
  }
  

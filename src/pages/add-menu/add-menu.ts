import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';

/**
 * Generated class for the AddMenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-menu',
  templateUrl: 'add-menu.html',
})
export class AddMenuPage {
  Producto= {Id:"",Nombre:"",Precio:"",Descripcion:"",Ingrediente1:"",Ingrediente2:"",Ingrediente3:"",
             Ingrediente4:"",Tiempo:""};
  idKiosko="";

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddMenuPage');
  }
  guardar(){
    let Producto={
      Id: Date.now(),
      Nombre: this.Producto.Nombre,
      Precio: this.Producto.Precio,
      Descripcion: this.Producto.Descripcion,
      Ingrediente1: this.Producto.Ingrediente1,
      Ingrediente2: this.Producto.Ingrediente2,
      Ingrediente3: this.Producto.Ingrediente3,
      Ingrediente4: this.Producto.Ingrediente4,
      Tiempo: this.Producto.Tiempo
    }
    console.log(this.Producto);
    this.idKiosko = this.navParams.get('idKiosko');
    
    firebase.database().ref('Kioskos/'+'Kiosko/'+'/'+this.idKiosko+'/menu').set(Producto);
    //firebase.database().ref('Question/'+this.cards.userId+'/'+Question.id+'/'+Comentario.id).set(Comentario);
  }
  /*guardar(){
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
  }*/

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ModalController} from 'ionic-angular';
import firebase from 'firebase';
import { HomePage } from '../home/home';
import { HomeVendedorPage } from '../home-vendedor/home-vendedor';
import { ViewMykioskosPage } from '../view-mykioskos/view-mykioskos';

@IonicPage()
@Component({
  selector: 'page-mis-kioskos',
  templateUrl: 'mis-kioskos.html',
})
export class MisKioskosPage {
  cards = [];
  idUser= firebase.auth().currentUser.uid;
  idKiosko="";
constructor(public navCtrl: NavController, public navParams: NavParams,
public modalCtrl : ModalController) {
    firebase.database().ref('Kioskos/').on('value', data => {
      if(data.val() != null){
        var datos = data.val();
        var keys = Object.keys(datos)
  
          for(var i = 0; i < keys.length; i++) {
            var k = keys[i];
            
              var datoKiosko = datos[k];
              
              for(var w in datoKiosko){
                if(datoKiosko[w].IdCreador == this.idUser){
                  //console.log(datoKiosko[w]);
                  this.cards.push(
                    {
                      Nombre : datoKiosko[w].Nombre,
                      Descripcion : datoKiosko[w].Descripcion,
                      idKiosko : datoKiosko[w].idKiosko
                    }
                  );
                 
              }
            }
            
              
            
          }
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MisKioskosPage');
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
    let cardview = this.modalCtrl.create(ViewMykioskosPage, {Nombre : Nombre, Descripcion:Descripcion,idKiosko:this.idKiosko});
    cardview.present();

  }

}


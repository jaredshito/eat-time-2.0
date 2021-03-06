import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { HomePage } from '../home/home';
import { HomeVendedorPage } from '../home-vendedor/home-vendedor';

@IonicPage()
@Component({
  selector: 'page-favoritos',
  templateUrl: 'favoritos.html',
})
export class FavoritosPage {
  Kioskos=[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    firebase.database().ref('Favoritos').on('value', data =>{
      if(data.val() != null){
        var datos = data.val();
        var keys = Object.keys(datos)
    
        for(var i = 0; i < keys.length; i++) {
          var k = keys[i];
          if(keys[i]==firebase.auth().currentUser.uid){
            var datosFavs = datos[k]
            for(var x in datosFavs){
              var favoritos=datosFavs[x].favorito;
              console.log(favoritos);
              firebase.database().ref('Kioskos/Kiosko').on('value', data => {
                if(data.val() != null){
                  var datos = data.val();
                  var keys = Object.keys(datos)
            
                    for(var i = 0; i < keys.length; i++) {
                      var k = keys[i];
                      
                        var datoKiosko = datos[k];
                        
                        
                      for(var y in datoKiosko){
                        if(datoKiosko[y].Precio){
                          var xw=datoKiosko[y].Id;
                          console.log("_"+xw);
                          if( xw == favoritos){
                            console.log("hola");
                            this.Kioskos.push(
                              {
                                Nombre : datoKiosko[y].Nombre,
                                Descripcion : datoKiosko[y].Descripcion,
                                
                              }
                            )
                          }
                          
                           
                          
                        }
                      }
                        
                      
                    }
                }
              });

            }
          }
          
          //console.log(datos[k]);
          
        }
      }
    });
    
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritosPage');
  }



}

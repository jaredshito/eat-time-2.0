import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-favoritos',
  templateUrl: 'favoritos.html',
})
export class FavoritosPage {
  favoritos="";

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
              this.favoritos=datosFavs[x];
              //console.log(this.favoritos);
              firebase.database().ref('Kioskos/Kiosko').on('value', data => {
                if(data.val() != null){
                  var datos = data.val();
                  var keys = Object.keys(datos)
            
                    for(var i = 0; i < keys.length; i++) {
                      var k = keys[i];
                      
                        var datoKiosko = datos[k];
                        
                        //console.log(datoKiosko);
                      for(var y in datoKiosko){
                        if(datoKiosko[y].Precio){
                          if(datoKiosko[y].Id == this.favoritos){
                            console.log("hola");
                          }
                          
                            console.log(datoKiosko[y]);
                            console.log(this.favoritos);
                          
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritosPage');
  }


}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-pedidos',
  templateUrl: 'pedidos.html',
})
export class PedidosPage {

  Kioskos=[];
  

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    firebase.database().ref('Pedidos').on('value', data =>{
      if(data.val() != null){
        var datos = data.val();
        var keys = Object.keys(datos)
    
        for(var i = 0; i < keys.length; i++) {
          var k = keys[i];
          
            var datosFavs = datos[k]
            for(var x in datosFavs){
              var favoritos=datosFavs[x].Producto;
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
          
          
          //console.log(datos[k]);
          
        }
      }
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PedidosPage');
  }

}

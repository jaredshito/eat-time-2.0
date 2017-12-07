import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-ver-kiosko',
  templateUrl: 'ver-kiosko.html',
})
export class VerKioskoPage {
  Kiosko={Nombre : "",Descripcion:""};
  Nombre="";
  Descripcion="";
  idKiosko="";
  Producto=[];
  ProductoId="";
  favoritos={id:""};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.Nombre = this.navParams.get("Nombre");
    this.Descripcion = this.navParams.get("Descripcion");
    this.idKiosko = this.navParams.get('idKiosko');
    this.Kiosko.Nombre = this.Nombre;
    this.Kiosko.Descripcion = this.Descripcion;

    firebase.database().ref('Kioskos/').on('value', data => {
      if(data.val() != null){
        var datos = data.val();
        var keys = Object.keys(datos)
  
          for(var i = 0; i < keys.length; i++) {
            var k = keys[i];
            
              var datoKiosko = datos[k];
              
              for(var w in datoKiosko){
                
                if(datoKiosko[w].Nombre == this.Nombre){
                  var menus = datoKiosko[w];
                  for(var z in menus){
                    if(menus[z].Tiempo != null){
                      this.Producto.push(
                        {
                          PNombre : menus[z].Nombre,
                          PDescripcion : menus[z].Descripcion,
                          
                        }
                      )
                    }
                    
                                          
                  }
                      
                      
                      
                    
              }
            }
            
              
            
          }
      }
    });

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad VerKioskoPage');
  }
  addFavoritos(){
    firebase.database().ref('Kioskos/').on('value', data => {
      if(data.val() != null){
        var datos = data.val();
        var keys = Object.keys(datos)
  
          for(var i = 0; i < keys.length; i++) {
            var k = keys[i];
            
              var datoKiosko = datos[k];
              
              for(var w in datoKiosko){
                
                if(datoKiosko[w].Nombre == this.Nombre){
                  var menus = datoKiosko[w];
                  for(var z in menus){
                    if(menus[z].Tiempo != null){
                      
                          this.ProductoId = menus[z].Id
                          
                        
                      
                    }
                    
                                          
                  }
                      
                      
                      
                    
              }
            }
            
              
            
          }
      }
    });
    let favorito={
      favorito:this.ProductoId
      
      
      
    }
    firebase.database().ref('Usuario/'+'/'+firebase.auth().currentUser.uid+'/favoritos'+'/'+Date.now()).set(favorito);


  }
 

}

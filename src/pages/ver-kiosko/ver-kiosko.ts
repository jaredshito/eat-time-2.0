import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { HomePage } from '../home/home';
import { HomeVendedorPage } from '../home-vendedor/home-vendedor';


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
  pedido={Id:"",Producto:"",Comprador:""};

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
    firebase.database().ref('Favoritos/'+firebase.auth().currentUser.uid+'/'+Date.now()).set(favorito);


  }
  addPedido(){
    console.log("hola");
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
    let pedido={
    
      Producto:this.ProductoId,
      Id : Date.now(),
      Comprador : firebase.auth().currentUser.uid
      
      
      
    }
    console.log("perro");
    firebase.database().ref('Pedidos/'+firebase.auth().currentUser.uid+'/'+Date.now()).set(pedido);


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
             // console.log(datoQuestion.Tipo);
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
 

}

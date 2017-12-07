import { Component ,ViewChild} from '@angular/core';
import { Platform ,Nav} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import { HomeVendedorPage } from '../pages/home-vendedor/home-vendedor';
import { MisKioskosPage } from '../pages/mis-kioskos/mis-kioskos';
import { PerfilPage } from '../pages/perfil/perfil';
import { FavoritosPage } from '../pages/favoritos/favoritos';
import { MisPedidosPage } from '../pages/mis-pedidos/mis-pedidos';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any;
  
    pages: Array<{title: string, component: any}>;
  
  

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    afAuth: AngularFireAuth) {
    
    const authObserver = afAuth.authState.subscribe( user => {
      if (!user) { 
        this.rootPage = 'LoginPage';
        authObserver.unsubscribe();
      } 
      else {
        
        firebase.database().ref('Usuario/'+firebase.auth().currentUser.uid).on('value', data =>{
          if(data.val() != null){
            var datos = data.val();
            var keys = Object.keys(datos)
        
            for(var i = 0; i < keys.length; i++) {
              var k = keys[i];
              
                var datoQuestion = datos[k];
                if(datoQuestion.Tipo){
                  
                  var tipo = datoQuestion.Tipo;
                  if( tipo =='Consumidor'){
                    console.log("consumidor");
                    this.rootPage = HomePage;
                    authObserver.unsubscribe();
                    this.pages = [
                      { title: 'Home', component: HomePage },
                      {title : 'Perfil', component : PerfilPage},
                      {title : 'Favoritos', component : FavoritosPage},
                      {title: 'Pedidos', component : MisPedidosPage}
                      
                      
                    ];
                    
                  }
                  else{
                    console.log("restaurantero");
                    this.rootPage = HomeVendedorPage;
                    authObserver.unsubscribe();
                    this.pages = [
                      { title: 'Home', component: HomeVendedorPage },
                      { title: 'Mis Kioskos', component : MisKioskosPage},
                      {title : 'Perfil', component : PerfilPage}
                      
                    ];
                  }
                }

            }
          }
        });
        
        

        
      }
    });


    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  
}


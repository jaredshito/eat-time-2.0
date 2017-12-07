import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AuthProvider } from '../providers/auth/auth';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AddUserPage } from '../pages/add-user/add-user';
import { FirebaseDbProvider } from '../providers/firebase-db/firebase-db';
import { HomeVendedorPage } from '../pages/home-vendedor/home-vendedor';
import { MisKioskosPage } from '../pages/mis-kioskos/mis-kioskos';
import { PerfilPage } from '../pages/perfil/perfil';
import { AddkioskoPage } from '../pages/addkiosko/addkiosko';
import { AddMenuPage } from '../pages/add-menu/add-menu';
import { ViewMykioskosPage } from '../pages/view-mykioskos/view-mykioskos';
import { VerKioskoPage } from '../pages/ver-kiosko/ver-kiosko';
import { FavoritosPage } from '../pages/favoritos/favoritos';

export const config = {
  apiKey: "AIzaSyDkRbGa3v8O1YuTzChwDQxMFZ0oce-v0mE",
  authDomain: "eat-time-8dbe0.firebaseapp.com",
  databaseURL: "https://eat-time-8dbe0.firebaseio.com",
  projectId: "eat-time-8dbe0",
  storageBucket: "eat-time-8dbe0.appspot.com",
  messagingSenderId: "592954673951"


};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddUserPage,
    HomeVendedorPage,
    MisKioskosPage,
    PerfilPage,
    AddkioskoPage,
    ViewMykioskosPage,
    AddMenuPage,
    VerKioskoPage,
    FavoritosPage
    

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AddUserPage,
    HomeVendedorPage,
    MisKioskosPage,
    PerfilPage,
    AddkioskoPage,
    ViewMykioskosPage,
    AddMenuPage,
    VerKioskoPage,
    FavoritosPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    FirebaseDbProvider
  ]
})
export class AppModule {}

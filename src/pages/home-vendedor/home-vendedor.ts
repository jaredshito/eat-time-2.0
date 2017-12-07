import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { AddkioskoPage } from '../addkiosko/addkiosko';
import { PedidosPage } from '../pedidos/pedidos';


@IonicPage()
@Component({
  selector: 'page-home-vendedor',
  templateUrl: 'home-vendedor.html',
})
export class HomeVendedorPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public authProvider : AuthProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeVendedorPage');
  }
  AgregarKiosko(){
    this.navCtrl.push(AddkioskoPage);
  }
  Pedidos(){
    this.navCtrl.push(PedidosPage);
  }
  

}

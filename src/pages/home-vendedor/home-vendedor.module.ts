import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeVendedorPage } from './home-vendedor';

@NgModule({
  declarations: [
    HomeVendedorPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeVendedorPage),
  ],
})
export class HomeVendedorPageModule {}

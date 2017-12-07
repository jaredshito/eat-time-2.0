import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MisKioskosPage } from './mis-kioskos';

@NgModule({
  declarations: [
    MisKioskosPage,
  ],
  imports: [
    IonicPageModule.forChild(MisKioskosPage),
  ],
})
export class MisKioskosPageModule {}

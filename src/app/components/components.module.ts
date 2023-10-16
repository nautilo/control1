import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule }  from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ForoComponent } from './foro/foro.component';
import { QrComponent } from './qr/qr.component';
import { MisdatosComponent } from './misdatos/misdatos.component';
import { MiclaseComponent } from './miclase/miclase.component';

@NgModule({
  declarations: [
    // CGV: Aqui se declaran todas nuestras componentes
    ForoComponent,
    MiclaseComponent,
    MisdatosComponent,
    QrComponent
  ],
  imports: [
    // CGV: Imports básicos para el funcionamiento de Ionic-Andular
    CommonModule, // Aporta directivas como: ngIf, ngFor, etc.
    IonicModule,  // Aporta IU como: IonTabs, IonNavbar, IonContent, IonButton, etc.,
    FormsModule   // Aporta directivas como: ngForm, ngModel, también validaciones como: ngRequired, ngMinlength, ngMaxlength, ngPattern, etc.
  ],
  exports: [
    // CGV: En Angular, los "exports" en un módulo se utilizan para especificar qué
    //      componentes, directivas, clases, o cualquier otro recurso definido en 
    //      ese módulo estarán disponibles para otros módulos o componentes fuera del
    //      módulo actual. Esto permite que otros módulos importen y utilicen estos
    //      recursos. Vamos a dejar dentro de export nuestros componentes.
    ForoComponent,
    MiclaseComponent,
    MisdatosComponent,
    QrComponent,
    FormsModule
  ]
})
export class ComponentsModule { }

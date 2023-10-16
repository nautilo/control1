import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioPage } from './inicio.page';
import { ForoComponent } from 'src/app/components/foro/foro.component';
import { QrComponent } from 'src/app/components/qr/qr.component';
import { MiclaseComponent } from 'src/app/components/miclase/miclase.component';
import { MisdatosComponent } from 'src/app/components/misdatos/misdatos.component';

const routes: Routes = [
  {
    path: '',
    component: InicioPage,
    children: [
      {
        path: 'misdatos',
        component: MisdatosComponent
      },
      {
        path: 'qr',
        component: QrComponent
      },
      {
        path: 'miclase',
        component: MiclaseComponent
      },
      {
        path: 'foro',
        component: ForoComponent
      }
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InicioPageRoutingModule {}

import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router'; // Permite navegar y pasar parámetros extra entre páginas
import { ToastController } from '@ionic/angular'; // Permite mostrar mensajes emergente
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.page.html',
  styleUrls: ['./ingreso.page.scss'],
})
export class IngresoPage implements OnInit {

  public usuario: Usuario;
  
  constructor(private router: Router, private toastController: ToastController) {
    this.usuario = new Usuario('', '', '', '', '');
    this.usuario.setUsuario('atorres@duocuc.cl', '1234');
  }

  public ngOnInit(): void {
  }

  public ingresar(): void {
    if (this.usuario) {
      const mensajeError = this.usuario.validarUsuario();
      if (mensajeError) {
        this.mostrarMensaje(mensajeError);
        return;
      }

      const usu: Usuario | undefined = this.usuario.buscarUsuarioValido(this.usuario.correo, this.usuario.password);
      
      if (usu) {
        const navigationExtras: NavigationExtras = {
          state: {
            usuario: usu
          }
        };
        this.mostrarMensaje(`¡Bienvenido(a) ${usu.nombreCompleto}!`);
        this.router.navigate(['/inicio'], navigationExtras);
      }
    }
  }

  async mostrarMensaje(mensaje: string, duracion?: number) {
    const toast = await this.toastController.create({
        message: mensaje,
        duration: duracion? duracion: 2000
      });
    toast.present();
  }
}

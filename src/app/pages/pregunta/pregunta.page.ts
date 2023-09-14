import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AnimationController} from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.page.html',
  styleUrls: ['./pregunta.page.scss'],
})
export class PreguntaPage implements OnInit {

  public usuario: Usuario;
  
  constructor(
    private activeroute: ActivatedRoute
  , private router: Router
  , private alertController: AlertController
  , private animationController: AnimationController
  , private toastController: ToastController) {

    this.usuario = new Usuario('', '', '', '', '');

    this.activeroute.queryParams.subscribe(params => { 
      const nav = this.router.getCurrentNavigation();
      if (nav) {
        if (nav.extras.state) {
          this.usuario = nav.extras.state['usuario'];
          this.usuario.setRespuestaSecreta('');
          return;
        }
      }
      this.router.navigate(['/ingreso']);
      });
  }
  public ngOnInit(): void {
  }

  public recuperarContrasena(): void {
    if (this.usuario.respuestaSecreta) {
      const usu: Usuario | undefined = this.usuario.responderPregunta(this.usuario.preguntaSecreta,this.usuario.respuestaSecreta);
      if (usu) {
        const navigationExtras: NavigationExtras = {
          state: {
            usuario: usu
          }
        };
        this.router.navigate(['/correcto'], navigationExtras);
      }else{
        this.router.navigate(['/incorrecto']);
      }
    }else{
      this.mostrarMensaje("No has ingresado la respuesta.");
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

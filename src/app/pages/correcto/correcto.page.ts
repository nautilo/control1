import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AnimationController} from '@ionic/angular';
import { ToastController } from '@ionic/angular'; // Permite mostrar mensajes emergente
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-correcto',
  templateUrl: './correcto.page.html',
  styleUrls: ['./correcto.page.scss'],
})
export class CorrectoPage implements OnInit {

  // CGV: La clase typescript "IngresoPage" es la encargada de implementar las reglas de negocio de la página.
  // Las propiedades del archivo typescript pueden intercambiar valores con los elementos HTML, por medio
  // de "Modelo Angular". Por ejemplo, el siguiente TAG se enlaza con la propiedad "usuario.correo":
  //   <ion-input type="text" [(ngModel)]="usuario.correo"></ion-input>
  // Gracias a este modelo, cada vez que cambia la caja de texto entonces cambia la propiedad y viceversa.

  public usuario: Usuario;

  constructor(
    private activeroute: ActivatedRoute // Permite obtener los parámetros de la página login
  , private router: Router // Permite navegar entre páginas
  , private alertController: AlertController // Permite mostrar mensajes emergentes más complejos que Toast
  , private animationController: AnimationController
  , private toastController: ToastController) { // Permite crear animaciones con  

this.usuario = new Usuario('', '', '', '', '');

// Se llama a la ruta activa y se obtienen sus parámetros mediante una subscripcion
this.activeroute.queryParams.subscribe(params => { 

  const nav = this.router.getCurrentNavigation();
  if (nav) {
    // Si tiene datos extra, se rescatan y se asignan a una propiedad
    if (nav.extras.state) {
      this.usuario = nav.extras.state['usuario'];
      return;
    }
  }
  this.router.navigate(['/ingreso']);

});
}
  public ngOnInit(): void {

    // Puedes descomentar la siguiente línea si quieres que la aplicación navegue directamente
    // a la página Home, así te ahorras de estar apretando el botón "Ingresar" a cada rato
    
    //if (this.usuario.correo !== '') this.ingresar();
  }


  async mostrarMensaje(mensaje: string, duracion?: number) {
    // Permite mostrar un mensaje emergente que dura unos pocos segundos y desaparece. El mensaje es asincrónico, 
    // los que permite que el mensaje se pueda ver incluso cuando ya ha cambiado a la siguiente página.
    const toast = await this.toastController.create({
        message: mensaje,
        duration: duracion? duracion: 2000
      });
    toast.present();
  }

}

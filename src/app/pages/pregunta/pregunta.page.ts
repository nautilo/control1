import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AnimationController} from '@ionic/angular';
import { ToastController } from '@ionic/angular'; // Permite mostrar mensajes emergente
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.page.html',
  styleUrls: ['./pregunta.page.scss'],
})
export class PreguntaPage implements OnInit {

  // CGV: La clase typescript "IngresoPage" es la encargada de implementar las reglas de negocio de la página.
  // Las propiedades del archivo typescript pueden intercambiar valores con los elementos HTML, por medio
  // de "Modelo Angular". Por ejemplo, el siguiente TAG se enlaza con la propiedad "usuario.correo":
  //   <ion-input type="text" [(ngModel)]="usuario.correo"></ion-input>
  // Gracias a este modelo, cada vez que cambia la caja de texto entonces cambia la propiedad y viceversa.

  public usuario: Usuario;

  // CGV: Para poder trabajar con Router y poder navegar hacia la página "home", debemos primero pasar como
  // parámetro e instanciar un objeto de la clase "Router". Fijarse que el tipo de dato, que se pasa 
  // en el constructor es "Router" con mayúscula, porque se trata de una clase y éstas parten con letra 
  // mayúscula, mientras que "router" con minúscula es el objeto de esa clase, que usaremos para ejecutar
  // el método "navigate". La creación de parámetros "private" en el constructor se llama 
  // "Inyección de Dependencia" y es una práctica recomendada en Angular, que permite crear el objeto
  // como una propiedad más de la página y así poder usarla. Por otro lado, la "Inyección de Dependencia"
  // permite compartir una única instancia de dicho objeto en el resto de las páginas que lo usen. Lo
  // anterior es especialmente importante para mantener la coherencia y estados compartidos en los Servicios.
  
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
      this.usuario.setRespuestaSecreta('');
      return;
    }
  }
  // Si no vienen datos extra desde la página anterior, quiere decir que el usuario
  // intentó entrar directamente a la página home sin pasar por el login,
  // de modo que el sistema debe enviarlo al login para que inicie sesión.
  this.router.navigate(['/ingreso']);

});
  }
  public ngOnInit(): void {

    // Puedes descomentar la siguiente línea si quieres que la aplicación navegue directamente
    // a la página Home, así te ahorras de estar apretando el botón "Ingresar" a cada rato
    
    //if (this.usuario.correo !== '') this.ingresar();
  }

  public recuperarContrasena(): void {
    
    if (this.usuario.respuestaSecreta) {
      
      // Validamos el usuario y si hay error no navegaremos a la página Home

      // Como la página sólo permite ingresar el correo y la password, vamos a buscar el usuario para completar sus datos
      const usu: Usuario | undefined = this.usuario.responderPregunta(this.usuario.preguntaSecreta,this.usuario.respuestaSecreta);
      
      if (usu) {
        // NavigationExtras sirve para pasarle parámetros a la página Home. Los parámetros se agregan al objeto "state"
        const navigationExtras: NavigationExtras = {
          state: {
            usuario: usu
          }
        };
        this.router.navigate(['/correcto'], navigationExtras); // Navegamos hacia el Home y enviamos la información extra
      }else{
        this.router.navigate(['/incorrecto']); // Navegamos hacia el Home y enviamos la información extra
      }
    }
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

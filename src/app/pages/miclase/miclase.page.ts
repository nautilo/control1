import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AnimationController} from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-miclase',
  templateUrl: 'miclase.page.html',
  styleUrls: ['miclase.page.scss'],
})

export class MiclasePage implements OnInit{

  //@ViewChild('titulo', { read: ElementRef }) itemTitulo!: ElementRef;

  public usuario: Usuario;

   constructor(
        private activeroute: ActivatedRoute // Permite obtener los parámetros de la página login
      , private router: Router // Permite navegar entre páginas
      , private alertController: AlertController // Permite mostrar mensajes emergentes más complejos que Toast
      , private animationController: AnimationController) { // Permite crear animaciones con  

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
      // Si no vienen datos extra desde la página anterior, quiere decir que el usuario
      // intentó entrar directamente a la página home sin pasar por el login,
      // de modo que el sistema debe enviarlo al login para que inicie sesión.
      this.router.navigate(['/login']);

    });
  }

  public ngOnInit(): void {

  }



  // public ngAfterViewInit(): void {
  //   if (this.itemTitulo) {
  //     const animation = this.animationController
  //       .create()
  //       .addElement(this.itemTitulo.nativeElement)
  //       .iterations(Infinity)
  //       .duration(6000)
  //       .fromTo('transform', 'translate(0%)', 'translate(100%)')
  //       .fromTo('opacity', 0.2, 1);

  //     animation.play();
  //   }
  // }

 

  public animateItem(elementRef: any) {
    this.animationController
      .create()
      .addElement(elementRef)
      .iterations(1)
      .duration(600)
      .fromTo('transform', 'translate(100%)', 'translate(0%)')
      .play();
  }

  // Este método sirve para mostrar un mensaje emergente
  public async presentAlert(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }
}

import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AnimationController} from '@ionic/angular';
import { Asignatura } from 'src/app/model/asignatura';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-miclase',
  templateUrl: 'miclase.page.html',
  styleUrls: ['miclase.page.scss'],
})

export class MiclasePage implements OnInit{
  @ViewChild('titulo',{read:ElementRef}) itemTitulo!: ElementRef;
  public asignatura: Asignatura;
  public usuario: Usuario;

   constructor(
        private activeroute: ActivatedRoute
      , private router: Router
      , private alertController: AlertController
      , private animationController: AnimationController) {

    this.asignatura = new Asignatura();
    this.usuario = new Usuario('', '', '', '', '');

    this.activeroute.queryParams.subscribe(params => { 
      const nav = this.router.getCurrentNavigation();
      if (nav) {
        if (nav.extras.state) {
          this.asignatura = nav.extras.state['asignatura'];
          this.usuario = nav.extras.state['usuario'];
          return;
        }
      }
      this.router.navigate(['/inicio']);
    });
  }

  public ngOnInit(): void {
  }

  public irInicio(): void {
    if (this.usuario) {
      const navigationExtras: NavigationExtras = {
        state: {
          usuario: this.usuario
        }
      };
      this.router.navigate(['/inicio'], navigationExtras);
    }
  }

  public ngAfterViewInit(): void {
    if (this.itemTitulo) {
      const animation = this.animationController
        .create()
        .addElement(this.itemTitulo.nativeElement)
        .iterations(Infinity)
        .duration(6000)
        .fromTo('transform', 'translate(-30%)', 'translate(100%)')
        .fromTo('opacity', 0, 1);

      animation.play();
    }
  }


  public async presentAlert(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }
}

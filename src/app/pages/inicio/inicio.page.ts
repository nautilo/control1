import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AnimationController} from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';
import { Asignatura } from 'src/app/model/asignatura';
import jsQR, { QRCode } from 'jsqr';

@Component({
  selector: 'app-inicio',
  templateUrl: 'inicio.page.html',
  styleUrls: ['inicio.page.scss'],
})

export class InicioPage implements OnInit{
  
  @ViewChild('video')
  private video!: ElementRef;

  @ViewChild('canvas')
  private canvas!: ElementRef;

  public asignatura: Asignatura = new Asignatura();
  public escaneando = false;
  public datosQR: string = '';


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
      this.router.navigate(['/ingreso']);

    });
  }

  public ngOnInit(): void {

  }

  public async comenzarEscaneoQR() {
    const mediaProvider: MediaProvider = await navigator.mediaDevices.getUserMedia({
      video: {facingMode: 'environment'}
    });
    this.video.nativeElement.srcObject = mediaProvider;
    this.video.nativeElement.setAttribute('playsinline', 'true');
    this.video.nativeElement.play();
    this.escaneando = true;
    requestAnimationFrame(this.verificarVideo.bind(this));
  }

  async verificarVideo() {
    if (this.video.nativeElement.readyState === this.video.nativeElement.HAVE_ENOUGH_DATA) {
      if (this.obtenerDatosQR() || !this.escaneando) return;
      requestAnimationFrame(this.verificarVideo.bind(this));
    } else {
      requestAnimationFrame(this.verificarVideo.bind(this));
    }
  }

  public obtenerDatosQR(): boolean {
    const w: number = this.video.nativeElement.videoWidth;
    const h: number = this.video.nativeElement.videoHeight;
    this.canvas.nativeElement.width = w;
    this.canvas.nativeElement.height = h;
    const context: CanvasRenderingContext2D = this.canvas.nativeElement.getContext('2d');
    context.drawImage(this.video.nativeElement, 0, 0, w, h);
    const img: ImageData = context.getImageData(0, 0, w, h);
    let qrCode: QRCode | null = jsQR(img.data, w, h, { inversionAttempts: 'dontInvert' });
    if (qrCode) {
      if (qrCode.data !== '') {
        this.escaneando = false;
        this.enviarDatosQR(qrCode.data);
        return true;
      }
    }
    return false;
  }
  
  public enviarDatosQR(datosQR: string): void {
    this.datosQR = datosQR;
    const objetoDatosQR = JSON.parse(datosQR);
    console.log(JSON.parse(datosQR)[0]);
    this.asignatura = objetoDatosQR;

    const navigationExtras: NavigationExtras = {
      state: {
        asignatura: this.asignatura
      }
    };
    this.router.navigate(['/miclase'], navigationExtras); // Navegamos hacia el Home y enviamos la información extra
    // Validamos el usuario y si hay error no navegaremos a la página Home
    
      

    }
  
    // ----------------------------------
    // TAREA PARA COMPLETAR POR EL ALUMNO
    // ----------------------------------
    // 1) Ejecutar el setter de la clase Asistencia:
    //     this.asistencia.setAsistencia(...parametros...)
    //    de modo que los parámetros los tome del objeto datosQR,
    //    por ejemplo: datosQR.nombreAsignatura contiene el valor 
    //    del nombre de la asignatura en la cual el alumno
    //    debe quedar presente.
    // 2) Hacer una interpolación entre las propiedades 
    //    de "this.asistencia" y la página HTML, de modo
    //    que la página muestre de manera ordenada estos datos.


  // Si la propiedad this.escaneando cambia a false, entonces la función
  // "verificarVideo" deja de ejecutarse y se detiene el escaneo del QR.

  public detenerEscaneoQR(): void {
    this.escaneando = false;
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

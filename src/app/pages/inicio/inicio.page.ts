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
  @ViewChild('titulo',{read:ElementRef}) itemTitulo!: ElementRef;
  @ViewChild('itemNombre',{read:ElementRef}) itemNombre!: ElementRef;
  @ViewChild('itemBienvenido', { read: ElementRef }) itemBienvenido!: ElementRef;
  @ViewChild('video') private video!: ElementRef;
  @ViewChild('canvas') private canvas!: ElementRef;

  public asignatura: Asignatura = new Asignatura();
  public escaneando = false;
  public datosQR: string = '';

  public usuario: Usuario;

   constructor(
        private activeroute: ActivatedRoute
      , private router: Router
      , private alertController: AlertController
      , private animationController: AnimationController) {

    this.usuario = new Usuario('', '', '', '', '');

    this.activeroute.queryParams.subscribe(params => { 
      const nav = this.router.getCurrentNavigation();
      if (nav) {
        if (nav.extras.state) {
          this.usuario = nav.extras.state['usuario'];
          return;
        }
      }
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
        asignatura: this.asignatura,
        usuario: this.usuario
      }
    };
    this.router.navigate(['/miclase'], navigationExtras);
  }

  public detenerEscaneoQR(): void {
    this.escaneando = false;
  }

  public ngAfterViewInit(): void {
    if (this.itemTitulo) {
      const animation = this.animationController
        .create()
        .addElement(this.itemTitulo.nativeElement)
        .iterations(Infinity)
        .duration(6000)
        .fromTo('transform', 'translate(-20%)', 'translate(100%)')
        .fromTo('opacity', 0, 1);

      animation.play();
    }
    this.animateItem(this.itemBienvenido.nativeElement);
    this.animateItem(this.itemNombre.nativeElement);
  }

  public animateItem(elementRef: any) {
    const disolverAnimation = this.animationController
      .create()
      .addElement(elementRef)
      .iterations(1)
      .duration(1500)
      .fromTo('opacity', 0, 1);
  
    const subirAnimation = this.animationController
      .create()
      .addElement(elementRef)
      .iterations(1)
      .duration(1500)
      .fromTo('transform', 'translateY(50px)', 'translateY(0px)');
  
    const animationGroup = this.animationController.create()
      .addAnimation([disolverAnimation, subirAnimation]);
  
    animationGroup.play();
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
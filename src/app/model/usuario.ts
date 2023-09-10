export class Usuario {
    public correo: string;
    public password: string;
    public nombreCompleto: string;
    public preguntaSecreta: string;
    public respuestaSecreta: string;
  
    constructor(
      correo: string,
      password: string,
      nombreCompleto: string,
      preguntaSecreta: string,
      respuestaSecreta: string,
    ) {
      this.correo = correo;
      this.password = password;
      this.nombreCompleto = nombreCompleto;
      this.preguntaSecreta = preguntaSecreta;
      this.respuestaSecreta = respuestaSecreta;
    }
  
    public getCorreo(): string {
      return this.correo;
    }
  
    public getPassword(): string {
      return this.password;
    }
  
    public setUsuario(correo: string, password: string): void {
      this.correo = correo;
      this.password = password;
    }

    public setRespuestaSecreta(respuestaSecreta: string): void {
      this.respuestaSecreta = respuestaSecreta;
    }
  
    public listaUsuariosValidos(): Usuario[] {
      const lista = [];
      lista.push(
        new Usuario(
          'atorres@duocuc.cl',
          '1234',
          'Ana Torres Leiva',
          'Nombre de su mascota',
          'gato'
        )
      );
      lista.push(
        new Usuario(
          'avalenzuela@duocuc.cl',
          'qwer',
          'Alberto Valenzuela Nuñez',
          'Nombre de su mejor amigo',
          'juanito'
        )
      );
      lista.push(
        new Usuario(
          'cfuentes@duocuc.cl',
          'asdf',
          'Carla Fuentes González',
          'Lugar de nacimiento de su madre',
          'Valparaíso'
        )
      );
      return lista;
    }
  
    public buscarUsuarioValido(correo: string, password: string): Usuario | undefined {
      const usuario: Usuario | undefined = this.listaUsuariosValidos().find(
        (usu) => usu.correo === correo && usu.password === password
      );
      return usuario;
    }

    public buscarUsuarioPorCorreo(correo:string): Usuario | undefined{
      const usuario: Usuario | undefined = this.listaUsuariosValidos().find(
        (usu)=> usu.correo === correo
      );
      return usuario;
    }

    public responderPregunta(preguntaSecreta: string, respuestaSecreta: string): Usuario | undefined{
      const usuario: Usuario | undefined = this.listaUsuariosValidos().find(
        (usu)=>usu.preguntaSecreta === preguntaSecreta && usu.respuestaSecreta === respuestaSecreta
      );
      return usuario;
    }
  
    public validarCorreo(): string {
      const patronCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (patronCorreo.test(this.correo)) {
        return '';
      } else {
        return 'El correo ingresado no tiene un formato válido.';
      }
    }
  
    public validarPassword(): string {
      if (this.password.trim() === '') {
        return 'Para entrar al sistema debe ingresar una contraseña.';
      }
      if (this.password.length !== 4) {
        return 'La contraseña debe tener cuatro caracteres máximo.';
      }
      return '';
    }
  
    public validarCredenciales(): string {
      const usu: Usuario | undefined = this.buscarUsuarioValido(this.correo, this.password);
      return usu ? '' : 'Ingresaste un correo o una contraseña errónea.';
    }
  
    public validarUsuario(): string {
      return this.validarCorreo() || this.validarPassword() || this.validarCredenciales();
    }
  }
  
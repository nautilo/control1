export class Usuario {
    public correo: string;
    public password: string;
    public preguntaSecreta: string;
    public respuestaSecreta: string;
    public nombreCompleto: string; // Nuevo atributo
  
    constructor(
      correo: string,
      password: string,
      preguntaSecreta: string,
      respuestaSecreta: string,
      nombreCompleto: string, // Nuevo atributo
    ) {
      this.correo = correo;
      this.password = password;
      this.preguntaSecreta = preguntaSecreta;
      this.respuestaSecreta = respuestaSecreta;
      this.nombreCompleto = nombreCompleto; // Nuevo atributo
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
  
    public listaUsuariosValidos(): Usuario[] {
      const lista = [];
      lista.push(
        new Usuario(
          'sin.datos@duocuc.cl',
          '1234',
          '',
          '',
          'Nombre Sin Datos' // Ejemplo de nombre completo
        )
      );
      // Resto de usuarios...
      return lista;
    }
  
    public buscarUsuarioValido(correo: string, password: string): Usuario | undefined {
      const nived: Usuario | undefined = this.listaUsuariosValidos().find(
        (usu) => usu.correo === correo && usu.password === password
      );
      return nived;
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
      for (let i = 0; i < this.password.length; i++) {
        if ('0123456789'.indexOf(this.password.charAt(i)) === -1) {
          return 'La contraseña debe ser numérica.';
        }
      }
      if (this.password.length !== 4) {
        return 'La contraseña debe ser numérica de 4 dígitos.';
      }
      return '';
    }
  
    public validarCredenciales(): string {
      const usu: Usuario | undefined = this.buscarUsuarioValido(this.correo, this.password);
      return usu ? '' : 'El usuario no fue encontrado en el sistema.';
    }
  
    public validarUsuario(): string {
      return this.validarCorreo() || this.validarPassword() || this.validarCredenciales();
    }
  }
  
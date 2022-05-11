import { Component, OnInit } from '@angular/core';
import { EmpleadoI } from 'src/app/models';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  empleados: EmpleadoI[] = [];

  pares: number[] = [0, 2, 4, 6, 8];

  alumnos:string[] = ['Juan O', 'Maria F', 'Camilo H'];

  carritoCount: number = 5;

  nivel: number = 0;
  addNuevo: boolean = false;

  newEmpleado: EmpleadoI =           {
    nombre:'',
    telefono: '',
    cargo:'',
    nivel: 0
  }

  editarEnable: boolean = false;

  correo:string;

  constructor(private  authenticationService:  AuthenticationService) { 
    this.loadEmpleados();
  }

  ngOnInit() {
        this.authenticationService.authstate().subscribe( res => {
              console.log('res ->', res);
              if (res) {
                  this.correo = res.email
              }
        });
  }

  loadEmpleados() {
      this.empleados = [
          {
            nombre: 'Juan H',
            telefono: '0987687894',
            cargo: 'Compras',
            nivel: 1,
          },
          {
            nombre: 'Maria F',
            telefono: '098677678',
            cargo: 'Ventas',
            nivel: 2,
          },
          {
            nombre: 'Camilo H',
            telefono: '097679878',
            cargo: 'Software',
            nivel: 1,
          },
      ];
  }

  selecNivel1() {
      this.nivel  = 1;
  }

  selecNivel2() {
    this.nivel  = 2;
  }

  addNuevoEnable() {
    this.addNuevo = true;
  }

  guardar() {
    if (this.editarEnable == true) {
      this.addNuevo = false;
      this.resetForm();
    }else {
      console.log('este vamos a guardar -> ', this.newEmpleado);
      const nuevo: EmpleadoI = {
        nombre: this.newEmpleado.nombre,
        telefono: this.newEmpleado.telefono,
        cargo: this.newEmpleado.cargo,
        nivel: this.newEmpleado.nivel
      }; 
      this.empleados.push(nuevo);
      this.addNuevo = false;
      this.resetForm();
    }
  }

  cancelar() {
    this.addNuevo = false;
    this.resetForm()
  }

  resetForm() {
        this.newEmpleado = {
          nombre:'',
          telefono: '',
          cargo:'',
          nivel: 0
        }
  }

  editar(empleado :EmpleadoI) {
    console.log('este vamos a editar -> ', empleado);
    this.editarEnable = true;
    this.addNuevo = true;
    this.newEmpleado = empleado

  }

  eliminar(i:number) {
        this.empleados.splice(i);
  }

}

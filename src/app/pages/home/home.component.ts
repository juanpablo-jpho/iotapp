import { Component, OnInit } from '@angular/core';
import { EmpleadoI, RequestApiSumaI, ResponseApiSumaI } from 'src/app/models';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RealtimedbService } from '../../services/realtimedb.service';


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

  newEmpleado: EmpleadoI = {
    nombre:'',
    telefono: '',
    cargo:'',
    nivel: 0
  }

  editarEnable: boolean = false;

  correo:string;

  respuesta: ResponseApiSumaI;
  data: RequestApiSumaI = {
    numero1: null,
    numero2: null,
  }

  estadoLed: boolean = false

  version = 0;

  constructor(private  authenticationService:  AuthenticationService,
            private realtimedbService: RealtimedbService,
              private http: HttpClient,) { 
    this.loadEmpleados();
    this.getStatelED();
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


  getsuma() {
      const url = 'http://localhost:5001/iot-arduinoapp/us-central1/suma2numeros';
      const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        })
      };
      return this.http.post<ResponseApiSumaI>(url, this.data, httpOptions).subscribe( res => {
          console.log('recibo respuesta del servidor ->', res);
          this.respuesta = res;
          return;
      }) 

  }

  getsumaCliente() {
      const data = this.data;
      this.respuesta = {
        respuesta: data.numero1 + data.numero2,
        numeroMayor: data.numero1 <= data.numero2 ? data.numero2 : data.numero1,
        numeroMenor: data.numero1 < data.numero2 ? data.numero1 : data.numero2,
        estado: 'success'    
      }
  }


  async guardarLed() {
    let path = 'led';
    await this.realtimedbService.createObjet(path, true);
    this.version = this.version + 1;
    path = 'version';
      this.realtimedbService.createObjet(path,this.version);
     
  }

  async apagarLed() {
    let path = 'led';
    await this.realtimedbService.createObjet(path, false);
    this.version = this.version + 1;
    path = 'version';
      this.realtimedbService.createObjet(path,this.version);
   
  }

  getStatelED() {
    const path = 'state-led';
    this.realtimedbService.getObjet(path).subscribe( res => {
          this.estadoLed = res as any;
    })
  }

}



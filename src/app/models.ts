export interface EmpleadoI {
    nombre: string;
    telefono: string;
    cargo: string;
    nivel: number;
}

export interface UserInfoI {
    correo:string;
    password:string;
    nombre:string;
    telefono:string;
    uid:string;
    rol: 'empresa' | 'usuario';
} 


export interface ResponseApiSumaI {
  respuesta: number;
  numeroMayor: number;
  numeroMenor: number;
  estado: string;
}

export interface RequestApiSumaI {
    numero1: number;
    numero2: number;
}
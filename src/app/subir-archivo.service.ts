import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Respuesta } from './respuesta';
import { NombreAsignatura } from './nombre-asignatura';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor(private http: HttpClient) { }

  subir_archivo(asignatura: string | null, tipo: string | null, nombre: string | null, contenido: any, nombre_fichero: string, titulacion: string | null, codigo: string | null): Observable<Respuesta>{
    let datos = {"asignatura": asignatura, "tipo": tipo, "nombre": nombre, "contenido": contenido, "fichero": nombre_fichero, "titulacion": titulacion, "cod_asigna": codigo}
    return this.http.post<Respuesta>("https://apitfg-rbq2sbfjha-nw.a.run.app/sharepoint/subir_archivo", datos);
  }
}

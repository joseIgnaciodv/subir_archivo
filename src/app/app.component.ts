import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SubirArchivoService } from './subir-archivo.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'subir_archivo';
  profesor: string | null = "";
  asignatura: string | null = ""
  tipo: string | null = "";
  nombre: string | null = "";
  descripcion: string | null = "";
  titulacion: string | null = "";
  codigo: string | null = "";
  fichero: ArrayBuffer | string | null = "";
  nom_fichero: string = "";
  contenido: any;
  constructor(private api: SubirArchivoService, private mensaje: MatSnackBar) { }

  get_nombre_fichero(event: Event){
    const ruta = event.target as HTMLInputElement
    let fr = new FileReader()
    this.nom_fichero = ruta.files![0].name

    fr.readAsDataURL(ruta.files![0])
    fr.onloadend = (e) =>{
      this.contenido = e.target?.result
    }
  }

  subir_archivo(){
    this.api.subir_archivo(this.asignatura, this.tipo, this.nombre, this.contenido, this.nom_fichero, this.titulacion, this.codigo).subscribe(respuesta =>{
      if(respuesta.exito == 200){
        this.mensaje.open('Fichero subido correctamente', 'OK')
      }
      else{
        this.mensaje.open('Fichero no se ha subido correctamente', 'OK')
      }
    })
  }

  ngOnInit(): void {
    let query = window.location.search;
    let parametros = new URLSearchParams(query);
    this.profesor = parametros.get('profesor')
    this.asignatura = parametros.get('asignatura')
    this.tipo = parametros.get('tipo')
    this.nombre = parametros.get('nombre')
    this.descripcion = parametros.get('descripcion')
    this.titulacion = parametros.get('titulacion')
    this.codigo = parametros.get('codigo')
  }
}

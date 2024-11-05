import { Component } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { Facultad } from './models/facultad';
import { EscuelaService } from '../escuela/services/escuela.service';
import { FacultadService } from './services/facultad.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
declare var window:any;
@Component({
  selector: 'app-facultad',
  standalone: true,
  imports: [CardComponent, NavbarComponent,CommonModule,FormsModule],
  templateUrl: './facultad.component.html',
  styleUrl: './facultad.component.css'
})
export class FacultadComponent {
  titulo='Gestión de Facultades';
  icono='fa-solid fa-shapes';
  facultad= new Facultad();
  facultades:Facultad[]=[];
  forModal:any;
  modal:any;
  opc:string='';
  op = 0;
  visible: boolean = false;
  
  constructor(
    private escuelaService: EscuelaService,
    private facultadService: FacultadService
  ){}
  ngOnInit():void{
    this.listarFacultades();
  this.forModal = new window.bootstrap.Modal(
    document.getElementById("exampleModal")
   );
  }
  listarFacultades(){
    this.facultadService.getFacultad().subscribe((data)=>{
      this.facultades=data;
    });
  }
  showDialogEdit(id:number) {
    this.facultadService.getFacultadById(id).subscribe((data)=>{
       this.facultad=data;
    });    
 
   }
   deleteFacultad(id: number) {
    this.facultadService.deleteFacultad(id).subscribe({
        next:()=>{
          this.listarFacultades();
        }
    });     
  }
  addFacultad():void{ 
    this.facultadService.createFacultad(this.facultad).subscribe({
            next:()=>{
                  this.listarFacultades();
            }
            
    });          
        this.forModal.hide();
  }
  mostrar(){
    this.forModal.show();    
  }
  showDialogCreate() {
    this.titulo="Crear carrera"
    this.opc="Save";   
    this.op=0;
    this.visible = true; // Cambia la visibilidad del diálogo
  }
}

import { Component } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { Facultad } from '../facultad/models/facultad';
import { Escuela } from './models/escuela';
import { EscuelaService } from './services/escuela.service';
import { FacultadService } from '../facultad/services/facultad.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2'
import bootstrap from 'bootstrap';

declare var window:any;
@Component({
  selector: 'app-escuela',
  standalone: true,
  imports: [CardComponent, NavbarComponent, CommonModule,FormsModule],
  templateUrl: './escuela.component.html',
  styleUrl: './escuela.component.css'
})
export class EscuelaComponent {
  titulo='Gestión de Escuelas';
  icono='fa-solid fa-shapes';
  facultades:Facultad[]=[];
  escuelas:Escuela[]=[];
  title:string='';
  opc:string='';
  facultad= new Facultad();
  escuela= new Escuela();
  op = 0; 
  visible: boolean = false; 
  isDeleteInProgress: boolean = false;
  modal:any;
  forModal:any;
  
  constructor(
    private escuelaService: EscuelaService,
    private facultaService: FacultadService
  ){}
  ngOnInit():void{
    this.listarFacultades();
    this.listarEscuelas();
   this.forModal = new window.bootstrap.Modal(
    document.getElementById("exampleModal")
   );
  }
  listarFacultades(){
    this.facultaService.getFacultad().subscribe((data)=>{
      this.facultades=data;
    });
  }
  listarEscuelas(){
    this.escuelaService.getEscuelas().subscribe((data)=>{
      this.escuelas=data;
    });
  }
  mostrar(){
    this.forModal.show();    
  }
  showDialogEdit(id:number) {
   this.escuelaService.getEscuelaById(id).subscribe((data)=>{
      this.escuela=data;  
   });    

  }
  deleteEscuela(id: number) {
    this.escuelaService.deleteEscuela(id).subscribe({
        next:()=>{
          this.listarEscuelas();
        }
    });     
  }
  addEscuela():void{ 
    this.escuelaService.createEscuela(this.escuela).subscribe({
            next:()=>{
                  this.listarEscuelas();
            }
            
    });          
        this.forModal.hide();
  }
  editEscuela(){
    this.escuelaService.updateEscuela(this.escuela,this.escuela.id).subscribe({
        });
        this.listarEscuelas();        
        this.op=0;    
        this.visible = false;
  }
}

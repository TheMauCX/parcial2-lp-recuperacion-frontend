import { Component } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { Tipo } from './models/tipo';
import { TipoService } from './services/tipo.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
declare var window:any;
@Component({
  selector: 'app-tipo',
  standalone: true,
  imports: [CardComponent, NavbarComponent,CommonModule,FormsModule],
  templateUrl: './tipo.component.html',
  styleUrl: './tipo.component.css'
})
export class TipoComponent {
  titulo='Gestión de Tipos';
  icono='fa-solid fa-shapes';
  tipo = new Tipo();
  tipos:Tipo[]=[];
  forModal:any;
  modal:any;
  opc:string='';
  op = 0;
  visible: boolean = false;
  
  constructor(
    private tipoService: TipoService
  ){}
  
  ngOnInit():void{
    this.listarTipos();
  this.forModal = new window.bootstrap.Modal(
    document.getElementById("exampleModal")
   );
  }
  listarTipos(){
    this.tipoService.getTipo().subscribe((data)=>{
      this.tipos=data;
    });
  }
  showDialogEdit(id:number) {
    this.tipoService.getTipoById(id).subscribe((data)=>{
       this.tipo=data;
       this.op=1;
       this.forModal.show();
    });    
    this.visible = true;
   }
  deleteTipo(id: number) {
    this.tipoService.deleteTipo(id).subscribe({
        next:()=>{
          this.listarTipos();
        }
    });     
  }
  addTipo():void{ 
    this.tipoService.createTipo(this.tipo).subscribe({
            next:()=>{
                  this.listarTipos();
            }
            
    });          
        this.forModal.hide();
  }
  mostrar(){
    this.forModal.show();    
  }
  showDialogCreate() {
    this.tipo = new Tipo(); // Reinicia el objeto para que esté vacío
    this.op = 0; // Indica que estamos en modo de creación
    this.titulo = "Crear tipo"; // Cambia el título
    this.visible = true; // Asegura que el modal esté visible
    this.forModal.show(); // Muestra el modal
  }

  editTipo(){
    this.tipoService.updateTipo(this.tipo,this.tipo.id).subscribe({
        });
        this.listarTipos();        
        this.op=0;    
        this.visible = false;
  }

  opcion(): void {
  if (this.op === 0) {
    this.addTipo();
  } else if (this.op === 1) {
    this.editTipo();
  }
  this.resetModalState(); // Reinicia el estado del modal después de cada operación
  }
  resetModalState() {
    this.tipo = new Tipo(); // Reinicia el objeto tipo
    this.op = 0; // Reinicia op al valor de creación
    this.visible = false; // Cierra el modal
    this.forModal.hide(); // Oculta el modal explícitamente
  }
}

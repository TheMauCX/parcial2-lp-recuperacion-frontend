import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CardComponent } from '../card/card.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Marca } from './models/marca';
import { MarcaService } from './services/marca.service';
declare var window:any;
@Component({
  selector: 'app-marca',
  standalone: true,
  imports: [CardComponent, NavbarComponent,CommonModule,FormsModule],
  templateUrl: './marca.component.html',
  styleUrl: './marca.component.css'
})
export class MarcaComponent {
  titulo='Gestión de Marcas';
  icono='fa-solid fa-shapes';
  marca = new Marca();
  marcas:Marca[]=[];
  forModal:any;
  modal:any;
  opc:string='';
  op = 0;
  visible: boolean = false;
  
  constructor(
    private marcaService: MarcaService
  ){}
  
  ngOnInit():void{
    this.listarMarcas();
  this.forModal = new window.bootstrap.Modal(
    document.getElementById("exampleModal")
   );
  }
  listarMarcas(){
    this.marcaService.getMarca().subscribe((data)=>{
      this.marcas=data;
    });
  }
  showDialogEdit(id:number) {
    this.marcaService.getMarcaById(id).subscribe((data)=>{
       this.marca=data;
    });    
 
   }
   deleteMarca(id: number) {
    this.marcaService.deleteMarca(id).subscribe({
        next:()=>{
          this.listarMarcas();
        }
    });     
  }
  addMarca():void{ 
    this.marcaService.createMarca(this.marca).subscribe({
            next:()=>{
                  this.listarMarcas();
            }
            
    });          
        this.forModal.hide();
  }
  mostrar(){
    this.forModal.show();    
  }
  showDialogCreate() {
    this.titulo="Crear Marca"
    this.opc="Save";   
    this.op=0;
    this.visible = true; // Cambia la visibilidad del diálogo
  }
}
